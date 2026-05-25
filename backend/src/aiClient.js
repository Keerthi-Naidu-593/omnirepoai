import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function generateAIResponse(prompt) {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY not set in .env");
  }
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

  const body = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ]
  };

  const res = await axios.post(url, body);

  const text =
    res.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "No response from AI";

  return text;
}
