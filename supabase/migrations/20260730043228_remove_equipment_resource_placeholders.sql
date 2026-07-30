-- Remove generated equipment cards that do not link to usable content.
DELETE FROM public.documents
WHERE file_url IS NULL
   OR btrim(file_url) = ''
   OR file_url ~* '^https?://([^/]+\.)?example\.com(?:/|$)';

DELETE FROM public.troubleshooting_guides
WHERE btrim(issue) = 'เปิดไม่ติด / No Power'
  AND btrim(symptoms) = 'ไฟสถานะไม่สว่าง เครื่องไม่ทำงาน';

DELETE FROM public.training_lessons
WHERE video_url IS NULL
   OR btrim(video_url) = ''
   OR video_url ~* '^https?://([^/]+\.)?example\.com(?:/|$)';

DELETE FROM public.training_courses AS course
WHERE (
    course.video_url IS NULL
    OR btrim(course.video_url) = ''
    OR course.video_url ~* '^https?://([^/]+\.)?example\.com(?:/|$)'
  )
  AND NOT EXISTS (
    SELECT 1
    FROM public.training_lessons AS lesson
    WHERE lesson.course_id = course.id
  );
