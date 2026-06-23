# BRIEFING — 2026-06-23T02:56:00Z

## Mission
Verify SQL migration syntax, test the fallback behavior of product hooks under mock states ('th' vs 'en'), and run build checks.

## 🔒 My Identity
- Archetype: Empirical Challenger
- Roles: critic, specialist
- Working directory: c:\Users\UTHtest\Downloads\app.hotel\.agents\teamwork_preview_challenger_m2_2
- Original parent: bed37118-2a1d-4559-9138-9bc93e044278
- Milestone: M2 Verification
- Instance: 1 of 1

## 🔒 Key Constraints
- Review-only — do NOT modify implementation code.
- Write tests/harnesses in appropriate places (not in .agents/ folder).
- Network Restrictions: CODE_ONLY mode. Do not access external sites.

## Current Parent
- Conversation ID: bed37118-2a1d-4559-9138-9bc93e044278
- Updated: 2026-06-23T02:56:00Z

## Review Scope
- **Files to review**: SQL migration files, hooks (product hooks), and related files.
- **Interface contracts**: PROJECT.md or standard types.
- **Review criteria**: Correctness of migration syntax, proper fallback behaviors (th/en), successful project build.

## Key Decisions Made
- Create a test harness (`fallback_behavior.spec.ts`) to execute hooks (`useProducts` and `useProductDetail`) in isolation.
- Configure a custom Vitest configuration (`vitest.unit.config.ts`) to bypass Storybook and browser environment requirements.

## Loaded Skills
- **UTech Standards Guide**:
  - Source: c:\Users\UTHtest\Downloads\app.hotel\.agents\skills\utech-standards\SKILL.md
  - Local copy: c:\Users\UTHtest\Downloads\app.hotel\.agents\teamwork_preview_challenger_m2_2\skills\utech-standards-SKILL.md
  - Core methodology: Ensuring code follows React, Supabase, and migration quality standards.
- **Supabase**:
  - Source: c:\Users\UTHtest\Downloads\app.hotel\.agents\skills\supabase\SKILL.md
  - Local copy: c:\Users\UTHtest\Downloads\app.hotel\.agents\teamwork_preview_challenger_m2_2\skills\supabase-SKILL.md
  - Core methodology: Using Supabase products securely, managing RLS, checking docs, and properly creating/validating migrations.
- **Supabase Postgres Best Practices**:
  - Source: c:\Users\UTHtest\Downloads\app.hotel\.agents\skills\supabase-postgres-best-practices\SKILL.md
  - Local copy: c:\Users\UTHtest\Downloads\app.hotel\.agents\teamwork_preview_challenger_m2_2\skills\supabase-postgres-best-practices-SKILL.md
  - Core methodology: Applying Postgres performance rules, indexes, RLS security, and query tuning.

## Attack Surface
- **Hypotheses tested**: Checked whether fallback logic handles whitespace-only inputs correctly, checked if all related tables are mapped, and tested with missing translations.
- **Vulnerabilities found**:
  - Untrimmed fallback bypass: Related entities (documents, faqs, troubleshooting_guides, training_courses, training_lessons) do not trim translation columns, causing whitespace-only translations to bypass fallbacks.
  - Direct bilingual lookup bypass: When a language translation is missing, the hooks skip testing the other language translation and go straight to the default database/local fields.
- **Untested angles**: Local SQLite or actual local Supabase database instance queries (using mocked Supabase instead).

## Artifact Index
- `src/features/equipment/hooks/__tests__/fallback_behavior.spec.ts` — Unit test suite verifying hook translation fallbacks.
- `vitest.unit.config.ts` — Custom Vitest configuration.
