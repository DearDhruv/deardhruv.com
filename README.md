# Dhruv Patel — Personal Portfolio & Engineering Blog ([deardhruv.com](https://deardhruv.com))

Personal website, engineering case studies, and architecture writing of **Dhruv Patel** (known online as **DearDhruv**) — Lead Android Engineer, Android Architect, and Android Artist.

Built with **Astro** (zero-client hydration framework, < 5 KB JavaScript runtime footprint), strictly adhering to WCAG 2.2 AA accessibility, precision design system tokens, and comprehensive machine-readable AI agent protocols. Hosted on **Netlify**.

## ✨ Architecture Highlights

- **Static Architecture**: Fast static site generation using Astro (`dist/`).
- **Zero-Framework Client Footprint**: No client hydration framework bundles. Clean native JS with theme persistence and mobile drawer handling (< 5 KB total).
- **Design System Tokens**: Fluid typography clamp scales, system-ui zero-layout-shift stacks, and accessible semantic palettes.
- **AI Crawling & Agent Protocols**: Full `/llms.txt`, `/llms-full.txt`, `/.well-known/mcp.json`, `/.well-known/api-catalog`, and JSON-LD schema knowledge graphs.
- **Strict Route Parity**: Preserves all 39 legacy routes and aliases with zero link degradation.

## 🛠 Prerequisites

- [Node.js](https://nodejs.org/) (v24 recommended, managed via `.node-version` / `.nvmrc`)
- [npm](https://www.npmjs.com/)

## 🚀 Getting Started

```bash
# Clean install dependencies
npm ci

# Start local Astro development server (http://localhost:4321)
npm run dev

# Type check
npm run check

# Build for production (outputs to dist/)
npm run build:astro

# Run full test and regression gate
npm test
```

## 📁 Project Structure

```
├── content/              # Markdown articles, series, and legal pages
├── dist/                 # Generated static production output
├── docs/                 # Architecture, audit reports, plans, and handoffs
├── netlify/              # Netlify edge functions (content negotiation)
├── plans/                # Execution plans and audit specifications
├── scripts/              # Helper scripts (verify-routes, audit engine, new-post)
├── src/                  # Astro layouts, pages, components, and content config
├── static/               # Static assets, styles, avatars, and discovery endpoints
├── tests/                # Automated regression, a11y, contrast, and SEO test suites
├── astro.config.mjs      # Astro configuration and markdown integrations
├── netlify.toml          # Netlify build, routing, headers, and security policies
└── package.json          # Project scripts and dependencies
```

## 🧪 Testing & Verification

```bash
# Run all automated test suites
npm test

# Run permanent continuous audit engine (176 checks across 6 modules)
npm run audit

# Run specialized audit modules
npm run audit:health      # Route parity, asset integrity, and broken links
npm run audit:seo         # Titles, descriptions, canonicals, sitemap, JSON-LD
npm run audit:a11y        # WCAG AA contrast tokens, focus rings, landmarks
npm run audit:perf        # Performance budgets, bundle limits, client JS
npm run audit:security    # Security headers, CSP, leak prevention
npm run audit:ai          # Machine-readable discovery and content negotiation

# Run complete regression and visual matrices
npm run test:regression
npm run test:visual
npm run test:perf
```

## ✍️ Content Authoring

```bash
# Scaffold a new technical post
npm run new:post
```

## 👨‍💻 Connect & Verified Profiles

- **Website**: [deardhruv.com](https://deardhruv.com)
- **GitHub**: [@DearDhruv](https://github.com/DearDhruv)
- **LinkedIn**: [Dhruv Patel](https://www.linkedin.com/in/deardhruv/)
- **X (Twitter)**: [@DearDhruv](https://x.com/DearDhruv)
- **Instagram**: [@DearDhruv](https://instagram.com/deardhruv)
- **Google Play**: [Dhruv Patel Apps](https://play.google.com/store/apps/dev?id=5177092407740817842)

## 📄 License

This work is licensed under a [Creative Commons Attribution-NonCommercial 4.0 International License](https://creativecommons.org/licenses/by-nc/4.0/).
