# Dhruv Patel — Personal Portfolio & Engineering Blog ([deardhruv.com](https://deardhruv.com))

Personal website, engineering case studies, and architecture writing of **Dhruv Patel** — Lead Android & Multiplatform Engineer.

Built with **Astro 5** (zero-client hydration framework, 0 KB JavaScript runtime footprint), strictly adhering to WCAG 2.2 AA accessibility, precision design system tokens, and comprehensive machine-readable AI agent protocols. Hosted on **Netlify**.

## ✨ Architecture Highlights

- **Static Architecture**: Fast static site generation using Astro 5 (`dist/`).
- **Zero-Framework Client Footprint**: No client hydration framework bundles. Clean native JS with theme persistence and mobile drawer handling (< 5 KB total).
- **Design System Tokens**: Fluid typography clamp scales, system-ui zero-layout-shift stacks, and accessible semantic palettes.
- **AI Crawling & Agent Protocols**: Full `/llms.txt`, `/llms-full.txt`, `/.well-known/mcp.json`, `/.well-known/api-catalog`, and JSON-LD schema knowledge graphs.
- **Strict Route Parity**: Preserves all 39 legacy routes and aliases with zero link degradation.

## 🛠 Prerequisites

- [Node.js](https://nodejs.org/) (v22+ or v24 recommended)
- [npm](https://www.npmjs.com/)

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start local Astro development server
npm run dev

# Build for production
npm run build

# Run full test and regression gate
npm test
```

## 📁 Project Structure

```
├── content/              # Markdown articles, series, and legal pages
├── dist/                 # Generated static production output
├── netlify/              # Netlify edge functions (content negotiation)
├── public/               # (Git-ignored) temporary build output
├── scripts/              # Helper scripts (verify-routes, new-post)
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

# Run complete route and content regression matrix
npm run test:regression

# Run performance budgets audit
npm run test:perf

# Run visual regression assertions
npm run test:visual
```

## 👨‍💻 Connect with Me

- **GitHub**: [@DearDhruv](https://github.com/DearDhruv)
- **LinkedIn**: [Dhruv Patel](https://www.linkedin.com/in/DearDhruv)
- **Twitter / X**: [@DearDhruv](https://twitter.com/DearDhruv)
- **StackOverflow**: [deardhruv](https://www.stackoverflow.com/users/596566/deardhruv)

## 📄 License

This work is licensed under a [Creative Commons Attribution-NonCommercial 4.0 International License](https://creativecommons.org/licenses/by-nc/4.0/).
