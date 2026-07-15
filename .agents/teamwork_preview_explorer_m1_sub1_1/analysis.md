# Milestone 1: Database Schema Migration - Analysis

This report documents the exploration of the database schema and frontend components to plan the addition of a `quiz_data` column of type `jsonb` to the `lessons` table.

## 1. Existing Database Schema & Migration Analysis

The `lessons` table is originally defined in the migration file:
`supabase/migrations/20260518000001_create_missing_tables.sql` (lines 3-18).

Its structure is as follows:
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

### Key Observations & Constraints:
1. **Row Level Security (RLS)**: Enabled in `20260518000001_create_missing_tables.sql` (line 65) and enforced in `20260518000003_enforce_rls_and_policies.sql` (line 20).
2. **Access Control Policy**: 
   - `CREATE POLICY "Lessons are viewable by everyone" ON public.lessons FOR SELECT USING (true);`
   - Read-only access is granted to `anon` and `authenticated` roles (`GRANT SELECT ON public.lessons TO anon, authenticated;`). Write access is restricted by default to `service_role` and admin flows.
3. **No Previous `jsonb` Columns**: This will be the first `jsonb` column in the schema.

---

## 2. Formulated SQL Migration

To safely add the `quiz_data` column, the SQL statement must check for existing column presence (`IF NOT EXISTS`) to prevent errors in case of re-runs.

### Exact SQL Statement:
```sql
-- Migration: Add quiz_data column to lessons table
-- Description: Adds a nullable jsonb column to store lesson-specific quiz or coding exercise configuration.

ALTER TABLE public.lessons
  ADD COLUMN IF NOT EXISTS quiz_data jsonb;

-- Comment describing the new column's structure
COMMENT ON COLUMN public.lessons.quiz_data IS 'Optional JSON-structured data for quizzes or coding exercises (e.g., questions, choices, correct index, starter code, test cases).';
```

### Default Value Strategy:
- The column will default to `NULL`, which is clean and correct for non-quiz/non-exercise lesson types (e.g. `video` or `reading`). No default empty JSON object `{}` or array `[]` is needed since the presence of `NULL` serves as an indicator that the lesson does not have interactive quiz/exercise data in the database.

---

## 3. Frontend Integration Planning

Currently, quiz questions and exercises are loaded using static maps in `src/app/data/courseQuizData.ts` using `courseId`:
- `QuizCard` uses `getQuizForCourse(courseId)`
- `ExerciseCard` uses `getExerciseForCourse(courseId)`

### 3.1 Type Definitions
In `src/app/types/index.ts`, update the `Lesson` interface to include the `quiz_data` column.
For maximum type safety, we can define a union type.

**Proposed Changes (`src/app/types/index.ts`):**
```typescript
import { QuizQuestion, ExerciseData } from '../data/courseQuizData';

export type QuizData = QuizQuestion[] | ExerciseData;

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
  quiz_data?: QuizData | null; // <-- Added new field
  created_at: string;
  updated_at: string;
}
```

### 3.2 Fetching Hooks
The `useLessons` and `useLesson` hooks in `src/app/hooks/useLessons.ts` perform a wildcard SELECT:
- `supabase.from('lessons').select('*')`
Therefore, they will **automatically** fetch the `quiz_data` column from the database without any code changes required in the hooks themselves.

### 3.3 Components
For backwards compatibility and a progressive roll-out, `QuizCard` and `ExerciseCard` should accept a direct prop for the quiz/exercise data. If it is passed, they should use it. Otherwise, they should fallback to loading from `courseQuizData.ts` via `courseId`.

#### `QuizCard.tsx` Props:
```typescript
interface QuizCardProps {
  courseName?: string;
  courseId?: string;
  questions?: QuizQuestion[]; // <-- Added
  onComplete?: (score: number, totalQuestions: number) => void;
  onNextLesson?: () => void;
}

// Inside Component:
const questions = propsQuestions || getQuizForCourse(courseId);
```

#### `ExerciseCard.tsx` Props:
```typescript
interface ExerciseCardProps {
  courseName?: string;
  courseId?: string;
  exerciseData?: ExerciseData; // <-- Added
  onComplete?: (passed: boolean) => void;
  onNextLesson?: () => void;
}

// Inside Component:
const exercise = exerciseData || getExerciseForCourse(courseId);
```

#### `LessonDetail.tsx` Render Integration:
```typescript
          <TabsContent value="quiz" className="mt-0">
            <QuizCard 
              courseId={lesson.course_id || undefined} 
              questions={lesson.quiz_data as QuizQuestion[] || undefined} // <-- Passed down
              onComplete={(score, total) => {
                if (score / total >= 0.8) setIsQuizPassed(true);
              }} 
              onNextLesson={handleNextLesson}
            />
          </TabsContent>
          
          <TabsContent value="exercise" className="mt-0">
            <ExerciseCard 
              courseId={lesson.course_id || undefined} 
              exerciseData={lesson.quiz_data as ExerciseData || undefined} // <-- Passed down
              onComplete={(passed) => setIsExercisePassed(passed)} 
              onNextLesson={handleNextLesson}
            />
          </TabsContent>
```

---

## 4. Implementation Steps for Worker

The worker should follow these steps to create and apply the migration:

1. **Create the Migration File**:
   Run the following command at the project root to generate a new timestamped migration file:
   ```bash
   npx supabase migration new add_quiz_data_to_lessons
   ```
   This will create a file under `supabase/migrations/<timestamp>_add_quiz_data_to_lessons.sql`.

2. **Add the SQL Schema Changes**:
   Open the newly generated migration file and paste the formulated SQL query:
   ```sql
   -- Migration: Add quiz_data column to lessons table
   ALTER TABLE public.lessons
     ADD COLUMN IF NOT EXISTS quiz_data jsonb;

   COMMENT ON COLUMN public.lessons.quiz_data IS 'Optional JSON-structured data for quizzes or coding exercises (e.g., questions, choices, correct index, starter code, test cases).';
   ```

3. **Apply the Migration (Local/Remote)**:
   - To apply the migration to the local development environment:
     ```bash
     npx supabase db reset
     ```
     *(Note: This restarts the local database containers and applies all migrations from scratch.)*
   - To apply it to the remote database:
     ```bash
     npx supabase db push
     ```

4. **Verify the Schema Change**:
   - Check the migration status:
     ```bash
     npx supabase migration list --local
     ```
   - Connect to the database and query the table structure to ensure the column is created:
     ```sql
     SELECT column_name, data_type 
     FROM information_schema.columns 
     WHERE table_schema = 'public' 
       AND table_name = 'lessons' 
       AND column_name = 'quiz_data';
     ```
     This query should return exactly one row with:
     - `column_name`: `quiz_data`
     - `data_type`: `USER-DEFINED` (or `jsonb` depending on client interpretation).
