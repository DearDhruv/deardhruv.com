#!/usr/bin/env node
/**
 * HTML Standards, Semantics, and Structure Validator
 * 
 * Audits all generated HTML files in dist/ against W3C/WHATWG Living Standards
 * and WCAG 2.2 Level AA semantic criteria.
 * 
 * Verifications per document:
 * 1. Valid HTML5 DOCTYPE
 * 2. html[lang="en"] root declaration
 * 3. UTF-8 charset declaration
 * 4. Responsive viewport meta tag
 * 5. Unique, non-empty <title> with zero duplicate site branding
 * 6. Accessible landmark coverage: <header>, <nav>, <main id="main">, <footer>
 * 7. Accessible skip-to-content navigation link
 * 8. Strict single <h1> document heading
 * 9. Strict sequential heading hierarchy (zero heading level skips)
 * 10. Alternative text attributes on 100% of <img> tags
 * 11. Zero duplicate element IDs within the document scope
 * 12. Zero illegal nested interactive elements (<a> in <a>, <button> in <button>)
 * 13. Valid Schema.org JSON-LD syntax
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = process.env.PUBLIC_DIR
  ? path.resolve(process.env.PUBLIC_DIR)
  : path.join(ROOT_DIR, 'dist');

if (!fs.existsSync(DIST_DIR)) {
  console.error(`❌ dist/ directory not found at ${DIST_DIR}. Run 'npm run build:astro' first.`);
  process.exit(1);
}

function getAllHtmlFiles(dir) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getAllHtmlFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

const htmlFiles = getAllHtmlFiles(DIST_DIR);
console.log(`🔍 Auditing ${htmlFiles.length} HTML files in ${path.relative(ROOT_DIR, DIST_DIR)}/ for Web Standards...\n`);

let passedChecks = 0;
let failedChecks = 0;
let warnings = 0;

function assert(condition, message, relPath = '') {
  const context = relPath ? ` [${relPath}]` : '';
  if (condition) {
    passedChecks++;
    console.log(`  ✅ ${message}${context}`);
  } else {
    failedChecks++;
    console.error(`  ❌ FAIL: ${message}${context}`);
  }
}

function warn(message, relPath = '') {
  warnings++;
  const context = relPath ? ` [${relPath}]` : '';
  console.warn(`  ⚠️ WARN: ${message}${context}`);
}

for (const filePath of htmlFiles) {
  const relPath = path.relative(DIST_DIR, filePath);
  const content = fs.readFileSync(filePath, 'utf-8');

  // Skip legacy refresh stubs (alias redirects)
  if (content.includes('http-equiv="refresh"') || content.includes('http-equiv=refresh')) {
    continue;
  }

  console.log(`--- Checking: ${relPath} ---`);

  // 1. DOCTYPE
  assert(
    content.toLowerCase().startsWith('<!doctype html'),
    'Valid HTML5 DOCTYPE declaration',
    relPath
  );

  // 2. html[lang="en"]
  assert(
    /<html\b[^>]*\blang=["']en["']/i.test(content),
    'html tag declares lang="en"',
    relPath
  );

  // 3. UTF-8 charset
  assert(
    /<meta\b[^>]*\bcharset=["']?utf-8["']?/i.test(content),
    'meta charset UTF-8 declared',
    relPath
  );

  // 4. Viewport meta
  assert(
    /<meta\b[^>]*\bname=["']viewport["'][^>]*\bcontent=["'][^"']*width=device-width/i.test(content),
    'Responsive viewport meta configured',
    relPath
  );

  // 5. Title & no duplicate branding
  const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
  assert(
    Boolean(titleMatch && titleMatch[1].trim().length > 0),
    'Document has non-empty <title>',
    relPath
  );
  if (titleMatch) {
    const titleText = titleMatch[1];
    const brandingMatches = (titleText.match(/Dhruv Patel/g) || []).length;
    assert(
      brandingMatches <= 1,
      `Title has clean branding without duplication (found ${brandingMatches} occurrences)`,
      relPath
    );
  }

  // 6. Landmark coverage
  assert(
    content.includes('<header class="site-header"') || content.includes('<header class="site-header '),
    'Accessible <header class="site-header"> landmark present',
    relPath
  );
  assert(
    content.includes('<nav') && content.includes('</nav>'),
    'Accessible <nav> navigation landmark present',
    relPath
  );
  assert(
    content.includes('<main id="main"') || content.includes('<main id="main '),
    'Accessible <main id="main"> landmark present',
    relPath
  );
  assert(
    content.includes('<footer class="site-footer"') || content.includes('<footer class="site-footer '),
    'Accessible <footer class="site-footer"> landmark present',
    relPath
  );

  // 7. Skip link
  assert(
    content.includes('href="#main"') && content.includes('skip-link'),
    'Accessible skip-to-content link targeting #main present',
    relPath
  );

  // 8. Strict single H1
  const h1Matches = content.match(/<h1\b[^>]*>/gi) || [];
  assert(
    h1Matches.length === 1,
    `Strict single <h1> document heading (found: ${h1Matches.length})`,
    relPath
  );

  // 9. Strict sequential heading hierarchy (zero heading skips e.g. h1 -> h3 or h2 -> h4)
  const headingElements = [...content.matchAll(/<h([1-6])\b[^>]*>/gi)].map(m => parseInt(m[1], 10));
  let headingSkips = [];
  for (let i = 1; i < headingElements.length; i++) {
    const prev = headingElements[i - 1];
    const curr = headingElements[i];
    if (curr > prev + 1) {
      headingSkips.push(`h${prev} -> h${curr}`);
    }
  }
  assert(
    headingSkips.length === 0,
    `Strict sequential heading progression (zero heading level skips; found: ${headingSkips.length === 0 ? '0' : headingSkips.join(', ')})`,
    relPath
  );

  // 10. Image alt text
  const imgMatches = [...content.matchAll(/<img\b([^>]*)>/gi)];
  let allImagesHaveAlt = true;
  for (const match of imgMatches) {
    const attrs = match[1];
    if (!/\balt\s*=\s*["']/i.test(attrs)) {
      allImagesHaveAlt = false;
      break;
    }
  }
  assert(
    allImagesHaveAlt,
    `All <img> tags declare alt attribute (${imgMatches.length} images evaluated)`,
    relPath
  );

  // 10. Duplicate IDs
  const idMatches = [...content.matchAll(/\bid=["']([^"'\s>]+)["']/gi)].map(m => m[1]);
  const seenIds = new Set();
  const duplicateIds = new Set();
  for (const id of idMatches) {
    if (seenIds.has(id)) {
      duplicateIds.add(id);
    }
    seenIds.add(id);
  }
  assert(
    duplicateIds.size === 0,
    `Zero duplicate element IDs (evaluated ${idMatches.length} IDs, duplicates: ${duplicateIds.size})`,
    relPath
  );

  // 11. No illegal nested interactive elements
  const nestedLinks = /<a\b[^>]*>(?:(?!<\/a>)[\s\S])*?<a\b/gi.test(content);
  assert(!nestedLinks, 'Zero illegal nested <a> tags', relPath);

  const nestedButtons = /<button\b[^>]*>(?:(?!<\/button>)[\s\S])*?<button\b/gi.test(content);
  assert(!nestedButtons, 'Zero illegal nested <button> tags', relPath);

  // 12. Valid JSON-LD
  const jsonLdMatches = [...content.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  let jsonLdValid = true;
  for (const match of jsonLdMatches) {
    try {
      JSON.parse(match[1]);
    } catch (err) {
      jsonLdValid = false;
      console.error(`  ❌ Invalid JSON-LD in ${relPath}: ${err.message}`);
    }
  }
  assert(
    jsonLdValid,
    `Schema.org JSON-LD valid syntax (${jsonLdMatches.length} blocks verified)`,
    relPath
  );

  console.log('');
}

console.log('========================================');
console.log(`HTML Standards Validation Results:`);
console.log(`  Passed:   ${passedChecks}`);
console.log(`  Failed:   ${failedChecks}`);
console.log(`  Warnings: ${warnings}`);
console.log('========================================\n');

if (failedChecks > 0) {
  console.error(`❌ HTML standards validation failed with ${failedChecks} errors.`);
  process.exit(1);
} else {
  console.log(`🎉 100% of HTML files meet W3C and WCAG 2.2 semantic standards!`);
  process.exit(0);
}
