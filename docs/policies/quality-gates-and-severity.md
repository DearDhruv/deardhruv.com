# Quality Gates, Severity Classification, and Release Blocking Criteria

**Document version:** 1.0.0  
**Effective date:** November 2026  
**Scope:** Automated testing gates, severity triage, and release acceptance rules  
**Reference standard:** Section 1.3, 7.0, & 13.0 of the Web Standards Audit Plan

---

## 1. Issue Severity Classification

Every issue discovered during automated scans, code reviews, or manual audits must be assigned an explicit severity classification:

| Severity Level | Definition | Impact on Production Release | Example Issues |
|---|---|---|---|
| **Fatal Functional Bug / Blocker** | Core functionality is broken; website fails to build; route returns 404/5xx; content is inaccessible. | **STOPS RELEASE IMMEDIATELY.** No exceptions permitted. | Build failure; broken published route; total blank page; missing navigation; broken legacy URL redirect. |
| **Critical** | Major accessibility barrier, critical security vulnerability, or severe performance regression. | **STOPS RELEASE.** Requires urgent fix or rollback. | Contrast ratio < 4.5:1 on body text; missing skip link; secret key in build output; budget overrun (>5KB JS, >45KB CSS). |
| **High** | Measurable UX degradation, missing metadata, broken non-critical internal link, or missing responsive wrap. | **Blocks release** unless an explicit temporary waiver with an expiration date is approved. | Broken internal anchor link; missing OpenGraph image; horizontal overflow on 320px phone; missing alt text on informative image. |
| **Medium** | Minor visual flaw, non-standard HTML attribute, or sub-optimal caching header. | Review and prioritize for next sprint; does not block urgent hotfix. | Minor typography line-height discrepancy; non-critical header cache duration; non-standard HTML attribute. |
| **Low / Informational** | Code readability, minor cosmetic enhancement, or documentation update. | Does not block release. | Code comment clarification; minor CSS selector simplification; documentation typo. |

---

## 2. Automated Quality Gates

The continuous quality pipeline consists of three sequential tiers of automated verification:

### Gate 1: Pre-Commit Fast Gate (`npm run quality:quick`)
Must execute in < 10 seconds locally:
1. TypeScript type check: `npm run check` (zero type errors).
2. Unit and regression test suites: `npm test` (all 10 test suites pass 100%).
3. Performance budget audit: `npm run test:perf` (all 4 resource budgets pass).

### Gate 2: Full Continuous Audit (`npm run audit`)
Zero-dependency audit engine verifying `dist/`:
- **Site Health & Route Parity:** 39/39 legacy routes verified; static documents verified; 0 broken internal links out of 870+ crawled.
- **SEO & Social Metadata:** 100% of canonical routes have titles, descriptions, canonical links, robots directives, OG cards, and Schema.org JSON-LD.
- **Accessibility & Contrast:** DOCTYPE, `lang="en"`, responsive viewport, landmarks, single h1, alt tags, focus tokens, and WCAG AA contrast tokens verified.
- **Performance Budgets:** CSS <= 45KB, JS <= 5KB, zero hydration runtime bundles, HTML <= 100KB, immutable caching headers.
- **Security & Leaks:** Zero credentials, zero private repository leaks, strict CSP, HSTS, frame-ancestors, rel="noopener".
- **AI Agent Discovery:** `llms.txt`, `llms-full.txt`, `ai.txt`, `.well-known/mcp.json`, `.well-known/api-catalog`, content negotiation.

### Gate 3: Release Candidate Gate (`npm run quality:release`)
Orchestrates all gates plus:
- Full 25-breakpoint viewport matrix verification (`tests/verify-viewport-matrix.js`).
- HTML standards validator (`scripts/verify-html-standards.js`).
- Complete route regression gate (`tests/verify-complete-regression.js`).
- Visual landmark outline verification (`tests/verify-visual-regression.js`).
- Release checklist sign-off.
