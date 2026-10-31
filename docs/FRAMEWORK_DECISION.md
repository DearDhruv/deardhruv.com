# Architecture Decision Analysis: Hugo vs. Astro Migration

**Date:** 2026-10-31  
**Author:** Dhruv Patel  
**Branch:** `feature/portfolio`  
**Status:** PROPOSED (Spike Authorization)  

---

## 1. Context & Objective

The DearDhruv web platform currently operates on **Hugo v0.169.0 (Extended)** using the `hello-friend-ng` theme submodule with extensive custom layouts and SCSS overrides. While Hugo provides instantaneous compilation (<250ms for 106 pages), its template ergonomics (Go text/template, `.Scratch`, string interpolation, and lack of typed props) create friction when implementing a modern, component-driven design system ("Precision Technical Editorial").

This document evaluates the trade-offs between:
- **Option A (Baseline Control):** Retaining Hugo, maintaining Go template partials, and standardizing CSS tokens via static stylesheets.
- **Option B (Modern Static Candidate):** Migrating to **Astro v5** static site architecture (`output: 'static'`) with zero-JS default, Content Collections with Zod validation, and component-scoped CSS.

### Mandatory Non-Negotiable Invariants
1. **Zero Broken URLs:** All 38 legacy routes in `tests/fixtures/legacy-routes.json` must be preserved with exact trailing slash conventions, MIME types, and HTTP statuses.
2. **Static Asset Parity:** All 7 downloadable assets / `.well-known` discovery files must remain intact.
3. **Netlify Static Hosting & Edge Function Interop:** The Netlify Edge Function (`markdown-negotiation.ts`) on `/*` providing `x-agent-ready` and markdown content negotiation must function identically.
4. **WCAG 2.2 AA Accessibility:** 100% compliance across contrast, touch targets, reduced motion, and focus indicators.

---

## 2. Weighted Decision Scorecard

Each dimension is weighted by its strategic importance to long-term maintainability, developer ergonomics, and reliability.

| Dimension | Weight | Hugo (Option A) | Astro (Option B) | Rationale & Comparative Analysis |
| :--- | :---: | :---: | :---: | :--- |
| **1. Component Modularity & Design System** | 20% | 6.0 / 10 | **9.5 / 10** | Astro provides `.astro` components with typed props, scoped styles, and slot composition. Hugo relies on Go templates with dynamic context dictionary passing (`dict "key" "val"`), which is error-prone. |
| **2. Content Authoring & Frontmatter Parity** | 15% | 8.5 / 10 | **9.0 / 10** | Hugo's Goldmark parser is fast and reliable. Astro Content Collections with Zod schemas guarantee compile-time frontmatter validation, preventing silent schema drift. |
| **3. Build Speed & Toolchain Footprint** | 15% | **10.0 / 10** | 7.5 / 10 | Hugo compiles in ~220ms via compiled Go binary. Astro uses Vite/Rollup and takes ~1.5–2.5s for 106 pages. However, the repository already depends on Node.js/npm for verification test suites. |
| **4. Client Hydration & Script Control** | 15% | 7.5 / 10 | **9.5 / 10** | Astro outputs zero client-side JavaScript by default, isolating interactivity strictly to explicit islands. It also provides first-class View Transitions via `<ClientRouter />`. |
| **5. Multi-Format Output & Markdown Delivery** | 15% | 8.5 / 10 | **9.0 / 10** | Hugo supports custom output formats (`index.json`, `index.md`, `rss.xml`). Astro static endpoints (`.json.ts`, `.md.ts`) offer full TypeScript programmatic generation with 100% byte fidelity. |
| **6. Netlify Hosting & Edge Functions** | 10% | **9.5 / 10** | **9.5 / 10** | Both generate pure static HTML/CSS/JS artifacts to a build folder. Netlify Edge Functions operate upstream of static files regardless of the generator. |
| **7. Ecosystem Health & Maintainability** | 5% | 7.5 / 10 | **9.5 / 10** | Astro is the industry benchmark for modern static editorial sites and documentation with a vibrant component ecosystem. |
| **8. Migration Risk & Route Safety** | 5% | **10.0 / 10** | 8.0 / 10 | Remaining on Hugo has 0 migration risk. Astro introduces route-mapping risk, which is mitigated by running the existing 6-suite test gate against the build output. |
| **Weighted Total Score** | **100%** | **7.98 / 10** | **8.98 / 10** | **Astro wins by +1.00 weighted points.** |

---

## 3. Detailed Dimension Analysis

### 3.1 Component Architecture & Scoped Styles
- **Hugo:** Styling is managed through global CSS/SCSS bundles. While we successfully established design tokens (`design-system.css`, `components.css`, `nav.css`), preventing style collision across 106 legacy pages requires careful manual BEM naming.
- **Astro:** Styles defined in `.astro` files are scoped automatically at build time. Components can import design tokens directly while keeping element-specific rules isolated.

### 3.2 Multi-H1 Heading Defect Remediation
During Phase A1 visual audit (`TYPO-01`), we identified that article pages in Hugo contained up to 19 `<h1>` elements because Hugo parsed Markdown `#` headers directly into `<h1>` tags inside the article template where the page title was already an `<h1>`.
- In Hugo, fixing this requires a custom markdown render hook (`render-heading.html`) that increments header depths or custom regex.
- In Astro, remark plugins or custom heading components enforce single-H1 semantic document outlines deterministically during compilation.

### 3.3 Content Negotiation & Agent Readiness
DearDhruv is "Agent-Ready" with RFC-9723 discovery files (`/.well-known/mcp.json`, `/.well-known/api-catalog`, `/llms.txt`, `/auth.md`, and Netlify Edge Function markdown negotiation).
- Hugo generates Markdown mirrors via `layouts/_default/single.md` and `index.md`.
- Astro can either copy the markdown source files directly into output directories or render structured markdown endpoints with complete metadata injection.

---

## 4. Spike Protocol & Go/No-Go Acceptance Criteria

Before executing a full migration, an isolated, non-destructive static spike will be constructed in `astro-spike/` under Task A7.2.

### Strict Go/No-Go Criteria:
1. **URL & Output Parity:** All 38 canonical routes must be generated with 100% status and MIME type parity.
2. **Zero Runtime JS on Reading Pages:** Core articles must emit 0 KB of client JavaScript.
3. **Edge Function Assertion Pass:** The Netlify Edge Function test suite (`tests/verify-edge-functions.js`) must achieve 72/72 passing assertions against the spike output.
4. **Build Time Budget:** Cold static build must complete in < 5.0 seconds locally.
5. **Accessibility Test Pass:** `node tests/verify-a11y-tokens.js` and `node tests/verify-contrast.js` must pass with 0 failures.

If all 5 criteria pass, Phase A7.5 will formally approve migration to Astro for Phases A8–A11. If any criterion fails and cannot be resolved cleanly, Hugo will remain the production architecture.
