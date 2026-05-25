import fs from "fs";
import path from "path";
import { generateAIResponse } from "./aiClient.js";

// Real .env files that must never be sent to AI
const ENV_BLOCKLIST = new Set([".env", ".env.local", ".env.production", ".env.development", ".env.staging", ".env.test"]);

// Redact all values in .env-like content, keeping only key names
function redactEnvContent(content) {
  return content.replace(/^(?!#)([^=\n]+)=(.+)$/gm, (_, key) => `${key}=***REDACTED***`);
}

export async function generateReadme(repoPath) {
  repoPath = repoPath.replace(/\\/g, "/");
  if (!repoPath.endsWith("/")) repoPath += "/";

  if (!fs.existsSync(repoPath)) {
    throw new Error("Repository path does not exist");
  }

  // Collect targeted files for README context
  const priority = ["package.json", "package-lock.json", "requirements.txt",
    "pyproject.toml", "Cargo.toml", "go.mod", "pom.xml",
    ".env.example", "docker-compose.yml", "Dockerfile",
    "tsconfig.json", "vite.config.js", "vite.config.ts",
    "next.config.js", "webpack.config.js"];

  const candidates = [];
  function walk(dir, depth = 0) {
    if (depth > 4) return;
    let files;
    try { files = fs.readdirSync(dir); } catch { return; }

    const ignore = ["node_modules", ".git", "dist", "build", "out", "coverage", ".next", "__pycache__"];
    for (const file of files) {
      if (ignore.includes(file)) continue;
      if (ENV_BLOCKLIST.has(file)) continue; // Never walk real .env files
      const full = path.join(dir, file);
      let stat;
      try { stat = fs.statSync(full); } catch { continue; }
      if (stat.isDirectory()) {
        walk(full, depth + 1);
      } else {
        candidates.push(full);
      }
    }
  }
  walk(repoPath);

  let context = "";

  // Read priority config files first
  for (const pFile of priority) {
    if (ENV_BLOCKLIST.has(pFile)) continue; // Skip real .env files
    const found = candidates.find(f => f.replace(/\\/g, "/").endsWith("/" + pFile));
    if (found) {
      try {
        let content = fs.readFileSync(found, "utf-8").slice(0, 2000);
        if (pFile.startsWith(".env")) content = redactEnvContent(content);
        context += `\n\nFILE: ${path.relative(repoPath, found)}\n${content}`;
      } catch {}
    }
  }

  // Then add source files for feature understanding
  const srcFiles = candidates.filter(f => /\.(js|jsx|ts|tsx|py|java|go|rs|rb|cs)$/.test(f));
  for (const file of srcFiles.slice(0, 20)) {
    try {
      const content = fs.readFileSync(file, "utf-8").slice(0, 800);
      context += `\n\nFILE: ${path.relative(repoPath, file)}\n${content}`;
    } catch {}
  }

  const folderStructure = candidates
    .slice(0, 60)
    .map(f => path.relative(repoPath, f).replace(/\\/g, "/"))
    .join("\n");

  const prompt = `You are a professional open-source developer writing a high-quality README.md.

Analyze the following repository and generate a COMPLETE, STRUCTURED README.md in markdown format.

FOLDER STRUCTURE:
${folderStructure}

KEY FILE CONTENTS:
${context}

Generate a README with ALL of these sections (use appropriate emojis for headings):
1. # Project Title + one-line description + relevant badges (build, license, version)
2. ## ✨ Features — bullet list of key features you can infer from the code
3. ## 🛠️ Tech Stack — technologies, frameworks, and tools used
4. ## 📋 Prerequisites — what needs to be installed before running
5. ## 🚀 Getting Started — step-by-step installation and local run instructions
6. ## 📁 Project Structure — short annotated folder tree
7. ## 🔌 API Overview — brief description of main API endpoints (if applicable)
8. ## 🤝 Contributing — how to contribute (fork, branch, PR process)
9. ## 📄 License — standard MIT license note

Be specific to THIS repository. Do not write generic placeholder text.
Output ONLY the markdown content, nothing else.`;

  return await generateAIResponse(prompt);
}
