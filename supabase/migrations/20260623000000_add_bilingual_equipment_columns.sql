-- Idempotent migration to add bilingual columns to the 6 equipment tables

-- 1. products table
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS name_th TEXT,
ADD COLUMN IF NOT EXISTS name_en TEXT,
ADD COLUMN IF NOT EXISTS description_th TEXT,
ADD COLUMN IF NOT EXISTS description_en TEXT,
ADD COLUMN IF NOT EXISTS content_th TEXT,
ADD COLUMN IF NOT EXISTS content_en TEXT;

-- 2. documents table
ALTER TABLE public.documents
ADD COLUMN IF NOT EXISTS title_th TEXT,
ADD COLUMN IF NOT EXISTS title_en TEXT;

-- 3. faqs table
ALTER TABLE public.faqs
ADD COLUMN IF NOT EXISTS question_th TEXT,
ADD COLUMN IF NOT EXISTS question_en TEXT,
ADD COLUMN IF NOT EXISTS answer_th TEXT,
ADD COLUMN IF NOT EXISTS answer_en TEXT;

-- 4. troubleshooting_guides table
ALTER TABLE public.troubleshooting_guides
ADD COLUMN IF NOT EXISTS issue_th TEXT,
ADD COLUMN IF NOT EXISTS issue_en TEXT,
ADD COLUMN IF NOT EXISTS symptoms_th TEXT,
ADD COLUMN IF NOT EXISTS symptoms_en TEXT,
ADD COLUMN IF NOT EXISTS solution_th TEXT,
ADD COLUMN IF NOT EXISTS solution_en TEXT;

-- 5. training_courses table
ALTER TABLE public.training_courses
ADD COLUMN IF NOT EXISTS title_th TEXT,
ADD COLUMN IF NOT EXISTS title_en TEXT,
ADD COLUMN IF NOT EXISTS description_th TEXT,
ADD COLUMN IF NOT EXISTS description_en TEXT;

-- 6. training_lessons table
ALTER TABLE public.training_lessons
ADD COLUMN IF NOT EXISTS title_th TEXT,
ADD COLUMN IF NOT EXISTS title_en TEXT,
ADD COLUMN IF NOT EXISTS content_th TEXT,
ADD COLUMN IF NOT EXISTS content_en TEXT;
