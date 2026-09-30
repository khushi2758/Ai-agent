import { ChatGroq } from "@langchain/groq";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatOpenRouter } from "@langchain/openrouter";
console.log("GROQ KEY:", process.env.GROQ_API_KEY);
console.log("GOOGLE KEY:", process.env.GOOGLE_API_KEY);
console.log("OPENROUTER KEY:", process.env.OPENROUTER_API_KEY);
const groq = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "openai/gpt-oss-120b",
});

const gemini = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "gemini-2.5-pro",
});
const openRouter = new ChatOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
  model: "deepseek/deepseek-v4-flash:free",
  temperature: 0,
  maxTokens: 2500,
});
export const getModel = (agent) => {
  switch (agent) {
    case "chat":
      return groq;
    case "search":
      return groq;

    case "coding":
      return openRouter;

    default:
      return groq;
  }
};