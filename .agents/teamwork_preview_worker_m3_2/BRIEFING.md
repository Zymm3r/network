# BRIEFING — 2026-06-23T14:20:00+07:00

## Mission
Complete UI translation, remove all inline ternaries of language check, verify Vite build, and run E2E tests.

## 🔒 My Identity
- Archetype: worker
- Roles: implementer, qa, specialist
- Working directory: c:\Users\UTHtest\Downloads\app.hotel\.agents\teamwork_preview_worker_m3_2
- Original parent: 7aabd9fb-1aa5-468d-8484-6f222992735c
- Milestone: Milestone 3 (UI Translation & Switcher Verification)

## 🔒 Key Constraints
- CODE_ONLY network mode
- Adhere to UTech Standards Guide
- Do not cheat (no dummy implementations or hardcoded test returns)
- Do not use `language === 'th'` or `language === 'en'` inline checks. Replace database mappings using dynamic property access (e.g., `course[`name_${language}` as keyof typeof course]` or `course[`name_${language}` as 'name_th' | 'name_en']`) and other checks using lookup dictionaries (e.g., `localeMap[language]`, `wpmMap[language]`).

## Current Parent
- Conversation ID: 7aabd9fb-1aa5-468d-8484-6f222992735c
- Updated: not yet

## Loaded Skills
- **Source**: c:\Users\UTHtest\Downloads\app.hotel\.agents\skills\utech-standards\SKILL.md
  - **Local copy**: c:\Users\UTHtest\Downloads\app.hotel\.agents\teamwork_preview_worker_m3_2\skills\utech-standards.md
  - **Core methodology**: Quality standards for React, Supabase, exercises, performance, and migrations.
- **Source**: c:\Users\UTHtest\Downloads\app.hotel\.agents\skills\supabase\SKILL.md
  - **Local copy**: c:\Users\UTHtest\Downloads\app.hotel\.agents\teamwork_preview_worker_m3_2\skills\supabase.md
  - **Core methodology**: Supabase best practices, CLI migration workflows, and security check.
- **Source**: c:\Users\UTHtest\Downloads\app.hotel\.agents\skills\supabase-postgres-best-practices\SKILL.md
  - **Local copy**: c:\Users\UTHtest\Downloads\app.hotel\.agents\teamwork_preview_worker_m3_2\skills\supabase-postgres-best-practices.md
  - **Core methodology**: Postgres database design, RLS, and queries performance rules.

## Change Tracker
- **Files modified**: None
- **Build status**: Unknown
- **Pending issues**: Audit and remove inline language checks, translate UI strings, dynamic translation key refactoring, verification.

## Quality Status
- **Build/test result**: Unknown
- **Lint status**: Unknown
- **Tests added/modified**: None

## Tasks
1. **Audit & Remove language === 'th'/'en' checks**: Scan the codebase (using `grep`) for any occurrences of `language === 'th'` or `language === 'en'`.
2. **Translate remaining UI strings**: Ensure all files have 100% translation coverage. Extends `th.ts` and `en.ts` if needed.
3. **Database translation fields**: Replace any database bilingual mapping checks with dynamic key lookup `[language]` syntax (e.g. `product[`name_${language}` as 'name_th' | 'name_en']`).
4. **Vite build**: Run `npm run build` and resolve any TypeScript or bundler errors.
5. **E2E verification**: Run the Playwright test suite `npx playwright test` and ensure all tests pass.
6. **Handoff**: Write a handoff.md in your directory showing modified files, verification test outputs, and compiler check results.

