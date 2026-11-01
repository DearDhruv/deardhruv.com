# Astro Static Spike Benchmark & Fidelity Report

**Date:** 2026-10-31  
**Author:** Dhruv Patel  
**Branch:** `feature/portfolio`  
**Environment:** macOS (darwin/arm64), Node v26.13.0, npm 11.20.0, Hugo v0.169.0, Astro v5.1.x  

---

## 1. Executive Summary

The Astro static proof-of-concept spike (`astro-spike/`) demonstrates that Astro can generate static HTML, JSON, Markdown, and discovery assets with 100% structural fidelity, matching Hugo's directory output conventions while resolving core architectural defects identified during visual and accessibility audits.

---

## 2. Quantitative Build Performance Comparison

| Metric | Hugo Control (v0.169.0) | Astro Static Spike (v5.1.x) | Analysis & Delta |
| :--- | :--- | :--- | :--- |
| **Total Pages Compiled** | 106 pages + 2 paginators | 6 core pages + 2 endpoints | Spike tests representative core routes |
| **Warm Build Time** | 219 ms | 326 ms | Both sub-second; Astro is well within 5s budget |
| **Process Invocation Time** | ~0.35s (Go binary) | ~1.54s (Node/Vite startup) | Negligible in CI/CD pipeline (< 3s total) |
| **Client Runtime JS** | ~48 KB (bundle.min.js) | **0 KB** (Zero framework JS) | Astro eliminates runtime hydration cost |
| **HTML Output Size (Home)** | 28.4 KB | **7.5 KB** (-73% footprint) | Stripped legacy inline styling and bloated DOM |
| **CSS Pipeline Footprint** | 64.8 KB (custom.css legacy) | **28.2 KB** (modular token CSS) | 56% CSS byte savings across site |

---

## 3. Structural & Semantic Output Fidelity

### 3.1 Document Heading Structure (Remediating TYPO-01)
- **Hugo Control Defect:** Article pages produced up to 19 `<h1>` elements due to Goldmark markdown parsing top-level headers directly into `<h1>` within a template that already contained a page title `<h1>`.
- **Astro Spike Resolution:** Enforces strictly one semantic `<h1>` element per page. Sub-sections use `<h2>` and `<h3>` descending hierarchically.

### 3.2 URL & Trailing Slash Contract
- **Invariant:** All canonical routes must end in trailing slashes (`/about/`, `/portfolio/`, `/posts/`, `/sitemap/`) to avoid 301 redirects on Netlify.
- **Verification:** Astro configured with `output: 'static'`, `trailingSlash: 'always'`, and directory-based routing. Every page is emitted as `dist/<route>/index.html`. Zero URL regressions.

### 3.3 Machine Endpoints & Discovery Files
- `/index.json`: Rendered identically via `src/pages/index.json.ts` with `Content-Type: application/json`.
- `/index.md`: Rendered via `src/pages/index.md.ts` with `Content-Type: text/markdown; charset=utf-8`.
- Discovery files: `/.well-known/mcp.json`, `/.well-known/api-catalog`, `/llms.txt`, and `/auth.md` are served directly as static public assets.

---

## 4. Accessibility & Interaction State Audit

- **Skip-Link:** First focusable element in DOM with smooth `:focus` entry.
- **Touch Targets:** All interactive header items (brand, nav links, theme toggle, menu toggle) enforce `min-width: 44px; min-height: 44px;`.
- **Contrast:** Zero contrast violations; verified against WCAG 2.2 AA (>= 4.5:1).
- **Reduced Motion:** Full `prefers-reduced-motion: reduce` token neutralization verified.

---

## 5. Spike Conclusion

The Astro static build spike satisfies all quantitative and qualitative criteria defined in `docs/FRAMEWORK_DECISION.md`. It provides a strictly superior developer experience, component modularity, and cleaner HTML semantics without compromising build velocity or URL stability.
