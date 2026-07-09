import { supabase } from '../supabase';
import { createApiError } from './base';

export interface StudentMetrics {
  enrolled_courses: number;
  completed_lessons: number;
  completed_exercises: number;
  avg_score: number;
  study_time: number;
  completion_rate: number;
  xp: number;
  level: number;
  streak_days: number;
}

export interface AdminMetrics {
  active_users: number;
  course_completions: number;
  exercise_success_rate: number;
  avg_attempts: number;
  first_pass_success_rate: number;
}

export interface HardestExercise {
  exercise_id: string;
  exercise_name: string;
  total_attempts: number;
  success_rate: number;
}

export const analyticsApi = {
  async getStudentMetrics(userId: string): Promise<StudentMetrics | null> {
    try {
      const { data, error } = await supabase.rpc('get_student_metrics', { target_user_id: userId });
      
      if (error) {
        if (error.code === 'PGRST202' || error.message.includes('function get_student_metrics does not exist')) {
          console.warn('[Analytics API] RPC get_student_metrics not found. Migration may not be applied.');
          return null; // Return null so the UI can handle graceful fallback or show "Pending Data"
        }
        throw createApiError(error, 'Failed to fetch student metrics');
      }
      
      return data as StudentMetrics;
    } catch (err) {
      console.error('[Analytics API] Error:', err);
      return null;
    }
  },

  async getAdminMetrics(): Promise<AdminMetrics | null> {
    try {
      const { data, error } = await supabase.rpc('get_admin_metrics');
      
      if (error) {
        if (error.code === 'PGRST202' || error.message.includes('function get_admin_metrics does not exist')) {
          console.warn('[Analytics API] RPC get_admin_metrics not found. Migration may not be applied.');
          return null;
        }
        throw createApiError(error, 'Failed to fetch admin metrics');
      }
      
      return data as AdminMetrics;
    } catch (err) {
      console.error('[Analytics API] Error:', err);
      return null;
    }
  },

  async getHardestExercises(limit = 5): Promise<HardestExercise[]> {
    try {
      const { data, error } = await supabase.rpc('get_hardest_exercises', { limit_count: limit });
      
      if (error) {
        if (error.code === 'PGRST202' || error.message.includes('function get_hardest_exercises does not exist')) {
          console.warn('[Analytics API] RPC get_hardest_exercises not found. Migration may not be applied.');
          return [];
        }
        throw createApiError(error, 'Failed to fetch hardest exercises');
      }
      
      return data as HardestExercise[];
    } catch (err) {
      console.error('[Analytics API] Error:', err);
      return [];
    }
  },

  async recordLearningActivity(userId: string, xpGained: number, studySeconds: number): Promise<void> {
    try {
      const { error } = await supabase.rpc('record_learning_activity', {
        p_user_id: userId,
        p_xp_gained: xpGained,
        p_study_seconds: studySeconds
      });
      if (error) throw error;
    } catch (err) {
      console.error('[Analytics API] Error recording learning activity:', err);
    }
  }
};
