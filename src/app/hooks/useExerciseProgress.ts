import { useState, useCallback, useEffect } from 'react';
import { useAuth } from './useAuth';
import { exerciseApi } from '../lib/api';
import { ExerciseAttempt } from '../types';

interface AttemptData extends Omit<ExerciseAttempt, 'id' | 'created_at' | 'updated_at'> {}

interface QueuedAttempt {
  exerciseId: string;
  data: AttemptData;
}

export interface UseExerciseProgressResult {
  recordAttempt: (data: AttemptData) => Promise<ExerciseAttempt | null>;
  flushQueue: () => Promise<number>;
  isQueuedAttempts: boolean;
}

export function useExerciseProgress(
  exerciseId: string,
  lessonId: string,
  courseId: string
): UseExerciseProgressResult {
  const { user } = useAuth();
  const [isQueuedAttempts, setIsQueuedAttempts] = useState(false);

  const queueKey = user ? `pending-exercise-attempts-${user.id}` : null;

  // Load queue from localStorage on mount
  useEffect(() => {
    if (queueKey) {
      const queued = localStorage.getItem(queueKey);
      setIsQueuedAttempts(!!queued && queued !== '[]');
    }
  }, [queueKey]);

  // Auto-sync queue on visibility change and online event
  useEffect(() => {
    if (!queueKey) return;

    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible') {
        await flushQueue();
      }
    };

    const handleOnline = async () => {
      await flushQueue();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('online', handleOnline);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('online', handleOnline);
    };
  }, [queueKey]);

  const recordAttempt = useCallback(
    async (data: AttemptData): Promise<ExerciseAttempt | null> => {
      if (!user?.id || !queueKey) {
        console.warn('[Exercise Tracking] User not authenticated');
        return null;
      }

      try {
        const result = await exerciseApi.recordAttempt(data);
        // Clear any queued attempts for this exercise on success
        const queue = JSON.parse(localStorage.getItem(queueKey) || '[]');
        const filtered = queue.filter(
          (item: QueuedAttempt) => item.exerciseId !== exerciseId
        );
        if (filtered.length > 0) {
          localStorage.setItem(queueKey, JSON.stringify(filtered));
        } else {
          localStorage.removeItem(queueKey);
          setIsQueuedAttempts(false);
        }
        return result;
      } catch (error) {
        console.error('[Exercise Tracking] Failed to record attempt:', error);
        // Queue attempt for later retry
        const queue = JSON.parse(localStorage.getItem(queueKey) || '[]');
        // Deduplicate by exerciseId (keep latest)
        const filtered = queue.filter(
          (item: QueuedAttempt) => item.exerciseId !== exerciseId
        );
        filtered.push({ exerciseId, data });
        localStorage.setItem(queueKey, JSON.stringify(filtered));
        setIsQueuedAttempts(true);
        return null;
      }
    },
    [user?.id, queueKey, exerciseId]
  );

  const flushQueue = useCallback(async (): Promise<number> => {
    if (!user?.id || !queueKey) return 0;

    const queued = localStorage.getItem(queueKey);
    if (!queued || queued === '[]') return 0;

    let queue: QueuedAttempt[] = [];
    try {
      queue = JSON.parse(queued);
    } catch {
      localStorage.removeItem(queueKey);
      setIsQueuedAttempts(false);
      return 0;
    }

    let successCount = 0;
    const remaining: QueuedAttempt[] = [];

    for (const item of queue) {
      try {
        await exerciseApi.recordAttempt(item.data);
        successCount++;
      } catch (error) {
        console.error(
          `[Exercise Tracking] Failed to flush attempt for ${item.exerciseId}:`,
          error
        );
        remaining.push(item);
      }
    }

    if (remaining.length > 0) {
      localStorage.setItem(queueKey, JSON.stringify(remaining));
      setIsQueuedAttempts(true);
    } else {
      localStorage.removeItem(queueKey);
      setIsQueuedAttempts(false);
    }

    return successCount;
  }, [user?.id, queueKey]);

  return {
    recordAttempt,
    flushQueue,
    isQueuedAttempts,
  };
}
