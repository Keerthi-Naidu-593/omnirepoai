import express from "express";
import { analyzeRepository } from "./repoAnalyzer.js";
import { chatWithRepo } from "./repoChat.js";
import { generateDocumentation } from "./docGenerator.js";
import { analyzeDeploymentChanges } from "./deploymentAnalyzer.js";
import { summarizePR } from "./prSummarizer.js";
import { generateReadme } from "./readmeGenerator.js";
import { generateApiDocs } from "./apiDocGenerator.js";
import { generateOnboarding } from "./onboardingGenerator.js";
import { 
  isGitHubUrl, 
  cloneGitHubRepo, 
  cleanupTempDir,
  getRepoInfoFromUrl 
} from "./githubCloner.js";

const router = express.Router();

/**
 * Helper: Processes both local paths and GitHub URLs
 */
async function processRepository(input, analysisCallback) {
  let localPath = input;
  let tempDir = null;

  try {
    // Check if input is GitHub URL
    if (isGitHubUrl(input)) {
      console.log(`GitHub URL detected: ${input}`);
      tempDir = await cloneGitHubRepo(input);
      localPath = tempDir;
    }

    // Run the analysis callback
    const result = await analysisCallback(localPath);
    
    return result;
  } finally {
    // Cleanup temporary directory if it was created
    if (tempDir) {
      await cleanupTempDir(tempDir);
    }
  }
}

router.post("/analyze-repo", async (req, res) => {
  try {
    const { repoPath } = req.body;
    
    const result = await processRepository(repoPath, (path) => {
      return analyzeRepository(path);
    });

    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/repo-chat", async (req, res) => {
  try {
    const { repoPath, question } = req.body;
    
    const result = await processRepository(repoPath, (path) => {
      return chatWithRepo(path, question);
    });

    res.json({ answer: result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/generate-docs", async (req, res) => {
  try {
    const { repoPath } = req.body;
    
    const result = await processRepository(repoPath, (path) => {
      return generateDocumentation(path);
    });

    res.json({ docs: result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/deployment-changes", async (req, res) => {
  try {
    const { repoPath } = req.body;
    
    const result = await processRepository(repoPath, (path) => {
      return analyzeDeploymentChanges(path);
    });

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

router.post("/generate-readme", async (req, res) => {
  try {
    const { repoPath } = req.body;
    
    const result = await processRepository(repoPath, (path) => {
      return generateReadme(path);
    });

    res.json({ readme: result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/generate-api-docs", async (req, res) => {
  try {
    const { repoPath } = req.body;
    
    const result = await processRepository(repoPath, (path) => {
      return generateApiDocs(path);
    });

    res.json({ apiDocs: result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/generate-onboarding", async (req, res) => {
  try {
    const { repoPath } = req.body;
    
    const result = await processRepository(repoPath, (path) => {
      return generateOnboarding(path);
    });

    res.json({ guide: result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;