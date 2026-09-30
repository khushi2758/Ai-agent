import { getModel } from "../config/llmModel.js";
import { generatePpt } from "../utils/generatePpt.js";
import { getfromS3 } from "../utils/getfromS3.js";
import { uploadToS3 } from "../utils/uploadToS3.js";

export const pptAgent = async(state) =>{
    try {
         const llm = await getModel("pdf")
         const prompt = `
You are a professional presentation designer and content strategist.

Your task is to create a well-structured, professional presentation based on the user's topic.

The presentation should be informative, visually suitable for slides, and easy for an audience to understand.

IMPORTANT RULES:

- Return ONLY valid JSON.
- Do NOT return Markdown.
- Do NOT return explanations outside the JSON.
- Do NOT use code blocks.
- Do NOT add any text before or after the JSON.
- Keep slide content concise.
- Avoid long paragraphs.
- Use clear and meaningful bullet points.
- Maintain a logical flow from introduction to conclusion.
- Do not repeat the same information across slides.

FORMAT:

{
  "title": "",
  "subtitle": "",
  "slides": [
    {
      "title": "",
      "points": [
        "",
        "",
        "",
        ""
      ]
    }
  ]
}

RULES FOR SLIDES:

- Generate exactly 6 content slides.
- Each slide must contain 4-6 concise bullet points.
- Each bullet point should be short and presentation-friendly.
- The first slide should introduce the topic.
- The middle slides should explain the main concepts, features, processes, examples, applications, or important details.
- The final slide should summarize the key takeaways.
- Give every slide a clear and meaningful title.
- Do not use Markdown formatting inside the bullet points.
- Do not use emojis unless specifically requested.
- Do not include speaker notes.
- Do not include unnecessary information.
- Keep the content appropriate for a professional presentation.

CONTENT STRUCTURE:

Slide 1:
Introduction to the topic.

Slide 2:
Background, definition, or important concepts.

Slide 3:
Main concepts, components, or features.

Slide 4:
Working, process, implementation, or methodology.

Slide 5:
Applications, examples, benefits, or real-world use cases.

Slide 6:
Conclusion and key takeaways.

USER REQUEST:

${state.prompt}
`;
const res = await llm.invoke(prompt)
const data = JSON.parse(res.content)
const ppt= await generatePpt(data)
const buffer = await ppt.write({
    outputType: "nodebuffer"
})
const fileName= `ppt-${Date.now()}.pptx`
await uploadToS3(
  buffer,
  fileName,
  "application/vnd.openxmlformats-officedocument.presentationml.presentation"
);

const downloadUrl = await getfromS3(fileName,24*60*60)
return {
      ...state,
      aiResponse:`
# ✅ Presentation Generated Successfully

📊 **${data.title}**

📥 [Download PPT](${downloadUrl})

⏳ Link expires in 10 minutes.
`
}
    } catch (error) {
        console.log(error)
        return {
            ...state,
            aiResponse:"Failed to generate presentation."
        }
    }
  
}