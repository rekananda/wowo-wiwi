export type SkillTypeT = 'AKSI' | 'REAKSI' | 'EFEK';
export type GameStatusT = 'OPEN' | 'PLAYING' | 'VOTING' | 'DONE';
export type ActionTypeT = 'VIEW_MISI' | 'SWAP_MISI' | 'MODIFY_VOTE' | 'SWAP_NIAT' | 'CANCEL_SKILL' | 'VIEW_NIAT' | 'SHIFT_MISI' | 'COPY_SKILL' | 'SHUFFLE_MISI' | 'ASSIGN_CLIENT';
export type ActionTargetT = 'ADJACENT_PLAYERS' | 'ANY_PLAYER' | 'ALL_PLAYERS' | 'CAPRES_NIAT' | 'SELF' | 'SPECIFIC_PERAN' | 'CLIENT';
export type ActionEffectT = 'VOTE_MULTIPLIER' | 'SKILL_CANCELLATION' | 'CONDITIONAL_TRIGGER' | 'REVEAL_MISI' | 'SYNC_MISI';
export type ActionConditionT = 'CHOOSE_DIRECTION' | 'CHOOSE_PLAYER' | 'SKILL_TYPE' | 'SKILL_AKSI' | 'SKILL_REAKSI' | 'NEED_CONFIRMATION' | 'AFTER_VOTE' | 'VOTE_WINNING' | 'HAS_SKILL_TYPE' | 'PLAYER_ORDER' | 'ADJACENT_PERAN' | 'PLAYER_MISI' | 'TARGETED_TO_CLIENT';
export type ActionValueT = {
  multiplier?: number;
  condition?: ActionConditionT[];
  need_input?: boolean;
  misi_target?: string;
  peran_target?: string;
  [key: string]: any;
}

export interface BaseUserI {
  id: string;
  name: string;
  email: string|null;
  device: string;
  created_at: string;
  updated_at: string;
}

export interface BaseRoomI {
  id: string;
  code: string;
  owner: string;
  status: boolean;
  created_at: string;
  updated_at: string;
}

export interface BaseRoomLeaderboardI {
  id: string;
  room_id: string;
  user_id: string;
  point: number;
  created_at: string;
  updated_at: string;
}

export interface BasePeranI {
  id: string;
  name: string;
  image: string;
  playable: boolean;
  must_played: boolean;
  must_played_when_even_player: boolean;
  is_back: boolean;
  created_at: string;
  updated_at: string;
}

export interface BaseSkillI {
  id: string;
  label: string;
  type: SkillTypeT;
  peran_id: string;
  limit_can_used: number;
  action_type: ActionTypeT;
  action_target: ActionTargetT;
  action_effect: ActionEffectT | null;
  action_value: ActionValueT | null;
  created_at: string;
  updated_at: string;
}

export interface BaseNiatT {
  id: string;
  name: string;
  image: string;
  is_back: boolean;
  created_at: string;
  updated_at: string;
}

export interface BaseMisiI {
  id: string;
  name: string;
  image: string;
  point: number;
  win_on_peran_id: string | null;
  win_on_niat_id: string | null;
  playable: boolean;
  must_played: boolean;
  can_be_played_when_player_get: number | null;
  is_back: boolean;
  created_at: string;
  updated_at: string;
}

export interface BaseGameSettingsI {
  id: string;
  room_id: string;
  selected_peran: string[];
  elected_niat: string | null;
  status: GameStatusT;
  created_at: string;
  updated_at: string;
}

export interface BasePlayerI {
  id: string;
  user_id: string;
  game_setting_id: string;
  color: string;
  seat_order: number;
  peran_id: string;
  misi_id: string;
  used_skill: number;
  client_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface BaseGameRoleSettingsI {
  id: string;
  game_setting_id: string;
  peran_id: string;
  is_mandatory: boolean;
  created_at: string;
  updated_at: string;
}

export interface BaseGameMissionSettingsI {
  id: string;
  game_setting_id: string;
  misi_id: string;
  max_assign: number;
  created_at: string;
  updated_at: string;
}

export interface BaseGameIntentI {
  id: string;
  game_setting_id: string;
  peran_id: string;
  niat_id: string;
  created_at: string;
  updated_at: string;
}

export interface BaseVotingI {
  id: string;
  game_setting_id: string;
  user_id: string;
  vote_for: string;
  created_at: string;
  updated_at: string;
}

export interface BaseRoomLogI {
  id: number;
  user_id: string;
  room_id: string;
  narration: string;
  created_at: string;
  updated_at: string;
}

export interface BaseGameLogI {
  id: number;
  game_setting_id: string;
  player_id: string;
  narration: string;
  created_at: string;
  updated_at: string;
} 