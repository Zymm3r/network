import { supabase } from '../supabase';
import type { Resource, ResourceType } from '../../types';
import { handleSupabaseResponse, createApiError } from './base';

export const resourceApi = {
  async getAll(type?: ResourceType, limit = 50): Promise<Resource[]> {
    let query = supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (type) {
      query = query.eq('resource_type', type);
    }

    const response = await query;
    return handleSupabaseResponse(response, 'get resources');
  },

  async getById(id: string): Promise<Resource> {
    const response = await supabase
      .from('resources')
      .select('*')
      .eq('id', id)
      .single();

    return handleSupabaseResponse(response, 'get resource by id');
  },

  async create(resource: Partial<Resource>): Promise<Resource> {
    const response = await supabase
      .from('resources')
      .insert(resource)
      .select()
      .single();

    return handleSupabaseResponse(response, 'create resource');
  },

  async update(id: string, updates: Partial<Resource>): Promise<Resource> {
    const response = await supabase
      .from('resources')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    return handleSupabaseResponse(response, 'update resource');
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('resources')
      .delete()
      .eq('id', id);

    if (error) throw createApiError(error, 'Failed to delete resource');
  },
};