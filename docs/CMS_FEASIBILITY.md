# Content Management System (CMS) Feasibility Evaluation & Decision

This document records the architectural evaluation of Git-backed content authoring options for **DearDhruv.com**, specifically assessing **Decap CMS** (formerly Netlify CMS) against direct **Git-native authoring** (GitHub web editor, `github.dev`, and local CLI).

---

## 1. Evaluation Matrix

| Criteria | Decap CMS (Netlify CMS) | GitHub Web / `github.dev` | Local CLI (`scripts/new-post.js`) |
|---|---|---|---|
| **Setup Cost** | Free open-source library | Built-in with GitHub repository | Zero cost |
| **Authentication Complexity** | High (Requires Netlify Identity or external OAuth proxy service) | Zero (Native GitHub 2FA / SSO) | Zero (SSH / Git credentials) |
| **Maintenance Burden** | High (Third-party React CMS bundle in `/admin/`, periodic vulnerability patches) | Zero (Maintained by GitHub) | Zero (Self-contained in repo) |
| **Client Bundle Size** | ~2.5 MB JS/CSS for admin route | 0 bytes to site visitors | 0 bytes to site visitors |
| **Image Handling** | Basic file uploader; no automated responsive downsampling or WebP conversion | Manual upload via web interface | Scriptable with local image tools |
| **Branch & Review Integration** | Editorial workflow requires custom branch configs | Native PR workflow, Netlify deploy previews, automated CI checks | Full git capability |
| **Security Risk** | Requires OAuth client secrets or third-party token gateway | Secured by GitHub infrastructure | Secured by GitHub infrastructure |

---

## 2. Technical Findings on Decap CMS

1. **OAuth Dependency Risk:**
   Decap CMS requires an OAuth gateway to exchange GitHub credentials for an API token. Netlify has transitioned Netlify Identity to legacy status, requiring custom external gateway microservices (such as an external Cloudflare Worker or serverless function) or paid third-party token providers. Introducing this dependency introduces potential authentication failure modes.

2. **Route Conflict & Admin Surface:**
   Hosting Decap CMS at `/admin/` requires bundling a client-side single-page app and exposing an admin entrypoint. Because DearDhruv.com is authored primarily by a single technical author (Dhruv Patel), this overhead offers limited benefit over native GitHub authoring.

3. **Deploy Preview Parity:**
   Direct GitHub branches and pull requests automatically trigger Netlify Deploy Previews with full Edge Function execution and route verification (`scripts/verify-routes.js`), ensuring zero regressions before merging.

---

## 3. Decision

**Decision:** Defer Decap CMS. Adopt the **Git-Native Workflow**.

### Primary Authoring Channels
1. **Local CLI (Recommended for long-form engineering articles):**
   ```bash
   node scripts/new-post.js "Article Title"
   hugo server -D
   ```
2. **Web / Mobile Authoring (When away from workstation):**
   - Press `.` in the GitHub repository or navigate to `https://github.dev/DearDhruv/deardhruv.com`
   - Create or edit the markdown file under `content/posts/`
   - Commit to a feature branch; Netlify automatically generates a deploy preview URL.

This eliminates external OAuth dependencies, minimizes attack surface, and keeps the codebase 100% self-contained and reproducible.
