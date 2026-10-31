#!/usr/bin/env node
/**
 * Automated Route Verification Script
 * Validates 100% parity of legacy routes against the generated public/ directory.
 */
const fs = require("fs");
const path = require("path");

const FIXTURES_FILE = path.join(__dirname, "../tests/fixtures/legacy-routes.json");
const PUBLIC_DIR = process.env.PUBLIC_DIR ? path.resolve(process.env.PUBLIC_DIR) : path.join(__dirname, "../public");
const NETLIFY_CONFIG = path.join(__dirname, "../netlify.toml");

if (!fs.existsSync(FIXTURES_FILE)) {
  console.error("❌ Fixtures file missing:", FIXTURES_FILE);
  process.exit(1);
}

const routes = JSON.parse(fs.readFileSync(FIXTURES_FILE, "utf-8"));
let passed = 0;
let failed = 0;

console.log(`🔍 Verifying ${routes.length} legacy routes against ${PUBLIC_DIR}...\n`);

for (const route of routes) {
  const { path: routePath, type, redirectTo } = route;
  let success = false;
  let reason = "";

  try {
    if (type === "html") {
      const relPath = routePath === "/" ? "index.html" : path.join(routePath.replace(/^\//, ""), "index.html");
      const target = path.join(PUBLIC_DIR, relPath);
      if (fs.existsSync(target)) {
        const content = fs.readFileSync(target, "utf-8");
        if (content.length > 50 && content.includes("<title>")) {
          success = true;
        } else {
          reason = `File too short or missing <title> tag (${target})`;
        }
      } else {
        reason = `HTML file missing at ${target}`;
      }
    } else if (type === "alias") {
      const relPath = path.join(routePath.replace(/^\//, ""), "index.html");
      const target = path.join(PUBLIC_DIR, relPath);
      if (fs.existsSync(target)) {
        const content = fs.readFileSync(target, "utf-8");
        if (content.includes("http-equiv=\"refresh\"") || content.includes(redirectTo)) {
          success = true;
        } else {
          reason = `Alias missing redirect meta tag to ${redirectTo}`;
        }
      } else {
        reason = `Alias HTML missing at ${target}`;
      }
    } else if (type === "pdf") {
      const target = path.join(PUBLIC_DIR, routePath.replace(/^\//, ""));
      if (fs.existsSync(target)) {
        const buffer = fs.readFileSync(target);
        if (buffer.length > 100 && buffer.slice(0, 4).toString() === "%PDF") {
          success = true;
        } else {
          reason = "Invalid PDF header or corrupted file";
        }
      } else {
        reason = `PDF missing at ${target}`;
      }
    } else if (type === "json") {
      const target = path.join(PUBLIC_DIR, routePath.replace(/^\//, ""));
      if (fs.existsSync(target)) {
        const content = fs.readFileSync(target, "utf-8");
        JSON.parse(content);
        success = true;
      } else {
        reason = `JSON missing at ${target}`;
      }
    } else if (type === "markdown" || type === "text") {
      const target = path.join(PUBLIC_DIR, routePath.replace(/^\//, ""));
      if (fs.existsSync(target)) {
        const content = fs.readFileSync(target, "utf-8");
        if (content.length > 10) {
          success = true;
        } else {
          reason = "Empty text/markdown file";
        }
      } else {
        reason = `File missing at ${target}`;
      }
    } else if (type === "xml") {
      const target = path.join(PUBLIC_DIR, routePath.replace(/^\//, ""));
      if (fs.existsSync(target)) {
        const content = fs.readFileSync(target, "utf-8");
        if (content.includes("<urlset") || content.includes("<?xml")) {
          success = true;
        } else {
          reason = "Malformed XML";
        }
      } else {
        reason = `XML missing at ${target}`;
      }
    } else if (type === "redirect") {
      const netlifyContent = fs.readFileSync(NETLIFY_CONFIG, "utf-8");
      if (netlifyContent.includes(`from = "${routePath}"`) && netlifyContent.includes(`to = "${redirectTo}"`)) {
        success = true;
      } else {
        reason = `Netlify redirect missing for ${routePath} -> ${redirectTo}`;
      }
    }
  } catch (err) {
    reason = err.message;
  }

  if (success) {
    passed++;
    console.log(`  ✅ [${type.toUpperCase()}] ${routePath} -> OK`);
  } else {
    failed++;
    console.error(`  ❌ [${type.toUpperCase()}] ${routePath} -> FAILED: ${reason}`);
  }
}

console.log(`\n========================================`);
console.log(`Result: ${passed} passed, ${failed} failed out of ${routes.length} routes.`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
