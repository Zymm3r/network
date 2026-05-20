import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { UserProgress, Enrollment } from '../types';

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

      if (fetchError) {
        throw fetchError;
      }

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

export function useProgress(userId: string, courseId: string) {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!userId || !courseId) return;

      try {
        setLoading(true);
        // Use course_id instead of lesson_id to match schema
        const { data, error: fetchError } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', userId)
          .eq('course_id', courseId)
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
  }, [userId, courseId]);

  const markComplete = useCallback(async () => {
    if (!userId || !courseId) return;

    try {
      const { error: upsertError } = await supabase
        .from('user_progress')
        .upsert({
          user_id: userId,
          course_id: courseId,
          status: 'completed',
          progress_percentage: 100,
          completed_at: new Date().toISOString(),
          last_accessed_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,course_id,path_id,exercise_id',
        });

      if (upsertError) throw upsertError;

      setProgress(prev => prev ? {
        ...prev,
        status: 'completed',
        progress_percentage: 100,
        completed_at: new Date().toISOString(),
      } : null);
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to mark complete');
    }
  }, [userId, courseId]);

  const updateProgress = useCallback(async (percentage: number) => {
    if (!userId || !courseId) return;

    try {
      const { error: upsertError } = await supabase
        .from('user_progress')
        .upsert({
          user_id: userId,
          course_id: courseId,
          status: percentage >= 100 ? 'completed' : 'in_progress',
          progress_percentage: percentage,
          last_accessed_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,course_id,path_id,exercise_id',
        });

      if (upsertError) throw upsertError;
    } catch (err) {
      console.error('Failed to update progress:', err);
    }
  }, [userId, courseId]);

  return { progress, loading, error, markComplete, updateProgress };
}

// Fixed: useCourseProgress now works with the correct schema
export function useCourseProgress(userId: string, courseId: string) {
  const [progressPercentage, setProgressPercentage] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCourseProgress = async () => {
      if (!userId || !courseId) return;

      try {
        setLoading(true);

        // Get user's progress for this course
        const { data, error: fetchError } = await supabase
          .from('user_progress')
          .select('progress_percentage, status')
          .eq('user_id', userId)
          .eq('course_id', courseId)
          .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
          throw fetchError;
        }

        if (data) {
          setProgressPercentage(data.progress_percentage || 0);
        } else {
          setProgressPercentage(0);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch course progress'));
        setProgressPercentage(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseProgress();
  }, [userId, courseId]);

  return {
    progressPercentage,
    loading,
    error,
  };
}

export function useLessonProgress(userId: string, lessonId: string) {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProgress = useCallback(async () => {
    if (!userId || !lessonId) return;

    try {
      setLoading(true);
      setError(null);

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
      setError(err instanceof Error ? err : new Error('Failed to fetch lesson progress'));
    } finally {
      setLoading(false);
    }
  }, [userId, lessonId]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const markComplete = useCallback(async () => {
    if (!userId || !lessonId) return;

    try {
      const { error: upsertError } = await supabase
        .from('user_progress')
        .upsert({
          user_id: userId,
          lesson_id: lessonId,
          status: 'completed',
          progress_percentage: 100,
          completed_at: new Date().toISOString(),
          last_accessed_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,lesson_id',
        });

      if (upsertError) throw upsertError;

      setProgress(prev => prev ? {
        ...prev,
        status: 'completed',
        progress_percentage: 100,
        completed_at: new Date().toISOString(),
      } : {
        id: '',
        user_id: userId,
        course_id: null,
        path_id: null,
        exercise_id: null,
        lesson_id: lessonId,
        status: 'completed',
        progress_percentage: 100,
        completed_at: new Date().toISOString(),
        last_accessed_at: new Date().toISOString(),
        notes: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as UserProgress);
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to mark complete');
    }
  }, [userId, lessonId]);

  return { progress, loading, error, markComplete, refetch: fetchProgress };
}

export function useLessonsProgress(userId: string, lessonIds: string[]) {
  const [completedLessonIds, setCompletedLessonIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Memoize lessonIds stringified to avoid infinite loops in useEffect
  const lessonIdsStr = JSON.stringify(lessonIds);

  useEffect(() => {
    const fetchLessonsProgress = async () => {
      if (!userId || !lessonIds || lessonIds.length === 0) {
        setCompletedLessonIds(new Set());
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('user_progress')
          .select('lesson_id')
          .eq('user_id', userId)
          .eq('status', 'completed')
          .in('lesson_id', lessonIds);

        if (fetchError) {
          throw fetchError;
        }

        const completedSet = new Set((data || []).map((row: any) => row.lesson_id));
        setCompletedLessonIds(completedSet);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch lessons progress'));
      } finally {
        setLoading(false);
      }
    };

    fetchLessonsProgress();
  }, [userId, lessonIdsStr]);

  return { completedLessonIds, loading, error };
}