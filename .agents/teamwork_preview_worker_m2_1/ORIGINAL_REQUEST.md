## 2026-06-23T02:41:22Z
You are a Worker agent (worker_m2_1). Your working directory is c:\Users\UTHtest\Downloads\app.hotel\.agents\teamwork_preview_worker_m2_1.
Your task is to implement Milestone 2 (Database Migration & Hooks) for the UTech i18n project.
You must adhere to the UTech Standards Guide (c:\Users\UTHtest\Downloads\app.hotel\.agents\skills\utech-standards\SKILL.md) and Supabase Postgres Best Practices (c:\Users\UTHtest\Downloads\app.hotel\.agents\skills\supabase-postgres-best-practices\SKILL.md).

Specifically, perform these tasks:
1. Create an idempotent SQL migration file under `supabase/migrations/` (e.g. `20260623000000_add_bilingual_equipment_columns.sql`) that adds bilingual columns to the 6 equipment tables as per R2:
   - `products` table: add `name_th`, `name_en`, `description_th`, `description_en`, `content_th`, `content_en`
   - `documents` table: add `title_th`, `title_en`
   - `faqs` table: add `question_th`, `question_en`, `answer_th`, `answer_en`
   - `troubleshooting_guides` table: add `issue_th`, `issue_en`, `symptoms_th`, `symptoms_en`, `solution_th`, `solution_en`
   - `training_courses` table: add `title_th`, `title_en`, `description_th`, `description_en`
   - `training_lessons` table: add `title_th`, `title_en`, `content_th`, `content_en`
   Apply the migration to your database environment using the appropriate Supabase CLI commands (e.g., check `supabase db push` or custom scripts in the repo, or run it through the project CLI).
2. Update the TypeScript types in `src/features/equipment/types/product.ts` to include the new columns.
3. Update `src/features/equipment/hooks/useProductDetail.ts` to retrieve active language via `useI18n()` and map results dynamically to standard properties, keeping the UI components completely decoupled from translation mechanics. Implement fallback logic (if bilingual column is empty/null, fall back to the original single-language column). Ensure `language` is in the hook dependency array.
4. Transition `src/features/equipment/hooks/useProducts.ts` to query the Supabase `products` table (e.g. `supabase.from('products').select('*')`). Map results dynamically using `useI18n()` active language (with local JSON fallback if DB query errors or returns empty, to ensure robustness).
5. Fix the SQL bug in `src/app/hooks/useGlobalSearch.ts` where it queries `name` from `learning_paths` table (which doesn't exist). Update it to select and match `name_th` or `name_en` based on the active language from `useI18n()`.
6. Run `npm run build` to verify there are no compilation or TypeScript errors.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Produce a handoff report in `c:\Users\UTHtest\Downloads\app.hotel\.agents\teamwork_preview_worker_m2_1\handoff.md` and report your completion back.
