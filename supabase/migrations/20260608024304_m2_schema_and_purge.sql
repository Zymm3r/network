ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES public.categories(id),
ADD COLUMN IF NOT EXISTS source_url TEXT;

TRUNCATE public.documents, public.faqs, public.troubleshooting_guides, public.training_courses, public.training_lessons CASCADE;
