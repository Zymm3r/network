import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Certificate } from '../types';

interface UseCertificatesOptions {
  userId: string;
}

interface UseCertificatesResult {
  certificates: Certificate[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useCertificates(options: UseCertificatesOptions): UseCertificatesResult {
  const { userId } = options;

  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCertificates = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('certificates')
        .select('*')
        .eq('user_id', userId)
        .order('issued_at', { ascending: false });

      if (fetchError) throw fetchError;

      setCertificates(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch certificates'));
      setCertificates([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchCertificates();
  }, [fetchCertificates]);

  return { certificates, loading, error, refetch: fetchCertificates };
}

export function useUserCertificate(userId: string, courseId: string) {
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      if (!userId || !courseId) return;

      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('certificates')
          .select('*')
          .eq('user_id', userId)
          .eq('course_id', courseId)
          .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
          throw fetchError;
        }

        setCertificate(data || null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch certificate'));
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [userId, courseId]);

  return { certificate, loading, error };
}