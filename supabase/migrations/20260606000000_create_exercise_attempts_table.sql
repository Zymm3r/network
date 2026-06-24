-- Create exercise_attempts table for persistent exercise attempt tracking
CREATE TABLE IF NOT EXISTS public.exercise_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    exercise_id TEXT NOT NULL,
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE NOT NULL,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
    passed BOOLEAN NOT NULL,
    score INTEGER,
    attempts_count INTEGER NOT NULL DEFAULT 1,
    stdout TEXT,
    error_message TEXT,
    execution_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_exercise_attempts_user_id ON public.exercise_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_exercise_attempts_exercise_id ON public.exercise_attempts(exercise_id);
CREATE INDEX IF NOT EXISTS idx_exercise_attempts_lesson_id ON public.exercise_attempts(lesson_id);
CREATE INDEX IF NOT EXISTS idx_exercise_attempts_user_exercise ON public.exercise_attempts(user_id, exercise_id);

-- Unique constraint for deduplication (one per user per exercise per timestamp)
CREATE UNIQUE INDEX IF NOT EXISTS unique_exercise_attempt_idx
ON public.exercise_attempts(user_id, exercise_id, execution_timestamp);

-- Enable Row Level Security
ALTER TABLE public.exercise_attempts ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only view/insert/update their own exercise attempts
CREATE POLICY "Users can view their own exercise attempts" ON public.exercise_attempts
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own exercise attempts" ON public.exercise_attempts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own exercise attempts" ON public.exercise_attempts
    FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Create trigger to auto-update updated_at on modification
DROP TRIGGER IF EXISTS update_exercise_attempts_updated_at ON public.exercise_attempts;
CREATE TRIGGER update_exercise_attempts_updated_at
    BEFORE UPDATE ON public.exercise_attempts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
