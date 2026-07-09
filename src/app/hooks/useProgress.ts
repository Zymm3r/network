import { useState, useEffect, useCallback, useMemo } from 'react';
import { progressApi } from '../lib/api/progress';
import { analyticsApi } from '../lib/api/analytics';
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
  const [progress, setProgress] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!userId || !courseId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log(`[Progress DB Log] Fetching course progress (enrollment) for user: ${userId}, course: ${courseId}`);
        const { data, error: fetchError } = await supabase
          .from('enrollments')
          .select('*')
          .eq('user_id', userId)
          .eq('course_id', courseId)
          .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
          throw fetchError;
        }

        console.log(`[Progress DB Log] Fetched course progress:`, data);
        setProgress(data || null);
      } catch (err) {
        console.error('[Progress DB Log] Failed to fetch course progress:', err);
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
      console.log(`[Progress DB Log] Marking course ${courseId} complete for user ${userId}`);
      const { error: upsertError } = await supabase
        .from('enrollments')
        .upsert({
          user_id: userId,
          course_id: courseId,
          status: 'completed',
          progress_percentage: 100,
          completed_at: new Date().toISOString(),
          last_accessed_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,course_id',
        });

      if (upsertError) throw upsertError;

      console.log(`[Progress DB Log] Successfully marked course ${courseId} complete`);
      
      // Award 100 XP for completing a course
      analyticsApi.recordLearningActivity(userId, 100, 0).catch(err => {
        console.error('[Progress DB Log] Failed to award XP for course completion:', err);
      });

      setProgress(prev => prev ? {
        ...prev,
        status: 'completed',
        progress_percentage: 100,
        completed_at: new Date().toISOString(),
      } : null);
    } catch (err) {
      console.error('[Progress DB Log] Failed to mark course complete:', err);
      throw err instanceof Error ? err : new Error('Failed to mark complete');
    }
  }, [userId, courseId]);

  const updateProgress = useCallback(async (percentage: number) => {
    if (!userId || !courseId) return;

    try {
      console.log(`[Progress DB Log] Updating course ${courseId} progress to ${percentage}% for user ${userId}`);
      const { error: upsertError } = await supabase
        .from('enrollments')
        .upsert({
          user_id: userId,
          course_id: courseId,
          status: percentage >= 100 ? 'completed' : 'active',
          progress_percentage: percentage,
          last_accessed_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,course_id',
        });

      if (upsertError) throw upsertError;
      console.log(`[Progress DB Log] Successfully updated course ${courseId} progress`);
    } catch (err) {
      console.error('[Progress DB Log] Failed to update course progress:', err);
    }
  }, [userId, courseId]);

  return { progress, loading, error, markComplete, updateProgress };
}

// Fixed: useCourseProgress now works with the correct schema (enrollments table)
export function useCourseProgress(userId: string, courseId: string) {
  const [progressPercentage, setProgressPercentage] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCourseProgress = async () => {
      if (!userId || !courseId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log(`[Progress DB Log] Fetching course progress percentage for user: ${userId}, course: ${courseId}`);
 
        // Get user's enrollment progress for this course
        const { data, error: fetchError } = await supabase
          .from('enrollments')
          .select('progress_percentage, status')
          .eq('user_id', userId)
          .eq('course_id', courseId)
          .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
          throw fetchError;
        }

        if (data) {
          console.log(`[Progress DB Log] Fetched course progress percentage: ${data.progress_percentage}%`);
          setProgressPercentage(data.progress_percentage || 0);
        } else {
          setProgressPercentage(0);
        }
      } catch (err) {
        console.error('[Progress DB Log] Failed to fetch course progress percentage:', err);
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

  // When userId or lessonId changes, reset progress state first so it triggers a loading skeleton on new content
  useEffect(() => {
    setProgress(null);
    setLoading(true);
  }, [userId, lessonId]);

  const fetchProgress = useCallback(async () => {
    if (!userId || !lessonId) {
      setLoading(false);
      return;
    }

    try {
      // Only set loading = true if we don't have progress loaded yet (silent refetch)
      setLoading(prevLoading => progress === null ? true : prevLoading);
      setError(null);
      console.log(`[Progress DB Log] Fetching lesson progress for user: ${userId}, lesson: ${lessonId}`);

      const { data, error: fetchError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('lesson_id', lessonId)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      console.log(`[Progress DB Log] Fetched lesson progress result:`, data);
      setProgress(data || null);
    } catch (err) {
      console.error('[Progress DB Log] Failed to fetch lesson progress:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch lesson progress'));
    } finally {
      setLoading(false);
    }
  }, [userId, lessonId, progress === null]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const markComplete = useCallback(async () => {
    if (!userId || !lessonId) return;

    try {
      console.log(`[Progress DB Log] Marking lesson ${lessonId} complete for user ${userId}`);
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

      console.log(`[Progress DB Log] Successfully marked lesson ${lessonId} complete`);
      
      // Award 20 XP for completing a lesson
      analyticsApi.recordLearningActivity(userId, 20, 0).catch(err => {
        console.error('[Progress DB Log] Failed to award XP for lesson completion:', err);
      });

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
      console.error('[Progress DB Log] Failed to mark lesson complete:', err);
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
        console.log(`[Progress DB Log] Fetching lessons progress list for user: ${userId}, count: ${lessonIds.length}`);

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
        console.log(`[Progress DB Log] Completed lessons counts: ${completedSet.size}`);
        setCompletedLessonIds(completedSet);
      } catch (err) {
        console.error('[Progress DB Log] Failed to fetch lessons progress:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch lessons progress'));
      } finally {
        setLoading(false);
      }
    };

    fetchLessonsProgress();
  }, [userId, lessonIdsStr]);

  return { completedLessonIds, loading, error };
}

export function useUserProgressSummary(userId: string | undefined) {
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSummary = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const data = await progressApi.getUserProgressSummary(userId);
      setSummary(data);
    } catch (err) {
      console.error('[Progress] Failed to fetch summary:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return { summary, loading, error, refetch: fetchSummary };
}