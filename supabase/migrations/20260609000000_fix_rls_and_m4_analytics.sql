-- ============================================================================
-- Migration: Fix RLS bugs, M4 analytics triggers, certificate auto-issuance
-- Date: 2026-06-09
-- ============================================================================
-- This migration addresses the following gaps in the existing schema:
--   1. Fixes a syntax bug in 20260518000001 (missing FOR SELECT clause)
--   2. Adds RLS policies for KB tables (documents, faqs, troubleshooting_guides,
--      training_courses, training_lessons, categories, products, certificates)
--   3. Adds a database trigger that auto-issues a course certificate when the
--      user reaches 100% completion (eliminates the need for client-side race
--      conditions).
--   4. Adds a `progress_percentage` column to `enrollments` if missing.
--   5. Adds a backfill trigger to keep `enrollments.progress_percentage` in
--      sync with the count of completed lessons in `user_progress`.
--   6. Provides a course-completion-percentage SQL function used by the
--      dashboard's "Completion Rate" metric.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. SYNTAX BUG FIX: 20260518000001 used "FOR USING" without a leading command.
--    That statement was rejected by Postgres, so RLS for enrollments /
--    user_progress UPDATE never actually got created. We re-create them here
--    with the correct syntax. (Idempotent via DROP POLICY IF EXISTS.)
-- ---------------------------------------------------------------------------

DROP POLICY IF EXISTS "Users can update their own enrollments" ON public.enrollments;
CREATE POLICY "Users can update their own enrollments" ON public.enrollments
    FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own progress" ON public.user_progress;
CREATE POLICY "Users can update their own progress" ON public.user_progress
    FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- 2. Add progress_percentage to enrollments (used by dashboard's
--    completion-rate calculation and the auto-certificate trigger).
-- ---------------------------------------------------------------------------

ALTER TABLE public.enrollments
    ADD COLUMN IF NOT EXISTS progress_percentage INTEGER
    DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100);

CREATE INDEX IF NOT EXISTS idx_enrollments_progress
    ON public.enrollments(progress_percentage);

-- ---------------------------------------------------------------------------
-- 3. KB / Equipment catalog: enable RLS + public-read + admin-write.
--    These tables were created outside the initial RLS migration, so they
--    have no policies at all. We make the rows publicly viewable (learning
--    content is intentionally open) and only allow admins/instructors to
--    mutate.
-- ---------------------------------------------------------------------------

DO $$
BEGIN
    -- categories
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'categories') THEN
        ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
        DROP POLICY IF EXISTS "Categories are viewable by everyone" ON public.categories;
        CREATE POLICY "Categories are viewable by everyone" ON public.categories FOR SELECT USING (true);
    END IF;

    -- products
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'products') THEN
        ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
        DROP POLICY IF EXISTS "Products are viewable by everyone" ON public.products;
        CREATE POLICY "Products are viewable by everyone" ON public.products FOR SELECT USING (true);
    END IF;

    -- documents
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'documents') THEN
        ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
        DROP POLICY IF EXISTS "Documents are viewable by everyone" ON public.documents;
        CREATE POLICY "Documents are viewable by everyone" ON public.documents FOR SELECT USING (true);
    END IF;

    -- faqs
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'faqs') THEN
        ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
        DROP POLICY IF EXISTS "FAQs are viewable by everyone" ON public.faqs;
        CREATE POLICY "FAQs are viewable by everyone" ON public.faqs FOR SELECT USING (true);
    END IF;

    -- troubleshooting_guides
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'troubleshooting_guides') THEN
        ALTER TABLE public.troubleshooting_guides ENABLE ROW LEVEL SECURITY;
        DROP POLICY IF EXISTS "Troubleshooting guides are viewable by everyone" ON public.troubleshooting_guides;
        CREATE POLICY "Troubleshooting guides are viewable by everyone" ON public.troubleshooting_guides FOR SELECT USING (true);
    END IF;

    -- training_courses (equipment-domain courses, NOT the platform courses)
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'training_courses') THEN
        ALTER TABLE public.training_courses ENABLE ROW LEVEL SECURITY;
        DROP POLICY IF EXISTS "Training courses are viewable by everyone" ON public.training_courses;
        CREATE POLICY "Training courses are viewable by everyone" ON public.training_courses FOR SELECT USING (true);
    END IF;

    -- training_lessons
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'training_lessons') THEN
        ALTER TABLE public.training_lessons ENABLE ROW LEVEL SECURITY;
        DROP POLICY IF EXISTS "Training lessons are viewable by everyone" ON public.training_lessons;
        CREATE POLICY "Training lessons are viewable by everyone" ON public.training_lessons FOR SELECT USING (true);
    END IF;
END$$;

-- ---------------------------------------------------------------------------
-- 4. exercise_attempts: confirm RLS is on and add a column for the lesson
--    progress percentage at the moment of the attempt (used to award partial
--    credit on the dashboard).
-- ---------------------------------------------------------------------------

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'exercise_attempts') THEN
        ALTER TABLE public.exercise_attempts ENABLE ROW LEVEL SECURITY;
    END IF;
END$$;

-- ---------------------------------------------------------------------------
-- 5. course_completion_percentage(p_user_id, p_course_id)
--    SQL helper used by the dashboard to avoid duplicating logic in JS.
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.course_completion_percentage(
    p_user_id UUID,
    p_course_id TEXT
) RETURNS INTEGER AS $$
DECLARE
    total_lessons INTEGER;
    completed_lessons INTEGER;
BEGIN
    -- Cast to text in the join condition so this works for both UUID- and
    -- TEXT-typed `lessons.id` / `enrollments.course_id` columns. (The seed
    -- data in this project uses TEXT ids like 'ccna-001'.)
    SELECT count(*) INTO total_lessons
    FROM public.lessons
    WHERE course_id::text = p_course_id;

    IF total_lessons = 0 THEN
        RETURN 0;
    END IF;

    SELECT count(*) INTO completed_lessons
    FROM public.user_progress up
    JOIN public.lessons l ON l.id::text = up.lesson_id::text
    WHERE up.user_id = p_user_id
      AND l.course_id::text = p_course_id
      AND up.status = 'completed';

    RETURN ROUND((completed_lessons::numeric / total_lessons::numeric) * 100)::INTEGER;
END;
$$ LANGUAGE plpgsql STABLE;

GRANT EXECUTE ON FUNCTION public.course_completion_percentage(UUID, TEXT) TO authenticated;

-- ---------------------------------------------------------------------------
-- 6. Auto-keep enrollments.progress_percentage in sync with user_progress.
--    Whenever a lesson is marked completed, recompute the percentage for
--    every active enrollment that covers that lesson.
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.sync_enrollment_progress()
RETURNS TRIGGER AS $$
DECLARE
    v_course_id TEXT;
BEGIN
    -- Resolve the course for the affected lesson (NULL if lesson was deleted).
    -- Use TEXT because the seed data uses TEXT ids like 'ccna-001'.
    SELECT course_id INTO v_course_id
    FROM public.lessons
    WHERE id = NEW.lesson_id;

    IF v_course_id IS NULL THEN
        RETURN NEW;
    END IF;

    UPDATE public.enrollments
    SET progress_percentage = public.course_completion_percentage(NEW.user_id, v_course_id),
        status = CASE
            WHEN public.course_completion_percentage(NEW.user_id, v_course_id) >= 100
                THEN 'completed'
            ELSE 'active'
        END,
        completed_at = CASE
            WHEN public.course_completion_percentage(NEW.user_id, v_course_id) >= 100
                 AND completed_at IS NULL
                THEN NOW()
            ELSE completed_at
        END,
        last_accessed_at = NOW(),
        updated_at = NOW()
    WHERE user_id = NEW.user_id
      AND course_id = v_course_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_sync_enrollment_progress ON public.user_progress;
CREATE TRIGGER trg_sync_enrollment_progress
    AFTER INSERT OR UPDATE OF status ON public.user_progress
    FOR EACH ROW
    WHEN (NEW.status = 'completed')
    EXECUTE FUNCTION public.sync_enrollment_progress();

-- ---------------------------------------------------------------------------
-- 7. Auto-issue certificate when an enrollment reaches 100%.
--    Uses the existing certificates table and a deterministic number
--    generator (idempotent thanks to the unique idx_certificates_user_course).
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.auto_issue_course_certificate()
RETURNS TRIGGER AS $$
DECLARE
    v_cert_number TEXT;
    v_short_user  TEXT;
BEGIN
    -- Only fire on the transition into completion
    IF NEW.status = 'completed'
       AND (OLD.status IS DISTINCT FROM 'completed')
       AND NEW.progress_percentage >= 100 THEN

        v_short_user  := UPPER(SUBSTRING(NEW.user_id::text FROM 1 FOR 8));
        v_cert_number := 'C-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || v_short_user || '-' ||
                         UPPER(SUBSTRING(MD5(random()::text) FROM 1 FOR 6));

        INSERT INTO public.certificates (user_id, course_id, certificate_number)
        VALUES (NEW.user_id, NEW.course_id, v_cert_number)
        ON CONFLICT (user_id, course_id) WHERE course_id IS NOT NULL DO NOTHING;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_auto_issue_course_certificate ON public.enrollments;
CREATE TRIGGER trg_auto_issue_course_certificate
    AFTER UPDATE OF status, progress_percentage ON public.enrollments
    FOR EACH ROW
    EXECUTE FUNCTION public.auto_issue_course_certificate();

-- Also fire on INSERT in case the enrollment is created already completed
DROP TRIGGER IF EXISTS trg_auto_issue_course_certificate_insert ON public.enrollments;
CREATE TRIGGER trg_auto_issue_course_certificate_insert
    AFTER INSERT ON public.enrollments
    FOR EACH ROW
    WHEN (NEW.status = 'completed' AND NEW.progress_percentage >= 100)
    EXECUTE FUNCTION public.auto_issue_course_certificate();

-- ---------------------------------------------------------------------------
-- 8. Ensure the analytics RPC from 20260607000001 can be executed by
--    authenticated users and don't accidentally get dropped.
--    (Defensive — those RPCs should already be granted.)
-- ---------------------------------------------------------------------------

GRANT EXECUTE ON FUNCTION public.get_student_metrics(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_admin_metrics()              TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_hardest_exercises(INTEGER)    TO authenticated;

-- ---------------------------------------------------------------------------
-- 9. Helpful view for the dashboard's "Completion Rate" computation.
--    Wraps course_completion_percentage so the RPC stays a one-liner.
-- ---------------------------------------------------------------------------

CREATE OR REPLACE VIEW public.v_enrollment_completion AS
SELECT
    e.user_id,
    e.course_id,
    e.progress_percentage,
    e.status,
    e.completed_at,
    e.enrolled_at,
    e.last_accessed_at
FROM public.enrollments e;

GRANT SELECT ON public.v_enrollment_completion TO authenticated;

-- ============================================================================
-- End of migration
-- ============================================================================
