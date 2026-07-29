BEGIN;

CREATE TABLE IF NOT EXISTS public.user_stats (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  xp INTEGER NOT NULL DEFAULT 0 CHECK (xp >= 0),
  level INTEGER NOT NULL DEFAULT 1 CHECK (level >= 1),
  streak_days INTEGER NOT NULL DEFAULT 0 CHECK (streak_days >= 0),
  total_learning_sessions INTEGER NOT NULL DEFAULT 0 CHECK (total_learning_sessions >= 0),
  today_study_seconds INTEGER NOT NULL DEFAULT 0 CHECK (today_study_seconds >= 0),
  weekly_study_seconds INTEGER NOT NULL DEFAULT 0 CHECK (weekly_study_seconds >= 0),
  monthly_study_seconds INTEGER NOT NULL DEFAULT 0 CHECK (monthly_study_seconds >= 0),
  total_study_seconds INTEGER NOT NULL DEFAULT 0 CHECK (total_study_seconds >= 0),
  last_learning_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.exercise_attempts
  ADD COLUMN IF NOT EXISTS client_attempt_id UUID;

UPDATE public.exercise_attempts
SET client_attempt_id = gen_random_uuid()
WHERE client_attempt_id IS NULL;

ALTER TABLE public.exercise_attempts
  ALTER COLUMN client_attempt_id SET DEFAULT gen_random_uuid(),
  ALTER COLUMN client_attempt_id SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS exercise_attempts_client_attempt_id_key
  ON public.exercise_attempts (client_attempt_id);

ALTER TABLE public.lessons
  DROP CONSTRAINT IF EXISTS lessons_quiz_five_questions_check;

ALTER TABLE public.lessons
  ADD CONSTRAINT lessons_quiz_five_questions_check CHECK (
    quiz_data IS NULL OR (
      jsonb_typeof(quiz_data) = 'object'
      AND jsonb_typeof(quiz_data -> 'questions') = 'array'
      AND jsonb_array_length(quiz_data -> 'questions') = 5
    )
  ) NOT VALID;

ALTER TABLE public.lessons
  VALIDATE CONSTRAINT lessons_quiz_five_questions_check;

CREATE OR REPLACE FUNCTION public.is_admin_or_instructor()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = pg_catalog
AS $$
  SELECT COALESCE(
    (auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'instructor'),
    FALSE
  );
$$;

CREATE OR REPLACE FUNCTION public.get_student_metrics(target_user_id UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
BEGIN
  IF auth.uid() IS DISTINCT FROM target_user_id
     AND NOT public.is_admin_or_instructor() THEN
    RAISE EXCEPTION 'Not authorized to view these metrics';
  END IF;

  RETURN json_build_object(
    'enrolled_courses', (SELECT count(*) FROM public.enrollments WHERE user_id = target_user_id AND status IN ('active', 'completed')),
    'completed_lessons', (SELECT count(*) FROM public.user_progress WHERE user_id = target_user_id AND status = 'completed'),
    'completed_exercises', (SELECT count(DISTINCT exercise_id) FROM public.exercise_attempts WHERE user_id = target_user_id AND passed),
    'avg_score', (SELECT COALESCE(round(avg(score), 1), 0) FROM public.exercise_attempts WHERE user_id = target_user_id),
    'study_time', COALESCE((SELECT total_study_seconds FROM public.user_stats WHERE user_id = target_user_id), 0),
    'completion_rate', (
      SELECT CASE WHEN count(*) = 0 THEN 0
        ELSE round(count(*) FILTER (WHERE status = 'completed')::numeric / count(*)::numeric * 100)
      END
      FROM public.enrollments WHERE user_id = target_user_id
    ),
    'xp', COALESCE((SELECT xp FROM public.user_stats WHERE user_id = target_user_id), 0),
    'level', COALESCE((SELECT level FROM public.user_stats WHERE user_id = target_user_id), 1),
    'streak_days', COALESCE((SELECT streak_days FROM public.user_stats WHERE user_id = target_user_id), 0)
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.increment_study_time(increment_seconds INTEGER)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
DECLARE
  caller UUID := auth.uid();
BEGIN
  IF caller IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;
  IF increment_seconds < 1 OR increment_seconds > 3600 THEN
    RAISE EXCEPTION 'Invalid study-time increment';
  END IF;

  INSERT INTO public.user_activity_stats (user_id, total_active_seconds)
  VALUES (caller, increment_seconds)
  ON CONFLICT (user_id) DO UPDATE SET
    total_active_seconds = user_activity_stats.total_active_seconds + EXCLUDED.total_active_seconds,
    updated_at = now();
END;
$$;

CREATE OR REPLACE FUNCTION public.record_learning_activity(
  p_user_id UUID,
  p_xp_gained INTEGER,
  p_study_seconds INTEGER
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
DECLARE
  today DATE := current_date;
BEGIN
  IF auth.uid() IS DISTINCT FROM p_user_id THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  IF p_xp_gained NOT BETWEEN 0 AND 1000 OR p_study_seconds NOT BETWEEN 0 AND 86400 THEN
    RAISE EXCEPTION 'Invalid learning activity';
  END IF;

  INSERT INTO public.user_stats (
    user_id, xp, level, streak_days, total_learning_sessions,
    today_study_seconds, weekly_study_seconds, monthly_study_seconds,
    total_study_seconds, last_learning_date
  ) VALUES (
    p_user_id, p_xp_gained, (p_xp_gained / 100) + 1, 1, 1,
    p_study_seconds, p_study_seconds, p_study_seconds,
    p_study_seconds, today
  )
  ON CONFLICT (user_id) DO UPDATE SET
    xp = user_stats.xp + EXCLUDED.xp,
    level = ((user_stats.xp + EXCLUDED.xp) / 100) + 1,
    streak_days = CASE
      WHEN user_stats.last_learning_date = today THEN user_stats.streak_days
      WHEN user_stats.last_learning_date = today - 1 THEN user_stats.streak_days + 1
      ELSE 1
    END,
    total_learning_sessions = user_stats.total_learning_sessions + 1,
    today_study_seconds = CASE
      WHEN user_stats.last_learning_date = today THEN user_stats.today_study_seconds + EXCLUDED.today_study_seconds
      ELSE EXCLUDED.today_study_seconds
    END,
    weekly_study_seconds = user_stats.weekly_study_seconds + EXCLUDED.weekly_study_seconds,
    monthly_study_seconds = user_stats.monthly_study_seconds + EXCLUDED.monthly_study_seconds,
    total_study_seconds = user_stats.total_study_seconds + EXCLUDED.total_study_seconds,
    last_learning_date = today,
    updated_at = now();
END;
$$;

CREATE OR REPLACE FUNCTION public.reset_my_learning_progress()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
DECLARE
  caller UUID := auth.uid();
BEGIN
  IF caller IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  DELETE FROM public.exercise_progress WHERE user_id = caller;
  DELETE FROM public.exercise_attempts WHERE user_id = caller;
  DELETE FROM public.user_progress WHERE user_id = caller;
  DELETE FROM public.user_stats WHERE user_id = caller;
  DELETE FROM public.user_activity_stats WHERE user_id = caller;
  DELETE FROM public.enrollments WHERE user_id = caller;
END;
$$;

CREATE OR REPLACE FUNCTION public.evaluate_lesson_completion(
  p_user_id UUID,
  p_lesson_id TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
DECLARE
  quiz_passed BOOLEAN;
  exercise_passed BOOLEAN;
BEGIN
  IF auth.uid() IS DISTINCT FROM p_user_id THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  SELECT EXISTS (
    SELECT 1 FROM public.exercise_attempts
    WHERE user_id = p_user_id
      AND lesson_id = p_lesson_id
      AND exercise_id = 'quiz:lesson:' || p_lesson_id
      AND passed
  ) INTO quiz_passed;

  SELECT EXISTS (
    SELECT 1 FROM public.exercise_attempts
    WHERE user_id = p_user_id
      AND lesson_id = p_lesson_id
      AND exercise_id NOT LIKE 'quiz:%'
      AND passed
  ) INTO exercise_passed;

  RETURN jsonb_build_object(
    'quiz_passed', quiz_passed,
    'exercise_passed', exercise_passed,
    'completed', quiz_passed OR exercise_passed
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.get_active_students_count()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;
  RETURN (SELECT count(*)::integer FROM auth.users);
END;
$$;

ALTER FUNCTION public.get_admin_metrics() SET search_path = pg_catalog, public;
ALTER FUNCTION public.get_hardest_exercises(INTEGER) SET search_path = pg_catalog, public;
ALTER FUNCTION public.course_completion_percentage(UUID, TEXT) SET search_path = pg_catalog, public;
ALTER FUNCTION public.sync_enrollment_progress() SET search_path = pg_catalog, public;
ALTER FUNCTION public.auto_issue_course_certificate() SET search_path = pg_catalog, public;
ALTER FUNCTION public.update_updated_at_column() SET search_path = pg_catalog, public;

DROP FUNCTION IF EXISTS public.store_generated_password(UUID, TEXT, TEXT);

DO $$
BEGIN
  IF to_regclass('public.quiz_attempts') IS NOT NULL THEN
    IF EXISTS (SELECT 1 FROM public.quiz_attempts LIMIT 1) THEN
      RAISE EXCEPTION 'quiz_attempts contains data; migrate it before dropping the table';
    END IF;
    DROP TABLE public.quiz_attempts;
  END IF;
END;
$$;

DROP FUNCTION IF EXISTS public.record_quiz_attempt(UUID, TEXT, TEXT, INTEGER, INTEGER, NUMERIC);

ALTER VIEW public.v_enrollment_completion SET (security_invoker = true);

DO $$
DECLARE
  policy RECORD;
BEGIN
  FOR policy IN
    SELECT schemaname, tablename, policyname
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename IN (
        'categories', 'courses', 'documents', 'enrollments', 'exercise_attempts',
        'exercise_progress', 'faqs', 'learning_paths', 'lessons',
        'practice_exercises', 'product_translations', 'products', 'resources',
        'training_courses', 'training_lessons', 'troubleshooting_guides',
        'user_activity_stats', 'user_bookmarks', 'user_progress', 'user_stats'
      )
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', policy.policyname, policy.schemaname, policy.tablename);
  END LOOP;
END;
$$;

CREATE POLICY "Users read own enrollments" ON public.enrollments
  FOR SELECT TO authenticated USING ((SELECT auth.uid()) = user_id);
CREATE POLICY "Users insert own enrollments" ON public.enrollments
  FOR INSERT TO authenticated WITH CHECK ((SELECT auth.uid()) = user_id);
CREATE POLICY "Users update own enrollments" ON public.enrollments
  FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);
CREATE POLICY "Users delete own enrollments" ON public.enrollments
  FOR DELETE TO authenticated USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users read own exercise attempts" ON public.exercise_attempts
  FOR SELECT TO authenticated USING ((SELECT auth.uid()) = user_id);
CREATE POLICY "Users insert own exercise attempts" ON public.exercise_attempts
  FOR INSERT TO authenticated WITH CHECK ((SELECT auth.uid()) = user_id);
CREATE POLICY "Users update own exercise attempts" ON public.exercise_attempts
  FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users read own exercise progress" ON public.exercise_progress
  FOR SELECT TO authenticated USING ((SELECT auth.uid()) = user_id);
CREATE POLICY "Users insert own exercise progress" ON public.exercise_progress
  FOR INSERT TO authenticated WITH CHECK ((SELECT auth.uid()) = user_id);
CREATE POLICY "Users update own exercise progress" ON public.exercise_progress
  FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users read own activity stats" ON public.user_activity_stats
  FOR SELECT TO authenticated USING ((SELECT auth.uid()) = user_id);
CREATE POLICY "Users insert own activity stats" ON public.user_activity_stats
  FOR INSERT TO authenticated WITH CHECK ((SELECT auth.uid()) = user_id);
CREATE POLICY "Users update own activity stats" ON public.user_activity_stats
  FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users manage own bookmarks" ON public.user_bookmarks
  FOR ALL TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users read own stats" ON public.user_stats
  FOR SELECT TO authenticated USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users read own progress" ON public.user_progress
  FOR SELECT TO authenticated USING ((SELECT auth.uid()) = user_id);
CREATE POLICY "Users insert own progress" ON public.user_progress
  FOR INSERT TO authenticated WITH CHECK ((SELECT auth.uid()) = user_id);
CREATE POLICY "Users update own progress" ON public.user_progress
  FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);
CREATE POLICY "Users delete own progress" ON public.user_progress
  FOR DELETE TO authenticated USING ((SELECT auth.uid()) = user_id);

DO $$
DECLARE
  table_name TEXT;
BEGIN
  FOREACH table_name IN ARRAY ARRAY[
    'categories', 'courses', 'documents', 'faqs', 'learning_paths', 'lessons',
    'practice_exercises', 'product_translations', 'products', 'resources',
    'training_courses', 'training_lessons', 'troubleshooting_guides'
  ] LOOP
    IF to_regclass('public.' || table_name) IS NOT NULL THEN
      EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', table_name);
      EXECUTE format(
        'CREATE POLICY %I ON public.%I FOR SELECT TO anon, authenticated USING (true)',
        table_name || ' public read-only',
        table_name
      );
    END IF;
  END LOOP;
END;
$$;

CREATE POLICY "Admins manage documents" ON public.documents
  FOR ALL TO authenticated
  USING (public.is_admin_or_instructor())
  WITH CHECK (public.is_admin_or_instructor());
CREATE POLICY "Admins manage products" ON public.products
  FOR ALL TO authenticated
  USING (public.is_admin_or_instructor())
  WITH CHECK (public.is_admin_or_instructor());
CREATE POLICY "Admins manage courses" ON public.courses
  FOR ALL TO authenticated
  USING (public.is_admin_or_instructor())
  WITH CHECK (public.is_admin_or_instructor());
CREATE POLICY "Admins manage lessons" ON public.lessons
  FOR ALL TO authenticated
  USING (public.is_admin_or_instructor())
  WITH CHECK (public.is_admin_or_instructor());

REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon, authenticated;

DO $$
DECLARE
  table_name TEXT;
BEGIN
  FOREACH table_name IN ARRAY ARRAY[
    'categories', 'courses', 'documents', 'faqs', 'learning_paths', 'lessons',
    'practice_exercises', 'product_translations', 'products', 'resources',
    'training_courses', 'training_lessons', 'troubleshooting_guides'
  ] LOOP
    IF to_regclass('public.' || table_name) IS NOT NULL THEN
      EXECUTE format('GRANT SELECT ON TABLE public.%I TO anon, authenticated', table_name);
    END IF;
  END LOOP;
END;
$$;

GRANT INSERT, UPDATE, DELETE ON public.courses, public.lessons, public.products, public.documents
  TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.enrollments TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.exercise_attempts TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.exercise_progress TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.user_activity_stats TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_bookmarks TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_progress TO authenticated;
GRANT SELECT ON public.user_stats TO authenticated;
GRANT SELECT ON public.v_enrollment_completion TO authenticated;

DO $$
DECLARE
  fn RECORD;
BEGIN
  FOR fn IN
    SELECT p.oid::regprocedure AS signature
    FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public'
      AND NOT EXISTS (
        SELECT 1 FROM pg_depend d
        WHERE d.objid = p.oid AND d.deptype = 'e'
      )
  LOOP
    EXECUTE format('REVOKE EXECUTE ON FUNCTION %s FROM PUBLIC, anon, authenticated', fn.signature);
  END LOOP;
END;
$$;

GRANT EXECUTE ON FUNCTION public.is_admin_or_instructor() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_active_students_count() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_student_metrics(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_admin_metrics() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_hardest_exercises(INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION public.increment_study_time(INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION public.record_learning_activity(UUID, INTEGER, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION public.reset_my_learning_progress() TO authenticated;
GRANT EXECUTE ON FUNCTION public.save_exercise_progress(UUID, TEXT, TEXT, TEXT, TIMESTAMPTZ, TIMESTAMPTZ, TIMESTAMPTZ, INTEGER, INTEGER, TEXT, NUMERIC, INTEGER, JSONB, JSONB) TO authenticated;
GRANT EXECUTE ON FUNCTION public.evaluate_lesson_completion(UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.mark_lesson_complete(UUID, TEXT, TEXT, INTEGER, TEXT, TEXT) TO authenticated;

ALTER TABLE public.enrollments
  DROP CONSTRAINT IF EXISTS unique_enrollment_user_course;
DROP INDEX IF EXISTS public.unique_enrollment_user_course;

CREATE INDEX IF NOT EXISTS idx_ai_messages_conversation_id ON public.ai_messages (conversation_id);
DO $$
BEGIN
  IF to_regclass('public.certificates') IS NOT NULL THEN
    EXECUTE 'CREATE INDEX IF NOT EXISTS idx_certificates_course_id ON public.certificates (course_id)';
  END IF;
END;
$$;
CREATE INDEX IF NOT EXISTS idx_chunks_document_id ON public.chunks (document_id);
CREATE INDEX IF NOT EXISTS idx_documents_product_id ON public.documents (product_id);
CREATE INDEX IF NOT EXISTS idx_embeddings_chunk_id ON public.embeddings (chunk_id);
CREATE INDEX IF NOT EXISTS idx_faqs_product_id ON public.faqs (product_id);
CREATE INDEX IF NOT EXISTS idx_practice_exercises_lesson_id ON public.practice_exercises (lesson_id);
CREATE INDEX IF NOT EXISTS idx_product_translations_product_id ON public.product_translations (product_id);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON public.products (category_id);
CREATE INDEX IF NOT EXISTS idx_training_courses_product_id ON public.training_courses (product_id);
CREATE INDEX IF NOT EXISTS idx_training_lessons_course_id ON public.training_lessons (course_id);
CREATE INDEX IF NOT EXISTS idx_troubleshooting_guides_product_id ON public.troubleshooting_guides (product_id);
CREATE INDEX IF NOT EXISTS idx_user_bookmarks_course_id ON public.user_bookmarks (course_id);
CREATE INDEX IF NOT EXISTS idx_user_bookmarks_lesson_id ON public.user_bookmarks (lesson_id);

COMMIT;
