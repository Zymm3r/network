# Original User Request

## Initial Request — 2026-06-23T07:16:40Z

Implement comprehensive internationalization (i18n) across the entire UTech Network 101 learning platform. The website already has a partial i18n system (React Context + `useI18n()` hook + LanguageSwitcher component) with ~81 translation keys, but large sections of the site — especially the Equipment feature — are completely untranslated with hardcoded Thai strings. Many other pages use messy inline ternaries instead of proper translation keys. The goal is to make the language switcher button fully functional so that switching between Thai ↔ English translates **everything** on the page: UI elements, tab labels, field names, error messages, and database-sourced content from Supabase.

### R1. Complete UI Translation Coverage
Extract all hardcoded strings and inline `language === 'th' ? ... : ...` ternaries across the entire codebase into the existing i18n translation files (`src/app/i18n/th.ts` and `src/app/i18n/en.ts`). Every user-visible string on every page must use the existing `t.category.key` pattern from the `useI18n()` hook.
- Equipment feature components
- Pages with inline ternaries: Dashboard.tsx, Profile.tsx, Auth.tsx, VerifyCertificate.tsx, Courses.tsx
- Other gaps: Sidebar.tsx, LessonDetail.tsx
- No `language === 'th'` or `language === 'en'` inline checks should remain.

### R2. Supabase Content Bilingual Support for Equipment
Add bilingual column support to the equipment-related Supabase tables so that product content can be displayed in both Thai and English.
- Update `useProductDetail.ts` and related hooks to use the correct language column based on the active language from `useI18n()`. Fall back to the original single-language column when a bilingual column is empty.

### R3. Language Switcher and Persistence
Verify LanguageSwitcher functionality and persistence. Ensure the application re-renders and refetches data appropriately when the language changes.

### Acceptance Criteria
- Running `grep -rn "language === 'th'"` returns zero matches
- Running `grep -rn "language === 'en'"` returns zero matches
- The translation files `th.ts` and `en.ts` have identical key structures
- Every Equipment component imports and uses `useI18n()`
- No hardcoded Thai or English UI strings remain in any `.tsx` component file
- A migration SQL file exists that adds all bilingual columns to the equipment tables
- The `useProductDetail` hook reads from `name_th`/`name_en` based on active language, with fallback
- Language selection persists after page reload
- The app builds without TypeScript errors (`npm run build` succeeds)

## 2026-06-23T07:19:55Z
Resume work at c:\Users\UTHtest\Downloads\app.hotel\.agents\teamwork_preview_worker_m3_2.
Read BRIEFING.md, ORIGINAL_REQUEST.md, and progress.md there for current state and tasks.
