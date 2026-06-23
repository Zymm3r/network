-- Ensure RLS is enabled on all equipment catalog tables
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.troubleshooting_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_courses ENABLE ROW LEVEL SECURITY;

-- Safely drop existing policies to prevent duplication errors
DROP POLICY IF EXISTS "Products are viewable by everyone." ON public.products;
DROP POLICY IF EXISTS "Documents are viewable by everyone." ON public.documents;
DROP POLICY IF EXISTS "FAQs are viewable by everyone." ON public.faqs;
DROP POLICY IF EXISTS "Troubleshooting guides are viewable by everyone." ON public.troubleshooting_guides;
DROP POLICY IF EXISTS "Training courses are viewable by everyone." ON public.training_courses;

-- Allow public read access (SELECT) to equipment catalog tables
CREATE POLICY "Products are viewable by everyone." ON public.products FOR SELECT USING (true);
CREATE POLICY "Documents are viewable by everyone." ON public.documents FOR SELECT USING (true);
CREATE POLICY "FAQs are viewable by everyone." ON public.faqs FOR SELECT USING (true);
CREATE POLICY "Troubleshooting guides are viewable by everyone." ON public.troubleshooting_guides FOR SELECT USING (true);
CREATE POLICY "Training courses are viewable by everyone." ON public.training_courses FOR SELECT USING (true);
