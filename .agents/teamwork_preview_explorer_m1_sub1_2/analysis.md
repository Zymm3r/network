# Database Schema Migration Analysis — Milestone 1

This report analyzes the requirements, current database schema, exact SQL statement, and implementation steps required to add a `quiz_data` column of type `jsonb` to the `lessons` table for Milestone 1.

---

## 1. Existing Database Schema Definition

We located the existing migration files under the `supabase/migrations/` directory. The `lessons` table is initially created in the first migration file:
- **File Path**: `supabase/migrations/20260518000001_create_missing_tables.sql`

### Current Schema of the `lessons` Table (from the migration file):
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

### Key Insights:
- **ID Type**: `UUID` is the primary key.
- **Foreign Keys**: `course_id` references `public.courses(id)`.
- **Foreign Key discrepancy in `user_progress`**: In `20260518000004_add_lesson_id_to_user_progress.sql`, `lesson_id` was added as `TEXT REFERENCES public.lessons(id)` instead of `UUID REFERENCES public.lessons(id)`. In subsequent queries (such as in `20260609000000_fix_rls_and_m4_analytics.sql`), they perform casts: `JOIN public.lessons l ON l.id::text = up.lesson_id::text`. This mismatch does not affect adding the `quiz_data` column on `lessons`.

---

## 2. Local Database & Connection Assessment

- **Docker Status**: The local Docker Desktop/daemon is not running on the system (`open //./pipe/docker_engine: The system cannot find the file specified`). Therefore, the local Supabase container environment is inactive.
- **Port 5432**: A native PostgreSQL instance is listening on port 5432. However, this port is bound to Process ID `6452` owned by `SecurityTomcat`, an external security software suite. It does not contain the UTech database or the `postgres` role.
- **Database Access Conclusion**: Direct connection to the active project database container via Supabase CLI commands (`npx supabase db query` / `npx supabase migration list`) is currently unavailable due to Docker being offline. However, the migration files under `supabase/migrations/` provide a 100% complete and accurate definition of the database structure.

---

## 3. SQL Formulation for adding `quiz_data`

To add the `quiz_data` column safely and idempotently, we formulate the following SQL statements:

```sql
-- Migration: Add quiz_data column to lessons table
-- Description: Adds a nullable jsonb column to store quiz questions.
-- This migration is idempotent.

ALTER TABLE public.lessons 
ADD COLUMN IF NOT EXISTS quiz_data jsonb;
```

### Safety & Compatibility Considerations:
1. **Idempotency**: Using `ADD COLUMN IF NOT EXISTS` ensures that running the migration multiple times (e.g. during a rollback/retry or multi-stage deployment) will not throw an error if the column is already present.
2. **Nullability**: The column is defined without `NOT NULL`. Nullability ensures backward compatibility: existing lessons (video, reading, exercise) do not need to be updated with empty/dummy JSON arrays initially, and will default to `NULL`.
3. **Data Type**: `jsonb` is selected (as requested) over `json` because it stores data in a decomposed binary format, allowing faster lookup/processing and indexing on JSON fields in PostgreSQL.
4. **RLS (Row Level Security)**: Table-level `SELECT` policy is already configured on the `lessons` table (re-enforced in `20260518000003_enforce_rls_and_policies.sql`). Since RLS controls row-level access rather than column-level access, the new `quiz_data` column is automatically protected under the same policies:
   - Readable by `anon` and `authenticated` roles.
   - Write operations (INSERT, UPDATE) remain restricted to `service_role` and admin operations.
5. **No Triggers Affected**: There are no database triggers on the `lessons` table that rely on the column structure (the `update_lessons_updated_at` trigger is a simple `BEFORE UPDATE` trigger that sets `updated_at = NOW()`).

---

## 4. Proposed Frontend Integration

To support this change in the frontend, the implementer/worker needs to update:
- **File**: `src/app/types/index.ts`
- **Change**: Include `quiz_data?: QuizQuestion[] | null;` (or `quiz_data?: any;` as a fallback) in the `Lesson` interface definition:

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
  quiz_data?: any; // To store quiz questions array
}
```

---

## 5. Migration Execution Guide for Workers

A worker can create and apply this migration using the local Supabase CLI installation:

### Step 1: Generate a New Migration File
Using the local project's Supabase CLI installation, generate a timestamped migration SQL file:
```powershell
npx supabase migration new add_quiz_data_to_lessons
```
This will create a blank file at:
`supabase/migrations/<YYYYMMDDHHMMSS>_add_quiz_data_to_lessons.sql`

### Step 2: Populate the Migration File
Open the newly created SQL file and paste the formulated SQL statement:
```sql
-- Migration: Add quiz_data column to lessons table
-- Description: Adds a nullable jsonb column to store quiz questions.

ALTER TABLE public.lessons 
ADD COLUMN IF NOT EXISTS quiz_data jsonb;
```

### Step 3: Apply the Migration Locally
Start Docker and apply the migration to the local development database:
```powershell
npx supabase db reset
```
*(Note: `supabase db reset` recreates the local database schema from scratch by applying all migrations in chronological order, including the new one).*

### Step 4: Verify the Migration
Inspect the list of migrations to verify that the new migration has been successfully applied:
```powershell
npx supabase migration list --local
```
Or check the schema directly via a SQL query:
```powershell
# Using Supabase CLI (if v2.79.0+)
npx supabase db query "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'lessons' AND column_name = 'quiz_data';"
```
If the command output returns:
| column_name | data_type |
|---|---|
| quiz_data | jsonb |

Then the migration has been successfully and correctly applied.
