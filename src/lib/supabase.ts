import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = (typeof window === 'undefined')
  ? process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
  : (import.meta.env.VITE_SUPABASE_URL as string | undefined);

const SUPABASE_ANON_KEY = (typeof window === 'undefined')
  ? process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY
  : (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined);

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('Supabase environment variables are not set.');
}

export const supabase = createClient(SUPABASE_URL || '', SUPABASE_ANON_KEY || '');

export default supabase;
