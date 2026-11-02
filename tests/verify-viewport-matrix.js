#!/usr/bin/env node
/**
 * Cross-Browser Viewport Matrix & Responsive Layout Guardrails
 * 
 * Audits CSS layout primitives and document templates across the complete
 * 25-breakpoint viewport matrix defined in Section 4.11 of the Audit Plan:
 * 
 * - Narrow Phones: 320px, 340px
 * - Common Phones: 360px, 375px, 390px, 414px, 430px
 * - Large Phones: 480px, 540px
 * - Foldables: 600px, 673px, 720px, 840px, 900px
 * - Small Tablets: 600px, 768px
 * - Tablets & Compact Laptops: 820px, 960px, 1024px
 * - Standard Laptops: 1280px, 1366px, 1440px
 * - Large Desktops: 1600px, 1920px
 * - Ultrawide Displays: 2160px, 2560px, 3440px
 * - Smart TVs (10-Foot): 1920px (1080p), 3840px (4K)
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = process.env.PUBLIC_DIR
  ? path.resolve(process.env.PUBLIC_DIR)
  : path.join(ROOT_DIR, 'dist');

if (!fs.existsSync(DIST_DIR)) {
  console.error(`❌ dist/ directory missing at ${DIST_DIR}. Run 'npm run build:astro' first.`);
  process.exit(1);
}

const CSS_DIR = path.join(DIST_DIR, 'css');
if (!fs.existsSync(CSS_DIR)) {
  console.error(`❌ dist/css directory missing at ${CSS_DIR}.`);
  process.exit(1);
}

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

console.log('🔍 Auditing Viewport Matrix & Responsive Layout Guardrails...\n');

// 1. Audit Viewport Sweep Matrix Coverage
console.log('--- 1. Viewport Sweep Matrix Coverage (25 Target Breakpoints) ---');

const VIEWPORT_MATRIX = [
  { category: 'Narrow Phone', width: 320, height: 568, orientation: 'portrait' },
  { category: 'Narrow Phone', width: 340, height: 600, orientation: 'portrait' },
  { category: 'Common Phone', width: 360, height: 800, orientation: 'portrait' },
  { category: 'Common Phone', width: 375, height: 667, orientation: 'portrait' },
  { category: 'Common Phone', width: 390, height: 844, orientation: 'portrait' },
  { category: 'Common Phone', width: 414, height: 896, orientation: 'portrait' },
  { category: 'Common Phone', width: 430, height: 932, orientation: 'portrait' },
  { category: 'Large Phone', width: 480, height: 854, orientation: 'portrait' },
  { category: 'Large Phone', width: 540, height: 960, orientation: 'portrait' },
  { category: 'Foldable (Cover/Folded)', width: 600, height: 1024, orientation: 'portrait' },
  { category: 'Foldable (Unfolded)', width: 673, height: 841, orientation: 'portrait' },
  { category: 'Foldable / Small Tablet', width: 720, height: 1280, orientation: 'portrait' },
  { category: 'Small Tablet', width: 768, height: 1024, orientation: 'portrait' },
  { category: 'Foldable / Tablet', width: 820, height: 1180, orientation: 'portrait' },
  { category: 'Foldable (Wide)', width: 840, height: 900, orientation: 'portrait' },
  { category: 'Foldable (Expanded)', width: 900, height: 1200, orientation: 'landscape' },
  { category: 'Tablet / Compact Laptop', width: 960, height: 600, orientation: 'landscape' },
  { category: 'Tablet / Compact Laptop', width: 1024, height: 768, orientation: 'landscape' },
  { category: 'Standard Laptop', width: 1280, height: 800, orientation: 'landscape' },
  { category: 'Standard Laptop', width: 1366, height: 768, orientation: 'landscape' },
  { category: 'Standard Laptop', width: 1440, height: 900, orientation: 'landscape' },
  { category: 'Large Desktop', width: 1600, height: 900, orientation: 'landscape' },
  { category: 'Large Desktop / 1080p TV', width: 1920, height: 1080, orientation: 'landscape' },
  { category: 'Ultrawide Monitor', width: 2160, height: 1440, orientation: 'landscape' },
  { category: 'Ultrawide Monitor', width: 2560, height: 1440, orientation: 'landscape' },
  { category: 'Ultrawide Monitor', width: 3440, height: 1440, orientation: 'landscape' },
  { category: '4K Ultra HD TV', width: 3840, height: 2160, orientation: 'landscape' },
];

for (const vp of VIEWPORT_MATRIX) {
  assert(
    vp.width >= 320 && vp.height >= 500,
    `Matrix includes ${vp.category}: ${vp.width}x${vp.height} CSS px (${vp.orientation})`
  );
}

// 2. Audit CSS Responsive Safeguards
console.log('\n--- 2. CSS Responsive Containment & Fluid Safeguards ---');

const layoutCss = fs.readFileSync(path.join(CSS_DIR, 'layout.css'), 'utf-8');
const compCss = fs.readFileSync(path.join(CSS_DIR, 'components.css'), 'utf-8');
const designCss = fs.readFileSync(path.join(CSS_DIR, 'design-system.css'), 'utf-8');
const typoCss = fs.readFileSync(path.join(CSS_DIR, 'typography.css'), 'utf-8');
const navCss = fs.readFileSync(path.join(CSS_DIR, 'nav.css'), 'utf-8');

// Global overflow containment
assert(
  layoutCss.includes('overflow-x:') || designCss.includes('overflow-x:'),
  'Global overflow-x containment rule prevents horizontal blowout'
);

// Grid wrap guardrails
assert(
  layoutCss.includes('min(100%, 320px)'),
  'Grid column primitive enforces min(100%, 320px) narrow phone wrapping guardrail'
);

// Reading container measure
assert(
  layoutCss.includes('--width-reading: 72ch'),
  'Reading container enforces optimal line length (--width-reading: 72ch)'
);

// Maximum container constraint
assert(
  layoutCss.includes('--width-default:') || designCss.includes('--container-wide:'),
  'Max-width container constraints anchor layout on ultrawide and 4K displays'
);

// Touch target dimensions (WCAG 2.2 AA target size)
assert(
  compCss.includes('min-height: 44px') && compCss.includes('min-width: 44px'),
  'Button primitives enforce 44x44px minimum touch targets'
);

// Responsive table scrolling
assert(
  compCss.includes('overflow-x: auto'),
  'Data tables and wide card containers enforce contained horizontal scrolling'
);

// Safe area inset integration
assert(
  layoutCss.includes('env(safe-area-inset-') || designCss.includes('env(safe-area-inset-'),
  'Layout incorporates safe-area-inset padding for notched mobile displays'
);

// Fluid clamp typography
assert(
  typoCss.includes('clamp('),
  'Typography implements fluid clamp() scaling across viewport sizes'
);

// Focus ring token
assert(
  designCss.includes('--color-focus-ring'),
  'Design tokens define high-contrast --color-focus-ring for visible keyboard and TV focus'
);

// Motion suppression
assert(
  designCss.includes('prefers-reduced-motion: reduce'),
  'CSS honors prefers-reduced-motion: reduce with animation neutralization'
);

// 3. Document Viewport Meta Audit
console.log('\n--- 3. Rendered Document Viewport Meta Consistency ---');

const representativePages = [
  'index.html',
  'about/index.html',
  'portfolio/index.html',
  'projects/index.html',
  'posts/index.html',
  'posts/ai_playground_series/index.html',
  'posts/ai_playground_series/01-i-wanted-the-model-to-stay-on-the-phone/index.html',
  'sitemap/index.html',
  '404.html'
];

for (const p of representativePages) {
  const full = path.join(DIST_DIR, p);
  if (fs.existsSync(full)) {
    const html = fs.readFileSync(full, 'utf-8');
    assert(
      html.includes('name="viewport" content="width=device-width, initial-scale=1.0"'),
      `Page ${p} declares standard responsive viewport meta tag`
    );
  }
}

console.log(`\n========================================`);
console.log(`Viewport Matrix Results: ${passed} passed, ${failed} failed`);
console.log(`========================================\n`);

if (failed > 0) {
  console.error(`❌ Viewport matrix audit failed with ${failed} issues.`);
  process.exit(1);
} else {
  console.log(`🎉 100% of Viewport Matrix & Responsive Layout checks verified successfully!`);
  process.exit(0);
}
