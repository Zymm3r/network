import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  loading: boolean;
  initialized: boolean;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    initialized: false,
  });

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
          const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();

          setState({
            user: profile || {
              id: session.user.id,
              email: session.user.email || '',
              full_name_th: session.user.user_metadata?.full_name_th || null,
              full_name_en: session.user.user_metadata?.full_name_en || null,
              avatar_url: session.user.user_metadata?.avatar_url || null,
              role: 'student',
              created_at: new Date().toISOString(),
            },
            loading: false,
            initialized: true,
          });
        } else {
          setState({ user: null, loading: false, initialized: true });
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setState({ user: null, loading: false, initialized: true });
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session?.user) {
        const { data: profile } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        setState({
          user: profile || {
            id: session.user.id,
            email: session.user.email || '',
            full_name_th: session.user.user_metadata?.full_name_th || null,
            full_name_en: session.user.user_metadata?.full_name_en || null,
            avatar_url: session.user.user_metadata?.avatar_url || null,
            role: 'student',
            created_at: new Date().toISOString(),
          },
          loading: false,
          initialized: true,
        });
      } else if (event === 'SIGNED_OUT') {
        setState({ user: null, loading: false, initialized: true });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  /**
   * Send a magic link to the user's email.
   * - First-time users: automatically signs them up and sends a magic link.
   * - Returning users: sends a magic link for login.
   * No password is ever stored or required.
   */
  const sendMagicLink = useCallback(async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // Redirect back to the app after clicking the magic link
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setState({ user: null, loading: false, initialized: true });
  }, []);

  return {
    user: state.user,
    loading: state.loading,
    initialized: state.initialized,
    sendMagicLink,
    signOut,
  };
}