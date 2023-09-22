#!/usr/bin/env node

import fs from "fs";
import { languages, defaultLang } from "../config.js";

// Iterate over each language
Object.keys(languages).forEach((lang) => {
  // Skip the default language
  if (lang === defaultLang) return;

  const distDir = `./dist/${lang}`;

  console.log("distDir", distDir);

  // Check if ./dist/{lang}/404/index.html exists
  if (fs.existsSync(`${distDir}/404/index.html`)) {
    // Move and rename ./dist/{lang}/404/index.html to ./dist/{lang}/404.html
    fs.renameSync(`${distDir}/404/index.html`, `${distDir}/404.html`);

    // Remove ./dist/{lang}/404 directory
    fs.rmdirSync(`${distDir}/404`, { recursive: true });
  }
});

process.exit(0);
