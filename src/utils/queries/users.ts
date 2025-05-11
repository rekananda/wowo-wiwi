import { supabase } from '@/config/supabase/supabaseClient';
import { BaseUserI } from '@/types/database';
import { SupabaseResponse } from '@/types/supabase';

export const getUserbyDeviceId = async (deviceId: string): Promise<SupabaseResponse<BaseUserI>> => {
  const { data: existingUser, error: getError } = await supabase
    .from('m_users')
    .select('*')
    .eq('device', deviceId)
    .single();
  
  if (getError?.code === 'PGRST116') {
    const { data: newUser, error: createError } = await supabase
      .from('m_users')
      .insert([
        {
          name: `Player-${deviceId.slice(0, 8)}`,
          device: deviceId
        }
      ])
      .select()
      .single();
    
    return { data: newUser, error: createError };
  }
  
  return { data: existingUser, error: getError };
};