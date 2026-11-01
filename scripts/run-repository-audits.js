const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const commands = [
  'npm run check',
  'npm run build:astro',
  'npm test',
  'npm run test:dist',
  'npm run test:regression',
  'npm run test:visual',
  'npm run test:perf',
  'npm run audit',
  'npm run audit:health',
  'npm run audit:seo',
  'npm run audit:a11y',
  'npm run audit:perf',
  'npm run audit:security',
  'npm run audit:ai'
];

let markdown = '# Repository Audit Baseline (1 November 2026)\n\n';
markdown += 'Comprehensive execution log for Phase 1, Task 1.2 across all 14 repository test and audit commands.\n\n';
markdown += '| Command | Status | Exit Code | Duration (ms) |\n';
markdown += '|---|:---:|:---:|---:|\n';

const details = [];

for (const cmd of commands) {
  console.log(`Running: ${cmd}...`);
  const start = Date.now();
  let code = 0;
  let output = '';
  try {
    output = execSync(cmd, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] });
  } catch (err) {
    code = err.status || 1;
    output = (err.stdout || '') + '\n' + (err.stderr || '');
  }
  const dur = Date.now() - start;
  const status = code === 0 ? '✅ PASS' : '❌ FAIL';
  markdown += `| \`${cmd}\` | ${status} | ${code} | ${dur} |\n`;
  details.push(`### \`${cmd}\` (${status})\n\n- **Exit Code:** ${code}\n- **Duration:** ${dur}ms\n\n\`\`\`text\n${output.trim().slice(0, 1000)}${output.length > 1000 ? '\n... [truncated for baseline report]' : ''}\n\`\`\`\n`);
}

markdown += '\n---\n\n## Execution Details & Command Outputs\n\n' + details.join('\n');

const outPath = path.resolve(__dirname, '..', 'docs', 'audit', 'baseline-2026-11-01', 'repository-test-results.md');
fs.writeFileSync(outPath, markdown);
console.log('Saved audit results to:', outPath);
