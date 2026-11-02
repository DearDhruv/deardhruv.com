# AI Agent Engineering Rules & Operating Contract

> **Scope**: Mandatory for all AI coding agents, autonomous subagents, and human contributors working in `deardhruv.com`.  
> **Authority**: Binding and permanent. Overrides default agent heuristics, generic templates, and unverified assumptions.  
> **Instruction**: Read this file completely before planning, editing, or validating any code or content in this repository.

---

## 1. Core Architecture & Non-Negotiable Budgets

Every change must strictly preserve the static, zero-framework, high-performance architecture:

* **Static Site Engine**: Astro static site generation (`output: 'static'`, directory build format). All canonical pages pre-render pure static HTML, JSON, and Markdown in `dist/`.
* **Zero-Framework Runtime Guarantee**: Strictly **0 KB** client hydration frameworks (no React, Vue, Svelte, Preact, or Astro island runtime scripts). Zero client hydration bundles allowed in `dist/_astro/`.
* **Client JavaScript Budget**: Total uncompressed client JS must remain **< 5.0 KB** (5,120 bytes) across all pages. Currently allocated to `theme-init.js` (~0.98 KB) and `theme-toggle.js` (~3.53 KB).
* **Uncompressed CSS Budget**: Total uncompressed CSS across all 5 stylesheet modules (`design-system.css`, `layout.css`, `typography.css`, `components.css`, `nav.css`) must remain **< 45.0 KB** (46,080 bytes).
* **Maximum HTML Document Budget**: No pre-rendered HTML document may exceed **100.0 KB** uncompressed.
* **Build Duration Benchmark**: Full production static compilation (`npm run build:astro`) must complete in **< 3,500ms**.

---

## 2. Content, Voice & Verified Facts Ledger

All content, metadata, and structured data must align with the verified facts ledger:

* **Professional Identity**: Dhruv Patel (@DearDhruv) — Lead Android Engineer, Android Architect, and Android Artist.
* **Total Industry Experience**: Strictly **15+ years** across website copy, bio snippets, schema graphs, and AI discovery feeds (started professionally in Jan 2012; 2010 techfest design award). Never revert to 12+, 13+, or 14+ years.
* **Verified Work History**:
  * **IMPACT Commerce**: Lead Android Engineer (Feb 2022 – Present). In-store touch displays, retail hardware abstraction layers (HAL), POSIX sandboxing, Jetpack Compose, Kotlin Multiplatform.
  * **PLANOLY**: Senior Android Developer (Nov 2018 – Feb 2022). High-throughput video transcode pipelines, hardware-accelerated MediaCodec/FFmpeg, custom canvas editor.
  * **Ashapura Softech Inc**: Tech Lead / Android Engineer (Jun 2016 – Oct 2018). Architecture lead for enterprise client applications.
  * **Russmedia Tech**: Team Lead / Senior Android Developer (Feb 2014 – Jun 2016). Android team leadership across European classifieds apps.
  * **Hidden Brains InfoTech**: Junior Android Developer (Jan 2012 – Dec 2013). Native Android SDK apps.
* **Employer Separation & Attribution**: Strict architectural separation between **Independent Products** (AI Playground, VelociHue, Open Store) and **Selected Work by Employer**. Employer projects MUST include visible "Worked at [Employer]" attribution footers (`.work-attribution`).
* **Author Voice**: Authentic, first-person ("I built", "I learned", "I chose"), calm, direct, observant, and grounded in technical trade-offs (memory limits, LMK, Vulkan driver crashes).
* **Banned AI Buzzwords**: NEVER use generic marketing fluff:
  * ❌ "pushing the boundaries", "cutting-edge solutions", "revolutionizing the industry"
  * ❌ "passionate about innovation", "leveraging the power of", "seamlessly integrates"
  * ❌ "robust and scalable", "state-of-the-art", "testament to", "delve", "unlocking the potential"
  * ❌ "where technology meets innovation", "in today's fast-paced digital world"
* **Canonical URLs & Social Links**:
  * Google Play Developer: `https://play.google.com/store/apps/dev?id=5177092407740817842` (canonical format only).
  * GitHub: `https://github.com/DearDhruv`
  * LinkedIn: `https://www.linkedin.com/in/deardhruv/`
  * X (Twitter): `https://x.com/DearDhruv`
  * Deprecated platforms (e.g. Dribbble) are permanently removed; do not re-introduce them.

---

## 3. Design System, Touch Containment & UI/UX Standards

* **Default Palette**: Warm Editorial Amber (`data-palette="amber"` on root `<html>`).
* **Supported Engineering Palettes**: Exactly 4 WCAG 2.2 AA compliant palettes:
  1. `cyan` (Precision Cyan)
  2. `emerald` (Terminal Emerald)
  3. `amber` (Warm Editorial Amber — Default)
  4. `indigo` (Electric Indigo)
* **Contrast Compliance**: WCAG 2.2 AA SC 1.4.3 text contrast &ge; 4.5:1 (Dark mode primary body &ge; 17:1; Light mode &ge; 16:1). Non-text UI controls &ge; 3.0:1.
* **Minimum Touch Target**: All interactive buttons, icon toggles, and nav links MUST maintain &ge; **44&times;44px** bounding box (`min-width: 44px; min-height: 44px;`).
* **Touch Effect & Shape Containment Guardrails**:
  * All buttons (`.btn`, `.header-icon-btn`, `.header-resume-btn`), cards (`.card`, `.card-interactive`), chips (`.chip`), tags (`.tag`), badges (`.badge`), and capsule overlays (`.palette-switcher-bar`) MUST declare `overflow: hidden;` and explicit `border-radius`.
  * Cards and buttons MUST declare `isolation: isolate;` to prevent active transforms and ripples from bleeding past rounded corners.
  * Stretched link overlays (`.card-stretched-link::after`) and container pseudo-elements (`.card::before`) MUST inherit container border-radii (`border-radius: inherit;`).
  * Root design system and interactive components MUST declare `-webkit-tap-highlight-color: transparent;` to prevent native mobile square tap highlight rectangles from bleeding outside rounded elements.
* **Button Spacing & Padding**:
  * Internal padding: `var(--space-2) var(--space-4)` (8px 16px).
  * External button group gap: `gap: var(--space-3)` (12px) desktop; `gap: var(--space-2)` (8px) mobile (&le;768px).
  * Icon placement: Prefix placement (icon appears before label).
* **Reduced Motion**: Strict `@media (prefers-reduced-motion: reduce)` rules neutralizing all transitions, transforms, and scroll animations (`animation: none !important; transition: none !important;`).

---

## 4. W3C HTML & Heading Hierarchy Standards

* **Single `<h1>` Landmark**: Every document must contain exactly one `<h1>` heading matching the canonical page title.
* **Strict Sequential Progression**: Heading levels MUST NOT skip steps (e.g. `h1 -> h2 -> h3 -> h4`). Never demote an `h2` directly to an `h4`.
* **Image Accessibility**: 100% of images must have meaningful, non-empty `alt` attributes.
* **Unique IDs**: Zero duplicate DOM IDs across any page.
* **Nesting Integrity**: Never nest interactive elements (`<a>` inside `<a>`, or `<button>` inside `<button>`). Use `.card-stretched-link` for full-card clickability.

---

## 5. SEO, AI Protocols & Machine Discovery

* **39 Legacy Routes Parity**: All 39 historical routes defined in `tests/fixtures/legacy-routes.json` must continue resolving with 100% pass rate.
* **Twin Markdown Mirrors**: Every canonical route MUST emit a pre-rendered static `index.md` alongside `index.html` (e.g., `/portfolio/` has `/portfolio/index.md`).
* **Netlify Edge Markdown Negotiation**: Edge function `netlify/edge-functions/markdown-negotiation.ts` inspects incoming `Accept` headers. If `text/markdown` is prioritized over `text/html`, it rewrites to the corresponding `index.md` with headers:
  * `content-type: text/markdown; charset=utf-8`
  * `x-agent-ready: true`
* **Machine Discovery Feeds**:
  * `/llms.txt` and `/llms-full.txt` (structured AI grounding knowledge base).
  * `/.well-known/mcp.json` (Model Context Protocol endpoint).
  * `/.well-known/api-catalog` (RFC 9264 API catalog).
  * `/.well-known/oauth-protected-resource`, `oauth-authorization-server`, `openid-configuration`.
* **Structured Data (JSON-LD)**: Every page MUST emit a Schema.org `@graph` linking `Person` (`#person`), `WebSite` (`#website`), `BreadcrumbList`, and specific page entities (`ProfilePage`, `TechArticle`, `SoftwareApplication`).

---

## 6. Security, Privacy & Edge Infrastructure

* **Strict Content Security Policy (CSP)**:
  `default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; img-src 'self' data:; connect-src 'self' https://cdn.jsdelivr.net; font-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; upgrade-insecure-requests;`
* **Zero Third-Party Trackers**: Zero tracking cookies, zero Google Analytics, zero Facebook Pixels, zero third-party telemetry.
* **Browser Isolation**: `Cross-Origin-Opener-Policy: same-origin`, `Cross-Origin-Resource-Policy: same-origin`, `X-Permitted-Cross-Domain-Policies: none`.
* **Storage Sandboxing**: All `localStorage` accesses in client scripts (`theme-init.js`, `theme-toggle.js`, inline layout scripts) MUST be wrapped in defensive try/catch blocks with fallback stubs for strict private browsing modes.
* **Cache Controls**:
  * Static HTML pages: `Cache-Control: public, max-age=0, must-revalidate`
  * Hashed assets (`/_astro/*`, `/images/*`, `/pp/*`): `Cache-Control: public, max-age=31536000, immutable`
  * PDF resume: `Cache-Control: public, max-age=604800`
* **404 Routing**: Explicit fallback redirect `from = "/*" to = "/404.html" status = 404` in `netlify.toml`.

---

## 7. Mandatory Quality & Verification Pipeline

Before claiming any task is complete, committing changes, or submitting a release, **every AI agent must execute and pass the following quality gate suite**:

```bash
# 1. Strict TypeScript type check (0 errors)
npm run check

# 2. Production static Astro build (all pages compile < 3500ms)
npm run build:astro

# 3. Complete regression suite (10 test suites pass 100%)
npm test

# 4. W3C / WCAG HTML standards validation (single H1, strict heading levels, zero duplicates)
npm run quality:html

# 5. 25-Breakpoint responsive viewport sweep (320px to 3840px, zero horizontal overflow)
npm run quality:browser

# 6. Performance budget & zero-hydration verification (CSS < 45KB, JS < 5KB)
npm run test:perf

# 7. 17-Stage release candidate pipeline
npm run quality:release

# 8. Continuous site health, SEO, accessibility, security, and AI audit (176 checks pass 100%)
node scripts/audit.js
```

### Gate Failure Policy
If any assertion fails:
1. Do NOT suppress or weaken the test assertion.
2. Fix the underlying root cause in source templates, stylesheets, or markdown content.
3. Re-run the full pipeline until all gates pass green.
