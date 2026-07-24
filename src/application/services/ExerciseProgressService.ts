import { supabase } from '../../app/lib/supabase';

export interface ExerciseProgressData {
  id?: string; user_id: string; exercise_id: string; lesson_id?: string | null; course_id?: string | null;
  started_at?: string | null; completed_at?: string | null; last_activity_at?: string;
  time_spent_seconds?: number; progress_percentage?: number;
  status?: 'not_started' | 'in_progress' | 'completed'; score?: number | null; attempts?: number;
  checkpoint_data?: Record<string, unknown>; answers?: Record<string, unknown>;
  created_at?: string; updated_at?: string;
}

export interface CompletedExerciseProgress {
  exercise_id: string;
  course_id?: string | null;
  score: number | null;
}

type QueueItem = { userId: string; exerciseId: string; payload: ExerciseProgressData };
const queueKey = (userId: string) => `exercise-progress-offline-${userId}`;
const safeParse = (value: string | null): QueueItem[] => { try { const parsed = JSON.parse(value || '[]'); return Array.isArray(parsed) ? parsed : []; } catch { return []; } };

export class ExerciseProgressService {
  private static instance: ExerciseProgressService;
  static getInstance() { return this.instance ||= new ExerciseProgressService(); }

  async loadProgress(userId: string, exerciseId: string): Promise<ExerciseProgressData | null> {
    const { data, error } = await supabase.from('exercise_progress').select('*').eq('user_id', userId).eq('exercise_id', exerciseId).maybeSingle();
    if (error) throw error;
    return data as ExerciseProgressData | null;
  }

  /**
   * Returns durable completion records for the requested exercises.  This is
   * intentionally backed by Supabase rather than UI/session state so a reload
   * and a new browser session show the same result.
   */
  async getCompletedExercises(userId: string, exerciseIds: string[]): Promise<CompletedExerciseProgress[]> {
    if (!userId || exerciseIds.length === 0) return [];

    const { data, error } = await supabase
      .from('exercise_progress')
      .select('exercise_id, score')
      .eq('user_id', userId)
      .eq('status', 'completed')
      .in('exercise_id', exerciseIds);

    if (error) throw error;
    return (data || []).map((row: { exercise_id: string; score: number | string | null }) => ({
      exercise_id: row.exercise_id,
      score: row.score === null ? null : Number(row.score),
    }));
  }

  async getCompletedExercisesForCourses(userId: string, courseIds: string[]): Promise<CompletedExerciseProgress[]> {
    if (!userId || courseIds.length === 0) return [];

    const { data, error } = await supabase
      .from('exercise_progress')
      .select('exercise_id, course_id, score')
      .eq('user_id', userId)
      .eq('status', 'completed')
      .in('course_id', courseIds);

    if (error) throw error;
    return (data || []).map((row: { exercise_id: string; course_id: string | null; score: number | string | null }) => ({
      exercise_id: row.exercise_id,
      course_id: row.course_id,
      score: row.score === null ? null : Number(row.score),
    }));
  }

  async saveProgress(data: ExerciseProgressData, queueOnFailure = true): Promise<ExerciseProgressData | null> {
    const activityAt = data.last_activity_at || new Date().toISOString();
    const { data: result, error } = await supabase.rpc('save_exercise_progress', {
      p_user_id: data.user_id, p_exercise_id: data.exercise_id, p_lesson_id: data.lesson_id || null,
      p_course_id: data.course_id || null, p_started_at: data.started_at || null,
      p_completed_at: data.completed_at || null, p_last_activity_at: activityAt,
      p_time_spent_seconds: data.time_spent_seconds || 0, p_progress_percentage: data.progress_percentage || 0,
      p_status: data.status || 'in_progress', p_score: data.score ?? null, p_attempts: data.attempts || 0,
      p_checkpoint_data: data.checkpoint_data || {}, p_answers: data.answers || {},
    });
    if (error) {
      if (queueOnFailure) this.queueOfflineOperation({ ...data, last_activity_at: activityAt });
      return null;
    }
    return result as ExerciseProgressData;
  }

  async markStarted(userId: string, exerciseId: string, metadata: Partial<ExerciseProgressData> = {}) {
    return this.saveProgress({ user_id: userId, exercise_id: exerciseId, status: 'in_progress', started_at: new Date().toISOString(), ...metadata });
  }
  async markCompleted(userId: string, exerciseId: string, metadata: Partial<ExerciseProgressData> = {}) {
    return this.saveProgress({ user_id: userId, exercise_id: exerciseId, status: 'completed', progress_percentage: 100, completed_at: new Date().toISOString(), ...metadata });
  }

  queueOfflineOperation(payload: ExerciseProgressData) {
    const key = queueKey(payload.user_id);
    const queue = safeParse(localStorage.getItem(key));
    const index = queue.findIndex(item => item.exerciseId === payload.exercise_id);
    const existing = index >= 0 ? queue[index].payload : undefined;
    const merged: ExerciseProgressData = {
      ...existing, ...payload,
      checkpoint_data: { ...(existing?.checkpoint_data || {}), ...(payload.checkpoint_data || {}) },
      answers: { ...(existing?.answers || {}), ...(payload.answers || {}) },
      time_spent_seconds: Math.max(existing?.time_spent_seconds || 0, payload.time_spent_seconds || 0),
      attempts: Math.max(existing?.attempts || 0, payload.attempts || 0),
      progress_percentage: Math.max(existing?.progress_percentage || 0, payload.progress_percentage || 0),
      status: existing?.status === 'completed' || payload.status === 'completed' ? 'completed' : payload.status,
      completed_at: existing?.completed_at || payload.completed_at,
      last_activity_at: payload.last_activity_at || existing?.last_activity_at || new Date().toISOString(),
    };
    const entry = { userId: payload.user_id, exerciseId: payload.exercise_id, payload: merged };
    if (index >= 0) queue[index] = entry; else queue.push(entry);
    localStorage.setItem(key, JSON.stringify(queue));
  }

  async syncOfflineQueue(userId: string): Promise<number> {
    const key = queueKey(userId);
    const queued = safeParse(localStorage.getItem(key));
    const remaining: QueueItem[] = [];
    let synced = 0;
    for (const item of queued) {
      const result = await this.saveProgress(item.payload, false);
      if (result) synced++; else remaining.push(item);
    }
    // Preserve entries added while syncing.
    const live = safeParse(localStorage.getItem(key)).filter(item => {
      const original = queued.find(previous => previous.exerciseId === item.exerciseId);
      return !original || new Date(item.payload.last_activity_at || 0).getTime() > new Date(original.payload.last_activity_at || 0).getTime();
    });
    const finalQueue = [...remaining, ...live];
    if (finalQueue.length) localStorage.setItem(key, JSON.stringify(finalQueue)); else localStorage.removeItem(key);
    return synced;
  }
}
export const exerciseProgressService = ExerciseProgressService.getInstance();
