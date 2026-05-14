import { supabase } from '../supabase';
import type { Certificate } from '../../types';
import { handleSupabaseResponse, createApiError } from './base';

export const certificateApi = {
  async getAll(userId: string): Promise<Certificate[]> {
    const response = await supabase
      .from('certificates')
      .select('*')
      .eq('user_id', userId)
      .order('issued_at', { ascending: false });

    return handleSupabaseResponse(response, 'get certificates');
  },

  async getById(id: string): Promise<Certificate> {
    const response = await supabase
      .from('certificates')
      .select('*')
      .eq('id', id)
      .single();

    return handleSupabaseResponse(response, 'get certificate by id');
  },

  async getByCourse(userId: string, courseId: string): Promise<Certificate | null> {
    const response = await supabase
      .from('certificates')
      .select('*')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .single();

    if (response.error?.code === 'PGRST116') {
      return null;
    }

    return handleSupabaseResponse(response, 'get certificate by course');
  },

  async create(certificate: Partial<Certificate>): Promise<Certificate> {
    const response = await supabase
      .from('certificates')
      .insert(certificate)
      .select()
      .single();

    return handleSupabaseResponse(response, 'create certificate');
  },
};