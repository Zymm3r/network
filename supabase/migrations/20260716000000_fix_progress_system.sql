-- ============================================================
-- CRITICAL FIX: Progress System Consistency
-- ============================================================

-- 1. Add progress_percentage column to enrollments if not exists
ALTER TABLE public.enrollments 
ADD COLUMN IF NOT EXISTS progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100);

ALTER TABLE public.enrollments
ADD COLUMN IF NOT EXISTS last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- 2. Ensure user_progress has course_id properly indexed
CREATE INDEX IF NOT EXISTS idx_user_progress_lesson_id 
ON public.user_progress (lesson_id) WHERE lesson_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_user_progress_completed 
ON public.user_progress (user_id, status) WHERE status = 'completed';

-- 3. Remove duplicate unique constraint (the partial unique index is sufficient)
-- Drop the table-level UNIQUE constraint if it exists (we use the partial unique index instead)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'unique_user_progress_lesson' 
    AND conrelid = 'public.user_progress'::regclass
  ) THEN
    ALTER TABLE public.user_progress DROP CONSTRAINT unique_user_progress_lesson;
  END IF;
END $$;

-- 4. Ensure exercise_progress has correct RLS policies (re-create if missing)
DROP POLICY IF EXISTS "Users can view their own exercise progress" ON public.exercise_progress;
DROP POLICY IF EXISTS "Users can insert their own exercise progress" ON public.exercise_progress;
DROP POLICY IF EXISTS "Users can update their own exercise progress" ON public.exercise_progress;

CREATE POLICY "Users can view their own exercise progress" ON public.exercise_progress
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own exercise progress" ON public.exercise_progress
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own exercise progress" ON public.exercise_progress
  FOR UPDATE TO authenticated USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 5. Ensure enrollments RLS policies exist
DROP POLICY IF EXISTS "Users can view their own enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Users can insert their own enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Users can update their own enrollments" ON public.enrollments;

CREATE POLICY "Users can view their own enrollments" ON public.enrollments
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own enrollments" ON public.enrollments
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own enrollments" ON public.enrollments
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 6. Ensure user_progress RLS policies are correct
DROP POLICY IF EXISTS "Users can view their own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can insert their own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can update their own progress" ON public.user_progress;

CREATE POLICY "Users can view their own progress" ON public.user_progress
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own progress" ON public.user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own progress" ON public.user_progress
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 7. Grant necessary permissions
GRANT ALL ON public.user_progress TO authenticated;
GRANT ALL ON public.enrollments TO authenticated;
GRANT ALL ON public.exercise_progress TO authenticated;