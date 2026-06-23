-- Migration: Analytics RPCs and Views
-- Create a function to check if the current user is an admin/instructor
CREATE OR REPLACE FUNCTION is_admin_or_instructor()
RETURNS BOOLEAN AS $$
DECLARE
    user_role TEXT;
BEGIN
    SELECT raw_user_meta_data->>'role' INTO user_role FROM auth.users WHERE id = auth.uid();
    
    -- For development/testing purposes, if there is no role, we might want to fail safe.
    -- However, let's allow someone with 'admin' or 'instructor' role.
    IF user_role IN ('admin', 'instructor') THEN
        RETURN TRUE;
    END IF;
    
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RPC for Student Metrics
CREATE OR REPLACE FUNCTION get_student_metrics(target_user_id UUID)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    -- Authorization: Only the user themselves or an admin can view these metrics
    IF auth.uid() != target_user_id AND NOT is_admin_or_instructor() THEN
        RAISE EXCEPTION 'Not authorized to view these metrics';
    END IF;

    SELECT json_build_object(
        'enrolled_courses', (SELECT count(*) FROM public.enrollments WHERE user_id = target_user_id AND status = 'active'),
        'completed_lessons', (SELECT count(*) FROM public.user_progress WHERE user_id = target_user_id AND status = 'completed'),
        'completed_exercises', (SELECT count(*) FROM public.exercise_attempts WHERE user_id = target_user_id AND passed = true),
        'avg_score', (SELECT coalesce(avg(score), 0) FROM public.exercise_attempts WHERE user_id = target_user_id),
        'study_time', (
             SELECT coalesce(sum(l.duration_minutes), 0)
             FROM public.user_progress p
             JOIN public.lessons l ON p.lesson_id = l.id
             WHERE p.user_id = target_user_id AND p.status = 'completed'
        ),
        'completion_rate', (
             SELECT CASE 
               WHEN count(*) = 0 THEN 0 
               ELSE round( (count(*) FILTER (WHERE status = 'completed')::numeric / count(*)::numeric) * 100 ) 
             END
             FROM public.enrollments WHERE user_id = target_user_id
        )
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RPC for Admin Metrics
CREATE OR REPLACE FUNCTION get_admin_metrics()
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    -- Authorization: Only admins/instructors
    IF NOT is_admin_or_instructor() THEN
        RAISE EXCEPTION 'Not authorized. Admin/Instructor access required.';
    END IF;

    SELECT json_build_object(
        'active_users', (SELECT count(DISTINCT user_id) FROM public.user_progress WHERE last_accessed_at > NOW() - INTERVAL '30 days'),
        'course_completions', (SELECT count(*) FROM public.enrollments WHERE status = 'completed'),
        'exercise_success_rate', (
            SELECT CASE 
                WHEN count(*) = 0 THEN 0 
                ELSE round((count(*) FILTER (WHERE passed = true)::numeric / count(*)::numeric) * 100) 
            END 
            FROM public.exercise_attempts
        ),
        'avg_attempts', (SELECT coalesce(avg(attempts_count), 0) FROM public.exercise_attempts),
        'first_pass_success_rate', (
            SELECT CASE 
                WHEN count(DISTINCT user_id || exercise_id) = 0 THEN 0 
                ELSE round((count(*) FILTER (WHERE attempts_count = 1 AND passed = true)::numeric / count(DISTINCT user_id || exercise_id)::numeric) * 100) 
            END 
            FROM public.exercise_attempts
        )
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RPC for Hardest Exercises
CREATE OR REPLACE FUNCTION get_hardest_exercises(limit_count INTEGER DEFAULT 5)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    -- Authorization: Only admins/instructors
    IF NOT is_admin_or_instructor() THEN
        RAISE EXCEPTION 'Not authorized. Admin/Instructor access required.';
    END IF;

    SELECT json_agg(row_to_json(t)) INTO result
    FROM (
        SELECT 
            ea.exercise_id, 
            e.question_en as exercise_name,
            count(*) as total_attempts,
            round((count(*) FILTER (WHERE passed = true)::numeric / count(*)::numeric) * 100) as success_rate
        FROM public.exercise_attempts ea
        LEFT JOIN public.practice_exercises e ON ea.exercise_id = e.id
        GROUP BY ea.exercise_id, e.question_en
        HAVING count(*) > 0
        ORDER BY success_rate ASC
        LIMIT limit_count
    ) t;
    
    RETURN coalesce(result, '[]'::json);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION get_student_metrics(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_admin_metrics() TO authenticated;
GRANT EXECUTE ON FUNCTION get_hardest_exercises(INTEGER) TO authenticated;
