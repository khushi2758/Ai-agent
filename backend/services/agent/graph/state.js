import {Annotation } from "@langchain/langgraph"
export const agentState = Annotation.Root({ //state
    prompt : Annotation(),
    aiResponse  : Annotation(),
    agent: Annotation(),
   conversationId: Annotation(),
})