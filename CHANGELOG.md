# Changelog

All notable changes to the **deardhruv.com** platform and portfolio are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.1.0] - 2026-11-02

### Architecture & Framework
* **Astro Static Architecture**: Fully migrated from Hugo to Astro static site generation, producing pre-rendered, static HTML and JSON artifacts in `dist/`.
* **Zero-Framework Client Footprint**: Completely eliminated client-side hydration framework bundles (0 KB React/Vue/Svelte/Astro hydration). Total client JavaScript runtime footprint is bounded to ~4.36 KB (theme persistence, palette switching, and accessible mobile drawer).
* **Netlify Edge Function Markdown Negotiation**: Deployed `markdown-negotiation.ts` edge middleware supporting RFC-compliant content negotiation (`Accept: text/markdown`) with `x-agent-ready: true` headers across all canonical pages.
* **Build Speed Benchmark**: Full static build compiles 27 static pages and assets in ~425ms (well within the < 3,500ms budget).

### Design System & Visual Polish
* **Precision Technical Editorial Design System**: Implemented a cohesive design token architecture with fluid clamp scales, modular spacing, and clean surface elevations.
* **Warm Editorial Amber as Primary Palette**: Set Warm Editorial Amber as the default palette across root CSS, light mode, and client initialization.
* **Dynamic Palette Switcher**: Real-time switching between 4 WCAG 2.2 AA compliant engineering palettes: Precision Cyan, Terminal Emerald, Warm Editorial Amber, and Electric Indigo.
* **Dynamic Theme-Adaptive Code & Text Blocks**: Configured Astro Shiki to use semantic CSS variables (`theme: 'css-variables'`). Code syntax highlights, callouts, blockquotes, and Markdown tables adapt instantly to dark/light theme toggles and palette changes without page reloads.
* **Theme-Reactive Mermaid Flowcharts**: Embedded Mermaid architectural diagrams that dynamically re-render on theme/palette changes.
* **Button Padding & Margin Unification**: Standardized inner padding (`var(--space-2) var(--space-4)` / 8px 16px), external cluster margins (`gap: var(--space-3)` / 12px), icon gaps (8px), typography (sans-serif, 14px, 550 weight), and hover lift (`translateY(-2px)`) across all buttons, including topbar action buttons.
* **Modern Architectural 'DD' Brand Suite**: Deployed modern monochrome architectural 'DD' SVG, ICO, and PNG touch icon suites (`favicon.svg`, `favicon-32x32.png`, `apple-touch-icon.png`).

### Navigation & UX
* **Anchor-Positioned Mobile Navigation**: Anchored the mobile navigation menu strictly to the topbar burger icon with a floating caret indicator and soft backdrop blur overlay (`backdrop-filter: blur(8px)`).
* **Touch Target & Accessibility Compliance**: All interactive buttons and toggles enforce WCAG 2.2 AA SC 2.5.8 minimum touch targets (&ge; 44&times;44px), unclipped 2px `:focus-visible` rings, and full `prefers-reduced-motion` neutralization.
* **Résumé Download Actions**: Restored standard download tray SVG icons on both topbar and hero résumé buttons.
* **Icon-Only Theme Toggle**: Streamlined the theme toggle button to display only the high-contrast sun/moon SVG icon without cramped text labels.

### Legal & Policies Hub
* **Central Directory (`/other/`)**: Created a dedicated, comprehensive Legal & Policies hub detailing local-first, privacy-by-design, and zero-telemetry architectural principles.
* **Application Policies & Terms**: Integrated complete Privacy Policies and Terms of Service for published applications and games:
  * **AI Playground**: Local on-device AI inference privacy policy and open weights licensing terms.
  * **Open Store**: Package distribution privacy disclosure and open-source terms.
  * **VelociHue**: Arcade game telemetry, Google Play Games integration, and fair play terms.
  * **Website Privacy (`deardhruv.com`)**: Disclosures certifying zero tracking cookies, zero third-party analytics, and encrypted static edge delivery.
* **Sub-Document Navigation**: Added breadcrumb navigation (`← Back to Legal & Policies`) and inquiry footers across all legal document pages.

### SEO, AI Discovery & Knowledge Graph
* **Comprehensive AI Grounding Datasets**: Expanded `/llms.txt`, `/llms-full.txt`, and root `/index.md` with complete technical FAQs, architecture deep dives, verified outcomes, and hiring manager Q&A.
* **RFC 9264 API Catalog & MCP Server**: Deployed machine discovery endpoints at `/.well-known/api-catalog` and `/.well-known/mcp.json` declaring AI agent capabilities and tools.
* **JSON-LD Entity Graph**: Structured data on all pages linking `Person` (`@DearDhruv`), `WebSite`, `TechArticle`, and `SoftwareApplication` schemas.
* **15+ Years Industry Experience Synchronization**: Updated total engineering experience claims across website copy, structured schemas, and AI discovery feeds.
* **Social Profiles Hygiene**: Removed deprecated Dribbble references and updated Google Play Developer Console links to the canonical dev ID URL (`id=5177092407740817842`).

### Security & Release Hardening
* **Zero-Leak Content Security Policy (CSP)**: Purged legacy/unused origins (`google-analytics.com`, `googletagmanager.com`, `cdnjs.cloudflare.com`) aligning directly with zero-cookie/zero-telemetry guarantees. Added strict defense-in-depth directives: `object-src 'none'`, `base-uri 'self'`, `frame-ancestors 'none'`, `form-action 'self'`, and `upgrade-insecure-requests`.
* **Cross-Origin Isolation & Defense**: Configured `Cross-Origin-Opener-Policy: same-origin`, `Cross-Origin-Resource-Policy: same-origin`, and `X-Permitted-Cross-Domain-Policies: none`.
* **Edge Function Defense-in-Depth**: Hardened Netlify edge function with path traversal rejection (`..`), null byte filtering (`\0`), malformed Accept header resilience, and graceful rewrite failure fallbacks.
* **Storage Sandbox Hardening**: Protected client theme initialization scripts (`theme-init.js`, `theme-toggle.js`, inline layout script) with defensive in-memory storage fallbacks for privacy-hardened browsers and sandboxed webviews where `localStorage` access throws.
* **HTML Cache-Control & 404 Routing**: Enforced `Cache-Control: public, max-age=0, must-revalidate` for HTML routes and added explicit 404 fallback routing in `netlify.toml`.
* **Repository Hygiene**: Hardened `.gitignore` against accidental credential leaks, environment files, logs, and operating system artifacts.

### Quality Assurance & Automated Testing
* **100% Pass Rate Across 10 Test Suites (`npm test`)**:
  1. `test:routes`: 39/39 legacy route parity.
  2. `test:assets`: 7/7 static discovery assets.
  3. `test:links`: 873/873 internal links verified with 0 broken links.
  4. `test:edge`: 80/80 Netlify edge function assertions (including path traversal and malformed header resilience).
  5. `test:contrast`: 14/14 WCAG 2.2 AA contrast pairs.
  6. `test:a11y`: Accessibility tokens and touch target compliance.
  7. `test:content`: Content loader validation across all Markdown files.
  8. `test:seo`: 265/265 SEO, social card, and structured data assertions.
  9. `test:interactive`: Clickable card containers and button prefix order.
  10. `test:employer`: Employer portfolio separation and attribution footer rules.
* **Continuous Audit Engine (`scripts/audit.js`)**: 176/176 checks passed (100.0%) across Health, SEO, Accessibility, Performance, Security, and AI modules.
* **Strict Performance Budgets**:
  * Uncompressed CSS: 44.64 KB (budget: < 45.0 KB).
  * Client JavaScript: 4.51 KB (budget: < 5.0 KB).
  * Maximum HTML Page: 98.13 KB (budget: < 100.0 KB).
