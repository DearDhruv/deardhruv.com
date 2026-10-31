# Portfolio Information Architecture & Navigation Hierarchy

**Primary Goal:** Establish clear entry points and distinct user journeys for technical recruiters, engineering leaders, and software peers while strictly maintaining 100% route compatibility.

---

## 1. Global Navigation Bar

| Order | Label | Route | User Intent & Target Audience |
|---|---|---|---|
| 1 | **Portfolio** | `/portfolio/` | Executive overview of high-impact work, outcomes, and business scale (Recruiters, Directors, VP of Eng). |
| 2 | **Projects** | `/projects/` | In-depth engineering case studies with system architecture, constraints, trade-offs, and benchmarks (Architects, Staff/Senior Engineers). |
| 3 | **About** | `/about/` | Career timeline, engineering philosophy, technical specializations, community speaking, and contact (All). |
| 4 | **Posts** | `/posts/` | Long-form technical articles and the 6-part "Beyond the Model" AI Playground engineering series (Engineering community). |
| 5 | **Sitemap** | `/sitemap/` | Full hierarchical index of every article, section, and legal document (Discoverability, Crawlers). |

---

## 2. Page Responsibilities & Content Model

### 2.1 Home (`/`)
- **Primary Hero:** Executive brand statement, focus domains (Android Native, KMP/CMP, On-Device AI Runtimes), and prominent action pills: *Explore Selected Work*, *Read Engineering Series*, *Contact*, *Résumé (PDF)*.
- **Capabilities Matrix:** Scannable engineering pillars (Mobile Architecture, Multiplatform Systems, On-Device Inference, Hardware & NDK, Multimedia Loops).
- **Flagship Project Spotlights:** Rich summary cards for **AI Playground** and **VelociHue** with key achievements and store/repo links.
- **Writing Highlights:** Showcase the 6-part Beyond the Model engineering series.
- **Career & Collaboration CTA:** Direct contact channels (`mailto:`, LinkedIn, GitHub).

### 2.2 Portfolio (`/portfolio/`) vs Projects (`/projects/`)
To eliminate redundancy and deliver maximum clarity:
- **Portfolio (`/portfolio/`):**
  - High-level overview organized by category badges:
    1. *Flagship On-Device AI Products* (AI Playground)
    2. *Cross-Platform Games & Engines* (VelociHue)
    3. *Enterprise Digital Commerce* (High-throughput platforms)
    4. *Hardware & POS Peripherals* (NDK integration modules)
    5. *Open-Source Contributions & Community* (Kotlin ecosystem)
  - Emphasizes scope, leadership role, and quantitative outcomes.
- **Projects (`/projects/`):**
  - Detailed case studies following the 6-pillar framework:
    1. Problem & Context
    2. Hard Hardware & OS Constraints
    3. Architecture & Data Flow (Mermaid diagrams)
    4. Key Technical Decisions & Trade-offs
    5. Performance & Reliability Engineering
    6. Verified Results & Production Artifacts

### 2.3 About (`/about/`)
- Concise personal introduction and verified 14+ year professional journey.
- Chronological career timeline.
- Grouped competencies (Languages, Frameworks, Edge Runtimes, Toolchains).
- Conference talks and community mentorship history.
- Preserves all aliases: `/about-us/`, `/about-hugo/`, `/contact/`.

### 2.4 Posts (`/posts/`) & Series (`/posts/ai_playground_series/`)
- Posts Index: Featured series banner, year/topic groupings, reading time badges.
- Series Hub: Comprehensive 6-part curriculum with sequential order, status indicators, and prerequisite links.
- Article View: Clean typography (65–80ch), copy-ready code blocks, inline responsive diagrams, and series progress navigation.

### 2.5 Legal & Compliance (`/other/...`)
- Dedicated sub-indexes and legal documents for AI Playground, Open Store App, and VelociHue.
