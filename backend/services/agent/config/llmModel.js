import { ChatGroq } from "@langchain/groq";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

console.log("GROQ KEY:", process.env.GROQ_API_KEY);

const groq = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "openai/gpt-oss-120b",
});

const gemini = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "gemini-2.5-pro",
});

export const getModel = (agent) => {
  switch (agent) {
    case "chat":
    case "search":
      return groq;

    case "coding":
      return gemini;

    default:
      return groq;
  }
};