import fs from "fs";
import path from "path";

function walkDir(dir, fileList = []) {
  const ignore = ["node_modules", ".git", "dist", "build", "out", "coverage"];

  let files;
  try {
    files = fs.readdirSync(dir);
  } catch (e) {
    console.log("PATH ERROR:", e.message);
    return fileList;
  }

  for (const file of files) {
    if (ignore.includes(file)) continue;

    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walkDir(fullPath, fileList);
    } else {
      fileList.push(fullPath);
    }
  }

  return fileList;
}

export function analyzeRepository(repoPath) {
  if (!repoPath) {
    console.log("ERROR: repoPath missing");
    return { files: 0, techs: [] };
  }

  repoPath = repoPath.replace(/\\/g, "/");
  if (!repoPath.endsWith("/")) repoPath += "/";

  console.log("FINAL PATH:", repoPath);

  if (!fs.existsSync(repoPath)) {
    throw new Error("Repository path does not exist");
  }

  const allFiles = walkDir(repoPath, []);
  const files = allFiles;

  const techs = [];
  if (files.some((f) => f.endsWith("package.json"))) techs.push("Node.js");
  if (files.some((f) => f.endsWith(".jsx") || f.endsWith(".tsx"))) techs.push("React");
  if (files.some((f) => f.includes("tailwind.config"))) techs.push("Tailwind CSS");
  if (files.some((f) => f.endsWith(".py"))) techs.push("Python");
  if (files.some((f) => f.endsWith(".java"))) techs.push("Java");

  return {
    repoPath,
    totalFiles: files.length,
    techs,
    sampleFiles: files.slice(0, 30)
  };
}