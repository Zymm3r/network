CREATE TABLE IF NOT EXISTS public.user_activity_stats (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    total_active_seconds INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.user_activity_stats ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Users can view own stats" ON public.user_activity_stats
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own stats" ON public.user_activity_stats
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own stats" ON public.user_activity_stats
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RPC Function for Atomic Increment
CREATE OR REPLACE FUNCTION public.increment_study_time(increment_seconds INT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    INSERT INTO public.user_activity_stats (user_id, total_active_seconds)
    VALUES (auth.uid(), increment_seconds)
    ON CONFLICT (user_id) 
    DO UPDATE SET 
        total_active_seconds = user_activity_stats.total_active_seconds + EXCLUDED.total_active_seconds,
        updated_at = NOW();
END;
$$;
