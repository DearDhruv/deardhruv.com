#!/usr/bin/env node
/**
 * Static Assets & Document Verification
 * Ensures all downloadable files, machine endpoints, and document assets remain valid.
 */
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const STATIC_DIR = path.join(ROOT_DIR, 'static');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

const checks = [
  {
    name: 'Resume PDF',
    relPath: 'resume.pdf',
    minSize: 100000,
    validator: (buf) => buf.slice(0, 4).toString() === '%PDF',
  },
  {
    name: 'Apple Touch Icon',
    relPath: 'apple-touch-icon.png',
    minSize: 1000,
    validator: (buf) => buf.slice(1, 4).toString() === 'PNG',
  },
  {
    name: 'Favicon 32x32',
    relPath: 'favicon-32x32.png',
    minSize: 500,
    validator: (buf) => buf.slice(1, 4).toString() === 'PNG',
  },
  {
    name: 'LLMs.txt Discovery',
    relPath: 'llms.txt',
    minSize: 100,
    validator: (buf) => buf.toString('utf-8').includes('DearDhruv'),
  },
  {
    name: 'Auth Metadata',
    relPath: 'auth.md',
    minSize: 100,
    validator: (buf) => buf.toString('utf-8').includes('OAuth'),
  },
  {
    name: 'Well-Known MCP Discovery',
    relPath: '.well-known/mcp.json',
    minSize: 10,
    validator: (buf) => {
      JSON.parse(buf.toString('utf-8'));
      return true;
    },
  },
  {
    name: 'Well-Known API Catalog',
    relPath: '.well-known/api-catalog',
    minSize: 10,
    validator: (buf) => {
      JSON.parse(buf.toString('utf-8'));
      return true;
    },
  },
];

let failed = 0;
console.log('🔍 Checking downloadable assets and static documents...\n');

for (const check of checks) {
  const staticPath = path.join(STATIC_DIR, check.relPath);
  const publicPath = path.join(PUBLIC_DIR, check.relPath);

  if (!fs.existsSync(staticPath)) {
    console.error(`❌ Missing static source: ${staticPath}`);
    failed++;
    continue;
  }

  const buf = fs.readFileSync(staticPath);
  if (buf.length < check.minSize) {
    console.error(`❌ File too small (${buf.length} < ${check.minSize}): ${staticPath}`);
    failed++;
    continue;
  }

  try {
    if (!check.validator(buf)) {
      console.error(`❌ Validation failed for ${check.name} at ${staticPath}`);
      failed++;
      continue;
    }
  } catch (err) {
    console.error(`❌ Error validating ${check.name}: ${err.message}`);
    failed++;
    continue;
  }

  // Also check public output if built
  if (fs.existsSync(publicPath)) {
    const pubBuf = fs.readFileSync(publicPath);
    if (pubBuf.length !== buf.length) {
      console.error(`❌ Size mismatch between static/ and public/ for ${check.name}`);
      failed++;
      continue;
    }
  }

  console.log(`  ✅ ${check.name} (${buf.length} bytes) -> OK`);
}

if (failed > 0) {
  console.error(`\n❌ Asset verification failed with ${failed} errors.`);
  process.exit(1);
} else {
  console.log(`\n🎉 All ${checks.length} static assets and documents verified successfully.`);
}
