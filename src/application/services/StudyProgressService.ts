import { supabase } from '../../app/lib/supabase';
import { analyticsApi } from '../../app/lib/api/analytics';
import type { UserProgress } from '../../app/types';

export type CourseChapterCompletion = Record<string, { total: number; completed: number; complete: boolean }>;

/**
 * SINGLE shared service for all lesson types.
 * Every lesson type must call this same service:
 *   Video, Reading, Quiz, Exercise, Pyodide, Markdown, Interactive
 */
class StudyProgressService {
  private static instance: StudyProgressService;

  static getInstance(): StudyProgressService {
    if (!StudyProgressService.instance) {
      StudyProgressService.instance = new StudyProgressService();
    }
    return StudyProgressService.instance;
  }

  /**
   * Get progress for a specific user + lesson
   */
  async getLessonProgress(userId: string, lessonId: string): Promise<UserProgress | null> {
    if (!userId || !lessonId) return null;

    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('lesson_id', lessonId)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      console.error('[StudyProgressService] Error fetching lesson progress:', error);
    }
    return data as UserProgress | null;
  }

  /**
   * Get all completed lesson IDs for a user in a set of lessons
   */
  async getCompletedLessonIds(userId: string, lessonIds: string[]): Promise<Set<string>> {
    if (!userId || lessonIds.length === 0) return new Set();

    const { data, error } = await supabase
      .from('user_progress')
      .select('lesson_id')
      .eq('user_id', userId)
      .eq('status', 'completed')
      .in('lesson_id', lessonIds);

    if (error) {
      console.error('[StudyProgressService] Error fetching completed lessons:', error);
      return new Set();
    }

    return new Set((data || []).map((row: { lesson_id: string }) => row.lesson_id));
  }

  /**
   * Resolves the chapter gate for multiple courses in two bounded queries.
   * A course with no published chapters remains locked: completion cannot be
   * proven until its curriculum has been configured.
   */
  async getCourseChapterCompletion(userId: string, courseIds: string[]): Promise<CourseChapterCompletion> {
    const result: CourseChapterCompletion = Object.fromEntries(
      courseIds.map(courseId => [courseId, { total: 0, completed: 0, complete: false }])
    );
    if (!userId || courseIds.length === 0) return result;

    const { data: lessons, error: lessonsError } = await supabase
      .from('lessons')
      .select('id, course_id')
      .in('course_id', courseIds);
    if (lessonsError) throw lessonsError;

    const lessonRows = (lessons || []) as Array<{ id: string; course_id: string }>;
    const lessonIds = lessonRows.map(lesson => lesson.id);
    if (lessonIds.length === 0) return result;

    const completedLessonIds = await this.getCompletedLessonIds(userId, lessonIds);
    for (const lesson of lessonRows) {
      const entry = result[lesson.course_id];
      if (!entry) continue;
      entry.total += 1;
      if (completedLessonIds.has(lesson.id)) entry.completed += 1;
    }
    for (const entry of Object.values(result)) {
      entry.complete = entry.total > 0 && entry.completed === entry.total;
    }
    return result;
  }

  /**
   * Mark a lesson as completed.
   * This is the SINGLE source of truth for lesson completion.
   * Called by: Video, Reading, Quiz, Exercise, Pyodide, Markdown, Interactive
   */
  async markLessonComplete(
    userId: string,
    lessonId: string,
    courseId?: string | null,
    score?: number | null,
    xpAmount: number = 20
  ): Promise<{ progress: UserProgress | null; error: string | null }> {
    if (!userId || !lessonId) {
      return { progress: null, error: 'Missing userId or lessonId' };
    }

    const now = new Date().toISOString();

    try {
      // Use upsert to handle both insert and update
      const { data, error } = await supabase
        .from('user_progress')
        .upsert(
          {
            user_id: userId,
            lesson_id: lessonId,
            course_id: courseId || null,
            status: 'completed',
            progress_percentage: 100,
            completed_at: now,
            last_accessed_at: now,
          },
          {
            onConflict: 'user_id,lesson_id',
            ignoreDuplicates: false,
          }
        )
        .select()
        .single();

      if (error) {
        console.error('[StudyProgressService] Failed to mark lesson complete:', error);
        return { progress: null, error: error.message };
      }

      // Award XP (non-blocking)
      analyticsApi.recordLearningActivity(userId, xpAmount, 0).catch(err => {
        console.error('[StudyProgressService] Failed to award XP:', err);
      });

      // Update enrollment progress (non-blocking)
      if (courseId) {
        this.updateCourseProgress(userId, courseId).catch(err => {
          console.error('[StudyProgressService] Failed to update course progress:', err);
        });
      }

      console.log(`[StudyProgressService] Lesson ${lessonId} completed for user ${userId}`);
      return { progress: data as UserProgress, error: null };
    } catch (err: any) {
      console.error('[StudyProgressService] Error in markLessonComplete:', err);
      return { progress: null, error: err.message || 'Unknown error' };
    }
  }

  /**
   * Update lesson progress (for partial progress like Python checkpoints)
   */
  async updateLessonProgress(
    userId: string,
    lessonId: string,
    courseId: string | null,
    status: 'not_started' | 'in_progress' | 'completed',
    progressPercentage: number,
    notes?: string | null
  ): Promise<{ progress: UserProgress | null; error: string | null }> {
    if (!userId || !lessonId) {
      return { progress: null, error: 'Missing userId or lessonId' };
    }

    const now = new Date().toISOString();
    const isComplete = status === 'completed' || progressPercentage >= 100;

    try {
      const { data, error } = await supabase
        .from('user_progress')
        .upsert(
          {
            user_id: userId,
            lesson_id: lessonId,
            course_id: courseId || null,
            status: isComplete ? 'completed' : status,
            progress_percentage: isComplete ? 100 : Math.min(100, Math.max(0, progressPercentage)),
            completed_at: isComplete ? now : null,
            last_accessed_at: now,
            notes: notes || null,
          },
          {
            onConflict: 'user_id,lesson_id',
            ignoreDuplicates: false,
          }
        )
        .select()
        .single();

      if (error) {
        console.error('[StudyProgressService] Failed to update lesson progress:', error);
        return { progress: null, error: error.message };
      }

      if (isComplete && courseId) {
        this.updateCourseProgress(userId, courseId).catch(err => {
          console.error('[StudyProgressService] Failed to update course progress:', err);
        });
      }

      return { progress: data as UserProgress, error: null };
    } catch (err: any) {
      console.error('[StudyProgressService] Error in updateLessonProgress:', err);
      return { progress: null, error: err.message || 'Unknown error' };
    }
  }

  /**
   * Recalculate course progress based on completed lessons
   */
  private async updateCourseProgress(userId: string, courseId: string): Promise<void> {
    // Get total lessons in course
    const { data: lessons, error: lessonsError } = await supabase
      .from('lessons')
      .select('id')
      .eq('course_id', courseId);

    if (lessonsError || !lessons || lessons.length === 0) return;

    const totalLessons = lessons.length;
    const lessonIds = lessons.map((l: { id: string }) => l.id);

    // Count completed lessons
    const { data: completed, error: progressError } = await supabase
      .from('user_progress')
      .select('lesson_id')
       .eq('user_id', userId)
      .eq('status', 'completed')
      .in('lesson_id', lessonIds);

    if (progressError) return;

    const completedCount = (completed || []).length;
    const progressPercentage = Math.round((completedCount / totalLessons) * 100);
    const isComplete = completedCount >= totalLessons;

    // Update enrollment
    await supabase
      .from('enrollments')
      .upsert(
        {
          user_id: userId,
          course_id: courseId,
          status: isComplete ? 'completed' : 'active',
          progress_percentage: progressPercentage,
          completed_at: isComplete ? new Date().toISOString() : null,
        },
        {
          onConflict: 'user_id,course_id',
          ignoreDuplicates: false,
        }
      );
  }

  /**
   * Get course completion percentage
   */
  async getCourseCompletionPercentage(userId: string, courseId: string): Promise<number> {
    if (!userId || !courseId) return 0;

    const { data: lessons, error: lessonsError } = await supabase
      .from('lessons')
      .select('id')
      .eq('course_id', courseId);

    if (lessonsError || !lessons || lessons.length === 0) return 0;

    const totalLessons = lessons.length;
    const lessonIds = lessons.map((l: { id: string }) => l.id);

    const { data: progress, error: progressError } = await supabase
      .from('user_progress')
      .select('lesson_id')
      .eq('user_id', userId)
      .eq('status', 'completed')
      .in('lesson_id', lessonIds);

    if (progressError || !progress) return 0;

    return Math.round((progress.length / totalLessons) * 100);
  }
}

export const studyProgressService = StudyProgressService.getInstance();
