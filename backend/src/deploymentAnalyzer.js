import fs from "fs";
import path from "path";
import { generateAIResponse } from "./aiClient.js";

export async function analyzeDeploymentChanges(repoPath) {
  const candidates = [];

  function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const full = path.join(dir, file);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        walk(full);
      } else if (
        file.includes(".env") ||
        file.includes("docker") ||
        file.includes("compose") ||
        file.includes("config") ||
        file.includes("nginx") ||
        file.includes("k8s") ||
        file.includes("helm")
      ) {
        candidates.push(full);
      }
    }
  }

  walk(repoPath);

  let context = "";
  for (const filePath of candidates.slice(0, 10)) {
    try {
      let content = fs.readFileSync(filePath, "utf-8");
      
      // Mask sensitive values in .env files
      if (filePath.includes(".env")) {
        content = content.replace(/^(?!#)([^=]+)=(.*)$/gm, (match, key, val) => {
          if (!val.trim()) return match;
          return `${key}=***REDACTED***`;
        });
      }
      
      context += `\n\n--- FILE: ${path.relative(repoPath, filePath)} ---\n${content}`;
    } catch {
      // ignore
    }
  }

  const prompt = `
You are an AI deployment/configuration change explainer.

Given these config-related files, explain in simple terms:
- What environment variables or endpoints are used
- Any cache, DB, or external service configuration
- Anything important for deployment

Files:
${context}
`;

  const explanation = await generateAIResponse(prompt);
  return { explanation, filesScanned: candidates };
}
