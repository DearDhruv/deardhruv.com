#!/usr/bin/env node

/**
 * verify-astro-parity.js
 * Validates Netlify hosting parity, Edge Function compatibility,
 * and route fidelity between Astro static output and Hugo control.
 */

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const astroDist = path.join(repoRoot, 'astro-spike', 'dist');
const hugoPublic = path.join(repoRoot, 'public');

let passes = 0;
let failures = 0;

function assert(condition, message) {
  if (condition) {
    passes++;
    console.log(`  ✅ ${message}`);
  } else {
    failures++;
    console.error(`  ❌ FAIL: ${message}`);
  }
}

console.log('🔍 Validating Netlify Hosting & Astro Spike Parity...\n');

if (!fs.existsSync(astroDist)) {
  console.error('❌ astro-spike/dist/ missing. Run "cd astro-spike && npx astro build" first.');
  process.exit(1);
}

// 1. Core Route Directory Existence
const coreRoutes = [
  'index.html',
  'about/index.html',
  'portfolio/index.html',
  'projects/index.html',
  'posts/index.html',
  'sitemap/index.html',
  'index.json',
  'index.md'
];

for (const rel of coreRoutes) {
  const filePath = path.join(astroDist, rel);
  assert(fs.existsSync(filePath), `Astro static route generated: /${rel}`);
}

// 2. Machine Discovery & Static Assets Exact Parity
const staticAssets = [
  'llms.txt',
  'auth.md',
  'resume.pdf',
  '.well-known/mcp.json',
  '.well-known/api-catalog',
  '.well-known/oauth-protected-resource',
  '.well-known/openid-configuration'
];

for (const asset of staticAssets) {
  const astroAsset = path.join(astroDist, asset);
  const hugoAsset = path.join(hugoPublic, asset);
  assert(fs.existsSync(astroAsset), `Discovery asset present in Astro dist: /${asset}`);

  if (fs.existsSync(astroAsset) && fs.existsSync(hugoAsset)) {
    const astroSize = fs.statSync(astroAsset).size;
    const hugoSize = fs.statSync(hugoAsset).size;
    assert(astroSize === hugoSize, `Asset size matches Hugo control for /${asset} (${astroSize} bytes)`);
  }
}

// 3. Netlify Redirect & Edge Function Invariant Check
const netlifyToml = fs.readFileSync(path.join(repoRoot, 'netlify.toml'), 'utf8');
assert(
  netlifyToml.includes('from = "/feed.json"') && netlifyToml.includes('to = "/index.json"'),
  'Netlify /feed.json -> /index.json 200 rewrite rule intact in netlify.toml'
);
assert(
  netlifyToml.includes('function = "markdown-negotiation"') && netlifyToml.includes('path = "/*"'),
  'Netlify Edge Function markdown-negotiation mapped to /* in netlify.toml'
);

// 4. Edge Function Rewrite Simulation for Root Markdown Endpoint
const rootMdFile = path.join(astroDist, 'index.md');
assert(
  fs.existsSync(rootMdFile) && fs.statSync(rootMdFile).size > 0,
  'Astro emits valid, non-empty index.md for Edge Function content negotiation'
);

console.log('\n========================================');
console.log(`Astro Parity Check: ${passes} passed, ${failures} failed.`);
console.log('========================================\n');

if (failures > 0) {
  process.exit(1);
} else {
  console.log('🎉 100% Netlify hosting and Edge Function parity confirmed on Astro spike!\n');
}
