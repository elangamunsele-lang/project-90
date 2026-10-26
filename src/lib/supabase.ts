import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(url && anonKey);

// Public anon-key client only; the service-role key is never used in the frontend.
// Null when env vars are missing so the rest of the site still renders.
export const supabase = isSupabaseConfigured
  ? createClient(url as string, anonKey as string, { auth: { persistSession: false } })
  : null;
