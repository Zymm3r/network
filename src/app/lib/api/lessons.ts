import { supabase } from '../supabase';
import type { Lesson } from '../../types';
import { handleSupabaseResponse, createApiError } from './base';

export const lessonApi = {
  async getAll(courseId?: string, limit = 100): Promise<Lesson[]> {
    let query = supabase
      .from('lessons')
      .select('*')
      .order('order_index', { ascending: true })
      .limit(limit);

    if (courseId) {
      query = query.eq('course_id', courseId);
    }

    const response = await query;
    return handleSupabaseResponse(response, 'get lessons');
  },

  async getById(id: string): Promise<Lesson> {
    const response = await supabase
      .from('lessons')
      .select('*')
      .eq('id', id)
      .single();

    return handleSupabaseResponse(response, 'get lesson by id');
  },

  async getByCourseId(courseId: string): Promise<Lesson[]> {
    const response = await supabase
      .from('lessons')
      .select('*')
      .eq('course_id', courseId)
      .order('order_index', { ascending: true });

    return handleSupabaseResponse(response, 'get lessons by course');
  },

  async create(lesson: Partial<Lesson>): Promise<Lesson> {
    const response = await supabase
      .from('lessons')
      .insert(lesson)
      .select()
      .single();

    return handleSupabaseResponse(response, 'create lesson');
  },

  async update(id: string, updates: Partial<Lesson>): Promise<Lesson> {
    const response = await supabase
      .from('lessons')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    return handleSupabaseResponse(response, 'update lesson');
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('lessons')
      .delete()
      .eq('id', id);

    if (error) throw createApiError(error, 'Failed to delete lesson');
  },
};