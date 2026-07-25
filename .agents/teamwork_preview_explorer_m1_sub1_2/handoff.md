# Handoff Report — Milestone 1 Database Schema Migration Planning

## 1. Observation
- **lessons table definition**: Found at `supabase/migrations/20260518000001_create_missing_tables.sql` line 3:
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
- **Type mismatch in user_progress**: Found at `supabase/migrations/20260518000004_add_lesson_id_to_user_progress.sql` line 3:
  ```sql
  ADD COLUMN IF NOT EXISTS lesson_id text REFERENCES public.lessons(id) ON DELETE CASCADE;
  ```
  The table `lessons(id)` is defined as `UUID` while `user_progress.lesson_id` is defined as `text`. M4 analytics solves this using text casts: `l.id::text = up.lesson_id::text` (found in `supabase/migrations/20260609000000_fix_rls_and_m4_analytics.sql` line 145).
- **Supabase CLI environment**:
  - `npx supabase --version` returns version `2.109.1`.
  - Local Docker daemon is not active; `npx supabase status` fails with:
    `failed to inspect container health: error during connect: in the default daemon configuration on Windows, the docker client must be run with elevated privileges to connect: Get "http://%2F%2F.%2Fpipe%2Fdocker_engine/v1.51/containers/supabase_db_fix-lesson-completion-logic/json": open //./pipe/docker_engine: The system cannot find the file specified.`
  - Port `5432` is listening, but bound to `SecurityTomcat` (PID 6452), a non-project process.
- **Frontend types**: Found at `src/app/types/index.ts` lines 31-46:
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

---

## 2. Logic Chain
1. Based on the observation of the existing migrations, the `lessons` table does not contain a `quiz_data` column.
2. In order to store quiz questions as part of a lesson on the database side, we need to add a `quiz_data` column to the `lessons` table.
3. Based on the `DEFAULT_QUIZ_QUESTIONS` interface (`QuizQuestion[]`) found in `src/app/data/courseQuizData.ts`, quiz questions are arrays of objects containing text fields and choices. The `jsonb` data type is appropriate for storing this semi-structured data.
4. Using an idempotent `ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS quiz_data jsonb;` ensures that the column will be added safely, won't break if applied twice, and won't conflict with any existing row-level security (RLS) policies.
5. In the frontend, the `Lesson` interface in `src/app/types/index.ts` must be updated to include `quiz_data?: any;` so that typescript compilation succeeds when fetching and rendering this field.

---

## 3. Caveats
- Since the local Docker daemon is not running, we could not apply and test the migration locally in our own environment. We assume the Postgres environment will behave in standard fashion once Docker is started by the worker/implementer.
- No other tables/views require updates for this migration, as RLS policies on the `lessons` table automatically propagate select permissions to the new column.

---

## 4. Conclusion
Milestone 1 can be successfully achieved by generating a new Supabase migration containing the following SQL:
```sql
ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS quiz_data jsonb;
```
And updating the `Lesson` type in `src/app/types/index.ts` to include `quiz_data?: any;`.

---

## 5. Verification Method
1. **Migration Application**:
   Execute `npx supabase db reset` to apply all migrations (including the newly generated one).
2. **Schema Verification**:
   Inspect the schema by running:
   ```powershell
   npx supabase db query "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'lessons' AND column_name = 'quiz_data';"
   ```
   Ensure it returns `quiz_data` with data type `jsonb`.
3. **Frontend Compile & Test Verification**:
   Run `npx vitest run -c vitest.unit.config.ts` to verify that updating `src/app/types/index.ts` does not break any existing unit tests.
