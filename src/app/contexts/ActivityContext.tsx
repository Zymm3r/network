import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useActivityTracker } from '../hooks/useActivityTracker';
import { supabase } from '../lib/supabase';

interface ActivityContextType {
  dbSeconds: number;
  pendingSeconds: number;
  totalSeconds: number;
  isActive: boolean;
}

const ActivityContext = createContext<ActivityContextType>({
  dbSeconds: 0,
  pendingSeconds: 0,
  totalSeconds: 0,
  isActive: false,
});

export function ActivityProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [dbSeconds, setDbSeconds] = useState(0);

  // Initialize DB seconds on mount (if authenticated)
  // Falls back to localStorage cache if DB query fails
  useEffect(() => {
    if (!user?.id) return;

    let isMounted = true;
    const cacheKey = `activity_db_seconds_${user.id}`;
    
    // Immediately restore from cache so UI never shows 0
    const cached = localStorage.getItem(cacheKey);
    if (cached && isMounted) {
      const parsed = parseInt(cached, 10);
      if (!isNaN(parsed) && parsed > 0) {
        setDbSeconds(parsed);
      }
    }

    const fetchDbSeconds = async () => {
      try {
        const { data, error } = await supabase
          .from('user_activity_stats')
          .select('total_active_seconds')
          .eq('user_id', user.id)
          .single();
          
        if (!error && data && isMounted) {
          const seconds = data.total_active_seconds || 0;
          setDbSeconds(seconds);
          // Update cache on successful fetch
          localStorage.setItem(cacheKey, seconds.toString());
        }
        // If error (403/404), we keep the cached value — no reset
      } catch {
        // Network error — keep cached value
      }
    };
    
    fetchDbSeconds();

    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  // When the tracker successfully flushes to the DB, we move the seconds from pending to DB
  const handleSaveSuccess = useCallback((secondsSaved: number) => {
    setDbSeconds((prev) => {
      const next = prev + secondsSaved;
      // Also update the cache
      if (user?.id) {
        localStorage.setItem(`activity_db_seconds_${user.id}`, next.toString());
      }
      return next;
    });
  }, [user?.id]);

  // Initialize the tracker engine
  const { pendingSeconds, isActive } = useActivityTracker(user?.id, handleSaveSuccess);

  const value = {
    dbSeconds,
    pendingSeconds,
    totalSeconds: dbSeconds + pendingSeconds,
    isActive,
  };

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivity() {
  return useContext(ActivityContext);
}
