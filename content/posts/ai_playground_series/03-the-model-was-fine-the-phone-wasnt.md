# The Model Was Fine. The Phone Wasn't.

## Part 3 — The difficult bugs were memory, native lifecycle, GPU drivers and operating-system behavior.

There is a point in a local AI project where the model stops being the hardest part.

For me, that point was when I started testing the application on actual phones instead of treating a successful development run as proof of correctness.

A model would load.

A prompt would work.

Then I would increase the context.

Add a document.

Switch the model.

Turn the screen off.

Run image generation.

And suddenly the “AI bug” turned out to be:

```text
memory accounting
GPU initialization
native allocation
process lifecycle
stale state
background execution
```

That changed the question I was asking.

Not:

> “Does this model work?”

But:

> **“When is it responsible to start this operation on this device?”**

That distinction became one of the foundations of AI Playground.

---

# 1. Model size is not peak memory

Suppose a model artifact is:

```text
3 GB
```

That number describes the artifact.

It does not describe the full runtime footprint.

The operation may need:

```text
weights
+
KV cache
+
runtime state
+
temporary tensors
+
GPU buffers
+
image/vision components
+
application memory
+
allocator overhead
```

The project therefore maintains explicit memory estimation code and tests.

The conceptual model is:

```text
estimated peak
=
weights
+
KV cache
+
runtime overhead
+
modality overhead
+
safety margin
```

This is deliberately a **policy input**, not a fake claim of perfect precision.

---

# 2. KV cache is why context settings matter

A user sees:

```text
Context: 4096
```

as a text setting.

The runtime sees more work and more memory.

A simplified attention KV-cache relationship is roughly proportional to:

```text
2
× layers
× KV heads
× head dimension
× context tokens
× bytes per element
```

The exact value depends on architecture and implementation.

The practical lesson is enough:

```text
larger context
    |
    v
larger KV cache
+
more prefill work
+
potentially higher latency
```

This is why context budgeting from Part 2 is also a memory feature.

---

# 3. I added an admission step before model loading

Instead of:

```kotlin
loadModel()
```

the application thinks in stages:

```text
request
   |
   v
estimate
   |
   v
admission
   |
   +--> ALLOW
   +--> WARN
   +--> RECLAIM
   +--> UNLOAD_OTHER
   +--> DENY
```

The admission result can explain itself:

```kotlin
data class AdmissionResult(
    val decision: AdmissionDecision,
    val estimatedPeakBytes: Long,
    val safeAvailableBytes: Long,
    val reason: String
)
```

That last field is important.

The user should not have to reverse-engineer a native exception.

---

# 4. Physical RAM is not the same as usable RAM

An “8 GB phone” does not mean my process gets 8 GB.

The runtime cares about:

```text
physical RAM
available RAM
process RSS
native memory
current model residency
system pressure
```

The project therefore exposes a platform-neutral telemetry contract:

```kotlin
interface RuntimeMemoryTelemetry {
    fun snapshot(): RuntimeMemorySnapshot
}
```

Android and iOS can then gather their own native signals without leaking platform details into shared domain code.

---

# 5. Memory pressure changes over time

A static preflight check is not enough.

Imagine:

```text
T0
model fits

T1
user opens another app

T2
system pressure rises

T3
image preprocessing allocates buffers

T4
native backend reaches another allocation peak
```

So the project watches memory during long-running work as well.

The conceptual path is:

```text
preflight
   |
   v
load
   |
   v
generation
   |
   +--> memory pressure monitor
            |
            +--> normal
            +--> warning
            +--> critical
```

At higher pressure, the application can stop starting new heavy operations and reclaim disposable resources.

---

# 6. The stale-pressure bug was a good lesson

At one point, a critical memory-pressure signal could outlive the condition that caused it.

That meant the application could later observe:

```text
live available memory: healthy
historical pressure: critical
```

and still refuse an operation.

The fix was a **decaying memory-pressure monitor**.

Conceptually:

```text
platform event
     |
     v
remember severity
     |
     v
time-based decay
     |
     v
combine with live memory
     |
     v
decision
```

I prefer that approach to simply ignoring pressure callbacks.

The historical signal still matters.

It just should not own the decision forever.

---

# 7. Another bug: counting the same memory twice

Image generation exposed a different class of accounting problem.

The application already knew the current image runtime had a resident footprint.

Another part of the decision logic counted the same weight footprint again.

The result was:

```text
available memory
<
reported requirement
```

even though the resident model was already loaded and the request did not need to pay the full cost again.

The fix was to distinguish:

```text
resident footprint
```

from:

```text
incremental peak
```

That distinction is essential whenever multiple features share a runtime.

---

# 8. Switching models became a resource decision

Suppose:

```text
chat model loaded
```

and then the user asks for image generation.

The application should not simply say:

```text
memory too low
```

without considering whether the chat model can be unloaded safely.

A better decision tree is:

```text
new request
    |
    v
estimate incremental cost
    |
    +--> fits with current residency
    |       |
    |       v
    |      run
    |
    +--> doesn't fit
            |
            v
      unload reclaimable model
            |
            v
          re-check
            |
        +---+---+
        |       |
       fit     fail
```

This is why the model lifecycle coordinator and memory admission policy are separate concepts.

One owns lifecycle.

The other decides whether the lifecycle transition is responsible.

---

# 9. GPU fallback is only useful if it is safe

The Android GGML integration uses a hierarchical backend approach:

```text
Vulkan
  |
OpenCL
  |
CPU
```

But fallback should not happen blindly.

The runtime distinguishes things like:

```text
GPU initialization failure
unsupported backend
missing binary
native runtime error
insufficient memory
```

The first few may justify trying another backend.

The last one may not.

That is the difference between:

```text
fallback
```

and:

```text
retry until the app dies
```

---

# 10. Why the Vulkan probe runs in another process

This is one of the most unusual decisions in the project, and one of the most practical.

A GPU driver is native software outside my control.

A buggy vendor implementation can crash a process during probing.

If the probe happens in the main application process:

```text
GPU probe crash
      |
      v
whole app dies
```

So the project isolates Vulkan probing in a child process:

```text
parent process
    |
    +---- fork() ----> child
                         |
                         +--> Vulkan probe
                               |
                     +---------+---------+
                     |                   |
                   success             crash
                     |                   |
                     v                   v
                report OK          parent survives
```

The point is not that Vulkan is “bad”.

The point is:

> **An optional acceleration path should not be able to take down the product while you are deciding whether it is available.**

That is a systems-engineering decision around someone else's runtime.

---

# 11. Native libraries need build-time guarantees too

The Android application packages native pieces for the selected runtime paths, including the llama/GGML stack and GPU backends, along with the separate image-generation JNI module.

The repository also contains scripts for engine setup, native builds, QA and invariant checks.

That matters because:

```text
source code says backend exists
```

does not mean:

```text
APK actually contains backend
```

Packaging is part of runtime correctness.

---

# 12. Background execution is another resource problem

A local generation can run longer than a user expects.

The user starts it.

Then:

```text
screen off
```

or:

```text
navigate away
```

The operating system is now part of the runtime.

The production Android architecture uses a foreground inference path for long-running inference, with the appropriate service type and a visible user-facing notification. The image-generation feature also supports session continuation while navigating between application surfaces.

The lifecycle looks conceptually like:

```text
start
  |
  v
foreground inference session
  |
  v
native work
  |
  +--> cancel
  |
  +--> finish
  |
  v
release
```

That is not an implementation detail.

It is how I tell the operating system:

> **This work is important, visible and currently active.**

---

# 13. Cancellation is a real contract

A button labeled:

```text
Cancel
```

does not prove cancellation.

Real cancellation has to travel through the stack:

```text
UI
  |
  v
Store
  |
  v
Coordinator
  |
  v
runtime.cancel()
  |
  v
native cancellation
  |
  v
native loop exits
```

The project has explicit tests around true cancellation and race conditions because stale cancellation state can otherwise poison the next generation.

A subtle bug looked like:

```text
Run A
  |
cancel
  |
Run A fails

Run B
  |
stale isCancelled = true
  |
Run B immediately stops
```

The fix was to reset cancellation state at the start of every new run.

Simple.

Easy to miss.

Exactly the kind of thing that deserves a regression test.

---

# 14. Screen-awake state needs ownership too

The project uses a reference-counted screen-awake controller.

The logic is:

```text
acquire
  -> count + 1

release
  -> count - 1

count > 0
  -> keep awake

count == 0
  -> restore normal behavior
```

Why?

Because multiple operations can overlap.

If operation A turns the state off when it completes while operation B is still active, B loses its protection.

Reference counting makes ownership explicit.

---

# 15. Trimming should target disposable memory first

When the system reports pressure, I do not want the first response to be:

```text
unload the model
```

Model loading is expensive.

The better sequence is to reclaim things that are genuinely disposable:

```text
image caches
temporary buffers
native allocator caches
short-lived objects
```

and preserve expensive resident state where the resource envelope still permits it.

This leads to a general principle:

> **Reclaim what is cheap to recreate before destroying what is expensive to rebuild.**

---

# 16. Resource-management code needs real tests

The repository contains tests for things such as:

```text
KV-cache estimation
model-memory estimation
memory-pressure classification
resident model footprint
model-load decisions
model switching
image memory admission
runtime memory snapshots
```

That is not accidental.

The memory layer can produce incorrect user-visible behavior even when the inference engine itself is perfectly healthy.

So it deserves unit-level coverage independent of native inference.

---

# 17. The hardware test matrix matters

I think about testing in dimensions:

```text
RAM tier
  |
  +--> low
  +--> mid
  +--> high

model
  |
  +--> text
  +--> vision
  +--> image

operation
  |
  +--> load
  +--> generate
  +--> switch
  +--> background
  +--> cancel
```

The question is:

> **Where are the boundaries?**

Not:

> “Does my phone work?”

That is how I want to collect real device knowledge over time.

---

# Build this yourself

## Project 1 — Mobile model admission library

Create:

```kotlin
data class DeviceMemory(
    val physicalBytes: Long,
    val availableBytes: Long,
    val processRssBytes: Long
)

data class ModelRequirement(
    val weightsBytes: Long,
    val kvCacheBytes: Long,
    val runtimeBytes: Long
)
```

and:

```kotlin
fun decide(
    memory: DeviceMemory,
    requirement: ModelRequirement
): AdmissionDecision
```

Then add:

```text
resident model state
+
memory pressure
+
safety margin
+
reclaim strategy
```

Test the decision engine before connecting a real model.

---

## Project 2 — GPU crash-isolated probe

Build:

```text
main process
   |
   +--> child process
           |
           +--> GPU probe
           +--> report success/failure
```

Intentionally make the child fail.

Your parent should survive and choose a safe fallback.

---

## Project 3 — Long-running local inference

Build a local inference session that survives:

```text
screen off
activity recreation
navigation
cancellation
```

and records:

```text
start
finish
duration
cancel latency
peak memory
completion state
```

That is a much more realistic mobile-AI exercise than another chat screen.

---

# The systems lesson

By now, I had learned something I wish I had written down on day one:

> **Mobile AI reliability is mostly about making fewer bad assumptions.**

Do not assume:

```text
8 GB RAM = 8 GB available to me
```

Do not assume:

```text
GPU available = GPU reliable
```

Do not assume:

```text
model file size = peak memory
```

Do not assume:

```text
cancel button = cancellation
```

Do not assume:

```text
background process = process that will remain alive
```

And do not assume:

```text
runtime failure = model failure
```

Once I started treating those as explicit contracts, the application became much easier to reason about.

Then I did something that added a completely different class of pressure to the system.

I tried to generate images locally.

**Part 4:** [I Put an Image Generator Inside the Phone](./04-i-put-an-image-generator-inside-the-phone.md)
