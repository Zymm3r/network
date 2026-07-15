# Scope: M1: Database Schema Migration

## Architecture
- **Database**: Supabase PostgreSQL database. Adds a `quiz_data` column of type `jsonb` to the `lessons` table.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M1: Database Schema Migration | Create a migration SQL file in `supabase/migrations/` and apply it to the database using Supabase CLI. | none | DONE |

## Interface Contracts
- None (database schema update).
