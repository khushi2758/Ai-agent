
import { graph } from "../graph/graph.js";

import axios from "axios";

export const chat = async (req, res, next) => {
  try {
    const {  prompt, conversationId,agent,} = req.body;
    console.log(req.body);
  
    await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
      conversationId,
      role: "user",
      content: prompt,
    });

    const result = await graph.invoke({
      prompt,
      conversationId,
      
    });

     const response = result.aiRespons
     return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({message: `agent error ${error}`})
  }
};
