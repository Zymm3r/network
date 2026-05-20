import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Lesson } from '../types';

interface UseLessonsOptions {
  courseId?: string;
  limit?: number;
}

interface UseLessonsResult {
  lessons: Lesson[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useLessons(options: UseLessonsOptions = {}): UseLessonsResult {
  const { courseId, limit = 100 } = options;

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchLessons = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('lessons')
        .select('*')
        .order('order_index', { ascending: true });

      if (courseId) {
        query = query.eq('course_id', courseId);
      }

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        throw fetchError;
      }

      setLessons(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch lessons'));
      setLessons([]);
    } finally {
      setLoading(false);
    }
  }, [courseId, limit]);

  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  return {
    lessons,
    loading,
    error,
    refetch: fetchLessons,
  };
}

export function useLesson(id: string) {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchLesson = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('lessons')
          .select('*')
          .eq('id', id)
          .single();

        if (fetchError) {
          throw fetchError;
        }

        setLesson(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch lesson'));
        setLesson(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  return { lesson, loading, error };
}