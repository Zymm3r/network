-- Atomic, owner-checked merge for concurrent tabs and offline replay.
CREATE OR REPLACE FUNCTION public.save_exercise_progress(
  p_user_id uuid,
  p_exercise_id text,
  p_lesson_id text DEFAULT NULL,
  p_course_id text DEFAULT NULL,
  p_started_at timestamptz DEFAULT NULL,
  p_completed_at timestamptz DEFAULT NULL,
  p_last_activity_at timestamptz DEFAULT now(),
  p_time_spent_seconds integer DEFAULT 0,
  p_progress_percentage integer DEFAULT 0,
  p_status text DEFAULT 'in_progress',
  p_score numeric DEFAULT NULL,
  p_attempts integer DEFAULT 0,
  p_checkpoint_data jsonb DEFAULT '{}'::jsonb,
  p_answers jsonb DEFAULT '{}'::jsonb
) RETURNS public.exercise_progress
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public, auth
AS $$
DECLARE result public.exercise_progress;
BEGIN
  IF (SELECT auth.uid()) IS DISTINCT FROM p_user_id THEN
    RAISE EXCEPTION 'exercise progress may only be saved by its owner';
  END IF;

  INSERT INTO public.exercise_progress AS ep (
    user_id, exercise_id, lesson_id, course_id, started_at, completed_at,
    last_activity_at, time_spent_seconds, progress_percentage, status, score,
    attempts, checkpoint_data, answers
  ) VALUES (
    p_user_id, p_exercise_id, p_lesson_id, p_course_id, p_started_at,
    CASE WHEN p_status = 'completed' THEN COALESCE(p_completed_at, p_last_activity_at) END,
    p_last_activity_at, GREATEST(0, p_time_spent_seconds),
    LEAST(100, GREATEST(0, p_progress_percentage)), p_status, p_score,
    GREATEST(0, p_attempts), COALESCE(p_checkpoint_data, '{}'::jsonb),
    COALESCE(p_answers, '{}'::jsonb)
  )
  ON CONFLICT (user_id, exercise_id) DO UPDATE SET
    lesson_id = COALESCE(ep.lesson_id, EXCLUDED.lesson_id),
    course_id = COALESCE(ep.course_id, EXCLUDED.course_id),
    started_at = COALESCE(ep.started_at, EXCLUDED.started_at),
    completed_at = COALESCE(ep.completed_at, EXCLUDED.completed_at),
    last_activity_at = EXCLUDED.last_activity_at,
    time_spent_seconds = GREATEST(ep.time_spent_seconds, EXCLUDED.time_spent_seconds),
    progress_percentage = GREATEST(ep.progress_percentage, EXCLUDED.progress_percentage),
    status = CASE WHEN ep.status = 'completed' OR EXCLUDED.status = 'completed' THEN 'completed' ELSE EXCLUDED.status END,
    score = COALESCE(EXCLUDED.score, ep.score),
    attempts = GREATEST(ep.attempts, EXCLUDED.attempts),
    checkpoint_data = ep.checkpoint_data || EXCLUDED.checkpoint_data,
    answers = ep.answers || EXCLUDED.answers
  WHERE ep.last_activity_at <= EXCLUDED.last_activity_at
  RETURNING * INTO result;

  IF result IS NULL THEN
    SELECT * INTO result FROM public.exercise_progress
      WHERE user_id = p_user_id AND exercise_id = p_exercise_id;
  END IF;
  RETURN result;
END;
$$;

REVOKE ALL ON FUNCTION public.save_exercise_progress(uuid, text, text, text, timestamptz, timestamptz, timestamptz, integer, integer, text, numeric, integer, jsonb, jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.save_exercise_progress(uuid, text, text, text, timestamptz, timestamptz, timestamptz, integer, integer, text, numeric, integer, jsonb, jsonb) TO authenticated;

-- Do not change existing data. Fail safely if the earlier constraint migration
-- did not complete because historic duplicates exist.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM public.user_progress WHERE lesson_id IS NOT NULL
    GROUP BY user_id, lesson_id HAVING count(*) > 1
  ) THEN
    RAISE EXCEPTION 'Cannot enforce user_progress uniqueness until duplicate user/lesson rows are resolved';
  END IF;
END $$;
