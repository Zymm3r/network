-- Migration: Enforce RLS and add secure policies for lessons, user_progress, and enrollments
-- Timestamp: 2026-05-18 00:00:03

-- NOTES:
-- 1) We enable Row Level Security (RLS) on tables to ensure the database enforces access control.
-- 2) Policies use auth.uid() where appropriate to restrict access to the resource owner.
-- 3) Lessons are treated as public content for SELECT only (read-only public access),
--    because learning content is intended to be viewable by all authenticated or unauthenticated users.

-- Ensure helper function exists
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- LESSONS: allow public read, restrict writes to service_role or admin flows
ALTER TABLE IF EXISTS public.lessons ENABLE ROW LEVEL SECURITY;

-- Readable by anyone (public content). Use caution: this only permits SELECT.
-- Rationale: lessons content is curriculum material intended for general viewing; write operations remain protected.
CREATE POLICY IF NOT EXISTS "Lessons are viewable by everyone" ON public.lessons
  FOR SELECT USING (true);

-- Allow INSERT/UPDATE/DELETE only by service role (not by anon). These must be performed via secure admin migrations or server-side functions.
GRANT SELECT ON public.lessons TO anon, authenticated;

-- USER_PROGRESS: per-user data — only owner may read/insert/update
ALTER TABLE IF EXISTS public.user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Users can view their own progress" ON public.user_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can insert their own progress" ON public.user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can update their own progress" ON public.user_progress
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ENROLLMENTS: users can manage their own enrollments; allow instructors/admins via role check (custom claim)
ALTER TABLE IF EXISTS public.enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Users can view their own enrollments" ON public.enrollments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can insert their own enrollments" ON public.enrollments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can update their own enrollments" ON public.enrollments
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- If there's a need for teachers/admins to view enrollments, add a policy that checks a custom `role` claim:
-- CREATE POLICY "Admins can view enrollments" ON public.enrollments
--   FOR SELECT USING (auth.role() = 'admin' OR auth.role() = 'instructor');

-- Ensure indexes exist for performance (non-blocking, idempotent)
CREATE INDEX IF NOT EXISTS idx_lessons_course_id ON public.lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_order_index ON public.lessons(order_index);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON public.user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON public.enrollments(user_id);

-- Attach update triggers if not present
DROP TRIGGER IF EXISTS update_lessons_updated_at ON public.lessons;
CREATE TRIGGER update_lessons_updated_at
  BEFORE UPDATE ON public.lessons
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_progress_updated_at ON public.user_progress;
CREATE TRIGGER update_user_progress_updated_at
  BEFORE UPDATE ON public.user_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_enrollments_updated_at ON public.enrollments;
CREATE TRIGGER update_enrollments_updated_at
  BEFORE UPDATE ON public.enrollments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- End of migration
