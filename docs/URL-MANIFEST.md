# URL and Route Manifest (Release Preservation Contract)

**Primary Constraint:** Preserve every existing published URL, article path, legal page path, document URL, static asset URL, and machine-readable endpoint.

## 1. Frozen Legacy Route Inventory

| Route Path | Type | HTTP Status | Content Type | Source File | Description |
|---|---|---|---|---|---|
| `/` | HTML | 200 | text/html | `layouts/index.html` | Homepage |
| `/about/` | HTML | 200 | text/html | `content/about.md` | Profile and background |
| `/about-us/` | Alias | 200 (Redirect) | text/html | `content/about.md` | Legacy alias |
| `/about-hugo/` | Alias | 200 (Redirect) | text/html | `content/about.md` | Legacy alias |
| `/contact/` | Alias | 200 (Redirect) | text/html | `content/about.md` | Legacy alias |
| `/portfolio/` | HTML | 200 | text/html | `content/portfolio.md` | Work and impact overview |
| `/projects/` | HTML | 200 | text/html | `content/projects.md` | Technical project case studies |
| `/posts/` | HTML | 200 | text/html | `content/posts/_index.md` | Technical writing index |
| `/posts/ai_playground_series/` | HTML | 200 | text/html | `content/posts/ai_playground_series/_index.md` | Beyond the Model series hub |
| `/posts/ai_playground_series/01-i-wanted-the-model-to-stay-on-the-phone/` | HTML | 200 | text/html | `content/posts/.../01...md` | Part 1: Offline local LLMs |
| `/posts/ai_playground_series/02-the-day-a-chat-box-became-a-document-engine/` | HTML | 200 | text/html | `content/posts/.../02...md` | Part 2: Local document engine |
| `/posts/ai_playground_series/03-the-model-was-fine-the-phone-wasnt/` | HTML | 200 | text/html | `content/posts/.../03...md` | Part 3: NDK crash isolation |
| `/posts/ai_playground_series/04-i-put-an-image-generator-inside-the-phone/` | HTML | 200 | text/html | `content/posts/.../04...md` | Part 4: On-device diffusion |
| `/posts/ai_playground_series/05-at-some-point-i-stopped-building-a-chat-app/` | HTML | 200 | text/html | `content/posts/.../05...md` | Part 5: Offline activity ledger |
| `/posts/ai_playground_series/06-pushing-mobile-hardware-to-the-edge/` | HTML | 200 | text/html | `content/posts/.../06...md` | Part 6: Mobile hardware limits |
| `/sitemap/` | HTML | 200 | text/html | `content/sitemap.md` | Hierarchical sitemap page |
| `/sitemap.xml` | XML | 200 | application/xml | `layouts/sitemap.xml` | XML sitemap |
| `/resume.pdf` | PDF | 200 | application/pdf | `static/resume.pdf` | Résumé download |
| `/other/` | HTML | 200 | text/html | `content/other/_index.md` | Policy section index |
| `/other/ai-playground/` | HTML | 200 | text/html | `content/other/ai-playground/...` | AI Playground legal index |
| `/other/ai-playground/privacy-policy-ai-playground-app/` | HTML | 200 | text/html | `content/other/ai-playground/...` | AI Playground privacy policy |
| `/other/ai-playground/terms-ai-playground-app/` | HTML | 200 | text/html | `content/other/ai-playground/...` | AI Playground terms |
| `/other/open-store-app/` | HTML | 200 | text/html | `content/other/open-store-app/...` | Open Store App legal index |
| `/other/open-store-app/privacy-policy-open-store-app/` | HTML | 200 | text/html | `content/other/open-store-app/...` | Open Store App privacy policy |
| `/other/open-store-app/terms-open-store-app/` | HTML | 200 | text/html | `content/other/open-store-app/...` | Open Store App terms |
| `/other/veloci-hue/` | HTML | 200 | text/html | `content/other/veloci-hue/...` | VelociHue legal index |
| `/other/veloci-hue/privacy-policy-veloci-hue-game/` | HTML | 200 | text/html | `content/other/veloci-hue/...` | VelociHue privacy policy |
| `/other/veloci-hue/terms-veloci-hue/` | HTML | 200 | text/html | `content/other/veloci-hue/...` | VelociHue terms |
| `/index.json` | JSON | 200 | application/feed+json | `layouts/index.json` | JSON Feed |
| `/index.md` | Markdown | 200 | text/markdown | `layouts/index.md` | Markdown content negotiation |
| `/feed.json` | Rewrite | 200 | application/feed+json | `netlify.toml` | JSON Feed rewrite to `/index.json` |
| `/llms.txt` | Text | 200 | text/markdown | `static/llms.txt` | AI agent summary |
| `/auth.md` | Markdown | 200 | text/markdown | `static/auth.md` | Agent authentication docs |
| `/.well-known/api-catalog` | JSON | 200 | application/linkset+json | `static/.well-known/api-catalog` | RFC 9264 API Catalog |
| `/.well-known/mcp.json` | JSON | 200 | application/json | `static/.well-known/mcp.json` | MCP manifest |
| `/.well-known/oauth-protected-resource` | JSON | 200 | application/json | `static/.well-known/...` | OAuth protected resource metadata |
| `/.well-known/oauth-authorization-server` | JSON | 200 | application/json | `static/.well-known/...` | OAuth authorization metadata |
| `/.well-known/openid-configuration` | JSON | 200 | application/json | `static/.well-known/...` | OIDC metadata |

## 2. Preservation Rules
1. Never rename or move existing Markdown articles or change their slugs.
2. Never remove legacy aliases (`/about-us/`, `/about-hugo/`, `/contact/`).
3. Retain `/portfolio/` and `/projects/` as distinct URLs.
4. Keep `/resume.pdf` intact and downloadable.
5. Retain all legal pages under `/other/...`.
6. Keep Edge Function content negotiation on `/*` for `Accept: text/markdown`.
