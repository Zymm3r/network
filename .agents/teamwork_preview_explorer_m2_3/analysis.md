# Milestone 2 Analysis: Quiz Data Generation & Migration

## Executive Summary
This report analyzes the requirements for generating and migrating bilingual multiple-choice quiz questions for the learning lessons in the networking platform. We have successfully reconstructed the lesson dataset by parsing the seed and migration SQL files. While the initial request estimated 73 lessons, our parsing confirms **69 unique lessons** are defined in the schema.

---

## 1. Verification of Type Definitions
We verified that the codebase definitions in `src/app/types/index.ts` (lines 169–180) match the expected quiz structures:

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

These interfaces match the user request exactly. The `quiz_data` property is registered on the `Lesson` interface as optional: `quiz_data?: LessonQuizData | null;`.

---

## 2. Analysis of `content_en` Structure
The English content for the lessons is stored as structured Markdown in the database. 
- **Headers**: Almost every lesson's `content_en` starts with a Level 2 markdown header: `## [Lesson Title]`.
- **Sections**: Typically includes a "**What you will learn in this video/reading**" section, a "**Core Content**" section with bullet points, code blocks for Cisco commands, and a "**Conclusion**" section.
- **Bilingual alignment**: Thai equivalents (`content_th`) are also structured in a similar markdown format, which helps in translating the generated quiz questions.

---

## 3. Lesson Database Query Results
We parsed the migration SQL files (`supabase/migrations/`) and the project seed file (`src/app/data/seed.sql`) to reconstruct the complete list of 69 lessons. The lesson details are saved in `lessons_extracted.json` in this folder.
Below is a representative sample of 5 lessons from different tracks:

| Lesson ID | Title (English) | Lesson Type | Core Concepts Covered |
|---|---|---|---|
| `lesson-ccna001-01` | Switching Basics | `video` | LAN, Ethernet, congestion management, Circuit vs. Packet Switching |
| `lesson-ccna002-02` | VLAN Configuration | `video` | VLAN segmentation, Cisco switch CLI commands, access ports |
| `lesson-ccna004-02` | PPP & HDLC | `video` | HDLC Cisco-default vs. open standard PPP, PAP/CHAP authentication |
| `lesson-sec002-02` | IPsec Deep Dive | `video` | AH vs. ESP, IKE Phase 1 and 2 negotiations |
| `lesson-dev002-04` | Ansible for Network Automation | `reading` | Playbooks (YAML), declarative configuration, modules |

---

## 4. Robust Strategy

### A. Querying All Lessons
Due to local Docker being unavailable on the host system, the direct `psql` connection is restricted. However, the system contains the Supabase MCP server configured with Project ID `netvfzmdewatfnmejcrz` and OAuth credentials.
- **Primary Strategy**: Write a Node/TypeScript script that reads from the local `.agents/teamwork_preview_explorer_m2_3/lessons_extracted.json` (or parses the SQL migrations) as a reliable local data source.
- **Database Strategy**: Use the Supabase MCP server's `execute_sql` tool to retrieve the lessons dynamically:
  ```sql
  SELECT id, title_en, content_en FROM public.lessons ORDER BY order_index;
  ```

### B. Quiz Generation Protocol (LLM In-Context)
Since the worker agent is an LLM, the best approach is for the worker agent to perform the generation **in-context during execution** rather than trying to make external API calls (which would violate code-only network restrictions).
- **LLM Prompt Structure**:
  1. Input: Lesson English Title and `content_en`.
  2. Task: Generate exactly 5 relevant multiple-choice questions.
  3. Constraints:
     - 4 options per question.
     - `correct_index` must be 0-3.
     - Bilingual translation: translate the question and explanations into natural Thai (`question_th`, `explanation_th`).
     - Structure output to match `LessonQuizData`.

### C. Migration File Generation & Postgres Escaping
To safely update the database, the worker agent must generate a single SQL migration file under `supabase/migrations/`:
- **File Name Format**: `YYYYMMDDHHMMSS_add_lesson_quizzes.sql`
- **Escaping Strategy**: Postgres dollar-quoting (`$$` or `$json$`) is the most robust way to escape JSON strings. It prevents errors caused by single quotes (`'`) or double quotes (`"`) inside JSON strings.
  ```sql
  UPDATE public.lessons SET quiz_data = $json${
    "questions": [
      {
        "question_en": "What is ...?",
        "question_th": "... คืออะไร?",
        "options": ["A", "B", "C", "D"],
        "correct_index": 1,
        "explanation_en": "Option B is correct because...",
        "explanation_th": "ตัวเลือก B ถูกต้องเนื่องจาก..."
      }
    ]
  }$json$ WHERE id = 'lesson-ccna001-01';
  ```

### D. Verification Strategy
1. **Schema Check**: Write a Node.js verification script that queries the database via MCP `execute_sql` to check that the JSON is valid:
   ```sql
   SELECT id, title_en, jsonb_typeof(quiz_data) as data_type FROM public.lessons WHERE quiz_data IS NOT NULL;
   ```
2. **Type Validation**: The script should validate that the `quiz_data` JSON parses successfully and has the correct shape matching `LessonQuizData` (e.g. array of exactly 5 questions with correct indices).
3. **Frontend Integration Check**: Open the application locally, click on a lesson quiz, and verify it renders without crashing and validates answers correctly.
