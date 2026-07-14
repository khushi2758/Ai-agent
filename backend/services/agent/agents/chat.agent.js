import { getModel } from "../config/llmModel";

export const chatAgent = async(params) =>{
    const llm = await getModel("chat");
    const prompt ="you are AestheAI , an intelligent AI assestent"
    const response = (await llm).invoke([
      {"role": "system",
      "content": prompt},
      {
        "role": "human",
        "content":state.prompt
      }
    ])
    return {
        ...state,
        aiResponse:  response.concat
        
    }
}