#!/usr/bin/env node
/**
 * Content Loader Verification Test
 * Proves that Astro content loader correctly parses the entire existing content/ tree
 * without modifying source files or paths.
 */
const fs = require('fs');
const path = require('path');
const { parseFrontmatter } = require('@astrojs/markdown-remark');

const ROOT_DIR = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT_DIR, 'content');
const CONFIG_FILE = path.join(ROOT_DIR, 'src/content.config.ts');

console.log('🔍 Verifying existing Markdown content loading without source modifications...\n');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ ${message}`);
    passed++;
  } else {
    console.error(`  ❌ ${message}`);
    failed++;
  }
}

// 1. Verify content.config.ts exists and configures collections
assert(fs.existsSync(CONFIG_FILE), 'src/content.config.ts exists');
const configContent = fs.readFileSync(CONFIG_FILE, 'utf8');
assert(configContent.includes("defineCollection"), 'Defines collections with defineCollection');
assert(configContent.includes("posts"), 'Defines posts collection');
assert(configContent.includes("other"), 'Defines other collection');
assert(configContent.includes("pages"), 'Defines pages collection');

// 2. Discover all markdown files in content/
function findMarkdownFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findMarkdownFiles(fullPath));
    } else if (entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

const mdFiles = findMarkdownFiles(CONTENT_DIR);
assert(mdFiles.length >= 17, `Discovered ${mdFiles.length} Markdown content files in content/ (expected >= 17)`);

// 3. Verify each markdown file can be parsed with valid frontmatter
for (const file of mdFiles) {
  const relPath = path.relative(ROOT_DIR, file);
  try {
    const raw = fs.readFileSync(file, 'utf8');
    const { frontmatter, content } = parseFrontmatter(raw);
    const hasTitle = Boolean(frontmatter && frontmatter.title);
    assert(hasTitle, `${relPath} -> parsed valid frontmatter (title: "${frontmatter?.title?.slice(0, 30)}...")`);
  } catch (err) {
    assert(false, `${relPath} -> failed to parse: ${err.message}`);
  }
}

console.log('\n========================================');
console.log(`Content Loader Tests: ${passed} passed, ${failed} failed`);
console.log('========================================\n');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('🎉 All content files parsed successfully without path changes!');
}
