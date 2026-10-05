# I Put an Image Generator Inside the Phone

## Part 4 - I did not build a diffusion engine. I integrated image-generation runtimes and then had to engineer everything around them

Text generation had already forced me to learn about:

```text
runtime selection
memory
native code
lifecycle
fallback
```

Image generation brought all of those problems back, but in a different shape.

The important distinction at the start is the same one I made in Part 1:

> **I did not invent the diffusion algorithms or write a new mobile image-generation framework from scratch.**

AI Playground integrates established technologies and model ecosystems, including **Google AI Edge/LiteRT multi-graph execution, MediaPipe image-generation paths, stable-diffusion.cpp/GGUF, Apple MLX and Core ML paths**.

The engineering work was to give those runtimes a coherent product surface:

```text
model catalog
+
package delivery
+
capability checks
+
memory admission
+
runtime selection
+
progress
+
cancellation
+
history
+
metadata
+
device-aware defaults
```

That is where this feature became interesting.

---

# 1. Image generation is a pipeline, not one model call

A simplified diffusion-style path looks like:

```text
prompt
  |
  v
text encoding
  |
  v
conditioning
  |
  v
denoising / DiT
  |
  v
latent representation
  |
  v
VAE decode
  |
  v
pixels
```

The project therefore treats image generation as a distinct runtime family instead of pretending it is the same thing as chat.

A simplified contract:

```kotlin
interface LocalImageGenerationRuntime {

    val loadedModel:
        StateFlow<LoadedImageGenerationModel?>

    suspend fun load(
        model: ImageGenerationModelRef
    ): Result<ImageGenerationLoadInfo>

    fun generate(
        request: ImageGenerationRequest
    ): Flow<ImageGenerationEvent>

    suspend fun cancel()

    suspend fun unload()
}
```

That interface gives me a clean boundary around the image pipeline.

---

# 2. Why a separate runtime was worth it

Text generation cares about:

```text
tokens
context
KV cache
streaming text
```

Image generation cares about:

```text
steps
latents
denoising
VAE
pixel buffers
output encoding
```

Forcing both into a single giant interface would make the abstraction harder to understand.

The better architecture is:

```text
LocalModelRuntime
        |
        +--> text generation

LocalImageGenerationRuntime
        |
        +--> image generation
```

Then the domain layer can orchestrate both without pretending they have identical mechanics.

---

# 3. The Android image stack has multiple execution paths

The Android application currently integrates several image-generation paths.

The production v1.7.0 release includes:

```text
Google LiteRT 2.2.0
    |
    +--> multi-graph image pipeline
         Text Encoder
             |
             v
         DiT / denoising
             |
             v
         VAE
```

and:

```text
stable-diffusion.cpp
    |
    +--> GGUF image models
```

as well as MediaPipe-based image-generation support for supported model families.

The application chooses the appropriate path through its image runtime abstraction.

That is orchestration work.

The underlying graph execution and model math come from the runtime/model ecosystems.

---

# 4. Bonsai 4B was a good example of integration complexity

One of the most technically interesting model families in the project is **Bonsai Image Ternary 4B**.

The project integrates a mobile-oriented quantized model bundle for the LiteRT path, and the image documentation describes its FLUX.2-klein-style execution details.

The interesting part for me was not “I found a 4B model”.

It was getting the entire artifact and execution contract to line up:

```text
model package
+
tokenization/text encoding
+
position information
+
FlowMatch-Euler sampling
+
latent packing
+
denoising
+
unpatchify
+
VAE decode
+
image output
```

When those pieces do not align, the failure can be:

```text
model won't load
```

or worse:

```text
it runs
but the output is wrong
```

That is why I treat model support as a verification problem, not a download problem.

---

# 5. Multi-graph execution changed the memory problem

A naive implementation might keep every major component resident:

```text
text encoder
+
denoiser
+
VAE
+
temporary tensors
+
output
```

That can create a very high simultaneous peak.

The project instead uses a multi-stage graph path:

```text
text encoder
    |
    v
conditioning
    |
    v
denoising
    |
    v
latent
    |
    v
VAE
    |
    v
RGB output
```

The engineering objective is:

> **Keep the maximum simultaneously active working set under the device's safe envelope.**

That is more useful than simply quoting the total model bundle size.

---

# 6. Resolution is a resource policy

A user sees:

```text
256 × 256
512 × 512
```

as image-quality settings.

The runtime sees:

```text
width
+
height
+
latent dimensions
+
intermediate tensors
+
VAE buffers
+
backend workspace
```

So the project does not treat resolution as an arbitrary UI slider.

The model profile describes supported resolutions and native constraints, and the suitability logic considers those constraints during admission.

A simplified resolver:

```kotlin
fun resolveBestResolution(
    availableBytes: Long,
    supported: List<ResolutionRequirement>
): Resolution {

    return supported
        .filter { it.estimatedPeakBytes <= availableBytes }
        .maxByOrNull { it.width * it.height }
        ?.resolution
        ?: throw NoSafeResolutionException()
}
```

The actual project has a richer policy.

The important idea is:

> **The safest configuration is not necessarily the smallest configuration. It is the largest configuration the current runtime can honestly support.**

---

# 7. I learned that logical downscaling is not always a real memory optimization

One of the most useful bugs in the image work involved a very small requested resolution.

The UI could ask for something like:

```text
128 × 128
```

but some models still performed their expensive internal work at a larger native resolution.

So:

```text
requested size smaller
```

did not necessarily mean:

```text
native peak smaller
```

That made the memory estimator depend on the model's **native resolution floor**, not merely the final output dimensions.

The lesson is broader:

> **A UI control is only a performance control when the underlying runtime actually becomes cheaper.**

---

# 8. Measured peaks are more useful than guesses

The project tracks measured memory peaks for selected image-model/configuration combinations and uses those measurements to improve suitability decisions.

Examples documented in the current image-generation work include values around:

```text
Bonsai 512      ~3.1 GB
Bonsai 256      ~2.9 GB
SDXS-512        ~1.2 GB
```

These are not universal truths about every phone.

They are **specific measurements used to calibrate the application's own decisions**.

That distinction is essential.

A benchmark is useful when it says:

```text
this device
+
this model
+
this runtime
+
this resolution
```

not when it becomes a marketing number detached from the conditions under which it was measured.

---

# 9. Few-step models matter on a phone

The stable v1.7.0 release added verified few-step image models including model families such as:

```text
DreamShaper 8 LCM
Realistic Vision HyperVAE
DreamShaper DMD2
SD-Turbo
```

The reason is obvious from the device perspective.

If a desktop workflow can afford dozens of denoising steps, a mobile workflow benefits enormously when the selected model can produce useful output in very few steps.

For a documented SDXS-512 test, the project observed:

```text
1 step -> ~31 s
2 steps -> ~49 s
```

on a OnePlus 7 Pro.

That observation shaped model ranking.

The best mobile model is not automatically the biggest model.

It can be the model that gives the best **quality / time / memory** trade-off.

---

# 10. Progress is a real UX feature

A three-minute operation cannot realistically show:

```text
Generating...
```

and expect the user to stay calm.

The image store therefore models explicit stages such as:

```text
IDLE
PREPARING
GENERATING
DECODING
SAVING
COMPLETE
```

and exposes step progress.

Conceptually:

```text
Step 1 / 4
Step 2 / 4
Step 3 / 4
Step 4 / 4
```

The UI can then explain that the first step may include the expensive warmup/paging phase rather than leaving the user wondering why the first increment takes longer.

---

# 11. I made cancellation cross the native boundary

The image generation path supports true cancellation rather than only hiding the progress UI.

The architecture is:

```text
Compose
   |
   v
ImageGenerationStore
   |
   v
LocalImageGenerationRuntime
   |
   v
platform bridge
   |
   v
native generation loop
```

The project specifically tests cancellation and generation race conditions.

That includes resetting stale cancellation state at the beginning of a new generation.

The invariant is:

```text
Cancel run A
    |
    v
run A stops

Run B starts
    |
    v
Run B starts clean
```

not:

```text
Run A cancelled
    |
    v
Run B inherits A's state
```

---

# 12. Session continuation changed the product behavior

The stable release added support for continuing image generation while navigating between application surfaces.

The user can move from:

```text
Image
  |
  v
Chat
  |
  v
Discover
```

without automatically destroying the running image-generation session.

At the same time, chat model switching is guarded during active image generation.

The user can be given an explicit choice:

```text
Image generation in progress.

[ Stop & Load ]
[ Keep Generating ]
```

That is a good example of application-level orchestration around a native runtime.

---

# 13. Image outputs should be reproducible

The project embeds generation information into PNG output using W3C-style `tEXt` chunks.

The metadata path includes values such as:

```text
Title
Author
Description
Software
Source
Comment
Parameters
```

A simplified metadata record:

```kotlin
data class PngGenerationMetadata(
    val prompt: String,
    val modelId: String,
    val modelName: String,
    val width: Int,
    val height: Int,
    val steps: Int,
    val seed: Long,
    val guidanceScale: Float
)
```

The encoder then writes those fields into the PNG.

This is a tiny feature with a surprisingly useful outcome:

> **The image can remember where it came from.**

---

# 14. Atomic file output matters

Writing a generated image directly to its final path creates a nasty failure mode.

If the application dies halfway through, the gallery can end up with:

```text
partially written image
```

The image storage layer therefore stages writes through temporary files before promoting them to the final destination.

Conceptually:

```text
generate bytes
     |
     v
.tmp
     |
     v
validate
     |
     v
rename
     |
     v
final PNG
```

And importantly, saving is decoupled from successful generation.

The project supports a save-failure outcome so a generated in-memory result does not have to be thrown away just because the filesystem failed at the last step.

That is exactly the kind of edge case that disappears in a demo and matters in a product.

---

# 15. Model delivery is part of the feature

A multi-file image model is not a single download.

The current image system separates:

```text
application feature delivery
```

from:

```text
model package delivery
```

The package validator checks the expected bundle and supports repair actions when the downloaded model is incomplete or invalid.

That gives me a clean flow:

```text
catalog
  |
  v
compatibility
  |
  v
download package
  |
  v
validate manifest / files
  |
  v
install
```

I do not want the runtime to discover a broken model package only after allocating gigabytes of memory.

---

# 16. Image model catalogs need canonical identity

As multiple resolutions and legacy bundle layouts appeared, the catalog itself needed cleanup.

The v1.7.1 work consolidated Bonsai 4B into a canonical multi-resolution catalog entry while keeping compatibility with legacy installations.

That matters because these should not become different logical products:

```text
Bonsai 4B 256
Bonsai 4B 512
```

if they can be treated as:

```text
Bonsai 4B
    |
    +--> supported resolution = 256
    +--> supported resolution = 512
```

The catalog should describe the **model identity**.

The runtime configuration should describe the **execution choice**.

---

# 17. Android and iOS must not be presented as identical

For Android, the current production path has strong, concrete local image-generation integration.

For iOS, the project contains native MLX and Core ML integration points, including an `MlxImageEngineBridge` and the shared iOS runtime boundary.

I want to be careful here because the repository itself distinguishes **production reality from simulation**.

The project has an explicit invariant that production builds must not emit synthetic success events or pretend that simulated inference is real.

So I do not want this article to say:

```text
"iOS image generation is completely finished and production-equivalent."
```

unless the release artifacts and production gates prove that.

The honest statement is:

```text
The iOS architecture includes native MLX/Core ML integration
paths and shared runtime contracts, while the Android path is
the clearer production reference in v1.7.0. Current iOS image
work remains subject to the repository's production-reality
gates and active development.
```

That may be less flashy.

It is also much more useful to another engineer reading the code.

---

# 18. The iOS bridge still teaches an architectural lesson

The bridge exists to keep Swift-native concerns behind a narrow boundary:

```swift
final class MlxImageEngineBridge {

    func loadModel(...)
    func generate(...)
    func cancel()
    func unload()
}
```

The KMP layer does not need to know how MLX manages:

```text
Metal
memory
Swift tasks
native lifecycle
```

It only needs a stable contract.

That is exactly the same architectural principle as JNI on Android.

---

# 19. Build this yourself

## Project 1 - Tiny diffusion studio

Start with:

```text
one model
one resolution
one runtime
```

Then add:

```text
progress
cancel
seed
resolution
gallery
metadata
memory admission
```

Do not start with sixteen models.

Make the lifecycle correct first.

---

## Project 2 - Adaptive resolution selector

Build:

```kotlin
data class ResolutionRequirement(
    val width: Int,
    val height: Int,
    val estimatedPeakBytes: Long
)
```

and choose the largest safe resolution.

Then compare:

```text
estimated peak
```

with:

```text
measured peak
```

on physical devices.

---

## Project 3 - Reproducible image artifacts

Write:

```text
model
prompt
seed
steps
guidance
resolution
runtime
timestamp
```

into PNG metadata.

Then build:

```text
open image
   |
   v
read metadata
   |
   v
recreate request
```

That gives you a reproducible experimentation loop.

---

# The image-generation lesson

By now the pattern was unmistakable.

I did not need another abstraction because “AI is complicated”.

I needed explicit boundaries because **different runtimes, different resources and different platforms have genuinely different behavior**.

The project now had:

```text
text runtime
document ingestion
retrieval
vision
image runtime
memory policy
native bridges
```

That was a lot of moving parts.

At this point the obvious question was:

> **What architecture lets me keep adding these capabilities without turning the codebase into a giant application class?**

That is where the story stops being about individual features and becomes about engineering the product as a platform.

**Part 5:** [At Some Point I Stopped Building a Chat App](./05-at-some-point-i-stopped-building-a-chat-app.md)
