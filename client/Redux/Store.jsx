import { configureStore } from "@reduxjs/toolkit";
import MessageSlice from "./MessageSlice/MessageSlice";
import UserSlice from "./UserSlice/UserSlice";
import typingSlice from './Typing/typing';
import DevMode from './DevMode/DevModeSlice';
export const store = configureStore({
  reducer: {
    usertyping:typingSlice,
    message:MessageSlice,
    user:UserSlice,
    devmode:DevMode
  },
});
