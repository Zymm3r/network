import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '../../app/hooks/useAuth';
import { exerciseProgressService, type ExerciseProgressData } from '../services/ExerciseProgressService';

export interface UseExerciseProgressOptions { autoStart?: boolean; debounceMs?: number; }
export interface UseExerciseProgressResult {
  progress: ExerciseProgressData | null; saving: boolean; saved: boolean; offline: boolean; syncing: boolean; error: Error | null;
  isStarted: boolean; isCompleted: boolean; progressPercentage: number; timeSpentSeconds: number; attempts: number; score: number | null;
  markStarted: () => Promise<void>; updateAnswer: (key: string, value: unknown) => void; updateCheckpoint: (key: string, value: unknown) => void;
  updateTimer: (seconds: number) => void; markCompleted: (data?: Partial<ExerciseProgressData>) => Promise<void>;
  saveProgress: (data: Partial<ExerciseProgressData>) => Promise<void>; refresh: () => Promise<void>; syncOffline: () => Promise<void>; flushPending: () => Promise<void>; reset: () => void;
}

export function useExerciseProgress(exerciseId: string, lessonId: string, courseId: string, options: UseExerciseProgressOptions = {}): UseExerciseProgressResult {
  const { user } = useAuth(); const debounceMs = options.debounceMs ?? 2000;
  const [progress, setProgress] = useState<ExerciseProgressData | null>(null); const [saving, setSaving] = useState(false); const [saved, setSaved] = useState(false);
  const [offline, setOffline] = useState(() => !navigator.onLine); const [syncing, setSyncing] = useState(false); const [error, setError] = useState<Error | null>(null);
  const pending = useRef<Partial<ExerciseProgressData>>({}); const timer = useRef<ReturnType<typeof setTimeout> | null>(null); const inFlight = useRef(false); const hydrated = useRef(false); const current = useRef<ExerciseProgressData | null>(null);
  useEffect(() => { current.current = progress; }, [progress]);
  const identity = useCallback(() => user ? { user_id: user.id, exercise_id: exerciseId, lesson_id: lessonId || null, course_id: courseId || null } : null, [user?.id, exerciseId, lessonId, courseId]);

  const buildPayload = useCallback((update: Partial<ExerciseProgressData>) => {
    const base = current.current || {}; const id = identity(); if (!id) return null;
    return { ...base, ...pending.current, ...update, ...id, checkpoint_data: { ...(base.checkpoint_data || {}), ...(pending.current.checkpoint_data || {}), ...(update.checkpoint_data || {}) }, answers: { ...(base.answers || {}), ...(pending.current.answers || {}), ...(update.answers || {}) }, last_activity_at: new Date().toISOString() } as ExerciseProgressData;
  }, [identity]);
  const flush = useCallback(async () => {
    if (inFlight.current || !Object.keys(pending.current).length) return;
    const payload = buildPayload({}); if (!payload) return;
    pending.current = {}; inFlight.current = true; setSaving(true); setSaved(false);
    const result = await exerciseProgressService.saveProgress(payload);
    if (result) { setProgress(result); setOffline(false); setSaved(true); } else { setOffline(true); setError(new Error('Progress queued for synchronization')); }
    inFlight.current = false; setSaving(false);
    if (Object.keys(pending.current).length) void flush();
  }, [buildPayload]);
  const schedule = useCallback((update: Partial<ExerciseProgressData>, immediate = false) => {
    const payload = buildPayload(update); if (!payload) return;
    pending.current = { ...pending.current, ...update, checkpoint_data: payload.checkpoint_data, answers: payload.answers, last_activity_at: payload.last_activity_at };
    setProgress(payload); if (timer.current) clearTimeout(timer.current);
    if (immediate) void flush(); else timer.current = setTimeout(() => void flush(), debounceMs);
  }, [buildPayload, debounceMs, flush]);

  const refresh = useCallback(async () => { const id = identity(); if (!id) return; const row = await exerciseProgressService.loadProgress(id.user_id, id.exercise_id); setProgress(row); hydrated.current = true; }, [identity]);
  const syncOffline = useCallback(async () => { if (!user) return; setSyncing(true); try { await exerciseProgressService.syncOfflineQueue(user.id); await refresh(); setOffline(false); } finally { setSyncing(false); } }, [user?.id, refresh]);
  useEffect(() => { hydrated.current = false; void refresh().then(async () => { if (options.autoStart !== false && !current.current?.started_at) schedule({ status: 'in_progress', started_at: new Date().toISOString() }, true); await syncOffline(); }).catch(err => setError(err instanceof Error ? err : new Error('Failed to hydrate progress'))); }, [exerciseId, user?.id]);
  useEffect(() => { const online = () => { setOffline(false); void syncOffline(); }; const persistBeforeExit = () => { const payload = buildPayload({}); if (payload && Object.keys(pending.current).length) exerciseProgressService.queueOfflineOperation(payload); void flush(); }; const hidden = () => { if (document.visibilityState === 'hidden') persistBeforeExit(); }; window.addEventListener('online', online); window.addEventListener('pagehide', persistBeforeExit); document.addEventListener('visibilitychange', hidden); return () => { if (timer.current) clearTimeout(timer.current); persistBeforeExit(); window.removeEventListener('online', online); window.removeEventListener('pagehide', persistBeforeExit); document.removeEventListener('visibilitychange', hidden); }; }, [buildPayload, flush, syncOffline]);

  const markStarted = useCallback(async () => schedule({ status: 'in_progress', started_at: current.current?.started_at || new Date().toISOString() }, true), [schedule]);
  const updateAnswer = useCallback((key: string, value: unknown) => schedule({ answers: { [key]: value }, status: current.current?.status === 'completed' ? 'completed' : 'in_progress' }), [schedule]);
  const updateCheckpoint = useCallback((key: string, value: unknown) => schedule({ checkpoint_data: { [key]: value }, status: current.current?.status === 'completed' ? 'completed' : 'in_progress' }), [schedule]);
  const updateTimer = useCallback((seconds: number) => schedule({ time_spent_seconds: Math.max(current.current?.time_spent_seconds || 0, seconds) }), [schedule]);
  const markCompleted = useCallback(async (data: Partial<ExerciseProgressData> = {}) => schedule({ ...data, status: 'completed', progress_percentage: 100, completed_at: current.current?.completed_at || new Date().toISOString() }, true), [schedule]);
  const saveProgress = useCallback(async (data: Partial<ExerciseProgressData>) => schedule(data), [schedule]);
  const flushPending = flush; const reset = useCallback(() => { pending.current = {}; setProgress(null); }, []);
  return { progress, saving, saved, offline, syncing, error, isStarted: !!progress?.started_at, isCompleted: progress?.status === 'completed', progressPercentage: progress?.progress_percentage || 0, timeSpentSeconds: progress?.time_spent_seconds || 0, attempts: progress?.attempts || 0, score: progress?.score ?? null, markStarted, updateAnswer, updateCheckpoint, updateTimer, markCompleted, saveProgress, refresh, syncOffline, flushPending, reset };
}
