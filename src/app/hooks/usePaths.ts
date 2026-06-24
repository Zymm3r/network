import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useI18n } from '../i18n';
import type { LearningPath } from '../types';

interface UsePathsResult {
  paths: LearningPath[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function usePaths(): UsePathsResult {
  const { language } = useI18n();
  const [paths, setPaths] = useState<LearningPath[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPaths = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('learning_paths')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      const mapped = (data || []).map((item: any) => ({
        ...item,
        name: item[`name_${language}` as 'name_th' | 'name_en'] || item.name_en || item.name || '',
        description: item[`description_${language}` as 'description_th' | 'description_en'] || item.description_en || item.description || null,
      }));
      setPaths(mapped);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch learning paths'));
      setPaths([]);
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    fetchPaths();
  }, [fetchPaths]);

  return { paths, loading, error, refetch: fetchPaths };
}

export function usePath(id: string) {
  const { language } = useI18n();
  const [path, setPath] = useState<LearningPath | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPath = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('learning_paths')
          .select('*')
          .eq('id', id)
          .single();

        if (fetchError) throw fetchError;
        if (data) {
          setPath({
            ...data,
            name: data[`name_${language}` as 'name_th' | 'name_en'] || data.name_en || data.name || '',
            description: data[`description_${language}` as 'description_th' | 'description_en'] || data.description_en || data.description || null,
          });
        } else {
          setPath(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch learning path'));
      } finally {
        setLoading(false);
      }
    };

    fetchPath();
  }, [id, language]);

  return { path, loading, error };
}