-- ============================================================
-- FIX: Add UNIQUE constraints for ON CONFLICT support
-- ============================================================
-- The app uses .upsert() with onConflict: 'user_id,lesson_id' on
-- user_progress and onConflict: 'user_id,course_id' on enrollments.
-- Postgres requires an actual UNIQUE CONSTRAINT (not just a unique
-- index with a WHERE clause) for ON CONFLICT to work.
-- See error 42P10: "there is no unique or exclusion constraint
-- matching the ON CONFLICT specification"

-- 1. Add UNIQUE constraint on user_progress (user_id, lesson_id)
-- Drop the partial unique index since we'll replace it with a full constraint
DROP INDEX IF EXISTS unique_user_progress_lesson_idx;

-- Remove any pre-existing constraint (from a previous failed migration)
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

-- Add the actual UNIQUE constraint (required by ON CONFLICT)
-- We use NULLS NOT DISTINCT so that multiple rows with NULL lesson_id
-- are still treated as distinct (allows progress without a specific lesson)
ALTER TABLE public.user_progress
ADD CONSTRAINT unique_user_progress_lesson
UNIQUE (user_id, lesson_id);

-- 2. Add UNIQUE constraint on enrollments (user_id, course_id)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'unique_enrollment_user_course'
    AND conrelid = 'public.enrollments'::regclass
  ) THEN
    ALTER TABLE public.enrollments DROP CONSTRAINT unique_enrollment_user_course;
  END IF;
END $$;

ALTER TABLE public.enrollments
ADD CONSTRAINT unique_enrollment_user_course
UNIQUE (user_id, course_id);

-- 3. Refresh affected triggers that depend on user_progress
-- The trg_sync_enrollment_progress trigger fires on INSERT/UPDATE of user_progress
-- and calls course_completion_percentage(). Ensure it references the constraint correctly.
-- (No changes needed to the trigger itself, it uses NEW/OLD rows directly.)