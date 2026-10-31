+++
title = "Work & Impact"
date = "2026-06-11"
layout = "hero-page"
description = "Dhruv Patel's professional portfolio showcasing native Android architecture, Kotlin Multiplatform, on-device AI runtimes, and engineering leadership."
+++

Welcome to my portfolio. I'm a **Lead Android & Multiplatform Engineer** with **14+ years** of experience building high-performance mobile architectures, distributed Kotlin Multiplatform systems, and privacy-first on-device AI runtimes for global markets.

---

## 👨‍💼 Professional Overview

- **Current Role:** Lead Android Engineer at Impact Commerce
- **Specializations:** Native Android (Kotlin/Compose), Kotlin Multiplatform (KMP/CMP), On-Device AI Runtimes (llama.cpp/LiteRT/MLX), Modern C++20 / NDK, Hardware & POS Integration.
- **Core Philosophy:** Platform-native fidelity, offline-first reliability, defensive crash isolation, and zero unnecessary cloud dependencies.

---

## 🚀 Flagship Engineering Products

### 1. AI Playground — On-Device Multimodal AI Workstation
**Category:** Flagship Product &middot; On-Device AI & Systems Architecture  
**Role:** Director & Lead Engineer  
**Tech:** Kotlin Multiplatform, Compose Multiplatform, C++20 / NDK (JNI), llama.cpp v0.7.0, Google AI Edge LiteRT, Apple MLX, Vulkan / OpenCL / Metal, SQLDelight

An offline-first, on-device multimodal AI workstation for Android and iOS that turns mobile devices into self-contained inference engines with 100% data privacy and zero external cloud API subscriptions.

- **Dual-Model Speculative Turbo:** Engineered speculative drafting with companion draft models (e.g., Qwen 2.5 0.5B + Llama 3.2 1B), dynamic draft context capping, RAM admission guardrails, and KV cache session pre-warming to double decoding throughput without VRAM exhaustion.
- **Defensive Hardware Sandbox:** Designed a crash-resilient `fork()` child process sandbox with a 3000ms watchdog loop and `kill(pid, SIGKILL)` fallback for native Vulkan driver probing, preventing vendor GPU driver SIGSEGV crashes from taking down the host app.
- **Pure-KMP Document Engine:** Built an offline semantic parser extracting structured text across 25+ file formats (PDF, DOCX, XLSX, PPTX, CSV, JSON, Markdown, RTF) using pure RFC 1951 Deflate decompression without external binaries or cloud APIs.
- **On-Device Diffusion:** Synthesizes 4-step photorealistic diffusion images on mobile silicon using Google LiteRT Multi-Graph runtime and Bonsai Image Ternary 4B.
- **Offline Activity Ledger:** Privacy-first local analytics ledger (SQLDelight v10) tracking usage milestones and active streaks with strictly zero external network calls (`INV-OFFLINE-01`).

👉 **Artifacts & Links:** [Google Play Store](https://play.google.com/store/apps/details?id=com.deardhruv.llmplayground) &middot; [GitHub Repository](https://github.com/DearDhruv/Model-Playground) &middot; [6-Part Engineering Blog Series](/posts/ai_playground_series/)

---

### 2. VelociHue — High-Framerate Arcade Game in KMP
**Category:** Flagship Product &middot; Cross-Platform Game & Runtimes  
**Role:** Director & Lead Engineer  
**Tech:** Kotlin Multiplatform, Compose Multiplatform, Kotlin 2.4.0, AGP 9.2.1, Target SDK 37 (Android 17), Cloud Firestore (Schema v5), Android TV (Leanback)

A fast-paced arcade action game engineered in Kotlin Multiplatform and Compose Multiplatform, shipping natively across Android, iOS (SwiftUI host + shared KMP framework), and Android TV.

- **Shared Pure-Kotlin Game Engine:** Deterministic game loop running at 60–120 FPS managing color-matching physics, projectiles, power-ups, and revive flows across Android and iOS with 100% logic sharing.
- **Conflict-Free Cloud Sync Engine (Schema v5):** Multi-device synchronization backed by Cloud Firestore with a 3-way union merge strategy that safely synchronizes player progression, cosmetics, and streaks without rollbacks.
- **29-Achievement Multi-Tiered Engine:** Catalog covering 1–5,000 player levels and gameplay feats evaluated by a pure-function derived unlock engine with retroactive upgrade backfill.
- **Sensory & Accessibility Suite:** Built-in photo-sensitive and reduced-motion safety mode, granular SFX/music volume sliders, and dynamic haptic scaling.
- **Native Android TV & 10-Foot UI:** Dedicated television deployment with Leanback manifest declarations and D-pad remote navigation focus states.

👉 **Artifacts & Links:** [Google Play Store](https://play.google.com/store/apps/details?id=com.deardhruv.velocihue) &middot; [Technical Project Deep-Dive](/projects/)

---

## 💼 Enterprise & Production Systems

### 3. Digital Commerce Platform
**Category:** Enterprise Mobile Architecture  
**Role:** Lead Android Engineer  
**Tech:** Kotlin, Jetpack Compose, Clean Architecture, MVI, Modular Gradle Architecture

Architected scalable digital commerce solutions handling high transaction volumes with real-time inventory synchronization, adaptive multi-window layouts, and sub-second checkout flows.

- Optimized application startup time by 40% via baseline profiles, coroutine-based dependency graphs, and Compose layout flattening.
- Implemented robust offline-first caching guaranteeing catalog browsing and cart persistence during intermittent network connectivity.

---

### 4. POS & Peripheral Hardware Integration Layer
**Category:** Native Systems & Low-Level Hardware  
**Role:** Senior Developer & Mobile Architect  
**Tech:** Kotlin, Android NDK, C++, Unix Domain Sockets, Peripheral USB/Bluetooth HAL

Designed a comprehensive hardware abstraction layer (HAL) providing a clean, non-blocking asynchronous API for 27+ point-of-sale peripherals (receipt printers, barcode scanners, payment terminals).

- Achieved 99.8% peripheral connection reliability through defensive reconnection state machines and background watchdog services.
- Reduced hardware communication latency by 60% using memory-mapped buffers and zero-copy IPC protocols.

---

## 🌐 Open Source & Community Leadership

- **GitHub:** [@DearDhruv](https://github.com/DearDhruv) — Open-source contributor to Android and Kotlin Multiplatform ecosystems.
- **Technical Writing:** Author of the six-part engineering series [Beyond the Model](/posts/ai_playground_series/), covering on-device AI runtimes, memory guardrails, and mobile hardware acceleration.
- **Conference Speaker & Mentor:** Regular speaker on modern Android architecture, KMP cross-platform design, on-device AI, and engineering team leadership.

---

## 📱 Connect & Inquiries

- **Email:** [dhruv.time@gmail.com](mailto:dhruv.time@gmail.com)
- **LinkedIn:** [linkedin.com/in/DearDhruv](https://www.linkedin.com/in/DearDhruv)
- **GitHub:** [github.com/DearDhruv](https://github.com/DearDhruv)
- **Résumé:** [Download PDF](/resume.pdf)
