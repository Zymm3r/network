import { supabase } from '../supabase';
import type { Enrollment, UserProgress } from '../../types';
import { handleSupabaseResponse, createApiError } from './base';

export const progressApi = {
  // Enrollments
  async getEnrollments(userId: string): Promise<Enrollment[]> {
    const response = await supabase
      .from('enrollments')
      .select('*')
      .eq('user_id', userId)
      .order('enrolled_at', { ascending: false });

    return handleSupabaseResponse(response, 'get enrollments');
  },

  async enroll(userId: string, courseId: string): Promise<Enrollment> {
    const response = await supabase
      .from('enrollments')
      .insert({
        user_id: userId,
        course_id: courseId,
        status: 'active',
      })
      .select()
      .single();

    return handleSupabaseResponse(response, 'enroll in course');
  },

  async updateEnrollmentStatus(id: string, status: Enrollment['status']): Promise<Enrollment> {
    const updates: Partial<Enrollment> = { status };
    if (status === 'completed') {
      updates.completed_at = new Date().toISOString();
    }

    const response = await supabase
      .from('enrollments')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    return handleSupabaseResponse(response, 'update enrollment status');
  },

  async unenroll(id: string): Promise<void> {
    const { error } = await supabase
      .from('enrollments')
      .delete()
      .eq('id', id);

    if (error) throw createApiError(error, 'Failed to unenroll');
  },

  // User Progress
  async getProgress(userId: string, lessonId: string): Promise<UserProgress | null> {
    const response = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('lesson_id', lessonId)
      .single();

    if (response.error?.code === 'PGRST116') {
      return null;
    }

    return handleSupabaseResponse(response, 'get user progress');
  },

  async getCourseProgress(userId: string, lessonIds: string[]): Promise<UserProgress[]> {
    if (lessonIds.length === 0) return [];

    const response = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('completed', true)
      .in('lesson_id', lessonIds);

    return handleSupabaseResponse(response, 'get course progress');
  },

  async updateProgress(
    userId: string,
    lessonId: string,
    updates: Partial<UserProgress>
  ): Promise<UserProgress> {
    const data = {
      user_id: userId,
      lesson_id: lessonId,
      ...updates,
      last_accessed_at: new Date().toISOString(),
    };

    const response = await supabase
      .from('user_progress')
      .upsert(data, {
        onConflict: 'user_id,lesson_id',
      })
      .select()
      .single();

    return handleSupabaseResponse(response, 'update progress');
  },

  async markComplete(userId: string, lessonId: string): Promise<UserProgress> {
    return this.updateProgress(userId, lessonId, {
      completed: true,
      completed_at: new Date().toISOString(),
    });
  },
};