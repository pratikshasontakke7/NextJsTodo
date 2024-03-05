import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@/constants/envVars';
import { createClient } from '@supabase/supabase-js';


export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
