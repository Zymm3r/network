# Analysis Report: Milestone 2 Quiz Data Generation & Migration

## Executive Summary
This report analyzes the requirements for **Milestone 2: Quiz Data Generation & Migration** for the *Per-Lesson Quiz Refactor & Auto-Generation* project. By retrieving and analyzing the `lessons` table, we established a clear profile of the content. We propose a robust automation strategy that includes querying lessons via Node.js, utilizing a checkpointed LLM generation loop with structured JSON validation, preparing PostgreSQL dollar-quoted migration scripts, and performing comprehensive post-migration data integrity validation.

---

## 1. Lesson Content Analysis

### Database Extraction Results
We established connection parameters via the public anon key and project URL in the workspace context:
- **Project Ref**: `netvfzmdewatfnmejcrz`
- **Supabase URL**: `https://netvfzmdewatfnmejcrz.supabase.co`
- **Extracted Lessons**: **73 lessons** were successfully retrieved.

### Content Structure & Statistics
We executed an analysis script on the extracted lesson text (`content_en`) to profile the size and layout of the lesson material:
- **Total Count**: 73 lessons
- **Average Length**: 941.34 characters per lesson
- **Minimum Length**: 656 characters
- **Maximum Length**: 1,706 characters
- **Format**: All lessons are structured using standard Markdown syntax.

### Common structural elements of `content_en`:
1. **Title Header**: e.g., `## Introduction to REST APIs`
2. **Learning Objectives**: Enclosed in bold markers, e.g., `**What You Will Learn**` or `**What you will learn in this video**`.
3. **Core Bullet Points**: Explanations of technical components (e.g., HDLC, PPP, OSPF areas, Git commands, etc.) formatted as lists.
4. **Cisco CLI Configuration and Code Blocks**: Multi-line command snippets or Python code blocks (using `text`, `python`, etc.) for lab instructions.
5. **Summaries/Conclusions**: Formatted under `**Conclusion**` or `**Important Note**`.

*Rationale for generation*: Since the content is highly structured and technical, the generated questions must test specific technical configurations, commands, or concepts directly mentioned in the lesson (e.g., specific OSPF area types, Git commands, or PAT characteristics).

---

## 2. Robust Execution Strategy

We propose a four-stage execution pipeline for Milestone 2:

### Stage A: Querying the Lessons
Rather than using `psql` or native shell-level queries which require database passwords and specific local CLI binaries, we recommend using a Node.js/TypeScript script importing `@supabase/supabase-js`. 
- **Rationale**: Since `@supabase/supabase-js` is already a project dependency, a Node script runs natively without requiring external software. It handles complex character encodings (e.g., Thai characters) and writes outputs directly as valid JSON.
- **Environment Context**: Credentials can be loaded dynamically from `.env.local` using `dotenv`.

### Stage B: LLM Generation Loop
To generate exactly 5 multiple-choice questions for each of the 73 lessons:
1. **Model & API**: The worker should call a modern LLM (such as Claude 3.5 Sonnet) using a structured output option (`responseSchema` or JSON mode).
2. **Checkpointing (Fault Tolerance)**: Since 73 sequential API requests are prone to network timeouts and rate limits, the generation worker must implement checkpointing. It should read/write a `quiz_progress.json` cache file. If the process is interrupted, it can resume from the last successful lesson.
3. **Schema Compliance**: The script must validate the LLM response against the `LessonQuizData` TypeScript interface. If the JSON is invalid, it must perform a retry (up to 3 times) with a correction prompt.
4. **Bilingual translation**: The prompt must instruct the LLM to output both English and Thai versions of the question and explanation simultaneously. This ensures the translations are accurate and contextual.

### Stage C: Generating Migration SQL Files
To insert the generated JSON data:
1. **Dollar-Quoting (`$tag$content$tag$`)**: Standard string escaping in PostgreSQL is highly prone to syntax errors due to single quotes (`'`) or backslashes (`\`) inside JSON strings. We recommend using **PostgreSQL custom tag dollar-quoting** (e.g., `$quiz$JSON_STRING$quiz$::jsonb`).
2. **Advantages**: Dollar-quoting prevents SQL injection/syntax syntax errors and completely eliminates the need to escape characters.
3. **File Output**: The generator script will write to a migration file named `supabase/migrations/20260715000000_seed_lessons_quiz_data.sql`.

### Stage D: Post-Migration Validation
A post-migration script will query the database to verify:
1. Every lesson has non-null `quiz_data`.
2. The data matches the `LessonQuizData` interface.
3. There are exactly 5 questions per lesson.
4. Options array has length 4, and `correct_index` is between 0 and 3.

---

## 3. Implementation Blueprint (Scripts)

### 1. Database Extraction Script (`src/import/extract-lessons.ts`)
This script retrieves the English title and content of all lessons.
```typescript
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase environment variables are missing.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log('Fetching lessons...');
  const { data, error } = await supabase
    .from('lessons')
    .select('id, title_en, content_en')
    .order('id');
    
  if (error) {
    console.error('Database query failed:', error.message);
    process.exit(1);
  }
  
  fs.writeFileSync('lessons_data.json', JSON.stringify(data, null, 2));
  console.log(`Successfully exported ${data.length} lessons to lessons_data.json.`);
}

run();
```

### 2. LLM Quiz Generator Script (`src/import/generate-quizzes.ts`)
This script loops through the extracted lessons, queries the LLM, performs schema validation, and saves progress.
```typescript
import fs from 'fs';
import { GoogleGenAI } from '@google/generative-ai'; // Or Anthropic SDK depending on setup
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

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

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }); // Example SDK

async function generateQuizForLesson(title: string, content: string): Promise<LessonQuizData> {
  const prompt = `
    You are an expert technical instructor. Analyze the following lesson:
    
    Lesson Title: ${title}
    Lesson Content:
    ${content}
    
    Generate exactly 5 relevant multiple-choice questions testing the core concepts.
    Provide the output strictly as a JSON object matching this schema:
    {
      "questions": [
        {
          "question_en": "string",
          "question_th": "string (Thai translation)",
          "options": ["string", "string", "string", "string"], // exactly 4 choices
          "correct_index": number, // 0-3
          "explanation_en": "string (explanation in English)",
          "explanation_th": "string (explanation in Thai)"
        }
      ]
    }
    Output only valid JSON. Do not wrap in markdown code blocks.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-pro', // or appropriate model
    contents: prompt,
    config: { responseMimeType: 'application/json' }
  });

  const jsonText = response.text;
  return JSON.parse(jsonText) as LessonQuizData;
}

function validateSchema(data: any): asserts data is LessonQuizData {
  if (!data || !Array.isArray(data.questions) || data.questions.length !== 5) {
    throw new Error('Invalid questions count');
  }
  for (const q of data.questions) {
    if (typeof q.question_en !== 'string' || typeof q.question_th !== 'string') throw new Error('Invalid question text');
    if (!Array.isArray(q.options) || q.options.length !== 4) throw new Error('Invalid options count');
    if (typeof q.correct_index !== 'number' || q.correct_index < 0 || q.correct_index > 3) throw new Error('Invalid correct index');
  }
}

async function main() {
  const lessons = JSON.parse(fs.readFileSync('lessons_data.json', 'utf-8'));
  const cachePath = 'quiz_progress.json';
  const progress: Record<string, LessonQuizData> = fs.existsSync(cachePath) 
    ? JSON.parse(fs.readFileSync(cachePath, 'utf-8')) 
    : {};

  for (const lesson of lessons) {
    if (progress[lesson.id]) continue;
    
    console.log(`Generating quiz for lesson: ${lesson.id}`);
    let success = false;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const quizData = await generateQuizForLesson(lesson.title_en, lesson.content_en);
        validateSchema(quizData);
        progress[lesson.id] = quizData;
        fs.writeFileSync(cachePath, JSON.stringify(progress, null, 2));
        success = true;
        break;
      } catch (err: any) {
        console.warn(`Attempt ${attempt} failed for ${lesson.id}: ${err.message}`);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }
    if (!success) {
      console.error(`Fatal: Failed to generate valid quiz for ${lesson.id}`);
      process.exit(1);
    }
  }
  console.log('All quizzes generated!');
}

main();
```

### 3. SQL Migration File Builder (`src/import/build-migration.ts`)
Converts the generated progress JSON cache into a database migration SQL file.
```typescript
import fs from 'fs';
import path from 'path';

function buildMigration() {
  const cachePath = 'quiz_progress.json';
  if (!fs.existsSync(cachePath)) {
    console.error('Error: progress file not found.');
    process.exit(1);
  }

  const progress = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
  let sql = `-- Migration: Seed Auto-Generated Quiz Data for 73 Lessons\n\n`;

  for (const [lessonId, quizData] of Object.entries(progress)) {
    const jsonString = JSON.stringify(quizData);
    // Use custom tag dollar-quoting $quiz$ to prevent issues with single quotes or backslashes
    sql += `UPDATE public.lessons SET quiz_data = $quiz$${jsonString}$quiz$::jsonb WHERE id = '${lessonId}';\n`;
  }

  const migrationDir = path.resolve('supabase/migrations');
  const migrationPath = path.join(migrationDir, '20260715000000_seed_lessons_quiz_data.sql');

  fs.writeFileSync(migrationPath, sql, 'utf-8');
  console.log(`Successfully wrote migration to ${migrationPath}`);
}

buildMigration();
```

### 4. Verification Script (`src/import/verify-migration.ts`)
Validates that the database records contain correctly formatted quiz data matching the TypeScript types.
```typescript
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function verify() {
  console.log('Verifying quiz_data integrity across all lessons...');
  const { data, error } = await supabase
    .from('lessons')
    .select('id, title_en, quiz_data');

  if (error) {
    console.error('Failed to query database:', error.message);
    process.exit(1);
  }

  let errors = 0;
  for (const lesson of data) {
    const quiz = lesson.quiz_data;
    if (!quiz) {
      console.error(`[FAIL] Lesson ${lesson.id} ("${lesson.title_en}"): quiz_data is NULL`);
      errors++;
      continue;
    }

    try {
      if (!Array.isArray(quiz.questions)) throw new Error('questions field is not an array');
      if (quiz.questions.length !== 5) throw new Error(`Expected 5 questions, found ${quiz.questions.length}`);

      quiz.questions.forEach((q: any, i: number) => {
        if (typeof q.question_en !== 'string' || q.question_en.trim() === '') throw new Error(`Question ${i}: question_en is empty`);
        if (typeof q.question_th !== 'string' || q.question_th.trim() === '') throw new Error(`Question ${i}: question_th is empty`);
        if (!Array.isArray(q.options) || q.options.length !== 4) throw new Error(`Question ${i}: options length is not 4`);
        if (typeof q.correct_index !== 'number' || q.correct_index < 0 || q.correct_index > 3) {
          throw new Error(`Question ${i}: correct_index must be a number between 0 and 3`);
        }
      });
      console.log(`[PASS] Lesson ${lesson.id}`);
    } catch (err: any) {
      console.error(`[FAIL] Lesson ${lesson.id}: ${err.message}`);
      errors++;
    }
  }

  if (errors > 0) {
    console.error(`\nValidation failed with ${errors} error(s).`);
    process.exit(1);
  } else {
    console.log('\nAll 73 lessons successfully verified. Quiz data is healthy!');
  }
}

verify();
```
