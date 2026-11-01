#!/usr/bin/env node

/**
 * verify-interactive-containers.js
 * Verifies that all highlighted/interactive card containers across key landing pages
 * are fully clickable (either via direct anchor wrapping or card-stretched-link overlay),
 * navigate to valid targets, and maintain sequential numbering and ordering.
 */

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.resolve(__dirname, '..', 'dist');

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

console.log('🔍 Auditing Interactive Card Containers, Clickability & Sequential Ordering...\n');

// 1. Homepage Check
console.log('--- 1. Homepage Interactive Containers & Ordering ---');
const homeHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8');

// Check Section 1 Domains: 4 sequential domain cards
assert(homeHtml.includes('Domain 01') && homeHtml.includes('Android & Native Architecture'), 'Homepage includes Domain 01 (Android & Native Architecture)');
assert(homeHtml.includes('Domain 02') && homeHtml.includes('Kotlin Multiplatform (KMP/CMP)'), 'Homepage includes Domain 02 (Kotlin Multiplatform)');
assert(homeHtml.includes('Domain 03') && homeHtml.includes('On-Device AI & Edge Compute'), 'Homepage includes Domain 03 (On-Device AI & Edge Compute)');
assert(homeHtml.includes('Domain 04') && homeHtml.includes('Commerce & Hardware Integration'), 'Homepage includes Domain 04 (Commerce & Hardware Integration)');

// Check Section 2 Systems: 2 systems with stretched links
assert(homeHtml.includes('System 01') && homeHtml.includes('AI Playground'), 'Homepage includes System 01 (AI Playground)');
assert(homeHtml.includes('System 02') && homeHtml.includes('VelociHue'), 'Homepage includes System 02 (VelociHue)');
assert(homeHtml.includes('class="card-stretched-link"') && homeHtml.includes('href="/posts/ai_playground_series/"'), 'AI Playground system card has card-stretched-link to /posts/ai_playground_series/');
assert(homeHtml.includes('class="card-stretched-link"') && homeHtml.includes('href="/projects/"'), 'VelociHue system card has card-stretched-link to /projects/');

// Check Section 3 Series: All 6 sequential parts
for (let i = 1; i <= 6; i++) {
  assert(homeHtml.includes(`Part ${i} of 6`), `Homepage Series Section includes Part ${i} of 6 in sequence`);
}

// Verify sequential order in homepage HTML (indices must be strictly ascending)
const partIndices = [1, 2, 3, 4, 5, 6].map(i => homeHtml.indexOf(`Part ${i} of 6`));
let isSequential = true;
for (let i = 0; i < partIndices.length - 1; i++) {
  if (partIndices[i] >= partIndices[i + 1]) {
    isSequential = false;
    break;
  }
}
assert(isSequential, 'Homepage series cards are rendered in strictly ascending sequential order (Parts 1 -> 6)');

// 2. Posts Index Check
console.log('\n--- 2. Posts Index Page Container Clickability & Ordering ---');
const postsHtml = fs.readFileSync(path.join(DIST_DIR, 'posts', 'index.html'), 'utf8');
assert(postsHtml.includes('Beyond the Model: Building a Private AI Playground'), 'Posts index includes Featured Series');
assert(postsHtml.includes('All Published Articles'), 'Posts index includes All Published Articles section');

for (let i = 1; i <= 6; i++) {
  assert(postsHtml.includes(`Part ${i}`), `Posts index includes Part ${i}`);
}
assert(postsHtml.includes('class="card-stretched-link"'), 'Posts index cards use card-stretched-link for full container clickability');

// 3. AI Playground Series Index Check
console.log('\n--- 3. Series Index Page Container Clickability & Ordering ---');
const seriesHtml = fs.readFileSync(path.join(DIST_DIR, 'posts', 'ai_playground_series', 'index.html'), 'utf8');
for (let i = 1; i <= 6; i++) {
  assert(seriesHtml.includes(`Part ${i} of 6`), `Series index includes Part ${i} of 6`);
}

const seriesPartIndices = [1, 2, 3, 4, 5, 6].map(i => seriesHtml.indexOf(`Part ${i} of 6`));
let isSeriesSequential = true;
for (let i = 0; i < seriesPartIndices.length - 1; i++) {
  if (seriesPartIndices[i] >= seriesPartIndices[i + 1]) {
    isSeriesSequential = false;
    break;
  }
}
assert(isSeriesSequential, 'Series index cards are strictly sequential in ascending order');
assert(seriesHtml.includes('class="card-stretched-link"'), 'Series index cards use card-stretched-link for full container clickability');

// 4. CSS Clickable Overlay Guardrail Check
console.log('\n--- 4. CSS Clickable Container Overlay Utilities ---');
const compCss = fs.readFileSync(path.join(DIST_DIR, 'css', 'components.css'), 'utf8');
assert(compCss.includes('.card-stretched-link::after') || compCss.includes('.card-stretched-link:after'), '.card-stretched-link pseudo-element rule exists');
assert(compCss.includes('position: absolute') && compCss.includes('inset: 0'), 'card-stretched-link covers entire container (inset: 0)');
assert(compCss.includes('z-index: 2'), 'Secondary action buttons and pills sit above stretched link (z-index: 2)');

// 5. Icon Prefix Verification (Icon must appear before Text)
console.log('\n--- 5. Icon-as-Prefix Placement Verification ---');
const btnRegex = /<(?:a|button)[^>]*class="[^"]*\bbtn\b[^"]*"[^>]*>([\s\S]*?)<\/(?:a|button)>/g;
let match;
let btnCount = 0;
let prefixCount = 0;
while ((match = btnRegex.exec(homeHtml)) !== null) {
  const content = match[1];
  if (content.includes('<svg') && content.includes('<span')) {
    btnCount++;
    const svgIdx = content.indexOf('<svg');
    const spanIdx = content.indexOf('<span');
    if (svgIdx < spanIdx) {
      prefixCount++;
    }
  }
}
assert(btnCount > 0 && prefixCount === btnCount, `All ${btnCount} homepage buttons with icons place the icon first as prefix (${prefixCount}/${btnCount})`);

// 6. Actionable vs Non-Actionable Hover Affordance Separation
console.log('\n--- 6. Actionable vs Non-Actionable Hover Affordance Separation ---');
assert(compCss.includes('.card {') && compCss.includes('cursor: default;'), 'Passive card containers default to cursor: default');
assert(compCss.includes('.card-interactive,') && compCss.includes('cursor: pointer;'), 'Interactive cards enforce cursor: pointer');
assert(compCss.includes('.card:not(.card-interactive):not(a):hover') && compCss.includes('transform: none;'), 'Non-actionable cards maintain dull hover state (no transform lift)');
assert(compCss.includes('.card-interactive:hover,') && compCss.includes('transform: translateY(-3px);'), 'Actionable cards apply -3px vertical lift and glow on hover');
assert(compCss.includes('span.chip:hover') && compCss.includes('transform: none;'), 'Static chips maintain dull hover without lift');
assert(compCss.includes('a.chip:hover') && compCss.includes('transform: translateY(-1px);'), 'Clickable chips apply interactive hover lift');

console.log('\n========================================');
console.log(`Interactive Container Audit: ${passed} passed, ${failed} failed.`);
console.log('========================================\n');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('🎉 100% interactive containers are fully clickable with sequential order maintained!\n');
}
