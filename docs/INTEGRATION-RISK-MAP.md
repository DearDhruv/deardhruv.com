# Netlify Integrations and Release Risk Map

Comprehensive mapping of Netlify hosting, edge features, discovery standards, security headers, and release risks.

---

## 1. Hosting & Netlify Configuration

- **Publish Directory:** `public`
- **Build Command:** `hugo --gc --minify`
- **Environment Pins:**
  - `HUGO_VERSION = "0.162.1"`
  - `NODE_VERSION = "24"`
  - `HUGO_ENV = "production"`
- **Context Environments:**
  - `production`: `--enableGitInfo = true`
  - `deploy-preview`: `hugo --gc --minify --buildFuture -b $DEPLOY_PRIME_URL`
  - `branch-deploy`: `hugo --gc --minify -b $DEPLOY_PRIME_URL`

---

## 2. Netlify Edge Function: Markdown Content Negotiation

- **Trigger:** Intercepts `/*`
- **Implementation:** `netlify/edge-functions/markdown-negotiation.ts`
- **Logic:**
  - Checks if incoming `Accept` header contains `text/markdown`.
  - Rewrites directory requests (`/path/` or `/path`) to `/path/index.md`.
  - Sets response headers:
    - `content-type: text/markdown; charset=utf-8`
    - `x-agent-ready: true`
- **Integrity Requirement:** The function must remain untouched; all Hugo templates must continue to output Markdown counterparts (`[outputs] home = ["HTML", "RSS", "JSON", "Markdown"]`, etc.).

---

## 3. Discovery, Agent Protocols & Well-Known Standards

| Endpoint / File | Purpose | Content Type | Status |
|---|---|---|---|
| `/llms.txt` | Compact context & guidance for AI agents | `text/markdown; charset=utf-8` | Static |
| `/llms-full.txt` | Complete system knowledge bundle | `text/markdown; charset=utf-8` | Static |
| `/auth.md` | Agent service authentication docs | `text/markdown; charset=utf-8` | Static |
| `/.well-known/api-catalog` | RFC 9264 API linkset catalog | `application/linkset+json` | Static |
| `/.well-known/mcp.json` | Anthropic Model Context Protocol specification | `application/json` | Static |
| `/.well-known/oauth-protected-resource` | OAuth 2.0 Protected Resource Metadata | `application/json` | Static |
| `/.well-known/oauth-authorization-server` | OAuth 2.0 Authorization Server Metadata | `application/json` | Static |
| `/.well-known/openid-configuration` | OpenID Connect discovery document | `application/json` | Static |
| `/.well-known/agent-skills/index.json` | WebMCP agent tool registry | `application/json` | Static |

---

## 4. Security Headers & CSP Configuration

Defined in `netlify.toml`:
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
- `Content-Security-Policy`:
  - `default-src 'self'`
  - `script-src 'self' 'unsafe-inline' https://www.google-analytics.com https://www.googletagmanager.com https://cdn.jsdelivr.net`
  - `style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net`
  - `img-src 'self' data: https://www.google-analytics.com`
  - `connect-src 'self' https://www.google-analytics.com https://cdn.jsdelivr.net`
  - `font-src 'self' https://cdnjs.cloudflare.com`

---

## 5. Release Risk & Mitigation Matrix

| Risk | Severity | Mitigation Strategy |
|---|---|---|
| **Breaking Existing URLs or Slugs** | CRITICAL | All 38 routes in `tests/fixtures/legacy-routes.json` verified automatically before any commit. |
| **Accidental Submodule Modification** | HIGH | Vendor theme `themes/hello-friend-ng` left unmodified; all changes isolated in `./layouts/` and `./assets/`. |
| **Homepage Duplicate Content** | MEDIUM | Modernize `layouts/index.html` to executive engineering overview (Hero + Capabilities + Selected Work + Writing Highlights + CTA). |
| **CSP Regression on Assets** | MEDIUM | Use only self-contained assets and system/local font stacks. No unapproved third-party CDNs. |
| **Layout Shift (CLS) on Responsive Devices** | MEDIUM | Explicit width/height on images; clamp/fluid typography without dynamic DOM reshaping. |
| **Accessibility Regression** | MEDIUM | Full keyboard navigation, visible high-contrast focus rings, semantic tags, and skip-to-content links. |
