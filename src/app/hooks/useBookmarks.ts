import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { UserBookmark } from '../types';

interface UseBookmarksOptions {
  userId: string;
}

interface UseBookmarksResult {
  bookmarks: UserBookmark[];
  loading: boolean;
  error: Error | null;
  addBookmark: (courseId?: string, lessonId?: string) => Promise<void>;
  removeBookmark: (bookmarkId: string) => Promise<void>;
  isBookmarked: (courseId?: string, lessonId?: string) => boolean;
  refetch: () => Promise<void>;
}

export function useBookmarks(options: UseBookmarksOptions): UseBookmarksResult {
  const { userId } = options;

  const [bookmarks, setBookmarks] = useState<UserBookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchBookmarks = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('user_bookmarks')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setBookmarks(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch bookmarks'));
      setBookmarks([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const addBookmark = useCallback(async (courseId?: string, lessonId?: string) => {
    if (!userId) return;

    try {
      const { error: insertError } = await supabase
        .from('user_bookmarks')
        .insert({
          user_id: userId,
          course_id: courseId || null,
          lesson_id: lessonId || null,
        });

      if (insertError) throw insertError;
      await fetchBookmarks();
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to add bookmark');
    }
  }, [userId, fetchBookmarks]);

  const removeBookmark = useCallback(async (bookmarkId: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('user_bookmarks')
        .delete()
        .eq('id', bookmarkId);

      if (deleteError) throw deleteError;
      setBookmarks(prev => prev.filter(b => b.id !== bookmarkId));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to remove bookmark');
    }
  }, []);

  const isBookmarked = useCallback((courseId?: string, lessonId?: string) => {
    return bookmarks.some(b =>
      (courseId && b.course_id === courseId) ||
      (lessonId && b.lesson_id === lessonId)
    );
  }, [bookmarks]);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  return {
    bookmarks,
    loading,
    error,
    addBookmark,
    removeBookmark,
    isBookmarked,
    refetch: fetchBookmarks,
  };
}