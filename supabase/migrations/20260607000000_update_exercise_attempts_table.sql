-- Add new columns to exercise_attempts to fulfill Milestone 4 requirements

ALTER TABLE public.exercise_attempts
ADD COLUMN IF NOT EXISTS submitted_code TEXT,
ADD COLUMN IF NOT EXISTS passed_tests INTEGER,
ADD COLUMN IF NOT EXISTS total_tests INTEGER,
ADD COLUMN IF NOT EXISTS execution_time INTEGER,
ADD COLUMN IF NOT EXISTS status TEXT CHECK (status IN ('passed', 'failed', 'error', 'timeout'));

-- Update existing records if any
UPDATE public.exercise_attempts SET status = 'passed' WHERE passed = true AND status IS NULL;
UPDATE public.exercise_attempts SET status = 'failed' WHERE passed = false AND status IS NULL;

-- Remove the unique constraint that limits to one per user per exercise per timestamp, 
-- because we want to track ALL attempts persistently, and timestamp might be identical if executed extremely fast or batched
DROP INDEX IF EXISTS unique_exercise_attempt_idx;
