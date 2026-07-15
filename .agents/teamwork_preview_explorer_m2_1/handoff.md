# Handoff Report: Milestone 2 — Quiz Data Generation & Migration

## 1. Observation

- **Types Definition**: In `src/app/types/index.ts` (lines 169–180), the `LessonQuizQuestion` and `LessonQuizData` interfaces are defined as:
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
- **Discrepancy in Component Render**: In `src/app/components/QuizCard.tsx` (lines 121–122), the component expects camelCase properties (`correctIndex`) and different field names (`choices` instead of `options`):
  ```typescript
  const correct = selectedIdx === question.correctIndex;
  ```
  And in `src/app/data/courseQuizData.ts` (lines 6–13), the type `QuizQuestion` is defined as:
  ```typescript
  export interface QuizQuestion {
    id: number;
    question: string;
    choices: string[];
    correctIndex: number;
    explanation: string;
    hint?: string;
  }
  ```
- **Database Status & Docker**: Executing `npx supabase status` failed with:
  ```
  failed to inspect container health: error during connect: in the default daemon configuration on Windows, the docker client must be run with elevated privileges to connect
  ```
- **Local Postgres daemon**: Checking port `5432` showed process PID `6452` occupied by `postgres.exe` under the image name `postgres.exe`, which tasklist/netstat resolved to `SecurityTomcat` (an external security suite, not the project's local Supabase DB).
- **Project Ref**: `.mcp.json` (line 5) maps the hosted project ref as `netvfzmdewatfnmejcrz`.
- **Lessons Data Extraction**: We wrote a node script `parse_lessons.cjs` to extract the lessons from `src/app/data/seed.sql` and the migrations directory `supabase/migrations/`. It successfully parsed **69 unique lesson IDs** with non-empty `content_en` and `title_en` values, saving them to `lessons_parsed.json`.

---

## 2. Logic Chain

1. **Extraction Source**: Since local Docker is not running and we are in `CODE_ONLY` network mode (preventing external HTTP queries to `netvfzmdewatfnmejcrz.supabase.co`), we could not query the remote database. Instead, we parsed the local SQL schema and migration files.
2. **Parsed Count (69 vs 73)**: Our parser found 69 unique lessons in the migrations and seed file. The user request's mention of 73 lessons indicates that 4 lessons might have been manually inserted into the remote database and are not tracked in the local migration history. Thus, the final worker script must support querying the database directly when DB credentials/access are available, using the migration file parser only as a fallback.
3. **Bilingual and Naming Discrepancies**: The database-aligned type `LessonQuizQuestion` uses `correct_index` and `options` (snake_case), but the UI `QuizCard.tsx` expects `correctIndex` and `choices` (camelCase) from the `QuizQuestion` type. This means the frontend must map `LessonQuizQuestion` to the UI structure dynamically (using the active language context).
4. **SQL Escaping**: Double single quotes (`''`) are standard for escaping quotes in SQL, but dollar-quoting (`$$` or `$json$`) in PostgreSQL allows inserting raw stringified JSON directly without manual character escaping, which is safer and less error-prone for auto-generated JSON.

---

## 3. Caveats

- We assumed that the 4 missing lessons (the difference between the 69 parsed and the user's 73) exist in the remote database. If they do not exist, the actual total is 69.
- We did not connect to the remote Supabase database because we are in `CODE_ONLY` network mode.
- We did not invoke the LLM to generate the actual questions, as this is a read-only investigation task.

---

## 4. Conclusion

- **Lesson Count**: The codebase local migration files track 69 lessons; the remote database may contain up to 73.
- **Frontend Refactor Needed**: A mapper function is required in the frontend (or `QuizCard` props) to translate database `LessonQuizQuestion` (snake_case, bilingual) to frontend `QuizQuestion` (camelCase, single language) during render.
- **Script Strategy**: The worker should implement a Node/TypeScript script that first tries to query the remote database using `@supabase/supabase-js`, falling back to SQL migration file parsing if database access is blocked.
- **Migration & Escaping**: The migration script should update the `quiz_data` column in `lessons` table using Postgres dollar-quoting `$json$<JSON_STRING>$json$::jsonb` to prevent syntax crashes due to single quotes inside generated English/Thai text.

---

## 5. Verification Method

1. **Verify Local SQL Extraction**: Run `node parse_lessons.cjs` from the agent directory and verify it outputs `Total lessons parsed: 69` and generates `lessons_parsed.json`.
2. **Schema and Build Check**: Run `npm run build` to confirm there are no TypeScript compile errors in types or components.
3. **Verify escaping**: Validate that running a test SQL command using dollar-quotes:
   ```sql
   UPDATE public.lessons SET quiz_data = $json${"questions": []}$json$::jsonb WHERE id = 'lesson-ccna001-01';
   ```
   applies correctly in psql without syntax errors.
