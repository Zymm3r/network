-- Course-level quizzes and Python exercises are not tied to one lesson.
ALTER TABLE public.exercise_attempts
ALTER COLUMN lesson_id DROP NOT NULL;

CREATE INDEX IF NOT EXISTS idx_exercise_attempts_user_course
ON public.exercise_attempts (user_id, course_id, created_at DESC);
