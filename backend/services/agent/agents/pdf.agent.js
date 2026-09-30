import { getModel } from "../config/llmModel.js"
import { generatePdf } from "../utils/generatePdf.js"
import { getfromS3 } from "../utils/getfromS3.js"
import { uploadToS3 } from "../utils/uploadToS3.js"

export const pdfAgent = async(state) =>{
    try {
        const llm = await getModel("pdf")
       const prompt = `
You are an expert document writer and PDF content generator.

Your task is to create well-structured, professional content based on the user's request.

IMPORTANT RULES:

- Return ONLY valid JSON.
- Do NOT return Markdown.
- Do NOT return explanations outside the JSON.
- Do NOT use code fences.
- Do NOT add any text before or after the JSON.
- Make the content clear, informative, and logically organized.
- Use professional and easy-to-understand language.
- Avoid unnecessary repetition.
- Generate 4-8 sections depending on the topic.
- Each section should contain a clear heading and multiple useful points.
- The content should be suitable for converting into a professional PDF document.

Return exactly this structure:

{
  "title": "",
  "subtitle": "",
  "sections": [
    {
      "heading": "",
      "points": [
        "",
        "",
        ""
      ]
    }
  ]
}

CONTENT REQUIREMENTS:

1. "title" should contain the main title of the document.
2. "subtitle" should briefly describe the document.
3. "sections" must contain 4-8 sections.
4. Each section must have a meaningful "heading".
5. Each section should contain 3-6 concise but informative points.
6. Points should contain complete sentences.
7. Keep the content relevant to the user's request.
8. If the user asks for a technical topic, include important concepts, examples, and practical information.
9. If the user asks for a report, organize the content logically from introduction to conclusion.
11. Generate 4-8 section.
User Request:
${state.prompt}
`
 const res = await llm.invoke(prompt)
 const data =JSON.parse(res.content)
 const pdfBuffer = await generatePdf(data);
   const fileName = `pdf-${Date.now()}.pdf`;
     await uploadToS3(
      pdfBuffer,
      fileName,
      "application/pdf"
    );
   
    const downloadUrl =
      await getfromS3(
        fileName,
        24*60
      );
      return {

      ...state,

aiResponse: `
# ✅ PDF Generated Successfully

📄 **${data.title}**

📥 [Download PDF](${downloadUrl})

⏳ Link expires in 10 minutes.
`.trim()

    };

    } catch (error) {
        console.log(error)
      return  {
        ...state,
         aiResponse :"❌ Failed to generate PDF."
        }
    }
}