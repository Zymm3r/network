# BRIEFING — 2026-06-08T14:42:00Z

## Mission
Investigate the codebase and recommend a fix strategy for Milestone 1: Database Migration to seed `training_lessons` with placeholder YouTube training videos, linked to existing `training_courses` records.

## 🔒 My Identity
- Archetype: Explorer
- Roles: Read-only investigator
- Working directory: c:\Users\UTHtest\Downloads\app.hotel\.agents\teamwork_preview_explorer_m1_migration_2
- Original parent: a07e288a-aaa6-4801-b50a-3d1ce5c0ea30
- Milestone: Milestone 1: Database Migration

## 🔒 Key Constraints
- Read-only investigation — do NOT implement
- Idempotent SQL migration in `supabase/migrations/`
- Do not modify existing production data outside of migrations.

## Current Parent
- Conversation ID: a07e288a-aaa6-4801-b50a-3d1ce5c0ea30
- Updated: not yet

## Investigation State
- **Explored paths**: `supabase/migrations/`, `src/features/equipment/components/EquipmentDetailTabs.tsx`, REST API introspection of database schema.
- **Key findings**: 
  - `training_lessons` exists but is empty. Columns: `id`, `course_id`, `title`, `video_url`, `lesson_order`, `created_at`.
  - `EquipmentDetailTabs.tsx` uses `.select('video_url').eq('course_id', courseId).order('lesson_order')`.
  - An idempotent SQL migration using `INSERT INTO ... SELECT ... WHERE NOT EXISTS` works best for seeding placeholder data without duplicates.
- **Unexplored areas**: None.

## Key Decisions Made
- Use PostgREST introspection to discover the table schema since local migration files lacked the explicit `CREATE TABLE` for `training_lessons`.
- Recommend an idempotent `INSERT` script in `handoff.md` to safely seed data based on existing `training_courses`.

## Artifact Index
- handoff.md — Recommended SQL migration content and strategy
