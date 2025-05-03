-- ENUM TYPES
CREATE TYPE skill_type_enum AS ENUM ('AKSI', 'REAKSI', 'EFEK');
CREATE TYPE game_status_enum AS ENUM ('OPEN', 'PLAYING', 'VOTING', 'DONE');
CREATE TYPE action_type_enum AS ENUM ('VIEW_MISI', 'SWAP_MISI', 'MODIFY_VOTE', 'SWAP_NIAT', 'CANCEL_SKILL', 'VIEW_NIAT', 'SHIFT_MISI', 'COPY_SKILL', 'SHUFFLE_MISI', 'ASSIGN_CLIENT');
CREATE TYPE action_target_enum AS ENUM ('ADJACENT_PLAYERS', 'ANY_PLAYER', 'ALL_PLAYERS', 'CAPRES_NIAT', 'SELF', 'SPECIFIC_PERAN', 'CLIENT');
CREATE TYPE action_effect_enum AS ENUM ('VOTE_MULTIPLIER', 'SKILL_CANCELLATION', 'CONDITIONAL_TRIGGER', 'REVEAL_MISI', 'SYNC_MISI');

-- USERS
CREATE TABLE m_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL, -- Unique user identifier
    name VARCHAR(50) NOT NULL, -- User's display name
    email VARCHAR(50) NOT NULL, -- User's email address
    device VARCHAR(50) NOT NULL, -- Device identifier
    created_at TIMESTAMP DEFAULT now() NOT NULL, -- Record creation timestamp
    updated_at TIMESTAMP DEFAULT now() NOT NULL -- Last update timestamp
);
COMMENT ON COLUMN m_users.id IS 'Unique user identifier';
COMMENT ON COLUMN m_users.name IS 'User''s display name';
COMMENT ON COLUMN m_users.email IS 'User''s email address';
COMMENT ON COLUMN m_users.device IS 'Device identifier';
COMMENT ON COLUMN m_users.created_at IS 'Record creation timestamp';
COMMENT ON COLUMN m_users.updated_at IS 'Last update timestamp';
CREATE UNIQUE INDEX idx_m_users_email ON m_users(email);

-- ROOMS
CREATE TABLE t_rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL, -- Unique room identifier
    code VARCHAR(50) NOT NULL, -- Room code
    owner UUID NOT NULL REFERENCES m_users(id) ON DELETE CASCADE, -- User ID of the room owner
    status BOOLEAN DEFAULT TRUE NOT NULL, -- Room status (active/inactive)
    created_at TIMESTAMP DEFAULT now() NOT NULL, -- Record creation timestamp
    updated_at TIMESTAMP DEFAULT now() NOT NULL -- Last update timestamp
);
COMMENT ON COLUMN t_rooms.id IS 'Unique room identifier';
COMMENT ON COLUMN t_rooms.code IS 'Room code';
COMMENT ON COLUMN t_rooms.owner IS 'User ID of the room owner';
COMMENT ON COLUMN t_rooms.status IS 'Room status (active/inactive)';
COMMENT ON COLUMN t_rooms.created_at IS 'Record creation timestamp';
COMMENT ON COLUMN t_rooms.updated_at IS 'Last update timestamp';
CREATE UNIQUE INDEX idx_t_rooms_code ON t_rooms(code);
CREATE INDEX idx_t_rooms_owner ON t_rooms(owner);

-- ROOM LEADERBOARD
CREATE TABLE t_room_leaderboard (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL, -- Unique leaderboard entry ID
    room_id UUID NOT NULL REFERENCES t_rooms(id) ON DELETE CASCADE, -- Associated room ID
    user_id UUID NOT NULL REFERENCES m_users(id) ON DELETE CASCADE, -- Associated user ID
    point INTEGER DEFAULT 0 NOT NULL, -- Points earned
    created_at TIMESTAMP DEFAULT now() NOT NULL, -- Record creation timestamp
    updated_at TIMESTAMP DEFAULT now() NOT NULL -- Last update timestamp
);
COMMENT ON COLUMN t_room_leaderboard.id IS 'Unique leaderboard entry ID';
COMMENT ON COLUMN t_room_leaderboard.room_id IS 'Associated room ID';
COMMENT ON COLUMN t_room_leaderboard.user_id IS 'Associated user ID';
COMMENT ON COLUMN t_room_leaderboard.point IS 'Points earned';
COMMENT ON COLUMN t_room_leaderboard.created_at IS 'Record creation timestamp';
COMMENT ON COLUMN t_room_leaderboard.updated_at IS 'Last update timestamp';
CREATE INDEX idx_t_room_leaderboard_room_id ON t_room_leaderboard(room_id);
CREATE INDEX idx_t_room_leaderboard_user_id ON t_room_leaderboard(user_id);

-- ROLES
CREATE TABLE m_peran (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL, -- Unique role identifier
    name VARCHAR(50) NOT NULL, -- Role name
    image TEXT NOT NULL, -- Role image URL or path
    playable BOOLEAN DEFAULT TRUE NOT NULL, -- Is this role playable?
    must_played BOOLEAN DEFAULT FALSE NOT NULL, -- Must this role always be played?
    must_played_when_even_player BOOLEAN DEFAULT FALSE NOT NULL, -- Must be played if player count is even
    is_back BOOLEAN DEFAULT FALSE NOT NULL, -- Is this role is back cover
    created_at TIMESTAMP DEFAULT now() NOT NULL, -- Record creation timestamp
    updated_at TIMESTAMP DEFAULT now() NOT NULL -- Last update timestamp
);
COMMENT ON COLUMN m_peran.id IS 'Unique role identifier';
COMMENT ON COLUMN m_peran.name IS 'Role name';
COMMENT ON COLUMN m_peran.image IS 'Role image URL or path';
COMMENT ON COLUMN m_peran.playable IS 'Is this role playable?';
COMMENT ON COLUMN m_peran.must_played IS 'Must this role always be played?';
COMMENT ON COLUMN m_peran.must_played_when_even_player IS 'Must be played if player count is even';
COMMENT ON COLUMN m_peran.is_back IS 'Is this role is back cover';
COMMENT ON COLUMN m_peran.created_at IS 'Record creation timestamp';
COMMENT ON COLUMN m_peran.updated_at IS 'Last update timestamp';
CREATE UNIQUE INDEX idx_m_peran_name ON m_peran(name);

-- SKILLS
CREATE TABLE m_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL, -- Unique skill identifier
    label TEXT NOT NULL, -- Human-readable skill label
    type skill_type_enum NOT NULL, -- Skill type (AKSI, REAKSI, EFEK)
    peran_id UUID NOT NULL REFERENCES m_peran(id) ON DELETE CASCADE, -- Associated role ID
    limit_can_used INTEGER DEFAULT 0 NOT NULL, -- Usage limit
    action_type action_type_enum NOT NULL, -- Programmatic action type
    action_target action_target_enum NOT NULL, -- Target of the action
    action_effect action_effect_enum NULL, -- Effect of the action
    action_value JSONB NULL, -- Additional action parameters in JSON format
    created_at TIMESTAMP DEFAULT now() NOT NULL, -- Record creation timestamp
    updated_at TIMESTAMP DEFAULT now() NOT NULL, -- Last update timestamp
    CONSTRAINT unique_skill_per_role UNIQUE (peran_id, type, action_type) -- Unique constraint for skills per role
);
COMMENT ON COLUMN m_skills.id IS 'Unique skill identifier';
COMMENT ON COLUMN m_skills.label IS 'Human-readable skill label';
COMMENT ON COLUMN m_skills.type IS 'Skill type (AKSI, REAKSI, EFEK)';
COMMENT ON COLUMN m_skills.peran_id IS 'Associated role ID';
COMMENT ON COLUMN m_skills.limit_can_used IS 'Usage limit';
COMMENT ON COLUMN m_skills.action_type IS 'Programmatic action type';
COMMENT ON COLUMN m_skills.action_target IS 'Target of the action';
COMMENT ON COLUMN m_skills.action_effect IS 'Effect of the action';
COMMENT ON COLUMN m_skills.action_value IS 'Additional action parameters';
COMMENT ON COLUMN m_skills.created_at IS 'Record creation timestamp';
COMMENT ON COLUMN m_skills.updated_at IS 'Last update timestamp';
CREATE INDEX idx_m_skills_peran_id ON m_skills(peran_id);

-- INTENTS
CREATE TABLE m_niat (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL, -- Unique intent identifier
    name VARCHAR(50) NOT NULL, -- Intent name
    image TEXT NOT NULL, -- Intent image URL or path
    is_back BOOLEAN DEFAULT FALSE NOT NULL, -- Is this intent is back cover
    created_at TIMESTAMP DEFAULT now() NOT NULL, -- Record creation timestamp
    updated_at TIMESTAMP DEFAULT now() NOT NULL -- Last update timestamp
);
COMMENT ON COLUMN m_niat.id IS 'Unique intent identifier';
COMMENT ON COLUMN m_niat.name IS 'Intent name';
COMMENT ON COLUMN m_niat.image IS 'Intent image URL or path';
COMMENT ON COLUMN m_niat.is_back IS 'Is this intent is back cover';
COMMENT ON COLUMN m_niat.created_at IS 'Record creation timestamp';
COMMENT ON COLUMN m_niat.updated_at IS 'Last update timestamp';
CREATE UNIQUE INDEX idx_m_niat_name ON m_niat(name);

-- MISSIONS
CREATE TABLE m_misi (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL, -- Unique mission identifier
    name VARCHAR(50) NOT NULL, -- Mission name
    image VARCHAR(50) NOT NULL, -- Mission image URL or path
    point INTEGER DEFAULT 0 NOT NULL, -- Mission point value
    win_on_peran_id UUID NULL REFERENCES m_peran(id) ON DELETE SET NULL, -- Role ID required to win (nullable)
    win_on_niat_id UUID NULL REFERENCES m_niat(id) ON DELETE SET NULL, -- Intent ID required to win (nullable)
    playable BOOLEAN DEFAULT TRUE NOT NULL, -- Is this mission playable?
    must_played BOOLEAN DEFAULT FALSE NOT NULL, -- Must this mission always be played?
    can_be_played_when_player_get INTEGER NULL, -- Can be played if player count is reach this number
    is_back BOOLEAN DEFAULT FALSE NOT NULL, -- Is this mission is back cover
    created_at TIMESTAMP DEFAULT now() NOT NULL, -- Record creation timestamp
    updated_at TIMESTAMP DEFAULT now() NOT NULL -- Last update timestamp
);
COMMENT ON COLUMN m_misi.id IS 'Unique mission identifier';
COMMENT ON COLUMN m_misi.name IS 'Mission name';
COMMENT ON COLUMN m_misi.image IS 'Mission image URL or path';
COMMENT ON COLUMN m_misi.point IS 'Mission point value';
COMMENT ON COLUMN m_misi.win_on_peran_id IS 'Role ID required to win (nullable)';
COMMENT ON COLUMN m_misi.win_on_niat_id IS 'Intent ID required to win (nullable)';
COMMENT ON COLUMN m_misi.playable IS 'Is this mission playable?';
COMMENT ON COLUMN m_misi.must_played IS 'Must this mission always be played?';
COMMENT ON COLUMN m_misi.can_be_played_when_player_get IS 'Can be played if player count is reach this number';
COMMENT ON COLUMN m_misi.is_back IS 'Is this mission is back cover';
COMMENT ON COLUMN m_misi.created_at IS 'Record creation timestamp';
COMMENT ON COLUMN m_misi.updated_at IS 'Last update timestamp';
CREATE INDEX idx_m_misi_win_on_peran_id ON m_misi(win_on_peran_id);
CREATE INDEX idx_m_misi_win_on_niat_id ON m_misi(win_on_niat_id);

-- GAME SETTINGS
CREATE TABLE t_game_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL, -- Unique game setting identifier
    room_id UUID NOT NULL REFERENCES t_rooms(id) ON DELETE CASCADE, -- Associated room ID
    selected_peran VARCHAR(50)[] NOT NULL, -- Selected roles (array)
    elected_niat UUID NULL REFERENCES m_niat(id) ON DELETE SET NULL, -- Elected intent (nullable)
    status game_status_enum DEFAULT 'OPEN' NOT NULL, -- Game status
    created_at TIMESTAMP DEFAULT now() NOT NULL, -- Record creation timestamp
    updated_at TIMESTAMP DEFAULT now() NOT NULL -- Last update timestamp
);
COMMENT ON COLUMN t_game_settings.id IS 'Unique game setting identifier';
COMMENT ON COLUMN t_game_settings.room_id IS 'Associated room ID';
COMMENT ON COLUMN t_game_settings.selected_peran IS 'Selected roles (array)';
COMMENT ON COLUMN t_game_settings.elected_niat IS 'Elected intent (nullable)';
COMMENT ON COLUMN t_game_settings.status IS 'Game status';
COMMENT ON COLUMN t_game_settings.created_at IS 'Record creation timestamp';
COMMENT ON COLUMN t_game_settings.updated_at IS 'Last update timestamp';
CREATE INDEX idx_t_game_settings_room_id ON t_game_settings(room_id);

-- PLAYERS
CREATE TABLE t_players (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL, -- Unique player identifier
    user_id UUID NOT NULL REFERENCES m_users(id) ON DELETE CASCADE, -- Associated user ID
    game_setting_id UUID NOT NULL REFERENCES t_game_settings(id) ON DELETE CASCADE, -- Associated game setting ID
    color VARCHAR(50) NOT NULL, -- Player color
    seat_order INTEGER DEFAULT 0 NOT NULL, -- Player seat order
    peran_id UUID NOT NULL REFERENCES m_peran(id) ON DELETE CASCADE, -- Role ID
    misi_id UUID NOT NULL REFERENCES m_misi(id) ON DELETE CASCADE, -- Mission ID
    used_skill INTEGER DEFAULT 0 NOT NULL, -- Number of skills used
    client_id UUID NULL REFERENCES t_players(id) ON DELETE SET NULL, -- Client ID (nullable)
    created_at TIMESTAMP DEFAULT now() NOT NULL, -- Record creation timestamp
    updated_at TIMESTAMP DEFAULT now() NOT NULL -- Last update timestamp
);
COMMENT ON COLUMN t_players.id IS 'Unique player identifier';
COMMENT ON COLUMN t_players.user_id IS 'Associated user ID';
COMMENT ON COLUMN t_players.game_setting_id IS 'Associated game setting ID';
COMMENT ON COLUMN t_players.color IS 'Player color';
COMMENT ON COLUMN t_players.seat_order IS 'Player seat order';
COMMENT ON COLUMN t_players.peran_id IS 'Role ID';
COMMENT ON COLUMN t_players.misi_id IS 'Mission ID';
COMMENT ON COLUMN t_players.used_skill IS 'Number of skills used';
COMMENT ON COLUMN t_players.client_id IS 'Role ID of "PENGACARA" client';
COMMENT ON COLUMN t_players.created_at IS 'Record creation timestamp';
COMMENT ON COLUMN t_players.updated_at IS 'Last update timestamp';
CREATE INDEX idx_t_players_user_id ON t_players(user_id);
CREATE INDEX idx_t_players_game_setting_id ON t_players(game_setting_id);
CREATE INDEX idx_t_players_peran_id ON t_players(peran_id);
CREATE INDEX idx_t_players_misi_id ON t_players(misi_id);
CREATE INDEX idx_t_players_client_id ON t_players(client_id);

-- GAME PERAN SETTINGS
CREATE TABLE t_game_peran_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL, -- Unique game-role setting identifier
    game_setting_id UUID NOT NULL REFERENCES t_game_settings(id) ON DELETE CASCADE, -- Associated game setting ID
    peran_id UUID NOT NULL REFERENCES m_peran(id) ON DELETE CASCADE, -- Role ID
    is_mandatory BOOLEAN DEFAULT FALSE NOT NULL, -- Is this role mandatory?
    created_at TIMESTAMP DEFAULT now() NOT NULL, -- Record creation timestamp
    updated_at TIMESTAMP DEFAULT now() NOT NULL -- Last update timestamp
);
COMMENT ON COLUMN t_game_peran_settings.id IS 'Unique game-role setting identifier';
COMMENT ON COLUMN t_game_peran_settings.game_setting_id IS 'Associated game setting ID';
COMMENT ON COLUMN t_game_peran_settings.peran_id IS 'Role ID';
COMMENT ON COLUMN t_game_peran_settings.is_mandatory IS 'Is this role mandatory?';
COMMENT ON COLUMN t_game_peran_settings.created_at IS 'Record creation timestamp';
COMMENT ON COLUMN t_game_peran_settings.updated_at IS 'Last update timestamp';
CREATE INDEX idx_t_game_peran_settings_game_setting_id ON t_game_peran_settings(game_setting_id);
CREATE INDEX idx_t_game_peran_settings_peran_id ON t_game_peran_settings(peran_id);


-- GAME MISI SETTINGS
CREATE TABLE t_game_misi_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL, -- Unique game-mission setting identifier
    game_setting_id UUID NOT NULL REFERENCES t_game_settings(id) ON DELETE CASCADE, -- Associated game setting ID
    misi_id UUID NOT NULL REFERENCES m_misi(id) ON DELETE CASCADE, -- Mission ID
    max_assign INTEGER DEFAULT 1 NOT NULL, -- Maximum limit mission can assign to player
    created_at TIMESTAMP DEFAULT now() NOT NULL, -- Record creation timestamp
    updated_at TIMESTAMP DEFAULT now() NOT NULL -- Last update timestamp
);

COMMENT ON COLUMN t_game_misi_settings.id IS 'Unique game-mission setting identifier';
COMMENT ON COLUMN t_game_misi_settings.game_setting_id IS 'Associated game setting ID';
COMMENT ON COLUMN t_game_misi_settings.misi_id IS 'Mission ID';
COMMENT ON COLUMN t_game_misi_settings.max_assign IS 'Maximum limit mission can assign to player';
COMMENT ON COLUMN t_game_misi_settings.created_at IS 'Record creation timestamp';
COMMENT ON COLUMN t_game_misi_settings.updated_at IS 'Last update timestamp';
CREATE INDEX idx_t_game_misi_settings_game_setting_id ON t_game_misi_settings(game_setting_id);
CREATE INDEX idx_t_game_misi_settings_misi_id ON t_game_misi_settings(misi_id);

-- GAME NIAT
CREATE TABLE t_niat (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL, -- Unique game-intent identifier
    game_setting_id UUID NOT NULL REFERENCES t_game_settings(id) ON DELETE CASCADE, -- Associated game setting ID
    peran_id UUID NOT NULL REFERENCES m_peran(id) ON DELETE CASCADE, -- Role ID
    niat_id UUID NOT NULL REFERENCES m_niat(id) ON DELETE CASCADE, -- Intent ID
    created_at TIMESTAMP DEFAULT now() NOT NULL, -- Record creation timestamp
    updated_at TIMESTAMP DEFAULT now() NOT NULL -- Last update timestamp
);
COMMENT ON COLUMN t_niat.id IS 'Unique game-intent identifier';
COMMENT ON COLUMN t_niat.game_setting_id IS 'Associated game setting ID';
COMMENT ON COLUMN t_niat.peran_id IS 'Role ID';
COMMENT ON COLUMN t_niat.niat_id IS 'Intent ID';
COMMENT ON COLUMN t_niat.created_at IS 'Record creation timestamp';
COMMENT ON COLUMN t_niat.updated_at IS 'Last update timestamp';
CREATE INDEX idx_t_niat_game_setting_id ON t_niat(game_setting_id);
CREATE INDEX idx_t_niat_peran_id ON t_niat(peran_id);
CREATE INDEX idx_t_niat_niat_id ON t_niat(niat_id);

-- VOTING
CREATE TABLE t_voting (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL, -- Unique voting identifier
    game_setting_id UUID NOT NULL REFERENCES t_game_settings(id) ON DELETE CASCADE, -- Associated game setting ID
    user_id UUID NOT NULL REFERENCES m_users(id) ON DELETE CASCADE, -- User who voted
    vote_for UUID NOT NULL REFERENCES t_players(id) ON DELETE CASCADE, -- User or player voted for
    created_at TIMESTAMP DEFAULT now() NOT NULL, -- Record creation timestamp
    updated_at TIMESTAMP DEFAULT now() NOT NULL -- Last update timestamp
);
COMMENT ON COLUMN t_voting.id IS 'Unique voting identifier';
COMMENT ON COLUMN t_voting.game_setting_id IS 'Associated game setting ID';
COMMENT ON COLUMN t_voting.user_id IS 'User who voted';
COMMENT ON COLUMN t_voting.vote_for IS 'User or player voted for';
COMMENT ON COLUMN t_voting.created_at IS 'Record creation timestamp';
COMMENT ON COLUMN t_voting.updated_at IS 'Last update timestamp';
CREATE INDEX idx_t_voting_game_setting_id ON t_voting(game_setting_id);
CREATE INDEX idx_t_voting_user_id ON t_voting(user_id);
CREATE INDEX idx_t_voting_vote_for ON t_voting(vote_for);

-- ROOM LOGS
CREATE TABLE h_room_logs (
    id SERIAL PRIMARY KEY, -- Unique log identifier
    user_id UUID NOT NULL REFERENCES m_users(id) ON DELETE CASCADE, -- User who performed the action
    room_id UUID NOT NULL REFERENCES t_rooms(id) ON DELETE CASCADE, -- Room where the action occurred
    narration TEXT NOT NULL, -- Log narration
    created_at TIMESTAMP DEFAULT now() NOT NULL, -- Record creation timestamp
    updated_at TIMESTAMP DEFAULT now() NOT NULL -- Last update timestamp
);
COMMENT ON COLUMN h_room_logs.id IS 'Unique log identifier';
COMMENT ON COLUMN h_room_logs.user_id IS 'User who performed the action';
COMMENT ON COLUMN h_room_logs.room_id IS 'Room where the action occurred';
COMMENT ON COLUMN h_room_logs.narration IS 'Log narration';
COMMENT ON COLUMN h_room_logs.created_at IS 'Record creation timestamp';
COMMENT ON COLUMN h_room_logs.updated_at IS 'Last update timestamp';
CREATE INDEX idx_h_room_logs_user_id ON h_room_logs(user_id);
CREATE INDEX idx_h_room_logs_room_id ON h_room_logs(room_id);

-- GAME LOGS
CREATE TABLE h_game_logs (
    id SERIAL PRIMARY KEY, -- Unique game log identifier
    game_setting_id UUID NOT NULL REFERENCES t_game_settings(id) ON DELETE CASCADE, -- Associated game setting ID
    player_id UUID NOT NULL REFERENCES t_players(id) ON DELETE CASCADE, -- Player involved in the log
    narration TEXT NOT NULL, -- Log narration
    created_at TIMESTAMP DEFAULT now() NOT NULL, -- Record creation timestamp
    updated_at TIMESTAMP DEFAULT now() NOT NULL -- Last update timestamp
);
COMMENT ON COLUMN h_game_logs.id IS 'Unique game log identifier';
COMMENT ON COLUMN h_game_logs.game_setting_id IS 'Associated game setting ID';
COMMENT ON COLUMN h_game_logs.player_id IS 'Player involved in the log';
COMMENT ON COLUMN h_game_logs.narration IS 'Log narration';
COMMENT ON COLUMN h_game_logs.created_at IS 'Record creation timestamp';
COMMENT ON COLUMN h_game_logs.updated_at IS 'Last update timestamp';
CREATE INDEX idx_h_game_logs_game_setting_id ON h_game_logs(game_setting_id);
CREATE INDEX idx_h_game_logs_player_id ON h_game_logs(player_id); 