import fs from "fs";
import path from "path";
import { generateAIResponse } from "./aiClient.js";

function collectTextFiles(repoPath, limit = 40) {
  const result = [];

  function walk(dir) {
    const ignore = ["node_modules", ".git", "dist", "build", "out", "coverage"];
    const files = fs.readdirSync(dir);

    for (const file of files) {
      if (ignore.includes(file)) continue;

      const full = path.join(dir, file);
      const stat = fs.statSync(full);

      if (stat.isDirectory()) {
        walk(full);
      } else if (/\.(js|jsx|ts|tsx|py|java|md|json|yml|yaml)$/.test(file)) {
        result.push(full);
      }
    }
  }

  walk(repoPath);
  return result.slice(0, limit);
}

export async function chatWithRepo(repoPath, question) {
  repoPath = repoPath.replace(/\\/g, "/");
  if (!repoPath.endsWith("/")) repoPath += "/";

  const files = collectTextFiles(repoPath);

  let context = "";
  for (const file of files) {
    try {
      const content = fs.readFileSync(file, "utf-8").slice(0, 2000);
      context += `\n\nFILE: ${file}\n${content}`;
    } catch {}
  }

  const prompt = `
You are an AI that answers questions about a code repository.

Repository Context:
${context}

User Question:
${question}

Answer clearly and based only on the code above.
`;

  return await generateAIResponse(prompt);
}
