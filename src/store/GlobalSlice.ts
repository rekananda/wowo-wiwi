import { GameInfoT, RoomInfoT } from "@/types";
import { BaseUserI } from "@/types/database";
import { StyleProp } from "@mantine/core";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface State {
  user: BaseUserI | null;
  room: RoomInfoT | null;
  game: GameInfoT | null;
  loading: boolean;
  mainConfig: {
    contentHeight: StyleProp<React.CSSProperties['minHeight']> ;
  }
}

const initialState: State = {
  user: null,
  room: null,
  game: null,
  loading: false,
  mainConfig: {
    contentHeight: {base: 'calc(90vh - 32px)', md: 'calc(95vh - 32px)', lg: 'calc(85vh - 32px)'}
  }
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setUser: (state: State, action: PayloadAction<BaseUserI | null>) => {
      state.user = action.payload;
    },
    setRoom: (state: State, action: PayloadAction<RoomInfoT | null>) => {
      state.room = action.payload;
    },
    setGame: (state: State, action: PayloadAction<GameInfoT | null>) => {
      state.game = action.payload;
    },
    setLoading: (state: State, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setUser,
  setRoom,
  setGame,
  setLoading,
} = globalSlice.actions;

export default globalSlice.reducer;