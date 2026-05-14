import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Course, CourseLevel, AvailabilityStatus } from '../types';

interface UseCoursesOptions {
  level?: CourseLevel;
  availability?: AvailabilityStatus;
  limit?: number;
}

interface UseCoursesResult {
  courses: Course[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useCourses(options: UseCoursesOptions = {}): UseCoursesResult {
  const { level, availability, limit = 50 } = options;

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (level) {
        query = query.eq('level', level);
      }

      if (availability) {
        query = query.eq('availability', availability);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        if (import.meta.env.DEV) {
          console.debug('[useCourses] RLS or permission error, using fallback');
        }
        setCourses([]);
      } else {
        setCourses(data || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch courses'));
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, [level, availability, limit]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return {
    courses,
    loading,
    error,
    refetch: fetchCourses,
  };
}

export function useCourse(id: string) {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('courses')
          .select('*')
          .eq('id', id)
          .single();

        if (fetchError) throw fetchError;
        setCourse(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch course'));
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);

  return { course, loading, error };
}