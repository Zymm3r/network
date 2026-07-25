# Handoff Report: Milestone 1 - Database Schema Migration Planning

## 1. Observation

During exploration of the workspace filesystem, the following specific details were observed:

1. **Database Schema & Migrations**:
   - The table `public.lessons` is created in `supabase/migrations/20260518000001_create_missing_tables.sql` (lines 3-18):
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
   - Row-level security (RLS) is enabled and select permissions are granted to `anon` and `authenticated` roles in `supabase/migrations/20260518000003_enforce_rls_and_policies.sql` (lines 20, 24, 28):
     ```sql
     ALTER TABLE IF EXISTS public.lessons ENABLE ROW LEVEL SECURITY;
     CREATE POLICY IF NOT EXISTS "Lessons are viewable by everyone" ON public.lessons FOR SELECT USING (true);
     GRANT SELECT ON public.lessons TO anon, authenticated;
     ```

2. **Frontend Type Definitions**:
   - The `Lesson` type is defined in `src/app/types/index.ts` (lines 31-46):
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

3. **Database Client & Querying Hooks**:
   - The `useLessons` hook in `src/app/hooks/useLessons.ts` queries the database using wildcard select (lines 31-34):
     ```typescript
     let query = supabase
       .from('lessons')
       .select('*')
       .order('order_index', { ascending: true });
     ```
   - The `useLesson` hook in `src/app/hooks/useLessons.ts` similarly fetches a single lesson with wildcard select (lines 93-97):
     ```typescript
     const { data, error: fetchError } = await supabase
       .from('lessons')
       .select('*')
       .eq('id', id)
       .single();
     ```

4. **Quiz & Exercise Rendering Page**:
   - In `src/app/pages/LessonDetail.tsx`, the `QuizCard` and `ExerciseCard` components are rendered under tabs, receiving only `course_id` (lines 1031-1046):
     ```typescript
     <TabsContent value="quiz" className="mt-0">
       <QuizCard 
         courseId={lesson.course_id || undefined} 
         onComplete={(score, total) => {
           if (score / total >= 0.8) setIsQuizPassed(true);
         }} 
         onNextLesson={handleNextLesson}
       />
     </TabsContent>
     ```

5. **Local Environment Constraints**:
   - Running `docker ps` returned: `docker : The term 'docker' is not recognized as the name of a cmdlet...`
   - Running `npx supabase projects list` returned: `LegacyPlatformAuthRequiredError: Access token not provided. Supply an access token by running supabase login...`

---

## 2. Logic Chain

1. **Schema Alteration**: To store quiz questions and exercise code definitions inside the database, a JSONB column (`quiz_data`) must be added to the `lessons` table.
2. **Safe Migration formulation**: Using `ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS quiz_data jsonb;` ensures the migration is safe and idempotent. Because it defaults to `NULL`, non-quiz/non-exercise lessons remain unaffected.
3. **No Hook Modification Required**: Since `useLessons` and `useLesson` fetch lessons using `.select('*')`, any new column added to `lessons` will automatically be loaded by the client library and populated in the hook's state.
4. **TypeScript Safety**: Adding `quiz_data?: QuizData | null` to the `Lesson` interface in `src/app/types/index.ts` is required so that components referencing `lesson.quiz_data` do not cause compiler errors.
5. **Card Components Updates**: Updating `QuizCard` and `ExerciseCard` to accept optional `questions` and `exerciseData` props, and falling back to local files in `src/app/data/courseQuizData.ts` if the props are not passed, allows for seamless backwards compatibility and a gradual migration.

---

## 3. Caveats

- **Docker/Local Containers**: It was not possible to run the migrations locally because Docker is not available in the environment.
- **Remote DB Connectivity**: It was not possible to connect to the remote database using Supabase CLI because credentials/access tokens are not configured in the host environment.
- **Data Backfill**: Mapping and backfilling existing local static quiz/exercise data into the database is outside the scope of this schema planning task and must be planned separately.

---

## 4. Conclusion

The planning for Milestone 1 is complete. The exact SQL to modify the schema is:
```sql
ALTER TABLE public.lessons
  ADD COLUMN IF NOT EXISTS quiz_data jsonb;

COMMENT ON COLUMN public.lessons.quiz_data IS 'Optional JSON-structured data for quizzes or coding exercises (e.g., questions, choices, correct index, starter code, test cases).';
```
A concrete plan for the frontend types, hooks, and cards integration has been developed, and step-by-step instructions for the worker to implement the migration have been fully documented in `analysis.md`.

---

## 5. Verification Method

### DB Migration Verification:
1. Run `npx supabase migration list --local` to verify the migration status.
2. Verify the column exists in the database schema:
   ```sql
   SELECT column_name, data_type 
   FROM information_schema.columns 
   WHERE table_schema = 'public' 
     AND table_name = 'lessons' 
     AND column_name = 'quiz_data';
   ```
   *Expected result: 1 row returned with `column_name = 'quiz_data'` and `data_type = 'USER-DEFINED'` (or `jsonb`).*

### Frontend/Types Verification:
1. Run unit tests using Vitest:
   ```bash
   npx vitest run -c vitest.unit.config.ts
   ```
2. Run build to verify TypeScript compiler does not complain:
   ```bash
   npx vite build
   ```
