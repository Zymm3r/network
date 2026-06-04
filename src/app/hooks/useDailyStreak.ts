import { useRef, useCallback } from 'react';

/**
 * Lightweight daily streak tracker using localStorage.
 * Tracks consecutive days of activity per user.
 * 
 * Future-ready: Can be upgraded to sync with Supabase when backend table is available.
 */

interface DailyStreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string; // ISO date string (YYYY-MM-DD)
}

function getTodayDate(): string {
  return new Date().toISOString().slice(0, 10);
}

function getYesterdayDate(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function getStorageKey(userId: string): string {
  return `daily_streak_${userId}`;
}

function loadStreak(userId: string): DailyStreakData {
  try {
    const raw = localStorage.getItem(getStorageKey(userId));
    if (raw) {
      return JSON.parse(raw) as DailyStreakData;
    }
  } catch {
    // Corrupted data — reset
  }
  return { currentStreak: 0, longestStreak: 0, lastActiveDate: '' };
}

function saveStreak(userId: string, data: DailyStreakData): void {
  try {
    localStorage.setItem(getStorageKey(userId), JSON.stringify(data));
  } catch {
    // Storage full or unavailable
  }
}

/**
 * Returns the current daily streak state and a function to record today's activity.
 * Call `recordActivity()` when the user completes a quiz/exercise or interacts meaningfully.
 */
export function useDailyStreak(userId?: string) {
  const streakRef = useRef<DailyStreakData | null>(null);

  // Load streak on first access (lazy)
  const getStreak = useCallback((): DailyStreakData => {
    if (!userId) return { currentStreak: 0, longestStreak: 0, lastActiveDate: '' };
    if (!streakRef.current) {
      streakRef.current = loadStreak(userId);
    }
    return streakRef.current;
  }, [userId]);

  const recordActivity = useCallback((): DailyStreakData => {
    if (!userId) return { currentStreak: 0, longestStreak: 0, lastActiveDate: '' };

    const streak = loadStreak(userId); // Always load fresh to avoid stale ref
    const today = getTodayDate();

    // Already recorded today
    if (streak.lastActiveDate === today) {
      streakRef.current = streak;
      return streak;
    }

    const yesterday = getYesterdayDate();

    if (streak.lastActiveDate === yesterday) {
      // Consecutive day — extend streak
      streak.currentStreak += 1;
    } else if (streak.lastActiveDate === '') {
      // First ever activity
      streak.currentStreak = 1;
    } else {
      // Streak broken — reset to 1
      streak.currentStreak = 1;
    }

    streak.lastActiveDate = today;
    streak.longestStreak = Math.max(streak.longestStreak, streak.currentStreak);

    saveStreak(userId, streak);
    streakRef.current = streak;
    return streak;
  }, [userId]);

  const streak = getStreak();

  return {
    currentStreak: streak.currentStreak,
    longestStreak: streak.longestStreak,
    lastActiveDate: streak.lastActiveDate,
    isActiveToday: streak.lastActiveDate === getTodayDate(),
    recordActivity,
  };
}
