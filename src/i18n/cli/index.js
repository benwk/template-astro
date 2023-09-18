#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { languages, defaultLang } from "../config.js";

const srcDir = "./src/pages";
const targetDir = "./src/pages";

const updateImportPaths = (content) => {
  return content.replace(
    /import (.+) from ['"](\.\.?\/[^'"]+)['"]/g,
    (match, items, importPath) => {
      if (importPath.startsWith(".")) {
        // Only add '../' prefix for relative imports
        return `import ${items} from "../${importPath}"`;
      } else {
        // Keep other imports as they are
        return `import ${items} from "${importPath}"`;
      }
    }
  );
};

// Iterate through each language
Object.keys(languages).forEach((lang) => {
  // Skip the default language
  if (lang === defaultLang) return;

  const langDir = path.join(targetDir, lang);

  // Remove the language directory if it exists
  if (fs.existsSync(langDir)) {
    fs.rmSync(langDir, { recursive: true });
  }
  // Create the language directory
  fs.mkdirSync(langDir, { recursive: true });

  // Recursively copy files
  const copyFiles = (srcPath, targetPath) => {
    fs.readdirSync(srcPath, { withFileTypes: true }).forEach((dirent) => {
      const srcFilePath = path.join(srcPath, dirent.name);
      const targetFilePath = path.join(targetPath, dirent.name);

      if (dirent.isDirectory()) {
        // Skip if directory is a language directory
        if (languages[dirent.name]) return;

        // Create the target directory
        if (!fs.existsSync(targetFilePath)) {
          fs.mkdirSync(targetFilePath);
        }

        // Recurse into the directory
        copyFiles(srcFilePath, targetFilePath);
      } else {
        // Read the file content
        let content = fs.readFileSync(srcFilePath, "utf8");

        // Update import paths if it's an .astro file
        if (path.extname(srcFilePath) === ".astro") {
          content = updateImportPaths(content);
        }

        // Write to the target file
        fs.writeFileSync(targetFilePath, content, "utf8");
      }
    });
  };

  copyFiles(srcDir, langDir);
});
