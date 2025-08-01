import { supabase } from '@/lib/supabase';

export async function fetchFromSupabase(tableName) {
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .order('id');

  if (error) {
    console.error(`❌ Error fetching from ${tableName}:`, error);
    return [];
  }

  return data;
}
