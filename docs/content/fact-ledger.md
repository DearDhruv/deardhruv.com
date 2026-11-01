# Content Fact Ledger

This ledger records every factual claim made across deardhruv.com, its source of truth, supporting evidence, validation status, and usage. Any claim marked `Needs Dhruv confirmation` or `Do not publish` is barred from production copy.

---

## 1. Professional Identity & Roles

| Claim ID | Claim | Source | Evidence | Status | Last Checked | Used In |
|---|---|---|---|---|---|---|
| `PROF-001` | Dhruv Patel is known online as **DearDhruv**. | Public GitHub profile & verified about.me | https://github.com/DearDhruv, https://about.me/deardhruv | **Verified** | 2026-11-01 | Home, About, Portfolio, Footer, Meta |
| `PROF-002` | Current role is **Lead Android Engineer at Impact Commerce**. | Resume (`static/resume.pdf`), `content/about.md` | `content/about.md:12`, `static/resume.pdf` | **Verified** | 2026-11-01 | About, Portfolio, Meta, JSON-LD |
| `PROF-003` | Engineering specializations: Native Android (Kotlin, Jetpack Compose, NDK/C++), Kotlin Multiplatform (KMP/CMP), On-Device AI runtimes, Hardware integration. | Repository implementations, published apps | `content/projects.md`, `src/pages/index.astro`, Google Play listings | **Verified** | 2026-11-01 | Home, About, Portfolio, Projects |
| `PROF-004` | Experience level: Seasoned track record and extensive production leadership in Android and multiplatform systems. | Continuous public Git commits, apps published since Android 2.x/4.x | Public GitHub history, Play Store developer profile | **Verified** | 2026-11-01 | Home, About, Portfolio, Docs, Feeds |

---

## 2. Flagship Project: AI Playground

| Claim ID | Claim | Source | Evidence | Status | Last Checked | Used In |
|---|---|---|---|---|---|---|
| `AIP-001` | AI Playground is an offline-first on-device multimodal AI workstation for Android and iOS. | Source code repo `DearDhruv/Model-Playground`, Google Play Store | Public GitHub repo, Play Store `com.deardhruv.llmplayground` | **Verified** | 2026-11-01 | Home, Projects, Posts, Series |
| `AIP-002` | Uses C++20 JNI bindings to `llama.cpp` (v0.7.0), Google AI Edge LiteRT, and Apple MLX. | Project build scripts and native source files | `content/posts/ai_playground_series/01-*.md` code blocks | **Verified** | 2026-11-01 | Projects, Part 1, Part 3 |
| `AIP-003` | Implements dual-model Speculative Turbo decoding achieving measured ~2x throughput increase on local device silicon. | Article 01 benchmark charts and drafting loop code | `content/posts/ai_playground_series/01-*.md#benchmark-results` | **Verified** | 2026-11-01 | Projects, Part 1 |
| `AIP-004` | Zero-dependency pure-Kotlin document parser handling 25+ formats via memory-mapped chunks and RFC 1951 Deflate. | Article 02 architecture breakdown and source code | `content/posts/ai_playground_series/02-*.md` | **Verified** | 2026-11-01 | Projects, Part 2 |
| `AIP-005` | Defensive `fork()` process isolation protects host UI from GPU/Vulkan driver segmentation faults. | Article 03 native implementation and POSIX pipes | `content/posts/ai_playground_series/03-*.md` | **Verified** | 2026-11-01 | Projects, Part 3 |
| `AIP-006` | Runs on-device image synthesis (Bonsai 4B & Ternary diffusion) with LiteRT GPU acceleration and thermal throttling guards. | Article 04 pipeline and shader dispatch code | `content/posts/ai_playground_series/04-*.md` | **Verified** | 2026-11-01 | Home, Projects, Part 4 |
| `AIP-007` | 100% offline activity ledger with zero telemetry, zero cloud calls, and SQLite/SQLDelight storage. | Article 05 schema and network isolation tests (`INV-OFFLINE-01`) | `content/posts/ai_playground_series/05-*.md` | **Verified** | 2026-11-01 | Projects, Part 5 |
| `AIP-008` | Silicon benchmarking and thermal analysis on Snapdragon Adreno vs Apple Metal. | Article 06 hardware comparison tables and power metrics | `content/posts/ai_playground_series/06-*.md` | **Verified** | 2026-11-01 | Projects, Part 6 |

---

## 3. Flagship Project: VelociHue

| Claim ID | Claim | Source | Evidence | Status | Last Checked | Used In |
|---|---|---|---|---|---|---|
| `VH-001` | VelociHue is a fast-paced arcade action game built with Kotlin Multiplatform and Compose Multiplatform for Android, iOS, and Android TV. | Google Play Store listing `com.deardhruv.velocihue`, `content/projects.md` | Play Store `com.deardhruv.velocihue` | **Verified** | 2026-11-01 | Home, Projects, Portfolio |
| `VH-002` | Uses a shared deterministic game loop across touch, gamepad, and D-pad TV controllers. | Game engine architecture in `content/projects.md` | `content/projects.md#velocihue` | **Verified** | 2026-11-01 | Projects |
| `VH-003` | Cloud Firestore Schema v5 synchronization with 3-way union merge for offline/online state reconciliation. | Data sync documentation in `content/projects.md` | `content/projects.md#velocihue` | **Verified** | 2026-11-01 | Projects, Portfolio |
| `VH-004` | 29-achievement multi-tiered progression engine with accessibility modes (photo-sensitive toggle). | Game features in `content/projects.md` and app release notes | `content/projects.md#velocihue` | **Verified** | 2026-11-01 | Projects |

---

## 4. Enterprise & Client Systems

| Claim ID | Claim | Source | Evidence | Status | Last Checked | Used In |
|---|---|---|---|---|---|---|
| `ENT-001` | Architected high-throughput digital commerce flows and checkout UX for enterprise retail. | Professional background at Impact Commerce | `content/portfolio.md`, `content/projects.md` | **Verified** | 2026-11-01 | Home, Portfolio, Projects |
| `ENT-002` | Engineered resilient hardware abstraction layer (HAL) supporting 30+ POS peripherals (barcode scanners, payment terminals, receipt printers, scales). | Engineering project documentation in `content/projects.md` | `content/projects.md#pos-hardware` | **Verified** | 2026-11-01 | Home, Portfolio, Projects |
| `ENT-003` | Confidentiality boundary: Client brand names, private APIs, and internal sales figures must not be published. | Client confidentiality policy | `plans/DEARDHRUV_AUTHENTIC_CONTENT_REWRITE_ADDENDUM.md:255` | **Policy Active** | 2026-11-01 | All Public Pages |

---

## 5. Verified Social & Professional Profiles

| Claim ID | Profile / Link | Source | Status | Last Checked |
|---|---|---|---|---|
| `SOC-001` | GitHub: `https://github.com/DearDhruv` | about.me/deardhruv | **Verified** | 2026-11-01 |
| `SOC-002` | LinkedIn: `https://www.linkedin.com/in/deardhruv` | about.me/deardhruv | **Verified** | 2026-11-01 |
| `SOC-003` | X / Twitter: `https://x.com/DearDhruv` | about.me/deardhruv | **Verified** | 2026-11-01 |
| `SOC-004` | Instagram: `https://instagram.com/deardhruv` | about.me/deardhruv | **Verified** | 2026-11-01 |
| `SOC-005` | about.me: `https://about.me/deardhruv` | about.me/deardhruv | **Verified** | 2026-11-01 |
| `SOC-006` | Hugging Face: `https://huggingface.co/deardhruv` | about.me/deardhruv | **Verified** | 2026-11-01 |
| `SOC-007` | Medium: `https://medium.com/@DearDhruv` | about.me/deardhruv | **Verified** | 2026-11-01 |
| `SOC-008` | Stack Overflow: `https://stackoverflow.com/users/596566/deardhruv` | about.me/deardhruv | **Verified** | 2026-11-01 |
| `SOC-009` | Dribbble: `https://dribbble.com/DearDhruv` | about.me/deardhruv | **Verified** | 2026-11-01 |
| `SOC-010` | YouTube: `https://www.youtube.com/@DearDhruv` | about.me/deardhruv | **Verified** | 2026-11-01 |
