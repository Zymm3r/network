import { supabase } from '../supabase';
import type { LearningPath } from '../../types';
import { handleSupabaseResponse, createApiError } from './base';

export const pathApi = {
  async getAll(): Promise<LearningPath[]> {
    const response = await supabase
      .from('learning_paths')
      .select('*')
      .order('created_at', { ascending: false });

    return handleSupabaseResponse(response, 'get learning paths');
  },

  async getById(id: string): Promise<LearningPath> {
    const response = await supabase
      .from('learning_paths')
      .select('*')
      .eq('id', id)
      .single();

    return handleSupabaseResponse(response, 'get learning path by id');
  },

  async create(path: Partial<LearningPath>): Promise<LearningPath> {
    const response = await supabase
      .from('learning_paths')
      .insert(path)
      .select()
      .single();

    return handleSupabaseResponse(response, 'create learning path');
  },

  async update(id: string, updates: Partial<LearningPath>): Promise<LearningPath> {
    const response = await supabase
      .from('learning_paths')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    return handleSupabaseResponse(response, 'update learning path');
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('learning_paths')
      .delete()
      .eq('id', id);

    if (error) throw createApiError(error, 'Failed to delete learning path');
  },
};