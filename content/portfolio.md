+++
title = "Work & Impact"
date = "2026-06-11"
layout = "hero-page"
description = "Dhruv Patel's engineering portfolio showcasing native Android systems, Kotlin Multiplatform architecture, on-device AI runtimes, and technical leadership."
+++

I'm a **Lead Android & Multiplatform Engineer** specializing in systems that operate close to device hardware: on-device AI runtimes, multiplatform architectures, and resilient hardware integrations. This portfolio outlines the production systems I've built, the constraints I've designed around, and the engineering outcomes achieved.

---

## 👨‍💼 Engineering Overview

- **Current Role:** Lead Android Engineer at Impact Commerce
- **Primary Focus:** Native Android systems, Kotlin Multiplatform (KMP/CMP), On-Device AI Runtimes (`llama.cpp`, LiteRT, MLX), Hardware & POS Integration.
- **Architectural Tenets:** Platform-native fidelity, offline-first reliability, defensive process isolation, and zero unnecessary cloud dependencies.

---

## 🛠️ Technical Competencies

- **Languages:** Kotlin, Modern C++ (Android NDK), Java, Swift (interop)
- **Mobile & Multiplatform:** Android SDK, Jetpack Compose, Compose Multiplatform, iOS (SwiftUI host integration), Android TV
- **On-Device AI & Compute:** `llama.cpp`, Google AI Edge LiteRT (v2.3), LiteRT-LM, Apple MLX, on-device image synthesis (Bonsai 4B), Vulkan / OpenCL / Metal compute backends, speculative drafting pipelines
- **Data & Architecture:** MVI, Clean Architecture, Unidirectional Data Flow, SQLDelight, Room, Cloud Firestore (Schema v5), Coroutines & Reactive Flows, memory-mapped I/O
- **Hardware & Systems:** Hardware Abstraction Layers (HAL), Unix Domain Sockets, 30+ POS peripheral protocols, defensive IPC, POSIX `fork()` sandboxing

---

## 🚀 Flagship Engineering Products

### 1. AI Playground — On-Device Multimodal AI Workstation
**Role:** Director & Lead Engineer  
**Tech:** Kotlin Multiplatform (CMP 1.12), C++20 / NDK (JNI), llama.cpp, Google AI Edge LiteRT (v2.3), Apple MLX, Vulkan / Metal, SQLDelight (v2.4)  

An offline-first multimodal AI workstation that runs local LLMs and diffusion models directly on mobile silicon—keeping user conversations and document analysis private without cloud round-trips.

- **Dual-Model Speculative Drafting:** Implemented companion draft models (e.g., Qwen 2.5 0.5B + Llama 3.2 1B) with dynamic draft context capping and RAM admission guardrails, doubling decoding throughput without exhausting mobile VRAM.
- **Defensive Hardware Sandbox:** Designed a crash-resilient `fork()` child process sandbox with a 3000ms watchdog loop and `SIGKILL` fallback for native Vulkan driver probing, preventing vendor GPU driver segmentation faults from crashing the application.
- **Pure-KMP Document Engine:** Built an offline semantic parser extracting structured text across 25+ file formats (PDF, DOCX, XLSX, PPTX, CSV, JSON, Markdown, RTF) using pure RFC 1951 Deflate decompression without external binaries or cloud services.
- **On-Device Diffusion:** Synthesizes 4-step diffusion images on mobile silicon using Google LiteRT Multi-Graph runtime and Bonsai Image Ternary 4B.
- **Offline Activity Ledger:** Local analytics ledger (SQLDelight v10) tracking usage milestones with strictly zero external network calls (`INV-OFFLINE-01`).

👉 **Artifacts & Links:** [Google Play Store](https://play.google.com/store/apps/details?id=com.deardhruv.llmplayground) &middot; [GitHub Repository](https://github.com/DearDhruv/Model-Playground) &middot; [6-Part Engineering Blog Series](/posts/ai_playground_series/)

---

### 2. VelociHue — High-Framerate Arcade Game in KMP
**Role:** Director & Lead Engineer  
**Tech:** Kotlin Multiplatform (Kotlin 2.4, CMP 1.12), Target SDK 37 (Android 17), Cloud Firestore (Schema v5), Android TV (Leanback & D-pad)  

A fast-paced arcade action game engineered with Kotlin Multiplatform and Compose Multiplatform, shipping natively across Android, iOS (SwiftUI host + shared KMP framework), and Android TV.

- **Shared Pure-Kotlin Game Engine:** Deterministic game loop running at 60–120 FPS managing color-matching physics, projectiles, and power-ups across Android and iOS with 100% shared logic.
- **Conflict-Free Cloud Sync Engine (Schema v5):** Multi-device synchronization backed by Cloud Firestore with a 3-way union merge strategy that reconciles player progression, cosmetics, and streaks across devices.
- **29-Achievement Multi-Tiered Engine:** Progression system evaluated by a pure-function derived unlock engine with retroactive upgrade backfill across player levels.
- **Sensory & Accessibility Suite:** Built-in photo-sensitive and reduced-motion safety mode, granular SFX/music volume controls, and dynamic haptic feedback scaling.
- **Native Android TV & 10-Foot UI:** Dedicated television deployment with Leanback manifest declarations and D-pad remote navigation focus states.

👉 **Artifacts & Links:** [Google Play Store](https://play.google.com/store/apps/details?id=com.deardhruv.velocihue) &middot; [Technical Project Deep-Dive](/projects/)

---

## 💼 Enterprise & Production Systems

### 3. Digital Commerce Platform
**Role:** Lead Android Engineer  
**Tech:** Kotlin, Jetpack Compose, Clean Architecture, MVI, Modular Gradle Architecture  

Architected high-throughput digital commerce solutions handling high transaction volumes with real-time inventory synchronization, adaptive multi-window layouts, and sub-second checkout flows.

- Optimized application startup time by 40% via baseline profiles, coroutine-based dependency graphs, and Compose layout flattening.
- Implemented robust offline-first caching guaranteeing catalog browsing and cart persistence during intermittent network connectivity.

---

### 4. POS & Peripheral Hardware Integration Layer
**Role:** Senior Developer & Mobile Architect  
**Tech:** Kotlin, Android NDK, C++, Unix Domain Sockets, Peripheral USB/Bluetooth HAL  

Designed a comprehensive hardware abstraction layer (HAL) providing a clean, non-blocking asynchronous API for 30+ point-of-sale peripherals (receipt printers, barcode scanners, payment terminals).

- Achieved 99.8% peripheral connection reliability through defensive reconnection state machines and background watchdog services.
- Reduced hardware communication latency by 60% using memory-mapped buffers and zero-copy IPC protocols.

---

## 🌐 Open Source & Engineering Leadership

- **Hands-On Architecture:** Guiding teams through multi-module Gradle modularization, unidirectional data flow, and modern Android/KMP migration patterns.
- **Open-Source Contribution:** Active contributor and maintainer across mobile and multiplatform ecosystems on GitHub ([@DearDhruv](https://github.com/DearDhruv)).
- **Technical Writing:** Author of the six-part engineering series [Beyond the Model](/posts/ai_playground_series/), covering on-device AI runtimes, memory guardrails, and mobile hardware acceleration.
- **Speaking & Mentorship:** Regular speaker on modern Android architecture, KMP cross-platform design, on-device AI runtimes, and engineering mentorship.

---

## 📱 Connect & Inquiries

- **Email:** [dhruv.time@gmail.com](mailto:dhruv.time@gmail.com)
- **LinkedIn:** [linkedin.com/in/deardhruv](https://www.linkedin.com/in/deardhruv/)
- **GitHub:** [github.com/DearDhruv](https://github.com/DearDhruv)
- **X / Twitter:** [x.com/DearDhruv](https://x.com/DearDhruv)
- **Instagram:** [instagram.com/deardhruv](https://instagram.com/deardhruv)
- **about.me:** [about.me/deardhruv](https://about.me/deardhruv)
- **Hugging Face:** [huggingface.co/deardhruv](https://huggingface.co/deardhruv)
- **Medium:** [medium.com/@DearDhruv](https://medium.com/@DearDhruv)
- **Résumé:** [Download PDF](/resume.pdf)
