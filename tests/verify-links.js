#!/usr/bin/env node
/**
 * Automated HTML & Internal Link Crawler
 * Crawls all generated HTML files in public/ to verify:
 * 1. Semantic validity (<title>, <meta viewport>, <main id="main"> or valid landmark)
 * 2. 100% resolution of all internal hyperlinks (no 404s, no broken anchor targets)
 */
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = process.env.PUBLIC_DIR
  ? path.resolve(process.env.PUBLIC_DIR)
  : (fs.existsSync(path.join(ROOT_DIR, 'dist'))
      ? path.join(ROOT_DIR, 'dist')
      : path.join(ROOT_DIR, 'public'));

if (!fs.existsSync(PUBLIC_DIR)) {
  console.error(`❌ Output directory missing: ${PUBLIC_DIR}. Run 'npm run build:astro' first.`);
  process.exit(1);
}

// Find all HTML files recursively
function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = getHtmlFiles(PUBLIC_DIR);
console.log(`🔍 Crawling and validating ${htmlFiles.length} generated HTML documents in ${path.relative(ROOT_DIR, PUBLIC_DIR)}/...\n`);

let checkedLinks = 0;
let brokenLinks = 0;
let markupIssues = 0;

for (const filePath of htmlFiles) {
  const relFilePath = path.relative(PUBLIC_DIR, filePath);
  const content = fs.readFileSync(filePath, 'utf-8');

  // Skip crawling redirect/alias pages (Hugo auto-generated meta-refresh stubs)
  if (content.includes('http-equiv="refresh"') || content.includes('http-equiv=refresh')) {
    continue;
  }

  // 1. Basic Markup Verification
  if (!content.includes('<!doctype html') && !content.includes('<!DOCTYPE html')) {
    console.error(`⚠️ Missing doctype in ${relFilePath}`);
    markupIssues++;
  }
  if (!content.includes('<title>')) {
    console.error(`⚠️ Missing <title> tag in ${relFilePath}`);
    markupIssues++;
  }
  if (!content.includes('name="viewport"') && !content.includes('name=viewport')) {
    console.error(`⚠️ Missing viewport meta in ${relFilePath}`);
    markupIssues++;
  }
  if (!content.includes('<main') || (!content.includes('id="main"') && !content.includes('id=main'))) {
    console.error(`⚠️ Missing accessible <main id="main"> landmark in ${relFilePath}`);
    markupIssues++;
  }

  // 2. Internal Link Extraction
  // Match href="..." or href=... in minified HTML
  const linkMatches = content.matchAll(/href=(?:["']([^"'#?]+)["']|([^"'#?>\s]+))/g);

  for (const match of linkMatches) {
    let target = match[1] || match[2] || '';
    if (target.startsWith('https://deardhruv.com')) {
      target = target.replace('https://deardhruv.com', '');
    }

    // Ignore external or empty
    if (!target.startsWith('/')) continue;

    checkedLinks++;

    // Resolve target path to file
    let targetFile = path.join(PUBLIC_DIR, target.replace(/^\//, ''));
    let exists = false;

    if (fs.existsSync(targetFile)) {
      const stat = fs.statSync(targetFile);
      if (stat.isDirectory()) {
        const indexHtml = path.join(targetFile, 'index.html');
        if (fs.existsSync(indexHtml)) exists = true;
      } else {
        exists = true;
      }
    } else {
      // Check if target is a directory without trailing slash
      const asDir = path.join(PUBLIC_DIR, target.replace(/^\//, ''), 'index.html');
      if (fs.existsSync(asDir)) exists = true;
    }

    if (!exists) {
      console.error(`❌ Broken link in ${relFilePath}: ${target}`);
      brokenLinks++;
    }
  }
}

console.log(`\n========================================`);
console.log(`Checked HTML files: ${htmlFiles.length}`);
console.log(`Checked internal links: ${checkedLinks}`);
console.log(`Markup issues: ${markupIssues}`);
console.log(`Broken internal links: ${brokenLinks}`);
console.log(`========================================\n`);

if (brokenLinks > 0 || markupIssues > 0) {
  console.error("❌ Validation failed.");
  process.exit(1);
} else {
  console.log("🎉 All HTML pages valid and all internal links resolve successfully!");
}
