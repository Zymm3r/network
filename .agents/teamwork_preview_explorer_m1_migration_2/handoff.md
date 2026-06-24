# Handoff Report: Milestone 1 - Database Migration Strategy

## Observation
1. **Existing Tables**: We discovered the schema for `training_courses` and `training_lessons` via PostgREST introspection since they aren't explicitly `CREATE`d in the existing migration files (they were likely created directly in the remote Supabase DB).
   - `training_courses` columns: `id`, `title`, `description`, `difficulty`, `created_at` (has existing data).
   - `training_lessons` columns: `id`, `course_id`, `title`, `video_url`, `lesson_order`, `created_at` (currently empty).
2. **Component Usage**: `EquipmentDetailTabs.tsx` at line 28 queries `training_lessons` using `.select('video_url')`, `.eq('course_id', courseId)`, and `.order('lesson_order', { ascending: true })`.
3. **Requirement**: Seed `training_lessons` idempotently with placeholder YouTube videos linked to existing `training_courses`. Do not modify existing production data outside of migrations.

## Logic Chain
1. Since we need an idempotent migration, we should use an `INSERT INTO ... SELECT ... WHERE NOT EXISTS ...` pattern. This ensures that running the migration multiple times won't create duplicate lessons.
2. The `training_lessons` table requires `course_id`, `title`, `video_url`, and `lesson_order` (based on introspection and component usage). 
3. We can query existing `training_courses` and map their `id` to `course_id`.
4. We can construct a default title by appending a suffix like ` - Video Lesson` to the course's `title`.
5. We will use a standard YouTube embed URL as the `video_url` placeholder.
6. The `lesson_order` can default to `1`.

## Caveats
- We could not determine if `training_lessons.id` has a default value (like `gen_random_uuid()`) through introspection alone. However, Supabase UUID columns generally have a default generator. If the migration fails with "null value in column id", the migration will need to be updated to explicitly select `gen_random_uuid()`. 
- The schema is assumed based on the active Supabase instance, as the `CREATE TABLE` statements for these specific tables do not exist in the local `supabase/migrations/` folder.

## Conclusion
Create a new migration file (e.g., `supabase/migrations/20260608200000_seed_training_lessons.sql`) with the following idempotent SQL content:

```sql
-- Seed training_lessons idempotently
INSERT INTO public.training_lessons (course_id, title, video_url, lesson_order)
SELECT 
    id as course_id,
    title || ' - Placeholder Video Lesson' as title,
    'https://www.youtube.com/embed/dQw4w9WgXcQ' as video_url, -- Placeholder YouTube embed
    1 as lesson_order
FROM public.training_courses c
WHERE NOT EXISTS (
    SELECT 1 FROM public.training_lessons l 
    WHERE l.course_id = c.id
);
```

*(Note: If `id` does not have a default, add `id` to the column list and `gen_random_uuid()` to the `SELECT` list).*

## Verification Method
1. Create the SQL file in `supabase/migrations/`.
2. Push the migration to the remote database or local environment.
3. Verify the records were created by running `SELECT * FROM training_lessons;` using the Supabase Dashboard, MCP `execute_sql` tool, or by checking the frontend UI in the "Training" tab of `EquipmentDetailTabs.tsx` to see if the placeholder video loads without error.
4. Run the migration script a second time (or rerun the seed) to ensure no duplicate rows are created for the same course.
