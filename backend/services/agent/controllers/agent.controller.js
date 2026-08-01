
import { graph } from "../graph/graph.js";
import {addMessage} from "../config/memory.js"
import axios from "axios";

export const chat = async (req, res, next) => {
  try {
    const {  prompt, conversationId,agent} = req.body;
    console.log(req.body);
    
    await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
      conversationId,
      role: "user",
      content: prompt,
    });

   const result = await graph.invoke({
  prompt,
  conversationId,
  agent,
});
console.log("GRAPH RESULT:");
console.dir(result, { depth: null });

     const response = result.aiResponse
       await addMessage(conversationId,"user" , prompt) 
         await addMessage(conversationId,"assistant" , response) 
        await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
      conversationId,
      role: "assistant",
      content: response,
      images:result.images
    });
     return res.status(200).json({
      answer: response,
      images: result.images
     })

  } catch (error) {
    return res.status(500).json({message: `agent error ${error}`})
  }
};
