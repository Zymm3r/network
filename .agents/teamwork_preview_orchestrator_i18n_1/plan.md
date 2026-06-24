# Plan — Internationalization (i18n) Implementation

This plan outlines the steps to implement comprehensive internationalization (i18n) across the entire UTech Network 101 learning platform, fulfilling all requirements in `ORIGINAL_REQUEST.md`.

## Milestones

### Milestone 1: Analysis & Requirements Mapping
- **Goal**: Analyze the current codebase and i18n structure. Identify all hardcoded Thai/English strings, inline ternaries, database columns, hooks, and E2E test files.
- **Tasks**:
  1. Explore current i18n structure and language switcher logic.
  2. Document all occurrences of inline language ternaries in pages (`Dashboard`, `Profile`, `Auth`, `VerifyCertificate`, `Courses`).
  3. Document all hardcoded strings in Equipment features, `Sidebar`, and `LessonDetail`.
  4. Design database schema updates for equipment tables (bilingual columns) and list the mapping for `useProductDetail` & other hooks.
- **Verification**: Explorer report.

### Milestone 2: Database Migration & Hooks
- **Goal**: Create and run migration for bilingual columns in equipment tables. Update data retrieval hooks to support active language and fallback.
- **Tasks**:
  1. Create a migration SQL file under `supabase/migrations/` implementing `_th` and `_en` columns for the designated equipment tables.
  2. Apply the migration to the Supabase database.
  3. Update `useProductDetail.ts` and related hooks (`useProduct`, `useProducts` if applicable) to read language-specific columns based on `useI18n()` active language, falling back to the original column if empty.
- **Verification**: Reviewer review, Challenger query test, and Auditor check.

### Milestone 3: UI Translation & Files Extraction
- **Goal**: Extract all hardcoded strings and inline language ternaries into `th.ts` and `en.ts` translation files. Ensure they have identical structures.
- **Tasks**:
  1. Update `th.ts` and `en.ts` with all extracted keys/translations. Keep keys completely identical in structure.
  2. Modify Equipment features (`EquipmentDetailTabs`, `EquipmentDetailPage`, `EquipmentPage`, `EquipmentCard`, `EquipmentGrid`, `WiringSimulator`) to use `useI18n()`.
  3. Modify other pages (`Dashboard`, `Profile`, `Auth`, `VerifyCertificate`, `Courses`) to remove inline ternaries and use `useI18n()`.
  4. Update `Sidebar` and `LessonDetail` gaps.
- **Verification**: Reviewer review, Challenger checking for any missed inline ternaries/hardcoded strings, and Auditor check.

### Milestone 4: Language Switcher and Persistence Integration
- **Goal**: Verify LanguageSwitcher functionality and persistence. Ensure the application re-renders and refetches data appropriately when the language changes.
- **Tasks**:
  1. Verify and update the `LanguageSwitcher.tsx` logic if needed to trigger a full update.
  2. Ensure Supabase content is fetched reactively based on active language change (by adding language to query/hook dependency arrays).
  3. Verify selection persists after page reload using localStorage.
- **Verification**: Reviewer review, Challenger persistence verification, and Auditor check.

### Milestone 5: E2E Testing, Build, and Acceptance
- **Goal**: Ensure the project compiles without TypeScript errors, all existing and any new E2E tests pass successfully, and compile the final report.
- **Tasks**:
  1. Verify the project builds via `npm run build`.
  2. Run the Playwright E2E tests via `npx playwright test`.
  3. Audit the final state and compile handoff report.
- **Verification**: Final build, E2E tests execution, and Auditor clean verdict.
