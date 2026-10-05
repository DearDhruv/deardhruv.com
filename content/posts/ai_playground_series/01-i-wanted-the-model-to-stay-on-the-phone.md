# Beyond the Model: Building a Private AI Playground for Android & iOS

## Part 1 — I Wanted the Model to Stay on the Phone

### The engineering journey of integrating established on-device AI runtimes into one multimodal mobile product — and everything it takes to make the pieces behave like a coherent system.

There was one constraint behind AI Playground that shaped almost every architectural decision that came after it:

> **I did not want the core AI workflow to depend on a server.**

I want to be precise about what that means.

I did **not** build a new mobile inference engine. I did **not** invent a new way to execute transformer models on phones. The project stands on top of established work from the open-source and platform ecosystems — `llama.cpp`, GGML, Google AI Edge/LiteRT-LM, MediaPipe, Apple MLX, and other native technologies.

My job was different.

I wanted to take those building blocks and make them behave like **one application**.

That meant answering the questions that only appear once you move from “model demo” to “mobile product”:

```text
Which runtime should handle this model?

Does this model actually support the requested input?

Can this device safely load it?

What happens when acceleration fails?

How do I keep native work away from the UI thread?

What happens if the user switches models mid-operation?

How do I make Android and iOS feel like themselves
without duplicating the entire application?
```

That is where the project became interesting.

---

# 1. The promise is simple. The engineering is not.

From a user's point of view, the experience sounds almost boring:

```text
Install application
Download model
Turn off network
Start conversation
Receive answer
```

The repository makes the offline-first boundary explicit.

The inference path is local:

```text
Prompt
  |
  v
shared application logic
  |
  v
selected local runtime
  |
  v
native inference
  |
  v
local response / history
```

The internet-enabled pieces are separated from inference:

```text
Network
  |
  +--> model discovery
  +--> model download
  +--> live Hugging Face search
  +--> other explicitly allowed online surfaces
```

That separation is more important than the phrase “offline”.

A product can call itself local while still quietly sending data through a logging service, a fallback endpoint, a remote parser, or a convenience API.

I wanted the architecture to make accidental data movement harder.

---

# 2. I needed Android and iOS to share the right things

The project uses **Kotlin Multiplatform** and **Compose Multiplatform**, but I never wanted “multiplatform” to mean “pretend both platforms are identical”.

The architecture is closer to:

```text
                    Shared KMP
                        |
         +--------------+--------------+
         |                             |
      Domain                         Data
         |                             |
         +--------------+--------------+
                        |
                Runtime boundaries
                   /                          Android            iOS
              Kotlin/C++         Swift/Metal
```

The shared layer is responsible for:

```text
models
use cases
repositories
policies
state
feature contracts
```

Platform code owns things that actually depend on the operating system or native acceleration stack.

That is the line I keep coming back to:

> **Share the decision. Keep the hardware-specific execution native.**

---

# 3. The first abstraction I cared about was the runtime boundary

Once the app had more than one way to execute a model, the UI could no longer be allowed to know all of them.

I did not want:

```kotlin
if (model.isLlamaCpp()) {
    // llama-specific UI logic
} else if (model.isMediaPipe()) {
    // MediaPipe-specific UI logic
} else if (model.isMLX()) {
    // MLX-specific UI logic
}
```

That kind of condition spreads everywhere.

Instead, the project converged on a common runtime contract.

A simplified version is:

```kotlin
interface LocalModelRuntime {

    val loadedModel: StateFlow<LoadedModel?>

    suspend fun load(
        model: LocalModelRef
    ): Result<ModelLoadInfo>

    fun generate(
        request: GenerationRequest
    ): Flow<GenerationEvent>

    suspend fun cancel()

    suspend fun unload()
}
```

The UI asks for:

```text
load
generate
cancel
unload
```

The runtime implementation decides how those operations are actually performed.

---

# 4. That does not mean the runtimes are interchangeable

The abstraction hides implementation details.

It does **not** erase real capability differences.

The current project integrates runtime families including:

```text
Android
-------
GGUF -> llama.cpp / GGML
.task / .litertlm -> LiteRT-LM / MediaPipe
LiteRT multi-graph -> image generation
stable-diffusion.cpp -> GGUF image models

iOS
---
llama.cpp / Metal path
Apple MLX
Core ML
```

The application has to know which path is appropriate.

That led to one of the most useful concepts in the project:

> **A model is not “supported” just because the file downloaded successfully.**

---

# 5. Model support became a capability problem

I started thinking of a model as a tuple of properties:

```text
Model
 |
 +--> format
 +--> architecture
 +--> modality
 +--> runtime
 +--> platform
 +--> companion artifacts
 +--> minimum runtime requirements
 +--> resource profile
```

A model can be:

```text
GGUF                 = yes
Android              = yes
llama.cpp             = yes
vision                = no
```

or:

```text
.task                 = yes
MediaPipe runtime     = yes
text                  = yes
image input           = no
```

Or even:

```text
architecture supported
runtime available
companion file missing
```

The last case is particularly important.

The UI needs to know before it sends the user into a native error path.

---

# 6. Capability detection belongs below the UI

The application has Android-side inspectors for GGUF and LiteRT-related artifacts.

The broader architecture looks like:

```text
model artifact
     |
     v
binary / metadata inspection
     |
     v
capability report
     |
     v
runtime resolver
     |
     v
UI
```

A simplified data structure:

```kotlin
data class ModelCapabilityReport(
    val textInput: Boolean,
    val imageInput: Boolean,
    val audioInput: Boolean,
    val supportedRuntimes: Set<Backend>,
    val platformSupported: Boolean,
    val missingArtifacts: List<String>
)
```

The actual project goes deeper than this example, but the principle is the important part.

**Capability is data.**

It should not be duplicated as assumptions in five screens.

---

# 7. Memory turned out to be the next abstraction

The next surprise was how misleading model file size can be.

If a model artifact is:

```text
2 GB on disk
```

the application should not make a decision from:

```kotlin
if (fileSize < availableRam)
```

The runtime also needs:

```text
weights
+ KV cache
+ native overhead
+ temporary allocations
+ accelerator buffers
+ multimodal components
+ application pressure
```

So the application has a model-memory estimation layer.

Conceptually:

```kotlin
estimatedPeakBytes =
      weightBytes
    + kvCacheBytes
    + runtimeOverheadBytes
    + modalityOverheadBytes
    + safetyMarginBytes
```

This is an **admission heuristic**, not a promise that the native allocator will use exactly that amount.

The job of the admission layer is:

> **Do I have enough evidence to start this expensive operation safely?**

---

# 8. mmap changed how I thought about model files

For large native model artifacts, memory mapping is useful because it changes the relationship between:

```text
storage
virtual address space
resident memory
```

The conceptual difference is:

```text
Read-all approach

file
 |
 v
large memory buffer
```

versus:

```text
mmap

file
 |
 v
mapped address range
 |
 +--> pages become resident as needed
```

This does not make memory pressure disappear.

It does make it possible to reason more accurately about **file size versus actual resident pages**.

---

# 9. GPU acceleration is another integration layer

The Android GGML integration uses a modular backend layout.

The project packages a baseline CPU/native stack and loads acceleration backends dynamically.

The intended backend order is:

```text
Vulkan
   |
   +--> preferred accelerated path
   |
OpenCL
   |
   +--> fallback accelerated path
   |
CPU
   |
   +--> final stable fallback
```

That is a project-level decision.

It is not an attempt to replace the GPU runtimes themselves.

The useful engineering work is in deciding:

```text
when to use
when to fall back
how to detect failure
how to keep the application alive
```

---

# 10. Why I classified failures

This became important very quickly.

Consider these two errors:

```text
GPU initialization failed
```

and:

```text
not enough memory
```

They both mean:

```text
load failed
```

but they are not the same problem.

The first may reasonably trigger:

```text
Vulkan -> OpenCL -> CPU
```

The second often should not.

If RAM is the limiting factor, trying a different GPU backend does not magically create RAM.

So the routing logic is intentionally reason-aware:

```kotlin
for (backend in candidateBackends) {

    val result = runtimeFor(backend).load(model)

    if (result.isSuccess) {
        return result
    }

    if (result.isInsufficientMemory()) {
        return result
    }
}

return lastFailure
```

That small distinction eliminates a surprising amount of pointless retry behavior.

---

# 11. Native code is a boundary, not a magic escape hatch

The Android app has native C++ integration around llama.cpp and a separate native image-generation module.

The conceptual stack is:

```text
Kotlin
  |
  v
JNI
  |
  v
C/C++
  |
  +--> third-party inference runtime
  +--> accelerator backend
```

Once a feature crosses JNI, I need to think about:

```text
ownership
lifecycle
threading
cancellation
error mapping
resource cleanup
process crashes
```

I learned to treat every native context like a resource with an explicit lifecycle:

```text
load
  |
  v
resident
  |
  +--> generate
  |
  +--> cancel
  |
  v
unload
```

The UI should never own that lifecycle directly.

---

# 12. Why I kept heavy work away from the main thread

The project has an explicit concurrency model:

```text
UI
 |
 v
MVI Store
 |
 v
Use Case
 |
 v
Repository / Runtime
 |
 +--> Dispatchers.IO
 +--> Dispatchers.Default
```

Heavy work includes:

```text
file reads
SHA-256 verification
model inspection
database queries
document parsing
native inference dispatch
image decoding
generation orchestration
```

A simple example:

```kotlin
viewModelScope.launch {

    val result = withContext(Dispatchers.IO) {
        repository.inspectModel(modelPath)
    }

    state.update {
        it.copy(model = result)
    }
}
```

The point is not “always use IO”.

The point is:

> **Do not make the UI thread your accidental systems-processing thread.**

---

# 13. Streaming needs pacing too

A native model can produce a lot of tiny generation events.

The UI does not need to render each event as a separate expensive state transition.

The project keeps a dedicated generation coordinator that coalesces updates at roughly a **65 ms UI cadence** and uses longer watchdog windows for stalled generation.

Conceptually:

```text
native events
 | | | | | | | | | |
 v v v v v v v v v v

      coalesce

        |
        v

StateFlow
        |
        v

Compose
```

That is a small detail with a large effect on perceived performance.

---

# 14. I wanted failure to be understandable

One of the first product lessons was that:

```text
"Load failed"
```

is almost useless.

A better message tells the user what happened:

```text
This model is estimated to exceed the device's safe
memory budget at the selected context length.

Try:
- a smaller quantization
- a shorter context
- unloading the current model
```

The engineering policy becomes part of the UX.

That is something I want AI applications to do more often.

---

# 15. What the first version changed in my thinking

I started with:

```text
chat screen
+
local model
```

I ended up with:

```text
chat
+
runtime contracts
+
model capability inspection
+
memory admission
+
hardware diagnostics
+
native boundaries
+
persistence
+
MVI
+
KMP
```

The model was still the important dependency.

But the **application around it had become the real system**.

And that led to the next question:

> What happens when the input is not text?

**A PDF.**

**A spreadsheet.**

**A screenshot.**

**A photo.**

That is where the next phase started.

---

# Build this yourself

## Project 1 — Offline Pocket LLM

Do not start with a giant model.

Start with:

```text
one GGUF
one runtime
one chat screen
local persistence
streaming
cancel
unload
```

Instrument:

```text
time to first token
tokens / second
load time
peak process memory
UI frame stability
```

Run the same test on CPU and accelerated paths.

The exercise is not to beat a server.

It is to understand what your device is actually doing.

---

## Project 2 — Capability-aware model catalog

Build a model details screen that answers:

```text
Can this model:
    run on this device?
    use this runtime?
    accept this input?
    fit the current memory budget?
    find all required artifacts?
```

Make the UI derive its attachment controls from this report.

That single project teaches an important product lesson:

> **The UI should reflect runtime truth, not just model metadata.**

---

# What I want to measure next

I still want better answers for:

```text
How should thermal state affect runtime choice?

How much should battery state affect model selection?

How accurate can memory admission become without being expensive?

At what point is a smaller model with smarter retrieval
better than a larger model with a giant context?
```

Those questions belong in the next layers of the platform.

And that is exactly what happened.

**Part 2:** [The Day a Chat Box Became a Document Engine](./02-the-day-a-chat-box-became-a-document-engine.md)
