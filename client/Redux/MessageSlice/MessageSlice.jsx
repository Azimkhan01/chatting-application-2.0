import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message:[]
};

const MessageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
   addMessage:(state,action)=>{
    console.log(action.payload);
    
    state.message = [...state.message,...action.payload];
   }
  },
});

export const { addMessage } =
  MessageSlice.actions;

export default MessageSlice.reducer;
