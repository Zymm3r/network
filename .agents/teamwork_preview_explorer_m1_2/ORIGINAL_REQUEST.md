## 2026-06-23T02:33:17Z
You are an Explorer agent (explorer_m1_2). Your working directory is c:\Users\UTHtest\Downloads\app.hotel\.agents\teamwork_preview_explorer_m1_2.
Your task is to analyze the Supabase schema and data retrieval hooks for bilingual content support (R2) on the UTech Network 101 learning platform.
Specifically:
1. Examine how course/lesson/resource tables currently handle bilingual name fields (e.g. `name_th` and `name_en`) in the database.
2. Inspect the schemas of the equipment-related tables: `products`, `documents`, `faqs`, `troubleshooting_guides`, `training_courses`, `training_lessons`. Determine their column structures, data types, and check if any migrations/RLS rules are affected.
3. Examine `src/features/equipment/hooks/useProductDetail.ts` and other hooks under `src/features/equipment/hooks/` (like `useProduct.ts` and `useProducts.ts`). Identify where and how they query Supabase.
4. Propose a plan for the migration SQL (R2 columns addition) and how to update hooks to read language-specific columns based on `useI18n()` active language, with fallback to single-language columns.

Produce a detailed report in `c:\Users\UTHtest\Downloads\app.hotel\.agents\teamwork_preview_explorer_m1_2\analysis.md` outlining the schema findings, migration plan, and hook change design. Report your completion back.
