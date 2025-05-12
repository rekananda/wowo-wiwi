import { supabase } from '@/config/supabase/supabaseClient';
import { UserInfoT } from '@/types';
import { BaseUserI } from '@/types/database';
import { SupabaseResponse } from '@/types/supabase';

export const getUserbyDeviceId = async (deviceId: string): Promise<SupabaseResponse<UserInfoT>> => {
  let result: SupabaseResponse<UserInfoT> = { data: null, error: null };
  let dataUser: BaseUserI|null = null;

  const { data: existingUser, error: userError } = await supabase
    .from('m_users')
    .select('*')
    .eq('device', deviceId)
    .single();
  
  if (userError?.code === 'PGRST116') {
    // create user if device id dont registered before
    const { data: newUser, error: createError } = await supabase
      .from('m_users')
      .insert([
        {
          name: `Player-${deviceId}`,
          device: deviceId
        }
      ])
      .select()
      .single();
    if (createError) {
      result.error = createError;
    } else {
      dataUser = newUser;
    }
  } else if (userError) {
    result.error = userError;
    return result;
  } else {
    dataUser = existingUser;
  }

  if (dataUser){
    // check if user is playing in a game
    const { data: playerGame, error: playerError } = await supabase
      .from('t_players')
      .select(`
        *,
        t_game_settings:game_setting_id (*, t_rooms:room_id (*))
      `)
      .eq('user_id', dataUser.id)
      .order('created_at', { ascending: false })
      .single();
    
    if (playerError?.code === 'PGRST116'){
      result.data = {
        user: dataUser,
        isPlaying: false,
      }
    } else if (playerError) {
      result.error = playerError;
    } else if (playerGame) {
      result.data = {
        user: dataUser,
        isPlaying: playerGame.t_game_settings[0].status !== 'OPEN' || playerGame.t_game_settings[0].status !== 'PLAYING',
        roomInfo: playerGame?.t_game_settings[0].t_rooms[0],
      }
    }
  }

  return result;
};