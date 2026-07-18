import { createSlice } from '@reduxjs/toolkit'


const initialState = {
   conversations:[],
  selectedConversation:null
}
export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
     setConversations:(state,action)=>{
   state.conversations=action.payload;

  },
  addConversation:(state,action)=>{
    state.conversations.unshift(action.payload)
  }
    }
})

// Action creators are generated for each case reducer function
export const {setConversations,addConversation} = conversationSlice.actions

export default conversationSlice.reducer