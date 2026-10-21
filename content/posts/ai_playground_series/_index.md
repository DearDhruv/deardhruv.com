+++
title = "Beyond the Model Series"
description = "Building a Private AI Playground for Android & iOS - A 6-part engineering journey."
date = "2026-10-21"
+++

A 6-part engineering series exploring what it really takes to build [AI Playground](https://github.com/DearDhruv/Model-Playground) - a private, 100% offline-first, on-device multimodal AI platform for Android and iOS.

### Articles in this Series

1. **[Part 1: I Wanted the Model to Stay on the Phone](./01-i-wanted-the-model-to-stay-on-the-phone.md)**  
   *Why local AI matters, early runtime exploration, ARM NEON/KleidiAI, and the cost of moving beyond toy chat boxes.*

2. **[Part 2: The Day a Chat Box Became a Document Engine](./02-the-day-a-chat-box-became-a-document-engine.md)**  
   *Building a zero-cloud ingestion pipeline for 25+ file formats, token budgets, and bounded vision downsampling.*

3. **[Part 3: The Model Was Fine. The Phone Wasn't.](./03-the-model-was-fine-the-phone-wasnt.md)**  
   *Handling Android's Low Memory Killer (LMK), thermal throttling, background process eviction, and dynamic memory admission.*

4. **[Part 4: I Put an Image Generator Inside the Phone](./04-i-put-an-image-generator-inside-the-phone.md)**  
   *Porting Stable Diffusion onto mobile hardware, managing the on-demand `:gpu_engine` dynamic feature, and Vulkan compute.*

5. **[Part 5: At Some Point I Stopped Building a Chat App](./05-at-some-point-i-stopped-building-a-chat-app.md)**  
   *Architectural evolution from a monolithic app into a multi-module MVI platform with rigorous runtime invariants.*

6. **[Part 6: Pushing Mobile Hardware to the Edge](./06-pushing-mobile-hardware-to-the-edge.md)**  
   *Speculative Turbo dual-model decoding, `fork()`-isolated Vulkan driver crash probing, and streaming SQLite fault tolerance.*

