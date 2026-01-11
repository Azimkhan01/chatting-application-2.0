import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  current: "",
  allUser: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // set current user
    setCurrent: (state, action) => {
      state.current = action.payload;
    },

    // set all users
    setAllUser: (state, action) => {
      state.allUser =action.payload;
    },
  },
});

export const { setCurrent, setAllUser } = userSlice.actions;
export default userSlice.reducer;
