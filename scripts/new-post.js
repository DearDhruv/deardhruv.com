#!/usr/bin/env node
/**
 * Safe New Article Creation Helper
 * Scaffolds new article drafts under content/posts/ without overwriting existing content.
 */
const fs = require('fs');
const path = require('path');

const title = process.argv[2];

if (!title) {
  console.error("Usage: node scripts/new-post.js \"My New Article Title\" [series-folder]");
  process.exit(1);
}

const seriesFolder = process.argv[3] || '';

// Generate slug
const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

const targetDir = seriesFolder 
  ? path.join(__dirname, '..', 'content', 'posts', seriesFolder)
  : path.join(__dirname, '..', 'content', 'posts');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const targetFile = path.join(targetDir, `${slug}.md`);

if (fs.existsSync(targetFile)) {
  console.error(`❌ Error: File already exists at: ${targetFile}`);
  console.error("Will not overwrite existing article.");
  process.exit(1);
}

const now = new Date();
const pad = (n) => String(n).padStart(2, '0');
// Local ISO offset
const offsetMin = -now.getTimezoneOffset();
const sign = offsetMin >= 0 ? '+' : '-';
const offsetHours = pad(Math.floor(Math.abs(offsetMin) / 60));
const offsetRemMin = pad(Math.abs(offsetMin) % 60);
const tz = `${sign}${offsetHours}:${offsetRemMin}`;

const isoDate = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}${tz}`;

const seriesField = seriesFolder ? `series = ["${seriesFolder.replace(/[-_]/g, ' ')}"]\n` : '';

const content = `+++
title = "${title.replace(/"/g, '\\"')}"
date = "${isoDate}"
lastmod = "${isoDate}"
description = "Executive summary of the technical article (1-2 sentences) for SEO, RSS, and JSON Feed."
tags = ["Android", "Kotlin Multiplatform"]
${seriesField}draft = false
[author]
  name = "Dhruv Patel"
+++

## Overview

Brief introduction setting the technical context, problem statement, and engineering scope.

## Architecture & System Constraints

Detail the hardware boundaries, memory limits, and platform-specific constraints.

\`\`\`kotlin
// Example code snippet
\`\`\`

## Key Learnings & Production Takeaways

- Summary bullet 1
- Summary bullet 2
`;

fs.writeFileSync(targetFile, content, 'utf-8');

console.log(`✅ Successfully scaffolded new article draft:`);
console.log(`   File: ${path.relative(path.join(__dirname, '..'), targetFile)}`);
console.log(`   Slug: ${slug}`);
console.log(`   Preview: run 'npm run dev:astro' to preview locally.`);
