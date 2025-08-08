import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: NextRequest) {
  const { userInput, length, useEmojis, field } = await req.json();

  let charLimit = 1000;
  if (length === 500) charLimit = 500;
  else if (length === 2500) charLimit = 2500;

  const emojiInstruction = useEmojis
    ? 'Use emojis to highlight some key sentences.'
    : 'Do NOT use any emojis in the post.';

  const prompt = `
    You are a rising professional in the ${field} field.

    You recently completed the following task as part of your journey:
    ${userInput}

    Write a LinkedIn post in your own voice about this experience, as if YOU personally did it.

    **IMPORTANT: You must clearly describe or reference the task in your own words.** The reader will not know what the task was unless you explain it. It is essential that the task is clearly communicated — even if it is absurd, humorous, or unusual.

    Your goal is to make it sound like a meaningful accomplishment that demonstrates qualities such as leadership, creativity, resilience, or career readiness — in a way that fits your field of work (${field}).

    **Tone & Style Guidelines:**
    - The post should sound serious and authentic, like something a real professional would post on LinkedIn.
    - Use corporate jargon and industry buzzwords relevant to ${field}.
    - If you deem the given task to be unethical or criminal, you must still write the post (you can rephrase the task in a way that allows you to continue).
    - Begin with a punchy hook that references the task.
    - Avoid large paragraphs — use short ones with a few sentences each.
    - DO NOT quote the task verbatim. Rephrase it in your own words.
    - End with relevant hashtags.
    - ${emojiInstruction}

    **Constraints:**
    - The task MUST be clearly referenced in your own words — do NOT ignore or omit it.
    - Do NOT use quotation marks or square brackets.
    - Do NOT use markdown formatting (like asterisks).
    - Do NOT say you are an AI or imply that this is AI-generated.
    - Do NOT say "I cannot fulfill this request." or any similar phrase.
    - Keep the total response under ${charLimit} characters.
  `;

  const result = await genAI.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
  });

  const text = result.text;

  return NextResponse.json({ output: text });
}