import type { ExerciseAttempt } from '../types';

export type PracticeScore = {
  score: number;
  total: number;
  passed: boolean;
};

export type PracticeScoreMap = Record<string, PracticeScore>;

export function buildPracticeScoreMap(
  attempts: ExerciseAttempt[],
  kind: 'quiz' | 'python'
): PracticeScoreMap {
  return attempts.reduce<PracticeScoreMap>((scores, attempt) => {
    if (kind === 'quiz' && attempt.exercise_id.startsWith('quiz:lesson:')) {
      return scores;
    }

    const courseId = attempt.course_id;
    if (!courseId) return scores;

    const total = kind === 'quiz' ? (attempt.total_tests || 5) : 1;
    const score = kind === 'quiz'
      ? (attempt.passed_tests ?? Math.round(((attempt.score || 0) / 100) * total))
      : (attempt.passed ? 1 : 0);
    const candidate = { score, total, passed: attempt.passed };
    const current = scores[courseId];

    if (!current || (!current.passed && candidate.passed) || candidate.score > current.score) {
      scores[courseId] = candidate;
    }
    return scores;
  }, {});
}

export function buildLessonQuizScoreMap(
  attempts: ExerciseAttempt[]
): PracticeScoreMap {
  return attempts.reduce<PracticeScoreMap>((scores, attempt) => {
    if (!attempt.lesson_id || !attempt.exercise_id.startsWith('quiz:lesson:')) {
      return scores;
    }

    const total = attempt.total_tests || 5;
    const score = attempt.passed_tests
      ?? Math.round(((attempt.score || 0) / 100) * total);
    const candidate = { score, total, passed: attempt.passed };
    const current = scores[attempt.lesson_id];

    if (!current || (!current.passed && candidate.passed) || candidate.score > current.score) {
      scores[attempt.lesson_id] = candidate;
    }
    return scores;
  }, {});
}
