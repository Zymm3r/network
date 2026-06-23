# Project: Comprehensive Internationalization (i18n)

## Architecture
- `src/app/i18n/`: Contains translations `th.ts`, `en.ts` and provider `index.tsx`.
- Custom Hooks: `useI18n()` for active language state, `useProductDetail.ts` maps DB fields based on active language.
- Database Migrations: Adds bilingual columns (`_th`, `_en`) to equipment-related tables (`products`, `documents`, `faqs`, `troubleshooting_guides`, `training_courses`, `training_lessons`).

## Code Layout
- Frontend Components: `src/features/equipment/components/`, `src/app/pages/`, `src/app/components/`
- Database Migrations: `supabase/migrations/`
- Custom Hooks: `src/features/equipment/hooks/`, `src/app/hooks/`

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Analysis & Requirements Mapping | Analyze codebase, schema, and switcher issues | none | DONE |
| 2 | Database Migration & Hooks | SQL migration for bilingual columns + hooks updates & search fix | M1 | DONE |
| 3 | UI Translation & Switcher | Complete UI translation, remove inline ternaries, extend th.ts/en.ts | M2 | IN_PROGRESS |
| 4 | Final E2E Verification & Build | Mock auth in Playwright, verify all tests, and check Vite build | M3 | PLANNED |

## Interface Contracts
### `useI18n()` ↔ UI Components / Hooks
- Exposes `language` ('th' | 'en') and `t` (translation dictionary).
- UI Components hook into `useI18n()` and retrieve translations via `t.category.key`.
- Hooks like `useProductDetail` subscribe to `language` to recalculate localized entity properties dynamically.
