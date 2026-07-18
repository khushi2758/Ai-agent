import { StateGraph } from "@langchain/langgraph";


import { chatAgent } from "../agents/chat.agent.js";
import { codingAgent } from "../agents/coding.agent.js";
import { searchAgent } from "../agents/search.agent.js";
import { pdfAgent } from "../agents/pdf.agent.js";
import { pptAgent } from "../agents/ppt.agent.js";
import { imageGenAgent } from "../agents/imageGen.agent.js";




const workflow = new StateGraph(AgentState);

workflow.addNode("router", routerNode);
workflow.addNode("chat", chatAgent);
workflow.addNode("coding", codingAgent);
workflow.addNode("search", searchAgent);
workflow.addNode("pdf", pdfAgent);
workflow.addNode("ppt", pptAgent);
workflow.addNode("imageGen", imageGenAgent);

workflow.addEdge("__start__", "router");
workflow.addConditionalEdges(
  "router",

  (state) => {
    switch (state.agent) {
      case "search":
        return "search";

      case "coding":
        return "coding";

      case "pdf":
        return "pdf";

      case "ppt":
        return "ppt";

      case "imageGen":
        return "imageGen";

      default:
        return "chat";
    }
  },

  {
    chat: "chat",

    search: "search",

    coding: "coding",

    pdf: "pdf",
    ppt: "ppt",
    imageGen: "imageGen",
  
  },
);

workflow.addEdge("coding", "__end__");
workflow.addEdge("imageGen", "__end__");

workflow.addEdge("search", "chat");

workflow.addEdge("pdf", "__end__");
workflow.addEdge("ppt", "__end__");

workflow.addEdge("chat", "__end__");



export const graph = workflow.compile();
