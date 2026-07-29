-- Migration: Certificates and Learning Paths
-- Create Certificates table
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    learning_path_id UUID REFERENCES public.learning_paths(id) ON DELETE CASCADE,
    certificate_number TEXT UNIQUE NOT NULL,
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    certificate_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CHECK ((course_id IS NOT NULL) OR (learning_path_id IS NOT NULL))
);

-- Ensure a user only gets one certificate per course/path
CREATE UNIQUE INDEX IF NOT EXISTS idx_certificates_user_course ON public.certificates (user_id, course_id) WHERE course_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_certificates_user_path ON public.certificates (user_id, learning_path_id) WHERE learning_path_id IS NOT NULL;

-- Create indexes for fast lookup
CREATE INDEX IF NOT EXISTS idx_certificates_user_id ON public.certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_certificate_number ON public.certificates(certificate_number);

-- Update learning_paths table to include courses and prerequisites as arrays
ALTER TABLE public.learning_paths ADD COLUMN IF NOT EXISTS course_ids UUID[] DEFAULT '{}';
ALTER TABLE public.learning_paths ADD COLUMN IF NOT EXISTS prerequisite_path_ids UUID[] DEFAULT '{}';

-- Enable RLS for certificates
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Policies for certificates
CREATE POLICY "Users can view their own certificates" ON public.certificates
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Certificates are publicly verifiable by number" ON public.certificates
    FOR SELECT USING (true); -- Anyone can verify a certificate if they have the ID/number

CREATE POLICY "Instructors and Admins can insert certificates" ON public.certificates
    FOR INSERT WITH CHECK (
        auth.jwt()->>'role' IN ('admin', 'instructor') 
        OR (auth.users.raw_user_meta_data->>'role' IN ('admin', 'instructor'))
    );

-- Add updated_at trigger for certificates
DROP TRIGGER IF EXISTS update_certificates_updated_at ON public.certificates;
CREATE TRIGGER update_certificates_updated_at
    BEFORE UPDATE ON public.certificates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
