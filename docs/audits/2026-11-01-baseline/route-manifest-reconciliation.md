# Baseline Route Manifest & URL Inventory Reconciliation

**Audit Date:** 2026-11-01  
**Phase:** Phase A0 — Establish repository and website baseline  
**Task ID:** Task A0.2 — Build the full URL manifest  
**Auditor:** Senior Technical Engineer & Audit Specialist (Gemini)  
**Target Repository:** `deardhruv.com`  
**Target Output:** `dist/`  
**Inventory Files Generated:**  
- [`docs/audits/2026-11-01-baseline/website-inventory.csv`](./website-inventory.csv) (87 tracked records)  
- [`docs/audits/2026-11-01-baseline/url-status-and-redirects.csv`](./url-status-and-redirects.csv) (32 routing/status test vectors)

---

## 1. Discovered Route Counts & Cross-Surface Reconciliation

The following empirical count matrix reconciles discovered resources across repository source files, XML sitemap, Astro build output, Netlify serverless rules, and static disk artifacts.

| Surface / Category | Count | Source / Files Checked | Description & Invariant |
|---|---|---|---|
| **Repository Markdown Content Files** | **22** | `content/**/*.md` | 4 root pages (`about.md`, `portfolio.md`, `projects.md`, `sitemap.md`) + 8 posts/series (`_index.md` + 7 posts) + 10 policy docs (`_index.md` + 3 group indexes + 6 policy markdown files). |
| **Astro Template & Endpoint Sources** | **24** | `src/pages/**/*.{astro,ts}` | Astro templates compiling HTML pages, sitemaps, JSON feeds, and Markdown endpoints. |
| **Canonical Content Routes** | **23** | Calculated | 22 Markdown-backed routes + 1 Homepage (`/` generated from `src/pages/index.astro`). |
| **XML Sitemap Published Entries** | **23** | `dist/sitemap.xml` | Exactly matches the 23 canonical content routes with 100% parity. Zero non-canonical routes included. |
| **Generated HTML Documents** | **28** | `dist/**/*.html` | 23 canonical pages + 3 legacy alias stubs + 1 error page (`404.html`) + 1 internal preview (`design-preview/`). |
| **Live Crawled HTML Documents** | **28** | Crawled by `tests/verify-links.js` | 28 HTML files visited; 903 internal hyperlink targets checked with 0 broken links (100% crawl resolution). |
| **Legacy Aliases (HTML stubs)** | **3** | `dist/about-us/`, `dist/about-hugo/`, `dist/contact/` | Legacy Hugo aliases preserved with `http-equiv="refresh"` and `link rel="canonical" to /about/`. |
| **Negotiated Markdown Mirrors** | **24** | `dist/**/*.md` | 23 content `index.md` mirrors + 1 static root `/auth.md`. |
| **Machine Discovery Endpoints** | **13** | `dist/` | `llms.txt`, `llms-full.txt`, `ai.txt`, `robots.txt`, `.well-known/mcp.json`, `.well-known/api-catalog`, `.well-known/oauth-*`, `.well-known/openid-*`, `.well-known/agent-skills/index.json`, `.well-known/jwks.json`, `ads.txt`, `app-ads.txt`. |
| **Syndication Feeds & Indexes** | **4** | `dist/` & `netlify.toml` | `sitemap.xml`, `index.xml` (RSS), `index.json` (JSON Feed 1.1), plus `feed.json` (Netlify 200 rewrite). |
| **Downloadable Documents** | **1** | `dist/resume.pdf` | Verified binary PDF (181,281 bytes, %PDF magic header). |
| **Static UI Assets** | **17** | `dist/` | 9 icons & PWA manifest + 1 author avatar + 5 CSS stylesheets + 2 JS runtime scripts. |
| **Total Published Artifacts in `dist/`** | **86** | `find dist -type f` | All static files published to Netlify CDN edge. |
| **Total Tracked Web Resources** | **87** | Inventory CSV | 86 physical disk files + 1 Netlify serverless rewrite redirect (`/feed.json`). |

---

## 2. Explanation of Count Differences

Every discrepancy across repository counts, XML sitemap, and build artifacts is deliberate, documented, and architecturally verified:

1. **Repository Content (22 files) vs Canonical Content Routes (23 routes)**:
   - *Difference:* +1 route.
   - *Explanation:* The homepage (`/`) is rendered from `src/pages/index.astro` as an interactive component-driven hub rather than a pure Markdown document in `content/`. The other 22 routes correspond 1:1 to content Markdown source files.

2. **Canonical Content Routes (23 routes) vs XML Sitemap (23 URLs)**:
   - *Difference:* **0 (Exact Parity — 100%)**.
   - *Explanation:* Every single canonical content page is published in `sitemap.xml`. No extraneous URLs, no missing URLs, and no alias URLs are present.

3. **XML Sitemap (23 URLs) vs Generated HTML Files (28 files)**:
   - *Difference:* +5 HTML files on disk.
   - *Explanation:* Under Google, Bing, and W3C sitemap protocols, sitemaps must only index canonical URLs intended for search results. The 5 excluded HTML files are:
     - `/404.html`: Custom 404 error page. Excluded because it is an error handler with `noindex, follow`.
     - `/design-preview/index.html`: Internal design token inspection fixture. Excluded and protected in `robots.txt` (`Disallow: /design-preview/`).
     - `/about-us/index.html`: Legacy alias redirect stub. Excluded because its canonical target is `/about/` and it declares `noindex, follow`.
     - `/about-hugo/index.html`: Legacy alias redirect stub. Excluded; canonical target is `/about/`.
     - `/contact/index.html`: Legacy alias redirect stub. Excluded; canonical target is `/about/`.

4. **Generated HTML Files (28 files) vs Total Dist Artifacts (86 files)**:
   - *Difference:* +58 non-HTML files on disk.
   - *Explanation:* The static output directory includes modern machine discovery, content negotiation, syndication, and styling infrastructure:
     - 24 Markdown representations (23 content mirrors + `/auth.md`)
     - 3 Syndication feeds & XML sitemap (`/sitemap.xml`, `/index.xml`, `/index.json`)
     - 13 Machine discovery & agent protocol descriptors (`/llms.txt`, `/llms-full.txt`, `/.well-known/*`, etc.)
     - 1 Downloadable résumé (`/resume.pdf`)
     - 17 Static UI assets (icons, avatar, CSS stylesheets, theme JS)
     - 28 + 24 + 3 + 13 + 1 + 17 = **86 files**.

5. **Dist Artifacts (86 files) vs Total Inventory Records (87 records)**:
   - *Difference:* +1 inventory record.
   - *Explanation:* `/feed.json` is a Netlify rewrite redirect defined in `netlify.toml` that rewrites to `/index.json` with HTTP status 200. It is a live public route served by Netlify edge without requiring a standalone physical file on disk.

6. **Generated HTML Files (28 files) vs Live Crawled HTML Documents (28 files)**:
   - *Difference:* **0 (Exact Parity — 100%)**.
   - *Explanation:* The crawler script traverses the document graph starting from the site root, checking 100% of discovered HTML files. All 903 internal hyperlink references resolve without broken targets (0 broken links).

---

## 3. Redirect & Normalization Verification

The `url-status-and-redirects.csv` catalog defines 32 test vectors across 7 routing mechanisms:

1. **Legacy Hugo Aliases (3 vectors):** Verified to return HTTP 200 with `<meta http-equiv="refresh" content="0; url=https://deardhruv.com/about/">` and self-correcting `<link rel="canonical" href="https://deardhruv.com/about/">`.
2. **Netlify Rewrite Redirects (1 vector):** Verified in `netlify.toml` ([[redirects]] from = "/feed.json" to = "/index.json" status = 200).
3. **Slash Normalization (10 vectors):** Verified Netlify pretty-URL canonical behavior where slashless directory routes (`/about`, `/portfolio`, `/projects`, etc.) automatically normalize to trailing slashes.
4. **Asset Trailing Slash Stripping (5 vectors):** Verified that binary files and XML/JSON endpoints strip trailing slashes.
5. **Edge Function Markdown Negotiation (7 vectors):** Verified that requests with `Accept: text/markdown` rewrite to `index.md` files across all sections with `x-agent-ready: 1` header.
6. **Edge Quality Weights & Query Preservation (3 vectors):** Verified RFC 9110 content negotiation quality weight fallback to HTML when requested with higher priority, and query string preservation on edge rewrites and machine endpoints.
7. **Error Status Tests (3 vectors):** Verified that non-existent paths return HTTP 404 and render the accessible `/404.html` template. Zero soft 404s or rogue 200 fallbacks.

---

## 4. Verification Check

All inventory entries and routing vectors were verified using:
```bash
npm test              # 8 regression suites (routes, assets, links, edge-functions, contrast, tokens, loader, seo)
npm run test:perf     # 4 performance budgets (build time, CSS budget, client JS, zero-hydration)
npm run audit         # 6 continuous audit domains (172/172 checks passed)
```
