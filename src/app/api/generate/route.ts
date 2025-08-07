import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: NextRequest) {
  const { userInput, length, useEmojis } = await req.json();

  let charLimit = 1000;
  if (length === 500) charLimit = 500;
  else if (length === 2500) charLimit = 2500;

  const emojiInstruction = useEmojis
    ? 'Use emojis to highlight some key sentences.'
    : 'Do NOT use any emojis in the post.';

  const prompt = `
You are an aspiring LinkedIn influencer who has just done the following task: "${userInput}".
Write a LinkedIn post based on what you accomplished. The post should seem serious and occassionally use corporate jargon.
The post should sound like the task was a major personal or professional triumph that reflects leadership, resilience, or career readiness. 
Make reference to the task in the post as if you yourself completed it.
Try to use the words of the task in the post in a way that makes sense.
Begin immediately with a punchy sentence.
${emojiInstruction}
Avoid one large paragraph, instead try to write paragraphs of a few short sentences.
Don't explain what you're doing — just write the post as if it were real.

Constraints:
- Do NOT include image descriptions or anything inside square brackets.
- Do NOT use markdown (no **bold**, *, etc.)
- Do NOT mention that you are an AI
- Do NOT mention that this is an AI generated response
- Keep the total output under ${charLimit} characters.
`;

  const result = await genAI.models.generateContent({
    model: 'gemini-2.5-flash-lite',
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
  });

  const text = result.text;

  return NextResponse.json({ output: text });
}
