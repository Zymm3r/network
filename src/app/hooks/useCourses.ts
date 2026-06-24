import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useI18n } from '../i18n';
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
  const { language } = useI18n();

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
        const mapped = (data || []).map((item: any) => ({
          ...item,
          name: item[`name_${language}` as 'name_th' | 'name_en'] || item.name_en || item.name || '',
          description: item[`description_${language}` as 'description_th' | 'description_en'] || item.description_en || item.description || null,
        }));
        setCourses(mapped);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch courses'));
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, [level, availability, limit, language]);

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
  const { language } = useI18n();
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
        if (data) {
          setCourse({
            ...data,
            name: data[`name_${language}` as 'name_th' | 'name_en'] || data.name_en || data.name || '',
            description: data[`description_${language}` as 'description_th' | 'description_en'] || data.description_en || data.description || null,
          });
        } else {
          setCourse(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch course'));
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id, language]);

  return { course, loading, error };
}