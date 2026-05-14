import { supabase } from '../supabase';
import type { Course, CourseLevel, AvailabilityStatus } from '../../types';
import { handleSupabaseResponse, createApiError } from './base';

export interface CourseFilters {
  level?: CourseLevel;
  availability?: AvailabilityStatus;
  search?: string;
}

export const courseApi = {
  async getAll(filters?: CourseFilters, limit = 50): Promise<Course[]> {
    let query = supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (filters?.level) {
      query = query.eq('level', filters.level);
    }

    if (filters?.availability) {
      query = query.eq('availability', filters.availability);
    }

    const response = await query;
    return handleSupabaseResponse(response, 'get courses');
  },

  async getById(id: string): Promise<Course> {
    const response = await supabase
      .from('courses')
      .select('*')
      .eq('id', id)
      .single();

    return handleSupabaseResponse(response, 'get course by id');
  },

  async getByIds(ids: string[]): Promise<Course[]> {
    if (ids.length === 0) return [];

    const response = await supabase
      .from('courses')
      .select('*')
      .in('id', ids);

    return handleSupabaseResponse(response, 'get courses by ids');
  },

  async create(course: Partial<Course>): Promise<Course> {
    const response = await supabase
      .from('courses')
      .insert(course)
      .select()
      .single();

    return handleSupabaseResponse(response, 'create course');
  },

  async update(id: string, updates: Partial<Course>): Promise<Course> {
    const response = await supabase
      .from('courses')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    return handleSupabaseResponse(response, 'update course');
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id);

    if (error) throw createApiError(error, 'Failed to delete course');
  },
};