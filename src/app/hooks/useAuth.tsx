import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '../types';

// ─── Debug Logger ────────────────────────────────────────────────────
const AUTH_DEBUG = import.meta.env.DEV;

function authLog(event: string, detail?: any) {
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
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Helper: build User from Supabase session ───────────────────────
function buildUserFromSession(supabaseUser: { id: string; email?: string; user_metadata?: any }): User {
  return {
    id: supabaseUser.id,
    email: supabaseUser.email || '',
    full_name_th: supabaseUser.user_metadata?.full_name_th || null,
    full_name_en: supabaseUser.user_metadata?.full_name_en || null,
    avatar_url: supabaseUser.user_metadata?.avatar_url || null,
    role: 'student',
    created_at: new Date().toISOString(),
  };
}

async function resolveUser(supabaseUser: { id: string; email?: string; user_metadata?: any }): Promise<User> {
  try {
    const { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', supabaseUser.id)
      .single();

    return profile || buildUserFromSession(supabaseUser);
  } catch {
    // Table might not exist or RLS might block — fallback gracefully
    return buildUserFromSession(supabaseUser);
  }
}

// ─── Provider ────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  // Guard against double-init in StrictMode
  const initRef = useRef(false);
  // Track if component is still mounted to prevent setState on unmounted component
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    // Prevent double initialization in React 18 StrictMode
    if (initRef.current) return;
    initRef.current = true;

    authLog('INIT', 'Starting auth initialization');

    let subscription: { unsubscribe: () => void } | null = null;

    const initializeAuth = async () => {
      try {
        // Step 1: Restore session from storage
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          authLog('INIT_ERROR', error.message);
          if (mountedRef.current) {
            setUser(null);
            setLoading(false);
            setInitialized(true);
          }
          return;
        }

        if (session?.user) {
          authLog('SESSION_RESTORED', { userId: session.user.id, email: session.user.email });
          const resolvedUser = await resolveUser(session.user);
          if (mountedRef.current) {
            setUser(resolvedUser);
          }
        } else {
          authLog('NO_SESSION', 'No existing session found');
          if (mountedRef.current) {
            setUser(null);
          }
        }
      } catch (err) {
        authLog('INIT_CATCH', err);
        if (mountedRef.current) {
          setUser(null);
        }
      } finally {
        if (mountedRef.current) {
          setLoading(false);
          setInitialized(true);
        }
      }
    };

    // Step 2: Set up the SINGLE auth state change listener
    // Must be set up BEFORE getSession() to avoid missing events
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      authLog('AUTH_EVENT', { event, hasSession: !!session, userId: session?.user?.id });

      if (!mountedRef.current) return;

      switch (event) {
        case 'SIGNED_IN':
        case 'TOKEN_REFRESHED': {
          if (session?.user) {
            authLog(event === 'SIGNED_IN' ? 'LOGIN' : 'TOKEN_REFRESH', {
              userId: session.user.id,
              email: session.user.email,
            });
            const resolvedUser = await resolveUser(session.user);
            if (mountedRef.current) {
              setUser(resolvedUser);
              setLoading(false);
              setInitialized(true);
            }
          }
          break;
        }
        case 'SIGNED_OUT': {
          authLog('LOGOUT', 'Session cleared');
          if (mountedRef.current) {
            setUser(null);
            setLoading(false);
            setInitialized(true);
          }
          break;
        }
        case 'INITIAL_SESSION': {
          // This fires when getSession() completes on newer Supabase versions
          // We already handle this in initializeAuth, but ensure we don't flicker
          authLog('INITIAL_SESSION', { hasSession: !!session });
          break;
        }
        default:
          authLog('UNHANDLED_EVENT', event);
      }
    });

    subscription = data.subscription;

    // Start the async init
    initializeAuth();

    return () => {
      mountedRef.current = false;
      if (subscription) {
        authLog('CLEANUP', 'Unsubscribing auth listener');
        subscription.unsubscribe();
      }
    };
  }, []); // Empty deps — runs once

  const sendMagicLink = useCallback(async (email: string) => {
    authLog('MAGIC_LINK_SEND', { email });
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) {
        authLog('MAGIC_LINK_ERROR', error.message);
        throw error;
      }
      authLog('MAGIC_LINK_SENT', { email });
    } catch (err) {
      authLog('MAGIC_LINK_CATCH', err);
      throw err;
    }
  }, []);

  const signOut = useCallback(async () => {
    authLog('SIGNOUT_START', 'Clearing session...');
    try {
      // Clear local state FIRST to ensure UI reacts immediately
      setUser(null);

      // Then clear the Supabase session
      const { error } = await supabase.auth.signOut();
      if (error) {
        authLog('SIGNOUT_ERROR', error.message);
        // Even on error, keep user cleared to prevent stale re-login
      }

      // Belt-and-suspenders: clear any storage remnants
      try {
        const storageKey = `sb-${new URL(import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co').hostname.split('.')[0]}-auth-token`;
        localStorage.removeItem(storageKey);
      } catch {
        // Storage access might fail in some contexts
      }

      authLog('SIGNOUT_COMPLETE', 'Session fully cleared');
    } catch (err) {
      authLog('SIGNOUT_CATCH', err);
      // Ensure user is still cleared even if signOut throws
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, initialized, sendMagicLink, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Consumer Hook ───────────────────────────────────────────────────
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      'useAuth() must be used within an <AuthProvider>. ' +
      'Wrap your app with <AuthProvider> in App.tsx.'
    );
  }
  return context;
}