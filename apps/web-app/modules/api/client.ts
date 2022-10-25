import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import { Database } from '../../types/database';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
);
