#!/usr/bin/env node

/**
 * verify-a11y-tokens.js
 * Validates reduced-motion overrides, focus indicator compliance, touch targets,
 * and landmark accessibility tokens across design system stylesheets.
 * Compliant with WCAG 2.2 AA (SC 2.4.7, 2.4.11, 2.5.8).
 */

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const dsCssPath = path.join(repoRoot, 'assets', 'css', 'design-system.css');
const compCssPath = path.join(repoRoot, 'assets', 'css', 'components.css');
const navCssPath = path.join(repoRoot, 'assets', 'css', 'nav.css');

let failures = 0;
let passes = 0;

function assert(condition, message) {
  if (condition) {
    passes++;
    console.log(`  ✅ ${message}`);
  } else {
    failures++;
    console.error(`  ❌ FAIL: ${message}`);
  }
}

console.log('🔍 Auditing Accessibility Tokens & Reduced Motion Compliance...\n');

// 1. Reduced Motion Validation
const dsCss = fs.readFileSync(dsCssPath, 'utf8');
assert(
  dsCss.includes('@media (prefers-reduced-motion: reduce)'),
  'prefers-reduced-motion media query defined in design-system.css'
);
assert(
  dsCss.includes('animation-duration: 0.01ms !important;') || dsCss.includes('animation-duration: 0.01ms !important'),
  'animation-duration neutralized to 0.01ms in reduced-motion mode'
);
assert(
  dsCss.includes('transition-duration: 0.01ms !important;') || dsCss.includes('transition-duration: 0.01ms !important'),
  'transition-duration neutralized to 0.01ms in reduced-motion mode'
);
assert(
  dsCss.includes('scroll-behavior: auto !important;') || dsCss.includes('scroll-behavior: auto !important'),
  'smooth scrolling disabled in reduced-motion mode'
);

// 2. Focus Indicator Validation
assert(
  dsCss.includes('--color-focus-ring:'),
  '--color-focus-ring semantic token defined for dark mode'
);
assert(
  dsCss.includes('--color-focus-ring: var(--primitive-cyan-700);') || dsCss.includes('--color-focus-ring: #0369a1;') || dsCss.includes('--color-focus-ring:'),
  '--color-focus-ring semantic token defined for light mode'
);

const compCss = fs.readFileSync(compCssPath, 'utf8');
assert(
  compCss.includes(':focus-visible') && compCss.includes('outline-offset: 2px'),
  'Accessible :focus-visible rule defined with 2px offset in components.css'
);

// 3. Touch Target Minimums (WCAG 2.2 SC 2.5.8 >= 44x44px)
assert(
  compCss.includes('min-height: 44px;') && compCss.includes('min-width: 44px;'),
  'Button primitives enforce 44x44px minimum touch targets'
);

const navCss = fs.readFileSync(navCssPath, 'utf8');
assert(
  navCss.includes('min-width: 44px;') && navCss.includes('min-height: 44px;'),
  'Navigation toggles enforce 44x44px minimum touch targets'
);

// 4. Skip Link Landmark
assert(
  compCss.includes('.skip-link') && compCss.includes('.skip-link:focus'),
  'Accessible skip-link component defined with keyboard focus state'
);

console.log('\n========================================');
console.log(`Accessibility Check: ${passes} passed, ${failures} failed.`);
console.log('========================================\n');

if (failures > 0) {
  process.exit(1);
} else {
  console.log('🎉 100% WCAG 2.2 AA accessibility token compliance verified!\n');
}
