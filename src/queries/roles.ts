import { supabase } from '../config/supabase/supabaseClient';
import { Role, SupabaseResponse } from '../types/supabase';

export const getPlayableRoles = async (): Promise<SupabaseResponse<Role[]>> => {
  const { data, error } = await supabase
    .from('m_peran')
    .select(`
      *,
      m_skills (
        id,
        label,
        type
      )
    `)
    .eq('playable', true)
    .order('name');

  return { data, error };
}; 