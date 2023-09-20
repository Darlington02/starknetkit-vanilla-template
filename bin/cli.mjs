#!/usr/bin/env node
import { promisify } from "util";
import cp from "child_process";
import path from "path";
import fs, { existsSync, mkdirSync } from "fs";
// cli spinners
import ora from "ora";

// convert libs to promises
const exec = promisify(cp.exec);
const rm = promisify(fs.rm);

if (process.argv.length < 3) {
  console.log("You have to provide an app name and optionally choose your starter kit type.");
  console.log("For example :");
  console.log("    npx create-starknetkit-app my-app starknet-react");
  process.exit(1);
}

const projectName = process.argv[2];
const projectType = process.argv[3];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);

// get github repo
let git_repo;
if(projectType == "starknet-react"){
  git_repo = "https://github.com/Darlington02/starknetkit-sr-template.git";
}
else {
  git_repo = "https://github.com/Darlington02/starknetkit-vanilla-template.git";
}

// create project directory
if (fs.existsSync(projectPath)) {
  console.log(`The file ${projectName} already exist in the current directory, please give it another name.`);
  process.exit(1);
}
else {
  fs.mkdirSync(projectPath);
}

try {
  const gitSpinner = ora("Downloading files...").start();
  // clone the repo into the project folder -> creates the new boilerplate
  await exec(`git clone --depth 1 ${git_repo} ${projectPath} --quiet`);
  gitSpinner.succeed();

  const cleanSpinner = ora("Removing useless files").start();
  // remove my git history
  const rmGit = rm(path.join(projectPath, ".git"), { recursive: true, force: true });
  // remove the installation file
  const rmBin = rm(path.join(projectPath, "bin"), { recursive: true, force: true });
  await Promise.all([rmGit, rmBin]);

  process.chdir(projectPath);
  // remove the packages needed for cli
  await exec("npm uninstall ora cli-spinners");
  cleanSpinner.succeed();

  const npmSpinner = ora("Installing dependencies...").start();
  await exec("npm install");
  npmSpinner.succeed();

  console.log("The installation is done!");
  console.log("You can now run your app with:");
  console.log(`    cd ${projectName}`);
  console.log(`    npm run dev`);

} catch (error) {
  // clean up in case of error, so the user does not have to do it manually
  fs.rmSync(projectPath, { recursive: true, force: true });
  console.log(error);
}