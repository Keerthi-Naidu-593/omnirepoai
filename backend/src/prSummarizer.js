import { generateAIResponse } from "./aiClient.js";

export async function summarizePR(diffText) {
  const prompt = `
You are an AI pull request summarizer.

Given the following diff / code changes, summarize them in 3–5 bullet points.
Focus on:
- What features were added/changed
- Any bug fixes
- Any config/deployment changes

Diff:
${diffText}
`;

  const summary = await generateAIResponse(prompt);
  return { summary };
}
