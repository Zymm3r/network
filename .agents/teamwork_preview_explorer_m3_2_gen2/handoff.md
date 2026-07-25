# Handoff Report: Milestone 3 - Dynamic Quiz Data & i18n Integration in QuizCard

## Summary
- **Files modified**: `src/app/components/QuizCard.tsx`, `src/app/pages/LessonDetail.tsx` (proposed via patch)
- **Reason**: Enable `QuizCard` to dynamically load, translate, and map lesson-specific quiz questions if available, falling back to course-level quizzes otherwise, and pass the current lesson from `LessonDetail`.
- **Risks identified**: None. The `lesson` prop is optional, ensuring full backward compatibility with other places where `QuizCard` is rendered without a lesson (`CourseDetail.tsx`, `Lessons.tsx`).
- **Validation performed**: Analysis of file structures, type definitions, and creation of a complete `.patch` file.
- **Remaining work**: Apply the patch and run build/type verification on the implemented code.

---

## 1. Observation
The following file structures and sections were observed in the codebase:
- **`src/app/types/index.ts`** (Lines 31-47): The `Lesson` interface defines `quiz_data?: LessonQuizData | null;`.
- **`src/app/types/index.ts`** (Lines 169-180):
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
- **`src/app/components/QuizCard.tsx`** (Lines 41-46): `QuizCardProps` is defined as:
  ```typescript
  interface QuizCardProps {
    courseName?: string;
    courseId?: string;
    onComplete?: (score: number, totalQuestions: number) => void;
    onNextLesson?: () => void;
  }
  ```
- **`src/app/components/QuizCard.tsx`** (Line 72): Questions are statically fetched:
  ```typescript
  const questions = getQuizForCourse(courseId);
  ```
- **`src/app/pages/LessonDetail.tsx`** (Lines 1031-1037): `<QuizCard>` is instantiated in the `quiz` tab but only accepts `courseId`, `onComplete`, and `onNextLesson`:
  ```typescript
  <QuizCard 
    courseId={lesson.course_id || undefined} 
    onComplete={(score, total) => {
      if (score / total >= 0.8) setIsQuizPassed(true);
    }} 
    onNextLesson={handleNextLesson}
  />
  ```

---

## 2. Logic Chain
1. To support lesson-specific quiz questions stored in the database (`lesson.quiz_data.questions`), the `QuizCard` component must receive the `lesson` object as a prop. Thus, we update `QuizCardProps` to include an optional `lesson?: Lesson`.
2. Custom quiz questions contain localized texts for both Thai and English. To dynamically select the correct string representation, `QuizCard` needs access to the active UI language. This is done by importing and invoking `useI18n()` to get `const { language } = useI18n();`.
3. To optimize render performance and prevent re-mapping on every single render, a `useMemo` block maps `lesson.quiz_data.questions` into the standard `QuizQuestion[]` format expected by `QuizCard`:
   - `id`: `index + 1`
   - `question`: `language === 'th' ? q.question_th : q.question_en`
   - `choices`: `q.options`
   - `correctIndex`: `q.correct_index`
   - `explanation`: `(language === 'th' ? q.explanation_th : q.explanation_en) || ''`
   - `hint`: `undefined`
4. If `lesson?.quiz_data` or `lesson?.quiz_data?.questions` is empty/null, the component falls back to the default `getQuizForCourse(courseId)` behavior.
5. In `LessonDetail.tsx`, we pass the `lesson` object (which is already loaded and guaranteed to be non-null when reaching the tabs) into the `<QuizCard>` component.
6. Since the `lesson` prop is optional, other instances of `<QuizCard>` in `CourseDetail.tsx` and `Lessons.tsx` remain fully compatible and unaffected.

---

## 3. Caveats
- It is assumed that the `options` array inside `LessonQuizQuestion` contains a valid list of choices and that `correct_index` is a valid index within that array.
- Database schema validation of `quiz_data` (JSONB) is assumed to match the `LessonQuizData` interface.

---

## 4. Conclusion
Integrating lesson-specific quiz data mapping into `QuizCard.tsx` with fallback compatibility and localization support via `useI18n` satisfies all Milestone 3 objectives. The patch file `milestone3_quiz_dynamic_loading.patch` provides a clean, machine-applicable way to achieve this.

---

## 5. Verification Method
1. **Apply Patch**:
   Apply the provided patch to the codebase:
   ```bash
   git apply milestone3_quiz_dynamic_loading.patch
   ```
2. **Type Check**:
   Verify there are no TypeScript compile-time errors:
   ```bash
   npx tsc --noEmit
   ```
3. **Build Project**:
   Verify that the production build succeeds without issues:
   ```bash
   npm run build
   ```
4. **Behavioral Test**:
   - Navigate to a lesson details page that has custom `quiz_data` configured.
   - Switch language between English and Thai, verifying that the questions, options, and explanations change accordingly.
   - Answer the quiz and verify that feedback is shown correctly.
   - Go to a course page or a lesson without custom quiz data to verify it correctly falls back to course-level questions.
