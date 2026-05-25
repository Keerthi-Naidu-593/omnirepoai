import { simpleGit } from 'simple-git';
import { mkdtemp, rmdir } from 'fs/promises';
import path from 'path';
import os from 'os';

/**
 * Detects if input is a GitHub URL
 */
export function isGitHubUrl(input) {
  const gitHubUrlPattern = /^(https?:\/\/)?(github\.com|git@github\.com:)/;
  return gitHubUrlPattern.test(input);
}

/**
 * Normalizes GitHub URL to HTTPS format
 */
function normalizeGitHubUrl(url) {
  // Convert SSH to HTTPS
  if (url.startsWith('git@github.com:')) {
    const match = url.match(/git@github\.com:(.+?)\/(.+?)(\.git)?$/);
    if (match) {
      return `https://github.com/${match[1]}/${match[2]}.git`;
    }
  }
  // Ensure .git extension
  if (!url.endsWith('.git')) {
    url += '.git';
  }
  return url;
}

/**
 * Clones a GitHub repository to a temporary directory
 */
export async function cloneGitHubRepo(githubUrl) {
  try {
    const tempDir = await mkdtemp(path.join(os.tmpdir(), 'omnirepo-'));
    const normalizedUrl = normalizeGitHubUrl(githubUrl);
    
    console.log(`Cloning ${normalizedUrl} to ${tempDir}...`);
    const git = simpleGit();
    await git.clone(normalizedUrl, tempDir);
    
    console.log(`Successfully cloned to ${tempDir}`);
    return tempDir;
  } catch (error) {
    throw new Error(`Failed to clone GitHub repository: ${error.message}`);
  }
}

/**
 * Cleans up temporary directory after analysis
 */
export async function cleanupTempDir(dirPath) {
  try {
    await rmdir(dirPath, { recursive: true, force: true });
    console.log(`Cleaned up temporary directory: ${dirPath}`);
  } catch (error) {
    console.warn(`Failed to clean up ${dirPath}:`, error.message);
  }
}

/**
 * Gets repository info from URL (owner/repo name)
 */
export function getRepoInfoFromUrl(githubUrl) {
  const match = githubUrl.match(/github\.com[:/]([^/]+)\/(.+?)(\.git)?$/);
  if (match) {
    return { owner: match[1], repo: match[2] };
  }
  return null;
}