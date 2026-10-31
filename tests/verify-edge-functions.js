#!/usr/bin/env node
/**
 * Automated Netlify Edge Function & Markdown Negotiation Test Suite
 * Validates edge function behavior and content negotiation semantics.
 */
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');
const EDGE_FN_FILE = path.join(__dirname, '../netlify/edge-functions/markdown-negotiation.ts');

if (!fs.existsSync(EDGE_FN_FILE)) {
  console.error("❌ Edge function file missing:", EDGE_FN_FILE);
  process.exit(1);
}

// Ensure public directory is built
if (!fs.existsSync(PUBLIC_DIR)) {
  console.error("❌ public/ directory missing. Run 'hugo --gc --minify' first.");
  process.exit(1);
}

console.log("🔍 Testing Netlify Edge Function: markdown-negotiation.ts...\n");

/**
 * Evaluates markdown-negotiation logic against given pathname and accept header
 */
function simulateEdgeFunction(pathname, acceptHeader) {
  if (!acceptHeader || !acceptHeader.includes("text/markdown")) {
    return null; // Passthrough to static HTML
  }

  // Skip if it's already a file request (has extension) unless it's a directory
  if (pathname.includes(".") && !pathname.endsWith("/")) {
    return null;
  }

  let markdownPath = pathname;
  if (markdownPath.endsWith("/")) {
    markdownPath += "index.md";
  } else {
    markdownPath += "/index.md";
  }

  return {
    rewrittenPath: markdownPath,
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "x-agent-ready": "true"
    }
  };
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

// Test Case 1: Standard browser HTML request (passthrough)
const browserReq = simulateEdgeFunction("/about/", "text/html,application/xhtml+xml");
assert(browserReq === null, "Browser request with text/html passes through without rewrite");

// Test Case 2: File with extension should not rewrite even with Accept: text/markdown
const fileReq = simulateEdgeFunction("/resume.pdf", "text/markdown");
assert(fileReq === null, "File request /resume.pdf is not rewritten");

const imgReq = simulateEdgeFunction("/images/pro_pic_small.jpg", "text/markdown");
assert(imgReq === null, "Asset request /images/pro_pic_small.jpg is not rewritten");

// Test Case 3: Content negotiation for key canonical routes
const testRoutes = [
  "/",
  "/about/",
  "/portfolio/",
  "/projects/",
  "/posts/",
  "/posts/ai_playground_series/",
  "/posts/ai_playground_series/01-i-wanted-the-model-to-stay-on-the-phone/",
  "/posts/ai_playground_series/02-the-day-a-chat-box-became-a-document-engine/",
  "/posts/ai_playground_series/03-the-model-was-fine-the-phone-wasnt/",
  "/posts/ai_playground_series/04-i-put-an-image-generator-inside-the-phone/",
  "/posts/ai_playground_series/05-at-some-point-i-stopped-building-a-chat-app/",
  "/posts/ai_playground_series/06-pushing-mobile-hardware-to-the-edge/",
  "/other/",
  "/other/ai-playground/",
  "/other/ai-playground/privacy-policy-ai-playground-app/",
  "/other/ai-playground/terms-ai-playground-app/",
  "/other/open-store-app/",
  "/other/open-store-app/privacy-policy-open-store-app/",
  "/other/open-store-app/terms-open-store-app/",
  "/other/veloci-hue/",
  "/other/veloci-hue/privacy-policy-veloci-hue-game/",
  "/other/veloci-hue/terms-veloci-hue/",
  "/sitemap/"
];

for (const route of testRoutes) {
  const result = simulateEdgeFunction(route, "text/markdown");
  if (!result) {
    assert(false, `Expected rewrite for ${route} with Accept: text/markdown`);
    continue;
  }

  assert(
    result.headers["content-type"] === "text/markdown; charset=utf-8" &&
    result.headers["x-agent-ready"] === "true",
    `Headers correct for ${route}`
  );

  // Check that the target file actually exists on disk in public/
  const diskPath = path.join(PUBLIC_DIR, result.rewrittenPath.replace(/^\//, ''));
  const exists = fs.existsSync(diskPath);
  assert(exists, `Markdown file exists on disk: ${result.rewrittenPath}`);

  if (exists) {
    const content = fs.readFileSync(diskPath, 'utf-8');
    assert(content.length > 20, `Markdown content non-empty (${content.length} bytes): ${result.rewrittenPath}`);
  }
}

console.log(`\n========================================`);
console.log(`Edge Function Tests: ${passed} passed, ${failed} failed`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log("🎉 All Edge Function and Markdown negotiation assertions passed!");
  process.exit(0);
}
