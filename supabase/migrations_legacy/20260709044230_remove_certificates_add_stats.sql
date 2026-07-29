-- Drop certificates and related tables
DROP TABLE IF EXISTS public.certificates CASCADE;

-- Create user_stats table for XP and Learning Analytics
CREATE TABLE IF NOT EXISTS public.user_stats (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  xp INTEGER NOT NULL DEFAULT 0,
  level INTEGER NOT NULL DEFAULT 1,
  streak_days INTEGER NOT NULL DEFAULT 0,
  total_learning_sessions INTEGER NOT NULL DEFAULT 0,
  today_study_seconds INTEGER NOT NULL DEFAULT 0,
  weekly_study_seconds INTEGER NOT NULL DEFAULT 0,
  monthly_study_seconds INTEGER NOT NULL DEFAULT 0,
  total_study_seconds INTEGER NOT NULL DEFAULT 0,
  last_learning_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own stats"
  ON public.user_stats FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own stats via function"
  ON public.user_stats FOR UPDATE
  USING (auth.uid() = user_id);

-- Create a secure RPC function to record learning activity (XP and study time)
-- This avoids race conditions and duplicate writes by handling UPSERT atomically.
CREATE OR REPLACE FUNCTION record_learning_activity(
  p_user_id UUID,
  p_xp_gained INTEGER,
  p_study_seconds INTEGER
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_today DATE := CURRENT_DATE;
  v_last_learning_date DATE;
  v_current_xp INTEGER;
  v_current_level INTEGER;
  v_new_xp INTEGER;
  v_new_level INTEGER;
BEGIN
  -- Insert default stats if they don't exist
  INSERT INTO public.user_stats (user_id)
  VALUES (p_user_id)
  ON CONFLICT (user_id) DO NOTHING;

  -- Select current stats FOR UPDATE to lock the row
  SELECT xp, level, last_learning_date 
  INTO v_current_xp, v_current_level, v_last_learning_date
  FROM public.user_stats
  WHERE user_id = p_user_id
  FOR UPDATE;

  -- Calculate streak
  -- If last learning date was yesterday, increment streak.
  -- If last learning date was before yesterday, reset streak to 1.
  -- If last learning date is today, keep streak the same.
  IF v_last_learning_date IS NULL THEN
    UPDATE public.user_stats SET streak_days = 1 WHERE user_id = p_user_id;
  ELSIF v_last_learning_date = v_today - INTERVAL '1 day' THEN
    UPDATE public.user_stats SET streak_days = streak_days + 1 WHERE user_id = p_user_id;
  ELSIF v_last_learning_date < v_today - INTERVAL '1 day' THEN
    UPDATE public.user_stats SET streak_days = 1 WHERE user_id = p_user_id;
  END IF;

  -- Reset daily/weekly/monthly stats if period has changed
  -- (A simple approach for daily reset: just check if last_learning_date is different from today)
  IF v_last_learning_date IS DISTINCT FROM v_today THEN
    UPDATE public.user_stats 
    SET today_study_seconds = 0
    WHERE user_id = p_user_id;
    
    -- In a real production environment, weekly/monthly resets would involve DATE_TRUNC checks.
    -- For this simplified version, we just reset daily.
  END IF;

  -- Calculate new XP and Level
  -- Formula: Level = FLOOR(SQRT(XP / 100)) + 1 (or something similar).
  -- Let's use simple threshold: Level = (XP / 100) + 1
  v_new_xp := COALESCE(v_current_xp, 0) + COALESCE(p_xp_gained, 0);
  v_new_level := (v_new_xp / 100) + 1;

  -- Update the stats
  UPDATE public.user_stats
  SET 
    xp = v_new_xp,
    level = v_new_level,
    last_learning_date = v_today,
    today_study_seconds = today_study_seconds + COALESCE(p_study_seconds, 0),
    total_study_seconds = total_study_seconds + COALESCE(p_study_seconds, 0),
    total_learning_sessions = total_learning_sessions + 1,
    updated_at = NOW()
  WHERE user_id = p_user_id;

END;
$$;

-- Drop certificate-related views if any (e.g. from analytics)
-- We will recreate the get_student_metrics to not rely on certificates
DROP FUNCTION IF EXISTS get_student_metrics(uuid);

CREATE OR REPLACE FUNCTION get_student_metrics(target_user_id UUID)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_enrolled_courses INTEGER;
  v_completed_lessons INTEGER;
  v_completed_exercises INTEGER;
  v_avg_score FLOAT;
  v_total_study_time INTEGER;
  v_completion_rate INTEGER;
  v_xp INTEGER;
  v_level INTEGER;
  v_streak_days INTEGER;
BEGIN
  -- Get enrolled courses
  SELECT COUNT(*) INTO v_enrolled_courses 
  FROM enrollments 
  WHERE user_id = target_user_id AND status IN ('active', 'completed');
  
  -- Get completed lessons
  SELECT COUNT(*) INTO v_completed_lessons 
  FROM user_progress 
  WHERE user_id = target_user_id AND status = 'completed';
  
  -- Get completed exercises and average score
  SELECT 
    COUNT(DISTINCT exercise_id), 
    COALESCE(AVG(score), 0)
  INTO 
    v_completed_exercises, 
    v_avg_score
  FROM exercise_attempts
  WHERE user_id = target_user_id AND passed = true;
  
  -- Get user stats (study time, xp, level, streak)
  SELECT 
    COALESCE(total_study_seconds, 0),
    COALESCE(xp, 0),
    COALESCE(level, 1),
    COALESCE(streak_days, 0)
  INTO 
    v_total_study_time,
    v_xp,
    v_level,
    v_streak_days
  FROM user_stats
  WHERE user_id = target_user_id;
  
  -- Calculate completion rate (simplified)
  -- Real rate would need total lessons for enrolled courses
  IF v_enrolled_courses > 0 THEN
    v_completion_rate := LEAST(100, (v_completed_lessons * 100) / (v_enrolled_courses * 10)); -- Assuming avg 10 lessons per course
  ELSE
    v_completion_rate := 0;
  END IF;

  RETURN json_build_object(
    'enrolled_courses', v_enrolled_courses,
    'completed_lessons', COALESCE(v_completed_lessons, 0),
    'completed_exercises', COALESCE(v_completed_exercises, 0),
    'avg_score', ROUND(COALESCE(v_avg_score, 0)::numeric, 1),
    'study_time', COALESCE(v_total_study_time, 0),
    'completion_rate', COALESCE(v_completion_rate, 0),
    'xp', COALESCE(v_xp, 0),
    'level', COALESCE(v_level, 1),
    'streak_days', COALESCE(v_streak_days, 0)
  );
END;
$$;
