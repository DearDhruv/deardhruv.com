# Production Quality Release & Rollback Checklist

**Document version:** 1.0.0  
**Effective date:** November 2026  
**Scope:** Pre-release verification gates, deployment sign-off, post-deploy smoke testing, and emergency rollback procedures  
**Reference standard:** Section 7.5, 7.6, 9.0 (Phase 13), & 13.0 of the Web Standards Audit Plan

---

## 1. Pre-Production Release Gate Checklist

Before deploying any release candidate to production, all of the following requirements must be verified:

- [x] **Zero TypeScript Errors:** `npm run check` exits with 0 errors.
- [x] **Clean Static Production Build:** `npm run build:astro` produces all static HTML pages and endpoints in `dist/` without warnings.
- [x] **100% Legacy Route Parity:** All 39 legacy routes verified on disk (`npm run test:routes`).
- [x] **Internal Link Integrity:** Zero broken internal links out of 870+ links crawled (`npm run quality:links`).
- [x] **HTML Standards & Semantics:** 100% of HTML pages pass W3C/WCAG criteria (`npm run quality:html`).
  - Valid HTML5 DOCTYPE, `html[lang="en"]`, UTF-8, responsive viewport meta.
  - Strict single `<h1>` per page; logical heading progression.
  - Required landmarks: `<header class="site-header">`, `<nav>`, `<main id="main">`, `<footer class="site-footer">`.
  - Skip link targeting `#main`.
  - Image `alt` text on all informative images.
  - Zero duplicate element IDs.
- [x] **25-Breakpoint Viewport Matrix:** Verified across all form factors from 320px to 3840px (`npm run quality:browser`).
  - Zero horizontal overflow blowout.
  - Grid primitives wrap gracefully on 320px phones.
  - Reading measure constrained to `72ch`.
  - Touch targets meet or exceed 44x44px.
- [x] **WCAG 2.2 Level AA Contrast:** All color tokens meet or exceed 4.5:1 (verified up to 17.79:1) in both Dark and Light modes (`npm run test:contrast`).
- [x] **Performance Budgets Verified:** (`npm run quality:perf`)
  - Client JavaScript <= 5.0 KB uncompressed (currently 4.51 KB).
  - Client Hydration Runtime: **0.0 KB** (Zero framework code in `_astro/`).
  - Total CSS <= 45.0 KB uncompressed (currently 44.64 KB).
  - Static HTML document size <= 100 KB per route.
- [x] **Netlify Edge Negotiation:** Markdown content negotiation preserves query parameters and honors RFC 9110 quality weights (`npm run test:edge`).
- [x] **Security & Secret Leaks:** (`npm run quality:security`)
  - Strict Content-Security-Policy (CSP), HSTS preload, X-Frame-Options DENY, X-Content-Type-Options nosniff.
  - Zero private repository URLs, tokens, or credentials present in `dist/`.
  - All external `target="_blank"` links enforce `rel="noopener noreferrer"`.
- [x] **SEO & AI Discoverability:**
  - `sitemap.xml` with exactly 23 canonical routes, excluding error/preview pages.
  - `robots.txt` properly configured for search engines and welcoming major AI agents.
  - Valid Schema.org JSON-LD graphs (Person, WebSite, TechArticle, SoftwareApplication).
  - `llms.txt`, `llms-full.txt`, `ai.txt`, `.well-known/mcp.json`, `.well-known/api-catalog` verified on disk.
- [x] **Consolidated Audit Scorecard:** 176/176 checks passed cleanly in `npm run audit`.

---

## 2. Release Candidate Execution Command

Run the single release gate orchestrator command:

```bash
npm run quality:release
```

If any check in the sequence fails, the release gate immediately halts and blocks deployment.

---

## 3. Post-Deployment Production Smoke Tests

Immediately upon deployment to the production edge CDN (<https://deardhruv.com>):

1. **HTTP Status & SSL Certificate:**
   - Verify HTTP-to-HTTPS 301 redirection: `curl -I http://deardhruv.com/` returns 301 to `https://deardhruv.com/`.
   - Verify HTTP 200 on apex: `curl -I https://deardhruv.com/`.
   - Verify HSTS, CSP, and Security Headers in response headers.
2. **Canonical Pages Smoke Test:**
   - Verify `/`, `/about/`, `/portfolio/`, `/projects/`, `/posts/`, `/sitemap/`.
3. **Legacy Redirection Smoke Test:**
   - Verify `/feed.json` rewrites to `/index.json` with 200 status.
   - Verify `/about-us/` and `/about-hugo/` redirect cleanly to `/about/`.
4. **Static Documents & Feeds:**
   - Verify `/resume.pdf`, `/sitemap.xml`, `/index.xml`, `/index.json`, `/llms.txt`.
4. **404 Handling:**
   - Request non-existent URL (e.g., `/non-existent-route-smoke-check/`).
   - Confirm proper 404 status code returned (not a soft-200) with custom 404 HTML body.
5. **Content Negotiation Test:**
   - `curl -H "Accept: text/markdown" https://deardhruv.com/` returns Markdown representation.

---

## 4. Emergency Rollback Procedure

If an unpredicted production defect is detected post-release:

### Option A: Instant Netlify Webhook / Dashboard Rollback (< 60 seconds)
1. Open Netlify Dashboard -> `deardhruv.com` -> **Deploys**.
2. Locate the previous known-good deployment commit.
3. Click **Publish deploy** to instantly roll back CDN edge caching to the previous release artifact without rebuilding.

### Option B: Git Revert and Production Deploy
1. Revert the faulty commit on the release branch:
   ```bash
   git revert <bad-commit-sha> -m 1
   ```
2. Re-run verification suite:
   ```bash
   npm run quality:release
   ```
3. Push the clean revert commit to trigger automated CI/CD branch deployment.
