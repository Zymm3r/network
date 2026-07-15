# Project: Per-Lesson Quiz Refactor & Auto-Generation

## Architecture
- **Database**: Supabase PostgreSQL database. `lessons` table stores lesson data. A `quiz_data` column of type `jsonb` has been added to store multiple-choice quiz questions.
- **Frontend Components**:
  - `src/app/types/index.ts`: Contains the typescript types. `Lesson` type includes optional `quiz_data`.
  - `src/app/lib/components/QuizCard.tsx`: Renders quiz questions. Uses `lesson.quiz_data` as the source of truth if available, falling back gracefully if empty.
  - `src/app/pages/LessonDetail.tsx`: Renders individual lessons and passes `lesson` to `QuizCard`.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M1: Database Schema Migration | Add `quiz_data` JSONB column to `lessons` table | none | DONE |
| 2 | M2: Quiz Data Generation | Read `content_en` of 73 lessons and generate 5 multiple-choice questions for each matching `QuizQuestion` schema | M1 | DONE |
| 3 | M3: Database Insertion Migration | Create migrations with `UPDATE` statements to backfill generated JSON quiz data | M2 | DONE |
| 4 | M4: UI Integration & Verification | Update `types/index.ts`, `QuizCard.tsx`, `LessonDetail.tsx`. Compile, run E2E/auditor verification. | M3 | IN_PROGRESS |

## Interface Contracts
### `QuizCard` ↔ `Lesson`
- `Lesson` object has a `quiz_data` field that is a JSON array of `QuizQuestion` objects.
- `QuizCard` receives the `lesson` object (or `lesson.quiz_data`) and displays these questions.
- If `quiz_data` is empty or null, `QuizCard` falls back gracefully.

## Code Layout
- `supabase/migrations/`: Database schema and data update migrations.
- `src/app/types/index.ts`: TypeScript interfaces/types.
- `src/app/lib/components/QuizCard.tsx`: React component for quiz display and verification.
- `src/app/pages/LessonDetail.tsx`: React page for lesson view.
