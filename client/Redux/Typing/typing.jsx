import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  user: [],
};

const TypingSlice = createSlice({
  name: "typingUser",
  initialState,
  reducers: {
    addTypingUser: (state, action) => {
      // console.log(action.payload);
      let z = state.user.find((d,i)=>{
        return d == action.payload;
      })
      if(!z)
      state.user = [...state.user, action.payload];

      // state.message = [...state.message,...action.payload];
    },
    removeTypingUser: (state, action) => {
      let temp = state.user.filter((d, i) => d != action.payload);
      state.user = temp;
    },
  },
});

export const { addTypingUser, removeTypingUser } = TypingSlice.actions;

export default TypingSlice.reducer;
