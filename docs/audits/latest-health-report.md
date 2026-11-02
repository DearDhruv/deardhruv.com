# Continuous Site Audit & Health Report

**Audit Timestamp:** 2026-11-02T18:51:41.917Z (11/3/2026, 12:21:41 AM GMT+5:30)  
**Environment:** Static Output (`dist/`)  
**Target:** [deardhruv.com](https://deardhruv.com)  
**Auditor Engine:** Built-in Continuous Audit Engine (`scripts/audit.js`)  
**Execution Duration:** 34.8ms  
**Overall Status:** **HEALTHY (100% PASS)** (178/178 checks passed — 100.0%)

---

## 1. Executive Scorecard

| Audit Domain | Passed | Failed | Total Checks | Score | Status |
|---|---|---|---|---|---|
| **1. Site Health, Routes & Assets** | 47 | 0 | 47 | 100.0% | ✅ PASS |
| **2. SEO, Structured Data & Feeds** | 72 | 0 | 72 | 100.0% | ✅ PASS |
| **3. Accessibility & Tokens** | 22 | 0 | 22 | 100.0% | ✅ PASS |
| **4. Performance & Runtime JS** | 6 | 0 | 6 | 100.0% | ✅ PASS |
| **5. Security Headers & Leaks** | 9 | 0 | 9 | 100.0% | ✅ PASS |
| **6. AI Discovery & Agent Readiness** | 22 | 0 | 22 | 100.0% | ✅ PASS |
| **TOTAL / OVERALL** | **178** | **0** | **178** | **100.0%** | **HEALTHY (100% PASS)** |

---

## 2. Detailed Findings by Category

### 1. Site Health, Routes & Assets

**Score:** 47/47 checks passed

- ✅ Static output directory (dist/) exists *(/Users/deardhruv/Dhruv/work/dhruv/dhruv-git/deardhruv.com/dist)*
- ✅ Route parity: [HTML] /
- ✅ Route parity: [HTML] /about/
- ✅ Route parity: [ALIAS] /about-us/
- ✅ Route parity: [ALIAS] /about-hugo/
- ✅ Route parity: [ALIAS] /contact/
- ✅ Route parity: [HTML] /portfolio/
- ✅ Route parity: [HTML] /projects/
- ✅ Route parity: [HTML] /posts/
- ✅ Route parity: [HTML] /posts/ai_playground_series/
- ✅ Route parity: [HTML] /posts/ai_playground_series/01-i-wanted-the-model-to-stay-on-the-phone/
- ✅ Route parity: [HTML] /posts/ai_playground_series/02-the-day-a-chat-box-became-a-document-engine/
- ✅ Route parity: [HTML] /posts/ai_playground_series/03-the-model-was-fine-the-phone-wasnt/
- ✅ Route parity: [HTML] /posts/ai_playground_series/04-i-put-an-image-generator-inside-the-phone/
- ✅ Route parity: [HTML] /posts/ai_playground_series/05-at-some-point-i-stopped-building-a-chat-app/
- ✅ Route parity: [HTML] /posts/ai_playground_series/06-pushing-mobile-hardware-to-the-edge/
- ✅ Route parity: [HTML] /sitemap/
- ✅ Route parity: [XML] /sitemap.xml
- ✅ Route parity: [PDF] /resume.pdf
- ✅ Route parity: [HTML] /other/
- ✅ Route parity: [HTML] /other/ai-playground/
- ✅ Route parity: [HTML] /other/ai-playground/privacy-policy-ai-playground-app/
- ✅ Route parity: [HTML] /other/ai-playground/terms-ai-playground-app/
- ✅ Route parity: [HTML] /other/open-store-app/
- ✅ Route parity: [HTML] /other/open-store-app/privacy-policy-open-store-app/
- ✅ Route parity: [HTML] /other/open-store-app/terms-open-store-app/
- ✅ Route parity: [HTML] /other/veloci-hue/
- ✅ Route parity: [HTML] /other/veloci-hue/privacy-policy-veloci-hue-game/
- ✅ Route parity: [HTML] /other/veloci-hue/terms-veloci-hue/
- ✅ Route parity: [JSON] /index.json
- ✅ Route parity: [MARKDOWN] /index.md
- ✅ Route parity: [REDIRECT] /feed.json
- ✅ Route parity: [TEXT] /llms.txt
- ✅ Route parity: [MARKDOWN] /auth.md
- ✅ Route parity: [JSON] /.well-known/api-catalog
- ✅ Route parity: [JSON] /.well-known/mcp.json
- ✅ Route parity: [JSON] /.well-known/oauth-protected-resource
- ✅ Route parity: [JSON] /.well-known/oauth-authorization-server
- ✅ Route parity: [JSON] /.well-known/openid-configuration
- ✅ Route parity: [HTML] /404.html
- ✅ Resume PDF exists and exceeds 100KB
- ✅ Apple Touch Icon exists and valid
- ✅ Favicon 32x32 PNG exists and valid
- ✅ Author avatar (pro_pic_small.jpg) exists and exceeds 5KB
- ✅ HTML document count meets threshold (28 files found)
- ✅ Internal link integrity (0 broken links out of 873 crawled)
- ✅ Custom 404 error page exists and valid

### 2. SEO, Structured Data & Feeds

**Score:** 72/72 checks passed

- ✅ robots.txt exists in dist/
- ✅ robots.txt declares policies for Googlebot and Bingbot
- ✅ robots.txt welcomes major AI crawlers (OpenAI, Anthropic, Gemini, Perplexity, DeepSeek)
- ✅ robots.txt restricts aggressive scraper bots
- ✅ robots.txt references canonical XML sitemap
- ✅ robots.txt references llms.txt discovery endpoint
- ✅ robots.txt declares Content-Signals protocol
- ✅ sitemap.xml exists in dist/
- ✅ sitemap.xml has valid XML schema
- ✅ sitemap.xml prioritizes homepage with 1.0
- ✅ sitemap.xml contains exactly 23 canonical routes
- ✅ sitemap.xml excludes internal preview and error pages
- ✅ RSS 2.0 feed (index.xml) exists and valid
- ✅ JSON Feed 1.1 (index.json) exists, valid syntax, and contains items
- ✅ Home has valid title without duplicate branding
- ✅ Home declares meta description
- ✅ Home declares absolute canonical URL
- ✅ Home declares index, follow robots directive
- ✅ Home declares OpenGraph social cards
- ✅ Home declares Twitter card
- ✅ Home declares valid Schema.org JSON-LD (@graph with Person & WebSite)
- ✅ About has valid title without duplicate branding
- ✅ About declares meta description
- ✅ About declares absolute canonical URL
- ✅ About declares index, follow robots directive
- ✅ About declares OpenGraph social cards
- ✅ About declares Twitter card
- ✅ About declares valid Schema.org JSON-LD (@graph with Person & WebSite)
- ✅ Portfolio has valid title without duplicate branding
- ✅ Portfolio declares meta description
- ✅ Portfolio declares absolute canonical URL
- ✅ Portfolio declares index, follow robots directive
- ✅ Portfolio declares OpenGraph social cards
- ✅ Portfolio declares Twitter card
- ✅ Portfolio declares valid Schema.org JSON-LD (@graph with Person & WebSite)
- ✅ Projects has valid title without duplicate branding
- ✅ Projects declares meta description
- ✅ Projects declares absolute canonical URL
- ✅ Projects declares index, follow robots directive
- ✅ Projects declares OpenGraph social cards
- ✅ Projects declares Twitter card
- ✅ Projects declares valid Schema.org JSON-LD (@graph with Person & WebSite)
- ✅ Writing Index has valid title without duplicate branding
- ✅ Writing Index declares meta description
- ✅ Writing Index declares absolute canonical URL
- ✅ Writing Index declares index, follow robots directive
- ✅ Writing Index declares OpenGraph social cards
- ✅ Writing Index declares Twitter card
- ✅ Writing Index declares valid Schema.org JSON-LD (@graph with Person & WebSite)
- ✅ Article 01 has valid title without duplicate branding
- ✅ Article 01 declares meta description
- ✅ Article 01 declares absolute canonical URL
- ✅ Article 01 declares index, follow robots directive
- ✅ Article 01 declares OpenGraph social cards
- ✅ Article 01 declares Twitter card
- ✅ Article 01 declares valid Schema.org JSON-LD (@graph with Person & WebSite)
- ✅ Article 06 has valid title without duplicate branding
- ✅ Article 06 declares meta description
- ✅ Article 06 declares absolute canonical URL
- ✅ Article 06 declares index, follow robots directive
- ✅ Article 06 declares OpenGraph social cards
- ✅ Article 06 declares Twitter card
- ✅ Article 06 declares valid Schema.org JSON-LD (@graph with Person & WebSite)
- ✅ Visual Sitemap has valid title without duplicate branding
- ✅ Visual Sitemap declares meta description
- ✅ Visual Sitemap declares absolute canonical URL
- ✅ Visual Sitemap declares index, follow robots directive
- ✅ Visual Sitemap declares OpenGraph social cards
- ✅ Visual Sitemap declares Twitter card
- ✅ Visual Sitemap declares valid Schema.org JSON-LD (@graph with Person & WebSite)
- ✅ Projects declares SoftwareApplication structured data
- ✅ Custom 404 page declares noindex, follow robots directive

### 3. Accessibility & Tokens

**Score:** 22/22 checks passed

- ✅ All HTML documents have valid DOCTYPE declaration
- ✅ All HTML documents specify lang="en" on root html element
- ✅ All HTML documents declare responsive meta viewport
- ✅ All content pages implement accessible <main id="main"> landmark
- ✅ All content pages implement skip-to-content link (href="#main")
- ✅ All content pages contain an accessible <h1> document heading
- ✅ All images specify alt text attributes (0 missing)
- ✅ design-system.css exists in dist/css/
- ✅ CSS defines prefers-reduced-motion media query
- ✅ CSS neutralizes animation and transition durations for reduced motion
- ✅ CSS disables smooth scrolling in reduced motion
- ✅ CSS defines accessible --color-focus-ring semantic token
- ✅ WCAG AA Contrast: Dark Mode Primary Body Text (17.79:1 >= 4.5:1)
- ✅ WCAG AA Contrast: Dark Mode Secondary Text (10.26:1 >= 4.5:1)
- ✅ WCAG AA Contrast: Dark Mode Link Accent (11.30:1 >= 4.5:1)
- ✅ WCAG AA Contrast: Dark Mode Card Text (16.38:1 >= 4.5:1)
- ✅ WCAG AA Contrast: Dark Mode Button Label (10.40:1 >= 4.5:1)
- ✅ WCAG AA Contrast: Light Mode Primary Body Text (16.50:1 >= 4.5:1)
- ✅ WCAG AA Contrast: Light Mode Secondary Text (9.69:1 >= 4.5:1)
- ✅ WCAG AA Contrast: Light Mode Link Accent (4.74:1 >= 4.5:1)
- ✅ WCAG AA Contrast: Light Mode Card Text (17.49:1 >= 4.5:1)
- ✅ WCAG AA Contrast: Light Mode Button Label (5.02:1 >= 4.5:1)

### 4. Performance & Runtime JS

**Score:** 6/6 checks passed

- ✅ Total uncompressed CSS is within budget (44.94 KB < 45.0 KB)
- ✅ Total uncompressed Client JS is within budget (4.67 KB < 5.0 KB)
- ✅ Zero runtime client hydration bundles generated (0 found)
- ✅ Maximum HTML page size within budget (99.28 KB for posts/ai_playground_series/01-i-wanted-the-model-to-stay-on-the-phone/index.html < 100 KB)
- ✅ Static assets configured with 1-year immutable caching in netlify.toml
- ✅ Icons configured with 30-day caching in netlify.toml

### 5. Security Headers & Leaks

**Score:** 9/9 checks passed

- ✅ HTTP Header: X-Frame-Options set to DENY
- ✅ HTTP Header: X-Content-Type-Options set to nosniff
- ✅ HTTP Header: Referrer-Policy configured
- ✅ HTTP Header: HSTS enabled with preload
- ✅ HTTP Header: Content-Security-Policy strictly configured
- ✅ HTTP Header: Permissions-Policy restricts sensitive device APIs
- ✅ Zero private repository links leaked across dist/ (0 leaks)
- ✅ External target="_blank" links implement rel="noopener" (0 unprotected)
- ✅ Zero sensitive files or credentials present in dist/

### 6. AI Discovery & Agent Readiness

**Score:** 22/22 checks passed

- ✅ llms.txt exists and exceeds 1KB
- ✅ llms.txt declares AI Grounding FAQ & Knowledge Base
- ✅ llms-full.txt exists and exceeds 2KB
- ✅ llms-full.txt declares AI Grounding FAQ & Knowledge Base
- ✅ ai.txt discovery file exists
- ✅ auth.md service documentation exists
- ✅ Root index.md provides comprehensive executive profile for AI agents (>3KB)
- ✅ .well-known/mcp.json exists and valid MCP schema
- ✅ .well-known/api-catalog exists and conforms to RFC 9264 linkset
- ✅ .well-known/oauth-protected-resource exists
- ✅ .well-known/oauth-authorization-server exists
- ✅ .well-known/openid-configuration exists
- ✅ HTTP header advertises Content-Signal protocol
- ✅ HTTP Link header advertises /llms.txt discovery
- ✅ HTTP Link header advertises .well-known/mcp.json
- ✅ HTTP Link header advertises .well-known/api-catalog
- ✅ Netlify Edge Function configured for markdown-negotiation
- ✅ HTML declares ai-agent policy meta tag
- ✅ HTML declares content-signal meta tag
- ✅ HTML links /llms.txt via rel="describedby"
- ✅ HTML links MCP descriptor via rel="mcp"
- ✅ All 23 canonical routes have corresponding index.md mirrors (0 missing)

---

## 3. URL & Route Reconciliation Summary

| Metric | Measured Count | Source Reference |
|---|---|---|
| **Repository Content Source Files** | 22 Markdown files | `content/**/*.md` (4 root + 8 posts + 10 policies) |
| **Astro Page Source Templates** | 24 pages/endpoints | `src/pages/**/*.{astro,ts}` |
| **Canonical Content Routes** | 23 routes | 22 Markdown-backed + 1 Homepage (`/`) |
| **XML Sitemap Published Routes** | 23 routes | `dist/sitemap.xml` (100% parity with canonical routes) |
| **Generated HTML Documents** | 28 files | 23 canonical + 3 aliases + 1 error (`404.html`) + 1 preview (`design-preview/`) |
| **Live Crawl Hyperlink Validations** | 28 HTML files, 903 internal links | Verified in `tests/verify-links.js` (0 broken links, 100% resolution) |
| **Negotiated Markdown Mirrors** | 24 files | 23 content `index.md` mirrors + 1 static `/auth.md` |
| **Machine Discovery Endpoints** | 13 endpoints | `llms.txt`, `llms-full.txt`, `ai.txt`, `robots.txt`, `.well-known/*` |
| **Syndication & Feeds** | 4 endpoints | `/sitemap.xml`, `/index.xml`, `/index.json`, `/feed.json` |
| **Static Downloadable Documents** | 1 file | `/resume.pdf` |
| **Static UI Assets** | 17 files | Favicons, manifests, avatars, CSS bundles, JS utilities |
| **Total Published Artifacts in `dist/`** | 86 files | `find dist -type f` |
| **Total Tracked Inventory Items** | 87 items | Verified in `website-inventory.csv` (includes Netlify redirect) |

---

## 4. Operational Commands

Run the audit engine locally at any time:

```bash
# Full continuous audit
npm run audit

# Targeted domain audits
npm run audit:health    # Route parity, link crawler, static assets, 404
npm run audit:seo       # Robots, sitemaps, feeds, meta tags, schema JSON-LD
npm run audit:a11y      # Landmark hierarchy, alt tags, reduced motion, contrast
npm run audit:perf      # CSS/JS budgets, zero runtime hydration check
npm run audit:security  # Netlify headers, private repo leak prevention
npm run audit:ai        # LLMs manifests, MCP descriptor, markdown mirrors
```
