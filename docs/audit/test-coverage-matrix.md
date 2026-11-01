# Test and Audit Coverage Matrix

**Date:** 1 November 2026  
**Specification:** `plans/DEARDHRUV_CURRENT_WEBSITE_DEEP_AUDIT_AND_EMPLOYER_PORTFOLIO_EXECUTION_PLAN.md` — Phase 0, Task 0.3  

---

## 1. Overview of Existing Test & Audit Scripts

The repository implements a layered automated verification system testing static output (`dist/`) after `npm run build:astro`.

| Script / Test File | Purpose & Measurements | Inputs | Can Fail CI? | Notes / Coverage Gaps |
|---|---|---|:---:|---|
| `scripts/verify-routes.js` | Audits 39 legacy routes & aliases (HTML, aliases, feeds, sitemaps, PDFs, discovery endpoints) | `dist/`, `tests/fixtures/legacy-routes.json` | Yes | 100% coverage of legacy route contract. |
| `tests/verify-assets.js` | Validates presence & file-size minimums for resume PDF (>100KB), icons, llms.txt, API catalog | `dist/` | Yes | Ensures critical downloadable assets are never empty or corrupted. |
| `tests/verify-links.js` | Static crawler checking all internal links across 28 generated HTML documents | `dist/**/*.html` | Yes | 913 internal links crawled; 0 broken links allowed. |
| `tests/verify-edge-functions.js` | Validates Netlify Edge Function markdown negotiation logic and route bypassing | `netlify/edge-functions/`, `dist/` | Yes | Verifies RFC content negotiation for AI agents & browsers. |
| `tests/verify-contrast.js` | Calculates mathematical WCAG 2.2 AA contrast ratios for light and dark palettes | Theme tokens & CSS | Yes | Enforces >= 4.5:1 text contrast and >= 3:1 UI contrast. |
| `tests/verify-a11y-tokens.js` | Verifies focus ring tokens and `prefers-reduced-motion` animation & scrolling overrides | `dist/css/` | Yes | Protects reduced motion standards. |
| `tests/verify-content-loader.js` | Validates frontmatter parsing, date formats, slugs, and markdown rendering | `content/` | Yes | Validates markdown schema integrity. |
| `tests/verify-seo-metadata.js` | Audits `<title>`, descriptions, OpenGraph, Twitter cards, robots, and JSON-LD structured data | `dist/` | Yes | Validates Person, WebSite, Breadcrumbs, and Article schema graphs. |
| `tests/verify-interactive-containers.js` | Validates card stretched links, sequential order (Parts 1-6), icon-prefix placement, hover affordances | `dist/` | Yes | Enforces container clickability and visual hierarchy standards. |
| `tests/verify-complete-regression.js` | End-to-end regression harness orchestrating all core test suites | Entire project | Yes | Used for pre-release validation. |
| `tests/verify-visual-regression.js` | Audits 9 representative pages across 6 viewports, single-H1 enforcement, landmarks, CSS guardrails | `dist/`, `tests/fixtures/visual-baseline.json` | Yes | Guarantees single-H1 architecture and landmark accessibility. |
| `tests/verify-performance-budgets.js` | Enforces build time (<3.5s), uncompressed CSS budget (<45 KB), client JS budget (<5 KB, 0 hydration bundles) | `dist/` | Yes | Strict static budget gate. |
| `scripts/audit.js` | Permanent continuous audit engine running 172 checks across 6 modules (health, seo, a11y, perf, security, ai) | `dist/`, `netlify.toml` | Yes | Generates `docs/audits/latest-health-report.md`. |

---

## 2. Identified Coverage Gaps & Future Enhancements

1. **Employer Project Attribution Checks:**
   - Current tests verify general card clickability and series ordering, but do not yet assert that employer project cards contain the required bottom company-attribution line (`Company: ... · Role: ... · Period: ...`).
2. **AI Playground Repository Link:**
   - Link check verifies internal links; external links (e.g. GitHub repo returning 404) are not flagged by internal crawler. External link checker is needed.
3. **Field Data Limitations:**
   - Real-world Core Web Vitals (CrUX) and Search Console query tracking are field metrics requiring Google Search Console owner authorization, which cannot be simulated in local unit tests.
