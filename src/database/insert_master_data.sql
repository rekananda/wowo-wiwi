-- Insert data into m_niat (Intents)
INSERT INTO m_niat (id, name, image, is_back) VALUES
    ('6f61ec54-3bd6-41c3-830a-68c97694bab8', 'Niat Baik', 'NIAT/NIAT-BAIK.png', false),
    ('e7c13e7a-3dde-4f4b-94ba-324b0e7570d7', 'Niat Jahat', 'NIAT/NIAT-JAHAT.png', false),
    ('2692e8b9-eb2f-4a54-b5e4-549a3917d6ea', 'Back Niat', 'NIAT/BACK-NIAT.png', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO m_peran (id, name, image, playable, must_played, must_played_when_even_player, is_back) VALUES
    ('3d7f838e-c299-4973-99f5-03a2a79b69b5','IBU RT', 'PERAN/PERAN-IBU-RT.png', true, false, true, false),
    ('34ae73b0-16f1-4f76-b4b0-445181440ae0','JENDRAL', 'PERAN/PERAN-JENDRAL.png', true, false, false, false),
    ('8ea6ec38-74cc-4f85-bebc-b5628325681a','KONGLOMERAT', 'PERAN/PERAN-KONGLOMERAT.png', true, false, false, false),
    ('2eb06fe7-9293-41d3-91af-8c7b41ab2206','ORANG PINTER', 'PERAN/PERAN-ORANG-PINTER.png', true, true, false, false),
    ('02086e4d-6616-4a45-ba38-adfaf9137584','PEMUKA AGAMA', 'PERAN/PERAN-PEMUKA-AGAMA.png', true, false, false, false),
    ('b562b488-95e7-4f5d-9d20-23c2caa01635','POLITISI DADAKAN', 'PERAN/PERAN-POLITISI-DADAKAN.png', true, false, false, false),
    ('98bbdb94-ed72-49ab-a208-f23df36ad9f9','PROFESOR', 'PERAN/PERAN-PROFESOR.png', true, false, false, false),
    ('93cfbf01-3f89-4676-95b3-78f3c3051412','RAJA DANGDUT', 'PERAN/PERAN-RAJA-DANGDUT.png', true, false, false, false),
    ('9ab3b61e-6c2f-4540-b94f-218e3c8248af','RATU GOSIP', 'PERAN/PERAN-RATU-GOSIP.png', true, false, false, false),
    ('1ee16828-4ae3-48c5-aa72-0883c58496d7','TUKANG SURVEY', 'PERAN/PERAN-TUKANG-SURVEY.png', true, true, false, false),
    ('3b6f8274-5edb-4467-aa3d-7340f4cb7e70','CAPRES WIWI', 'PERAN/CAPRES-WIWI.png', false, true, false, false),
    ('6371d95e-7716-47ce-a596-b3195766cc61','CAPRES WOWO', 'PERAN/CAPRES-WOWO.png', false, true, false, false),
    ('4c48ac6c-8f68-4a83-aad9-68a07492bcd5','WOWO WIWI MASTER', 'LOGO/WOWO-WIWI-MASTER.png', false, true, false, true),
    ('c648414e-3c01-4c0f-94ec-7c39f5664696','BACK PERAN', 'PERAN/BACK-PERAN.png', false, false, false, true),
    ('b2c3d4e5-f6a7-5b6c-8d9e-6f7e5d4c3b2a', 'PENYIDIK KPK', 'PERAN/PERAN-PENYIDIK-KPK.png', true, false, false, false),
    ('d5e6f7a8-b9c0-9d0e-af1b-0a1b2c3d4e5f', 'BUZZER', 'PERAN/PERAN-BUZZER.png', true, false, false, false),
    ('f7a8b9c0-d1e2-bf0c-c2d3-2c3d4e5f6a7b', 'MAHASISWA', 'PERAN/PERAN-MAHASISWA.png', true, false, false, false),
    ('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'PENGACARA', 'PERAN/PERAN-PENGACARA.png', true, false, false, false)
ON CONFLICT (id) DO NOTHING;

-- Insert data into m_misi (Missions)
INSERT INTO m_misi (id, name, image, point, win_on_peran_id, win_on_niat_id, playable, must_played, can_be_played_when_player_get, is_back) VALUES
    ('820145a3-1b3b-4760-ae99-dc475974d56a', 'RAKYAT', 'MISI/MISI-RAKYAT.png', 1, NULL, '6f61ec54-3bd6-41c3-830a-68c97694bab8', true, true, 3, false),
    ('9c2e2faa-6d89-4e7e-92bc-be33dc7b459f', 'KORUPTOR', 'MISI/MISI-KORUPTOR.png', 1, NULL, 'e7c13e7a-3dde-4f4b-94ba-324b0e7570d7', true, true, 3, false),
    ('6732b1d8-4682-4f1d-bbcc-7893dc95e1a3', 'PRO WIWI', 'MISI/MISI-PRO-WIWI.png', 1, '3b6f8274-5edb-4467-aa3d-7340f4cb7e70', NULL, true, false, 5, false),
    ('bc54d695-a026-426f-a1e4-c049efb5f651', 'PRO WOWO', 'MISI/MISI-PRO-WOWO.png', 1, '6371d95e-7716-47ce-a596-b3195766cc61', NULL, true, false, 5, false),
    ('ec702b3e-a777-4b3e-8bca-6ce597c09532', 'BACK MISI', 'MISI/BACK-MISI.png', 0, NULL, NULL, false, false, 1, true)
ON CONFLICT (id) DO NOTHING;

-- Insert data into m_skills (Skills)
INSERT INTO m_skills (label, type, peran_id, limit_can_used, action_type, action_target, action_effect, action_value) VALUES
    -- skill IBU RT
    ('Lihat MISI pemain di kanan ATAU kiri', 'AKSI', '3d7f838e-c299-4973-99f5-03a2a79b69b5', 1, 'VIEW_MISI', 'ADJACENT_PLAYERS', NULL, '{"condition": ["CHOOSE_DIRECTION"]}'),
    ('Nilai VOTING 1.5', 'EFEK', '3d7f838e-c299-4973-99f5-03a2a79b69b5', 999, 'MODIFY_VOTE', 'SELF', 'VOTE_MULTIPLIER', '{"multiplier": 1.5}'),
    -- skill PEMUKA AGAMA
    ('Jika CAPRES yang kamu VOTING terpilih, maka kamu bisa menukar NIAT CAPRES', 'EFEK', '02086e4d-6616-4a45-ba38-adfaf9137584', 1, 'SWAP_NIAT', 'CAPRES_NIAT', 'CONDITIONAL_TRIGGER', '{"condition": ["AFTER_VOTE", "VOTE_WINNING", "NEED_CONFIRMATION"], "need_input": true}'),
    -- skill JENDRAL
    ('Batalkan AKSI pemain lain', 'REAKSI', '34ae73b0-16f1-4f76-b4b0-445181440ae0', 2, 'CANCEL_SKILL', 'ANY_PLAYER', 'SKILL_CANCELLATION', '{"condition": ["SKILL_TYPE", "SKILL_AKSI", "NEED_CONFIRMATION"], "need_input": true}'),
    -- skill TUKANG SURVEY
    ('Lihat NIAT CAPRES', 'EFEK', '1ee16828-4ae3-48c5-aa72-0883c58496d7', 999, 'VIEW_NIAT', 'CAPRES_NIAT', NULL, NULL),
    -- skill KONGLOMERAT
    ('Tukar MISI dengan pemain lain', 'AKSI', '8ea6ec38-74cc-4f85-bebc-b5628325681a', 2, 'SWAP_MISI', 'ANY_PLAYER', NULL, '{"condition": ["CHOOSE_PLAYER"], "need_input": true}'),
    -- skill ORANG PINTER
    ('Lihat MISI "Tukang Survey"', 'AKSI', '2eb06fe7-9293-41d3-91af-8c7b41ab2206', 1, 'VIEW_MISI', 'SPECIFIC_PERAN', NULL, '{"peran_target": "1ee16828-4ae3-48c5-aa72-0883c58496d7"}'),
    -- skill POLITISI DADAKAN
    ('Geser MISI pemain ke kiri ATAU kanan', 'AKSI', 'b562b488-95e7-4f5d-9d20-23c2caa01635', 1, 'SHIFT_MISI', 'ANY_PLAYER', NULL, '{"condition": ["CHOOSE_DIRECTION"], "need_input": true}'),
    -- skill RATU GOSIP
    ('Tukar NIAT CAPRES', 'AKSI', '9ab3b61e-6c2f-4540-b94f-218e3c8248af', 1, 'SWAP_NIAT', 'CAPRES_NIAT', NULL, NULL),
    -- skill PROFESOR
    ('Menggunakan skill salah satu dari AKSI ATAU REAKSI milik peran pemain lain', 'AKSI', '98bbdb94-ed72-49ab-a208-f23df36ad9f9', 2, 'COPY_SKILL', 'ANY_PLAYER', NULL, '{"condition": ["SKILL_TYPE", "SKILL_REAKSI", "SKILL_AKSI", "CHOOSE_PLAYER"], "need_input": true}'),
    -- skill RAJA DANGDUT
    ('Mengacak ulang MISI semua pemain', 'AKSI', '93cfbf01-3f89-4676-95b3-78f3c3051412', 1, 'SHUFFLE_MISI', 'ALL_PLAYERS', NULL, NULL),
    -- skill PENYIDIK KPK
    ('Melihat MISI pemain yang PERANnya memiliki skill AKSI', 'REAKSI', 'b2c3d4e5-f6a7-5b6c-8d9e-6f7e5d4c3b2a', 2, 'VIEW_MISI', 'ANY_PLAYER', NULL, '{"condition": ["CHOOSE_PLAYER", "HAS_SKILL_TYPE", "SKILL_AKSI"], "need_input": true}'),
    -- skill BUZZER
    ('Jika berada di sebelah KONGLOMERAT, VOTE kamu bernilai 2', 'EFEK', 'd5e6f7a8-b9c0-9d0e-af1b-0a1b2c3d4e5f', 1, 'MODIFY_VOTE', 'SELF', 'VOTE_MULTIPLIER', '{"multiplier": 2, "condition": ["PLAYER_ORDER", "ADJACENT_PERAN"], "peran_target":"8ea6ec38-74cc-4f85-bebc-b5628325681a"}'),
    ('Melihat NIAT CAPRES, tapi akan menunjukan MISI kamu pada semua pemainse panjang permainan', 'AKSI', 'd5e6f7a8-b9c0-9d0e-af1b-0a1b2c3d4e5f', 1, 'VIEW_NIAT', 'CAPRES_NIAT', 'REVEAL_MISI', NULL),
    -- skill PENGACARA
    ('Di awal permainan, kamu mendapatkan pemain random sebagai client mu dan MISI kamu akan sama dengan MISI clientmu', 'EFEK', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 1, 'ASSIGN_CLIENT', 'ANY_PLAYER', 'SYNC_MISI', NULL),
    ('Menggagalkan SEMUA SKILL yang diarahkan ke clientnya', 'REAKSI', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 1, 'CANCEL_SKILL', 'CLIENT', 'SKILL_CANCELLATION', '{"condition":["SKILL_TYPE", "SKILL_AKSI", "SKILL_REAKSI", "TARGETED_TO_CLIENT", "NEED_CONFIRMATION"], "need_input": true}'),
    -- skill MAHASISWA
    ('Nilai VOTE kamu bernilai 2, jika MISI kamu adalah RAKYAT', 'EFEK', 'f7a8b9c0-d1e2-bf0c-c2d3-2c3d4e5f6a7b', 1, 'MODIFY_VOTE', 'SELF', 'VOTE_MULTIPLIER', '{"multiplier": 2, "condition": ["PLAYER_MISI"], "misi_target":"820145a3-1b3b-4760-ae99-dc475974d56a"}'),
    ('Melihat MISI KONGLOMERAT, tapi akan menunjukan MISI kamu pada semua pemain sepanjang permainan', 'AKSI', 'f7a8b9c0-d1e2-bf0c-c2d3-2c3d4e5f6a7b', 1, 'VIEW_MISI', 'SPECIFIC_PERAN', 'REVEAL_MISI', '{"peran_target": "8ea6ec38-74cc-4f85-bebc-b5628325681a"}')
ON CONFLICT (peran_id, type, action_type) DO NOTHING;