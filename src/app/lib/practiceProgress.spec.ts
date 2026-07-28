import { describe, expect, it } from 'vitest';
import type { ExerciseAttempt } from '../types';
import { buildPracticeScoreMap } from './practiceProgress';

function attempt(overrides: Partial<ExerciseAttempt>): ExerciseAttempt {
  return {
    id: 'attempt-1',
    user_id: 'user-1',
    exercise_id: 'quiz:ccna-001',
    lesson_id: null,
    course_id: 'ccna-001',
    submitted_code: null,
    passed_tests: 0,
    total_tests: 5,
    passed: false,
    score: 0,
    attempts_count: 1,
    stdout: null,
    error_message: null,
    execution_time: null,
    status: 'failed',
    execution_timestamp: '2026-07-28T00:00:00.000Z',
    created_at: '2026-07-28T00:00:00.000Z',
    updated_at: '2026-07-28T00:00:00.000Z',
    ...overrides,
  };
}

describe('buildPracticeScoreMap', () => {
  it('restores the best quiz result and does not regress a completed course', () => {
    const scores = buildPracticeScoreMap([
      attempt({ passed: false, passed_tests: 2, score: 40 }),
      attempt({ passed: true, passed_tests: 4, score: 80, status: 'passed' }),
      attempt({ passed: false, passed_tests: 3, score: 60 }),
    ], 'quiz');

    expect(scores['ccna-001']).toEqual({ score: 4, total: 5, passed: true });
  });

  it('restores completed Python exercises independently per course', () => {
    const scores = buildPracticeScoreMap([
      attempt({ exercise_id: 'python:ccna-001', passed: true, score: 100, status: 'passed' }),
      attempt({ exercise_id: 'python:ccna-002', course_id: 'ccna-002' }),
    ], 'python');

    expect(scores['ccna-001']).toEqual({ score: 1, total: 1, passed: true });
    expect(scores['ccna-002']).toEqual({ score: 0, total: 1, passed: false });
  });
});
