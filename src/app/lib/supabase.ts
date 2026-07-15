import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const isConfigured = supabaseUrl && supabaseAnonKey;

if (!isConfigured) {
  console.warn('Supabase credentials not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.');
}

// Mock client that logs when methods are called without real credentials
const createMockClient = () => new Proxy({} as ReturnType<typeof createClient>, {
  get: (_target, prop) => {
    if (prop === 'then' || prop === 'catch') return undefined;
    return () => {
      console.warn(`Supabase not configured: called supabase.${String(prop)}(). Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env`);
      return Promise.resolve({ data: null, error: { message: 'Supabase not configured', code: 'NOT_CONFIGURED' } });
    };
  },
});

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  : createMockClient();
