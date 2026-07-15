import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from './useAuth';
import { exerciseApi } from '../lib/api';
import {
  exerciseProgressService, type ExerciseProgress, type ExerciseProgressIdentity,
  type ExerciseProgressUpdate,
} from '../lib/api/exerciseProgress';
import type { ExerciseAttempt } from '../types';

type AttemptData = Omit<ExerciseAttempt, 'id' | 'created_at' | 'updated_at'>;
type QueuedProgress = { identity: ExerciseProgressIdentity; update: ExerciseProgressUpdate };

const EMPTY_PROGRESS: Omit<ExerciseProgress, 'user_id' | 'exercise_id' | 'lesson_id' | 'course_id'> = {
  id: '', started_at: null, completed_at: null, last_activity_at: '', time_spent_seconds: 0,
  progress_percentage: 0, status: 'not_started', score: null, attempts: 0,
  checkpoint_data: {}, answers: {}, updated_at: '', created_at: '',
};

export interface UseExerciseProgressResult {
  progress: ExerciseProgress | null;
  saving: boolean;
  saved: boolean;
  offline: boolean;
  syncing: boolean;
  error: Error | null;
  markStarted: () => void;
  saveProgress: (update: ExerciseProgressUpdate, immediate?: boolean) => void;
  updateAnswer: (key: string, value: unknown) => void;
  updateCheckpoint: (key: string, value: unknown) => void;
  updateTimer: (seconds: number) => void;
  markCompleted: (update?: ExerciseProgressUpdate) => Promise<void>;
  syncOfflineQueue: () => Promise<number>;
  recordAttempt: (data: AttemptData) => Promise<ExerciseAttempt | null>;
  flushQueue: () => Promise<number>;
  isQueuedAttempts: boolean;
}

export function useExerciseProgress(exerciseId: string, lessonId: string, courseId: string): UseExerciseProgressResult {
  const { user } = useAuth();
  const [progress, setProgress] = useState<ExerciseProgress | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [offline, setOffline] = useState(() => typeof navigator !== 'undefined' && !navigator.onLine);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pending = useRef<ExerciseProgressUpdate | null>(null);
  const current = useRef<ExerciseProgress | null>(null);
  const request = useRef(0);
  const completed = useRef(false);
  const savingRef = useRef(false);
  const queueKey = user ? `exercise-progress-queue:${user.id}` : null;
  const identity: ExerciseProgressIdentity | null = user && exerciseId ? {
    userId: user.id, exerciseId, lessonId: lessonId || undefined, courseId: courseId || undefined,
  } : null;

  useEffect(() => { current.current = progress; }, [progress]);
  useEffect(() => { completed.current = progress?.status === 'completed'; }, [progress?.status]);

  const queue = useCallback((entry: QueuedProgress) => {
    if (!queueKey) return;
    const items: QueuedProgress[] = JSON.parse(localStorage.getItem(queueKey) || '[]');
    const withoutSameExercise = items.filter(item => item.identity.exerciseId !== entry.identity.exerciseId);
    localStorage.setItem(queueKey, JSON.stringify([...withoutSameExercise, entry]));
    setOffline(true);
  }, [queueKey]);

  const persist = useCallback(async (immediate = false) => {
    if (!identity || !pending.current || savingRef.current) return;
    const update = pending.current;
    pending.current = null;
    savingRef.current = true;
    setSaving(true); setSaved(false); setError(null);
    const id = ++request.current;
    try {
      const result = await exerciseProgressService.saveProgress(identity, update);
      if (id === request.current) setProgress(result);
      setOffline(false); setSaved(true);
    } catch (cause) {
      pending.current = { ...update, ...pending.current };
      queue({ identity, update });
      setError(cause instanceof Error ? cause : new Error('Unable to save exercise progress'));
    } finally {
      savingRef.current = false;
      setSaving(false);
      if (pending.current && immediate) void persist(true);
    }
  }, [identity, queue]);

  const saveProgress = useCallback((update: ExerciseProgressUpdate, immediate = false) => {
    if (!identity) return;
    const base = current.current || { ...EMPTY_PROGRESS, user_id: identity.userId, exercise_id: identity.exerciseId, lesson_id: identity.lessonId || null, course_id: identity.courseId || null };
    const merged = { ...base, ...pending.current, ...update, last_activity_at: update.last_activity_at || new Date().toISOString() };
    pending.current = { ...pending.current, ...update, last_activity_at: merged.last_activity_at };
    setProgress(merged);
    if (timer.current) clearTimeout(timer.current);
    if (immediate) void persist(true);
    else timer.current = setTimeout(() => void persist(), 1500);
  }, [identity, persist]);

  const markStarted = useCallback(() => {
    if (current.current?.started_at) return;
    saveProgress({ status: 'in_progress', started_at: new Date().toISOString() }, true);
  }, [saveProgress]);
  const updateAnswer = useCallback((key: string, value: unknown) => {
    const answers = { ...(current.current?.answers || {}), [key]: value };
    saveProgress({ status: 'in_progress', answers });
  }, [saveProgress]);
  const updateCheckpoint = useCallback((key: string, value: unknown) => {
    const checkpoint_data = { ...(current.current?.checkpoint_data || {}), [key]: value };
    saveProgress({ status: 'in_progress', checkpoint_data });
  }, [saveProgress]);
  const updateTimer = useCallback((seconds: number) => saveProgress({ time_spent_seconds: Math.max(0, seconds) }), [saveProgress]);
  const markCompleted = useCallback(async (update: ExerciseProgressUpdate = {}) => {
    if (completed.current) return;
    completed.current = true;
    saveProgress({ ...update, status: 'completed', progress_percentage: 100, completed_at: new Date().toISOString() }, true);
    await new Promise(resolve => setTimeout(resolve, 0));
  }, [saveProgress]);

  const syncOfflineQueue = useCallback(async () => {
    if (!queueKey || !identity || !navigator.onLine) return 0;
    const entries: QueuedProgress[] = JSON.parse(localStorage.getItem(queueKey) || '[]');
    if (!entries.length) return 0;
    setSyncing(true);
    const remaining: QueuedProgress[] = [];
    let count = 0;
    for (const entry of entries) {
      try {
        const remote = await exerciseProgressService.loadProgress(entry.identity);
        if (!remote || new Date(entry.update.last_activity_at || 0).getTime() >= new Date(remote.last_activity_at).getTime()) {
          await exerciseProgressService.saveProgress(entry.identity, entry.update);
        }
        count++;
      } catch { remaining.push(entry); }
    }
    if (remaining.length) localStorage.setItem(queueKey, JSON.stringify(remaining)); else localStorage.removeItem(queueKey);
    setOffline(remaining.length > 0); setSyncing(false);
    if (count) {
      const latest = await exerciseProgressService.loadProgress(identity);
      setProgress(latest);
    }
    return count;
  }, [identity, queueKey]);

  useEffect(() => {
    if (!identity) { setProgress(null); return; }
    let active = true;
    setSaved(false); setError(null);
    exerciseProgressService.loadProgress(identity).then(row => {
      if (active) { setProgress(row); setSaved(true); }
    }).catch(cause => { if (active) setError(cause instanceof Error ? cause : new Error('Unable to load exercise progress')); });
    return () => { active = false; };
  }, [identity?.userId, identity?.exerciseId]);

  useEffect(() => {
    const flush = () => { if (timer.current) clearTimeout(timer.current); void persist(true); };
    const online = () => { setOffline(false); void syncOfflineQueue(); };
    const offlineHandler = () => setOffline(true);
    const visibility = () => { if (document.visibilityState === 'hidden') flush(); else void syncOfflineQueue(); };
    window.addEventListener('online', online); window.addEventListener('offline', offlineHandler);
    window.addEventListener('pagehide', flush); window.addEventListener('beforeunload', flush);
    document.addEventListener('visibilitychange', visibility);
    return () => { flush(); window.removeEventListener('online', online); window.removeEventListener('offline', offlineHandler); window.removeEventListener('pagehide', flush); window.removeEventListener('beforeunload', flush); document.removeEventListener('visibilitychange', visibility); };
  }, [persist, syncOfflineQueue]);

  useEffect(() => { void syncOfflineQueue(); }, [syncOfflineQueue]);

  const recordAttempt = useCallback(async (data: AttemptData) => {
    try { return await exerciseApi.recordAttempt(data); } catch { return null; }
  }, []);
  const flushQueue = syncOfflineQueue;
  return { progress, saving, saved, offline, syncing, error, markStarted, saveProgress, updateAnswer, updateCheckpoint, updateTimer, markCompleted, syncOfflineQueue, recordAttempt, flushQueue, isQueuedAttempts: offline };
}
