# Scope: M3: UI Integration & Verification

## Architecture
- **Frontend Components**:
  - `src/app/types/index.ts`: Typings for `Lesson` and its `quiz_data`.
  - `src/app/components/QuizCard.tsx`: Uses `lesson.quiz_data` as the source of truth if available, maps its keys to local QuizQuestion schema using the current active language (from `useI18n`), and falls back to course-level quizzes if empty.
  - `src/app/pages/LessonDetail.tsx`: Passes the loaded `lesson` object to `QuizCard`.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M3: UI Integration & Verification | Update types, QuizCard, and LessonDetail components to support per-lesson quizzes and verify compilation and functionality. | none | DONE |

## Interface Contracts
### `QuizCardProps`
- Accepts optional `lesson: Lesson` in props.
- If `lesson?.quiz_data?.questions` exists and is non-empty, use it for rendering quiz questions. Otherwise, fall back to `getQuizForCourse(courseId)`.
