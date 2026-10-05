# At Some Point I Stopped Building a Chat App

## Part 5 — The project became a platform because every feature needed a place to live.

There was a point where I stopped looking at AI Playground as:

```text
chat + models
```

and started seeing:

```text
runtime orchestration
+
document ingestion
+
retrieval
+
vision
+
memory policy
+
image generation
+
diagnostics
+
model delivery
+
platform integration
```

At that point, adding another feature without architecture would have been reckless.

The application is built around **Clean Architecture with an MVI presentation layer**, using Kotlin Multiplatform and Compose Multiplatform where shared code is useful, while keeping Android and iOS runtime work native where it should be.

The architecture is not there to make the code look “enterprise”.

It is there because the project has enough independent lifecycles that without boundaries, every change would become risky.

---

# 1. The layer map

The simplified flow is:

```text
User action
    |
    v
Composable
    |
    v
MVI Store
    |
    v
Use Case
    |
    v
Repository / Coordinator
    |
    v
Platform runtime
```

State travels back:

```text
platform runtime
    |
    v
repository
    |
    v
use case
    |
    v
store StateFlow
    |
    v
Compose
```

The UI renders state.

The UI does not become the owner of model loading, parsing, native lifecycles and memory policy.

That single rule eliminates a lot of accidental coupling.

---

# 2. The project is deliberately modular

The repository is organized into decoupled Gradle subprojects, including areas such as:

```text
:features:chat
:features:discover
:features:settings
:features:diagnostics
:features:attachment
:features:navigation
:gpu_engine
:whisper-stt
:testing
:shared
:composeApp
iosApp
```

The module names tell a story.

For example:

```text
:features:attachment
```

owns:

```text
document ingestion
file validation
format capabilities
ZIP/Deflate processing
semantic extraction
```

while:

```text
:features:diagnostics
```

owns:

```text
RAM
GPU/Vulkan inspection
hardware diagnostics
benchmarking
```

And:

```text
:gpu_engine
```

owns the separate image-generation native C++ JNI backend.

This means the codebase has **organizational boundaries that match architectural boundaries**.

---

# 3. The MVI store should never become the application's brain

One of the easiest mistakes in an MVI architecture is to keep adding functionality to the store because the store already has state.

A store starts like:

```kotlin
class ChatStore {
    fun send() {}
}
```

Then it grows:

```text
model loading
model switching
streaming
watchdog
history
export
attachments
memory
voice
navigation
```

At that point:

```text
ChatStore
```

is a monolith.

The project therefore extracts focused coordinators.

Examples include:

```text
ChatModelCoordinator
ChatGenerationCoordinator
ChatStreamParser
ChatExportManager
ChatTitleSummarizer
SettingsParamTracker
```

The store coordinates.

The focused class owns one lifecycle or responsibility.

---

# 4. Why this matters especially for AI

AI features tend to be long-running and stateful.

For example:

```text
model loading
```

has a different lifecycle from:

```text
generation
```

which is different from:

```text
chat persistence
```

which is different from:

```text
memory monitoring
```

If one object owns all four, cancellation and failure paths become tangled.

The project instead makes boundaries explicit:

```text
Model lifecycle
    |
    v
ChatModelCoordinator

Generation lifecycle
    |
    v
ChatGenerationCoordinator

Memory policy
    |
    v
Memory admission / monitor
```

That is plain software engineering.

The AI aspect just makes the cost of getting it wrong higher.

---

# 5. Heavy work must remain off the main thread

The project explicitly routes heavy work to:

```text
Dispatchers.IO
Dispatchers.Default
```

Examples:

```text
file I/O
model verification
database work
document parsing
hashing
native inference dispatch
image decoding
```

A representative pattern:

```kotlin
scope.launch {

    val data = withContext(Dispatchers.IO) {
        repository.loadData()
    }

    state.update {
        it.copy(data = data)
    }
}
```

The main thread should mostly be doing:

```text
input
layout
render
accessibility
animation
```

not:

```text
read a 4 GB model package
```

---

# 6. The UI should appear immediately

One recurring class of performance issue was not a slow algorithm.

It was **blocking screen initialization**.

A user taps Settings.

The application starts inspecting everything.

The screen waits.

Then, several seconds later, content appears.

I would rather do:

```text
tap
  |
  v
render shell immediately
  |
  +--> load data in background
  |
  +--> show progress / placeholders
  |
  v
populate content
```

This is particularly important on lower-end devices.

Perceived performance matters.

---

# 7. Platform-native identity still matters

KMP gives me a way to share the parts that genuinely benefit from sharing.

It does not require me to make Android and iOS look identical.

For Android, I want:

```text
Material 3
Android interaction patterns
Android navigation
Android accessibility conventions
```

For iOS, I want:

```text
SwiftUI
Apple navigation patterns
native typography
native interaction
glass-style treatment where appropriate
```

The shared layer can say:

```text
generation is active
```

The Android layer can decide how that feels like Android.

The iOS layer can decide how that feels like iOS.

That is a much better interpretation of multiplatform development than cloning one platform's UI onto the other.

---

# 8. Accessibility is easier when it is designed in

The application uses shared design tokens and explicit policies for things such as:

```text
touch targets
reduced motion
localized strings
RTL layout
contrast
```

The project targets a minimum touch size of:

```text
48 dp
```

and keeps motion behavior behind an explicit reduced-motion policy.

Localization is also treated as a system constraint rather than a final translation pass.

The current project maintains eleven locales.

That matters because the amount of dynamic content in an AI application makes layout assumptions fragile.

---

# 9. Invariants are more useful than “best practices”

As the project grew, I started writing down statements that must remain true.

Examples:

```text
Inference must not require network access.
```

```text
Memory admission happens before expensive model loading.
```

```text
Memory failure does not trigger meaningless backend retries.
```

```text
Heavy work never blocks the UI thread.
```

```text
Native runtimes have explicit lifecycle and unload paths.
```

```text
Production builds cannot report fake or simulated inference success.
```

```text
Attachment controls reflect actual model capabilities.
```

These statements are much easier to test than vague guidance such as:

```text
"Keep things fast."
```

An invariant can be turned into a regression test.

---

# 10. The production-reality invariant is particularly important

I want to call this one out because it keeps the project honest.

An AI demo can be made to look successful very easily:

```text
start
  |
  v
animate progress
  |
  v
return placeholder
  |
  v
show “done”
```

That is not inference.

The project has an explicit production-reality gate that rejects simulated/emulated execution in production paths and prevents synthetic success from being presented as a real model result.

This matters even more when integrating third-party runtimes.

The application should either:

```text
run the real runtime
```

or:

```text
say that the runtime is unavailable
```

There should not be a third state called:

```text
looks like it worked
```

---

# 11. Testing mirrors the architecture

The project contains tests across shared domain logic, Android host behavior, Compose/UI behavior and native integration boundaries.

The most useful way to understand them is by category:

```text
Model tests
    -> compatibility
    -> capability
    -> memory

Runtime tests
    -> load
    -> routing
    -> cancellation

Document tests
    -> parsing
    -> malformed inputs
    -> format detection

Image tests
    -> memory safety
    -> resolution
    -> package validation
    -> progress
    -> race conditions
    -> true cancellation

Persistence tests
    -> migrations
    -> history integrity

Architecture tests
    -> invariant enforcement
```

That is the testing strategy I want for a system like this.

---

# 12. A database bug reminded me why architecture tests matter

The project uses SQLDelight for persistence.

A migration added cascading foreign keys from chat messages and generated images back to their thread.

That made the intended relational behavior better:

```text
delete thread
   |
   +--> delete dependent messages
   +--> delete dependent images
```

But a replace-style write path could accidentally delete the parent row and trigger the cascade.

The persistence operation looked like:

```text
upsert
```

but the semantics were closer to:

```text
delete
+
cascade
+
insert
```

The fix was to use:

```text
UPDATE
+
INSERT OR IGNORE
```

instead of a destructive replace.

That is a perfect example of why I like testable boundaries.

Two individually reasonable database features can interact into a very unreasonable behavior.

---

# 13. Model catalogs are becoming a first-class subsystem

At the beginning, a model catalog could have been:

```text
name
download button
```

It is now much closer to a compatibility database:

```text
identity
format
architecture
quantization
runtime
platform
modality
required artifacts
memory profile
resolution profile
installation state
```

That enables queries like:

```text
Find a model that:

    accepts images
    works offline
    supports this platform
    fits the current memory budget
```

The UI can then show useful information without hardcoding knowledge into every component.

---

# 14. I want model selection to become adaptive

Today, users still understand models better when the catalog exposes the details.

The next step I want is:

```text
intent
+
device
+
memory
+
capability
+
thermal/battery state
```

producing:

```text
model
+
runtime
+
context
+
resolution
```

Imagine two phones.

### Device A

```text
6 GB RAM
moderate pressure
```

### Device B

```text
12 GB RAM
low pressure
```

The same question:

```text
Summarize this 80-page document.
```

does not necessarily need the same execution plan.

I would rather let the application choose:

```text
Device A
    -> smaller model
    -> tighter context
    -> fewer retrieved chunks
```

than force a model choice that makes the app unreliable.

---

# 15. Local agents come after the foundations, not before

The obvious next feature is an agent.

But I do not want an agent that quietly runs around the application.

A local agent should have:

```text
capability resolver
tool registry
permission boundary
memory budget
execution budget
cancellation
visible action log
```

The first tool set can stay tiny:

```text
read local file
search local index
```

Then add more.

A reliable agent with two tools is more useful to me than an unpredictable agent with twenty.

---

# 16. Offline speech is still on the roadmap

The repository contains a Whisper-based on-device STT module, but the current v1.7.1 development branch explicitly defers offline Whisper STT to v1.8.0 and keeps the corresponding feature disabled.

That is exactly the kind of distinction I want to preserve in public writing.

The architecture is there.

The work is not being represented as shipped merely because a module exists.

The direction is:

```text
microphone
    |
    v
local STT
    |
    v
local LLM
    |
    v
local TTS
    |
    v
speaker
```

But the project's release discipline matters more than the diagram.

---

# 17. Model delivery deserves product-level engineering

A multi-file model package needs:

```text
manifest
checksums
artifact validation
partial-download handling
canonical identity
repair
```

The project already separates model package validation and delivery from the core runtime.

That gives a clean boundary:

```text
catalog
  |
  v
download
  |
  v
validate
  |
  v
install
  |
  v
runtime
```

A runtime should not have to discover a corrupt download at the worst possible moment.

---

# 18. Benchmarking has to become a data set

I do not want future performance discussions to be:

```text
"Model X feels fast."
```

I want something reproducible:

```text
Device
RAM
SoC
OS
Model
Quantization
Runtime
Backend
Context
Time to first token
Tokens / second
Peak memory
Generation time
```

For image generation:

```text
Device
RAM
Model
Resolution
Steps
Runtime
Peak memory
Generation time
Cancel latency
```

Then model recommendations can come from actual observations.

That will make the catalog better over time.

---

# 19. If I were starting again

I would build the project in this order:

```text
1. single local model
2. runtime abstraction
3. capability inspection
4. memory admission
5. hardware diagnostics
6. persistence
7. document ingestion
8. RAG
9. vision
10. background inference
11. image generation
12. adaptive selection
13. local agent
```

The sequence is not accidental.

Each layer makes the next layer safer.

---

# 20. Projects I would give a senior engineer

## Project A — Mobile Runtime Resolver

Input:

```text
task
device telemetry
model catalog
```

Output:

```text
runtime
model
context
```

Add an explanation trace:

```text
selected_model = X

because:
- vision required
- platform supported
- peak memory below budget
- runtime available
- installed locally
```

Now the selection system is observable.

---

## Project B — Resource-aware local agent

Build an agent that must remain under:

```text
RAM budget
tool-call budget
time budget
```

Then make every action cancellable.

This is where local AI gets genuinely interesting.

---

## Project C — Mobile AI benchmark harness

Build a command that records:

```text
device
model
backend
latency
throughput
peak memory
temperature trend
battery change
```

Then store the results as JSON so they can become catalog data later.

That project would benefit the entire ecosystem.

---

# What I learned from building this

The biggest lesson is not:

```text
"Local AI is possible."
```

I knew that because the underlying runtimes already existed.

The lesson is:

> **Once the runtimes exist, the application engineer still has a large systems problem to solve.**

You have to integrate:

```text
model formats
runtime capabilities
native libraries
GPU backends
memory policy
file processing
retrieval
lifecycle
persistence
platform UX
```

and then make the whole thing feel like one product.

That is the part I find interesting.

---

# The title of this entire journey

I think the project is best described as:

# **Beyond the Model**

Because the model is only the center of the system.

Around it sits everything that makes the experience usable:

```text
                +-------------------+
                |       MODEL       |
                +---------+---------+
                          |
     +--------------------+--------------------+
     |          |          |         |         |
   runtime   memory     input      lifecycle  UX
     |          |          |         |         |
     +----------+----------+---------+---------+
                          |
                          v
                    AI Playground
```

That is the work I set out to do.

Not to replace llama.cpp.

Not to replace LiteRT.

Not to replace MLX.

Not to rewrite the inference research.

**To integrate the pieces, respect their constraints, and build a product around them.**

---

# What I need from people who read this

I want the feedback that comes from real devices and real workflows.

Tell me:

```text
Which device did you use?

Which model?

Which runtime?

What were you trying to do?

What was unexpectedly slow?

What failed?

What should the application have explained better?

What capability would make you use it every day?
```

A report like:

```text
"8 GB phone, Q4 model, 4096 context,
model loaded, generation stable, image generation failed
because available memory was too low"
```

is incredibly useful.

A generic:

```text
"Great app!"
```

is nice.

But it doesn't help me improve the runtime decisions.

---

# Final thought

I started with one constraint:

> **Keep the core AI experience on the device.**

I then discovered that the constraint creates a chain of engineering problems:

```text
existing runtimes
       |
       v
integration
       |
       v
capabilities
       |
       v
memory
       |
       v
native lifecycle
       |
       v
documents / retrieval
       |
       v
vision
       |
       v
image generation
       |
       v
platform UX
       |
       v
testing + invariants
       |
       v
adaptive execution
```

That is why I call this project **Beyond the Model**.

The model is essential.

But **the software around the model is what turns an inference runtime into a product**.

And I am still building it.

---

## The series

- [Part 1 — I Wanted the Model to Stay on the Phone](./01-i-wanted-the-model-to-stay-on-the-phone.md)
- [Part 2 — The Day a Chat Box Became a Document Engine](./02-the-day-a-chat-box-became-a-document-engine.md)
- [Part 3 — The Model Was Fine. The Phone Wasn't.](./03-the-model-was-fine-the-phone-wasnt.md)
- [Part 4 — I Put an Image Generator Inside the Phone](./04-i-put-an-image-generator-inside-the-phone.md)
- **Part 5 — At Some Point I Stopped Building a Chat App**

**Project:** AI Playground / Model Playground  
**Website:** https://deardhruv.com  
**Repository:** https://github.com/DearDhruv/Model-Playground
