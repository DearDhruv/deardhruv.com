# Authentic Personal Voice & Style Guide

This style guide establishes the editorial standards for writing on deardhruv.com. It translates Dhruv's hands-on engineering experience into a calm, direct, observant, and technically credible first-person voice.

---

## 1. Core Persona: The Hands-On Systems Engineer

The website is Dhruv Patel's personal engineering portfolio and technical notebook. It speaks as an engineer who has spent years building software close to device hardware and remains curious about how systems behave under the surface.

### Editorial Tenets
1. **Let the Engineering Work Provide Credibility:** Real engineering stories are defined by constraints, hardware quirks, memory limits, driver bugs, and platform trade-offs—not adjectives.
2. **Active, First-Person Voice:** Use "I built", "I ran into", "I chose", "I measured", and "I learned" when grounded in verified facts.
3. **Show, Don't Proclaim:** Avoid declaring a system "state-of-the-art" or "ultra-fast". State the exact measured throughput, hardware target, or memory budget instead.
4. **Natural Sentence Rhythm:** Mix short and medium-length sentences. Long sentences are fine when describing a technical sequence, but avoid dense strings of jargon clauses.
5. **Human and Approachable:** Confident without sounding self-congratulatory; plain-spoken without dumbing down technical substance.

---

## 2. Banned Phrases & Synthetic AI Clichés

Do not use these generic phrases under any circumstance:

| Category | Banned Clichés | Preferred Authentic Alternative |
|---|---|---|
| **Tech Hype** | "pushing the boundaries", "cutting-edge solutions", "revolutionizing the industry", "state-of-the-art" | State the exact hardware, API, or constraint being addressed. |
| **Corporate Fluff** | "passionate about innovation", "dedicated to excellence", "in today's fast-paced digital world", "where technology meets innovation" | Omit entirely. Let the project's purpose and code speak. |
| **Vague Verbs** | "leveraging the power of", "seamlessly integrates", "unlocking the potential", "empowering users" | Use concrete verbs: "bound via JNI", "persists to SQLite", "renders with Metal". |
| **Empty Metrics** | "millions of users", "zero-latency", "enterprise-grade", "production-ready" without context | State verified metrics: "30+ POS peripherals", "~2x drafting throughput on Snapdragon 8 Gen 3". |
| **Inflated Labels** | "visionary", "rockstar", "ninja", "guru", "world-class" | Professional titles: "Lead Android & Multiplatform Engineer". |

---

## 3. Page-Specific Tone Matrix

| Page | Audience & Goal | Tone & Rhythm | Structural Rules |
|---|---|---|---|
| **Home (`/`)** | First-time visitors, peers, hiring managers looking for a fast signal. | Direct, punchy, memorable. | One clear idea in hero; short paragraph; 2 direct actions. No long resume walls. |
| **About (`/about/`)** | Engineers and collaborators wanting to know the person and mindset. | Thoughtful, observant, conversational. | Problem-solving philosophy; concrete engineering examples; no generic "Core Values". |
| **Portfolio (`/portfolio/`)** | Recruiters, tech leads, and conference organizers evaluating competence. | Structured, precise, outcome-oriented. | Categorized skills; hands-on vs leadership separation; verified impact with constraints. |
| **Projects (`/projects/`)** | Technical readers evaluating architecture and depth. | Analytical, narrative, evidence-backed. | Problem first $\to$ What was built $\to$ Hardest technical hurdle $\to$ Trade-offs $\to$ Outcomes. |
| **Articles (`/posts/*`)** | Engineers looking to solve hard on-device systems problems. | Rigorous, forensic, tutorial-level depth. | Situation $\to$ Failure modes $\to$ Code $\to$ Benchmarks $\to$ Concrete lessons. No forced motivational endings. |

---

## 4. Before & After Editorial Transformations

### Example 1: Homepage Hero Lead
- **Before (Synthetic AI Template):**
  > "Passionate Lead Android Architect pushing the boundaries of mobile innovation. Leveraging cutting-edge Kotlin Multiplatform and state-of-the-art on-device AI runtimes to deliver seamless, next-generation user experiences across the globe."
- **After (Authentic Dhruv Voice):**
  > "Lead Android & Multiplatform Engineer crafting high-performance native architectures, distributed KMP systems, and privacy-first on-device AI runtimes."

### Example 2: AI Playground Overview
- **Before (Feature Dump):**
  > "AI Playground is an innovative, state-of-the-art multimodal AI solution empowering mobile users with revolutionary local LLMs and ultra-fast generative AI capabilities with zero latency and complete enterprise security."
- **After (Problem & Constraint First):**
  > "An offline-first multimodal AI workstation that runs local LLMs and diffusion models directly on mobile silicon—keeping data on device without depending on cloud servers. Built with Kotlin Multiplatform, C++20 JNI bindings to llama.cpp, Google AI Edge LiteRT, and Apple MLX."

### Example 3: POS Hardware Integration
- **Before (Vague Corporate Speak):**
  > "Architected enterprise-grade hardware integrations that seamlessly streamline high-volume commercial transactions with maximum reliability."
- **After (Concrete Engineering Detail):**
  > "Architected high-throughput digital commerce flows, secure payment terminal interfaces, and resilient hardware abstraction layers across 30+ POS peripherals."

---

## 5. Review List: Unsupported Claims Requiring Dhruv's Confirmation

The following claims are kept out of visible marketing copy until specifically documented or approved:
1. Exact commercial sales volume or proprietary revenue numbers from client commerce platforms (protected by confidentiality).
2. Unnamed enterprise client identities.
3. Speculative claims about unreleased mobile chipsets or future framework releases.
