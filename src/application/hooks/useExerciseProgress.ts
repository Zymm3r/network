import { useState, useCallback, useEffect, useRef } from 'react';
import { useAuth } from '../../app/hooks/useAuth';
import { exerciseProgressService } from '../services/ExerciseProgressService';
import type { ExerciseProgressData } from '../services/ExerciseProgressService';

export interface UseExerciseProgressOptions {
  autoStart?: boolean;
  debounceMs?: number;
}

export interface UseExerciseProgressResult {
  // State
  progress: ExerciseProgressData | null;
  saving: boolean;
  saved: boolean;
  offline: boolean;
  syncing: boolean;
  error: Error | null;
  isStarted: boolean;
  isCompleted: boolean;
  progressPercentage: number;
  timeSpentSeconds: number;
  attempts: number;
  score: number | null;

  // Actions
  markStarted: () => Promise<void>;
  updateAnswer: (key: string, value: any) => void;
  updateCheckpoint: (checkpointId: string, data: any) => void;
  updateTimer: (timeSpentSeconds: number) => void;
  markCompleted: (metadata?: { score?: number; attempts?: number; answers?: Record<string, any> }) => Promise<void>;
  saveProgress: (data: Partial<ExerciseProgressData>) => Promise<void>;
  refresh: () => Promise<void>;
  syncOffline: () => Promise<void>;
  flushPending: () => Promise<void>;
  reset: () => void;
}

const DEFAULT_DEBOUNCE_MS = 2000;

export function useExerciseProgress(
  exerciseId: string,
  lessonId: string,
  courseId: string,
  options: UseExerciseProgressOptions = {}
): UseExerciseProgressResult {
  const { user } = useAuth();
  const { autoStart = true, debounceMs = DEFAULT_DEBOUNCE_MS } = options;

  // State
  const [progress, setProgress] = useState<ExerciseProgressData | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(true);
  const [offline, setOffline] = useState(!navigator.onLine);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Refs for debouncing and request cancellation
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const mountedRef = useRef(true);
  const lastSaveTimeRef = useRef<number>(0);
  const pendingSaveRef = useRef<Partial<ExerciseProgressData> | null>(null);

  // Derived state
  const isStarted = progress?.status !== 'not_started';
  const isCompleted = progress?.status === 'completed';
  const progressPercentage = progress?.progress_percentage ?? 0;
  const timeSpentSeconds = progress?.time_spent_seconds ?? 0;
  const attempts = progress?.attempts ?? 0;
  const score = progress?.score ?? null;

  // Cleanup on unmount
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Online/offline detection
  useEffect(() => {
    const handleOnline = () => {
      setOffline(false);
      // Trigger sync when coming online
      if (user?.id) {
        syncOfflineData(user.id);
      }
    };

    const handleOffline = () => {
      setOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [user?.id]);

  // Auto-start exercise when loaded
  useEffect(() => {
    if (!autoStart || !user?.id || !exerciseId || isStarted) return;

    const startExercise = async () => {
      try {
        const result = await exerciseProgressService.markStarted(user.id, exerciseId, {
          lesson_id: lessonId,
          course_id: courseId,
        });

        if (result && mountedRef.current) {
          setProgress(result);
        }
      } catch (err) {
        console.error('[useExerciseProgress] Failed to auto-start exercise:', err);
        if (mountedRef.current) {
          setError(err instanceof Error ? err : new Error('Failed to start exercise'));
        }
      }
    };

    startExercise();
  }, [autoStart, user?.id, exerciseId, lessonId, courseId, isStarted]);

  // Sync offline data
  const syncOfflineData = useCallback(async (userId: string) => {
    if (syncing) return;

    setSyncing(true);
    try {
      const syncedCount = await exerciseProgressService.syncOfflineQueue(userId);
      console.log(`[useExerciseProgress] Synced ${syncedCount} offline items`);

      // Refresh progress after sync
      if (progress?.exercise_id) {
        const updated = await exerciseProgressService.loadProgress(userId, progress.exercise_id);
        if (updated && mountedRef.current) {
          setProgress(updated);
        }
      }
    } catch (err) {
      console.error('[useExerciseProgress] Failed to sync offline data:', err);
    } finally {
      setSyncing(false);
    }
  }, [syncing, progress?.exercise_id]);

  // Debounced save function
  const debouncedSave = useCallback(
    (data: Partial<ExerciseProgressData>) => {
      // Cancel previous timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Store pending save
      pendingSaveRef.current = data;

      // Set saving state
      setSaving(true);
      setSaved(false);

      // Debounce the save
      debounceTimerRef.current = setTimeout(async () => {
        if (!mountedRef.current || !user?.id || !pendingSaveRef.current) return;

        const newAbortController = new AbortController();
        abortControllerRef.current = newAbortController;

        try {
          const saveData = pendingSaveRef.current;
          pendingSaveRef.current = null;

          const result = await exerciseProgressService.saveProgress({
            ...saveData,
            user_id: user.id,
            exercise_id: exerciseId,
            last_activity_at: new Date().toISOString(),
          } as ExerciseProgressData);

          if (!mountedRef.current) return;

          if (newAbortController.signal.aborted) return;

          if (result) {
            setProgress(result);
            setSaved(true);
            lastSaveTimeRef.current = Date.now();
          } else {
            setError(new Error('Failed to save progress'));
          }
        } catch (err) {
          if (!mountedRef.current || newAbortController.signal.aborted) return;

          console.error('[useExerciseProgress] Save error:', err);
          setError(err instanceof Error ? err : new Error('Failed to save progress'));
        } finally {
          if (mountedRef.current) {
            setSaving(false);
          }
        }
      }, debounceMs);
    },
    [user?.id, exerciseId, debounceMs]
  );

  // Actions
  const markStarted = useCallback(async () => {
    if (!user?.id || !exerciseId) return;

    try {
      setSaving(true);
      const result = await exerciseProgressService.markStarted(user.id, exerciseId, {
        lesson_id: lessonId,
        course_id: courseId,
      });

      if (result && mountedRef.current) {
        setProgress(result);
        setSaved(true);
      }
    } catch (err) {
      if (mountedRef.current) {
        setError(err instanceof Error ? err : new Error('Failed to mark as started'));
      }
    } finally {
      if (mountedRef.current) {
        setSaving(false);
      }
    }
  }, [user?.id, exerciseId, lessonId, courseId]);

  const updateAnswer = useCallback(
    (key: string, value: any) => {
      if (!user?.id || !exerciseId) return;

      // Optimistic update
      setProgress(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          answers: { ...prev.answers, [key]: value },
        };
      });

      debouncedSave({
        user_id: user.id,
        exercise_id: exerciseId,
        answers: { ...progress?.answers, [key]: value },
      });
    },
    [user?.id, exerciseId, progress?.answers, debouncedSave]
  );

  const updateCheckpoint = useCallback(
    (checkpointId: string, data: any) => {
      if (!user?.id || !exerciseId) return;

      // Optimistic update
      setProgress(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          checkpoint_data: { ...prev.checkpoint_data, [checkpointId]: data },
        };
      });

      debouncedSave({
        user_id: user.id,
        exercise_id: exerciseId,
        checkpoint_data: { ...progress?.checkpoint_data, [checkpointId]: data },
      });
    },
    [user?.id, exerciseId, progress?.checkpoint_data, debouncedSave]
  );

  const updateTimer = useCallback(
    (timeSpentSeconds: number) => {
      if (!user?.id || !exerciseId) return;

      const update = {
        user_id: user.id,
        exercise_id: exerciseId,
        time_spent_seconds: Math.max(progress?.time_spent_seconds ?? 0, timeSpentSeconds),
      };

      // Only save if significantly changed (more than 1 second)
      if (Math.abs((progress?.time_spent_seconds ?? 0) - timeSpentSeconds) < 1) return;

      // Optimistic update
      setProgress(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          time_spent_seconds: Math.max(prev.time_spent_seconds || 0, timeSpentSeconds),
        };
      });

      debouncedSave(update);
    },
    [user?.id, exerciseId, progress?.time_spent_seconds, debouncedSave]
  );

  const markCompleted = useCallback(
    async (metadata?: { score?: number; attempts?: number; answers?: Record<string, any> }) => {
      if (!user?.id || !exerciseId) return;

      try {
        setSaving(true);
        const result = await exerciseProgressService.markCompleted(user.id, exerciseId, metadata);

        if (result && mountedRef.current) {
          setProgress(result);
          setSaved(true);
        }
      } catch (err) {
        if (mountedRef.current) {
          setError(err instanceof Error ? err : new Error('Failed to mark as completed'));
        }
      } finally {
        if (mountedRef.current) {
          setSaving(false);
        }
      }
    },
    [user?.id, exerciseId]
  );

  const saveProgress = useCallback(
    async (data: Partial<ExerciseProgressData>) => {
      if (!user?.id || !exerciseId) return;

      debouncedSave(data);
    },
    [user?.id, exerciseId, debouncedSave]
  );

  const refresh = useCallback(async () => {
    if (!user?.id || !exerciseId) return;

    try {
      const result = await exerciseProgressService.loadProgress(user.id, exerciseId);
      if (result && mountedRef.current) {
        setProgress(result);
        setError(null);
      }
    } catch (err) {
      if (mountedRef.current) {
        setError(err instanceof Error ? err : new Error('Failed to refresh progress'));
      }
    }
  }, [user?.id, exerciseId]);

  const syncOffline = useCallback(async () => {
    if (!user?.id) return;
    await syncOfflineData(user.id);
  }, [user?.id, syncOfflineData]);

  const reset = useCallback(() => {
    setProgress(null);
    setSaving(false);
    setSaved(true);
    setError(null);
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  // Flush pending saves immediately using keepalive
  const flushPending = useCallback(async () => {
    if (!user?.id || !pendingSaveRef.current) return;

    const saveData = pendingSaveRef.current;
    pendingSaveRef.current = null;

    // Clear debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }

    try {
      // Try immediate save with keepalive for page unload scenarios
      const result = await exerciseProgressService.saveProgress({
        ...saveData,
        user_id: user.id,
        exercise_id: exerciseId,
        last_activity_at: new Date().toISOString(),
      } as ExerciseProgressData);

      if (result && mountedRef.current) {
        setProgress(result);
        setSaved(true);
      }
    } catch (err) {
      // If network fails, queue for offline sync
      console.error('[useExerciseProgress] flushPending failed, queuing for offline sync:', err);
      if (saveData.user_id) {
        await exerciseProgressService['syncOfflineQueue'](saveData.user_id);
      }
    } finally {
      if (mountedRef.current) {
        setSaving(false);
      }
    }
  }, [user?.id, exerciseId]);

  // Handle page unload, visibility change, and beforeunload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (pendingSaveRef.current) {
        // Use fetch with keepalive for reliable delivery during unload
        const saveData = pendingSaveRef.current;
        const url = `${window.location.origin}/api/exercise-progress`;
        
        try {
          fetch(url, {
            method: 'POST',
            keepalive: true,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...saveData,
              user_id: user?.id,
              exercise_id: exerciseId,
              last_activity_at: new Date().toISOString(),
            }),
          }).catch(() => {
            // If keepalive fails, the offline queue will handle it
            console.log('[useExerciseProgress] keepalive request queued for retry');
          });
        } catch (err) {
          // Silently fail - offline queue will retry
        }

        pendingSaveRef.current = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // Flush pending saves when tab becomes hidden
        flushPending();
      }
    };

    const handlePageHide = (event: PageTransitionEvent) => {
      // Flush on page hide (including back/forward navigation)
      if (event.persisted) {
        // Page is being cached (bfcache), flush synchronously if possible
        flushPending();
      }
    };

    // Register event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handlePageHide);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageHide);
    };
  }, [user?.id, exerciseId, flushPending]);

  return {
    // State
    progress,
    saving,
    saved,
    offline,
    syncing,
    error,
    isStarted,
    isCompleted,
    progressPercentage,
    timeSpentSeconds,
    attempts,
    score,

    // Actions
    markStarted,
    updateAnswer,
    updateCheckpoint,
    updateTimer,
    markCompleted,
    saveProgress,
    refresh,
    syncOffline,
    flushPending,
    reset,
  };
}
