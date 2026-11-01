# Repository Audit Baseline (1 November 2026)

Comprehensive execution log for Phase 1, Task 1.2 across all 14 repository test and audit commands.

| Command | Status | Exit Code | Duration (ms) |
|---|:---:|:---:|---:|
| `npm run check` | ✅ PASS | 0 | 550 |
| `npm run build:astro` | ✅ PASS | 0 | 1535 |
| `npm test` | ✅ PASS | 0 | 1159 |
| `npm run test:dist` | ✅ PASS | 0 | 566 |
| `npm run test:regression` | ✅ PASS | 0 | 966 |
| `npm run test:visual` | ✅ PASS | 0 | 301 |
| `npm run test:perf` | ✅ PASS | 0 | 1198 |
| `npm run audit` | ✅ PASS | 0 | 321 |
| `npm run audit:health` | ✅ PASS | 0 | 305 |
| `npm run audit:seo` | ✅ PASS | 0 | 285 |
| `npm run audit:a11y` | ✅ PASS | 0 | 291 |
| `npm run audit:perf` | ✅ PASS | 0 | 298 |
| `npm run audit:security` | ✅ PASS | 0 | 291 |
| `npm run audit:ai` | ✅ PASS | 0 | 287 |

---

## Execution Details & Command Outputs

### `npm run check` (✅ PASS)

- **Exit Code:** 0
- **Duration:** 550ms

```text
> deardhruv.com@2.0.0 check
> tsc --noEmit
```

### `npm run build:astro` (✅ PASS)

- **Exit Code:** 0
- **Duration:** 1535ms

```text
> deardhruv.com@2.0.0 build:astro
> astro build

22:18:01 [content] Syncing content
22:18:01 [content] Synced content
22:18:01 [types] Generated 233ms
22:18:01 [build] output: "static"
22:18:01 [build] mode: "static"
22:18:01 [build] directory: /Users/deardhruv/Dhruv/work/dhruv/dhruv-git/deardhruv.com/dist/
22:18:01 [build] Collecting build info...
22:18:01 [build] ✓ Completed in 244ms.
22:18:01 [build] Building static entrypoints...
22:18:02 [vite] ✓ built in 104ms
22:18:02 [vite] ✓ built in 15ms
22:18:02 [build] Rearranging server assets...

 generating static routes 
22:18:02   ├─ /404.html (+5ms) 
22:18:02   ├─ /about/index.html (+1ms) 
22:18:02   ├─ /about-hugo/index.html (+1ms) 
22:18:02   ├─ /about-us/index.html (+1ms) 
22:18:02   ├─ /contact/index.html (+1ms) 
22:18:02   ├─ /index.json (+1ms) 
22:18:02   ├─ /index.md (+1ms) 
22:18:02   ├─ /index.xml (+1ms) 
22:18:02   ├─ /other/index.html (+1ms) 
22:18:02   ├─ /other/ai-playground/index.html (+1ms) 
22:18:02   ├─ /other/ai-play
... [truncated for baseline report]
```

### `npm test` (✅ PASS)

- **Exit Code:** 0
- **Duration:** 1159ms

```text
> deardhruv.com@2.0.0 test
> node scripts/verify-routes.js && node tests/verify-assets.js && node tests/verify-links.js && node tests/verify-edge-functions.js && node tests/verify-contrast.js && node tests/verify-a11y-tokens.js && node tests/verify-content-loader.js && node tests/verify-seo-metadata.js && node tests/verify-interactive-containers.js

🔍 Verifying 39 legacy routes against /Users/deardhruv/Dhruv/work/dhruv/dhruv-git/deardhruv.com/dist...

  ✅ [HTML] / -> OK
  ✅ [HTML] /about/ -> OK
  ✅ [ALIAS] /about-us/ -> OK
  ✅ [ALIAS] /about-hugo/ -> OK
  ✅ [ALIAS] /contact/ -> OK
  ✅ [HTML] /portfolio/ -> OK
  ✅ [HTML] /projects/ -> OK
  ✅ [HTML] /posts/ -> OK
  ✅ [HTML] /posts/ai_playground_series/ -> OK
  ✅ [HTML] /posts/ai_playground_series/01-i-wanted-the-model-to-stay-on-the-phone/ -> OK
  ✅ [HTML] /posts/ai_playground_series/02-the-day-a-chat-box-became-a-document-engine/ -> OK
  ✅ [HTML] /posts/ai_playground_series/03-the-model-was-fine-the-phone-wasnt/ -> OK
  ✅ [HTML] /posts
... [truncated for baseline report]
```

### `npm run test:dist` (✅ PASS)

- **Exit Code:** 0
- **Duration:** 566ms

```text
> deardhruv.com@2.0.0 test:dist
> PUBLIC_DIR=dist node scripts/verify-routes.js && PUBLIC_DIR=dist node tests/verify-assets.js && PUBLIC_DIR=dist node tests/verify-links.js && PUBLIC_DIR=dist node tests/verify-edge-functions.js

🔍 Verifying 39 legacy routes against /Users/deardhruv/Dhruv/work/dhruv/dhruv-git/deardhruv.com/dist...

  ✅ [HTML] / -> OK
  ✅ [HTML] /about/ -> OK
  ✅ [ALIAS] /about-us/ -> OK
  ✅ [ALIAS] /about-hugo/ -> OK
  ✅ [ALIAS] /contact/ -> OK
  ✅ [HTML] /portfolio/ -> OK
  ✅ [HTML] /projects/ -> OK
  ✅ [HTML] /posts/ -> OK
  ✅ [HTML] /posts/ai_playground_series/ -> OK
  ✅ [HTML] /posts/ai_playground_series/01-i-wanted-the-model-to-stay-on-the-phone/ -> OK
  ✅ [HTML] /posts/ai_playground_series/02-the-day-a-chat-box-became-a-document-engine/ -> OK
  ✅ [HTML] /posts/ai_playground_series/03-the-model-was-fine-the-phone-wasnt/ -> OK
  ✅ [HTML] /posts/ai_playground_series/04-i-put-an-image-generator-inside-the-phone/ -> OK
  ✅ [HTML] /posts/ai_playground_series/05-at-some
... [truncated for baseline report]
```

### `npm run test:regression` (✅ PASS)

- **Exit Code:** 0
- **Duration:** 966ms

```text
> deardhruv.com@2.0.0 test:regression
> node tests/verify-complete-regression.js

🚀 Running Complete Route and Content Regression Gate against dist/...


==================================================
▶ Running Suite: Legacy Routes Parity (39/39)
==================================================
🔍 Verifying 39 legacy routes against /Users/deardhruv/Dhruv/work/dhruv/dhruv-git/deardhruv.com/dist...

  ✅ [HTML] / -> OK
  ✅ [HTML] /about/ -> OK
  ✅ [ALIAS] /about-us/ -> OK
  ✅ [ALIAS] /about-hugo/ -> OK
  ✅ [ALIAS] /contact/ -> OK
  ✅ [HTML] /portfolio/ -> OK
  ✅ [HTML] /projects/ -> OK
  ✅ [HTML] /posts/ -> OK
  ✅ [HTML] /posts/ai_playground_series/ -> OK
  ✅ [HTML] /posts/ai_playground_series/01-i-wanted-the-model-to-stay-on-the-phone/ -> OK
  ✅ [HTML] /posts/ai_playground_series/02-the-day-a-chat-box-became-a-document-engine/ -> OK
  ✅ [HTML] /posts/ai_playground_series/03-the-model-was-fine-the-phone-wasnt/ -> OK
  ✅ [HTML] /posts/ai_playground_series/04-i-put-an-image-generator
... [truncated for baseline report]
```

### `npm run test:visual` (✅ PASS)

- **Exit Code:** 0
- **Duration:** 301ms

```text
> deardhruv.com@2.0.0 test:visual
> node tests/verify-visual-regression.js

🔍 Auditing Visual Regression & Responsive Matrix across 6 viewports...

--- Viewport Coverage Matrix ---
  ✅ Viewport mobile-narrow (320x568) configured in test matrix
  ✅ Viewport mobile-standard (390x844) configured in test matrix
  ✅ Viewport tablet-portrait (768x1024) configured in test matrix
  ✅ Viewport tablet-landscape (1024x768) configured in test matrix
  ✅ Viewport desktop (1440x900) configured in test matrix
  ✅ Viewport desktop-wide (1920x1080) configured in test matrix

--- Page Outline & Visual Landmarks ---
  ✅ Home (index.html) exists in dist/
  ✅ Home has exactly 1 <h1> tag (found: 1)
  ✅ Home includes main landmark (<main id="main">)
  ✅ Home includes accessible skip link
  ✅ Home includes accessible site header
  ✅ Home includes accessible site footer
  ✅ Home includes interactive theme toggle
  ✅ Home contains responsive viewport meta
  ✅ Home links /css/design-system.css
  ✅ Home links /c
... [truncated for baseline report]
```

### `npm run test:perf` (✅ PASS)

- **Exit Code:** 0
- **Duration:** 1198ms

```text
> deardhruv.com@2.0.0 test:perf
> node tests/verify-performance-budgets.js

🔍 Auditing Performance Budgets & Client Runtime Metrics...

--- Build Duration Benchmark ---
  ✅ Astro full static build completed in 904ms (budget < 3500ms)

--- CSS Performance Budget ---
     components.css: 19.68 KB
     design-system.css: 8.33 KB
     layout.css: 2.66 KB
     nav.css: 9.06 KB
     typography.css: 3.59 KB
  ✅ Total uncompressed CSS is 43.32 KB (budget < 45 KB)

--- Client JS Zero-Framework Guarantee ---
  ✅ Zero client hydration runtime bundles generated in _astro/
     theme-init.js: 0.91 KB
     theme-toggle.js: 3.53 KB
  ✅ Total client JS footprint is 4.44 KB (budget < 5 KB)

========================================
Performance Budget Audit: 4 passed, 0 failed
========================================

🎉 100% Performance budgets verified!
```

### `npm run audit` (✅ PASS)

- **Exit Code:** 0
- **Duration:** 321ms

```text
> deardhruv.com@2.0.0 audit
> node scripts/audit.js

[1m[35m======================================================[0m
[1m[35m     DEARDHRUV.COM — CONTINUOUS AUDIT ENGINE          [0m
[1m[35m======================================================[0m
[2mTarget: /Users/deardhruv/Dhruv/work/dhruv/dhruv-git/deardhruv.com/dist[0m
[2mTime:   2026-11-01T16:48:06.575Z[0m

[36m[1m=== 1. SITE HEALTH, ROUTE PARITY & ASSETS ===[0m
  [32m✓[0m Static output directory (dist/) exists
  [32m✓[0m Route parity: [HTML] /
  [32m✓[0m Route parity: [HTML] /about/
  [32m✓[0m Route parity: [ALIAS] /about-us/
  [32m✓[0m Route parity: [ALIAS] /about-hugo/
  [32m✓[0m Route parity: [ALIAS] /contact/
  [32m✓[0m Route parity: [HTML] /portfolio/
  [32m✓[0m Route parity: [HTML] /projects/
  [32m✓[0m Route parity: [HTML] /posts/
  [32m✓[0m Route parity: [HTML] /posts/ai_playground_series/
  [32m✓[0m Route parity: [HTML] /posts/ai_playground_series/01-i-wanted-the-model-to-stay-on-the
... [truncated for baseline report]
```

### `npm run audit:health` (✅ PASS)

- **Exit Code:** 0
- **Duration:** 305ms

```text
> deardhruv.com@2.0.0 audit:health
> node scripts/audit.js --health

[1m[35m======================================================[0m
[1m[35m     DEARDHRUV.COM — CONTINUOUS AUDIT ENGINE          [0m
[1m[35m======================================================[0m
[2mTarget: /Users/deardhruv/Dhruv/work/dhruv/dhruv-git/deardhruv.com/dist[0m
[2mTime:   2026-11-01T16:48:06.901Z[0m

[36m[1m=== 1. SITE HEALTH, ROUTE PARITY & ASSETS ===[0m
  [32m✓[0m Static output directory (dist/) exists
  [32m✓[0m Route parity: [HTML] /
  [32m✓[0m Route parity: [HTML] /about/
  [32m✓[0m Route parity: [ALIAS] /about-us/
  [32m✓[0m Route parity: [ALIAS] /about-hugo/
  [32m✓[0m Route parity: [ALIAS] /contact/
  [32m✓[0m Route parity: [HTML] /portfolio/
  [32m✓[0m Route parity: [HTML] /projects/
  [32m✓[0m Route parity: [HTML] /posts/
  [32m✓[0m Route parity: [HTML] /posts/ai_playground_series/
  [32m✓[0m Route parity: [HTML] /posts/ai_playground_series/01-i-wanted-the-mode
... [truncated for baseline report]
```

### `npm run audit:seo` (✅ PASS)

- **Exit Code:** 0
- **Duration:** 285ms

```text
> deardhruv.com@2.0.0 audit:seo
> node scripts/audit.js --seo

[1m[35m======================================================[0m
[1m[35m     DEARDHRUV.COM — CONTINUOUS AUDIT ENGINE          [0m
[1m[35m======================================================[0m
[2mTarget: /Users/deardhruv/Dhruv/work/dhruv/dhruv-git/deardhruv.com/dist[0m
[2mTime:   2026-11-01T16:48:07.194Z[0m

[36m[1m=== 2. SEO, METADATA, SOCIAL CARDS & SITEMAP ===[0m
  [32m✓[0m robots.txt exists in dist/
  [32m✓[0m robots.txt declares policies for Googlebot and Bingbot
  [32m✓[0m robots.txt welcomes major AI crawlers
  [32m✓[0m robots.txt restricts aggressive scraper bots
  [32m✓[0m robots.txt references canonical XML sitemap
  [32m✓[0m robots.txt references llms.txt discovery endpoint
  [32m✓[0m robots.txt declares Content-Signals protocol
  [32m✓[0m sitemap.xml exists in dist/
  [32m✓[0m sitemap.xml has valid XML schema
  [32m✓[0m sitemap.xml prioritizes homepage with 1.0
  [32m✓[0m 
... [truncated for baseline report]
```

### `npm run audit:a11y` (✅ PASS)

- **Exit Code:** 0
- **Duration:** 291ms

```text
> deardhruv.com@2.0.0 audit:a11y
> node scripts/audit.js --a11y

[1m[35m======================================================[0m
[1m[35m     DEARDHRUV.COM — CONTINUOUS AUDIT ENGINE          [0m
[1m[35m======================================================[0m
[2mTarget: /Users/deardhruv/Dhruv/work/dhruv/dhruv-git/deardhruv.com/dist[0m
[2mTime:   2026-11-01T16:48:07.482Z[0m

[36m[1m=== 3. ACCESSIBILITY, LANDMARKS & DESIGN TOKENS ===[0m
  [32m✓[0m All HTML documents have valid DOCTYPE declaration
  [32m✓[0m All HTML documents specify lang="en" on root html element
  [32m✓[0m All HTML documents declare responsive meta viewport
  [32m✓[0m All content pages implement accessible <main id="main"> landmark
  [32m✓[0m All content pages implement skip-to-content link (href="#main")
  [32m✓[0m All content pages contain an accessible <h1> document heading
  [32m✓[0m All images specify alt text attributes (0 missing)
  [32m✓[0m design-system.css exists in dist/css/
 
... [truncated for baseline report]
```

### `npm run audit:perf` (✅ PASS)

- **Exit Code:** 0
- **Duration:** 298ms

```text
> deardhruv.com@2.0.0 audit:perf
> node scripts/audit.js --perf

[1m[35m======================================================[0m
[1m[35m     DEARDHRUV.COM — CONTINUOUS AUDIT ENGINE          [0m
[1m[35m======================================================[0m
[2mTarget: /Users/deardhruv/Dhruv/work/dhruv/dhruv-git/deardhruv.com/dist[0m
[2mTime:   2026-11-01T16:48:07.782Z[0m

[36m[1m=== 4. PERFORMANCE BUDGETS & RUNTIME FOOTPRINT ===[0m
  [32m✓[0m Total uncompressed CSS is within budget (43.32 KB < 45.0 KB)
  [32m✓[0m Total uncompressed Client JS is within budget (4.44 KB < 5.0 KB)
  [32m✓[0m Zero runtime client hydration bundles generated (0 found)
  [32m✓[0m Maximum HTML page size within budget (77.14 KB for posts/ai_playground_series/05-at-some-point-i-stopped-building-a-chat-app/index.html < 100 KB)
  [32m✓[0m Static assets configured with 1-year immutable caching in netlify.toml
  [32m✓[0m Icons configured with 30-day caching in netlify.toml

[1m[35m====
... [truncated for baseline report]
```

### `npm run audit:security` (✅ PASS)

- **Exit Code:** 0
- **Duration:** 291ms

```text
> deardhruv.com@2.0.0 audit:security
> node scripts/audit.js --security

[1m[35m======================================================[0m
[1m[35m     DEARDHRUV.COM — CONTINUOUS AUDIT ENGINE          [0m
[1m[35m======================================================[0m
[2mTarget: /Users/deardhruv/Dhruv/work/dhruv/dhruv-git/deardhruv.com/dist[0m
[2mTime:   2026-11-01T16:48:08.068Z[0m

[36m[1m=== 5. SECURITY HEADERS, LEAK PREVENTION & POLICIES ===[0m
  [32m✓[0m HTTP Header: X-Frame-Options set to DENY
  [32m✓[0m HTTP Header: X-Content-Type-Options set to nosniff
  [32m✓[0m HTTP Header: Referrer-Policy configured
  [32m✓[0m HTTP Header: HSTS enabled with preload
  [32m✓[0m HTTP Header: Content-Security-Policy strictly configured
  [32m✓[0m HTTP Header: Permissions-Policy restricts sensitive device APIs
  [32m✓[0m Zero private repository links leaked across dist/ (0 leaks)
  [32m✓[0m External target="_blank" links implement rel="noopener" (0 unprotected)
  [3
... [truncated for baseline report]
```

### `npm run audit:ai` (✅ PASS)

- **Exit Code:** 0
- **Duration:** 287ms

```text
> deardhruv.com@2.0.0 audit:ai
> node scripts/audit.js --ai

[1m[35m======================================================[0m
[1m[35m     DEARDHRUV.COM — CONTINUOUS AUDIT ENGINE          [0m
[1m[35m======================================================[0m
[2mTarget: /Users/deardhruv/Dhruv/work/dhruv/dhruv-git/deardhruv.com/dist[0m
[2mTime:   2026-11-01T16:48:08.361Z[0m

[36m[1m=== 6. AI DISCOVERY, PROTOCOL ENDPOINTS & CONTENT NEGOTIATION ===[0m
  [32m✓[0m llms.txt exists and exceeds 1KB
  [32m✓[0m llms-full.txt exists and exceeds 2KB
  [32m✓[0m ai.txt discovery file exists
  [32m✓[0m auth.md service documentation exists
  [32m✓[0m .well-known/mcp.json exists and valid MCP schema
  [32m✓[0m .well-known/api-catalog exists and conforms to RFC 9264 linkset
  [32m✓[0m .well-known/oauth-protected-resource exists
  [32m✓[0m .well-known/oauth-authorization-server exists
  [32m✓[0m .well-known/openid-configuration exists
  [32m✓[0m HTTP Link header advertises
... [truncated for baseline report]
```
