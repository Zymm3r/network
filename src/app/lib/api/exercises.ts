import { supabase } from '../supabase';
import type { ExerciseAttempt } from '../../types';
import { handleSupabaseResponse, createApiError } from './base';

/**
 * Map the grade-service outcome to the canonical status string expected by
 * the exercise_attempts M4 schema: 'passed' | 'failed' | 'error' | 'timeout'.
 */
function resolveStatus(
  passed: boolean,
  errorMessage?: string | null,
  executionTime?: number | null
): 'passed' | 'failed' | 'error' | 'timeout' {
  if (errorMessage && /timeout|timed out/i.test(errorMessage)) return 'timeout';
  if (errorMessage && !passed) return 'error';
  return passed ? 'passed' : 'failed';
}

export const exerciseApi = {
  /** Save an idempotent exercise attempt to Supabase. */
  async recordAttempt(attemptData: Omit<ExerciseAttempt, 'id' | 'created_at' | 'updated_at'>): Promise<ExerciseAttempt> {
    const status = attemptData.status ?? resolveStatus(
      attemptData.passed,
      attemptData.error_message,
      attemptData.execution_time,
    );

    const response = await supabase
      .from('exercise_attempts')
      .upsert({
          client_attempt_id: attemptData.client_attempt_id,
          user_id: attemptData.user_id,
          exercise_id: attemptData.exercise_id,
          lesson_id: attemptData.lesson_id,
          course_id: attemptData.course_id,
          submitted_code: attemptData.submitted_code,
          passed_tests: attemptData.passed_tests,
          total_tests: attemptData.total_tests,
          passed: attemptData.passed,
          score: attemptData.score,
          attempts_count: attemptData.attempts_count,
          stdout: attemptData.stdout,
          error_message: attemptData.error_message,
          execution_time: attemptData.execution_time,
          status,
          execution_timestamp: attemptData.execution_timestamp,
        }, { onConflict: 'client_attempt_id' })
      .select()
      .single();

    return handleSupabaseResponse(response, 'save exercise attempt');
  },

  /**
   * Aggregate stats used by the dashboard's "Completed Exercises" /
   * "First-pass Success" cards. Counts attempts grouped by user/exercise.
   */
  async getStatsForUser(userId: string) {
    const response = await supabase
      .from('exercise_attempts')
      .select('exercise_id, passed, score, attempts_count, status')
      .eq('user_id', userId);

    if (response.error) {
      throw createApiError(response.error, 'Failed to load exercise stats');
    }

    const rows = response.data || [];
    const passedUnique = new Set(
      rows.filter(r => r.passed).map(r => r.exercise_id)
    ).size;

    return {
      totalAttempts: rows.length,
      completedExercises: passedUnique,
      averageScore: rows.length === 0
        ? 0
        : Math.round(
            rows.reduce((sum, r) => sum + (r.score ?? 0), 0) / rows.length
          ),
    };
  },

  /**
   * Get all exercise attempts for a user on a specific exercise
   */
  async getExerciseAttempts(userId: string, exerciseId: string): Promise<ExerciseAttempt[]> {
    const response = await supabase
      .from('exercise_attempts')
      .select('*')
      .eq('user_id', userId)
      .eq('exercise_id', exerciseId)
      .order('created_at', { ascending: false });

    return handleSupabaseResponse(response, 'get exercise attempts');
  },

  /**
   * Load course-level quiz or Python history. The exercise id prefix keeps
   * these attempts separate from lesson-level coding exercises.
   */
  async getPracticeAttempts(
    userId: string,
    kind: 'quiz' | 'python'
  ): Promise<ExerciseAttempt[]> {
    let query = supabase
      .from('exercise_attempts')
      .select('*')
      .eq('user_id', userId)
      .like('exercise_id', `${kind}:%`);

    if (kind === 'quiz') {
      query = query.not('exercise_id', 'like', 'quiz:lesson:%');
    }

    const response = await query.order('created_at', { ascending: false });

    return handleSupabaseResponse(response, `load ${kind} practice history`);
  },

  async getLessonQuizAttempts(userId: string): Promise<ExerciseAttempt[]> {
    const response = await supabase
      .from('exercise_attempts')
      .select('*')
      .eq('user_id', userId)
      .like('exercise_id', 'quiz:lesson:%')
      .order('created_at', { ascending: false });

    return handleSupabaseResponse(response, 'load lesson quiz history');
  },

  /**
   * Get the latest exercise attempt for a user on a specific exercise
   */
  async getLatestExerciseAttempt(userId: string, exerciseId: string): Promise<ExerciseAttempt | null> {
    const response = await supabase
      .from('exercise_attempts')
      .select('*')
      .eq('user_id', userId)
      .eq('exercise_id', exerciseId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (response.error && response.error.code !== 'PGRST116') {
      return handleSupabaseResponse(response, 'get latest exercise attempt');
    }
    
    return response.data;
  }
};
