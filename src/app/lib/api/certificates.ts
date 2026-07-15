import { supabase } from '../supabase';
import type { Certificate } from '../../types';
import { handleSupabaseResponse, createApiError } from './base';
import { progressApi } from './progress';

// Helper to generate a unique certificate number
function generateCertificateNumber(userId: string, prefix: 'C' | 'P'): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const userSegment = userId.split('-')[0].toUpperCase();
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${userSegment}-${randomSuffix}`;
}

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

  async getByPath(userId: string, pathId: string): Promise<Certificate | null> {
    const response = await supabase
      .from('certificates')
      .select('*')
      .eq('user_id', userId)
      .eq('learning_path_id', pathId)
      .single();

    if (response.error?.code === 'PGRST116') {
      return null;
    }

    return handleSupabaseResponse(response, 'get certificate by path');
  },

  async verify(certificateNumber: string): Promise<any | null> {
    const response = await supabase
      .from('certificates')
      .select('*, courses(name_en, name_th), learning_paths(name_en, name_th)')
      .eq('certificate_number', certificateNumber)
      .single();

    if (response.error?.code === 'PGRST116') {
      return null;
    }

    return handleSupabaseResponse(response, 'verify certificate');
  },

  async checkAndIssueCourseCertificate(userId: string, courseId: string): Promise<Certificate | null> {
    // Fast-path: if the SQL trigger (auto_issue_course_certificate) has
    // already written a certificate, we just return it.
    const existing = await this.getByCourse(userId, courseId);
    if (existing) return existing;

    // 2. Otherwise, force a recomputation of the enrollment percentage. The
    //    trigger in 20260609000000_fix_rls_and_m4_analytics.sql will
    //    auto-issue the certificate if the user is at 100% completion.
    try {
      const { error } = await supabase.rpc('course_completion_percentage', {
        p_user_id: userId,
        p_course_id: courseId,
      });
      // The RPC only returns the percentage; we still need to nudge the
      // enrollment row so the trigger fires. We do that with a no-op upsert
      // that only updates last_accessed_at.
      const now = new Date().toISOString();
      await supabase
        .from('enrollments')
        .upsert({
          user_id: userId,
          course_id: courseId,
          last_accessed_at: now,
        }, { onConflict: 'user_id,course_id' });

      // Re-check: trigger may have just inserted the certificate.
      const afterTrigger = await this.getByCourse(userId, courseId);
      if (afterTrigger) return afterTrigger;

      // Final fallback (in case the trigger isn't deployed): compute in JS.
      const percentage = await progressApi.getCourseCompletionPercentage(userId, courseId);
      if (percentage < 100) return null;
      const certNumber = generateCertificateNumber(userId, 'C');
      return await this.create({
        user_id: userId,
        course_id: courseId,
        certificate_number: certNumber,
      });
    } catch (err) {
      console.error('[Certificate] Failed to check and issue course certificate', err);
      return null;
    }
  },

  /**
   * Backfill: scan all enrollments that are 100% complete and do not yet
   * have a certificate, then create one. Intended to be run once after
   * the SQL auto-issuance trigger is deployed.
   */
  async backfillMissingCertificates(userId: string): Promise<number> {
    const { data: completedEnrollments, error } = await supabase
      .from('enrollments')
      .select('course_id, status, progress_percentage')
      .eq('user_id', userId)
      .eq('status', 'completed')
      .gte('progress_percentage', 100);

    if (error || !completedEnrollments) return 0;

    let issued = 0;
    for (const enr of completedEnrollments) {
      if (!enr.course_id) continue;
      const existing = await this.getByCourse(userId, enr.course_id);
      if (existing) continue;
      await this.create({
        user_id: userId,
        course_id: enr.course_id,
        certificate_number: generateCertificateNumber(userId, 'C'),
      });
      issued++;
    }
    return issued;
  },

  async checkAndIssuePathCertificate(userId: string, pathId: string): Promise<Certificate | null> {
    // 1. Check if they already have one
    const existing = await this.getByPath(userId, pathId);
    if (existing) return existing;

    // 2. We assume the caller or another service determines path completion
    // For now, if this is called, we assume they are eligible.
    // Real implementation would check if all courses in path are completed.
    
    // 3. Issue certificate
    const certNumber = generateCertificateNumber(userId, 'P');
    return await this.create({
      user_id: userId,
      learning_path_id: pathId,
      certificate_number: certNumber,
    });
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