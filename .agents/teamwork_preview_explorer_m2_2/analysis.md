# Milestone 2: Quiz Data Generation & Migration Analysis

## 1. Overview of Extracted Lesson Data
We successfully connected to the hosted Supabase database (`https://netvfzmdewatfnmejcrz.supabase.co`) using the public anonymous key found in the main worktree's `.env` file (`C:/Users/UTHtest/Downloads/network/.env`). We extracted all **73 lessons** from the `lessons` table, including `id`, `title_en`, `title_th`, and `content_en`.

### Technical Summary of `content_en`
* **Total Lessons**: 73
* **Content Status**: 100% populated (no null or empty values).
* **Length Distribution**:
  * Minimum Length: 656 characters
  * Maximum Length: 1706 characters
  * Average Length: 941.34 characters
* **Markdown Structure**:
  * **Headers**: 100% of lessons use headers (`##` or `###`). Common sections include `## <Title>`, `**What you will learn in this video**` or `**Introduction**`, `**Core Content**`, and `**Conclusion**`.
  * **Lists**: 100% of lessons contain bulleted lists (`- `).
  * **Code Blocks**: 11% (8 lessons) contain technical code blocks (e.g., Cisco IOS commands or Python code).
  * **Tables**: 0% contain tables.

---

## 2. Verification of `LessonQuizData` Types
The typescript interfaces in `src/app/types/index.ts` define the structure of lesson quiz data:

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

This definition matches our requirements:
* It requires exactly `question_en`, `question_th`, `options` (an array of strings), `correct_index` (the 0-indexed correct option).
* It allows optional bilingual explanations (`explanation_en`, `explanation_th`).
* The `lessons` table contains a `quiz_data` column of type `jsonb` (added in migration `20260714073716_add_quiz_data_to_lessons.sql`).

Unit tests in `src/app/types/types.spec.ts` verify that the `Lesson` object allows the `quiz_data` property matching this schema, and we ran these tests successfully using `npx vitest run --config vitest.unit.config.ts src/app/types/types.spec.ts`.

---

## 3. Robust Strategy for Quiz Data Generation & Migration

### A. Querying Lessons
* **Source**: Hosted Supabase project (`netvfzmdewatfnmejcrz`).
* **Method**: Use a Node.js/TypeScript script or Python script with the public anonymous credentials:
  * **API URL**: `https://netvfzmdewatfnmejcrz.supabase.co`
  * **Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ldHZmem1kZXdhdGZubWVqY3J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNTMwNjcsImV4cCI6MjA5MTcyOTA2N30.3SzgLigbKlbUxrgDyYcrkp65soRIBFfeQnQFRmZmE3U` (Retrieved from `C:/Users/UTHtest/Downloads/network/.env`).
  * **RLS Compatibility**: The `lessons` table allows anonymous select, so no service role key or password is required to read the data.

### B. Generating Quiz Questions
* **Mechanism**: A Node/TypeScript script should read the extracted JSON file of lessons.
* **LLM Integration**: The worker script can iterate over all 73 lessons and call an LLM (e.g. OpenAI GPT-4o or Claude 3.5 Sonnet) via API.
* **Prompt Engineering**:
  * Provide the lesson's `title_en` and `content_en`.
  * Ask for exactly 5 multiple-choice questions matching the `LessonQuizData` JSON schema.
  * Require the response to be in bilingual format (`question_en` / `question_th`, and bilingual explanations).
  * Use structured outputs (e.g., JSON Mode or OpenAI's structured outputs with Zod) to guarantee the return format conforms exactly to `LessonQuizData`.

### C. Generating the Migration File
* **Target Location**: `supabase/migrations/<timestamp>_add_lesson_quizzes.sql`
* **Safe String/JSON Escaping**:
  * Standard string escaping in PostgreSQL (doubling single quotes `'` to `''`) is error-prone when dealing with complex JSON strings containing quotes, backslashes, and markdown.
  * **Best Practice**: Use PostgreSQL **dollar-quoted string literals** with a unique tag (e.g., `$json$...$json$`).
  * **Format**:
    ```sql
    UPDATE public.lessons
    SET quiz_data = $json${"questions": [...]}$json$::jsonb
    WHERE id = 'lesson-id';
    ```
  * This is clean, readable, and 100% safe from string escaping bugs.

### D. Verifying the Migration
We suggest a two-level verification strategy:
1. **Database Schema Constraints (PostgreSQL)**:
   Run a validation query directly on the database to ensure the schema of all `quiz_data` entries is correct:
   ```sql
   SELECT 
     id,
     jsonb_typeof(quiz_data) = 'object' AS is_valid_object,
     jsonb_typeof(quiz_data->'questions') = 'array' AS has_questions_array,
     jsonb_array_length(quiz_data->'questions') = 5 AS has_exactly_5_questions
   FROM public.lessons;
   ```
2. **TypeScript Validation Script**:
   Run a local script that pulls the `quiz_data` from the database and runs it against a schema validator (like Zod or a simple custom TypeScript type guard) to verify all fields (including nested objects inside the `questions` array) are valid.
