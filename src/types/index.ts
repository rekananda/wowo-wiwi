import { BaseHTMLAttributes, ReactNode } from "react";
import { BaseGameIntentI, BaseGameMissionSettingsI, BaseGameRoleSettingsI, BaseGameSettingsI, BasePlayerI, BaseRoomI, BaseUserI, BaseVotingI } from "./database";

export type PropBaseT<T = any> = {
  className?: string;
  children?: ReactNode;
  ref?: any;
} & Partial<BaseHTMLAttributes<T>>

export type UserInfoT = {
  user: BaseUserI;
  isPlaying: boolean;
  roomInfo?: BaseRoomI;
}

export type GameInfoT = {
  t_players: BasePlayerI[];
  t_game_role_settings: BaseGameRoleSettingsI[];
  t_game_missions: BaseGameMissionSettingsI[];
  t_game_intents: BaseGameIntentI[];
  t_game_votings: BaseVotingI[];
} & BaseGameSettingsI

export type RoomInfoT = {
  t_game_settings: GameInfoT[];
} & BaseRoomI