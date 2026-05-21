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
  loading: boolean;
  initialized: boolean;
  sendMagicLink: (email: string) => Promise<void>;
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

// Maximum time to wait for INITIAL_SESSION before forcing initialized=true.
// This prevents the "กำลังเตรียมระบบ..." spinner from hanging forever.
const INIT_TIMEOUT_MS = 8_000;

// ─── Provider ────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  // Refs for cooldown / request locking (stable across renders)
  const cooldownIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isSendingRef = useRef(false);

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

  // ─── Auth Bootstrap (single useEffect, no refs) ─────────────────
  //
  // Architecture:
  //   Supabase v2 fires `INITIAL_SESSION` exactly once when the SDK
  //   finishes restoring (or failing to restore) a session from storage.
  //   We use that single event as our initialization signal.
  //   All subsequent events (SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED)
  //   update the user state normally.
  //
  //   A timeout ensures we never hang on the loading screen even if
  //   the SDK silently fails or the network is unreachable.
  //
  useEffect(() => {
    authLog('BOOT', 'Starting auth bootstrap');
    let disposed = false; // cleanup flag for this effect instance

    // Helper: process a session into user state
    const applySession = async (session: Session | null, label: string) => {
      if (disposed) return;
      if (session?.user) {
        authLog(label, { userId: session.user.id, email: session.user.email });
        const resolved = await resolveUser(session.user);
        if (!disposed) setUser(resolved);
      } else {
        authLog(label, 'No session');
        if (!disposed) setUser(null);
      }
    };

    // Helper: mark initialization complete (idempotent)
    const markReady = () => {
      if (disposed) return;
      setLoading(false);
      setInitialized(true);
      authLog('READY', 'Auth initialized');
    };

    // Safety timeout — if INITIAL_SESSION never fires, force ready state
    const timeout = setTimeout(() => {
      if (!disposed) {
        authLog('TIMEOUT', `Auth bootstrap timed out after ${INIT_TIMEOUT_MS}ms — forcing ready`);
        markReady();
      }
    }, INIT_TIMEOUT_MS);

    // Single onAuthStateChange listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      authLog('EVENT', { event, hasSession: !!session, userId: session?.user?.id });

      switch (event) {
        case 'INITIAL_SESSION': {
          // This is the primary initialization path.
          // It fires once when Supabase finishes restoring session from localStorage.
          await applySession(session, 'INITIAL_SESSION');
          clearTimeout(timeout);
          markReady();
          break;
        }
        case 'SIGNED_IN': {
          await applySession(session, 'SIGNED_IN');
          // Ensure initialized in case INITIAL_SESSION was somehow missed
          if (!disposed) { setLoading(false); setInitialized(true); }
          break;
        }
        case 'TOKEN_REFRESHED': {
          await applySession(session, 'TOKEN_REFRESHED');
          break;
        }
        case 'SIGNED_OUT': {
          if (!disposed) { setUser(null); setLoading(false); setInitialized(true); }
          authLog('SIGNED_OUT', 'Session cleared by server/client');
          break;
        }
        default:
          authLog('UNHANDLED', event);
      }
    });

    return () => {
      disposed = true;
      clearTimeout(timeout);
      subscription.unsubscribe();
      authLog('CLEANUP', 'Auth listener unsubscribed');
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

  // ─── signOut ────────────────────────────────────────────────────
  const signOut = useCallback(async () => {
    authLog('SIGNOUT_START', 'Clearing session');
    // Clear UI state immediately — don't wait for Supabase round-trip
    setUser(null);

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
  return (
    <AuthContext.Provider value={{ user, loading, initialized, sendMagicLink, signOut, cooldownRemaining }}>
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