import { beforeEach, describe, expect, it, vi } from 'vitest';

const { insert, maybeSingle, from } = vi.hoisted(() => {
  const insert = vi.fn(async () => ({ error: null }));
  const maybeSingle = vi.fn(async () => ({ data: null, error: null }));
  const eqLesson = vi.fn(() => ({ maybeSingle }));
  const eqUser = vi.fn(() => ({ eq: eqLesson }));
  const select = vi.fn(() => ({ eq: eqUser }));
  const from = vi.fn(() => ({ select, insert }));
  return { insert, maybeSingle, from };
});

vi.mock('./supabase', () => ({ supabase: { from } }));

import { flushLessonProgressQueue, isRetryableProgressError, queueLessonProgress } from './progressQueue';

const storage = new Map<string, string>();

beforeEach(() => {
  storage.clear();
  insert.mockClear();
  maybeSingle.mockClear();
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: string) => storage.set(key, value),
    removeItem: (key: string) => storage.delete(key),
  });
});

describe('lesson progress offline queue', () => {
  it('queues transient failures but not permission errors', () => {
    expect(isRetryableProgressError(new TypeError('Failed to fetch'))).toBe(true);
    expect(isRetryableProgressError({ status: 503 })).toBe(true);
    expect(isRetryableProgressError({ code: '42501' })).toBe(false);
  });

  it('keeps only the latest payload per lesson and flushes it once', async () => {
    const base = {
      user_id: 'user-1',
      lesson_id: 'lesson-1',
      status: 'in_progress' as const,
      progress_percentage: 25,
      last_accessed_at: '2026-07-29T00:00:00.000Z',
    };

    queueLessonProgress(base);
    queueLessonProgress({ ...base, progress_percentage: 50 });

    await expect(flushLessonProgressQueue('user-1')).resolves.toBe(1);
    expect(insert).toHaveBeenCalledTimes(1);
    expect(insert).toHaveBeenCalledWith(expect.objectContaining({ progress_percentage: 50 }));
    expect(storage.has('pending-progress-saves-user-1')).toBe(false);
  });
});
