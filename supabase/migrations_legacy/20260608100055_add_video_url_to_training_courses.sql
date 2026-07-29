-- Add video_url column to training_courses
ALTER TABLE public.training_courses ADD COLUMN IF NOT EXISTS video_url TEXT;

-- Seed placeholder YouTube videos for existing records
UPDATE public.training_courses 
SET video_url = 'https://www.youtube.com/embed/cKqE1yM0L50' 
WHERE video_url IS NULL;
