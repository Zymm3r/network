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
      if (event === 'SIGNED_IN' && session?.user) {
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

  const signUp = useCallback(async (email: string, password: string, options?: {
    fullNameTh?: string;
    fullNameEn?: string;
  }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name_th: options?.fullNameTh || '',
          full_name_en: options?.fullNameEn || '',
        },
      },
    });

    if (error) throw error;
    return data;
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
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
    signUp,
    signIn,
    signOut,
  };
}