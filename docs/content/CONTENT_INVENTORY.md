# Content Inventory & Route Mapping

This document provides a comprehensive inventory of all content source files, their generated public URLs, their editorial classification, and explicit boundaries for what may and may not be rewritten.

---

## 1. Primary Public Routes

| URL Path | Source File | Type | Editorial Status | Notes / Rewrite Boundary |
|---|---|---|---|---|
| `/` | `src/pages/index.astro` | Page (Astro) | Rewritable | Homepage hero, domains, featured projects, article teasers |
| `/about/` | `content/about.md` | Content (MD) | Rewritable | Profile narrative, technical interests, verified history |
| `/about-us/` | `content/about.md` | Alias | Redirect only | HTML redirect to `/about/` |
| `/about-hugo/` | `content/about.md` | Alias | Redirect only | HTML redirect to `/about/` |
| `/contact/` | `content/about.md` | Alias | Redirect only | HTML redirect to `/about/` |
| `/portfolio/` | `content/portfolio.md` | Content (MD) | Rewritable | Professional summary, categorized skills, impact highlights |
| `/projects/` | `content/projects.md` | Content (MD) | Rewritable | Deep dive into AI Playground, VelociHue, Commerce, POS |
| `/posts/` | `content/posts/_index.md` | Content (MD) | Rewritable | Posts index header, series intro, reading cues |
| `/posts/ai_playground_series/` | `content/posts/ai_playground_series/_index.md` | Content (MD) | Rewritable | "Beyond the Model" 6-part series landing overview |
| `/sitemap/` | `content/sitemap.md` | Content (MD) | Review only | Human-readable sitemap structure |
| `/404.html` | `src/pages/404.astro` | Page (Astro) | Rewritable | Friendly, technical 404 message with search navigation |

---

## 2. "Beyond the Model" Technical Engineering Series

| URL Path | Source File | Date | Prose Status | Code / Technical Boundary |
|---|---|---|---|---|
| `/posts/ai_playground_series/01-i-wanted-the-model-to-stay-on-the-phone/` | `content/posts/ai_playground_series/01-i-wanted-the-model-to-stay-on-the-phone.md` | 2026-06-18 | Rewritable | **PRESERVE**: C++ JNI llama.cpp bindings, dual-model draft/target benchmarks, tokens/sec tables |
| `/posts/ai_playground_series/02-the-day-a-chat-box-became-a-document-engine/` | `content/posts/ai_playground_series/02-the-day-a-chat-box-became-a-document-engine.md` | 2026-06-19 | Rewritable | **PRESERVE**: RFC 1951 pure-Kotlin Deflate decoder, memory-mapped zero-alloc chunking, 25+ formats |
| `/posts/ai_playground_series/03-the-model-was-fine-the-phone-wasnt/` | `content/posts/ai_playground_series/03-the-model-was-fine-the-phone-wasnt.md` | 2026-06-20 | Rewritable | **PRESERVE**: Native `fork()` Vulkan driver isolation, SIGKILL handler, IPC pipe structures |
| `/posts/ai_playground_series/04-i-put-an-image-generator-inside-the-phone/` | `content/posts/ai_playground_series/04-i-put-an-image-generator-inside-the-phone.md` | 2026-06-21 | Rewritable | **PRESERVE**: Bonsai 4B & Ternary diffusion pipeline, LiteRT GPU delegate fallback, thermal throttling loop |
| `/posts/ai_playground_series/05-at-some-point-i-stopped-building-a-chat-app/` | `content/posts/ai_playground_series/05-at-some-point-i-stopped-building-a-chat-app.md` | 2026-06-22 | Rewritable | **PRESERVE**: SQLite/SQLDelight schema, local privacy boundaries, zero-network security assertion |
| `/posts/ai_playground_series/06-pushing-mobile-hardware-to-the-edge/` | `content/posts/ai_playground_series/06-pushing-mobile-hardware-to-the-edge.md` | 2026-06-23 | Rewritable | **PRESERVE**: Qualcomm Adreno vs Apple Metal benchmarks, memory pressure tables, battery drain curves |

---

## 3. Product Landing, Terms & Privacy Policies (`/other/`)

| URL Path | Source File | Type | Rewrite Policy |
|---|---|---|---|
| `/other/` | `content/other/_index.md` | Content | Rewritable |
| `/other/ai-playground/` | `content/other/ai-playground/_index.md` | Content | Rewritable product overview |
| `/other/ai-playground/privacy-policy-ai-playground-app/` | `content/other/ai-playground/privacy-policy-ai-playground-app.md` | Policy | **DO NOT REWRITE** legal terms; verify links only |
| `/other/ai-playground/terms-ai-playground-app/` | `content/other/ai-playground/terms-ai-playground-app.md` | Policy | **DO NOT REWRITE** legal terms; verify links only |
| `/other/open-store-app/` | `content/other/open-store-app/_index.md` | Content | Rewritable legacy product overview |
| `/other/open-store-app/privacy-policy-open-store-app/` | `content/other/open-store-app/privacy-policy-open-store-app.md` | Policy | **DO NOT REWRITE** legal terms; verify links only |
| `/other/open-store-app/terms-open-store-app/` | `content/other/open-store-app/terms-open-store-app.md` | Policy | **DO NOT REWRITE** legal terms; verify links only |
| `/other/veloci-hue/` | `content/other/veloci-hue/_index.md` | Content | Rewritable game overview |
| `/other/veloci-hue/privacy-policy-veloci-hue-game/` | `content/other/veloci-hue/privacy-policy-veloci-hue-game.md` | Policy | **DO NOT REWRITE** legal terms; verify links only |
| `/other/veloci-hue/terms-veloci-hue/` | `content/other/veloci-hue/terms-veloci-hue.md` | Policy | **DO NOT REWRITE** legal terms; verify links only |

---

## 4. Machine Endpoints, Agent Discoverability & Feeds

| URL Path | Source File | Type | Editorial Boundary |
|---|---|---|---|
| `/index.json` | `src/pages/index.json.ts` | JSON Feed | Must sync with homepage/about summary |
| `/index.md` | `src/pages/index.md.ts` | Markdown Feed | Must sync with homepage/about summary |
| `/index.xml` | `src/pages/index.xml.ts` | RSS Feed | Must mirror post titles and clean descriptions |
| `/sitemap.xml` | `src/pages/sitemap.xml.ts` | XML Sitemap | Exact parity with production routes |
| `/llms.txt` | `static/llms.txt` | Agent Discovery | Concise, factual, synchronized profile |
| `/llms-full.txt` | `static/llms-full.txt` | Agent Index | In-depth architectural index and claims |
| `/.well-known/mcp.json` | `static/.well-known/mcp.json` | Machine Discovery | MCP server metadata |
| `/.well-known/api-catalog` | `static/.well-known/api-catalog` | RFC 9727 | Catalog schema declarations |
| `/.well-known/oauth-protected-resource` | `static/.well-known/oauth-protected-resource` | RFC 9728 | OAuth discovery metadata |
| `/.well-known/oauth-authorization-server` | `static/.well-known/oauth-authorization-server` | RFC 8414 | OAuth discovery metadata |
| `/.well-known/openid-configuration` | `static/.well-known/openid-configuration` | OIDC Core | OpenID discovery metadata |
| `/auth.md` | `static/auth.md` | Machine Doc | Auth policy summary for AI agents |
| `/resume.pdf` | `static/resume.pdf` | Static Binary | Immutable binary asset |

---

## 5. Explicit "Do Not Rewrite" Content Rules

1. **Code Blocks & Syntactic Constructs**:
   - Every fenced code block (` ```kotlin `, ` ```cpp `, ` ```swift `, ` ```bash `, ` ```json `) must remain byte-for-byte identical.
2. **Commands & Terminal Invocations**:
   - `cmake`, `adb`, `gradle`, and compiler flags must never be altered or summarized away.
3. **Legal Policies & Terms of Service**:
   - Age gates (13/16 years), GDPR/CCPA disclosures, and indemnification clauses must remain unchanged.
4. **Attribution, Licenses & External Citations**:
   - llama.cpp, LiteRT, Apache 2.0 / MIT licenses, and third-party references must be preserved.
5. **Private Repository Boundaries**:
   - Under no circumstances shall the private repository identifier `deardhruv.com` be introduced or unmasked. Public open-source work is strictly credited under `github.com/DearDhruv`.
