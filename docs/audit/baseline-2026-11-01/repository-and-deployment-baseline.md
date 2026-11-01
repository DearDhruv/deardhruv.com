# Repository and Deployment Baseline

**Date:** 1 November 2026  
**Author / Agent:** Antigravity  
**Specification:** `plans/DEARDHRUV_CURRENT_WEBSITE_DEEP_AUDIT_AND_EMPLOYER_PORTFOLIO_EXECUTION_PLAN.md` — Phase 0, Task 0.1  

---

## 1. Repository & Branch Information

- **Repository Root:** `/Users/deardhruv/Dhruv/work/dhruv/dhruv-git/deardhruv.com`
- **Origin Remote:** `https://github.com/DearDhruv/deardhruv.com.git`
- **Active Working Branch:** `feature/portfolio`
- **Head Commit SHA:** `9be9cca5a7a9226cb1e19488b3bbd22fc0b47120` (`9be9cca`)
- **Head Commit Subject:** `feat(seo): optimize keyword indexing and entity graph for 'deardhruv' search queries`
- **Working Tree Status:** Clean, up to date with `origin/feature/portfolio`
- **Remote Branches Discovered:**
  - `origin/master` (Commit `6991aff`: *fix(seo): exclude noindex taxonomy and term pages from sitemap.xml*)
  - `origin/feature/portfolio` (Commit `9be9cca`: *feat(seo): optimize keyword indexing and entity graph for 'deardhruv' search queries*)
  - `origin/feature/ai-playground-series` (Commit `031fecc`)
  - `origin/feat/updates`
  - `origin/preview`

---

## 2. Recent Commit History on `feature/portfolio`

```
9be9cca feat(seo): optimize keyword indexing and entity graph for 'deardhruv' search queries
1bbb043 refactor(profile): update title and summary to Lead Android Engineer, Android Architect, and Android Artist
7830c98 feat(icons): harmonize Google Play store icon to consistent outlined stroke design
2219189 fix(ui): enable sticky topbar with overflow-x clip and harmonize horizontal centering
05cfea2 feat(theme): set warm editorial amber as primary default palette across root CSS, light mode, and client init
```

---

## 3. Netlify Deployment Contract

Verified against `netlify.toml`:
- **Build Publish Directory:** `dist`
- **Build Command:** `npm run build:astro`
- **Node Runtime:** `24`
- **Contexts:**
  - Production: Node 24, command `npm run build:astro`, publish `dist`
  - Deploy-Preview: Node 24, command `npm run build:astro`
  - Branch-Deploy: Node 24, command `npm run build:astro`
- **Edge Functions:**
  - Path: `/*`
  - Function: `markdown-negotiation`
- **Security & Headers:**
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
  - `Content-Security-Policy` and `Permissions-Policy` configured

---

## 4. Local Edits & Safeguard Verification

- No uncommitted or conflicting local modifications in tracked files.
- Working branch `feature/portfolio` is strictly tracking remote branch `origin/feature/portfolio`.
- Baseline established without modifying any public routes, URLs, or production configurations.
