# The Day a Chat Box Became a Document Engine

## Part 2 — I thought “attach a PDF” would be a UI feature. It became an ingestion pipeline.

Once local chat was reliable enough, I wanted the next capability that makes a local assistant genuinely useful:

> **Let me ask questions about my own files without uploading them.**

That sounds like:

```text
paperclip icon
+
file picker
```

It is not.

A PDF is a container. A Word document is structured data. An Excel workbook is a workbook model. A scanned document may have no text layer at all. An image may contain words, diagrams, tables and visual context simultaneously.

And a mobile language model should not receive an entire 300-page document just because the user asked one question.

That is the point where the application changed from a chat client into a **local document-processing system**.

---

# 1. The simplest version is also the wrong one

The obvious implementation is:

```text
file
  |
  v
extract everything
  |
  v
huge string
  |
  v
prompt
  |
  v
LLM
```

For a tiny file, this works.

For anything serious, it creates three problems at once:

```text
too much context
too much memory
too much irrelevant information
```

So the application needs an intermediate representation.

---

# 2. I gave attachments their own architecture

The repository separates attachment processing into a dedicated feature module.

The pipeline is:

```text
selected file
     |
     v
file identity
     |
     v
capability validation
     |
     v
format processor
     |
     v
semantic document blocks
     |
     v
chunking
     |
     v
local index
     |
     v
retrieval
     |
     v
context budget
     |
     v
local model
```

This is deliberately different from chat.

The chat feature should not know how to parse a DOCX package.

The document feature should not know how a Composable renders a message bubble.

That separation kept the scope under control.

---

# 3. I stopped trusting file extensions

A filename can say:

```text
report.pdf
```

while the bytes are not actually a PDF.

So the attachment pipeline uses **magic-byte inspection** and file identity checks before handing content to a processor.

Conceptually:

```kotlin
fun detectType(bytes: ByteArray): FileType =
    when {
        startsWith(bytes, "%PDF-") ->
            FileType.PDF

        looksLikePng(bytes) ->
            FileType.PNG

        looksLikeZipContainer(bytes) ->
            detectOfficeOrOpenDocument(bytes)

        else ->
            FileType.UNKNOWN
    }
```

The principle is:

> **The extension tells me what the user called the file. The content tells me what it is.**

That distinction is useful for correctness and for avoiding parser confusion.

---

# 4. The KMP decision mattered here

The document engine supports a broad family of text and structured formats through shared code, including formats represented in the project as:

```text
TXT
LOG
MD
CSV
TSV
JSON
XML
YAML

DOCX
DOC
XLSX
XLS
PPTX
PPT

RTF
ODT
ODS
ODP
```

The important architectural choice was to keep the core ingestion path **pure Kotlin Multiplatform** where practical.

I did not want:

```text
Android parser
```

and:

```text
iOS parser
```

to slowly diverge.

Instead:

```text
shared parser contracts
        |
        v
shared semantic representation
        |
        +--> Android UI
        |
        +--> iOS UI
```

That is exactly the kind of work KMP is good at.

---

# 5. Container formats are where things stop looking like “documents”

Several office formats are effectively package containers.

Inside a single user-visible file I may have:

```text
XML
relationships
media
styles
metadata
embedded objects
```

That pushed the document subsystem toward a bounded ZIP/Deflate implementation.

The key word is **bounded**.

I do not want a parser to blindly inflate an archive into memory.

The conceptual path is:

```text
archive entry
    |
    v
validate entry
    |
    v
enforce output limit
    |
    v
bounded decompression
    |
    v
parse required content
```

That is normal systems engineering.

It just happens to be sitting underneath an AI feature.

---

# 6. I needed a semantic representation

A giant `String` loses structure.

Suppose the document contains:

```text
Chapter 4
4.1 Introduction
paragraph...
table...
image...
```

I want the retrieval layer to understand that `4.1 Introduction` is not just another sentence.

A simplified representation looks like:

```kotlin
sealed interface DocumentBlock

data class Heading(
    val level: Int,
    val text: String
) : DocumentBlock

data class Paragraph(
    val text: String
) : DocumentBlock

data class Table(
    val rows: List<List<String>>
) : DocumentBlock

data class ImageReference(
    val id: String
) : DocumentBlock
```

This gives later stages enough structure to carry provenance.

---

# 7. Retrieval is where local RAG becomes useful

A large document can be indexed once and queried many times.

The flow becomes:

```text
document
   |
   v
parse
   |
   v
chunks
   |
   v
local index
```

Then:

```text
user question
   |
   v
retrieve relevant chunks
   |
   v
rank
   |
   v
budget
   |
   v
LLM
```

This is not only about quality.

On a phone, it is also about **resource control**.

---

# 8. Why context budgeting matters on a phone

Suppose my retrieved document text is:

```text
25,000 tokens
```

Even if the model accepts that context, sending all of it means more:

```text
prefill work
KV cache
latency
memory
battery
```

So the retrieval layer is deliberately followed by a strict context budget.

The architecture is:

```text
retrieve generously
       |
       v
rank carefully
       |
       v
budget aggressively
       |
       v
generate
```

A simplified version:

```kotlin
var used = 0

for (result in rankedResults) {

    val snippet = formatForContext(result)

    if (used + estimateTokens(snippet) > budget) {
        break
    }

    context.append(snippet)
    used += estimateTokens(snippet)
}
```

The exact estimator can vary.

The policy should not.

---

# 9. Why I prefer hybrid retrieval

Keyword search is excellent at exact identifiers:

```text
API-1847
SKU-42
Section 9.2
```

Semantic retrieval is better when the user asks:

```text
How does the company verify customer identity?
```

but the document says:

```text
Identity verification is performed during onboarding...
```

So I want both signals:

```text
             query
               |
       +-------+-------+
       |               |
       v               v
 lexical search   semantic search
       |               |
       +-------+-------+
               |
               v
         merge + rank
               |
               v
          top chunks
```

The project exposes a hybrid retrieval coordinator so this logic stays in the domain layer.

---

# 10. Provenance matters

A local document assistant should not just produce:

```text
The contract allows termination after 30 days.
```

I want it to be possible to say:

```text
Source:
contract.pdf
Page 17
Section 8.2
```

The retrieval result therefore carries citation information.

Conceptually:

```kotlin
data class ChunkCitation(
    val chunkId: String,
    val documentId: String,
    val fileName: String,
    val section: String?,
    val pageNumber: Int?,
    val score: Float
)
```

This is one of the places where I think product trust and systems design meet.

The answer is only as useful as the user's ability to verify it.

---

# 11. Then I had to handle images

Documents are often visual.

A scanned PDF may contain:

```text
image of page
```

with no usable text layer.

A screenshot may contain:

```text
UI
buttons
text
icons
charts
```

A photo may contain:

```text
objects
people
text
spatial relationships
```

That means there are two different tools:

```text
OCR
```

and:

```text
vision understanding
```

---

# 12. OCR and vision are not the same feature

OCR asks:

> **What text is visible?**

Vision asks broader questions:

```text
What is this?
What is happening?
How are these objects related?
What does this chart appear to show?
```

A screenshot might produce:

```text
OCR
----
Settings
Account
Privacy
Notifications
```

while a vision-capable model can reason:

```text
This is the Settings screen.
The Privacy option appears below Account.
```

I do not want to choose one permanently.

The application can use:

```text
image
  |
  +--> OCR
  |
  +--> vision
  |
  v
combined context
```

depending on the model and the task.

---

# 13. Vision is another capability check

This is where the model capability system proved useful again.

A user picks a text-only model.

Then attaches a photo.

The worst UX is:

```text
Send
  |
  v
native runtime exception
```

The better UX is:

```text
selected model
       |
       v
capability resolver
       |
       +--> image input supported
       |       |
       |       v
       |      enable
       |
       +--> not supported
               |
               v
         explain limitation
         disable incompatible action
```

This is a direct consequence of treating model support as **data**.

---

# 14. Image dimensions are part of the resource policy

A camera photo might be:

```text
4032 × 3024
```

That does not mean the vision model should receive those exact dimensions.

A mobile image path needs something like:

```text
original image
     |
     v
orientation correction
     |
     v
model-aware resize
     |
     v
bounded pixel representation
     |
     v
vision runtime
```

Otherwise a simple attachment can create an unnecessary memory spike.

Again:

> **Input preprocessing is part of the runtime contract.**

---

# 15. The hard cases are the real feature

A parser demo with one clean PDF is not enough.

The test matrix I care about looks more like:

```text
empty file
truncated file
corrupt PDF
corrupt ZIP
large archive
wrong extension
invalid text encoding
image-only PDF
scanned PDF
very long document
duplicate attachment
unsupported type
unsupported model modality
missing runtime companion artifact
```

The project contains dedicated attachment and capability tests because this is exactly where regressions appear.

A good document system is not the one that parses one beautiful document.

It is the one that fails **predictably** when the input is ugly.

---

# 16. The final local document loop

The whole workflow now looks like:

```text
"Find the termination clause in my contract."

                |
                v

         local document index
                |
                v

           hybrid retrieval
                |
                v

          relevant chunks
                |
                v

          context budget
                |
                v

            local LLM
                |
                v

          answer + source
```

The contract never needed to become an upload.

That was the original reason for doing this locally.

---

# 17. Build this yourself

## Project 1 — Offline PDF Q&A

Start simple:

```text
PDF
 |
 v
text extraction
 |
 v
chunking
 |
 v
keyword retrieval
 |
 v
local model
```

Then add:

```text
embeddings
+
keyword search
```

Then add citations.

Do not start with an agent.

Learn retrieval first.

---

## Project 2 — A vision/OCR laboratory

Build an app with:

```text
gallery/camera
      |
      v
capability check
      |
      v
image resize
      |
      +--> OCR
      |
      +--> vision
      |
      v
answer
```

Test it on:

```text
receipt
chart
screenshot
scanned form
street photo
product label
```

The interesting results will not all be successful.

That is the point.

---

## Project 3 — File capability matrix

Build a matrix like:

```text
                    Model A     Model B
TXT                    ✓           ✓
PDF                    ✓           ✓
DOCX                   ✓           ✓
IMAGE                  ✗           ✓
```

Make the UI derive attachment availability from it.

Now your UI is no longer guessing.

---

# What changed because of documents

Before attachments, the core question was:

> “How do I run a model locally?”

After attachments, the real question became:

> **“What should the model see?”**

That is a more interesting product problem.

And once documents, images and models all started competing for the same phone resources, another question became unavoidable:

**What happens when the phone itself says no?**

**Part 3:** [The Model Was Fine. The Phone Wasn't.](./03-the-model-was-fine-the-phone-wasnt.md)
