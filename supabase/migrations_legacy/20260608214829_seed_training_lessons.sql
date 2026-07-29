-- Migration: seed_training_lessons
-- Description: Seed training_lessons with placeholder YouTube training videos for existing training_courses.
-- This migration is idempotent.

INSERT INTO public.training_lessons (id, course_id, title, video_url, lesson_order)
SELECT 
    gen_random_uuid(),
    tc.id,
    tc.title || ' - Placeholder Video Lesson',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    1
FROM public.training_courses tc
WHERE NOT EXISTS (
    SELECT 1 FROM public.training_lessons tl WHERE tl.course_id = tc.id
);
