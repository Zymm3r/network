# Handoff: Milestone 1 - Database Migration Strategy

## Observation
- `EquipmentDetailTabs.tsx` (line 28) queries `training_lessons` using `.select('video_url')`, `.eq('course_id', courseId)`, and `.order('lesson_order', { ascending: true })`.
- `training_courses` schema is used locally with `id` and `title` fields (seen in `src/features/equipment/types/product.ts` and `import-training.ts`).
- Base schema creation (`CREATE TABLE`) for `training_lessons` and `training_courses` does not exist in local `supabase/migrations/` files. They were likely created directly via Supabase Studio or externally.
- A test insert verified that `training_lessons` exists but is protected by Row-Level Security (RLS) preventing direct introspection via Anon Key insertions.
- Prior agent handoffs and context revealed `training_lessons` columns include `id`, `course_id`, `title`, `video_url`, `lesson_order`, `created_at`.
- `EquipmentDetailTabs.tsx` displays the video in an iframe, requiring an embeddable format (e.g., `https://www.youtube.com/embed/...`).

## Logic Chain
1. The objective is to seed `training_lessons` idempotently with placeholder videos linked to existing `training_courses`.
2. An idempotent `INSERT INTO ... SELECT ... WHERE NOT EXISTS` SQL query guarantees we only add a placeholder lesson for courses that do not already have one.
3. Since the prompt specifies not modifying existing production data outside of migrations, putting this SQL in a new file in `supabase/migrations/` is the correct approach.
4. Using `gen_random_uuid()` for the `id` ensures the insert works correctly regardless of whether the `id` column has a default UUID generator in the remote schema.

## Caveats
- Because `training_lessons` was created directly on the remote DB, we are relying on partial introspection for its exact schema. If the database complains about missing `NOT NULL` columns (e.g., `description`), the SQL will need to be adjusted by the implementer.

## Conclusion
Create a new Supabase migration file (e.g., `supabase/migrations/20260608200000_seed_training_lessons.sql`) containing an idempotent SQL statement that selects all existing courses and inserts a placeholder YouTube video if no lesson exists for that course.

### Proposed Migration File:
```sql
-- Seed training_lessons with placeholder YouTube videos idempotently
INSERT INTO public.training_lessons (id, course_id, title, video_url, lesson_order)
SELECT 
    gen_random_uuid(),
    tc.id,
    COALESCE(tc.title, 'Training Course') || ' - Lesson 1',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    1
FROM public.training_courses tc
WHERE NOT EXISTS (
    SELECT 1 FROM public.training_lessons tl 
    WHERE tl.course_id = tc.id
);
```

## Verification Method
1. Run `npx supabase db push` to apply the migration, or execute the SQL file directly using the `supabase` MCP `execute_sql` tool.
2. Verify insertion by querying `SELECT count(*) FROM training_lessons;` using `execute_sql`.
3. Open the web app, navigate to an equipment detail page's "Training" tab, click "Watch Lesson", and verify the placeholder video loads properly in the modal.
