# Handoff Report: Milestone 2 Quiz Data Generation & Migration Requirements Analysis

## 1. Observation
1. **Types Verification**: In `src/app/types/index.ts` (lines 169–180), we verified the interface structure for quizzes:
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
2. **Local Database Status**: Running `npx supabase status` failed with:
   ```text
   failed to inspect container health: error during connect: in the default daemon configuration on Windows, the docker client must be run with elevated privileges to connect: Get "http://%2F%2F.%2Fpipe%2Fdocker_engine/v1.51/containers/supabase_db_fix-lesson-completion-logic/json": open //./pipe/docker_engine: The system cannot find the file specified.
   ```
3. **MCP Server Integration**: `.mcp.json` (lines 1–8) exposes the hosted Supabase instance:
   ```json
   {
     "mcpServers": {
       "supabase": {
         "type": "http",
         "url": "https://mcp.supabase.com/mcp?project_ref=netvfzmdewatfnmejcrz"
       }
     }
   }
   ```
4. **Lesson Metadata Comments**: In `supabase/migrations/20260711000001_backfill_video_lesson_content_th.sql` (line 81), we observed comments containing the titles:
   ```sql
   -- lesson-ccna002-01 | Switching Basics
   ```
5. **Extracted Dataset**: Running our Node.js extraction script parsed all SQL seed and migration files, obtaining exactly **69 unique lessons** with non-empty `title_en` and `content_en` values (saved in `.agents/teamwork_preview_explorer_m2_3/lessons_extracted.json`).

## 2. Logic Chain
1. Since the local Docker daemon is not running (Observation 2), the worker agent cannot run a local PostgreSQL instance or migrate local DB changes using standard CLI tools.
2. The remote database references the ID `netvfzmdewatfnmejcrz` (Observation 3). Accessing it via direct network call violates code-only network restrictions. However, the Supabase MCP server (Observation 3) can communicate with the remote DB using editor-level oauth credentials.
3. Therefore, the worker agent must use the `execute_sql` MCP tool to fetch and apply database changes.
4. Because some lessons lack explicit `title_en` column updates in migration SQL statements, we can reliably extract their English titles from code comments (Observation 4) or fallback to parsing the first header line (`## Title`) in `content_en`.
5. To safely format string/JSON updates in PostgreSQL, the worker must use dollar-quoted strings (`$json$ ... $json$`) to escape special characters, quotes, and newlines.

## 3. Caveats
- The total count of unique lessons is exactly 69 based on codebase SQL migrations, not the initially estimated 73. If new lessons are added later, the generation script must be rerun.
- Using dollar-quoted strings assumes the JSON quiz content does not contain the delimiter `$json$`, which is true for typical multiple-choice questions.

## 4. Conclusion
We recommend the following actionable strategy for the worker agent:
1. **Source Data**: Load the complete lesson dataset from the pre-extracted `.agents/teamwork_preview_explorer_m2_3/lessons_extracted.json`.
2. **Generation**: Loop over the 69 lessons and generate exactly 5 bilingual multiple-choice questions per lesson matching the `LessonQuizData` interface.
3. **Migration SQL**: Output a single SQL migration file using the format:
   ```sql
   UPDATE public.lessons SET quiz_data = $json$[JSON_STRING]$json$ WHERE id = '[id]';
   ```
4. **Execution**: Apply the SQL file to the database using the `execute_sql` MCP tool.

## 5. Verification Method
1. Parse the generated migration file and run it against the Supabase database.
2. Run the following verification query via the `execute_sql` MCP tool:
   ```sql
   SELECT id, title_en, jsonb_typeof(quiz_data) FROM public.lessons WHERE quiz_data IS NOT NULL;
   ```
   Confirm all 69 lessons return `json` or `object` types.
3. Validate the structure of the returned `quiz_data` in JavaScript using:
   ```javascript
   const data = JSON.parse(quizData);
   if (!Array.isArray(data.questions) || data.questions.length !== 5) throw new Error("Invalid structure");
   ```
