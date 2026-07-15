# Verification Plan - Quiz DB Migration

This plan outlines the steps to empirically verify the correctness of the applied quiz database migration on the remote database.

## Steps

### Step 1: Write Verification Script
- Create `verify_quizzes.js` in the working directory.
- Use `@supabase/supabase-js` to connect to the remote database.
- Fetch all lessons that have `quiz_data` populated.
- Validate that the count is exactly 73.
- Check each quiz JSON structure against the `LessonQuizData` interface:
  - Verify that `questions` exists and is an array.
  - Verify that each question contains:
    - `question_en`: string
    - `question_th`: string
    - `options`: array of strings
    - `correct_index`: number
    - Optional `explanation_en` and `explanation_th` (if present, must be string or null).
- Perform detailed semantic validation:
  - Check for escaping issues (like double backslashes, bad unicode escapes, raw HTML entities, etc.).
  - Check for character truncation (e.g. cut-off strings at the end, incomplete JSON syntax).
  - Verify options list: no empty options (`""`), no duplicate options, option list is valid (length >= 2).
  - Verify `correct_index`: must be an integer, `0 <= correct_index < options.length`.
- Output a detailed report of any failing lessons or anomalies.

### Step 2: Run Verification Script
- Execute the script using Node: `node .agents/teamwork_preview_challenger_quiz_m2_1/verify_quizzes.js`.
- Log the number of lessons found, total questions parsed, and any validation errors.

### Step 3: Run Typecheck and Tests
- Verify that the React/TypeScript codebase compiles successfully: `npm run build` or `npx tsc --noEmit`.
- Run any existing vitest unit tests: `npx vitest run`.

### Step 4: Write Findings and Stress Test Report
- Document the results in `challenge.md` (e.g., overall risk assessment, assumptions challenged, attack scenarios, stress test results).
- Document in `handoff.md` (Observation, Logic Chain, Caveats, Conclusion, Verification Method).
