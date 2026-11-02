+++
title = "Beyond the Model: AI Playground Engineering Series"
description = "A 6-part architectural deep dive into on-device AI runtimes, memory guardrails, and hardware acceleration on consumer mobile phones."
date = "2026-10-21"
layout = "series"
+++

A six-part architectural series detailing the engineering challenges of building **[AI Playground](https://play.google.com/store/apps/details?id=com.deardhruv.llmplayground)** - an offline-first multimodal AI workstation running local LLMs and diffusion models directly on consumer Android and iOS devices.

### Articles in this Series

1. **[Part 1: I Wanted the Model to Stay on the Phone](./01-i-wanted-the-model-to-stay-on-the-phone.md)**  
   *Why running models locally matters for privacy, exploring llama.cpp and ARM NEON acceleration, and the realities of moving beyond toy chat boxes.*

2. **[Part 2: The Day a Chat Box Became a Document Engine](./02-the-day-a-chat-box-became-a-document-engine.md)**  
   *How a simple "attach file" button turned into an offline ingestion pipeline for 25+ formats using pure RFC 1951 Deflate and memory-mapped chunks.*

3. **[Part 3: The Model Was Fine. The Phone Wasn't.](./03-the-model-was-fine-the-phone-wasnt.md)**  
   *Handling the hardest bugs: Android Low Memory Killer (LMK) evictions, vendor GPU driver crashes on Vulkan, thermal throttling, and native lifecycle management.*

4. **[Part 4: I Put an Image Generator Inside the Phone](./04-i-put-an-image-generator-inside-the-phone.md)**  
   *Integrating on-device diffusion models with Google LiteRT and Bonsai Image Ternary 4B, managing dynamic feature delivery, and preventing mobile GPU overheating.*

5. **[Part 5: At Some Point I Stopped Building a Chat App](./05-at-some-point-i-stopped-building-a-chat-app.md)**  
   *Refactoring a monolithic mobile app into a multi-module MVI platform with clean offline boundaries, strict state stores, and zero cloud leaks.*

6. **[Part 6: Pushing Mobile Hardware to the Edge](./06-pushing-mobile-hardware-to-the-edge.md)**  
   *Engineering dual-model speculative drafting for 2x decoding speed, isolating GPU driver segmentation faults in a native fork() sandbox, and streaming fault tolerance.*
