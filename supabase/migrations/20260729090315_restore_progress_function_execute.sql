-- The progress trigger invokes this helper as the authenticated writer.
-- Keep it unavailable to anonymous clients while restoring the minimum
-- privilege required for user_progress inserts and updates to complete.
REVOKE EXECUTE ON FUNCTION public.course_completion_percentage(UUID, TEXT)
  FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.course_completion_percentage(UUID, TEXT)
  TO authenticated, service_role;
