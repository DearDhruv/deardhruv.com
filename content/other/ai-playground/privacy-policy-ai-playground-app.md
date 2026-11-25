+++
title = "Privacy Policy - AI Playground"
date = "2026-11-25"
[author]
name = "Dhruv Patel"
+++

## Privacy Policy

This privacy policy applies to the **AI Playground** mobile application (`com.deardhruv.llmplayground`) for mobile devices, together with any related services operated by Dhruv Patel (collectively, the "Application"). Dhruv Patel is referred to here as the "Service Provider".

AI Playground is built for **on-device AI inference**: text chat, image generation, document Q&A, OCR, and system text-selection actions run locally on your device. Your prompts, chat conversations, documents, and generated images are stored locally on your device, no account is required, and the Service Provider operates no server that receives your prompts, chats, images, or documents. The Application also includes optional user-initiated network features and optional, opt-in Google Firebase telemetry (off by default). This policy explains what stays on your device, what is sent when you enable optional features, and how you control it.

## What Stays on Your Device (Local AI Processing)

No account creation is required to use the Application. When you run AI models locally:

* **Prompts & Conversations:** Text prompts, chat messages, reasoning blocks, custom personas, and system prompts are processed locally on your device and stored only in your device's local database (SQLite / app storage).
* **Generated Images:** Images created with on-device diffusion models and saved in your Image Gallery are stored locally on your device.
* **Documents, OCR & Embeddings:** Attached files, extracted OCR text, and local retrieval-augmented generation (RAG) embeddings are processed locally on your device without cloud upload.
* **Local Activity Counters:** Usage counters used to power on-device features and in-app review timing remain in local device storage.
* **Local Preferences & Credentials:** App preferences and any optional Hugging Face User Access Token you enter are stored locally on your device.

None of your prompts, chat history, documents, or generated images are sent to the Service Provider's servers or used to train remote AI models.

## Optional Telemetry (Off by Default)

On Android, the Application includes **Google Firebase** SDKs (**Firebase Analytics**, **Firebase Crashlytics**, and **Firebase Performance Monitoring**). **All Firebase telemetry is OFF by default** on fresh installations and only runs if you explicitly turn it on in Settings.

### What Is Sent When You Opt In

If you turn on **"Usage & Crash Reports"** in Settings, the Firebase SDKs collect and transmit limited diagnostic and usage data over encrypted HTTPS connections to **Google LLC**:

* **Crash Reports & Diagnostics (Firebase Crashlytics):** Crash logs, exception stack traces, and non-sensitive diagnostic custom keys (`brand` and `app_version`).
* **Performance Data (Firebase Performance Monitoring):** App launch and screen rendering timings, and network request performance metrics (duration, payload size, and HTTP status codes, without prompt or chat content).
* **Usage Analytics & App/Device Info (Firebase Analytics):** In-app interaction and session events (such as screen views, app opens, updates, and session duration), app version, device model, mobile operating system version, Firebase App Installation IDs, IP address, and coarse approximate location derived from IP by Google Analytics.

**Strict Content Exclusion:** Even when telemetry is enabled, the Application **never** sends your prompts, chat messages, documents, OCR text, custom personas, generated images, or content report notes to Firebase Analytics, Firebase Crashlytics, or Firebase Performance Monitoring.

**Purpose of Processing:** Opt-in Firebase telemetry is used only to diagnose crashes, monitor stability and performance, and understand aggregate usage trends to improve the Application.

### How to Enable or Disable Telemetry Anytime

You can turn Firebase Analytics, Crashlytics, and Performance Monitoring on or off at any time inside the Application:

1. Open **Settings** → **System** → **Privacy & Consent**.
2. Toggle **"Usage & Crash Reports"** **ON** or **OFF**.

Your choice is saved locally and applied immediately when you toggle the setting (and on every subsequent app launch). You can also stop any future collection at any time by turning the toggle off or uninstalling the Application.

Google Firebase processes opt-in telemetry under Google's privacy policies:

* [Google Privacy Policy](https://policies.google.com/privacy)
* [Privacy and Security in Firebase](https://firebase.google.com/support/privacy)

## Optional Network Features & Device Permissions

If you choose to use optional online features, your device connects to external services only when you initiate them:

* **Model Catalog & Hugging Face Hub:** Browsing or searching community models queries the public Hugging Face Hub API (`huggingface.co/api/models`), and downloading model weights fetches files over HTTPS directly from Hugging Face (or a user-specified HTTPS model URL). If you optionally sign in with a Hugging Face User Access Token to access gated models, the Application validates your token against `huggingface.co/api/whoami-v2` and stores the token locally on your device. Hugging Face's handling of these requests is governed by the [Hugging Face Privacy Policy](https://huggingface.co/privacy).
* **Optional Live Web Search (Off by Default):** Live web search in chat is **disabled by default**. If you turn it on, search queries extracted from your prompt (after passing on-device safety filtering) are sent over HTTPS to external search providers (**DuckDuckGo**, **Wikipedia**, and **Google News**) to fetch search snippets for local context.
* **Optional GPU Engine Download & Google Play Services:** On Android builds distributed via Google Play, turning on GPU acceleration may trigger an optional on-demand module download from Google Play (Play Feature Delivery) to fetch the GPU acceleration engine libraries. Google Play In-App Updates and Play In-App Review also communicate with Google Play Services under the [Google Privacy Policy](https://policies.google.com/privacy).
* **Voice Input (Microphone / `RECORD_AUDIO`):** Microphone access is used only when you activate voice dictation. When on-device speech recognition is available (Android 13+ on-device `SpeechRecognizer` or iOS `SFSpeechRecognizer`), audio is processed using the device's speech recognition support. On Android devices where on-device speech recognition is unavailable, the Application falls back to the Android system `SpeechRecognizer`, which may route audio to your device's configured system speech provider (such as Google Speech Services) in accordance with your OS provider's privacy policy.
* **Local File Import & System Share:** Importing local model files or attachments uses your operating system's local file picker. Exporting or sharing generated images or chat transcripts occurs only when you tap Share or Export and hands the selected file to the system share sheet.

## On-Device Safety Checks & In-App Content Reporting

* **On-Device Content Safety Filtering:** Prompt and output text safety checks and the fail-closed image safety classifier run **100% locally on your device**. Your prompts and generated images are never sent to an external moderation server.
* **In-App Content Reports (Stored On-Device Only):** You can tap **Report** on generated images (in Image Studio), saved images (in Image Gallery details), AI chat replies, and the system-wide text-selection (**Process Text**) sheet. Reports (surface, selected reason category, model identifier/name, local item identifier, optional notes you write, and a timestamp) are stored **only on your device** in local SQLite storage and are not automatically uploaded anywhere.
* **Immediate Local Removal:** Submitting a report immediately deletes a reported image from your device and hides a reported chat or text-selection output locally.
* **Optional Support Email Copy:** Inside the report sheet, you may optionally choose to tap **"Send Copy to Developer Support"**. That action opens your device's email app with a pre-filled draft to `dhruv.time@gmail.com` containing **only** the report reason, surface, model ID, and any optional notes you entered (never raw images, prompts, or chat transcripts). Sending the email is completely voluntary; if you send it, the Service Provider receives your email address and the details you chose to send solely to review the safety issue and improve the Application.

## Cookies and Tracking Technologies

The Application does not use web browser cookies, third-party advertising SDKs, advertising IDs, or cross-app behavioral tracking. Only the opt-in Firebase SDKs described above are included, and they remain disabled unless you turn them on in Settings. The Application does not sell or share personal information for cross-context behavioral advertising.

## Third-Party Access

The Service Provider does not sell your personal data. Apart from the third-party services described above (Google Firebase only if you opt in, Google Play Services, and user-initiated features such as Hugging Face or optional live web search), the Service Provider does not share data with third parties except:

* As required by law, such as to comply with a subpoena, court order, or similar legal process;
* When the Service Provider believes in good faith that disclosure is necessary to protect legal rights, protect your safety or the safety of others, investigate fraud or illegal activity (such as child sexual exploitation), or respond to a valid government request;
* With trusted service providers acting as processors on the Service Provider's behalf who do not have independent use of the information disclosed to them and are bound by appropriate confidentiality and data protection obligations.

## International Data Transfers

If you opt into Firebase telemetry or voluntarily email support, that data may be processed by Google LLC (Firebase) or the Service Provider in countries outside your country of residence, including outside the European Economic Area (EEA) and UK. Where required by applicable law, appropriate safeguards apply, such as Standard Contractual Clauses (SCCs) approved by the European Commission, adequacy decisions, or your explicit consent.

## Data Retention and Deletion

* **On-Device Data:** Chats, prompts, generated images, downloaded or imported models, preferences, Hugging Face tokens, and local in-app content reports remain on your device until you delete them in the Application, clear the Application's data in your device settings, or uninstall the Application.
* **Firebase Telemetry Data (If Opted In):** Retained by Google Firebase under Google's standard retention schedules (typically up to 90 days for Crashlytics crash reports and up to 2 to 14 months for Google Analytics event data, depending on project settings; aggregated statistics may be retained in anonymized form). You can disable telemetry anytime in Settings.
* **Support & Report Emails:** Emails you voluntarily send to `dhruv.time@gmail.com` are retained only as long as necessary to resolve your inquiry or safety report (typically up to 12 months, unless longer retention is required by law).

You may request access to, correction of, or deletion of any personal data held by the Service Provider (such as support emails you sent) by contacting `dhruv.time@gmail.com`. Data stored locally on your device is under your direct control and can be deleted inside the Application, by clearing app storage, or by uninstalling the Application.

## Your Rights (GDPR & Global Privacy Laws)

Depending on your location (including the EEA, UK, and similar jurisdictions), you may have the right to:

* Access and receive a copy of personal data processed about you;
* Request correction of inaccurate data or erasure of your personal data;
* Restrict or object to certain processing, or withdraw consent at any time (for example, by toggling **"Usage & Crash Reports"** off in Settings);
* Lodge a complaint with your local data protection supervisory authority.

To exercise any of these rights, contact the Service Provider at `dhruv.time@gmail.com`.

## Your California Privacy Rights (CCPA/CPRA)

If you are a California resident, you have the right to know what personal information is collected, the right to request deletion of personal information, the right to correct inaccurate personal information, and the right to non-discrimination for exercising your privacy rights. The Service Provider does **not** sell your personal information or share it for cross-context behavioral advertising. To exercise your CCPA/CPRA rights, contact the Service Provider at `dhruv.time@gmail.com`.

## Children's Privacy

The Application is **not directed to children under 13 years of age** (or such higher minimum age required by applicable law in your jurisdiction) and does not participate in Google Play's Designed for Families program. The Service Provider does not knowingly solicit or collect personally identifiable information from children under 13. If you are a parent or guardian and believe your child has provided personal information (for example, via email or enabled telemetry), please contact `dhruv.time@gmail.com` so the Service Provider can take steps to delete such information.

## Security

The Service Provider applies technical and organizational safeguards to protect information processed by the Application, including keeping AI inference and user content local to your device's sandboxed storage and using HTTPS/TLS encryption for optional network requests and opt-in Firebase telemetry. No method of electronic storage or transmission is 100% secure, and you are responsible for maintaining the security of your device.

## Data Breach Notification

If a security breach occurs that affects personal data held or controlled by the Service Provider, the Service Provider will notify affected users and relevant authorities as required by applicable law, including details on the nature of the incident and remedial steps taken.

## Changes to This Privacy Policy

The Service Provider may update this Privacy Policy from time to time. Updates will be posted on this page with an updated effective date. Where required by applicable law, the Service Provider will obtain consent before material changes take effect. Previous versions are available upon request at `dhruv.time@gmail.com`.

This Privacy Policy is effective and last updated as of **2026-11-25**.

## Contact Us

If you have questions about this Privacy Policy, your privacy rights, or data practices in AI Playground, please contact the Service Provider:

* **Developer:** Dhruv Patel
* **Email:** [dhruv.time@gmail.com](mailto:dhruv.time@gmail.com)
