import { supabase } from './supabase';

export interface LessonProgressSave {
  user_id: string;
  lesson_id: string;
  course_id?: string | null;
  status: 'in_progress' | 'completed';
  progress_percentage: number;
  notes?: string | null;
  completed_at?: string | null;
  last_accessed_at: string;
}

interface QueuedProgressSave {
  payload: LessonProgressSave;
  queuedAt: string;
}

function queueKey(userId: string): string {
  return `pending-progress-saves-${userId}`;
}

function readQueue(userId: string): QueuedProgressSave[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(queueKey(userId)) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    localStorage.removeItem(queueKey(userId));
    return [];
  }
}

export function queueLessonProgress(payload: LessonProgressSave): void {
  const queue = readQueue(payload.user_id).filter(
    item => item.payload.lesson_id !== payload.lesson_id,
  );
  queue.push({ payload, queuedAt: new Date().toISOString() });
  localStorage.setItem(queueKey(payload.user_id), JSON.stringify(queue));
}

export function isRetryableProgressError(error: unknown): boolean {
  if (error instanceof TypeError) return true;
  if (!error || typeof error !== 'object') return false;

  const code = 'code' in error && typeof error.code === 'string' ? error.code : '';
  const status = 'status' in error && typeof error.status === 'number' ? error.status : 0;

  return status >= 500
    || code.startsWith('08')
    || ['40001', '40P01', '53P01', '53P02', '53P03', '55P03', '57014', '57P01'].includes(code);
}

export async function saveLessonProgress(payload: LessonProgressSave): Promise<void> {
  const { data: existing, error: lookupError } = await supabase
    .from('user_progress')
    .select('id')
    .eq('user_id', payload.user_id)
    .eq('lesson_id', payload.lesson_id)
    .maybeSingle();

  if (lookupError) throw lookupError;

  const response = existing
    ? await supabase.from('user_progress').update(payload).eq('id', existing.id)
    : await supabase.from('user_progress').insert(payload);

  if (response.error) throw response.error;
}

export async function flushLessonProgressQueue(userId: string): Promise<number> {
  const queue = readQueue(userId);
  if (queue.length === 0) return 0;

  const remaining: QueuedProgressSave[] = [];
  let saved = 0;

  for (const item of queue) {
    try {
      await saveLessonProgress(item.payload);
      saved += 1;
    } catch {
      remaining.push(item);
    }
  }

  if (remaining.length > 0) {
    localStorage.setItem(queueKey(userId), JSON.stringify(remaining));
  } else {
    localStorage.removeItem(queueKey(userId));
  }

  return saved;
}

export function clearLessonProgressQueue(userId: string): void {
  localStorage.removeItem(queueKey(userId));
}
