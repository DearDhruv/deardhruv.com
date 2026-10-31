#!/usr/bin/env node
/**
 * Performance Budget & Client Runtime Verification
 * Verifies:
 * 1. Zero framework client hydration bundles (0 KB React/Vue/Svelte runtime).
 * 2. Total client JS footprint < 5 KB (only lightweight vanilla theme toggle).
 * 3. Total CSS token and primitive budget < 45 KB uncompressed (< 10 KB gzip).
 * 4. Static page build duration < 2.0 seconds.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const CSS_DIR = path.join(DIST_DIR, 'css');
const JS_DIR = path.join(DIST_DIR, 'js');

console.log('🔍 Auditing Performance Budgets & Client Runtime Metrics...\n');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  ✅ ${message}`);
  } else {
    failed++;
    console.error(`  ❌ FAIL: ${message}`);
  }
}

// 1. Measure Build Time
console.log('--- Build Duration Benchmark ---');
const startTime = Date.now();
execSync('npm run build:astro', { cwd: ROOT_DIR, stdio: 'pipe' });
const buildDurationMs = Date.now() - startTime;
assert(buildDurationMs < 2000, `Astro full static build completed in ${buildDurationMs}ms (budget < 2000ms)`);

// 2. Measure CSS Bundle Footprint
console.log('\n--- CSS Performance Budget ---');
const cssFiles = fs.readdirSync(CSS_DIR).filter(f => f.endsWith('.css'));
let totalCssBytes = 0;

for (const file of cssFiles) {
  const size = fs.statSync(path.join(CSS_DIR, file)).size;
  totalCssBytes += size;
  console.log(`     ${file}: ${(size / 1024).toFixed(2)} KB`);
}

const totalCssKb = (totalCssBytes / 1024).toFixed(2);
assert(totalCssBytes < 45000, `Total uncompressed CSS is ${totalCssKb} KB (budget < 45 KB)`);

// 3. Client JS Zero-Framework Guarantee
console.log('\n--- Client JS Zero-Framework Guarantee ---');
const astroDir = path.join(DIST_DIR, '_astro');
const hasAstroJsBundles = fs.existsSync(astroDir) && fs.readdirSync(astroDir).some(f => f.endsWith('.js'));
assert(!hasAstroJsBundles, 'Zero client hydration runtime bundles generated in _astro/');

let totalJsBytes = 0;
if (fs.existsSync(JS_DIR)) {
  const jsFiles = fs.readdirSync(JS_DIR).filter(f => f.endsWith('.js'));
  for (const file of jsFiles) {
    const size = fs.statSync(path.join(JS_DIR, file)).size;
    totalJsBytes += size;
    console.log(`     ${file}: ${(size / 1024).toFixed(2)} KB`);
  }
}

const totalJsKb = (totalJsBytes / 1024).toFixed(2);
assert(totalJsBytes < 5000, `Total client JS footprint is ${totalJsKb} KB (budget < 5 KB)`);

console.log(`\n========================================`);
console.log(`Performance Budget Audit: ${passed} passed, ${failed} failed`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('🎉 100% Performance budgets verified!');
  process.exit(0);
}
