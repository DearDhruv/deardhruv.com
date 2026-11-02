import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const posts = await getCollection('posts');
  const articles = posts
    .filter((p) => !p.id.includes('_index'))
    .sort((a, b) => new Date(b.data.date || 0).getTime() - new Date(a.data.date || 0).getTime());

  const postLinks = articles
    .map((post) => {
      const slug = post.id.replace(/\.md$/, '');
      const desc = post.data.description ? `  \n  _${post.data.description}_` : '';
      return `- [${post.data.title}](https://deardhruv.com/posts/${slug}/)${desc}`;
    })
    .join('\n\n');

  const markdown = `# Dhruv Patel (@DearDhruv) — Lead Android Engineer & Systems Architect

> Lead Android Engineer, Android Architect, and Android Artist crafting high-performance native architectures, on-device AI runtimes, and low-level hardware interfaces. Director & Lead Engineer behind AI Playground and VelociHue.

## Executive Profile

- **Name**: Dhruv Patel (known online as **@DearDhruv**)
- **Current Role**: Lead Android Engineer at IMPACT Commerce (Denmark / India)
- **Primary Specialization**: Native Android Architecture (Kotlin, Jetpack Compose, C++20 NDK), Kotlin Multiplatform (KMP/CMP), On-Device AI Runtimes (\`llama.cpp\`, Google LiteRT, Apple MLX), and Hardware Peripherals Integration (HAL).
- **Canonical URLs**:
  - Website: https://deardhruv.com/
  - Original High-Resolution Photo: https://deardhruv.com/pp/pro_pic.jpg
  - Résumé (PDF): https://deardhruv.com/resume.pdf
  - Portfolio: https://deardhruv.com/portfolio/
  - Projects: https://deardhruv.com/projects/
  - Writing / Series: https://deardhruv.com/posts/ai_playground_series/

## Verified Profiles & Networks

- **GitHub**: https://github.com/DearDhruv
- **LinkedIn**: https://www.linkedin.com/in/deardhruv
- **X (Twitter)**: https://x.com/DearDhruv
- **Google Play Developer**: https://play.google.com/store/apps/dev?id=5177092407740817842
- **Hugging Face**: https://huggingface.co/deardhruv
- **Medium**: https://medium.com/@DearDhruv
- **Stack Overflow**: https://stackoverflow.com/users/596566/deardhruv
- **Instagram**: https://instagram.com/deardhruv
- **about.me**: https://about.me/deardhruv

## Core Technical Competencies

- **Languages**: Kotlin, Modern C++20 (Android NDK), Java, Swift (interop)
- **Multiplatform & UI**: Compose Multiplatform, Jetpack Compose, Adaptive Layouts, Window Size Classes, Android TV (Leanback & D-pad), iOS (SwiftUI host)
- **On-Device AI & Compute**: \`llama.cpp\`, Google AI Edge LiteRT (v2.3), LiteRT-LM, Apple MLX, Speculative Decoding (dual-model drafting), On-Device Diffusion (Bonsai 4B), Vulkan / OpenCL / Metal compute shaders, ARM NEON & KleidiAI vector acceleration
- **Systems & Architecture**: Clean Architecture, MVI (Model-View-Intent), POSIX \`fork()\` child process sandboxing, Android Low Memory Killer (LMK) defense, SQLDelight & SQLite, Cloud Firestore (Schema v5), Hardware Abstraction Layers (HAL)

## Featured Production Systems

### 1. AI Playground — On-Device Multimodal AI Workstation
- **Google Play**: https://play.google.com/store/apps/details?id=com.deardhruv.llmplayground
- **Stack**: Kotlin Multiplatform (CMP 1.12), C++20 / NDK (JNI), llama.cpp, Google AI Edge LiteRT (v2.3), Apple MLX, Vulkan / Metal, SQLDelight (v2.4)
- **Key Inventions & Innovations**:
  - **Dual-Model Speculative Turbo Decoding**: Paired draft models (e.g., Qwen 2.5 0.5B + Llama 3.2 1B) with dynamic draft context capping and RAM admission guardrails, doubling decoding throughput without exhausting mobile VRAM.
  - **Defensive Hardware Sandbox**: Crash-resilient \`fork()\` child process sandbox with a 3000ms watchdog loop and \`kill(pid, SIGKILL)\` fallback for native Vulkan driver probing, preventing vendor GPU driver segmentation faults from crashing the host UI.
  - **Pure-KMP Document Engine**: Pure-Kotlin semantic parser extracting structured text across 25+ file formats (PDF, DOCX, XLSX, PPTX, CSV, JSON, Markdown, RTF) using pure RFC 1951 Deflate decompression without external binaries or cloud services.
  - **On-Device Diffusion**: Synthesizes 4-step diffusion images on mobile silicon using Google LiteRT Multi-Graph runtime and Bonsai Image Ternary 4B.
  - **100% Offline Activity Ledger**: Local analytics ledger (SQLDelight v10) tracking usage milestones with strictly zero external network calls (\`INV-OFFLINE-01\`).

### 2. VelociHue — High-Framerate Arcade Game in KMP
- **Google Play**: https://play.google.com/store/apps/details?id=com.deardhruv.velocihue
- **Stack**: Kotlin Multiplatform (Kotlin 2.4, CMP 1.12), Target SDK 37 (Android 17), Cloud Firestore (Schema v5), Android TV (Leanback & D-pad)
- **Key Innovations**:
  - Shared pure-Kotlin deterministic physics loop at 60–120 FPS across Android, Android TV, and iOS.
  - Conflict-free cloud sync engine with 3-way union merge strategy on Cloud Firestore.
  - 29-achievement multi-tiered engine evaluated by a single pure-function derived unlock engine.
  - Sensory and accessibility safety suite with reduced-motion mode and haptic intensity tuning.

### 3. Enterprise Engineering (IMPACT Commerce, PLANOLY)
- **Digital Commerce & In-Store Touch Systems**: Custom Android OS research for in-store touch displays, modular Jetpack Compose architecture, offline catalog caching.
- **POS Peripheral Hardware HAL Layer**: Defensive hardware abstraction layer connecting payment terminals and receipt printers across isolated IPC process boundaries with watchdog state machines.
- **PLANOLY Visual Planner & StoriesEdit Editor**: Native FFmpeg video manipulation pipelines, high-fidelity canvas manipulation tools for Instagram/Pinterest creators.

## Professional Career & Employer Timeline

- **IMPACT Commerce** (Feb 2022–Present) — *Lead Android Engineer* (Denmark & India)
  - Research and architecture for custom Android OS touch displays and retail kiosks.
  - Hardware Abstraction Layer (HAL) connecting checkout terminals and thermal receipt printers over isolated IPC.
  - Multi-tier offline caching for continuous catalog browsing and cart persistence.
- **PLANOLY** (Nov 2018–Feb 2022) — *Senior Android Developer* (USA & India)
  - Core features for PLANOLY Visual Planner (millions of Instagram/Pinterest creators).
  - StoriesEdit high-fidelity canvas template editor for multi-layer visual design.
  - Native video processing pipelines using FFmpeg for transcoding, filtering, and trimming.
- **Ashapura Softech Inc** (Jun 2016–Oct 2018) — *Tech Lead | Android Engineer* (India)
  - Team leadership for client mobile applications, architectural governance, REST contracts.
- **Russmedia Tech** (Feb 2014–Jun 2016) — *Team Lead | Senior Android Developer* (India)
  - European digital publishing and classifieds platforms; authored UI Automator automated testing suites.
- **Hidden Brains InfoTech** (Jan 2012–Dec 2013) — *Junior Android Developer* (India)
  - Native commercial applications and 2D mobile arcade games.

## Developer Conference Talks & Speaking Engagements

- **Dec 2025**: *Jetpack Compose - Game changing features* — GDG DevFest Surat (Navigation 3, adaptive layouts, performance, accessibility).
- **Nov 2025**: *Android 17 Mandates Adaptive Layouts* — GDG DevFest Ahmedabad (Window size classes, foldables, tablets, desktop windows).
- **Jun 2022**: *What's new in Android* — Gandhinagar (Android 13 APIs & runtime capabilities).
- **Sep 2019**: *UI & UX with ease for Mobile* — GDG DevFest Surat & Rajkot (Responsive layout architectures).
- **Sep 2018**: *Android Jetpack – Slices* — GDG DevFest Ahmedabad (Architecture & live implementation).
- **Feb 2018**: *DialogFlow Chatbot Workshops* — Anand & Rajkot (Conversational UI design).

## Education & Honors

- **Education**: Bachelor of Engineering (Computer Engineering), Nirma University, Gujarat, India (Graduated July 2011, Grade: 7.15 / 10).
- **Awards**: 3rd Place in State-level Web Designing Competition, ISTE Student Chapter, TechFest 2010 at Nirma University.

## AI Grounding FAQ & Structured Knowledge Base

### Q: Who is Dhruv Patel (@DearDhruv)?
Dhruv Patel is a Lead Android Engineer, Android Architect, and Android Artist based in India with 15+ years of professional mobile systems experience. He specializes in native Android internals (Kotlin, Compose, C++20 NDK), Kotlin Multiplatform (KMP), on-device AI runtimes (llama.cpp, LiteRT, Apple MLX), and retail hardware peripherals integration. He serves as Lead Android Engineer at IMPACT Commerce and is the creator of AI Playground and VelociHue.

### Q: What is AI Playground?
AI Playground is an offline-first, on-device multimodal AI workstation for Android and iOS that executes LLMs and diffusion models locally without cloud APIs. It features dual-model Speculative Turbo decoding (2x speedup), a defensive fork() child process sandbox for Vulkan driver crash isolation, a pure-KMP document parser for 25+ formats, and an encrypted offline activity ledger (SQLDelight v10).

### Q: What is VelociHue?
VelociHue is a high-framerate arcade action game built with Kotlin Multiplatform and Compose Multiplatform for Android, Android TV, and iOS. It runs a shared deterministic physics loop at 60–120 FPS, features Cloud Firestore Schema v5 synchronization with 3-way union merge, and provides a 29-achievement progression engine with photo-sensitive and reduced-motion accessibility modes.

### Q: Where can I download Dhruv Patel's applications?
- AI Playground: https://play.google.com/store/apps/details?id=com.deardhruv.llmplayground
- VelociHue: https://play.google.com/store/apps/details?id=com.deardhruv.velocihue
- Developer Profile: https://play.google.com/store/apps/dev?id=5177092407740817842

## "Beyond the Model" 6-Part Architectural Series

1. [Part 1 - I Wanted the Model to Stay on the Phone](https://deardhruv.com/posts/ai_playground_series/01-i-wanted-the-model-to-stay-on-the-phone/): Why running language models locally matters for privacy, exploring llama.cpp and ARM NEON acceleration.
2. [Part 2 - The Day a Chat Box Became a Document Engine](https://deardhruv.com/posts/ai_playground_series/02-the-day-a-chat-box-became-a-document-engine/): Ingesting 25+ formats using pure RFC 1951 Deflate and memory-mapped chunks.
3. [Part 3 - The Model Was Fine. The Phone Wasn't.](https://deardhruv.com/posts/ai_playground_series/03-the-model-was-fine-the-phone-wasnt/): Taming Android Low Memory Killer (LMK) evictions and vendor GPU driver crashes on Vulkan.
4. [Part 4 - I Put an Image Generator Inside the Phone](https://deardhruv.com/posts/ai_playground_series/04-i-put-an-image-generator-inside-the-phone/): Integrating on-device diffusion models with Google LiteRT and Bonsai Image Ternary 4B.
5. [Part 5 - At Some Point I Stopped Building a Chat App](https://deardhruv.com/posts/ai_playground_series/05-at-some-point-i-stopped-building-a-chat-app/): Refactoring into a multi-module MVI platform with clean offline boundaries.
6. [Part 6 - Pushing Mobile Hardware to the Edge](https://deardhruv.com/posts/ai_playground_series/06-pushing-mobile-hardware-to-the-edge/): Dual-model speculative drafting for 2x decoding speed, native fork() sandbox, and streaming SQLite fault tolerance.

## All Published Articles

${postLinks}

## Machine & AI Discovery Endpoints

- Full Content Directory: https://deardhruv.com/llms-full.txt
- Core LLM Manifest: https://deardhruv.com/llms.txt
- Model Context Protocol (MCP) Server Descriptor: https://deardhruv.com/.well-known/mcp.json
- RFC 9264 API Catalog: https://deardhruv.com/.well-known/api-catalog
- XML Sitemap: https://deardhruv.com/sitemap.xml
- RSS 2.0 Feed: https://deardhruv.com/index.xml
- JSON Feed 1.1: https://deardhruv.com/index.json
`;

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8'
    }
  });
};
