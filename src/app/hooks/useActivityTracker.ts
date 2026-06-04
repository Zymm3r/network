import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const IDLE_TIMEOUT_MS = 60_000; // 60 seconds
const THROTTLE_MS = 1_000; // 1 second
const SAVE_INTERVAL_MS = 60_000; // Save every 60 seconds
const DEBUG_MODE = import.meta.env.DEV;

function trackerLog(event: string, detail?: unknown) {
  if (!DEBUG_MODE) return;
  const ts = new Date().toISOString().slice(11, 23);
  console.log(`%c[Activity Tracker ${ts}] ${event}`, 'color: #10b981; font-weight: bold', detail ?? '');
}

export function useActivityTracker(userId?: string, onSaveSuccess?: (secondsSaved: number) => void) {
  // Use a ref to track which userId we last loaded for, to avoid double-init
  const loadedForUserRef = useRef<string | null>(null);

  const [pendingSeconds, setPendingSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  
  // Refs for logic that needs the absolute latest values inside event listeners
  const pendingSecondsRef = useRef(0);
  const lastActivityRef = useRef<number>(Date.now());
  const lastEventFiredRef = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const saveIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Load from localStorage ONLY when a real userId arrives (not on undefined→undefined)
  useEffect(() => {
    if (!userId) return; // Do NOT reset to 0 when userId is undefined
    if (loadedForUserRef.current === userId) return; // Already loaded for this user
    
    loadedForUserRef.current = userId;
    const saved = localStorage.getItem(`activity_pending_${userId}`);
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed > 0) {
        trackerLog('RESTORE_FROM_STORAGE', { userId, seconds: parsed });
        setPendingSeconds(parsed);
      }
    }
  }, [userId]);

  // Sync state to ref AND localStorage (safe write — only when we have a userId)
  useEffect(() => {
    pendingSecondsRef.current = pendingSeconds;
    if (userId && loadedForUserRef.current === userId) {
      if (pendingSeconds > 0) {
        localStorage.setItem(`activity_pending_${userId}`, pendingSeconds.toString());
      } else {
        localStorage.removeItem(`activity_pending_${userId}`);
      }
    }
  }, [pendingSeconds, userId]);

  // The actual database save function
  const saveToDatabase = useCallback(async () => {
    const secondsToSave = pendingSecondsRef.current;
    if (secondsToSave <= 0) return;

    trackerLog('SAVE_INITIATED', { secondsToSave });
    
    // Immediately subtract the saved amount so the tracker can keep counting
    // from 0 while the network request is inflight.
    setPendingSeconds(prev => Math.max(0, prev - secondsToSave));

    try {
      const { error } = await supabase.rpc('increment_study_time', {
        increment_seconds: secondsToSave
      });

      if (error) {
        trackerLog('SAVE_ERROR', error.message);
        console.error('[Activity Tracker] Failed to save time:', error);
        // Restore the seconds on failure because we are safely persisting them in localStorage
        setPendingSeconds(prev => prev + secondsToSave);
      } else {
        trackerLog('SAVE_SUCCESS', { secondsSaved: secondsToSave });
        if (onSaveSuccess) {
          onSaveSuccess(secondsToSave);
        }
      }
    } catch (err) {
      trackerLog('SAVE_CATCH', err);
    }
  }, [onSaveSuccess]);

  // Interaction throttle handler
  const handleUserActivity = useCallback(() => {
    const now = Date.now();
    // Throttle events to avoid performance issues
    if (now - lastEventFiredRef.current < THROTTLE_MS) return;
    
    lastActivityRef.current = now;
    lastEventFiredRef.current = now;
  }, []);

  useEffect(() => {
    // 1. Setup DOM Event Listeners
    const events = ['mousemove', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, handleUserActivity, { passive: true });
    });

    // 2. Setup the Tick Interval (Evaluates every 1 second)
    intervalRef.current = setInterval(() => {
      const isVisible = document.visibilityState === 'visible';
      const timeSinceLastActivity = Date.now() - lastActivityRef.current;
      const isIdle = timeSinceLastActivity > IDLE_TIMEOUT_MS;
      
      const currentlyActive = isVisible && !isIdle;
      
      setIsActive((prevActive) => {
        if (prevActive !== currentlyActive) {
          trackerLog('STATE_CHANGE', {
            to: currentlyActive ? 'ACTIVE' : 'INACTIVE',
            reason: !isVisible ? 'Tab hidden' : isIdle ? `Idle for ${Math.floor(timeSinceLastActivity / 1000)}s` : 'Activity detected'
          });
        }
        return currentlyActive;
      });

      // Accumulate seconds ONLY if tab is visible AND user is not idle
      if (currentlyActive) {
        setPendingSeconds(prev => prev + 1);
      }
    }, 1000);

    // 3. Setup the Periodic Save Interval (Every 60s)
    saveIntervalRef.current = setInterval(() => {
      saveToDatabase();
    }, SAVE_INTERVAL_MS);

    // 4. Visibility & Unload Triggers (Event-based saves)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        trackerLog('EVENT_TRIGGER', 'Tab hidden - flushing save');
        saveToDatabase();
      } else {
        // Consider them immediately active upon returning to the tab
        handleUserActivity();
      }
    };
    
    const handleBeforeUnload = () => {
      trackerLog('EVENT_TRIGGER', 'Tab closing - flushing save');
      saveToDatabase();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    trackerLog('INITIALIZED', { isVisible: document.visibilityState === 'visible' });

    // Cleanup
    return () => {
      events.forEach(event => window.removeEventListener(event, handleUserActivity));
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (saveIntervalRef.current) clearInterval(saveIntervalRef.current);
      
      // Attempt one last save on unmount (e.g., user logs out or component unmounts)
      saveToDatabase();
      trackerLog('DESTROYED');
    };
  }, [handleUserActivity, saveToDatabase]);

  const flushPendingSeconds = useCallback(() => {
    return saveToDatabase();
  }, [saveToDatabase]);

  return {
    pendingSeconds,
    isActive,
    flushPendingSeconds
  };
}
