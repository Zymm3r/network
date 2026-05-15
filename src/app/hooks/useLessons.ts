import { useState, useEffect } from 'react';
import type { Lesson } from '../types';

// TEMPORARY MOCK: 'lessons' table does not exist in current schema.
// This implementation returns static mock data only.
// TODO: Remove this mock and connect to real Supabase table when schema is ready.

interface UseLessonsOptions {
  courseId?: string;
  limit?: number;
}

interface UseLessonsResult {
  lessons: Lesson[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

// Static mock lessons data
const mockLessons: Lesson[] = [
  {
    id: 'lesson-1',
    course_id: 'course-1',
    title_th: 'บทนำ: พื้นฐานเครือข่าย',
    title_en: 'Introduction to Networking',
    content_th: 'เรียนรู้พื้นฐานการทำงานของเครือข่ายคอมพิวเตอร์',
    content_en: 'Learn the basics of computer networking',
    lesson_type: 'video',
    duration_minutes: 15,
    order_index: 1,
    video_url: null,
    thumbnail_url: null,
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'lesson-2',
    course_id: 'course-1',
    title_th: 'โปรโตคอลและการสื่อสาร',
    title_en: 'Protocols and Communication',
    content_th: 'เข้าใจวิธีการสื่อสารระหว่างอุปกรณ์ในเครือข่าย',
    content_en: 'Understand how devices communicate in a network',
    lesson_type: 'reading',
    duration_minutes: 20,
    order_index: 2,
    video_url: null,
    thumbnail_url: null,
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'lesson-3',
    course_id: 'course-1',
    title_th: 'แบบทดสอบ: พื้นฐานเครือข่าย',
    title_en: 'Quiz: Network Fundamentals',
    content_th: 'ทดสอบความเข้าใจเรื่องพื้นฐานเครือข่าย',
    content_en: 'Test your understanding of network fundamentals',
    lesson_type: 'quiz',
    duration_minutes: 10,
    order_index: 3,
    video_url: null,
    thumbnail_url: null,
    difficulty: 'easy',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export function useLessons(options: UseLessonsOptions = {}): UseLessonsResult {
  const { courseId, limit = 100 } = options;

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate async loading - in production this would fetch from Supabase
    const timer = setTimeout(() => {
      let filtered = mockLessons;
      if (courseId) {
        filtered = mockLessons.filter(l => l.course_id === courseId);
      }
      setLessons(filtered.slice(0, limit));
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [courseId, limit]);

  return {
    lessons,
    loading,
    error,
    refetch: () => {
      setLoading(true);
      setTimeout(() => {
        setLessons(mockLessons.slice(0, limit));
        setLoading(false);
      }, 100);
    },
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

    const timer = setTimeout(() => {
      const found = mockLessons.find(l => l.id === id);
      setLesson(found || null);
      setLoading(false);
    }, 50);

    return () => clearTimeout(timer);
  }, [id]);

  return { lesson, loading, error };
}