# DearDhruv Architecture & Implementation Specification

**Project:** DearDhruv.com  
**Engine:** Astro v7 (Zero-runtime client hydration, Static MPA)  
**Hosting & Edge:** Netlify with Netlify Edge Functions  

---

## 1. Directory Structure & Modern Component Architecture

The platform operates as a modern component-driven static site using Astro 5/7 and TypeScript. All legacy Hugo dependencies, Go template partials, and vendor theme submodules have been completely decommissioned.

```
deardhruv.com/
├── astro.config.mjs          # Astro engine configuration, markdown-remark plugins
├── netlify.toml              # Netlify build command, headers, edge function routing
├── package.json              # Zero runtime JS dependencies; devDependencies: astro, typescript
├── tsconfig.json             # Strict TypeScript configuration
├── content/                  # Markdown source collections with typed frontmatter
│   ├── about.md              # Profile markdown
│   ├── portfolio.md          # Flagship engineering systems
│   ├── projects.md           # Technical case studies
│   ├── posts/                # Technical articles and 6-part AI Playground series
│   └── other/                # Privacy policies and legal agreements
├── src/                      # Component-driven Astro implementation
│   ├── components/           # Reusable UI primitives (SiteHeader, SiteFooter, Card, Badge, etc.)
│   ├── layouts/              # Semantic base layouts (BaseLayout, ArticleLayout)
│   ├── pages/                # File-based routes, machine endpoints, and legacy alias redirects
│   └── content.config.ts     # Type-safe Content Collections schemas (Zod)
├── static/                   # Pure static assets (copied to dist/ untouched)
│   ├── css/                  # Precision Technical Editorial design system stylesheets
│   │   ├── design-system.css # Standardized tokens, semantic palettes, a11y focus rings
│   │   ├── typography.css    # Fluid clamp scales, zero-shift system-ui font stacks
│   │   ├── layout.css        # Responsive container bounds, grid, stack, cluster primitives
│   │   ├── components.css    # Accessible buttons, cards, badges, chips, skip-link
│   │   └── nav.css           # Responsive navigation header, brand identity, drawers
│   ├── js/                   # Micro-scripts (theme toggle, theme init; < 5 KB total)
│   ├── images/               # Optimized WebP/JPEG avatars and diagrams
│   ├── resume.pdf            # Professional résumé download
│   ├── llms.txt              # Machine-readable context for AI models (RFC standard)
│   ├── llms-full.txt         # Full corpus export for AI assistants
│   ├── auth.md               # API authentication specs
│   └── .well-known/          # Discovery endpoints (MCP, OAuth, OIDC, api-catalog)
├── netlify/
│   └── edge-functions/
│       └── markdown-negotiation.ts  # Content-negotiation for Accept: text/markdown
├── scripts/                  # Automated verification gates and continuous audit engine
└── tests/                    # Automated regression, a11y, contrast, and SEO test suites
```

---

## 2. Design System & Asset Compilation Pipeline

1. **Pure CSS Design System (< 45 KB Uncompressed Gate):**
   - Stylesheets are served statically without heavy runtime bundlers or framework CSS overhead.
   - Strictly enforced uncompressed budget ensures sub-millisecond CSS parse times.
   - Native CSS custom properties handle instant dark/light/palette theme switching without layout recalculations.

2. **Zero-Framework Client Footprint (< 5 KB Gate):**
   - Astro static output generates zero hydration bundles (`dist/_astro/` contains 0 client framework runtime JS).
   - Micro-scripts (`theme-init.js` and `theme-toggle.js`) execute natively with zero external dependencies.

3. **Responsive Viewport Alignment:**
   - `.site-header-inner`, `.layout-container-wide`, and `.site-footer-inner` share identical `max-width: var(--width-wide)` and `padding-inline: var(--page-gutter)` container bounds, ensuring horizontal alignment across all 6 target viewports (320px, 390px, 768px, 1024px, 1440px, and 1920px).

---

## 3. Content Negotiation & Machine Protocols

1. **Static Markdown Generation:**
   - Every canonical page generates a corresponding negotiated `index.md` representation at build time (`src/pages/*.md.ts`).
2. **Netlify Edge Function (`markdown-negotiation.ts`):**
   - Intercepts requests on `/*`.
   - When `Accept: text/markdown` is preferred (evaluated via RFC 9110 quality weights), the edge function rewrites to the `.md` representation and appends `x-agent-ready: true` and `Vary: Accept` response headers.
3. **Machine Discovery Endpoints:**
   - `Link` headers and HTML `rel` tags advertise `/llms.txt`, `/.well-known/api-catalog`, `/.well-known/mcp.json`, and `/sitemap.xml`.
