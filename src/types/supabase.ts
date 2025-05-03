export type SkillType = 'AKSI' | 'REAKSI' | 'EFEK';

export interface Skill {
  id: string;
  label: string;
  type: SkillType;
}

export interface Role {
  id: string;
  name: string;
  image: string;
  playable: boolean;
  must_played: boolean;
  must_played_when_even_player: boolean;
  is_back: boolean;
  created_at: string;
  updated_at: string;
  m_skills: Skill[];
}

export interface SupabaseResponse<T> {
  data: T | null;
  error: Error | null;
} 