# Verified Astro and Netlify Build Contract

**Date:** 1 November 2026  
**Specification:** `plans/DEARDHRUV_CURRENT_WEBSITE_DEEP_AUDIT_AND_EMPLOYER_PORTFOLIO_EXECUTION_PLAN.md` — Phase 0, Task 0.2  

---

## 1. Engine & Runtime Contract

- **Framework:** Astro 7.4.4 (`astro`)
- **Language / Typing:** TypeScript 7.0.2 (`typescript`), strict mode (`tsc --noEmit`)
- **Markdown / Remark:** `@astrojs/markdown-remark` 7.3.5 with custom AST plugins:
  - `rehypeDemoteHeadings`: Automatically demotes markdown `h1-h5` to ensure exactly one semantic `<h1>` document heading per page.
  - `markdownOutputsIntegration`: Generates agent-ready clean markdown mirrors (`index.md`) directly into `dist/` upon build completion for RFC content negotiation.
- **Node.js Target Version:**
  - `.node-version`: `24`
  - `.nvmrc`: `24`
  - `netlify.toml` build environment: `NODE_VERSION = "24"`

---

## 2. Netlify Deployment Contract

- **Publish Directory:** `dist`
- **Production Build Command:** `npm run build:astro` (`astro build`)
- **Deploy Preview Build Command:** `npm run build:astro`
- **Branch Deploy Build Command:** `npm run build:astro`
- **Edge Functions:**
  - Path: `/*` -> Function `markdown-negotiation` (TypeScript edge function in `netlify/edge-functions/markdown-negotiation.ts`)
- **Redirects:**
  - `/feed.json` -> `/index.json` (Status 200 rewrite)
- **HTTP Header Policies:**
  - Long-term immutable caching (`Cache-Control: public, max-age=31536000, immutable`) for `/_astro/*`, `/images/*`, `/css/*`.
  - JSON feed caching: 1 hour (`max-age=3600`).
  - RFC 9264 API Catalog discovery linkset header on `/.well-known/api-catalog`.

---

## 3. Build & Test Verification

Clean build verification command:
```bash
npm run build:astro
```
- Static generation time: ~500ms
- Static HTML routes generated: 27
- Static JSON, XML, and Markdown endpoints generated: 6
- Zero hydration client JS bundles generated.
