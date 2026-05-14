import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { LearningPath } from '../types';

interface UsePathsResult {
  paths: LearningPath[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function usePaths(): UsePathsResult {
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

      setPaths(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch learning paths'));
      setPaths([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPaths();
  }, [fetchPaths]);

  return { paths, loading, error, refetch: fetchPaths };
}

export function usePath(id: string) {
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
        setPath(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch learning path'));
      } finally {
        setLoading(false);
      }
    };

    fetchPath();
  }, [id]);

  return { path, loading, error };
}