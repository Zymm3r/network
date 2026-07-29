import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../../infrastructure/supabase/database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.');
}

export const typedSupabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Session persists for 3 days (259200 seconds)
    // Supabase handles this via the JWT expiry on the server side,
    // but we configure the client to auto-refresh within this window.
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,  // Required for magic link token detection
  },
});

// Legacy adapters retain their domain models while sharing the typed runtime client.
export const supabase: SupabaseClient<any, any, any> = typedSupabase;
