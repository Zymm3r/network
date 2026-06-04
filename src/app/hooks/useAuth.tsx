import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '../types';
import type { Session } from '@supabase/supabase-js';

// ─── Debug Logger ────────────────────────────────────────────────────
const AUTH_DEBUG = import.meta.env.DEV;

function authLog(event: string, detail?: unknown) {
  if (!AUTH_DEBUG) return;
  const ts = new Date().toISOString().slice(11, 23);
  console.log(`%c[Auth ${ts}] ${event}`, 'color: #818cf8; font-weight: bold', detail ?? '');
}

// ─── Types ───────────────────────────────────────────────────────────
interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  initialized: boolean;
  sendMagicLink: (email: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  cooldownRemaining: number;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Helpers ─────────────────────────────────────────────────────────

/** Build a User object from Supabase session data (no DB call). */
function buildUser(su: { id: string; email?: string; user_metadata?: Record<string, unknown> }): User {
  return {
    id: su.id,
    email: su.email || '',
    full_name_th: (su.user_metadata?.full_name_th as string) || null,
    full_name_en: (su.user_metadata?.full_name_en as string) || null,
    avatar_url: (su.user_metadata?.avatar_url as string) || null,
    role: 'student',
    created_at: new Date().toISOString(),
  };
}

/** Try to resolve a richer profile from the `users` table, fall back to session data. */
async function resolveUser(su: { id: string; email?: string; user_metadata?: Record<string, unknown> }): Promise<User> {
  try {
    const { data } = await supabase.from('users').select('*').eq('id', su.id).single();
    return data || buildUser(su);
  } catch {
    return buildUser(su);
  }
}

// ─── Provider ────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  // Refs for cooldown / request locking (stable across renders)
  const cooldownIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isSendingRef = useRef(false);
  const initializedRef = useRef(false); // track initialized without triggering re-render checks

  // ─── Cooldown Timer ─────────────────────────────────────────────
  const startCooldown = useCallback((seconds: number) => {
    if (cooldownIntervalRef.current) clearInterval(cooldownIntervalRef.current);
    setCooldownRemaining(seconds);
    cooldownIntervalRef.current = setInterval(() => {
      setCooldownRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(cooldownIntervalRef.current!);
          cooldownIntervalRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  // Restore persistent cooldown on mount
  useEffect(() => {
    const ts = localStorage.getItem('sb-magic-link-cooldown');
    if (ts) {
      const remaining = Math.ceil((60_000 - (Date.now() - Number(ts))) / 1000);
      if (remaining > 0) startCooldown(remaining);
    }
    return () => {
      if (cooldownIntervalRef.current) clearInterval(cooldownIntervalRef.current);
    };
  }, [startCooldown]);

  // ─── Auth Bootstrap ─────────────────────────────────────────────
  //
  // Architecture:
  //   1. Manually fetch the session using getSession() on mount to ensure
  //      hydration is 100% reliable and instantaneous.
  //   2. Attach onAuthStateChange listener to catch subsequent events
  //      (SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED).
  //   3. Safety timeout prevents infinite loading.
  //   4. Visibility change handler refreshes session when tab becomes visible.
  //
  useEffect(() => {
    authLog('BOOT', 'Starting auth bootstrap');
    let disposed = false;

    // Helper: process a session into user state
    const applySession = (currentSession: Session | null, label: string) => {
      if (disposed) return;
      setSession(currentSession);
      if (currentSession?.user) {
        authLog(label, { userId: currentSession.user.id, email: currentSession.user.email });
        // Immediately set a basic user to prevent flashing to login
        const quickUser = buildUser(currentSession.user);
        if (!disposed) setUser(quickUser);
        // Then resolve full profile in background (truly non-blocking)
        resolveUser(currentSession.user).then((resolved) => {
          if (!disposed) setUser(resolved);
        }).catch(() => {
          // quickUser is already set, safe to continue
        });
      } else {
        authLog(label, 'No session');
        if (!disposed) setUser(null);
      }
    };

    // Helper: mark initialization complete
    const markReady = () => {
      if (disposed || initializedRef.current) return;
      initializedRef.current = true;
      setLoading(false);
      setInitialized(true);
      authLog('READY', 'Auth initialized');
    };

    // Safety timeout: Ensure we never hang forever
    const timeout = setTimeout(() => {
      if (!disposed && !initializedRef.current) {
        authLog('TIMEOUT', 'Auth bootstrap timed out — forcing ready');
        markReady();
      }
    }, 4000);

    // 1. Manually fetch the session to guarantee hydration on mount
    supabase.auth.getSession().then(({ data: { session: s }, error }) => {
      if (error) {
        authLog('SESSION_ERROR', error);
      } else {
        applySession(s, 'INITIAL_GET_SESSION');
      }
      clearTimeout(timeout);
      markReady();
    });

    // 2. Single onAuthStateChange listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, currentSession) => {
      authLog('EVENT', { event, hasSession: !!currentSession, userId: currentSession?.user?.id });

      switch (event) {
        case 'INITIAL_SESSION':
        case 'SIGNED_IN':
        case 'TOKEN_REFRESHED': {
          applySession(currentSession, event);
          clearTimeout(timeout);
          markReady();
          break;
        }
        case 'SIGNED_OUT': {
          if (!disposed) {
            setUser(null);
            setSession(null);
            setLoading(false);
            setInitialized(true);
            initializedRef.current = true;
          }
          clearTimeout(timeout);
          authLog('SIGNED_OUT', 'Session cleared by server/client');
          break;
        }
        default:
          authLog('UNHANDLED', event);
      }
    });

    // ── Shared debounce timestamp to prevent duplicate getSession() calls
    //    when both visibilitychange and focus fire in quick succession ──
    let lastSessionCheck = 0;

    // Helper: refresh session from Supabase (shared by visibility/focus/online)
    const refreshSession = (label: string) => {
      lastSessionCheck = Date.now();
      supabase.auth.getSession().then(async ({ data: { session: s }, error }) => {
        if (disposed) return;
        if (error) {
          authLog(`${label}_ERROR`, error);
          return;
        }
        if (s?.user) {
          setSession(s);
          const quickUser = buildUser(s.user);
          setUser(quickUser);
        } else if (label === 'VISIBILITY') {
          // Only clear user on visibility (tab return), not on focus
          authLog('VISIBILITY_NO_SESSION', 'Session lost while tab was hidden');
          setSession(null);
          setUser(null);
        }
      });
    };

    // 3. Tab visibility handler
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        authLog('VISIBILITY', 'Tab became visible — refreshing session');
        refreshSession('VISIBILITY');
      }
    };

    // 4. Online recovery handler
    const handleOnline = () => {
      authLog('NETWORK', 'Back online — refreshing session');
      refreshSession('NETWORK');
    };

    // 5. Focus handler (debounced — skips if visibility handler just ran)
    const handleFocus = () => {
      if (Date.now() - lastSessionCheck < 2000) return;
      authLog('FOCUS', 'Window focused');
      refreshSession('FOCUS');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('online', handleOnline);
    window.addEventListener('focus', handleFocus);

    return () => {
      disposed = true;
      clearTimeout(timeout);
      subscription.unsubscribe();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('focus', handleFocus);
      authLog('CLEANUP', 'Auth listener + lifecycle handlers unsubscribed');
    };
  }, []); // Empty deps — runs once per mount

  // ─── sendMagicLink ──────────────────────────────────────────────
  const sendMagicLink = useCallback(async (email: string) => {
    // Lock: prevent concurrent duplicate calls
    if (isSendingRef.current) {
      authLog('MAGIC_LINK_BLOCKED', 'Request already in flight');
      return;
    }

    // Cooldown: prevent rapid repeated requests
    const lastTs = localStorage.getItem('sb-magic-link-cooldown');
    if (lastTs) {
      const remaining = Math.ceil((60_000 - (Date.now() - Number(lastTs))) / 1000);
      if (remaining > 0) {
        authLog('MAGIC_LINK_COOLDOWN', `${remaining}s remaining`);
        throw new Error(
          `กรุณารออีก ${remaining} วินาทีก่อนส่งลิงก์ใหม่ (Please wait ${remaining}s)`
        );
      }
    }

    isSendingRef.current = true;
    authLog('MAGIC_LINK_SEND', { email });

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) {
        authLog('MAGIC_LINK_ERROR', error.message);
        throw error;
      }
      // Persist cooldown
      localStorage.setItem('sb-magic-link-cooldown', String(Date.now()));
      startCooldown(60);
      authLog('MAGIC_LINK_SENT', { email });
    } catch (err) {
      authLog('MAGIC_LINK_CATCH', err);
      throw err;
    } finally {
      isSendingRef.current = false;
    }
  }, [startCooldown]);

  // ─── signInWithGoogle ───────────────────────────────────────────
  const signInWithGoogle = useCallback(async () => {
    authLog('GOOGLE_SIGN_IN_START');
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) {
        authLog('GOOGLE_SIGN_IN_ERROR', error.message);
        throw error;
      }
    } catch (err) {
      authLog('GOOGLE_SIGN_IN_CATCH', err);
      throw err;
    }
  }, []);

  // ─── signOut ────────────────────────────────────────────────────
  const signOut = useCallback(async () => {
    authLog('SIGNOUT_START', 'Clearing session');
    // Clear UI state immediately — don't wait for Supabase round-trip
    setUser(null);
    setSession(null);

    try {
      const { error } = await supabase.auth.signOut();
      if (error) authLog('SIGNOUT_ERROR', error.message);
    } catch (err) {
      authLog('SIGNOUT_CATCH', err);
    }

    // Belt-and-suspenders: wipe auth token from localStorage
    try {
      const host = new URL(import.meta.env.VITE_SUPABASE_URL || 'https://x.supabase.co').hostname.split('.')[0];
      localStorage.removeItem(`sb-${host}-auth-token`);
    } catch { /* ignore */ }

    authLog('SIGNOUT_COMPLETE', 'Session fully cleared');
  }, []);

  // ─── Render ─────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-indigo-200 border-t-indigo-600" />
          <p className="text-sm text-slate-400 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, initialized, sendMagicLink, signInWithGoogle, signOut, cooldownRemaining }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Consumer Hook ───────────────────────────────────────────────────
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth() must be used within <AuthProvider>. Wrap your app in App.tsx.');
  }
  return ctx;
}