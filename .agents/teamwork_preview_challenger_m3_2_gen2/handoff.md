# Handoff & Challenge Report: Milestone 3 Verification

## 1. Observation
We reviewed the implementation details for Milestone 3 across the following files:
*   **Implementation File**: `src/app/components/QuizCard.tsx` (Lines 76–88: `useMemo` is used to map dynamic lesson quiz questions based on the active i18n language, falling back to course-level quizzes if custom questions are not present).
*   **Integration File**: `src/app/pages/LessonDetail.tsx` (Line 1031: Passing `lesson={lesson}` to `<QuizCard>`).
*   **Test File**: `src/app/components/QuizCard.spec.ts` (Unit tests mocking react hooks and verifying dynamic loading behavior).

We executed the following commands to verify the system behavior:
1.  **Production Build**:
    ```powershell
    npm run build
    ```
    Result: Succeeded without error. Generated production chunk `dist/assets/index-DxMuXRov.js` (1,145.86 kB).
2.  **Unit Tests**:
    ```powershell
    npx vitest run -c vitest.unit.config.ts
    ```
    Result: Succeeded with all 19 tests passing (including the 9 test cases in `QuizCard.spec.ts`).

---

## 2. Logic Chain
1.  In `QuizCard.tsx`, the component maps questions dynamically from the `lesson.quiz_data.questions` object if available. The mapping uses `language === 'th' ? q.question_th : q.question_en` for questions, and `language === 'th' ? q.explanation_th : q.explanation_en` for explanations.
2.  In our expanded unit tests in `QuizCard.spec.ts`, we verified that:
    *   Dynamic localization switches question text correctly when `mockLanguage` changes between `'th'` and `'en'`.
    *   If `lesson` is undefined, `lesson.quiz_data` is null, or `lesson.quiz_data.questions` is empty, it falls back to the default course-level questions returned by `getQuizForCourse(courseId)`.
    *   If `explanation` is not provided, it falls back to an empty string `""` without crashing.
    *   If `options`/`choices` is missing (`undefined`) at runtime, the component throws a `TypeError` when trying to render (`Cannot read properties of undefined (reading 'map')`).
    *   If `correct_index` is out of bounds, the component renders choices successfully but the user can never select the correct index, and no option will highlight as correct upon submission.
3.  Since all unit tests compile and run under pure Node using Vite's plugin-react and mock hooks, we verified the correctness of the dynamic quiz mapping and i18n logic.

---

## 3. Caveats
*   Browser-level Playwright integration tests (e.g., in `vitest.config.test.ts`) were not executed because the system environment lacks the Playwright Chromium executables. However, pure Node unit tests were successfully expanded to cover all edge cases.
*   We assumed the TypeScript compiler or database integration validates lesson quiz structures before loading, but we simulated malformed runtime inputs to verify degradation behavior.

---

## 4. Conclusion
The Milestone 3 implementation is **functional and correct** under valid input scenarios. Dynamic quiz loading and localization support are fully active. However, we identified two design-level vulnerabilities under malformed inputs (missing options causing a full page crash, and out-of-range correct indices rendering the quiz unsolvable).

---

## 5. Verification Method
To independently verify the results, execute the following commands in the workspace root:
1.  **Run Build**:
    ```powershell
    npm run build
    ```
    Verify it finishes with `✓ built in X.XXs` and no compilation/type errors.
2.  **Run Tests**:
    ```powershell
    npx vitest run -c vitest.unit.config.ts
    ```
    Verify that 4 test files are executed and all 19 unit tests pass.

---

## Challenge Report

### Challenge Summary
*   **Overall risk assessment**: **MEDIUM** (Low risk in production assuming DB schema enforces non-nullable options and valid index ranges, but Medium risk if malformed JSON is imported or synced at runtime).

### Challenges

#### [High] Challenge 1: Page Crash on Missing Options
*   **Assumption challenged**: `lesson.quiz_data.questions[].options` will always be defined.
*   **Attack scenario**: If a quiz question is synced or loaded where `options` is missing or undefined (due to incomplete DB sync, schema migrations, or legacy data), `question.choices` resolves to `undefined`. When the component tries to render `question.choices.map(...)`, it throws a runtime `TypeError`, crashing the entire page.
*   **Blast radius**: High. The whole `LessonDetail` page breaks and displays a blank screen/error boundary to the user.
*   **Mitigation**: Safely map choices in `QuizCard.tsx` with a fallback:
    ```typescript
    choices: q.options || [],
    ```

#### [Medium] Challenge 2: Unsolvable Quiz on Invalid `correct_index`
*   **Assumption challenged**: `correct_index` is always in range `[0, options.length - 1]`.
*   **Attack scenario**: If a quiz question has `correct_index` set out of bounds (e.g., 5 for a 2-choice question), the user can never choose it. Upon submitting any choice, the answer is evaluated as incorrect, and no choice highlights in green to show the correct answer, blocking progression.
*   **Blast radius**: Medium. The user cannot pass the quiz or complete the lesson.
*   **Mitigation**: Fallback or validate `correct_index` bounds inside `useMemo`:
    ```typescript
    correctIndex: (q.correct_index >= 0 && q.correct_index < q.options.length) ? q.correct_index : 0
    ```

### Stress Test Results
*   **Scenario: Missing `quiz_data` or empty `questions` array**
    *   *Expected*: Fallback to default course-level questions.
    *   *Actual*: Correctly falls back to `getQuizForCourse(courseId)`.
    *   *Status*: **PASS**
*   **Scenario: Language switching dynamically**
    *   *Expected*: Text updates to active language.
    *   *Actual*: Properly renders Thai when `'th'` and English when `'en'`.
    *   *Status*: **PASS**
*   **Scenario: Missing options / choices**
    *   *Expected*: Fallback gracefully.
    *   *Actual*: Throws `TypeError` and crashes page.
    *   *Status*: **FAIL** (as detailed in Challenge 1)
*   **Scenario: `correct_index` out of bounds**
    *   *Expected*: Render safely but flag error or fallback.
    *   *Actual*: Renders safely but impossible to answer correctly / show correct highlights.
    *   *Status*: **FAIL** (as detailed in Challenge 2)

### Unchallenged Areas
*   **Auth / Session integration**: We did not challenge session token refreshing or daily streak increments under high network latency because they are outside of Milestone 3's quiz data mapping scope.
