# Recurring Performance Audits & Continuous Monitoring

**Document:** `docs/performance/recurring-audits.md`  
**Date:** November 2, 2026  
**Execution Context:** `plans/DEARDHRUV_PAGESPEED_AND_LIGHTHOUSE_REMEDIATION_EXECUTION_PLAN.md` — Phase 12  

---

## 1. Monitoring Rhythm & Automation Schedule

To prevent regressions in performance, accessibility, SEO, or touch UX, automated checks are categorized into three cadence tiers:

### 1.1 Per-Commit / Pull Request (Local & CI)
Executed on every PR or push before merging:
- **Type Checking:** `npm run check` (`tsc --noEmit`)
- **Static Build:** `npm run build:astro`
- **Route Parity:** `npm run test:routes` (all 39 canonical & legacy routes)
- **Link Crawler:** `npm run test:links` (zero broken links)
- **Performance Budgets:** `npm run test:perf` (uncompressed CSS < 45.0 KB, JS < 5.0 KB, 0 hydration bundles)
- **Interactive Container Audit:** `npm run test:interactive` (touch clipping, stretched links, sequential order)
- **Token & Contrast Checks:** `npm run test:a11y` and `npm run test:contrast`
- **Full Quality Suite:** `npm run quality:quick`

### 1.2 Weekly Automated Health Sweep
Scheduled via CI workflow or local cron:
- **Comprehensive Quality Gate:** `npm run quality:release` (17-stage verification)
- **Site Health & Security Audit:** `node scripts/audit.js`
- **HTML Standards & Markup Validation:** `npm run quality:html`
- **Viewport Matrix Regression Check:** `npm run quality:browser`

### 1.3 Monthly Real-User Data (CrUX) & External Check
Manual or automated external check:
- Inspect Google PageSpeed Insights for domain-level CrUX volume transition (transition from "Insufficient Data" to 28-day 75th percentile Core Web Vitals).
- Audit Search Console Core Web Vitals report for mobile and desktop status.
- Update `docs/performance/runs/` with monthly metric logs.

---

## 2. Regression Escalation Matrix

| Trigger | Severity | Action Required |
| :--- | :---: | :--- |
| **CSS budget > 45.0 KB** | P1 | Block merge; prune dead CSS variables or consolidate duplicate selectors. |
| **Client JS > 5.0 KB or hydration detected** | P1 | Block merge; convert Astro island back to pure static server component. |
| **Touch bleed or missing overflow: hidden** | P1 | Block merge; restore container boundary clipping and matching border radii. |
| **Broken route or 404 on legacy alias** | P0 | Block release; restore HTML redirect or Netlify redirect rule. |
| **WCAG AA contrast failure in any theme** | P1 | Block merge; adjust color token in `design-system.css`. |
