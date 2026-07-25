# Handoff Report - Milestone 1: Database Schema Migration

## 1. Observation
- The `lessons` table definition is located in `supabase/migrations/20260518000001_create_missing_tables.sql` at lines 3–18:
  ```sql
  CREATE TABLE IF NOT EXISTS public.lessons (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
      title_th TEXT NOT NULL,
      title_en TEXT NOT NULL,
      content_th TEXT,
      content_en TEXT,
      lesson_type TEXT NOT NULL CHECK (lesson_type IN ('video', 'quiz', 'exercise', 'reading')),
      duration_minutes INTEGER,
      order_index INTEGER NOT NULL,
      video_url TEXT,
      thumbnail_url TEXT,
      difficulty TEXT CHECK (difficulty IN ('easy', 'moderate', 'challenging')),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );
  ```
- The TypeScript interface for `Lesson` is defined in `src/app/types/index.ts` at lines 31–46:
  ```typescript
  export interface Lesson {
    id: string;
    course_id: string;
    title_th: string;
    title_en: string;
    content_th: string | null;
    content_en: string | null;
    lesson_type: 'video' | 'quiz' | 'exercise' | 'reading';
    duration_minutes: number | null;
    order_index: number;
    video_url: string | null;
    thumbnail_url: string | null;
    difficulty: ExerciseDifficulty | null;
    created_at: string;
    updated_at: string;
  }
  ```
- Local Supabase CLI is available through npx at version `2.109.1` (verified via `npx supabase --version`).
- Attempts to query the live schema via `npx supabase status` failed due to the local Docker daemon not running on the system (`error during connect: ... open //./pipe/docker_engine: The system cannot find the file specified`).

## 2. Logic Chain
- Adding a `quiz_data` column of type `jsonb` requires an `ALTER TABLE` statement in PostgreSQL.
- Using `ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS quiz_data jsonb` is safe and idempotent, preventing failures if the column is already present.
- Since the database has a trigger `update_lessons_updated_at` executing `BEFORE UPDATE`, adding a new column will not disrupt trigger functionality.
- Since no database views reference `public.lessons` via `SELECT *` or specific column lists that might fail on modification, the table alter will not cause downstream view breakage.
- Adding the column as nullable (no `NOT NULL` constraint) allows other lesson types (reading, video, exercise) to exist with `NULL` in the `quiz_data` column, preventing schema validation issues.
- Therefore, the migration is safe to apply directly without data backfills.

## 3. Caveats
- Since Docker was not running, the migration could not be verified on a live database server. A worker must run the local Docker daemon first.
- The structure of the JSON payload that will be stored in `quiz_data` is not enforced at the database layer (PostgreSQL does not validate JSON schemas natively). It is assumed that application code will handle JSON validation.

## 4. Conclusion
Milestone 1 is ready for implementation. The migration SQL is defined, and the TypeScript types can be safely updated to include `quiz_data?: any;` to maintain parity.

### Formulated SQL
```sql
ALTER TABLE public.lessons 
ADD COLUMN IF NOT EXISTS quiz_data jsonb;

COMMENT ON COLUMN public.lessons.quiz_data IS 'Structured quiz questions, choices, correct answers, explanations, and hints for quiz lessons.';
```

### Implementer Tasks
1. Run `npx supabase migration new add_quiz_data_to_lessons`
2. Populate the generated file with the formulated SQL.
3. Start the local Docker daemon and run `npx supabase db reset` to apply.
4. Update `src/app/types/index.ts` to add `quiz_data?: any;` to the `Lesson` interface.

## 5. Verification Method
- **Locally**:
  - Run the TypeScript build step `npm run build` or type-check `npm run type-check` to ensure no frontend compile errors are introduced by the type changes.
  - Run `npx supabase migration list` to verify the new migration is listed.
- **On a running DB**:
  - Execute:
    ```sql
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'lessons' AND column_name = 'quiz_data';
    ```
    Confirm the output matches: `quiz_data | jsonb`
