import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface State {
  counter: number;
}

const initialState: State = {
  counter: 10
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setCounter: (state: State, action: PayloadAction<number>) => {
      state.counter = action.payload;
    },
    addCounter: (state: State) => {
      state.counter = state.counter+1;
    },
    reduceCounter: (state: State) => {
      state.counter = state.counter-1;
    },
  },
});

export const {
  setCounter,
  addCounter,
  reduceCounter,
} = globalSlice.actions;

export default globalSlice.reducer;