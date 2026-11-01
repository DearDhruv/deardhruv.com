# Browser-Based Git CMS Evaluation

This evaluation assesses browser-based, Git-backed Content Management Systems (CMS) for **deardhruv.com** following the Astro migration.

---

## 1. Context & Objectives

**DearDhruv.com** is a high-performance personal portfolio and engineering blog authored by Dhruv Patel (Lead Android & Multiplatform Engineer).
Currently, all writing is managed via Git and local Markdown files (`content/posts/` and `content/*.md`) with Hugo/Astro-compatible TOML frontmatter.

The goal of this evaluation is to determine whether adding an optional browser-based CMS provides sufficient value to justify the added runtime dependencies, authentication surfaces, and maintenance overhead.

---

## 2. Evaluation Criteria

1. **Git Parity & Source Integrity:** Must commit directly to GitHub (`feature/*` or `master`) with zero mutation of existing file structures or TOML frontmatter (`+++`).
2. **Maintenance Overhead:** Zero mandatory cloud subscriptions, daemon processes, or proprietary databases.
3. **Performance & Security:** Zero client bundle weight on public-facing reader pages; authenticated CMS dashboard strictly isolated.
4. **Offline & Developer Experience:** Seamless co-existence with local VS Code / Cursor authoring and `scripts/new-post.js`.

---

## 3. Candidate Systems Comparison

| System | Architecture | TOML Support | Netlify / GitHub Auth | Production Bundle Impact | Recommendation Score |
|---|---|---|---|---|---|
| **Decap CMS** (formerly Netlify CMS) | Static Single-Page React App | Yes (via config `format: "toml"`) | Requires Netlify Identity or GitHub OAuth gateway | 0 KB on public pages (hosted under `/admin/`) | **3.8 / 5.0** |
| **TinaCMS** | React + GraphQL Content Engine | Partial (prefers JSON/YAML/MDX) | Requires Tina Cloud account or self-hosted backend | Heavy build-step integration | **2.5 / 5.0** |
| **Keystatic** | Modern Next.js / Astro integration | YAML frontmatter primary | Direct GitHub App integration | Excellent local UI, but Astro SSR preferred | **3.5 / 5.0** |
| **Sveltia CMS** | Modern lightweight alternative to Decap | Yes (TOML, YAML, JSON) | Direct GitHub Personal Access Token / PKCE | 0 KB on public pages (single static HTML file) | **4.6 / 5.0** |

---

## 4. In-Depth Candidate Analysis

### 4.1 Sveltia CMS (Top Recommended Git CMS)
- **Overview:** Sveltia CMS is a lightweight, drop-in replacement for Decap CMS written in modern Svelte. It runs entirely in the browser as a single static HTML file (`/admin/index.html`).
- **Strengths:**
  - Natively supports TOML frontmatter (`format: "toml"` with delimiter `+++`).
  - Supports GitHub OAuth without requiring Netlify Identity or custom external auth proxy servers (uses standard GitHub OAuth / PKCE).
  - Extremely fast load time (< 500 KB bundle vs Decap's 3.5 MB).
  - 100% zero runtime JavaScript impact on the public portfolio and article pages.
- **Weaknesses:**
  - Smaller community than legacy Decap CMS, though actively maintained.

### 4.2 Decap CMS
- **Overview:** The established open-source successor to Netlify CMS.
- **Strengths:** Proven track record with Netlify hosting and Hugo/Astro static sites.
- **Weaknesses:** Relies on legacy React 16/17 dependencies, heavy bundle size in admin panel, and deprecated Netlify Identity workflows.

### 4.3 TinaCMS & Keystatic
- **Overview:** Modern content engines built primarily for headless React frameworks.
- **Shortcomings for DearDhruv.com:** Both require extensive schema migrations, prefer YAML/JSON frontmatter over TOML, and introduce invasive build-time dependencies that complicate Astro's zero-dependency Content Layer.

---

## 5. Architectural Recommendation & Decision

### Verdict: **Defer Browser CMS; Retain Pure Git / Markdown Workflow**

**Rationale:**
1. **Solitary Technical Author:** The sole author of deardhruv.com is a Lead Systems Engineer comfortable with Git, CLI scaffolding (`npm run new:post`), and Markdown/VS Code.
2. **Zero Maintenance Burden:** Maintaining OAuth callback tokens, external gateway secrets, and admin route security policies introduces maintenance liability with zero reader benefit.
3. **Agent & Machine Readiness First:** The existing workflow guarantees 100% fidelity with RFC 9264 API catalogs, MCP descriptors, and Netlify Edge Markdown negotiation.
4. **Future Path:** Should a web-based editorial interface ever become necessary (e.g., publishing from a tablet while traveling), **Sveltia CMS** can be enabled in under 30 minutes simply by adding `static/admin/index.html` and `static/admin/config.yml` without touching any Astro template or content file.
