-- Create the product_translations table
CREATE TABLE IF NOT EXISTS public.product_translations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    language TEXT NOT NULL CHECK (language IN ('en', 'th')),
    content TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(product_id, language)
);

-- Enable RLS
ALTER TABLE public.product_translations ENABLE ROW LEVEL SECURITY;

-- Create policy for reading translations (everyone can read)
CREATE POLICY "Product translations are viewable by everyone" 
    ON public.product_translations 
    FOR SELECT 
    USING (true);
