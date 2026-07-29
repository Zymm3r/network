-- Create practice_exercises table for quiz and exercise functionality
CREATE TABLE IF NOT EXISTS public.practice_exercises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
    question_th TEXT NOT NULL,
    question_en TEXT NOT NULL,
    options TEXT[] NOT NULL,
    correct_index INTEGER NOT NULL CHECK (correct_index >= 0),
    explanation_th TEXT,
    explanation_en TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_practice_exercises_lesson_id ON public.practice_exercises(lesson_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.practice_exercises ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for practice_exercises
CREATE POLICY "Practice exercises are viewable by everyone" ON public.practice_exercises
    FOR SELECT USING (true);

-- Add updated_at trigger
DROP TRIGGER IF EXISTS update_practice_exercises_updated_at ON public.practice_exercises;
CREATE TRIGGER update_practice_exercises_updated_at
    BEFORE UPDATE ON public.practice_exercises
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();