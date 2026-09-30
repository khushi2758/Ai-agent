import { getModel } from "../config/llmModel.js";

export const codingAgent = async (state) => {
    const codingLlm =  getModel("chat");
    const intentLlm =  getModel("intent");
     const intentRes = await intentLlm.invoke(`
You are an intent classifier.

Return ONLY one of these values:

CODE_GENERATION
CODE_REVIEW
CODE_EXPLANATION
DEBUGGING
OPTIMIZATION
CONVERSION
DOCUMENTATION

User Request:
${state.prompt}
  `);

  const intent = intentRes.content;
  console.log("Intent:", intent);
  if (intent == "CODE_GENERATION") {
   const prompt =( `
You are CortexAI Coding Agent.

Generate the requested software project based on the user's requirements.

Default stack:
- HTML
- CSS
- JavaScript

Use React, Next.js, Vue, or other frameworks ONLY if explicitly requested.

Rules:
- Generate complete and functional code.
- Make the UI responsive.
- Use a modern and clean UI.
- Use CSS variables where appropriate.
- Use Flexbox/Grid for layout.
- Add smooth scrolling when useful.
- Add appropriate hover effects and transitions.
- Maintain consistent spacing and typography.
- Write clean and readable code.
- Use semantic HTML.
- Keep JavaScript modular and understandable.
- Do not add unnecessary libraries.
- Do not invent features that the user did not request.
- If the user requests multiple pages, create separate files for each page.
- If the user does not specify a design, choose a professional modern design.
- Make sure all files work together correctly.
- Make sure paths and file references are correct.

Output format:

Return ONLY valid JSON.

The output MUST start with {
and MUST end with }.

Do NOT return:
- Markdown
- Code fences
- Explanations
- Comments outside the JSON
- Any text before or after the JSON

Use exactly this JSON structure:

{
  "files": [
    {
      "name": "index.html",
      "content": "..."
    },
    {
      "name": "style.css",
      "content": "..."
    },
    {
      "name": "script.js",
      "content": "..."
    }
  ]
}

Rules for the JSON:
- "files" must always be an array.
- Every file must contain "name" and "content".
- "name" must contain the complete file name including extension.
- "content" must contain the complete source code.
- Do not omit required code.
- Escape newlines and quotation marks correctly so the response is valid JSON.
- Do not include markdown code fences.
- Never mention intent or the agent in the output.

User Request:
${state.prompt}
`)
const response = await codingLlm.invoke(prompt);
const data = JSON.parse(response.content);
return {
  ...state,
  aiResponse:"Code generated successfully.",
   artifacts: [
    {
      id: Date.now(),
      type: "code",
      files: data.files || [],
      title: state.prompt.substring(0, 50) + (state.prompt.length > 50 ? "..." : "")
    }
   ]
  }
}
const res = await codingLlm.invoke(`
  the user's request is: ${intent}
  Instead return Markdown only.
DO NOT generate a new project.
Include:

# Overview

## What this code does

## Problems

## Improvements

## Best Practices

## Optimized snippets (if required)

For explanations:

- Never wrap variable names in triple backticks.
- Use single backticks only for inline code.
- Use triple backticks ONLY for complete code blocks. 
User request:
${state.prompt}
   `)

   const data = res.content
   return {
    ...state,
    aiResponse: data,
    artifacts: []
   }
   
  }
 

