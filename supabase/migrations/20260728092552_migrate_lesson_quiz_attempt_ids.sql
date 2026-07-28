-- Keep existing lesson quiz history when attempts become lesson-scoped.
UPDATE public.exercise_attempts
SET exercise_id = 'quiz:lesson:' || lesson_id
WHERE lesson_id IS NOT NULL
  AND exercise_id LIKE 'quiz:%'
  AND exercise_id NOT LIKE 'quiz:lesson:%';
