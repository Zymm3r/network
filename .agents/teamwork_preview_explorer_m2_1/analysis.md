# Milestone 2: Quiz Data Generation & Migration Analysis

This report presents the analysis of requirements for Milestone 2: Per-Lesson Quiz Data Generation & Migration.

---

## 1. Lesson Data Analysis

### Database Connectivity & Credentials
- **Active Environment**: The active database is a hosted Supabase project with reference `netvfzmdewatfnmejcrz`.
- **Local environment**: A local Postgres server is listening on port `5432` but it is an external security daemon (`SecurityTomcat` / `postgres.exe` under PID `6452`) and does not belong to the UTech project.
- **Docker Daemon**: Docker Desktop is not running, so the local Supabase stack (`npx supabase status`) cannot be started.
- **Connection Strategy**: Since direct remote connection requires a DB password and we are operating in `CODE_ONLY` network mode, we parsed all lesson definitions directly from local source SQL files (`src/app/data/seed.sql` and the SQL migration files in `supabase/migrations/`).

### Lesson Extraction Findings
We executed a custom parser script (`parse_lessons.cjs`) which successfully processed all inserts and updates in the codebase.
- **Total Unique Lessons Found**: **69 lessons** (covering 17 distinct courses, including the 5 Git lessons added in migration `20260604000003_fix_images_and_add_git_lessons.sql`).
- **User Reference (73 lessons)**: The user mentioned 73 lessons. The difference of 4 lessons suggests there might be 4 additional lessons that exist in the remote database (e.g. inserted via direct DB queries) but are not tracked in the codebase's SQL files. 
- **Content Availability**: All 69 parsed lessons have their English title (`title_en`) and English content (`content_en`) fully backfilled and available in the JSON output `lessons_parsed.json`.

---

## 2. Content & Quiz Data Structure

### Analysis of `content_en`
For both reading lessons (e.g., `lesson-ccna001-03`, `lesson-git-02`) and video lessons (e.g., `lesson-ccna001-01`), the `content_en` property contains a detailed Markdown string outlining the topics, subtopics, command snippets, and summaries. This provides a rich textual context suitable for LLM consumption.

### Type Definition Verification
The codebase definition in `src/app/types/index.ts` is:
```typescript
export interface LessonQuizQuestion {
  question_en: string;
  question_th: string;
  options: string[];
  correct_index: number;
  explanation_en?: string | null;
  explanation_th?: string | null;
}
export interface LessonQuizData {
  questions: LessonQuizQuestion[];
}
```
**Discrepancy with frontend rendering (`QuizCard.tsx`)**:
We inspected `src/app/components/QuizCard.tsx` and found a significant structural difference. The current frontend rendering logic expects `QuizQuestion` (defined in `src/app/data/courseQuizData.ts`), which uses:
- `correctIndex` (camelCase) instead of `correct_index` (snake_case)
- `choices: string[]` instead of `options: string[]`
- `question` (single language string) instead of `question_en`/`question_th`
- `explanation` (single language string) instead of `explanation_en`/`explanation_th`

**Recommendation**: When rendering the per-lesson quizzes via `QuizCard.tsx`, the implementer must map the database-aligned `LessonQuizQuestion` fields to the camelCase `QuizQuestion` structure, dynamically selecting the language fields (`question_en` or `question_th` based on the active translation context).

---

## 3. Implementation Strategy

### A. Strategy for Querying Lessons
1. **Direct Query (Primary)**: Write a Node/TypeScript utility script that loads environment variables from `.env.local` using `dotenv`, instantiates the Supabase client using `@supabase/supabase-js`, and queries the database:
   ```typescript
   const { data: lessons, error } = await supabase
     .from('lessons')
     .select('id, title_en, content_en')
     .order('id');
   ```
2. **File Parsing (Fallback/Offline)**: If the database is unreachable or credentials are not present, use the SQL parsing strategy implemented in `parse_lessons.cjs`. It parses the insert statements in `seed.sql` and subsequent updates in the migrations folder to compile the list of lessons.

### B. Strategy for Quiz Data Generation (LLM Integration)
1. **Worker Script Execution**: Write a TypeScript script (e.g., `scripts/generate-lesson-quizzes.ts`) that runs locally or in the CI worker.
2. **LLM API Calls**:
   - For each lesson, pass `content_en` to the LLM (e.g. Claude 3.5 Sonnet or GPT-4o) using standard system prompt constraints.
   - Enforce structured JSON output matching the `LessonQuizData` interface.
3. **Robust System Prompt**:
   ```markdown
   You are an expert curriculum designer. Given the following lesson content, generate exactly 5 multiple-choice questions in both English and Thai.
   
   Output ONLY a valid JSON object matching this schema:
   {
     "questions": [
       {
         "question_en": "string",
         "question_th": "string",
         "options": ["string", "string", "string", "string"], // exactly 4 choices
         "correct_index": number, // 0 to 3
         "explanation_en": "string",
         "explanation_th": "string"
       }
     ]
   }
   ```
4. **Validation and Retries**:
   - Parse the LLM response with `JSON.parse()`.
   - Validate that `questions` contains exactly 5 elements, each `options` array has exactly 4 items, and `correct_index` is between 0 and 3.
   - If validation fails, retry the LLM call with a corrective prompt.

### C. Strategy for Generating the Migration File
1. **Dollar Quoted String Literals**: When constructing the SQL migration file, the JSON object must be safely written as a Postgres literal. Instead of escaping single quotes with double single quotes (`''`), use Postgres dollar-quoting (`$$` or `$json$`) which allows writing raw JSON strings directly.
2. **Format**:
   ```sql
   UPDATE public.lessons 
   SET quiz_data = $json${JSON.stringify(quizData)}$json$::jsonb 
   WHERE id = '${lesson.id}';
   ```
3. **Migration Target**: Write the output to a new migration file under `supabase/migrations/` (e.g., `20260714074000_add_quizzes_to_lessons.sql`).

### D. Strategy for Verification
1. **Schema Check via SQL**: Execute a verification script locally or in the database that runs:
   ```sql
   SELECT count(*) FROM public.lessons WHERE quiz_data IS NOT NULL;
   -- Should equal the total number of lessons (e.g. 73)
   ```
2. **JSON Schema Validation in Test Suite**: Add a Vitest test under `src/tests/quizzes.test.ts` that runs as part of `npm run test` or `npm run build`:
   ```typescript
   import { createClient } from '@supabase/supabase-js';
   import { LessonQuizData } from '../app/types';

   test('validate quiz_data structure for all lessons', async () => {
     const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.VITE_SUPABASE_ANON_KEY!);
     const { data: lessons } = await supabase.from('lessons').select('id, title_en, quiz_data');
     
     lessons?.forEach(lesson => {
       expect(lesson.quiz_data).toBeDefined();
       expect(lesson.quiz_data).not.toBeNull();
       const data = lesson.quiz_data as LessonQuizData;
       expect(data.questions).toHaveLength(5);
       data.questions.forEach(q => {
         expect(q.options).toHaveLength(4);
         expect(q.correct_index).toBeGreaterThanOrEqual(0);
         expect(q.correct_index).toBeLessThanOrEqual(3);
         expect(q.question_en).toBeTruthy();
         expect(q.question_th).toBeTruthy();
       });
     });
   });
   ```
