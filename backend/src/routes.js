import express from "express";
import { analyzeRepository } from "./repoAnalyzer.js";
import { chatWithRepo } from "./repoChat.js";
import { generateDocumentation } from "./docGenerator.js";
import { analyzeDeploymentChanges } from "./deploymentAnalyzer.js";
import { summarizePR } from "./prSummarizer.js";
import { generateReadme } from "./readmeGenerator.js";
import { generateApiDocs } from "./apiDocGenerator.js";
import { generateOnboarding } from "./onboardingGenerator.js";

const router = express.Router();

router.post("/analyze-repo", (req, res) => {
  try {
    const { repoPath } = req.body;
    const result = analyzeRepository(repoPath);
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/repo-chat", async (req, res) => {
  try {
    const { repoPath, question } = req.body;
    const answer = await chatWithRepo(repoPath, question);
    res.json({ answer });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/generate-docs", async (req, res) => {
  try {
    const { repoPath } = req.body;
    const docs = await generateDocumentation(repoPath);
    res.json({ docs });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/deployment-changes", async (req, res) => {
  try {
    const { repoPath } = req.body;
    const result = await analyzeDeploymentChanges(repoPath);
    res.json({ explanation: result.explanation });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/summarize-pr", async (req, res) => {
  try {
    const { diffText } = req.body;
    const result = await summarizePR(diffText);
    res.json({ summary: result.summary });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── New Feature Routes ─────────────────────────────────────────────────────

router.post("/generate-readme", async (req, res) => {
  try {
    const { repoPath } = req.body;
    const readme = await generateReadme(repoPath);
    res.json({ readme });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/generate-api-docs", async (req, res) => {
  try {
    const { repoPath } = req.body;
    const apiDocs = await generateApiDocs(repoPath);
    res.json({ apiDocs });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/generate-onboarding", async (req, res) => {
  try {
    const { repoPath } = req.body;
    const guide = await generateOnboarding(repoPath);
    res.json({ guide });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
