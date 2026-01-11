import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
};

const DevModeSlice = createSlice({
  name: "devmode",
  initialState,
  reducers: {
    addTypingUserDev: (state, action) => {
      const index = state.user.findIndex(
        (d) => d.socketId === action.payload.socketId
      );

      if (index !== -1) {
        state.user[index] = action.payload;
      } else {
        state.user.push(action.payload);
      }
    },

    removeTypingUserDev: (state, action) => {
      state.user = state.user.filter(
        (d) => d.socketId !== action.payload.socketId
      );
    },
  },
});

export const { addTypingUserDev, removeTypingUserDev } =
  DevModeSlice.actions;

export default DevModeSlice.reducer;
