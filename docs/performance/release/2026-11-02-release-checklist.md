# Release Checklist & Deployment Verification

**Document:** `docs/performance/release/2026-11-02-release-checklist.md`  
**Date:** November 2, 2026  
**Execution Context:** `plans/DEARDHRUV_PAGESPEED_AND_LIGHTHOUSE_REMEDIATION_EXECUTION_PLAN.md` — Phase 11  
**Target:** `https://deardhruv.com/`  
**Branch:** `feature/portfolio`  

---

## 1. Pre-Deployment Verification Gates

- [x] **Strict Type Checking:** `npm run check` (`tsc --noEmit`) passes with 0 errors.
- [x] **Production Static Build:** `npm run build:astro` completes in < 1500ms producing 28 HTML routes and 24 Markdown mirrors.
- [x] **Legacy Route Parity:** 39/39 legacy routes verified in `dist/` (HTML pages, redirects, feeds, sitemap, resume PDF).
- [x] **Asset Verification:** Favicons, WebP avatars, Web Manifest, discovery endpoints verified.
- [x] **Link Integrity:** 873/873 internal and outbound links audited without broken anchors or redirects.
- [x] **Performance Budgets:**
  - Total uncompressed CSS: **44.71 KB** (< 45.0 KB budget).
  - Total client JS: **4.51 KB** (< 5.0 KB budget).
  - Client hydration bundles: **0 KB** (Zero Astro/React islands).
- [x] **Interactive Containers & Touch Containment:**
  - 56/56 container assertions pass in `tests/verify-interactive-containers.js`.
  - All buttons, cards, chips, tags, and nav links enforce `overflow: hidden`, matching `border-radius`, and `border-radius: inherit` on pseudo-elements.
  - Native tap highlight boxes eliminated via `-webkit-tap-highlight-color: transparent`.
- [x] **Accessibility & Design Token Contrast:**
  - 22/22 token and contrast assertions pass across all 4 theme modes (light, dark, warm, cool).
  - WCAG AA compliant contrast ratios across body text, cards, buttons, and links.
- [x] **Comprehensive Quality Release Gate:**
  - `npm run quality:release` executed all 17 automated pipeline stages with 100% pass rate.

---

## 2. Production Deployment & Preview Protocol

1. **Deploy Preview Verification:**
   - Push branch `feature/portfolio` to GitHub.
   - Netlify generates Deploy Preview URL: `https://deploy-preview-xxx--deardhruv.netlify.app`.
   - Validate headers: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Content-Security-Policy`.
   - Validate immutable cache headers on static assets (`/css/*`, `/_astro/*`).
2. **Production Merge:**
   - Merge `feature/portfolio` into `main` after owner review.
   - Netlify triggers atomic production build.
3. **Rollback Plan:**
   - If regressions are detected post-release, Netlify dashboard supports 1-click instantaneous rollback to the previous atomic deployment.
   - Git rollback commit can be deployed using `git revert HEAD`.

---

## 3. Post-Deployment Smoke Test Protocol

Run immediate smoke checks against `https://deardhruv.com/`:
- [ ] Check HTTP 200 on `/`, `/about/`, `/portfolio/`, `/projects/`, `/posts/`.
- [ ] Check 301/canonical redirects for legacy paths: `/about-us/`, `/about-hugo/`, `/contact/`.
- [ ] Verify RSS feed at `/index.xml` and sitemap at `/sitemap.xml`.
- [ ] Verify AI discovery endpoints: `/llms.txt`, `/llms-full.txt`, `/.well-known/mcp.json`.
- [ ] Perform touch tap verification on physical Android and iOS devices to confirm touch feedback clipping.
