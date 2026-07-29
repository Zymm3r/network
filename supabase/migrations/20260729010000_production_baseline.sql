SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA public;
CREATE EXTENSION IF NOT EXISTS moddatetime WITH SCHEMA extensions;


CREATE SCHEMA IF NOT EXISTS "public";


ALTER SCHEMA "public" OWNER TO "postgres";


CREATE TYPE "public"."availability_status" AS ENUM (
    'available',
    'limited',
    'full',
    'coming_soon'
);


ALTER TYPE "public"."availability_status" OWNER TO "postgres";


CREATE TYPE "public"."course_level" AS ENUM (
    'beginner',
    'intermediate',
    'advanced'
);


ALTER TYPE "public"."course_level" OWNER TO "postgres";


CREATE TYPE "public"."exercise_difficulty" AS ENUM (
    'easy',
    'moderate',
    'challenging'
);


ALTER TYPE "public"."exercise_difficulty" OWNER TO "postgres";


CREATE TYPE "public"."path_type" AS ENUM (
    'sequential',
    'optional',
    'milestone'
);


ALTER TYPE "public"."path_type" OWNER TO "postgres";


CREATE TYPE "public"."resource_type" AS ENUM (
    'tool',
    'tutorial',
    'documentation',
    'video',
    'external_link'
);


ALTER TYPE "public"."resource_type" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."auto_issue_course_certificate"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    v_cert_number TEXT;
    v_short_user  TEXT;
BEGIN
    -- Only fire on the transition into completion
    IF NEW.status = 'completed'
       AND (OLD.status IS DISTINCT FROM 'completed')
       AND NEW.progress_percentage >= 100 THEN

        v_short_user  := UPPER(SUBSTRING(NEW.user_id::text FROM 1 FOR 8));
        v_cert_number := 'C-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || v_short_user || '-' ||
                         UPPER(SUBSTRING(MD5(random()::text) FROM 1 FOR 6));

        INSERT INTO public.certificates (user_id, course_id, certificate_number)
        VALUES (NEW.user_id, NEW.course_id, v_cert_number)
        ON CONFLICT (user_id, course_id) WHERE course_id IS NOT NULL DO NOTHING;
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."auto_issue_course_certificate"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."course_completion_percentage"("p_user_id" "uuid", "p_course_id" "text") RETURNS integer
    LANGUAGE "plpgsql" STABLE
    AS $$
DECLARE
    total_lessons INTEGER;
    completed_lessons INTEGER;
BEGIN
    -- Cast to text in the join condition so this works for both UUID- and
    -- TEXT-typed `lessons.id` / `enrollments.course_id` columns. (The seed
    -- data in this project uses TEXT ids like 'ccna-001'.)
    SELECT count(*) INTO total_lessons
    FROM public.lessons
    WHERE course_id::text = p_course_id;

    IF total_lessons = 0 THEN
        RETURN 0;
    END IF;

    SELECT count(*) INTO completed_lessons
    FROM public.user_progress up
    JOIN public.lessons l ON l.id::text = up.lesson_id::text
    WHERE up.user_id = p_user_id
      AND l.course_id::text = p_course_id
      AND up.status = 'completed';

    RETURN ROUND((completed_lessons::numeric / total_lessons::numeric) * 100)::INTEGER;
END;
$$;


ALTER FUNCTION "public"."course_completion_percentage"("p_user_id" "uuid", "p_course_id" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."evaluate_lesson_completion"("p_user_id" "uuid", "p_lesson_id" "text") RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
DECLARE
  v_quiz_passed     BOOLEAN := FALSE;
  v_exercise_passed BOOLEAN := FALSE;
  v_progress_status TEXT;
BEGIN
  IF auth.uid() IS DISTINCT FROM p_user_id THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  SELECT TRUE INTO v_quiz_passed
  FROM public.quiz_attempts
  WHERE user_id = p_user_id AND lesson_id = p_lesson_id AND passed = TRUE
  LIMIT 1;

  SELECT TRUE INTO v_exercise_passed
  FROM public.exercise_attempts
  WHERE user_id = p_user_id AND lesson_id = p_lesson_id AND passed = TRUE
  LIMIT 1;

  SELECT status INTO v_progress_status
  FROM public.user_progress
  WHERE user_id = p_user_id AND lesson_id = p_lesson_id;

  RETURN jsonb_build_object(
    'quiz_passed',        COALESCE(v_quiz_passed, FALSE),
    'exercise_passed',    COALESCE(v_exercise_passed, FALSE),
    'lesson_completed',   (v_progress_status = 'completed')
  );
END;
$$;


ALTER FUNCTION "public"."evaluate_lesson_completion"("p_user_id" "uuid", "p_lesson_id" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_active_students_count"() RETURNS integer
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  RETURN (SELECT COUNT(*) FROM auth.users);
END;
$$;


ALTER FUNCTION "public"."get_active_students_count"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_admin_metrics"() RETURNS json
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    result JSON;
BEGIN
    -- Authorization: Only admins/instructors
    IF NOT is_admin_or_instructor() THEN
        RAISE EXCEPTION 'Not authorized. Admin/Instructor access required.';
    END IF;

    SELECT json_build_object(
        'active_users', (SELECT count(DISTINCT user_id) FROM public.user_progress WHERE last_accessed_at > NOW() - INTERVAL '30 days'),
        'course_completions', (SELECT count(*) FROM public.enrollments WHERE status = 'completed'),
        'exercise_success_rate', (
            SELECT CASE
                WHEN count(*) = 0 THEN 0
                ELSE round((count(*) FILTER (WHERE passed = true)::numeric / count(*)::numeric) * 100)
            END
            FROM public.exercise_attempts
        ),
        'avg_attempts', (SELECT coalesce(avg(attempts_count), 0) FROM public.exercise_attempts),
        'first_pass_success_rate', (
            SELECT CASE
                WHEN count(DISTINCT user_id || exercise_id) = 0 THEN 0
                ELSE round((count(*) FILTER (WHERE attempts_count = 1 AND passed = true)::numeric / count(DISTINCT user_id || exercise_id)::numeric) * 100)
            END
            FROM public.exercise_attempts
        )
    ) INTO result;

    RETURN result;
END;
$$;


ALTER FUNCTION "public"."get_admin_metrics"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_hardest_exercises"("limit_count" integer DEFAULT 5) RETURNS json
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    result JSON;
BEGIN
    -- Authorization: Only admins/instructors
    IF NOT is_admin_or_instructor() THEN
        RAISE EXCEPTION 'Not authorized. Admin/Instructor access required.';
    END IF;

    SELECT json_agg(row_to_json(t)) INTO result
    FROM (
        SELECT
            ea.exercise_id,
            e.question_en as exercise_name,
            count(*) as total_attempts,
            round((count(*) FILTER (WHERE passed = true)::numeric / count(*)::numeric) * 100) as success_rate
        FROM public.exercise_attempts ea
        LEFT JOIN public.practice_exercises e ON ea.exercise_id = e.id
        GROUP BY ea.exercise_id, e.question_en
        HAVING count(*) > 0
        ORDER BY success_rate ASC
        LIMIT limit_count
    ) t;

    RETURN coalesce(result, '[]'::json);
END;
$$;


ALTER FUNCTION "public"."get_hardest_exercises"("limit_count" integer) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_student_metrics"("target_user_id" "uuid") RETURNS json
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    result JSON;
BEGIN
    -- Authorization: Only the user themselves or an admin can view these metrics
    IF auth.uid() != target_user_id AND NOT is_admin_or_instructor() THEN
        RAISE EXCEPTION 'Not authorized to view these metrics';
    END IF;

    SELECT json_build_object(
        'enrolled_courses', (SELECT count(*) FROM public.enrollments WHERE user_id = target_user_id AND status = 'active'),
        'completed_lessons', (SELECT count(*) FROM public.user_progress WHERE user_id = target_user_id AND status = 'completed'),
        'completed_exercises', (SELECT count(*) FROM public.exercise_attempts WHERE user_id = target_user_id AND passed = true),
        'avg_score', (SELECT coalesce(avg(score), 0) FROM public.exercise_attempts WHERE user_id = target_user_id),
        'study_time', (
             SELECT coalesce(sum(l.duration_minutes), 0)
             FROM public.user_progress p
             JOIN public.lessons l ON p.lesson_id = l.id
             WHERE p.user_id = target_user_id AND p.status = 'completed'
        ),
        'completion_rate', (
             SELECT CASE
               WHEN count(*) = 0 THEN 0
               ELSE round( (count(*) FILTER (WHERE status = 'completed')::numeric / count(*)::numeric) * 100 )
             END
             FROM public.enrollments WHERE user_id = target_user_id
        )
    ) INTO result;

    RETURN result;
END;
$$;


ALTER FUNCTION "public"."get_student_metrics"("target_user_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."increment_study_time"("increment_seconds" integer) RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
    INSERT INTO public.user_activity_stats (user_id, total_active_seconds)
    VALUES (auth.uid(), increment_seconds)
    ON CONFLICT (user_id)
    DO UPDATE SET
        total_active_seconds = user_activity_stats.total_active_seconds + EXCLUDED.total_active_seconds,
        updated_at = NOW();
END;
$$;


ALTER FUNCTION "public"."increment_study_time"("increment_seconds" integer) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_admin_or_instructor"() RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    user_role TEXT;
BEGIN
    SELECT raw_user_meta_data->>'role' INTO user_role FROM auth.users WHERE id = auth.uid();

    -- For development/testing purposes, if there is no role, we might want to fail safe.
    -- However, let's allow someone with 'admin' or 'instructor' role.
    IF user_role IN ('admin', 'instructor') THEN
        RETURN TRUE;
    END IF;

    RETURN FALSE;
END;
$$;


ALTER FUNCTION "public"."is_admin_or_instructor"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."mark_lesson_complete"("p_user_id" "uuid", "p_lesson_id" "text", "p_status" "text" DEFAULT 'completed'::"text", "p_percentage" integer DEFAULT 100, "p_notes" "text" DEFAULT NULL::"text", "p_course_id" "text" DEFAULT NULL::"text") RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
DECLARE
  v_now         TIMESTAMPTZ := now();
  v_existing    RECORD;
  v_result_id   UUID;
BEGIN
  -- Caller must be the owner
  IF auth.uid() IS DISTINCT FROM p_user_id THEN
    RAISE EXCEPTION 'Unauthorized: caller is not the progress owner';
  END IF;

  -- Validate status
  IF p_status NOT IN ('not_started', 'in_progress', 'completed') THEN
    RAISE EXCEPTION 'Invalid status: %', p_status;
  END IF;

  -- Check existing row
  SELECT id, status INTO v_existing
  FROM public.user_progress
  WHERE user_id = p_user_id
    AND lesson_id = p_lesson_id;

  IF FOUND THEN
    -- GUARD: Do not downgrade completed to in_progress
    IF v_existing.status = 'completed' AND p_status != 'completed' THEN
      RETURN jsonb_build_object(
        'success', true,
        'guarded', true,
        'message', 'Already completed downgrade blocked'
      );
    END IF;

    UPDATE public.user_progress
    SET
      status              = p_status,
      progress_percentage = p_percentage,
      notes               = COALESCE(p_notes, notes),
      completed_at        = CASE WHEN p_status = 'completed' THEN COALESCE(completed_at, v_now) ELSE completed_at END,
      last_accessed_at    = v_now,
      updated_at          = v_now
    WHERE id = v_existing.id
    RETURNING id INTO v_result_id;
  ELSE
    INSERT INTO public.user_progress (
      user_id, lesson_id, status, progress_percentage, notes,
      completed_at, last_accessed_at, course_id
    ) VALUES (
      p_user_id,
      p_lesson_id,
      p_status,
      p_percentage,
      p_notes,
      CASE WHEN p_status = 'completed' THEN v_now ELSE NULL END,
      v_now,
      p_course_id::UUID
    )
    ON CONFLICT (user_id, lesson_id) WHERE lesson_id IS NOT NULL DO UPDATE
    SET
      status              = EXCLUDED.status,
      progress_percentage = EXCLUDED.progress_percentage,
      notes               = COALESCE(EXCLUDED.notes, user_progress.notes),
      completed_at        = CASE
                              WHEN user_progress.status = 'completed' THEN user_progress.completed_at
                              WHEN EXCLUDED.status = 'completed' THEN v_now
                              ELSE NULL
                            END,
      last_accessed_at    = v_now,
      updated_at          = v_now
    RETURNING id INTO v_result_id;
  END IF;

  RETURN jsonb_build_object(
    'success', true,
    'guarded', false,
    'id', v_result_id
  );
END;
$$;


ALTER FUNCTION "public"."mark_lesson_complete"("p_user_id" "uuid", "p_lesson_id" "text", "p_status" "text", "p_percentage" integer, "p_notes" "text", "p_course_id" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."record_quiz_attempt"("p_user_id" "uuid", "p_lesson_id" "text", "p_course_id" "text" DEFAULT NULL::"text", "p_score" integer DEFAULT 0, "p_total" integer DEFAULT 0, "p_pass_threshold" numeric DEFAULT 0.8) RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
DECLARE
  v_passed  BOOLEAN;
  v_pct     NUMERIC;
  v_now     TIMESTAMPTZ := now();
BEGIN
  IF auth.uid() IS DISTINCT FROM p_user_id THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  v_pct    := CASE WHEN p_total > 0 THEN p_score::NUMERIC / p_total::NUMERIC ELSE 0 END;
  v_passed := (v_pct >= p_pass_threshold);

  INSERT INTO public.quiz_attempts (
    user_id, lesson_id, course_id, score, total_questions, passed, score_pct, submitted_at
  ) VALUES (
    p_user_id, p_lesson_id, p_course_id, p_score, p_total, v_passed, ROUND(v_pct * 100), v_now
  );

  RETURN jsonb_build_object(
    'success', true,
    'passed',  v_passed,
    'pct',     ROUND(v_pct * 100)
  );
END;
$$;


ALTER FUNCTION "public"."record_quiz_attempt"("p_user_id" "uuid", "p_lesson_id" "text", "p_course_id" "text", "p_score" integer, "p_total" integer, "p_pass_threshold" numeric) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."reset_my_learning_progress"() RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
BEGIN
  -- ล้างข้อมูลสถานะการเรียนและ % ของผู้ใช้ปัจจุบัน
  DELETE FROM user_progress WHERE user_id = auth.uid();

  -- ล้างข้อมูล XP, Level, และเวลาเรียน
  DELETE FROM user_stats WHERE user_id = auth.uid();

  -- ล้างข้อมูลการลงทะเบียนเรียน
  DELETE FROM enrollments WHERE user_id = auth.uid();

  -- ล้างข้อมูลการส่งคำตอบแบบฝึกหัด/ข้อสอบ
  DELETE FROM exercise_attempts WHERE user_id = auth.uid();
END;
$$;


ALTER FUNCTION "public"."reset_my_learning_progress"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."exercise_progress" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "exercise_id" "text" NOT NULL,
    "lesson_id" "text",
    "course_id" "text",
    "started_at" timestamp with time zone,
    "completed_at" timestamp with time zone,
    "last_activity_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "time_spent_seconds" integer DEFAULT 0 NOT NULL,
    "progress_percentage" integer DEFAULT 0 NOT NULL,
    "status" "text" DEFAULT 'not_started'::"text" NOT NULL,
    "score" numeric,
    "attempts" integer DEFAULT 0 NOT NULL,
    "checkpoint_data" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "answers" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "exercise_progress_attempts_check" CHECK (("attempts" >= 0)),
    CONSTRAINT "exercise_progress_progress_percentage_check" CHECK ((("progress_percentage" >= 0) AND ("progress_percentage" <= 100))),
    CONSTRAINT "exercise_progress_status_check" CHECK (("status" = ANY (ARRAY['not_started'::"text", 'in_progress'::"text", 'completed'::"text"]))),
    CONSTRAINT "exercise_progress_time_spent_seconds_check" CHECK (("time_spent_seconds" >= 0))
);


ALTER TABLE "public"."exercise_progress" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."save_exercise_progress"("p_user_id" "uuid", "p_exercise_id" "text", "p_lesson_id" "text" DEFAULT NULL::"text", "p_course_id" "text" DEFAULT NULL::"text", "p_started_at" timestamp with time zone DEFAULT NULL::timestamp with time zone, "p_completed_at" timestamp with time zone DEFAULT NULL::timestamp with time zone, "p_last_activity_at" timestamp with time zone DEFAULT "now"(), "p_time_spent_seconds" integer DEFAULT 0, "p_progress_percentage" integer DEFAULT 0, "p_status" "text" DEFAULT 'in_progress'::"text", "p_score" numeric DEFAULT NULL::numeric, "p_attempts" integer DEFAULT 0, "p_checkpoint_data" "jsonb" DEFAULT '{}'::"jsonb", "p_answers" "jsonb" DEFAULT '{}'::"jsonb") RETURNS "public"."exercise_progress"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'public', 'auth'
    AS $$ DECLARE result public.exercise_progress; BEGIN IF (SELECT auth.uid()) IS DISTINCT FROM p_user_id THEN RAISE EXCEPTION 'exercise progress may only be saved by its owner'; END IF; INSERT INTO public.exercise_progress AS ep (user_id,exercise_id,lesson_id,course_id,started_at,completed_at,last_activity_at,time_spent_seconds,progress_percentage,status,score,attempts,checkpoint_data,answers) VALUES (p_user_id,p_exercise_id,p_lesson_id,p_course_id,p_started_at,CASE WHEN p_status='completed' THEN COALESCE(p_completed_at,p_last_activity_at) END,p_last_activity_at,GREATEST(0,p_time_spent_seconds),LEAST(100,GREATEST(0,p_progress_percentage)),p_status,p_score,GREATEST(0,p_attempts),COALESCE(p_checkpoint_data,'{}'::jsonb),COALESCE(p_answers,'{}'::jsonb)) ON CONFLICT (user_id,exercise_id) DO UPDATE SET lesson_id=COALESCE(ep.lesson_id,EXCLUDED.lesson_id),course_id=COALESCE(ep.course_id,EXCLUDED.course_id),started_at=COALESCE(ep.started_at,EXCLUDED.started_at),completed_at=COALESCE(ep.completed_at,EXCLUDED.completed_at),last_activity_at=EXCLUDED.last_activity_at,time_spent_seconds=GREATEST(ep.time_spent_seconds,EXCLUDED.time_spent_seconds),progress_percentage=GREATEST(ep.progress_percentage,EXCLUDED.progress_percentage),status=CASE WHEN ep.status='completed' OR EXCLUDED.status='completed' THEN 'completed' ELSE EXCLUDED.status END,score=COALESCE(EXCLUDED.score,ep.score),attempts=GREATEST(ep.attempts,EXCLUDED.attempts),checkpoint_data=ep.checkpoint_data || EXCLUDED.checkpoint_data,answers=ep.answers || EXCLUDED.answers WHERE ep.last_activity_at<=EXCLUDED.last_activity_at RETURNING * INTO result; IF result IS NULL THEN SELECT * INTO result FROM public.exercise_progress WHERE user_id=p_user_id AND exercise_id=p_exercise_id; END IF; RETURN result; END; $$;


ALTER FUNCTION "public"."save_exercise_progress"("p_user_id" "uuid", "p_exercise_id" "text", "p_lesson_id" "text", "p_course_id" "text", "p_started_at" timestamp with time zone, "p_completed_at" timestamp with time zone, "p_last_activity_at" timestamp with time zone, "p_time_spent_seconds" integer, "p_progress_percentage" integer, "p_status" "text", "p_score" numeric, "p_attempts" integer, "p_checkpoint_data" "jsonb", "p_answers" "jsonb") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."store_generated_password"("p_user_id" "uuid", "p_email" "text", "p_password" "text") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  INSERT INTO public.user_credentials (user_id, email, password_hash)
  VALUES (p_user_id, p_email, crypt(p_password, gen_salt('bf')))
  ON CONFLICT (user_id) DO UPDATE SET
    password_hash = crypt(p_password, gen_salt('bf')),
    email = p_email;
END;
$$;


ALTER FUNCTION "public"."store_generated_password"("p_user_id" "uuid", "p_email" "text", "p_password" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."sync_enrollment_progress"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    v_course_id TEXT;
BEGIN
    -- Resolve the course for the affected lesson (NULL if lesson was deleted).
    -- Use TEXT because the seed data uses TEXT ids like 'ccna-001'.
    SELECT course_id INTO v_course_id
    FROM public.lessons
    WHERE id = NEW.lesson_id;

    IF v_course_id IS NULL THEN
        RETURN NEW;
    END IF;

    UPDATE public.enrollments
    SET progress_percentage = public.course_completion_percentage(NEW.user_id, v_course_id),
        status = CASE
            WHEN public.course_completion_percentage(NEW.user_id, v_course_id) >= 100
                THEN 'completed'
            ELSE 'active'
        END,
        completed_at = CASE
            WHEN public.course_completion_percentage(NEW.user_id, v_course_id) >= 100
                 AND completed_at IS NULL
                THEN NOW()
            ELSE completed_at
        END,
        last_accessed_at = NOW(),
        updated_at = NOW()
    WHERE user_id = NEW.user_id
      AND course_id = v_course_id;

    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."sync_enrollment_progress"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_updated_at_column"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
  BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
  END;
  $$;


ALTER FUNCTION "public"."update_updated_at_column"() OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."ai_conversations" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid",
    "title" "text",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."ai_conversations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."ai_messages" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "conversation_id" "uuid",
    "role" "text" NOT NULL,
    "content" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."ai_messages" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."categories" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "slug" "text" NOT NULL,
    "description" "text",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."categories" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."certificates" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid",
    "course_id" "text",
    "issued_at" timestamp with time zone DEFAULT "now"(),
    "certificate_url" "text",
    "certificate_number" "text",
    "learning_path_id" "text"
);


ALTER TABLE "public"."certificates" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."chunks" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "document_id" "uuid",
    "chunk_index" integer NOT NULL,
    "content" "text" NOT NULL,
    "token_count" integer,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."chunks" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."content_chunks" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "source_type" "text" NOT NULL,
    "source_id" "uuid",
    "chunk_index" integer,
    "content" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."content_chunks" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."courses" (
    "id" "text" NOT NULL,
    "name_th" "text" NOT NULL,
    "name_en" "text" NOT NULL,
    "description_th" "text",
    "description_en" "text",
    "level" "text",
    "minutes_per_lesson" integer,
    "min_modules" integer,
    "availability" "text",
    "includes" "text"[],
    "highlights" "text"[],
    "image_url" "text",
    "rating" numeric(3,1),
    "review_count" integer,
    "tags" "text"[],
    "modules_left" integer,
    "estimated_hours" integer,
    "prerequisites" "text"[],
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."courses" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."crawled_pages" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "url" "text" NOT NULL,
    "title" "text",
    "markdown_content" "text",
    "html_content" "text",
    "crawl_status" "text" DEFAULT 'completed'::"text",
    "crawled_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."crawled_pages" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."documents" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "product_id" "uuid",
    "title" "text" NOT NULL,
    "document_type" "text",
    "file_url" "text",
    "markdown_content" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "mime_type" "text",
    "extension" "text",
    "language" "text"
);


ALTER TABLE "public"."documents" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."embeddings" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "chunk_id" "uuid",
    "embedding" "public"."vector"(1536),
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."embeddings" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."enrollments" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid",
    "course_id" "text",
    "enrolled_at" timestamp with time zone DEFAULT "now"(),
    "completed_at" timestamp with time zone,
    "status" "text" DEFAULT 'active'::"text",
    "progress_percentage" integer DEFAULT 0,
    "last_accessed_at" timestamp with time zone DEFAULT "now"(),
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."enrollments" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."exercise_attempts" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "exercise_id" "text" NOT NULL,
    "lesson_id" "text",
    "course_id" "text" NOT NULL,
    "passed" boolean NOT NULL,
    "score" integer,
    "attempts_count" integer DEFAULT 1 NOT NULL,
    "stdout" "text",
    "error_message" "text",
    "execution_timestamp" timestamp with time zone NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "submitted_code" "text",
    "passed_tests" integer DEFAULT 0,
    "total_tests" integer DEFAULT 0,
    "execution_time" integer,
    "status" "text"
);


ALTER TABLE "public"."exercise_attempts" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."faqs" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "product_id" "uuid",
    "question" "text" NOT NULL,
    "answer" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."faqs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."learning_paths" (
    "id" "text" NOT NULL,
    "name_th" "text" NOT NULL,
    "name_en" "text" NOT NULL,
    "description_th" "text",
    "description_en" "text",
    "from_level" "text",
    "to_level" "text",
    "duration" "text",
    "estimated_hours" integer,
    "path_type" "text",
    "price" numeric,
    "availability" "text",
    "seats_left" integer,
    "modules" "text"[],
    "operator" "text",
    "frequency" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."learning_paths" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."lessons" (
    "id" "text" NOT NULL,
    "course_id" "text",
    "title_th" "text" NOT NULL,
    "title_en" "text" NOT NULL,
    "content_th" "text",
    "content_en" "text",
    "lesson_type" "text",
    "duration_minutes" integer,
    "order_index" integer,
    "video_url" "text",
    "thumbnail_url" "text",
    "difficulty" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "quiz_data" "jsonb",
    "exercise_data" "jsonb"
);


ALTER TABLE "public"."lessons" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."practice_exercises" (
    "id" "text" NOT NULL,
    "lesson_id" "text",
    "name_th" "text",
    "name_en" "text",
    "description_th" "text",
    "description_en" "text",
    "exercise_type" "text",
    "location" "text",
    "duration" "text",
    "price" numeric,
    "group_size" "text",
    "difficulty" "text",
    "availability" "text",
    "target_audience" "text"[],
    "includes" "text"[],
    "highlights" "text"[],
    "image_url" "text",
    "rating" numeric(3,1),
    "best_time" "text",
    "question_th" "text",
    "question_en" "text",
    "options" "text"[],
    "correct_index" integer,
    "explanation_th" "text",
    "explanation_en" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."practice_exercises" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."product_translations" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "product_id" "uuid",
    "language" "text" NOT NULL,
    "content" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    CONSTRAINT "product_translations_language_check" CHECK (("language" = ANY (ARRAY['en'::"text", 'th'::"text"])))
);


ALTER TABLE "public"."product_translations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."products" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "category_id" "uuid",
    "name" "text" NOT NULL,
    "slug" "text" NOT NULL,
    "brand" "text",
    "model" "text",
    "description" "text",
    "image_url" "text",
    "status" "text" DEFAULT 'active'::"text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "content" "text" DEFAULT ''::"text",
    "source_url" "text",
    "content_th" "text",
    "content_en" "text",
    "content_status" "text" DEFAULT 'pending'::"text",
    "content_source" "text",
    "last_verified_at" timestamp with time zone
);


ALTER TABLE "public"."products" OWNER TO "postgres";


COMMENT ON COLUMN "public"."products"."content_th" IS 'Official product content in Thai (Markdown)';



COMMENT ON COLUMN "public"."products"."content_en" IS 'Official product content in English (Markdown)';



COMMENT ON COLUMN "public"."products"."content_status" IS 'official | no-official-source | pending';



COMMENT ON COLUMN "public"."products"."content_source" IS 'Official URL used as content source';



COMMENT ON COLUMN "public"."products"."last_verified_at" IS 'Timestamp when content was last verified against official source';



CREATE TABLE IF NOT EXISTS "public"."quiz_attempts" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "lesson_id" "text" NOT NULL,
    "course_id" "text",
    "score" integer DEFAULT 0 NOT NULL,
    "total_questions" integer DEFAULT 0 NOT NULL,
    "passed" boolean DEFAULT false NOT NULL,
    "score_pct" integer,
    "submitted_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."quiz_attempts" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."resources" (
    "id" "text" NOT NULL,
    "name_th" "text" NOT NULL,
    "name_en" "text" NOT NULL,
    "description_th" "text",
    "description_en" "text",
    "resource_type" "text",
    "location" "text",
    "category" "text",
    "distance" "text",
    "walk_time" "text",
    "hours" "text",
    "rating" numeric(3,1),
    "price_range" "text",
    "tags" "text"[],
    "phone" "text",
    "image_url" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."resources" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."training_courses" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "product_id" "uuid",
    "title" "text" NOT NULL,
    "description" "text",
    "difficulty" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "video_url" "text"
);


ALTER TABLE "public"."training_courses" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."training_lessons" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "course_id" "uuid",
    "title" "text" NOT NULL,
    "lesson_order" integer,
    "markdown_content" "text",
    "video_url" "text",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."training_lessons" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."troubleshooting_guides" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "product_id" "uuid",
    "issue" "text" NOT NULL,
    "symptoms" "text",
    "solution" "text",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."troubleshooting_guides" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_activity_stats" (
    "user_id" "uuid" NOT NULL,
    "total_active_seconds" integer DEFAULT 0 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."user_activity_stats" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_bookmarks" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid",
    "course_id" "text",
    "lesson_id" "text",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."user_bookmarks" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_progress" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid",
    "course_id" "text",
    "path_id" "text",
    "exercise_id" "text",
    "status" "text" DEFAULT 'not_started'::"text",
    "progress_percentage" integer DEFAULT 0,
    "completed_at" timestamp with time zone,
    "last_accessed_at" timestamp with time zone DEFAULT "now"(),
    "notes" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "lesson_id" "text",
    "study_time_seconds" integer DEFAULT 0
);


ALTER TABLE "public"."user_progress" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."v_enrollment_completion" AS
 SELECT "user_id",
    "course_id",
    "progress_percentage",
    "status",
    "completed_at",
    "enrolled_at",
    "last_accessed_at"
   FROM "public"."enrollments" "e";


ALTER VIEW "public"."v_enrollment_completion" OWNER TO "postgres";


ALTER TABLE ONLY "public"."ai_conversations"
    ADD CONSTRAINT "ai_conversations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."ai_messages"
    ADD CONSTRAINT "ai_messages_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."categories"
    ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."categories"
    ADD CONSTRAINT "categories_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."certificates"
    ADD CONSTRAINT "certificates_certificate_number_key" UNIQUE ("certificate_number");



ALTER TABLE ONLY "public"."certificates"
    ADD CONSTRAINT "certificates_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."chunks"
    ADD CONSTRAINT "chunks_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."content_chunks"
    ADD CONSTRAINT "content_chunks_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."courses"
    ADD CONSTRAINT "courses_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."crawled_pages"
    ADD CONSTRAINT "crawled_pages_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."crawled_pages"
    ADD CONSTRAINT "crawled_pages_url_key" UNIQUE ("url");



ALTER TABLE ONLY "public"."documents"
    ADD CONSTRAINT "documents_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."embeddings"
    ADD CONSTRAINT "embeddings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."enrollments"
    ADD CONSTRAINT "enrollments_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."enrollments"
    ADD CONSTRAINT "enrollments_user_id_course_id_key" UNIQUE ("user_id", "course_id");



ALTER TABLE ONLY "public"."exercise_attempts"
    ADD CONSTRAINT "exercise_attempts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."exercise_progress"
    ADD CONSTRAINT "exercise_progress_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."exercise_progress"
    ADD CONSTRAINT "exercise_progress_user_exercise_key" UNIQUE ("user_id", "exercise_id");



ALTER TABLE ONLY "public"."faqs"
    ADD CONSTRAINT "faqs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."learning_paths"
    ADD CONSTRAINT "learning_paths_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."lessons"
    ADD CONSTRAINT "lessons_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."practice_exercises"
    ADD CONSTRAINT "practice_exercises_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."product_translations"
    ADD CONSTRAINT "product_translations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."product_translations"
    ADD CONSTRAINT "product_translations_product_id_language_key" UNIQUE ("product_id", "language");



ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."quiz_attempts"
    ADD CONSTRAINT "quiz_attempts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."resources"
    ADD CONSTRAINT "resources_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."training_courses"
    ADD CONSTRAINT "training_courses_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."training_lessons"
    ADD CONSTRAINT "training_lessons_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."troubleshooting_guides"
    ADD CONSTRAINT "troubleshooting_guides_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."enrollments"
    ADD CONSTRAINT "unique_enrollment_user_course" UNIQUE ("user_id", "course_id");



ALTER TABLE ONLY "public"."user_activity_stats"
    ADD CONSTRAINT "user_activity_stats_pkey" PRIMARY KEY ("user_id");



ALTER TABLE ONLY "public"."user_bookmarks"
    ADD CONSTRAINT "user_bookmarks_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_progress"
    ADD CONSTRAINT "user_progress_pkey" PRIMARY KEY ("id");



CREATE UNIQUE INDEX "certificates_user_course_idx" ON "public"."certificates" USING "btree" ("user_id", "course_id") WHERE ("course_id" IS NOT NULL);



CREATE INDEX "embeddings_vector_idx" ON "public"."embeddings" USING "ivfflat" ("embedding" "public"."vector_cosine_ops");



CREATE INDEX "idx_enrollments_progress" ON "public"."enrollments" USING "btree" ("progress_percentage");



CREATE INDEX "idx_enrollments_user_course" ON "public"."enrollments" USING "btree" ("user_id", "course_id");



CREATE INDEX "idx_exercise_attempts_exercise_id" ON "public"."exercise_attempts" USING "btree" ("exercise_id");



CREATE INDEX "idx_exercise_attempts_lesson" ON "public"."exercise_attempts" USING "btree" ("user_id", "lesson_id");



CREATE INDEX "idx_exercise_attempts_lesson_id" ON "public"."exercise_attempts" USING "btree" ("lesson_id");



CREATE INDEX "idx_exercise_attempts_user_course" ON "public"."exercise_attempts" USING "btree" ("user_id", "course_id", "created_at" DESC);



CREATE INDEX "idx_exercise_attempts_user_exercise" ON "public"."exercise_attempts" USING "btree" ("user_id", "exercise_id");



CREATE INDEX "idx_exercise_attempts_user_id" ON "public"."exercise_attempts" USING "btree" ("user_id");



CREATE INDEX "idx_exercise_progress_lesson" ON "public"."exercise_progress" USING "btree" ("lesson_id") WHERE ("lesson_id" IS NOT NULL);



CREATE INDEX "idx_exercise_progress_user_activity" ON "public"."exercise_progress" USING "btree" ("user_id", "last_activity_at" DESC);



CREATE INDEX "idx_quiz_attempts_user_id" ON "public"."quiz_attempts" USING "btree" ("user_id");



CREATE INDEX "idx_quiz_attempts_user_lesson" ON "public"."quiz_attempts" USING "btree" ("user_id", "lesson_id");



CREATE INDEX "idx_user_progress_user_lesson" ON "public"."user_progress" USING "btree" ("user_id", "lesson_id") WHERE ("lesson_id" IS NOT NULL);



CREATE UNIQUE INDEX "unique_exercise_attempt_idx" ON "public"."exercise_attempts" USING "btree" ("user_id", "exercise_id", "execution_timestamp");



CREATE UNIQUE INDEX "uq_user_progress_user_lesson" ON "public"."user_progress" USING "btree" ("user_id", "lesson_id") WHERE ("lesson_id" IS NOT NULL);



CREATE OR REPLACE TRIGGER "handle_updated_at" BEFORE UPDATE ON "public"."product_translations" FOR EACH ROW EXECUTE FUNCTION "extensions"."moddatetime"('updated_at');



CREATE OR REPLACE TRIGGER "trg_auto_issue_course_certificate" AFTER UPDATE OF "status", "progress_percentage" ON "public"."enrollments" FOR EACH ROW EXECUTE FUNCTION "public"."auto_issue_course_certificate"();



CREATE OR REPLACE TRIGGER "trg_auto_issue_course_certificate_insert" AFTER INSERT ON "public"."enrollments" FOR EACH ROW WHEN ((("new"."status" = 'completed'::"text") AND ("new"."progress_percentage" >= 100))) EXECUTE FUNCTION "public"."auto_issue_course_certificate"();



CREATE OR REPLACE TRIGGER "trg_sync_enrollment_progress" AFTER INSERT OR UPDATE OF "status" ON "public"."user_progress" FOR EACH ROW WHEN (("new"."status" = 'completed'::"text")) EXECUTE FUNCTION "public"."sync_enrollment_progress"();



CREATE OR REPLACE TRIGGER "update_exercise_attempts_updated_at" BEFORE UPDATE ON "public"."exercise_attempts" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_exercise_progress_updated_at" BEFORE UPDATE ON "public"."exercise_progress" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



ALTER TABLE ONLY "public"."ai_messages"
    ADD CONSTRAINT "ai_messages_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "public"."ai_conversations"("id");



ALTER TABLE ONLY "public"."certificates"
    ADD CONSTRAINT "certificates_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."certificates"
    ADD CONSTRAINT "certificates_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."chunks"
    ADD CONSTRAINT "chunks_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."documents"
    ADD CONSTRAINT "documents_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id");



ALTER TABLE ONLY "public"."embeddings"
    ADD CONSTRAINT "embeddings_chunk_id_fkey" FOREIGN KEY ("chunk_id") REFERENCES "public"."content_chunks"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."enrollments"
    ADD CONSTRAINT "enrollments_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."enrollments"
    ADD CONSTRAINT "enrollments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."exercise_attempts"
    ADD CONSTRAINT "exercise_attempts_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."exercise_attempts"
    ADD CONSTRAINT "exercise_attempts_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."exercise_attempts"
    ADD CONSTRAINT "exercise_attempts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."exercise_progress"
    ADD CONSTRAINT "exercise_progress_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."exercise_progress"
    ADD CONSTRAINT "exercise_progress_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."exercise_progress"
    ADD CONSTRAINT "exercise_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."faqs"
    ADD CONSTRAINT "faqs_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id");



ALTER TABLE ONLY "public"."lessons"
    ADD CONSTRAINT "lessons_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."practice_exercises"
    ADD CONSTRAINT "practice_exercises_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."product_translations"
    ADD CONSTRAINT "product_translations_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id");



ALTER TABLE ONLY "public"."quiz_attempts"
    ADD CONSTRAINT "quiz_attempts_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."quiz_attempts"
    ADD CONSTRAINT "quiz_attempts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."training_courses"
    ADD CONSTRAINT "training_courses_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id");



ALTER TABLE ONLY "public"."training_lessons"
    ADD CONSTRAINT "training_lessons_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."training_courses"("id");



ALTER TABLE ONLY "public"."troubleshooting_guides"
    ADD CONSTRAINT "troubleshooting_guides_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id");



ALTER TABLE ONLY "public"."user_activity_stats"
    ADD CONSTRAINT "user_activity_stats_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_bookmarks"
    ADD CONSTRAINT "user_bookmarks_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."user_bookmarks"
    ADD CONSTRAINT "user_bookmarks_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."user_bookmarks"
    ADD CONSTRAINT "user_bookmarks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_progress"
    ADD CONSTRAINT "user_progress_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."user_progress"
    ADD CONSTRAINT "user_progress_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "public"."practice_exercises"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."user_progress"
    ADD CONSTRAINT "user_progress_path_id_fkey" FOREIGN KEY ("path_id") REFERENCES "public"."learning_paths"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."user_progress"
    ADD CONSTRAINT "user_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



CREATE POLICY "Allow authenticated update products" ON "public"."products" FOR UPDATE TO "authenticated" USING (true) WITH CHECK (true);



CREATE POLICY "Allow public insert docs" ON "public"."documents" FOR INSERT WITH CHECK (true);



CREATE POLICY "Allow public update docs" ON "public"."documents" FOR UPDATE USING (true);



CREATE POLICY "Categories are viewable by everyone" ON "public"."categories" FOR SELECT USING (true);



CREATE POLICY "Documents are viewable by everyone" ON "public"."documents" FOR SELECT USING (true);



CREATE POLICY "Documents are viewable by everyone." ON "public"."documents" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users on product_translations" ON "public"."product_translations" FOR SELECT USING (true);



CREATE POLICY "FAQs are viewable by everyone" ON "public"."faqs" FOR SELECT USING (true);



CREATE POLICY "FAQs are viewable by everyone." ON "public"."faqs" FOR SELECT USING (true);



CREATE POLICY "Product translations are viewable by everyone" ON "public"."product_translations" FOR SELECT USING (true);



CREATE POLICY "Products are viewable by everyone" ON "public"."products" FOR SELECT USING (true);



CREATE POLICY "Products are viewable by everyone." ON "public"."products" FOR SELECT USING (true);



CREATE POLICY "Public read courses" ON "public"."courses" FOR SELECT USING (true);



CREATE POLICY "Public read lessons" ON "public"."lessons" FOR SELECT USING (true);



CREATE POLICY "Public read paths" ON "public"."learning_paths" FOR SELECT USING (true);



CREATE POLICY "Public read practice_exercises" ON "public"."practice_exercises" FOR SELECT USING (true);



CREATE POLICY "Public read resources" ON "public"."resources" FOR SELECT USING (true);



CREATE POLICY "Training courses are viewable by everyone" ON "public"."training_courses" FOR SELECT USING (true);



CREATE POLICY "Training courses are viewable by everyone." ON "public"."training_courses" FOR SELECT USING (true);



CREATE POLICY "Training lessons are viewable by everyone" ON "public"."training_lessons" FOR SELECT USING (true);



CREATE POLICY "Troubleshooting guides are viewable by everyone" ON "public"."troubleshooting_guides" FOR SELECT USING (true);



CREATE POLICY "Troubleshooting guides are viewable by everyone." ON "public"."troubleshooting_guides" FOR SELECT USING (true);



CREATE POLICY "Users can delete their own enrollments" ON "public"."enrollments" FOR DELETE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can delete their own progress" ON "public"."user_progress" FOR DELETE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can delete their own quiz attempts" ON "public"."quiz_attempts" FOR DELETE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can insert own stats" ON "public"."user_activity_stats" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can insert their own exercise attempts" ON "public"."exercise_attempts" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can insert their own exercise progress" ON "public"."exercise_progress" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Users can insert their own quiz attempts" ON "public"."quiz_attempts" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can update own stats" ON "public"."user_activity_stats" FOR UPDATE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can update their own enrollments" ON "public"."enrollments" FOR UPDATE USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can update their own exercise attempts" ON "public"."exercise_attempts" FOR UPDATE USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can update their own exercise progress" ON "public"."exercise_progress" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id")) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Users can update their own progress" ON "public"."user_progress" FOR UPDATE USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view own stats" ON "public"."user_activity_stats" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view their own exercise attempts" ON "public"."exercise_attempts" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view their own exercise progress" ON "public"."exercise_progress" FOR SELECT TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Users can view their own quiz attempts" ON "public"."quiz_attempts" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users delete own bookmarks" ON "public"."user_bookmarks" FOR DELETE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users insert own bookmarks" ON "public"."user_bookmarks" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users insert own enrollments" ON "public"."enrollments" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users insert own progress" ON "public"."user_progress" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users read own bookmarks" ON "public"."user_bookmarks" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users read own certificates" ON "public"."certificates" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users read own enrollments" ON "public"."enrollments" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users read own progress" ON "public"."user_progress" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users update own bookmarks" ON "public"."user_bookmarks" FOR UPDATE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users update own enrollments" ON "public"."enrollments" FOR UPDATE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users update own progress" ON "public"."user_progress" FOR UPDATE USING (("auth"."uid"() = "user_id"));



ALTER TABLE "public"."ai_conversations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."ai_messages" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."categories" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."certificates" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."chunks" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."content_chunks" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."courses" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."crawled_pages" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."documents" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."embeddings" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."enrollments" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."exercise_attempts" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."exercise_progress" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."faqs" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."learning_paths" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."lessons" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."practice_exercises" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."product_translations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."products" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."quiz_attempts" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."resources" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."training_courses" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."training_lessons" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."troubleshooting_guides" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_activity_stats" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_bookmarks" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_progress" ENABLE ROW LEVEL SECURITY;


REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";



GRANT ALL ON FUNCTION "public"."course_completion_percentage"("p_user_id" "uuid", "p_course_id" "text") TO "authenticated";



REVOKE ALL ON FUNCTION "public"."evaluate_lesson_completion"("p_user_id" "uuid", "p_lesson_id" "text") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."evaluate_lesson_completion"("p_user_id" "uuid", "p_lesson_id" "text") TO "authenticated";



GRANT ALL ON FUNCTION "public"."get_active_students_count"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_active_students_count"() TO "authenticated";



GRANT ALL ON FUNCTION "public"."get_admin_metrics"() TO "authenticated";



GRANT ALL ON FUNCTION "public"."get_hardest_exercises"("limit_count" integer) TO "authenticated";



GRANT ALL ON FUNCTION "public"."get_student_metrics"("target_user_id" "uuid") TO "authenticated";



REVOKE ALL ON FUNCTION "public"."mark_lesson_complete"("p_user_id" "uuid", "p_lesson_id" "text", "p_status" "text", "p_percentage" integer, "p_notes" "text", "p_course_id" "text") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."mark_lesson_complete"("p_user_id" "uuid", "p_lesson_id" "text", "p_status" "text", "p_percentage" integer, "p_notes" "text", "p_course_id" "text") TO "authenticated";



REVOKE ALL ON FUNCTION "public"."record_quiz_attempt"("p_user_id" "uuid", "p_lesson_id" "text", "p_course_id" "text", "p_score" integer, "p_total" integer, "p_pass_threshold" numeric) FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."record_quiz_attempt"("p_user_id" "uuid", "p_lesson_id" "text", "p_course_id" "text", "p_score" integer, "p_total" integer, "p_pass_threshold" numeric) TO "authenticated";



GRANT SELECT,INSERT,UPDATE ON TABLE "public"."exercise_progress" TO "authenticated";



REVOKE ALL ON FUNCTION "public"."save_exercise_progress"("p_user_id" "uuid", "p_exercise_id" "text", "p_lesson_id" "text", "p_course_id" "text", "p_started_at" timestamp with time zone, "p_completed_at" timestamp with time zone, "p_last_activity_at" timestamp with time zone, "p_time_spent_seconds" integer, "p_progress_percentage" integer, "p_status" "text", "p_score" numeric, "p_attempts" integer, "p_checkpoint_data" "jsonb", "p_answers" "jsonb") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."save_exercise_progress"("p_user_id" "uuid", "p_exercise_id" "text", "p_lesson_id" "text", "p_course_id" "text", "p_started_at" timestamp with time zone, "p_completed_at" timestamp with time zone, "p_last_activity_at" timestamp with time zone, "p_time_spent_seconds" integer, "p_progress_percentage" integer, "p_status" "text", "p_score" numeric, "p_attempts" integer, "p_checkpoint_data" "jsonb", "p_answers" "jsonb") TO "authenticated";



GRANT ALL ON FUNCTION "public"."store_generated_password"("p_user_id" "uuid", "p_email" "text", "p_password" "text") TO "authenticated";



GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "authenticated";



GRANT ALL ON TABLE "public"."ai_conversations" TO "anon";
GRANT ALL ON TABLE "public"."ai_conversations" TO "authenticated";
GRANT ALL ON TABLE "public"."ai_conversations" TO "service_role";



GRANT ALL ON TABLE "public"."ai_messages" TO "anon";
GRANT ALL ON TABLE "public"."ai_messages" TO "authenticated";
GRANT ALL ON TABLE "public"."ai_messages" TO "service_role";



GRANT ALL ON TABLE "public"."categories" TO "anon";
GRANT ALL ON TABLE "public"."categories" TO "authenticated";
GRANT ALL ON TABLE "public"."categories" TO "service_role";



GRANT ALL ON TABLE "public"."certificates" TO "anon";
GRANT ALL ON TABLE "public"."certificates" TO "authenticated";
GRANT ALL ON TABLE "public"."certificates" TO "service_role";



GRANT ALL ON TABLE "public"."chunks" TO "anon";
GRANT ALL ON TABLE "public"."chunks" TO "authenticated";
GRANT ALL ON TABLE "public"."chunks" TO "service_role";



GRANT ALL ON TABLE "public"."content_chunks" TO "anon";
GRANT ALL ON TABLE "public"."content_chunks" TO "authenticated";
GRANT ALL ON TABLE "public"."content_chunks" TO "service_role";



GRANT ALL ON TABLE "public"."courses" TO "anon";
GRANT ALL ON TABLE "public"."courses" TO "authenticated";
GRANT ALL ON TABLE "public"."courses" TO "service_role";



GRANT ALL ON TABLE "public"."crawled_pages" TO "anon";
GRANT ALL ON TABLE "public"."crawled_pages" TO "authenticated";
GRANT ALL ON TABLE "public"."crawled_pages" TO "service_role";



GRANT ALL ON TABLE "public"."documents" TO "anon";
GRANT ALL ON TABLE "public"."documents" TO "authenticated";
GRANT ALL ON TABLE "public"."documents" TO "service_role";



GRANT ALL ON TABLE "public"."embeddings" TO "anon";
GRANT ALL ON TABLE "public"."embeddings" TO "authenticated";
GRANT ALL ON TABLE "public"."embeddings" TO "service_role";



GRANT ALL ON TABLE "public"."enrollments" TO "anon";
GRANT ALL ON TABLE "public"."enrollments" TO "authenticated";
GRANT ALL ON TABLE "public"."enrollments" TO "service_role";



GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."exercise_attempts" TO "authenticated";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."exercise_attempts" TO "anon";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "public"."exercise_attempts" TO "service_role";



GRANT ALL ON TABLE "public"."faqs" TO "anon";
GRANT ALL ON TABLE "public"."faqs" TO "authenticated";
GRANT ALL ON TABLE "public"."faqs" TO "service_role";



GRANT ALL ON TABLE "public"."learning_paths" TO "anon";
GRANT ALL ON TABLE "public"."learning_paths" TO "authenticated";
GRANT ALL ON TABLE "public"."learning_paths" TO "service_role";



GRANT ALL ON TABLE "public"."lessons" TO "anon";
GRANT ALL ON TABLE "public"."lessons" TO "authenticated";
GRANT ALL ON TABLE "public"."lessons" TO "service_role";



GRANT ALL ON TABLE "public"."practice_exercises" TO "anon";
GRANT ALL ON TABLE "public"."practice_exercises" TO "authenticated";
GRANT ALL ON TABLE "public"."practice_exercises" TO "service_role";



GRANT ALL ON TABLE "public"."product_translations" TO "anon";
GRANT ALL ON TABLE "public"."product_translations" TO "authenticated";



GRANT ALL ON TABLE "public"."products" TO "anon";
GRANT ALL ON TABLE "public"."products" TO "authenticated";
GRANT ALL ON TABLE "public"."products" TO "service_role";



GRANT SELECT,INSERT,DELETE ON TABLE "public"."quiz_attempts" TO "authenticated";



GRANT ALL ON TABLE "public"."resources" TO "anon";
GRANT ALL ON TABLE "public"."resources" TO "authenticated";
GRANT ALL ON TABLE "public"."resources" TO "service_role";



GRANT ALL ON TABLE "public"."training_courses" TO "anon";
GRANT ALL ON TABLE "public"."training_courses" TO "authenticated";
GRANT ALL ON TABLE "public"."training_courses" TO "service_role";



GRANT ALL ON TABLE "public"."training_lessons" TO "anon";
GRANT ALL ON TABLE "public"."training_lessons" TO "authenticated";
GRANT ALL ON TABLE "public"."training_lessons" TO "service_role";



GRANT ALL ON TABLE "public"."troubleshooting_guides" TO "anon";
GRANT ALL ON TABLE "public"."troubleshooting_guides" TO "authenticated";
GRANT ALL ON TABLE "public"."troubleshooting_guides" TO "service_role";



GRANT ALL ON TABLE "public"."user_activity_stats" TO "anon";
GRANT ALL ON TABLE "public"."user_activity_stats" TO "authenticated";
GRANT ALL ON TABLE "public"."user_activity_stats" TO "service_role";



GRANT ALL ON TABLE "public"."user_bookmarks" TO "anon";
GRANT ALL ON TABLE "public"."user_bookmarks" TO "authenticated";
GRANT ALL ON TABLE "public"."user_bookmarks" TO "service_role";



GRANT ALL ON TABLE "public"."user_progress" TO "anon";
GRANT ALL ON TABLE "public"."user_progress" TO "authenticated";
GRANT ALL ON TABLE "public"."user_progress" TO "service_role";



GRANT SELECT ON TABLE "public"."v_enrollment_completion" TO "authenticated";
