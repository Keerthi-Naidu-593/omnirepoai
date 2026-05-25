import fs from "fs";
import path from "path";
import { generateAIResponse } from "./aiClient.js";

export async function generateDocumentation(repoPath) {
  repoPath = repoPath.replace(/\\/g, "/");
  if (!repoPath.endsWith("/")) repoPath += "/";

  const candidates = [];
  function walk(dir) {
    let files;
    try {
      files = fs.readdirSync(dir);
    } catch { return; }

    const ignore = ["node_modules", ".git", "dist", "build", "out", "coverage"];
    for (const file of files) {
      if (ignore.includes(file)) continue;
      const full = path.join(dir, file);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        walk(full);
      } else if (/\.(js|jsx|ts|tsx|md|py|java)$/.test(file)) {
        candidates.push(full);
      }
    }
  }

  walk(repoPath);

  let context = "";
  for (const file of candidates.slice(0, 30)) {
    try {
      const content = fs.readFileSync(file, "utf-8").slice(0, 1500);
      context += `\n\nFILE: ${path.relative(repoPath, file)}\n${content}`;
    } catch {}
  }

  const prompt = `
Generate clean, structured documentation for this repository.

Repository Files:
${context}
`;

  return await generateAIResponse(prompt);
}
