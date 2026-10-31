# Hugo Layout and Dependency Architecture

**Project:** DearDhruv.com  
**Engine:** Hugo v0.169.0+extended (target v0.162.1)  
**Theme:** `hello-friend-ng` Git submodule @ `1a0a16f`  

---

## 1. Directory Structure & Layout Precedence

Hugo utilizes a strict precedence lookup where files in the root `./layouts/` directory override matching files in `./themes/hello-friend-ng/layouts/`.

```
deardhruv.com/
├── config.toml               # Site-wide settings, taxonomies, menu, outputs
├── netlify.toml              # Build commands, Edge Functions, CSP headers, redirects
├── assets/
│   ├── css/
│   │   └── custom.css        # Project-owned CSS custom properties, responsive styles
│   └── js/
│       └── main.js           # Project-owned JS enhancements
├── layouts/                  # PROJECT OVERRIDES (Highest Precedence)
│   ├── _default/
│   │   ├── baseof.html       # (To be project-owned in Phase 4)
│   │   ├── hero-page.html    # Profile layout for /about/ and /portfolio/
│   │   ├── sitemap.html      # Visual tree layout for /sitemap/
│   │   ├── single.html       # Default article / page layout
│   │   └── _markup/          # Goldmark hooks (e.g. render-image.html)
│   ├── partials/
│   │   ├── head.html         # Meta tags, preconnects, CSS links, JSON-LD
│   │   ├── header.html       # Header shell and brand
│   │   ├── menu.html         # Responsive navigation menu
│   │   ├── footer.html       # Footer with CC license & RSS link
│   │   ├── hero.html         # Home / profile hero block
│   │   └── javascript.html   # Bundle builder & WebMCP provider
│   ├── posts/
│   │   └── rss.xml           # Section RSS feed
│   ├── index.html            # Homepage template
│   ├── index.json            # JSON Feed generation
│   ├── index.md              # Markdown negotiation representation
│   └── sitemap.xml           # XML sitemap template
├── content/                  # Markdown source content
├── static/                   # Pure static files copied as-is to public/
│   ├── resume.pdf            # Professional résumé download
│   ├── llms.txt              # Machine-readable context for AI models
│   ├── auth.md               # API authentication specs
│   └── .well-known/          # Discovery endpoints (MCP, OAuth, OIDC, api-catalog)
├── netlify/
│   └── edge-functions/
│       └── markdown-negotiation.ts  # Content-negotiation for Accept: text/markdown
└── themes/hello-friend-ng/   # Upstream vendor theme submodule (UNMODIFIED)
```

---

## 2. Asset Pipeline & CSS/JS Compilation

1. **SCSS Pipeline (`head.html`):**
   - Resolves `scss/main.scss` via Hugo Pipes: `resources.Get "scss/main.scss" | toCSS (dict "outputStyle" "compressed") | fingerprint`.
   - Generates `/main.min.[hash].css`.

2. **Custom CSS Pipeline (`head.html`):**
   - Config points to `customCSS = ["css/custom.css"]`.
   - Processed via Hugo Pipes: `resources.Get "css/custom.css" | minify | fingerprint`.
   - Generates `/css/custom.min.[hash].css`.
   - Fallback to `/css/custom.css` direct link if resource pipeline is bypassed.

3. **JavaScript Bundling (`javascript.html`):**
   - Concatenates `js/main.js`, `js/menu.js`, and `js/prism.js`.
   - Minifies and fingerprints as `/bundle.min.[hash].js` with `defer`.
   - Injects WebMCP Model Context Protocol integration and Mermaid.js dynamic module loading when required.

---

## 3. Content Negotiation & AI Readiness

1. **Markdown Output Format:**
   - Declared in `config.toml` under `[outputFormats.Markdown]`.
   - Generates `/index.md` and page-level `.md` output files.
2. **Netlify Edge Function:**
   - Intercepts requests on `/*`.
   - If `Accept: text/markdown` is present, rewrites route to `/index.md` and appends `x-agent-ready: true` response header.
3. **Discovery Documents:**
   - `Link` headers advertise `/llms.txt`, `/.well-known/api-catalog`, `/.well-known/mcp.json`, and `/sitemap.xml`.
