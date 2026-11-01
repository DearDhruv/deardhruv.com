#!/usr/bin/env node
/**
 * Employer Project Portfolio & Identity Attribution Verification
 * Validates strict separation of Independent Products vs Selected Work by Employer.
 * Asserts bottom company attribution row across all employer projects.
 */
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const PORTFOLIO_MD = path.join(ROOT_DIR, 'content', 'portfolio.md');
const PROJECTS_MD = path.join(ROOT_DIR, 'content', 'projects.md');
const DIST_PORTFOLIO = path.join(ROOT_DIR, 'dist', 'portfolio', 'index.html');
const DIST_PROJECTS = path.join(ROOT_DIR, 'dist', 'projects', 'index.html');

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

console.log('🔍 Auditing Employer Project Portfolio & Attribution Separation...\n');

// 1. Source Content Verification
assert(fs.existsSync(PORTFOLIO_MD), 'content/portfolio.md exists');
assert(fs.existsSync(PROJECTS_MD), 'content/projects.md exists');

const portfolioContent = fs.readFileSync(PORTFOLIO_MD, 'utf-8');
const projectsContent = fs.readFileSync(PROJECTS_MD, 'utf-8');

// Section Separation
assert(portfolioContent.includes('## 🚀 Independent Products'), 'Portfolio defines Independent Products section');
assert(portfolioContent.includes('## 💼 Selected Work by Employer'), 'Portfolio defines Selected Work by Employer section');
assert(projectsContent.includes('## 🚀 Independent Products'), 'Projects defines Independent Products section');
assert(projectsContent.includes('## 💼 Selected Work by Employer'), 'Projects defines Selected Work by Employer section');

// Employer Attributions in Portfolio
const expectedEmployers = [
  { name: 'IMPACT Commerce', role: 'Lead Android Engineer' },
  { name: 'PLANOLY', role: 'Senior Android Developer' },
  { name: 'Ashapura Softech Inc', role: 'Tech Lead / Android Engineer' },
  { name: 'Russmedia Tech', role: 'Team Lead / Senior Android Developer' },
  { name: 'Hidden Brains InfoTech', role: 'Junior Android Developer' }
];

for (const emp of expectedEmployers) {
  assert(
    portfolioContent.includes(emp.name) && portfolioContent.includes(emp.role),
    `Portfolio includes verified role for ${emp.name} (${emp.role})`
  );
  assert(
    portfolioContent.includes(`Worked at:** ${emp.name}`),
    `Portfolio enforces bottom attribution footer for ${emp.name}`
  );
}

// 2. Rendered HTML Verification (dist/)
if (fs.existsSync(DIST_PORTFOLIO) && fs.existsSync(DIST_PROJECTS)) {
  const distPortfolioHtml = fs.readFileSync(DIST_PORTFOLIO, 'utf-8');
  const distProjectsHtml = fs.readFileSync(DIST_PROJECTS, 'utf-8');

  assert(distPortfolioHtml.includes('Selected Work by Employer'), 'Rendered Portfolio HTML contains Selected Work by Employer heading');
  assert(distProjectsHtml.includes('Selected Work by Employer'), 'Rendered Projects HTML contains Selected Work by Employer heading');
  assert(distPortfolioHtml.includes('Worked at:'), 'Rendered Portfolio HTML includes visible Worked at attribution');
  assert(distProjectsHtml.includes('Worked at:'), 'Rendered Projects HTML includes visible Worked at attribution');
}

console.log(`\n========================================`);
console.log(`Employer Portfolio Verification: ${passed} passed, ${failed} failed`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('🎉 100% Employer portfolio and attribution rules verified successfully!');
  process.exit(0);
}
