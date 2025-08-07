import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: NextRequest) {
  const { userInput, tone } = await req.json();

  const prompt = `
You are a professional LinkedIn influencer.

Write a ${tone} LinkedIn post based on the following mundane task: "${userInput}".

Constraints:
- Do NOT include image descriptions or anything inside square brackets.
- Do NOT use markdown (no **bold**, *, etc.)
- Keep the total output under 1500 characters.

The post should sound like a major personal or professional triumph that reflects leadership, resilience, or career readiness. Begin immediately with a punchy sentence. Don't explain what you're doing — just write the post as if it were real.
`;

  const result = await genAI.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
  });

  const text = result.text;

  return NextResponse.json({ output: text });
}
