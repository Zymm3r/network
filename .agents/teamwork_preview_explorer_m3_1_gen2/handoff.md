# Handoff Report — Milestone 3 Detailed Implementation Strategy

## 1. Observation
We examined the relevant source files and observed the following:

- **`src/app/types/index.ts`**:
  - The `Lesson` interface includes an optional/nullable `quiz_data` field (line 44):
    ```typescript
    quiz_data?: LessonQuizData | null;
    ```
  - `LessonQuizData` and `LessonQuizQuestion` are defined at lines 169-180:
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

- **`src/app/components/QuizCard.tsx`**:
  - Currently receives `courseName`, `courseId`, `onComplete`, and `onNextLesson` (lines 41-47):
    ```typescript
    interface QuizCardProps {
      courseName?: string;
      courseId?: string;
      onComplete?: (score: number, totalQuestions: number) => void;
      onNextLesson?: () => void;
    }
    ```
  - Questions are loaded via `getQuizForCourse(courseId)` and direct indexing (lines 72-74):
    ```typescript
    const questions = getQuizForCourse(courseId);
    const question = questions[currentQ];
    const totalQuestions = questions.length;
    ```

- **`src/app/pages/LessonDetail.tsx`**:
  - Fetches the current `lesson` object (line 438):
    ```typescript
    const { lesson, loading } = useLesson(lessonId || '');
    ```
  - Guarantees `lesson` is non-null when rendering components due to early returns for `loading` (line 857) and `!lesson` (line 867).
  - Instantiates `QuizCard` inside the `TabsContent` for the quiz tab (lines 1030-1038):
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

---

## 2. Logic Chain
Based on these observations:
1. **Importing Localization and types**: To perform localization checks inside `QuizCard.tsx`, we need to import `useI18n` from `../i18n` (relative to `src/app/components/QuizCard.tsx`) and `Lesson` from `../types` (since `Lesson` structure is defined there).
2. **Prop update**: Updating `QuizCardProps` to support `lesson?: Lesson` is required so that `LessonDetail.tsx` can feed the lesson object down to `QuizCard`.
3. **Conditional question loading**: In `QuizCard.tsx`, the `questions` array should be resolved dynamically using `useMemo` based on `lesson`, `courseId`, and `language`.
   - If `lesson?.quiz_data?.questions` exists and is non-empty, we map each `LessonQuizQuestion` to the standard `QuizQuestion` layout:
     - `id`: `index + 1`
     - `question`: `language === 'th' ? q.question_th : q.question_en`
     - `choices`: `q.options`
     - `correctIndex`: `q.correct_index`
     - `explanation`: `(language === 'th' ? q.explanation_th : q.explanation_en) || ''`
     - `hint`: `undefined`
   - Otherwise, fall back to `getQuizForCourse(courseId)`.
4. **Defensive calculation**: `progressPct` should check `totalQuestions > 0` before performing division to prevent any division-by-zero runtime exceptions.
5. **Passing props**: Finally, `LessonDetail.tsx` needs to supply `lesson={lesson}` to `<QuizCard />`.

---

## 3. Caveats
- If `lesson?.quiz_data` exists but contains an empty `questions` array, the code safely falls back to course-wide defaults loaded via `getQuizForCourse`.
- Thai and English are assumed to be the sole supported languages. Ternary checks fallback to English on any unsupported languages.

---

## 4. Conclusion
The proposed changes are safe, type-compliant, and fully cover the requirements of Milestone 3. Applying the generated patch `milestone3.patch` will cleanly implement these updates.

---

## 5. Verification Method
- **TypeScript & Build**: Execute `npm run build` after applying the patch to confirm all types resolve and compilation passes.
- **Runtime translation**: Verify that quizzes with database-provided `quiz_data` load their custom questions in both English and Thai depending on the current locale toggle state.
