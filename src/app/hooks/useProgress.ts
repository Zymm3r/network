import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Enrollment, UserProgress } from '../types';

interface UseEnrollmentsOptions {
  userId: string;
}

interface UseEnrollmentsResult {
  enrollments: Enrollment[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useEnrollments(options: UseEnrollmentsOptions): UseEnrollmentsResult {
  const { userId } = options;

  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchEnrollments = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', userId)
        .order('enrolled_at', { ascending: false });

      if (fetchError) throw fetchError;

      setEnrollments(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch enrollments'));
      setEnrollments([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchEnrollments();
  }, [fetchEnrollments]);

  return {
    enrollments,
    loading,
    error,
    refetch: fetchEnrollments,
  };
}

export function useProgress(userId: string, lessonId: string) {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!userId || !lessonId) return;

      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', userId)
          .eq('lesson_id', lessonId)
          .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
          throw fetchError;
        }

        setProgress(data || null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch progress'));
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [userId, lessonId]);

  const markComplete = useCallback(async () => {
    if (!userId || !lessonId) return;

    try {
      const { error: upsertError } = await supabase
        .from('user_progress')
        .upsert({
          user_id: userId,
          lesson_id: lessonId,
          completed: true,
          completed_at: new Date().toISOString(),
          last_accessed_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,lesson_id',
        });

      if (upsertError) throw upsertError;

      setProgress(prev => prev ? {
        ...prev,
        completed: true,
        completed_at: new Date().toISOString(),
      } : null);
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to mark complete');
    }
  }, [userId, lessonId]);

  const updateTimeSpent = useCallback(async (seconds: number) => {
    if (!userId || !lessonId) return;

    try {
      const { data: existing } = await supabase
        .from('user_progress')
        .select('time_spent_seconds')
        .eq('user_id', userId)
        .eq('lesson_id', lessonId)
        .single();

      const newTimeSpent = (existing?.time_spent_seconds || 0) + seconds;

      const { error: upsertError } = await supabase
        .from('user_progress')
        .upsert({
          user_id: userId,
          lesson_id: lessonId,
          time_spent_seconds: newTimeSpent,
          last_accessed_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,lesson_id',
        });

      if (upsertError) throw upsertError;
    } catch (err) {
      console.error('Failed to update time spent:', err);
    }
  }, [userId, lessonId]);

  return { progress, loading, error, markComplete, updateTimeSpent };
}

export function useCourseProgress(userId: string, courseId: string) {
  const [completedLessons, setCompletedLessons] = useState<number>(0);
  const [totalLessons, setTotalLessons] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCourseProgress = async () => {
      if (!userId || !courseId) return;

      try {
        setLoading(true);

        const [{ count: totalData }, { data: completedData }] = await Promise.all([
          supabase
            .from('lessons')
            .select('*', { count: 'exact', head: true })
            .eq('course_id', courseId),
          supabase
            .from('user_progress')
            .select('lesson_id')
            .eq('user_id', userId)
            .eq('completed', true)
        ]);

        const lessonIds = completedData?.map(p => p.lesson_id) || [];

        if (lessonIds.length > 0) {
          const { count: completedCount } = await supabase
            .from('lessons')
            .select('*', { count: 'exact', head: true })
            .eq('course_id', courseId)
            .in('id', lessonIds);

          setCompletedLessons(completedCount || 0);
        } else {
          setCompletedLessons(0);
        }

        setTotalLessons(totalData?.length || 0);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch course progress'));
      } finally {
        setLoading(false);
      }
    };

    fetchCourseProgress();
  }, [userId, courseId]);

  const progressPercentage = totalLessons > 0
    ? Math.round((completedLessons / totalLessons) * 100)
    : 0;

  return {
    completedLessons,
    totalLessons,
    progressPercentage,
    loading,
    error,
  };
}