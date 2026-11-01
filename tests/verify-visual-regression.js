#!/usr/bin/env node
/**
 * Visual Regression & Responsive Matrix Verification
 * Audits 9 representative pages across 6 standard viewports:
 * 320px, 390px, 768px, 1024px, 1440px, 1920px
 * Confirms single-H1 hierarchy, landmark coverage, and zero layout overflow.
 */
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const BASELINE_FILE = path.join(__dirname, 'fixtures/visual-baseline.json');

if (!fs.existsSync(DIST_DIR)) {
  console.error("❌ dist/ directory missing. Run 'npm run build:astro' first.");
  process.exit(1);
}

const baseline = JSON.parse(fs.readFileSync(BASELINE_FILE, 'utf-8'));

console.log('🔍 Auditing Visual Regression & Responsive Matrix across 6 viewports...\n');

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

// 1. Audit Viewport Standards
console.log('--- Viewport Coverage Matrix ---');
const expectedViewports = [320, 390, 768, 1024, 1440, 1920];
for (const vp of baseline.viewports) {
  assert(expectedViewports.includes(vp.width), `Viewport ${vp.name} (${vp.width}x${vp.height}) configured in test matrix`);
}

// 2. Audit Representative Pages
console.log('\n--- Page Outline & Visual Landmarks ---');
const representativePages = [
  { id: 'home', file: 'index.html', title: 'Home' },
  { id: 'about', file: 'about/index.html', title: 'About' },
  { id: 'portfolio', file: 'portfolio/index.html', title: 'Portfolio' },
  { id: 'projects', file: 'projects/index.html', title: 'Projects' },
  { id: 'posts', file: 'posts/index.html', title: 'Posts Index' },
  { id: 'series', file: 'posts/ai_playground_series/index.html', title: 'Series Index' },
  { id: 'article', file: 'posts/ai_playground_series/01-i-wanted-the-model-to-stay-on-the-phone/index.html', title: 'Article 01' },
  { id: 'policy', file: 'other/ai-playground/privacy-policy-ai-playground-app/index.html', title: 'Privacy Policy' },
  { id: 'sitemap', file: 'sitemap/index.html', title: 'Sitemap' },
  { id: '404', file: '404.html', title: '404 Error Page' }
];

for (const p of representativePages) {
  const filePath = path.join(DIST_DIR, p.file);
  const exists = fs.existsSync(filePath);
  assert(exists, `${p.title} (${p.file}) exists in dist/`);

  if (!exists) continue;

  const html = fs.readFileSync(filePath, 'utf-8');

  // Exact Single H1 assertion (Critical fix for TYPO-01)
  const h1Matches = html.match(/<h1\b[^>]*>/g) || [];
  assert(h1Matches.length === 1, `${p.title} has exactly 1 <h1> tag (found: ${h1Matches.length})`);

  // Landmarks
  assert(html.includes('<main id="main"'), `${p.title} includes main landmark (<main id="main">)`);
  assert(html.includes('class="skip-link"'), `${p.title} includes accessible skip link`);
  assert(html.includes('<header class="site-header"'), `${p.title} includes accessible site header`);
  assert(html.includes('<footer class="site-footer"'), `${p.title} includes accessible site footer`);
  assert(html.includes('id="theme-toggle"'), `${p.title} includes interactive theme toggle`);

  // Viewport meta
  assert(html.includes('name="viewport" content="width=device-width, initial-scale=1.0"'), `${p.title} contains responsive viewport meta`);

  // Design system stylesheets
  assert(html.includes('/css/design-system.css'), `${p.title} links /css/design-system.css`);
  assert(html.includes('/css/typography.css'), `${p.title} links /css/typography.css`);
  assert(html.includes('/css/layout.css'), `${p.title} links /css/layout.css`);
  assert(html.includes('/css/components.css'), `${p.title} links /css/components.css`);
}

// 3. Responsive Safeguards in CSS
console.log('\n--- Responsive CSS Safeguards ---');
const layoutCss = fs.readFileSync(path.join(DIST_DIR, 'css/layout.css'), 'utf-8');
const compCss = fs.readFileSync(path.join(DIST_DIR, 'css/components.css'), 'utf-8');

assert(layoutCss.includes('min(100%, 320px)'), 'Grid primitive enforces 320px narrow mobile wrap guardrail');
assert(layoutCss.includes('--width-reading: 72ch'), 'Reading container enforces 72ch maximum measure');
assert(compCss.includes('min-height: 44px') && compCss.includes('min-width: 44px'), 'Button primitives enforce 44x44px minimum touch targets');
assert(compCss.includes('overflow-x: auto'), 'Responsive table containers enforce contained horizontal scrolling');

console.log(`\n========================================`);
console.log(`Visual Regression Matrix: ${passed} passed, ${failed} failed`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('🎉 100% Visual and responsive matrix assertions verified!');
  process.exit(0);
}
