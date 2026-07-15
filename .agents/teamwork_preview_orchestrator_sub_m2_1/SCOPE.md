# Scope: M2: Quiz Data Generation & Migration

## Architecture
- **Database**: Supabase PostgreSQL database.
- **Migration**: SQL migration file under `supabase/migrations/` containing `UPDATE lessons SET quiz_data = '...' WHERE id = '...';` for all 73 lessons.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M2: Quiz Data Generation & Migration | Fetch all 73 lessons' `content_en`, generate exactly 5 multiple-choice quiz questions per lesson matching the QuizQuestion structure, and create the migration SQL files to insert the quiz data. | none | DONE |

## Interface Contracts
- None (database data update).
