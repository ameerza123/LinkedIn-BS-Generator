import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: NextRequest) {
  const { userInput, tone } = await req.json();

  const prompt = `
You are an aspiring LinkedIn influencer who has just done the following task: "${userInput}".
Write a LinkedIn post based on what you accomplished in the following tone: ${tone}.

Constraints:
- Do NOT include image descriptions or anything inside square brackets.
- Do NOT use markdown (no **bold**, *, etc.)
- Do NOT mention that you are an AI
- Do NOT mention that this is an AI generated response
- Keep the total output under 1500 characters.

The post should sound like the task was a major personal or professional triumph that reflects leadership, resilience, or career readiness. 
Make reference to the task as if you yourself completed it.
Begin immediately with a punchy sentence.
Use emojis to highlight some key sentences. 
Don't explain what you're doing — just write the post as if it were real.
`;

  const result = await genAI.models.generateContent({
    model: 'gemini-2.5-flash-lite',
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
  });

  const text = result.text;

  return NextResponse.json({ output: text });
}
