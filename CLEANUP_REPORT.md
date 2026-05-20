# Cleanup Report and Recommended Changes

Summary
- Added a safe Supabase migration to enforce RLS and add secure policies: `supabase/migrations/20260518000003_enforce_rls_and_policies.sql`.
- Added a temporary compatibility shim `src/app/data/mockData.ts` to restore imports and keep the app buildable while replacing mock usage.
- Added `debug-fetch-lessons.mjs` (already present) to reproduce permission errors.

Suggested deletions (review before removing)
- data/mockData.ts (temporary) — replace usages first with Supabase-backed hooks, then delete.
- Any files under `src/app/components/` that import `mockData` and are not yet migrated to Supabase: consider migrating or removing. Files found importing mockData:
  - `src/app/components/FilterBar.tsx`
  - `src/app/components/CustomerTypeBadge.tsx`
  - `src/app/components/GlobalSearch.tsx` (contains mock search)
  - `src/app/pages/Schedules.tsx`

Audit notes and approach
1. Verify imports/usages: I scanned the repo and listed files that reference mock data. Before deleting, replace those usages with real `useCourses`/`useLessons`/Supabase queries.
2. Avoid deleting anything that is imported by a route or displayed in the app until replacements exist.
3. To safely remove mock systems:
   - Implement Supabase-backed queries for each component/hook using the `supabase` client in `src/lib/supabase.ts`.
   - Run the app and tests, ensure no runtime import errors.
   - Commit the migration and remove `mockData.ts` and related demo code.

Remaining technical debt
- Several components still use temporary mock logic (search, filter options). These should be migrated to Supabase or consolidated into a single data layer.
- RLS policies require review for instructor/admin roles — currently only per-user checks exist.
- No comprehensive automated tests present to assert API contract; consider adding unit/integration tests.

Recommended next refactors (priority order)
1. Replace mock data usages in `FilterBar`, `GlobalSearch`, and pages with Supabase-backed hooks (`useLessons`, `useCourses`).
2. Add a small data adapter layer `src/lib/data.ts` that centralizes queries and fallbacks.
3. Implement role-based policies for admin/instructor features in Supabase.
4. Add tests around hooks `useLessons`, `useCourses`, and pages that depend on them.

Risky areas needing manual review
- Any code that previously assumed public SELECT access will break when RLS is strictly enforced (we added secure policies). Use the `anon` key for public-safe queries only where policies allow.
- Service-role keys must never be committed — any admin scripts should fetch them from CI secrets or environment variables.

Next automated steps I can run if you want
- Create targeted migrations to add instructor/admin policies.
- Replace mock imports in specified components with Supabase queries (I can do this file-by-file).
- Run `npm run build` and fix TypeScript/Vite errors.
