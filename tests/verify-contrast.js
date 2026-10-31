#!/usr/bin/env node
/**
 * Automated WCAG 2.2 AA Contrast Ratio Verifier
 * Validates semantic color tokens across dark and light themes against WCAG AA standards.
 */

function hexToRgb(hex) {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  const num = parseInt(hex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

function luminance({ r, g, b }) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(hex1, hex2) {
  const l1 = luminance(hexToRgb(hex1));
  const l2 = luminance(hexToRgb(hex2));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

const tokenPairs = [
  // Dark Theme Pairs
  { theme: 'Dark', role: 'Primary Body Text', fg: '#f8fafc', bg: '#090d16', minRatio: 4.5 },
  { theme: 'Dark', role: 'Secondary Text', fg: '#94a3b8', bg: '#090d16', minRatio: 4.5 },
  { theme: 'Dark', role: 'Muted Text / Metadata', fg: '#94a3b8', bg: '#090d16', minRatio: 4.5 },
  { theme: 'Dark', role: 'Accent Link Text', fg: '#38bdf8', bg: '#090d16', minRatio: 4.5 },
  { theme: 'Dark', role: 'Card Primary Text', fg: '#f8fafc', bg: '#0f172a', minRatio: 4.5 },
  { theme: 'Dark', role: 'Card Secondary Text', fg: '#94a3b8', bg: '#0f172a', minRatio: 4.5 },
  { theme: 'Dark', role: 'Button Primary Label', fg: '#0f172a', bg: '#38bdf8', minRatio: 4.5 },

  // Light Theme Pairs
  { theme: 'Light', role: 'Primary Body Text', fg: '#0f172a', bg: '#f8fafc', minRatio: 4.5 },
  { theme: 'Light', role: 'Secondary Text', fg: '#334155', bg: '#f8fafc', minRatio: 4.5 },
  { theme: 'Light', role: 'Muted Text / Metadata', fg: '#475569', bg: '#f8fafc', minRatio: 4.5 },
  { theme: 'Light', role: 'Accent Link Text', fg: '#0369a1', bg: '#f8fafc', minRatio: 4.5 },
  { theme: 'Light', role: 'Card Primary Text', fg: '#0f172a', bg: '#ffffff', minRatio: 4.5 },
  { theme: 'Light', role: 'Card Secondary Text', fg: '#475569', bg: '#ffffff', minRatio: 4.5 },
  { theme: 'Light', role: 'Button Primary Label', fg: '#ffffff', bg: '#0369a1', minRatio: 4.5 }
];

console.log('🔍 Auditing Design Token Contrast Ratios against WCAG 2.2 AA (>= 4.5:1)...\n');

let failed = 0;
for (const p of tokenPairs) {
  const ratio = contrastRatio(p.fg, p.bg);
  const rounded = ratio.toFixed(2);
  if (ratio >= p.minRatio) {
    console.log(`  ✅ [${p.theme}] ${p.role}: ${p.fg} on ${p.bg} -> ${rounded}:1 (Pass >= ${p.minRatio}:1)`);
  } else {
    console.error(`  ❌ [${p.theme}] ${p.role}: ${p.fg} on ${p.bg} -> ${rounded}:1 (FAIL < ${p.minRatio}:1)`);
    failed++;
  }
}

console.log(`\n========================================`);
console.log(`Contrast Check: ${tokenPairs.length - failed} passed, ${failed} failed out of ${tokenPairs.length} token pairs.`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('🎉 100% WCAG 2.2 AA contrast compliance confirmed on all design tokens.');
  process.exit(0);
}
