# Build and Deployment Baseline

**Date:** November 2, 2026  
**Document:** `docs/performance/baseline/build-and-deploy-baseline.md`  
**Target:** `https://deardhruv.com/`  
**Execution Context:** `plans/DEARDHRUV_PAGESPEED_AND_LIGHTHOUSE_REMEDIATION_EXECUTION_PLAN.md` — Phase 0, Task 0.2  

---

## 1. Application Architecture

1. **Framework & Static Generation:**
   - **Framework:** Astro `v7.4.4` (Static Site Generator).
   - **Build Mode:** `output: 'static'`, directory output format.
   - **Output Directory:** `dist/`.
   - **HTML Compression:** Enabled (`compressHTML: true`).
   - **Client Hydration Directives:** **Zero** client hydration islands (`client:load`, `client:idle`, `client:visible` are unused). No React, Vue, Svelte, or Solid framework bundles are shipped.
   - **Client Runtime Footprint:** Lightweight vanilla JS:
     - `theme-init.js`: 0.98 KB (inlines in `<head>` to prevent theme flashing).
     - `theme-toggle.js`: 3.53 KB (handles keyboard-accessible theme and palette switching).
     - **Total Client JS:** 4.51 KB uncompressed (< 5 KB budget).

2. **Styling & Design System Architecture:**
   - Tokenized CSS architecture consisting of 5 modular stylesheets in `static/css/`:
     - `design-system.css`: Primitive tokens, WCAG AA semantic color mappings for 4 palettes (Warm Editorial, Terminal Emerald, Precision Cyan, Cobalt Royal), contrast tokens, focus indicators.
     - `typography.css`: Fluid typography clamps, modular heading hierarchy, code syntax highlighting variables.
     - `layout.css`: Contained responsive layout shells, grid primitives, reading line-length constraints (`72ch`), safe-area insets.
     - `components.css`: Button primitives, card containers, tags, chips, badges, interactive overlays, callouts, tables, palette switcher.
     - `nav.css`: Sticky responsive header, accessible mobile slide-down menu, avatar beacon, theme toggle button.
   - **CSS Footprint:** 44.71 KB uncompressed (< 45.0 KB budget).

3. **Content & Asset Pipeline:**
   - Markdown documents parsed through Astro Content Loader with custom remark/rehype demotion pipeline to guarantee strict single `<h1>` hierarchy on every page.
   - Markdown mirror generation for AI agents via `markdownOutputsIntegration` in `astro.config.mjs`.

---

## 2. Deployment Contract & Netlify Platform Delivery

1. **Platform:** Netlify Edge Network & Static CDN.
2. **Configuration (`netlify.toml`):**
   - `build.command`: `npm run build:astro`
   - `build.publish`: `dist`
   - `build.environment`: `NODE_VERSION = "24"`
3. **HTTP Cache Policy:**
   - Fingerprinted Static Assets (`/assets/*`, `/_astro/*`): `Cache-Control: public, max-age=31536000, immutable` (1 year).
   - Icons & Favicons (`/favicon*`, `/apple-touch-icon*`): `Cache-Control: public, max-age=2592000, stale-while-revalidate=86400` (30 days).
   - HTML documents: Dynamic verification on deploy with zero stale HTML referencing missing chunks.
4. **Edge Functions:**
   - `markdown-negotiation.ts` mapped to `/*`: Inspects incoming HTTP `Accept` headers. If an AI agent or crawler explicitly requests `text/markdown`, the edge function rewrites the request to the corresponding static markdown document without redirect hops.
5. **Security & Protocol Headers:**
   - `X-Frame-Options: DENY`
   - `X-Content-Type-Options: nosniff`
   - `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
   - `Content-Security-Policy: default-src 'self'; img-src 'self' data: https:; ...`
   - `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`
   - `Link` headers for AI agent discovery: RFC 9264 API catalog and MCP descriptors.

---

## 3. Toolchain & Environment Verification

- **Operating System:** macOS Darwin 25.1.0 arm64 (Apple Silicon).
- **Node.js:** v22.14.0.
- **npm:** 11.2.0.
- **Git Branch:** `feature/portfolio` tracking `origin/feature/portfolio`.
- **Hugo Status:** Proven obsolete; migration to Astro is 100% complete and all 39 legacy routes are preserved and verified with 0 regressions.
