# Milestone 1: Database Schema Migration - Analysis

## 1. Overview & Context
This analysis plans the addition of a `quiz_data` column of type `jsonb` to the `lessons` table in the Supabase database. Storing quiz questions in the database allows the application to dynamically serve lesson-specific quizzes, moving away from hardcoding quiz data on the client.

## 2. Existing Database Schema Analysis
By examining the project's existing migrations, specifically `supabase/migrations/20260518000001_create_missing_tables.sql`, the `lessons` table is structured as follows:

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

### Key Observations:
- **`lesson_type`**: A CHECK constraint limits the type of lesson to `'video'`, `'quiz'`, `'exercise'`, or `'reading'`. The `quiz_data` column is only relevant for lessons where `lesson_type = 'quiz'`.
- **Triggers**: A BEFORE UPDATE trigger `update_lessons_updated_at` exists on the table to update the `updated_at` column. Adding a column will not affect this trigger.
- **Foreign Keys / Dependents**: `practice_exercises.lesson_id`, `user_progress.lesson_id`, and `exercise_attempts.lesson_id` reference `lessons(id)`. Adding a column to `lessons` does not affect these foreign key constraints.
- **Views**: There are no database views that perform a `SELECT *` on `lessons` which would need to be rebuilt.

## 3. Formulated SQL Migration
The SQL required to add the `quiz_data` column safely and idempotently is:

```sql
-- Migration: Add quiz_data column to lessons table
-- Description: Adds a jsonb column for storing structured quiz questions

ALTER TABLE public.lessons 
ADD COLUMN IF NOT EXISTS quiz_data jsonb;

-- Add description for documentation/introspection purposes
COMMENT ON COLUMN public.lessons.quiz_data IS 'Structured quiz questions, choices, correct answers, explanations, and hints for quiz lessons.';
```

### Safety and Defaults:
- **Idempotency**: Using `ADD COLUMN IF NOT EXISTS` ensures that the migration runs without error if the column is already present.
- **Default value**: The column defaults to `NULL`, which is correct since non-quiz lessons (video, exercise, reading) will not have quiz data.
- **Constraints**: No additional constraints are placed on `quiz_data` at the database level to allow flexibility in the quiz JSON schema.

## 4. Suggested TypeScript Type Updates
To ensure alignment with the database schema, the `Lesson` interface in `src/app/types/index.ts` should be updated:

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
  quiz_data?: any; // Added for database parity
}
```

## 5. Supabase CLI Execution Steps for the Implementer
Below are the concrete steps for the worker/implementer to create, apply, and verify this migration using the Supabase CLI:

### Step 1: Create a new migration file
Generate a new, empty migration file using the Supabase CLI. Run this command from the project root:
```bash
npx supabase migration new add_quiz_data_to_lessons
```
This creates a timestamped SQL file inside the `supabase/migrations/` directory (e.g. `supabase/migrations/20260714000012_add_quiz_data_to_lessons.sql`).

### Step 2: Write the SQL content
Open the newly created migration file and paste the formulated SQL:
```sql
ALTER TABLE public.lessons 
ADD COLUMN IF NOT EXISTS quiz_data jsonb;

COMMENT ON COLUMN public.lessons.quiz_data IS 'Structured quiz questions, choices, correct answers, explanations, and hints for quiz lessons.';
```

### Step 3: Run the migration on the local database
Verify the migration applies successfully by running:
```bash
npx supabase db reset
```
*Note: This will recreate the local database and run all migrations from scratch, ensuring that the new migration executes without issues in the sequence of existing migrations.*

### Step 4: Verify migration application
Run the migration list command to ensure the new migration is marked as applied:
```bash
npx supabase migration list
```

To verify the column exists, query the database catalog using a database client or CLI query tool (when the local database is running):
```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'lessons' AND column_name = 'quiz_data';
```
Expected output should show:
- `column_name`: `quiz_data`
- `data_type`: `jsonb`
