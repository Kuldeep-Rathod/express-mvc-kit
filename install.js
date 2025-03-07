#!/usr/bin/env node
import { execSync } from "child_process";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const repoUrl = "https://github.com/Kuldeep-Rathod/express-mvc-gen.git";
const projectName = process.argv[2] || "my-express-app";
const targetPath = path.join(process.cwd(), projectName);

if (fs.existsSync(targetPath)) {
    console.error(`Error: Directory ${projectName} already exists!`);
    process.exit(1);
}

console.log("Cloning repository...");
execSync(`git clone ${repoUrl} ${targetPath}`, { stdio: "inherit" });

console.log("Installation complete. Navigate to the project:");
console.log(`cd ${projectName} && npm install`);
