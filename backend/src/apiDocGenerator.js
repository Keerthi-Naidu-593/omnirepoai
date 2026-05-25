import fs from "fs";
import path from "path";
import { generateAIResponse } from "./aiClient.js";

// Real .env files must never be sent to AI
const ENV_BLOCKLIST = new Set([".env", ".env.local", ".env.production", ".env.development", ".env.staging", ".env.test"]);

// Patterns that indicate a file contains API route definitions
const ROUTE_PATTERNS = [
  /routes?\.(js|ts|jsx|tsx)$/i,
  /router\.(js|ts|jsx|tsx)$/i,
  /controller\.(js|ts|jsx|tsx)$/i,
  /controllers?\//i,
  /routes?\//i,
  /api\.(js|ts)$/i,
  /endpoints?\.(js|ts)$/i,
  /\.route\.(js|ts)$/i,
  /\.controller\.(js|ts)$/i,
  /views\.py$/i,        // Django
  /urls\.py$/i,         // Django
  /app\.py$/i,          // Flask/FastAPI
  /main\.py$/i,         // FastAPI
];

const CONTENT_ROUTE_SIGNALS = [
  "router.get", "router.post", "router.put", "router.delete", "router.patch",
  "app.get", "app.post", "app.put", "app.delete", "app.patch",
  "@app.route", "@router.get", "@router.post", "@app.get", "@app.post",
  "express.Router", "@Controller", "@Get(", "@Post(", "@Put(", "@Delete(",
];

export async function generateApiDocs(repoPath) {
  repoPath = repoPath.replace(/\\/g, "/");
  if (!repoPath.endsWith("/")) repoPath += "/";

  if (!fs.existsSync(repoPath)) {
    throw new Error("Repository path does not exist");
  }

  const allFiles = [];
  function walk(dir, depth = 0) {
    if (depth > 5) return;
    let files;
    try { files = fs.readdirSync(dir); } catch { return; }

    const ignore = ["node_modules", ".git", "dist", "build", "out", "coverage", ".next", "__pycache__"];
    for (const file of files) {
      if (ignore.includes(file)) continue;
      if (ENV_BLOCKLIST.has(file)) continue; // skip real .env files
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

  // Find route/controller files by name pattern
  let routeFiles = allFiles.filter(f => {
    const rel = f.replace(/\\/g, "/");
    return ROUTE_PATTERNS.some(p => p.test(rel));
  });

  // If not enough by name, scan content for route signals
  if (routeFiles.length < 2) {
    const sourceFiles = allFiles.filter(f => /\.(js|jsx|ts|tsx|py)$/.test(f));
    for (const file of sourceFiles.slice(0, 60)) {
      if (routeFiles.includes(file)) continue;
      try {
        const content = fs.readFileSync(file, "utf-8").slice(0, 3000);
        const hasRoutes = CONTENT_ROUTE_SIGNALS.some(sig => content.includes(sig));
        if (hasRoutes) routeFiles.push(file);
      } catch {}
    }
  }

  // Build context from route files
  let context = "";
  for (const file of routeFiles.slice(0, 15)) {
    try {
      const content = fs.readFileSync(file, "utf-8").slice(0, 2500);
      context += `\n\n## FILE: ${path.relative(repoPath, file).replace(/\\/g, "/")}\n\`\`\`\n${content}\n\`\`\``;
    } catch {}
  }

  if (!context.trim()) {
    context = "No explicit route files found. General source code provided for inference.";
    const srcFiles = allFiles.filter(f => /\.(js|ts|py)$/.test(f)).slice(0, 10);
    for (const file of srcFiles) {
      try {
        const content = fs.readFileSync(file, "utf-8").slice(0, 1000);
        context += `\n\nFILE: ${path.relative(repoPath, file)}\n${content}`;
      } catch {}
    }
  }

  const prompt = `You are a senior API documentation engineer. Analyze the following route/controller source files and generate comprehensive API documentation in Markdown format.

SOURCE FILES:
${context}

Generate structured API documentation with:

# 📡 API Reference

## Overview
Brief description of the API (base URL, auth method if detectable, content type).

## Endpoints

For EACH endpoint found, create a section like:

### \`METHOD /path\`
| Field | Details |
|---|---|
| **Method** | GET / POST / PUT / DELETE / PATCH |
| **Path** | /api/example |
| **Description** | What this endpoint does |
| **Auth Required** | Yes / No |

**Request Body** (if applicable):
\`\`\`json
{
  "field": "type — description"
}
\`\`\`

**Success Response** \`200 OK\`:
\`\`\`json
{
  "field": "example value"
}
\`\`\`

**Error Responses**: List likely error codes and messages.

---

Be specific and detailed. Infer request/response shapes from the code. Output ONLY the markdown.`;

  return await generateAIResponse(prompt);
}
