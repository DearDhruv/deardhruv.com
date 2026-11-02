#!/usr/bin/env node
/**
 * Release Candidate Quality Gate & Production Readiness Orchestrator
 * 
 * Executes full quality verification pipeline before release to production:
 * 1. Strict TypeScript type check (tsc --noEmit)
 * 2. Clean static build (astro build)
 * 3. Legacy route parity & internal link crawling
 * 4. W3C/WCAG HTML standards validation
 * 5. 25-breakpoint viewport matrix & responsive layout
 * 6. Visual landmark and heading hierarchy
 * 7. WCAG 2.2 AA contrast & accessibility tokens
 * 8. Performance budgets & zero client hydration check
 * 9. Netlify edge markdown negotiation & security headers
 * 10. SEO, OpenGraph, JSON-LD structured data & AI agent discovery
 * 11. Full continuous audit scorecard (audit.js)
 * 12. Quality audit report generation
 */

const { execSync } = require('child_process');
const path = require('path');
const ROOT_DIR = path.resolve(__dirname, '..');

const steps = [
  { name: 'TypeScript Strict Type Checking', cmd: 'npm run check' },
  { name: 'Production Static Astro Build', cmd: 'npm run build:astro' },
  { name: 'Legacy Route Parity (39/39)', cmd: 'node scripts/verify-routes.js' },
  { name: 'Static Assets & Discovery Files', cmd: 'node tests/verify-assets.js' },
  { name: 'Internal Link Crawler (873 links)', cmd: 'node tests/verify-links.js' },
  { name: 'W3C/WCAG HTML Standards Validator', cmd: 'node scripts/verify-html-standards.js' },
  { name: '25-Breakpoint Viewport Matrix', cmd: 'node tests/verify-viewport-matrix.js' },
  { name: 'Visual Hierarchy & Landmarks', cmd: 'node tests/verify-visual-regression.js' },
  { name: 'WCAG AA Design Token Contrast', cmd: 'node tests/verify-contrast.js' },
  { name: 'Accessibility Semantic Tokens', cmd: 'node tests/verify-a11y-tokens.js' },
  { name: 'Performance Budgets & Zero Hydration', cmd: 'node tests/verify-performance-budgets.js' },
  { name: 'Netlify Edge Markdown Negotiation', cmd: 'node tests/verify-edge-functions.js' },
  { name: 'SEO, OpenGraph, JSON-LD & Bot Hygiene', cmd: 'node tests/verify-seo-metadata.js' },
  { name: 'Interactive Card Containers', cmd: 'node tests/verify-interactive-containers.js' },
  { name: 'Employer Attribution Separation', cmd: 'node tests/verify-employer-portfolio.js' },
  { name: 'Continuous Site Health & Security Audit', cmd: 'node scripts/audit.js' },
  { name: 'Quality Report Generation & Summary', cmd: 'node scripts/generate-quality-report.js' }
];

console.log('🚀 Initiating Release Candidate Quality Gate Pipeline...\n');

let failedSteps = 0;

for (let i = 0; i < steps.length; i++) {
  const step = steps[i];
  console.log(`[${i + 1}/${steps.length}] ▶ ${step.name}...`);
  try {
    execSync(step.cmd, { cwd: ROOT_DIR, stdio: 'inherit' });
    console.log(`✅ [${i + 1}/${steps.length}] PASSED: ${step.name}\n`);
  } catch (err) {
    failedSteps++;
    console.error(`❌ [${i + 1}/${steps.length}] FAILED: ${step.name}\n`);
    break;
  }
}

if (failedSteps > 0) {
  console.error('🛑 RELEASE GATE REJECTED: One or more critical verification steps failed.');
  process.exit(1);
} else {
  console.log('======================================================');
  console.log('🎉 RELEASE GATE ACCEPTED: 100% OF VERIFICATION CHECKS PASSED!');
  console.log('   The build is verified for production release.');
  console.log('======================================================\n');
  process.exit(0);
}
