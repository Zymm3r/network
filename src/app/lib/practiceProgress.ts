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
