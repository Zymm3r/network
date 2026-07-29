-- Migration: Add lesson_id to user_progress
ALTER TABLE public.user_progress 
ADD COLUMN IF NOT EXISTS lesson_id text REFERENCES public.lessons(id) ON DELETE CASCADE;

-- Create a unique index for (user_id, lesson_id) when lesson_id is not null
CREATE UNIQUE INDEX IF NOT EXISTS unique_user_progress_lesson_idx 
ON public.user_progress (user_id, lesson_id) 
WHERE lesson_id IS NOT NULL;
