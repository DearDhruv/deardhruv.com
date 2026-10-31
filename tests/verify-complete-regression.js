#!/usr/bin/env node
/**
 * Complete Route and Content Regression Gate
 * Validates 100% parity across all 38 legacy routes, 7 static assets,
 * internal links, edge function rewrites, and content files against dist/.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

console.log('🚀 Running Complete Route and Content Regression Gate against dist/...\n');

if (!fs.existsSync(DIST_DIR)) {
  console.log('📦 dist/ not found. Running npm run build:astro...');
  execSync('npm run build:astro', { stdio: 'inherit', cwd: ROOT_DIR });
}

let allPassed = true;

const suites = [
  { name: 'Legacy Routes Parity (38/38)', cmd: 'PUBLIC_DIR=dist node scripts/verify-routes.js' },
  { name: 'Static Assets & Discovery Files (7/7)', cmd: 'PUBLIC_DIR=dist node tests/verify-assets.js' },
  { name: 'Internal Link Resolution & HTML Semantics', cmd: 'PUBLIC_DIR=dist node tests/verify-links.js' },
  { name: 'Netlify Edge Negotiation & Markdown Rewrites (72/72)', cmd: 'PUBLIC_DIR=dist node tests/verify-edge-functions.js' },
  { name: 'Content Loader Integrity (28/28)', cmd: 'node tests/verify-content-loader.js' }
];

for (const suite of suites) {
  console.log(`\n==================================================`);
  console.log(`▶ Running Suite: ${suite.name}`);
  console.log(`==================================================`);
  try {
    execSync(suite.cmd, { stdio: 'inherit', cwd: ROOT_DIR, env: { ...process.env, PUBLIC_DIR: 'dist' } });
    console.log(`✅ ${suite.name} PASSED.`);
  } catch (err) {
    console.error(`❌ ${suite.name} FAILED.`);
    allPassed = false;
  }
}

console.log(`\n==================================================`);
if (allPassed) {
  console.log(`🎉 ALL 5 REGRESSION TEST SUITES PASSED AGAINST dist/! 100% PARITY CONFIRMED.`);
  process.exit(0);
} else {
  console.error(`❌ REGRESSION FAILURES DETECTED AGAINST dist/.`);
  process.exit(1);
}
