#!/usr/bin/env node
import { execSync } from "child_process";
import { existsSync } from "fs";
import { join } from "path";
import { cwd } from "process";

// Get the project name from command-line arguments
const projectName = process.argv[2] || "my-app";
const projectPath = join(cwd(), projectName);

if (existsSync(projectPath)) {
  console.error(`❌ Error: Directory "${projectName}" already exists.`);
  process.exit(1);
}

console.log(`🚀 Cloning express-mvc-starter into ${projectName}...`);

try {
  // Wrap projectPath in double quotes to handle spaces in directory names
  execSync(`git clone https://github.com/Kuldeep-Rathod/express-mvc-starter.git "${projectPath}"`, { stdio: "inherit" });
  console.log(`✅ Successfully cloned into ${projectPath}`);
} catch (error) {
  console.error("❌ Failed to clone repository:", error.message);
  process.exit(1);
}
