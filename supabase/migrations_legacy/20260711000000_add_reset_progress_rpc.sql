-- Create a function to reset the current user's learning data
CREATE OR REPLACE FUNCTION reset_my_learning_progress()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Delete all progress for the currently authenticated user
  DELETE FROM user_progress WHERE user_id = auth.uid();
  
  -- Delete all user stats
  DELETE FROM user_stats WHERE user_id = auth.uid();
  
  -- Delete all enrollments
  DELETE FROM enrollments WHERE user_id = auth.uid();

  -- Delete exercise attempts
  DELETE FROM exercise_attempts WHERE user_id = auth.uid();
END;
$$;
