import { configureStore } from '@reduxjs/toolkit'
import  userSlice  from './user.slice.js'
import  conversationSlice  from './conversationSlice.js'
import  messageSlice  from './messageSlice.js'
export const store = configureStore({
  reducer: {
    user:userSlice,
    conversation : conversationSlice,
    message:messageSlice
  },
})



