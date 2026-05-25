import fs from "fs";
import path from "path";
import { generateAIResponse } from "./aiClient.js";

// Real .env files must never be sent to AI
const ENV_BLOCKLIST = new Set([".env", ".env.local", ".env.production", ".env.development", ".env.staging", ".env.test"]);

// Redact all values in .env-like content
function redactEnvContent(content) {
  return content.replace(/^(?!#)([^=\n]+)=(.+)$/gm, (_, key) => `${key}=***REDACTED***`);
}

export async function generateOnboarding(repoPath) {
  repoPath = repoPath.replace(/\\/g, "/");
  if (!repoPath.endsWith("/")) repoPath += "/";

  if (!fs.existsSync(repoPath)) {
    throw new Error("Repository path does not exist");
  }

  const allFiles = [];
  function walk(dir, depth = 0) {
    if (depth > 4) return;
    let files;
    try { files = fs.readdirSync(dir); } catch { return; }

    const ignore = ["node_modules", ".git", "dist", "build", "out", "coverage", ".next", "__pycache__"];
    for (const file of files) {
      if (ignore.includes(file)) continue;
      if (ENV_BLOCKLIST.has(file)) continue; // never read real .env files
      const full = path.join(dir, file);
      let stat;
      try { stat = fs.statSync(full); } catch { continue; }
      if (stat.isDirectory()) {
        walk(full, depth + 1);
      } else {
        allFiles.push(full);
      }
    }
  }
  walk(repoPath);

  const folderStructure = allFiles
    .slice(0, 80)
    .map(f => path.relative(repoPath, f).replace(/\\/g, "/"))
    .join("\n");

  let context = "";

  // Read key project-definition files
  const keyFiles = [
    "package.json", "requirements.txt", "pyproject.toml", "go.mod", "Cargo.toml",
    "README.md", "README.txt", ".env.example", "docker-compose.yml", "Dockerfile",
    ".eslintrc.js", ".eslintrc.json", ".prettierrc", "tsconfig.json",
  ];

  for (const kf of keyFiles) {
    const found = allFiles.find(f => f.replace(/\\/g, "/").endsWith("/" + kf));
    if (found) {
      try {
        let content = fs.readFileSync(found, "utf-8").slice(0, 2000);
        if (kf.startsWith(".env")) content = redactEnvContent(content);
        context += `\n\nFILE: ${kf}\n${content}`;
      } catch {}
    }
  }

  // Add entry point / main files
  const entryPatterns = ["index.js", "index.ts", "main.js", "main.ts", "main.py", "app.js", "app.ts", "app.py", "server.js", "server.ts"];
  for (const ep of entryPatterns) {
    const found = allFiles.find(f => f.replace(/\\/g, "/").endsWith("/" + ep));
    if (found) {
      try {
        const content = fs.readFileSync(found, "utf-8").slice(0, 1500);
        context += `\n\nENTRY POINT: ${ep}\n${content}`;
      } catch {}
    }
  }

  // Add a sample of source files for architecture understanding
  const srcFiles = allFiles.filter(f => /\.(js|jsx|ts|tsx|py|java|go|rs)$/.test(f));
  for (const file of srcFiles.slice(0, 15)) {
    try {
      const content = fs.readFileSync(file, "utf-8").slice(0, 600);
      context += `\n\nFILE: ${path.relative(repoPath, file).replace(/\\/g, "/")}\n${content}`;
    } catch {}
  }

  const prompt = `You are a senior software engineer writing a friendly onboarding guide for a new developer joining a project.

REPOSITORY STRUCTURE:
${folderStructure}

KEY FILES & CODE:
${context}

Generate a comprehensive "Developer Onboarding Guide" in Markdown with these exact sections:

# 👋 Developer Onboarding Guide

## 🧭 What Is This Project?
2-3 paragraph explanation of what the project does, its purpose, and who uses it. Be specific to this repo.

## 🏗️ Architecture Overview
Explain the high-level architecture. What are the main layers/components? How do they communicate? Include a simple ASCII or markdown diagram if helpful.

## 📁 Key Files & Folders
Table or annotated list of the most important directories and files a new dev MUST know about:
| Path | Purpose |
|---|---|
| \`src/\` | ... |

## ⚙️ Local Development Setup
Step-by-step numbered instructions to get the project running locally from scratch. Include every command needed.

## 🔄 Data Flow
Explain the main request/data flow through the system (e.g., "User clicks X → Frontend calls Y API → Backend does Z → Returns W").

## 🧪 Running Tests
How to run the test suite (if applicable). If no tests are found, note that and suggest adding them.

## 📏 Code Conventions & Standards
What coding patterns, naming conventions, linting rules, or architectural decisions should a new dev follow?

## 🚦 First Tasks for a New Dev
Suggest 3-5 good "starter" tasks that would help a new developer get familiar with the codebase without breaking anything.

## 🆘 Getting Help
Where to look for help: docs, comments, key contacts (placeholder), relevant external documentation links.

Be warm, specific, and practical. Output ONLY the markdown.`;

  return await generateAIResponse(prompt);
}
