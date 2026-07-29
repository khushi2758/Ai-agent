import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./messageSlice";
import conversationReducer from "./conversationSlice";
import userReducer from "./user.slice";

export const store = configureStore({
  reducer: {
    message: messageReducer,
    conversation: conversationReducer,
    user: userReducer,
  },
});