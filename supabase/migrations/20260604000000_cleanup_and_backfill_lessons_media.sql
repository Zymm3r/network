-- Migration: Cleanup and backfill lessons media data
-- Description: Replaces legacy placeholder URLs with clean video IDs and Supabase storage paths

-- Step 1: Cleanup (set to NULL where invalid)
UPDATE public.lessons 
SET video_url = NULL 
WHERE video_url LIKE 'https://example.com/videos/%';

UPDATE public.lessons 
SET thumbnail_url = NULL 
WHERE thumbnail_url LIKE '/images/lessons/%';

-- Step 2: Backfill Video IDs and Storage Thumbnails
UPDATE public.lessons SET video_url = 'qiQR5rTSshw', thumbnail_url = 'lesson-thumbnails/ccna001-01.jpg' WHERE id = 'lesson-ccna001-01';
UPDATE public.lessons SET video_url = 'vv4y_uOneC0', thumbnail_url = 'lesson-thumbnails/ccna001-02.jpg' WHERE id = 'lesson-ccna001-02';
UPDATE public.lessons SET video_url = NULL, thumbnail_url = 'lesson-thumbnails/ccna001-03.jpg' WHERE id = 'lesson-ccna001-03';
UPDATE public.lessons SET video_url = '1z0ULvgBiF8', thumbnail_url = 'lesson-thumbnails/ccna001-04.jpg' WHERE id = 'lesson-ccna001-04';
UPDATE public.lessons SET video_url = 's_Ntt6eTN94', thumbnail_url = 'lesson-thumbnails/ccna001-05.jpg' WHERE id = 'lesson-ccna001-05';
UPDATE public.lessons SET video_url = 'OU-A2EIhc0k', thumbnail_url = 'lesson-thumbnails/wireshark-01.jpg' WHERE id = 'lesson-wireshark-01';
UPDATE public.lessons SET video_url = 'F052EUzEpmU', thumbnail_url = 'lesson-thumbnails/wireshark-02.jpg' WHERE id = 'lesson-wireshark-02';
UPDATE public.lessons SET video_url = '1AByJvE5dZ4', thumbnail_url = 'lesson-thumbnails/wireshark-03.jpg' WHERE id = 'lesson-wireshark-03';
UPDATE public.lessons SET video_url = 'kqtD5dpn9C8', thumbnail_url = 'lesson-thumbnails/python-01.jpg' WHERE id = 'lesson-python-01';
UPDATE public.lessons SET video_url = '5H4P2sF_4o0', thumbnail_url = 'lesson-thumbnails/python-02.jpg' WHERE id = 'lesson-python-02';
UPDATE public.lessons SET video_url = 'WcR9A-7y69M', thumbnail_url = 'lesson-thumbnails/python-03.jpg' WHERE id = 'lesson-python-03';
UPDATE public.lessons SET video_url = 'v=K2n90kZfE2E', thumbnail_url = 'lesson-thumbnails/sec-01.jpg' WHERE id = 'lesson-sec-01';
UPDATE public.lessons SET video_url = 'pE6Z5r8s9r4', thumbnail_url = 'lesson-thumbnails/sec-02.jpg' WHERE id = 'lesson-sec-02';
UPDATE public.lessons SET video_url = 'D0rQ_K-b2C4', thumbnail_url = 'lesson-thumbnails/adv-001.jpg' WHERE id = 'lesson-adv-001';
UPDATE public.lessons SET video_url = 'KqfE1h4l5a8', thumbnail_url = 'lesson-thumbnails/adv-002.jpg' WHERE id = 'lesson-adv-002';
