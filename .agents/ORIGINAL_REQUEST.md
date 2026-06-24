# Original User Request

## Initial Request — 2026-06-09T02:34:24Z

# Teamwork Project Prompt — Draft

> Status: Launched
> Goal: Craft prompt → get user approval → delegate to teamwork_preview

The project involves investigating and resolving rendering issues with the Equipment Detail Tabs, and potentially refactoring the inline tab contents into dedicated components (DocumentsTab, FAQTab, TroubleshootingTab, TrainingTab).

Working directory: ~/teamwork_projects/equipment_tabs_refactor

## Requirements

### R1. Investigate and fix tab rendering
Investigate why tab content is not rendering despite data being correctly loaded from Supabase. Ensure no conditional logic hides the content.

### R2. Refactor Tab Components
Refactor the inline JSX inside EquipmentDetailTabs.tsx into separate dedicated components: DocumentsTab, FAQTab, TroubleshootingTab, and TrainingTab.

## Acceptance Criteria

### Verification
- [ ] The parent component successfully logs the data payload.
- [ ] When an active tab is selected, its corresponding content is visible on the screen.
- [ ] The codebase contains separate files for each tab component.

---

**CRITICAL NOTE FROM PARENT AGENT:** 
The user has clarified that their primary goal was simply to verify the data was passing correctly, and that NO refactoring is actually needed. The data mapping and rendering have already been investigated and confirmed to be completely correct (they are fully functional inline in `EquipmentDetailTabs.tsx`). Since the system auto-approved this prompt draft, I am officially delegating it to you. Please acknowledge this clarification and conclude the task gracefully without making unnecessary changes.

## Follow-up — 2026-06-23T02:30:23Z

Implement comprehensive internationalization (i18n) across the entire UTech Network 101 learning platform. The website already has a partial i18n system (React Context + `useI18n()` hook + LanguageSwitcher component) with ~81 translation keys, but large sections of the site — especially the Equipment feature — are completely untranslated with hardcoded Thai strings. Many other pages use messy inline ternaries instead of proper translation keys. The goal is to make the language switcher button fully functional so that switching between Thai ↔ English translates **everything** on the page: UI elements, tab labels, field names, error messages, and database-sourced content from Supabase.

Working directory: c:\Users\UTHtest\Downloads\app.hotel

## Requirements

### R1. Complete UI Translation Coverage

Extract all hardcoded strings and inline `language === 'th' ? ... : ...` ternaries across the entire codebase into the existing i18n translation files (`src/app/i18n/th.ts` and `src/app/i18n/en.ts`). Every user-visible string on every page must use the existing `t.category.key` pattern from the `useI18n()` hook. This includes but is not limited to:

- **Equipment feature** (6 component files, ~50+ hardcoded Thai strings, currently zero i18n integration): `EquipmentDetailTabs.tsx`, `EquipmentDetailPage.tsx`, `EquipmentPage.tsx`, `EquipmentCard.tsx`, `EquipmentGrid.tsx`, `WiringSimulator.tsx`
- **Pages with inline ternaries** (~100+ occurrences): `Dashboard.tsx`, `Profile.tsx`, `Auth.tsx`, `VerifyCertificate.tsx`, `Courses.tsx`
- **Other gaps**: `Sidebar.tsx` branding strings, `LessonDetail.tsx` lesson type labels
- The translation file structure must be extensible — adding a new language should only require creating a new translation file (e.g., `zh.ts`) and registering it in the i18n index

### R2. Supabase Content Bilingual Support for Equipment

Add bilingual column support to the equipment-related Supabase tables so that product content can be displayed in both Thai and English. The existing course/lesson/resource tables already follow a `name_th`/`name_en` pattern — apply the same pattern to:

- `products` table: add `name_th`, `name_en`, `description_th`, `description_en`, `content_th`, `content_en` columns (keep existing single-language columns as fallback)
- `documents` table: add `title_th`, `title_en`
- `faqs` table: add `question_th`, `question_en`, `answer_th`, `answer_en`
- `troubleshooting_guides` table: add `issue_th`, `issue_en`, `symptoms_th`, `symptoms_en`, `solution_th`, `solution_en`
- `training_courses` table: add `title_th`, `title_en`, `description_th`, `description_en`
- `training_lessons` table: add `title_th`, `title_en`

Update `useProductDetail.ts` and related hooks to use the correct language column based on the active language from `useI18n()`. When a translated column is empty, fall back to the original single-language column.

### R3. Language Switcher and Persistence

Ensure the existing `LanguageSwitcher.tsx` component triggers a complete re-render of all translated content when the user switches language. The selected language must persist across page reloads via `localStorage`. The system must already work correctly for this — verify it does and fix any edge cases where switching language doesn't update content (e.g., Supabase-sourced content that was fetched before the language switch).

## Acceptance Criteria

### Translation Completeness
- [ ] Running `grep -rn "language === 'th'" src/` returns zero matches (all inline ternaries replaced with translation keys)
- [ ] Running `grep -rn "language === 'en'" src/` returns zero matches
- [ ] The translation files `th.ts` and `en.ts` have identical key structures
- [ ] Every Equipment component (`EquipmentDetailTabs.tsx`, `EquipmentDetailPage.tsx`, `EquipmentPage.tsx`, `EquipmentCard.tsx`, `EquipmentGrid.tsx`, `WiringSimulator.tsx`) imports and uses `useI18n()`
- [ ] No hardcoded Thai or English UI strings remain in any `.tsx` component file (excluding translation definition files)

### Supabase Schema
- [ ] A migration SQL file exists that adds all bilingual columns to the equipment tables
- [ ] The `useProductDetail` hook reads from `name_th`/`name_en` (etc.) based on active language
- [ ] When a bilingual column is empty/null, the original single-language column is used as fallback

### Functional Verification
- [ ] Switching language via the LanguageSwitcher changes ALL visible text on the current page — no stale untranslated text remains
- [ ] The Equipment detail page (`/equipment/:slug`) displays correctly in both Thai and English
- [ ] The Equipment catalog page (`/equipment`) displays correctly in both Thai and English
- [ ] Dashboard, Profile, Auth, and VerifyCertificate pages display correctly in both Thai and English
- [ ] Language selection persists after page reload
- [ ] The app builds without TypeScript errors (`npm run build` succeeds)
