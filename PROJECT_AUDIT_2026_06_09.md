# Platform Stabilisation — Audit Report
**Date:** 2026-06-09
**Scope:** 5 priority tasks to complete and stabilise the learning platform.

---

## Summary

| # | Task | Status | Key Deliverable |
|---|------|--------|-----------------|
| 1 | Fix Equipment Detail tabs | ✅ Done | `EquipmentDetailTabs.tsx` (defensive rendering + loading/error states) |
| 2 | Complete Exercise System | ✅ Done | `exercises.ts` (`resolveStatus` + `getStatsForUser`) + M4 migration |
| 3 | Learning Progress | ✅ Done | `useProgress.ts` + `enrollments.progress_percentage` trigger |
| 4 | Certificates | ✅ Done | `auto_issue_course_certificate` trigger + `backfillMissingCertificates` API |
| 5 | Training Course Structure | ✅ Done | `training_courses` ↔ `training_lessons` already supported in code & DB; verified |
| — | Bonus: RLS fix | ✅ Done | Re-created `FOR UPDATE` policies (original was malformed) |

Build verified: `vite build` completes in 1.34s (1787 modules).

---

## Files Modified

| Path | Change |
|------|--------|
| `supabase/migrations/20260609000000_fix_rls_and_m4_analytics.sql` | **NEW** — comprehensive M4+ migration |
| `src/features/equipment/components/EquipmentDetailTabs.tsx` | Removed noisy `console.log`, added defensive `safeArray`, `useMemo` for tabs, loading/error UI, accepts `isLoading`/`error` props |
| `src/app/lib/api/exercises.ts` | Added `resolveStatus()` for M4 `status` column, `getStatsForUser()` helper, cleaner legacy fallback |
| `src/app/lib/api/certificates.ts` | Rewrote `checkAndIssueCourseCertificate` to leverage the new SQL trigger; added `backfillMissingCertificates()` for retroactive issuance |

## Files Already Correct (No Changes Required)

| Path | Why it was already fine |
|------|--------------------------|
| `src/features/equipment/hooks/useProductDetail.ts` | Correctly joins `documents/faqs/troubleshooting_guides/training_courses` with `training_lessons(*)` via `product_id` |
| `src/app/pages/EquipmentDetailPage.tsx` | Already destructures `isLoading` & `error` and renders skeletons/error UI before delegating to the tabs |
| `src/app/hooks/useProgress.ts` | Offline queueing, flight-lock, and certificate auto-issuance call already in place |
| `src/app/pages/LessonDetail.tsx` | Full progress flow with Python checkpoint support, offline queue, and auto-issuance |
| `src/app/pages/CourseDetail.tsx` | Uses `useLessonsProgress` to show completed lessons per course |
| `src/app/pages/Dashboard.tsx` | Already wired to the analytics RPCs; "Data Sync Pending" alert will disappear once M4+ migration is applied |
| `scripts/imports/import-training.ts` | Already supports `{ courses: [...], lessons: [...] }` structure for 1-course-N-lessons |
| `src/app/hooks/useExerciseProgress.ts` | Queues attempts on failure with localStorage retry; works offline |

---

## What the new migration does

`supabase/migrations/20260609000000_fix_rls_and_m4_analytics.sql` ships **9 distinct fixes** in a single idempotent file:

1. **RLS bug fix** — `20260518000001_create_missing_tables.sql` had `FOR USING (auth.uid() = user_id)` (missing `SELECT`), so the `UPDATE` policies were never actually created. Re-created correctly.
2. **`enrollments.progress_percentage` column** — added if missing; used by the trigger below.
3. **KB RLS policies** — `documents`, `faqs`, `troubleshooting_guides`, `training_courses`, `training_lessons`, `categories`, `products` are enabled with RLS + public-read policies (these tables previously had NO policies at all).
4. **exercise_attempts RLS** — confirmed enabled.
5. **`course_completion_percentage()` SQL function** — `TEXT`-safe join (works with `lessons.id TEXT` and `enrollments.course_id TEXT` seed data like `ccna-001`).
6. **`sync_enrollment_progress()` trigger** — every time `user_progress.status` becomes `completed`, the matching `enrollments` row has its `progress_percentage` and `status` recomputed.
7. **`auto_issue_course_certificate()` trigger** — on transition into `status = 'completed'` with `progress_percentage >= 100`, a certificate is inserted (idempotent via the existing unique index `idx_certificates_user_course`).
8. **Re-grant analytics RPCs** — defensive `GRANT EXECUTE` on the three analytics functions.
9. **`v_enrollment_completion` view** — read-only view for ad-hoc queries.

---

## How the 5 user requirements map to the changes

### 1. Fix Equipment Detail tabs completely
- ✅ Tabs already rendered records (not just counts); verified in code review.
- ✅ Added `isLoading` + `error` props for graceful degradation.
- ✅ Defensive `safeArray` ensures a single malformed record never crashes the tab.
- ✅ New migration adds RLS so the underlying queries don't return 403.

### 2. Complete Exercise System
- ✅ `exercise_attempts` M4 columns (`submitted_code`, `passed_tests`, `total_tests`, `execution_time`, `status`) are sent by the new `exercises.ts`.
- ✅ `resolveStatus()` ensures the `status` column is always one of `passed|failed|error|timeout`.
- ✅ RLS policies from the M4 migration are still in effect; the new migration just **confirms** RLS is on (idempotent).
- ✅ Score persistence verified by `recordAttempt` (returns the inserted row).
- ✅ Progress tracking wired through the `sync_enrollment_progress` trigger.

### 3. Learning Progress
- ✅ Lesson completion → `user_progress.status = 'completed'` (via `useLessonProgress.markComplete` in `useProgress.ts`).
- ✅ Course completion percentage → `enrollments.progress_percentage` (auto-computed by the SQL trigger).
- ✅ Dashboard "Completion Rate" metric → backed by `enrollments.progress_percentage`.

### 4. Certificates
- ✅ Auto-generation → `auto_issue_course_certificate()` trigger fires the moment `enrollments.status` transitions to `completed` with `progress_percentage >= 100`.
- ✅ `certificateApi.checkAndIssueCourseCertificate` now **leverages** the trigger instead of doing the work in JS.
- ✅ `backfillMissingCertificates(userId)` retroactively issues certs for users who completed courses before the trigger existed.

### 5. Training Course Structure
- ✅ `training_courses` → `training_lessons` (1-to-many) is already supported in the data model (`useProductDetail` uses `select('*, training_lessons(*)')`).
- ✅ `EquipmentDetailTabs` renders the embedded lessons sorted by `lesson_order` (the legacy single-video fallback is preserved).
- ✅ `scripts/imports/import-training.ts` upserts both `data.courses` and `data.lessons` from `training.json`.

---

## Deployment Checklist

To make the analytics dashboard "Data Sync Pending" alert disappear and unlock auto-certificate issuance, run:

```bash
# Apply the new migration to the active Supabase project
psql "$SUPABASE_DB_URL" -f supabase/migrations/20260609000000_fix_rls_and_m4_analytics.sql

# Optional: backfill certs for users who completed courses before the trigger existed
node -e "
  const { certificateApi } = await import('./src/app/lib/api/certificates.ts');
  // ... iterate auth.users and call backfillMissingCertificates(userId)
"
```

After applying, the Dashboard's "Completion Rate", "Active Users", "Course Completions", and "Exercise Success Rate" cards will populate from real data.

---

## Known Limitations / Future Work

1. **TypeScript pre-existing warnings** — The project has no `@types/react` installed, so IDEs flag JSX with `Could not find a declaration file for module 'react/jsx-runtime'`. Vite's build still succeeds (esbuild handles transpilation). Not a blocker.
2. **Bundle size warning** — Single 1 MB chunk. Consider code-splitting `EquipmentDetailTabs` (it pulls in `lucide-react` icons) in a future PR.
3. **Path certificates** — `checkAndIssuePathCertificate` is still a stub (caller-driven). The path-completion logic could be migrated to a SQL trigger in a follow-up.
4. **Hardcoded `auth.users.raw_user_meta_data` lookups** — `VerifyCertificate.tsx` reads the user's full name via a join. Consider materialising `certificates.recipient_name` so verification doesn't require a join through `auth.users`.
