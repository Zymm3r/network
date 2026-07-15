import { supabase } from '../../app/lib/supabase';
import type { UserProgress } from '../../app/types';

// Auto-generated UUID for offline queue tracking
function generateId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export interface ExerciseProgressData {
  id?: string;
  user_id: string;
  exercise_id: string;
  lesson_id?: string | null;
  course_id?: string | null;
  started_at?: string | null;
  completed_at?: string | null;
  last_activity_at?: string;
  time_spent_seconds?: number;
  progress_percentage?: number;
  status?: 'not_started' | 'in_progress' | 'completed';
  score?: number | null;
  attempts?: number;
  checkpoint_data?: Record<string, any>;
  answers?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface OfflineQueueItem {
  id: string;
  userId: string;
  type: 'upsert' | 'checkpoint' | 'answer' | 'complete';
  payload: Partial<ExerciseProgressData>;
  timestamp: number;
  retries: number;
}

const STORAGE_KEY_PREFIX = 'exercise-progress-offline-';

export class ExerciseProgressService {
  private static instance: ExerciseProgressService;
  private isSyncing = false;
  private syncAbortController: AbortController | null = null;

  static getInstance(): ExerciseProgressService {
    if (!ExerciseProgressService.instance) {
      ExerciseProgressService.instance = new ExerciseProgressService();
    }
    return ExerciseProgressService.instance;
  }

  /**
   * Load progress for a specific exercise
   */
  async loadProgress(userId: string, exerciseId: string): Promise<ExerciseProgressData | null> {
    try {
      const { data, error } = await supabase
        .from('exercise_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('exercise_id', exerciseId)
        .maybeSingle();

      if (error) {
        console.error('[ExerciseProgressService] Failed to load progress:', error);
        return null;
      }

      return data as ExerciseProgressData | null;
    } catch (err) {
      console.error('[ExerciseProgressService] Error loading progress:', err);
      return null;
    }
  }

  /**
   * Upsert progress - single source of truth for all writes
   */
  async saveProgress(data: ExerciseProgressData): Promise<ExerciseProgressData | null> {
    const now = new Date().toISOString();
    const payload = {
      ...data,
      last_activity_at: now,
      updated_at: now,
      started_at: data.started_at || now,
      created_at: data.created_at || now,
    };

    try {
      const { data: result, error } = await supabase
        .from('exercise_progress')
        .upsert(payload, {
          onConflict: 'user_id,exercise_id',
        })
        .select()
        .single();

      if (error) {
        console.error('[ExerciseProgressService] Failed to save progress:', error);
        // Queue for offline retry
        await this.queueOfflineOperation('upsert', payload);
        return null;
      }

      return result as ExerciseProgressData;
    } catch (err) {
      console.error('[ExerciseProgressService] Error saving progress:', err);
      await this.queueOfflineOperation('upsert', payload);
      return null;
    }
  }

  /**
   * Mark exercise as started
   */
  async markStarted(userId: string, exerciseId: string, metadata?: Partial<ExerciseProgressData>): Promise<ExerciseProgressData | null> {
    const existing = await this.loadProgress(userId, exerciseId);

    if (existing && existing.status !== 'not_started') {
      // Already started, just update activity timestamp
      return this.saveProgress({
        ...existing,
        ...metadata,
        last_activity_at: new Date().toISOString(),
      });
    }

    return this.saveProgress({
      user_id: userId,
      exercise_id: exerciseId,
      lesson_id: metadata?.lesson_id,
      course_id: metadata?.course_id,
      status: 'in_progress',
      started_at: new Date().toISOString(),
      last_activity_at: new Date().toISOString(),
      progress_percentage: 0,
      time_spent_seconds: 0,
      attempts: 0,
      checkpoint_data: {},
      answers: {},
      ...metadata,
    });
  }

  /**
   * Update answer
   */
  async updateAnswer(
    userId: string,
    exerciseId: string,
    answerKey: string,
    answerValue: any
  ): Promise<ExerciseProgressData | null> {
    const existing = await this.loadProgress(userId, exerciseId);

    if (!existing) {
      console.warn('[ExerciseProgressService] Cannot update answer - progress not started');
      return null;
    }

    const updatedAnswers = {
      ...existing.answers,
      [answerKey]: answerValue,
    };

    return this.saveProgress({
      ...existing,
      answers: updatedAnswers,
    });
  }

  /**
   * Update checkpoint data
   */
  async updateCheckpoint(
    userId: string,
    exerciseId: string,
    checkpointId: string,
    checkpointData: any
  ): Promise<ExerciseProgressData | null> {
    const existing = await this.loadProgress(userId, exerciseId);

    if (!existing) {
      console.warn('[ExerciseProgressService] Cannot update checkpoint - progress not started');
      return null;
    }

    const updatedCheckpoints = {
      ...existing.checkpoint_data,
      [checkpointId]: checkpointData,
    };

    return this.saveProgress({
      ...existing,
      checkpoint_data: updatedCheckpoints,
    });
  }

  /**
   * Update timer
   */
  async updateTimer(userId: string, exerciseId: string, timeSpentSeconds: number): Promise<ExerciseProgressData | null> {
    const existing = await this.loadProgress(userId, exerciseId);

    if (!existing) {
      console.warn('[ExerciseProgressService] Cannot update timer - progress not started');
      return null;
    }

    return this.saveProgress({
      ...existing,
      time_spent_seconds: Math.max(existing.time_spent_seconds || 0, timeSpentSeconds),
    });
  }

  /**
   * Mark as completed
   */
  async markCompleted(
    userId: string,
    exerciseId: string,
    metadata?: {
      score?: number;
      attempts?: number;
      answers?: Record<string, any>;
    }
  ): Promise<ExerciseProgressData | null> {
    const existing = await this.loadProgress(userId, exerciseId);
    const now = new Date().toISOString();

    if (existing?.status === 'completed') {
      // Already completed - update only if newer
      if (existing.completed_at && existing.completed_at >= now) {
        return existing;
      }
    }

    return this.saveProgress({
      ...(existing || {
        user_id: userId,
        exercise_id: exerciseId,
        status: 'completed',
      }),
      status: 'completed',
      completed_at: now,
      progress_percentage: 100,
      last_activity_at: now,
      score: metadata?.score ?? existing?.score,
      attempts: metadata?.attempts ?? (existing?.attempts || 0) + 1,
      answers: metadata?.answers ?? existing?.answers,
    });
  }

  /**
   * Queue operation for offline retry
   */
  private async queueOfflineOperation(type: OfflineQueueItem['type'], payload: Partial<ExerciseProgressData>): Promise<void> {
    if (!payload.user_id) return;

    const key = `${STORAGE_KEY_PREFIX}${payload.user_id}`;
    const queue: OfflineQueueItem[] = JSON.parse(localStorage.getItem(key) || '[]');

    queue.push({
      id: generateId(),
      userId: payload.user_id,
      type,
      payload,
      timestamp: Date.now(),
      retries: 0,
    });

    localStorage.setItem(key, JSON.stringify(queue));
    console.log(`[ExerciseProgressService] Queued offline operation (${queue.length} items)`);
  }

  /**
   * Sync offline queue
   */
  async syncOfflineQueue(userId: string): Promise<number> {
    if (this.isSyncing) {
      console.log('[ExerciseProgressService] Sync already in progress');
      return 0;
    }

    const key = `${STORAGE_KEY_PREFIX}${userId}`;
    const queueJson = localStorage.getItem(key);

    if (!queueJson || queueJson === '[]') {
      return 0;
    }

    let queue: OfflineQueueItem[];
    try {
      queue = JSON.parse(queueJson);
    } catch {
      localStorage.removeItem(key);
      return 0;
    }

    if (queue.length === 0) {
      localStorage.removeItem(key);
      return 0;
    }

    this.isSyncing = true;
    this.syncAbortController = new AbortController();

    let successCount = 0;
    const remaining: OfflineQueueItem[] = [];

    for (const item of queue) {
      if (this.syncAbortController.signal.aborted) {
        remaining.push(item);
        continue;
      }

      try {
        // Resolve conflicts using newest last_activity_at
        const exerciseId = item.payload.exercise_id;
        if (!exerciseId) {
          console.warn(`[ExerciseProgressService] Skipping sync item ${item.id} - missing exercise_id`);
          successCount++;
          continue;
        }

        const existing = await this.loadProgress(userId, exerciseId);

        if (existing && item.payload.last_activity_at && existing.last_activity_at && existing.last_activity_at > item.payload.last_activity_at) {
          // Conflict - server has newer data, merge
          console.log(`[ExerciseProgressService] Conflict detected for ${exerciseId}, using server version`);
          successCount++;
          continue;
        }

        if (item.payload.user_id) {
          await this.saveProgress(item.payload as ExerciseProgressData);
        }
        successCount++;
      } catch (error) {
        console.error(`[ExerciseProgressService] Failed to sync item ${item.id}:`, error);
        item.retries++;
        if (item.retries < 3) {
          remaining.push(item);
        }
      }
    }

    if (remaining.length > 0) {
      localStorage.setItem(key, JSON.stringify(remaining));
    } else {
      localStorage.removeItem(key);
    }

    this.isSyncing = false;
    this.syncAbortController = null;

    return successCount;
  }

  /**
   * Cancel ongoing sync
   */
  cancelSync(): void {
    if (this.syncAbortController) {
      this.syncAbortController.abort();
      this.isSyncing = false;
    }
  }

  /**
   * Get offline queue status
   */
  getOfflineQueueStatus(userId: string): { hasItems: boolean; count: number } {
    const key = `${STORAGE_KEY_PREFIX}${userId}`;
    const queueJson = localStorage.getItem(key);

    if (!queueJson || queueJson === '[]') {
      return { hasItems: false, count: 0 };
    }

    try {
      const queue: OfflineQueueItem[] = JSON.parse(queueJson);
      return { hasItems: queue.length > 0, count: queue.length };
    } catch {
      return { hasItems: false, count: 0 };
    }
  }
}

export const exerciseProgressService = ExerciseProgressService.getInstance();