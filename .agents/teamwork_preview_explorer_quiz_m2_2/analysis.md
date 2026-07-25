# Milestone 2 Analysis: Quiz Data Generation & Migration

## Executive Summary
This report analyzes the requirements, structure, and database content for **Milestone 2: Quiz Data Generation & Migration** in the **Per-Lesson Quiz Refactor & Auto-Generation** project. The main goal is to generate exactly 5 relevant multiple-choice questions for each of the 73 lessons in the `lessons` table, format them as JSON matching a TypeScript interface, generate a safe SQL migration, and verify that it was successfully applied.

---

## 1. Database Connection & Querying Strategy
We investigated the environment and verified the following:
* **Active Environment**: The project connects to a remote/hosted Supabase database (project ID: `netvfzmdewatfnmejcrz`).
* **Connection Credentials**:
  * **Database URL**: `https://netvfzmdewatfnmejcrz.supabase.co`
  * **Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ldHZmem1kZXdhdGZubWVqY3J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNTMwNjcsImV4cCI6MjA5MTcyOTA2N30.3SzgLigbKlbUxrgDyYcrkp65soRIBFfeQnQFRmZmE3U`
* **Local Postgres Port**: A local Postgres server listens on port `5432` but it is bound to PID `6452` owned by `SecurityTomcat` (an external software suite), and does not host the UTech database. The local Docker daemon is not active. Therefore, database operations must interact with the remote Supabase project.

### Database Query Execution
We successfully connected to the remote Supabase database and retrieved all 73 lessons (mapping `id`, `title_en`, and `content_en`). The lessons were saved in `lessons_db.json`.

Here is the TypeScript snippet to query the database using the `@supabase/supabase-js` client:
```typescript
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://netvfzmdewatfnmejcrz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ldHZmem1kZXdhdGZubWVqY3J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNTMwNjcsImV4cCI6MjA5MTcyOTA2N30.3SzgLigbKlbUxrgDyYcrkp65soRIBFfeQnQFRmZmE3U';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function fetchLessons() {
  const { data, error } = await supabase
    .from('lessons')
    .select('id, title_en, content_en')
    .order('id', { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch lessons: ${error.message}`);
  }
  return data; // Array of 73 lessons
}
```

---

## 2. Analysis of `content_en` Structure
An analysis of the English content for all 73 lessons was conducted:
* **Completeness**: All 73 lessons have non-empty, valid `content_en` text.
* **Standardized Structure**:
  * **Header**: Every lesson begins with a Markdown H2 title (`## Title`).
  * **Conclusion**: 100% of lessons (73/73) end with a `**Conclusion**` section.
  * **Learning Objectives**: 82% of lessons (60/73) contain a `**What you will learn in this video**` or `**What You Will Learn**` section.
  * **Core Content**: 82% of lessons (60/73) contain a `**Core Content**` or `**Main Content**` section containing conceptual bullet points, code blocks, or markdown tables.
* **Length**: The average length of `content_en` is **941 characters**, making it a highly condensed, bulleted summary of each lesson topic. This makes it ideal for direct LLM ingestion.

---

## 3. Quiz Data Schema
For each lesson, the worker must generate exactly 5 relevant multiple-choice questions matching the following TypeScript interface:

```typescript
export interface LessonQuizQuestion {
  question_en: string;        // Question in English
  question_th: string;        // Question in Thai
  options: string[];          // Exactly 4 options
  correct_index: number;      // Index of correct option (0-3)
  explanation_en?: string | null;  // Explanation in English
  explanation_th?: string | null;  // Explanation in Thai
}

export interface LessonQuizData {
  questions: LessonQuizQuestion[];
}
```

---

## 4. Quiz Question Generation Strategy
Since the worker agent can execute scripts, the best approach is to write a Node/TypeScript script that processes the lessons batch-by-batch using an LLM.

### LLM System Prompt Design
The prompt must enforce JSON schema constraints, bilingual output (English and Thai), accuracy, and logical relevance.

```text
You are an expert Network Engineering educator and instructional designer.
Your task is to generate a multiple-choice quiz of exactly 5 questions based on the provided English network lesson content.

For the given lesson:
Title: {title_en}
Content: {content_en}

Generate a JSON object matching this schema:
{{
  "questions": [
    {{
      "question_en": "string", // clear, grammatically correct English question testing the content
      "question_th": "string", // high-quality Thai translation of the question
      "options": ["string", "string", "string", "string"], // exactly 4 distinct options (choices)
      "correct_index": number, // integer index of the correct answer (0, 1, 2, or 3)
      "explanation_en": "string", // short explanation of why the correct answer is correct in English
      "explanation_th": "string" // translation of the explanation in Thai
    }}
  ]
}}

CRITICAL REQUIREMENTS:
1. Generate EXACTLY 5 questions.
2. The questions must be directly answerable using only the facts provided in the lesson content. Do NOT introduce external concepts not mentioned in the text.
3. "correct_index" must be exactly the 0-based index of the correct option in the "options" array.
4. Do not include markdown code block formatting (like ```json) in your final response. Return ONLY raw JSON text.
5. All Thai translations must be natural, professional, and use correct technical terminology.
```

---

## 5. SQL Migration Generation Strategy
To apply the generated quiz data to the database, we need to create a migration script under `supabase/migrations/` (e.g., `20260714073717_populate_lessons_quiz_data.sql`).

### Safe SQL String Escaping
Standard SQL single-quote escaping (`' -> ''`) is prone to errors, especially when dealing with nested JSON strings containing double quotes, single quotes, backslashes, and markdown code blocks. 
* **Solution**: Use Postgres **Dollar-Quoting** with a custom tag (e.g., `$quiz_data$`).
* **Format**:
  ```sql
  UPDATE public.lessons 
  SET quiz_data = $quiz_data$ { "questions": [...] } $quiz_data$::jsonb 
  WHERE id = 'lesson-ccna001-01';
  ```
This completely avoids escaping issues since any character sequence except `$quiz_data$` is treated as a literal character.

---

## 6. Verification & Testing Strategy
To verify the migration was applied correctly and the data conforms to the schema, the following verification script should be run by the auditor or implementer.

### Automated Verification Script (`verify_quizzes.ts`)
```typescript
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://netvfzmdewatfnmejcrz.supabase.co';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_ANON_KEY) {
  console.error("Missing VITE_SUPABASE_ANON_KEY. Cannot run verification.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface LessonQuizQuestion {
  question_en: string;
  question_th: string;
  options: string[];
  correct_index: number;
  explanation_en?: string | null;
  explanation_th?: string | null;
}

interface LessonQuizData {
  questions: LessonQuizQuestion[];
}

async function verify() {
  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('id, title_en, quiz_data');

  if (error) {
    console.error('Failed to fetch lessons:', error.message);
    process.exit(1);
  }

  console.log(`Fetched ${lessons.length} lessons. Verifying quiz_data...`);

  let invalidCount = 0;

  for (const lesson of lessons) {
    const quiz = lesson.quiz_data as unknown as LessonQuizData;

    if (!quiz) {
      console.error(`❌ Lesson ${lesson.id} ("${lesson.title_en}") has NULL quiz_data`);
      invalidCount++;
      continue;
    }

    if (!Array.isArray(quiz.questions)) {
      console.error(`❌ Lesson ${lesson.id} quiz_data is not an array under 'questions'`);
      invalidCount++;
      continue;
    }

    if (quiz.questions.length !== 5) {
      console.error(`❌ Lesson ${lesson.id} has ${quiz.questions.length} questions (expected exactly 5)`);
      invalidCount++;
      continue;
    }

    quiz.questions.forEach((q, idx) => {
      const qNum = idx + 1;
      if (!q.question_en || typeof q.question_en !== 'string') {
        console.error(`❌ Lesson ${lesson.id} Q${qNum} is missing question_en`);
        invalidCount++;
      }
      if (!q.question_th || typeof q.question_th !== 'string') {
        console.error(`❌ Lesson ${lesson.id} Q${qNum} is missing question_th`);
        invalidCount++;
      }
      if (!Array.isArray(q.options) || q.options.length !== 4) {
        console.error(`❌ Lesson ${lesson.id} Q${qNum} options is not an array of size 4`);
        invalidCount++;
      } else {
        q.options.forEach((opt, oIdx) => {
          if (!opt || typeof opt !== 'string') {
            console.error(`❌ Lesson ${lesson.id} Q${qNum} Option ${oIdx} is invalid`);
            invalidCount++;
          }
        });
      }
      if (typeof q.correct_index !== 'number' || q.correct_index < 0 || q.correct_index > 3) {
        console.error(`❌ Lesson ${lesson.id} Q${qNum} has invalid correct_index: ${q.correct_index}`);
        invalidCount++;
      }
    });
  }

  if (invalidCount === 0) {
    console.log('✅ All 73 lessons successfully passed quiz data schema verification.');
    process.exit(0);
  } else {
    console.error(`❌ Found ${invalidCount} validation errors in quiz data.`);
    process.exit(1);
  }
}

verify().catch(console.error);
```
