-- Persistent, per-user exercise state. Existing exercise_attempts are retained as history.
CREATE TABLE IF NOT EXISTS public.exercise_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exercise_id text NOT NULL,
  lesson_id text REFERENCES public.lessons(id) ON DELETE SET NULL,
  course_id text REFERENCES public.courses(id) ON DELETE SET NULL,
  started_at timestamptz,
  completed_at timestamptz,
  last_activity_at timestamptz NOT NULL DEFAULT now(),
  time_spent_seconds integer NOT NULL DEFAULT 0 CHECK (time_spent_seconds >= 0),
  progress_percentage integer NOT NULL DEFAULT 0 CHECK (progress_percentage BETWEEN 0 AND 100),
  status text NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  score numeric,
  attempts integer NOT NULL DEFAULT 0 CHECK (attempts >= 0),
  checkpoint_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT exercise_progress_user_exercise_key UNIQUE (user_id, exercise_id)
);

CREATE INDEX IF NOT EXISTS idx_exercise_progress_user_activity
  ON public.exercise_progress (user_id, last_activity_at DESC);
CREATE INDEX IF NOT EXISTS idx_exercise_progress_lesson
  ON public.exercise_progress (lesson_id) WHERE lesson_id IS NOT NULL;

ALTER TABLE public.exercise_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own exercise progress" ON public.exercise_progress;
DROP POLICY IF EXISTS "Users can insert their own exercise progress" ON public.exercise_progress;
DROP POLICY IF EXISTS "Users can update their own exercise progress" ON public.exercise_progress;

CREATE POLICY "Users can view their own exercise progress" ON public.exercise_progress
  FOR SELECT TO authenticated USING ((select auth.uid()) = user_id);
CREATE POLICY "Users can insert their own exercise progress" ON public.exercise_progress
  FOR INSERT TO authenticated WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "Users can update their own exercise progress" ON public.exercise_progress
  FOR UPDATE TO authenticated USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

DROP TRIGGER IF EXISTS update_exercise_progress_updated_at ON public.exercise_progress;
CREATE TRIGGER update_exercise_progress_updated_at
  BEFORE UPDATE ON public.exercise_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

GRANT SELECT, INSERT, UPDATE ON public.exercise_progress TO authenticated;
