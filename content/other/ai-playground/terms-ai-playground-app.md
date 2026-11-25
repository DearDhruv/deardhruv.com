+++
title = "Terms & Conditions - AI Playground"
date = "2026-11-25"
[ author ]
  name = "Dhruv Patel"
+++

## Terms & Conditions

These Terms and Conditions ("Terms") apply to the **AI Playground** mobile application (`com.deardhruv.llmplayground`) for mobile devices, together with any related services operated by Dhruv Patel (collectively, the "Application"). Dhruv Patel is referred to here as the "Service Provider".

By downloading, installing, or using the Application, you agree to be bound by these Terms. Please read them carefully before using the Application.

## Eligibility and Age Requirement

You must be at least **13 years of age** (or the age of majority or higher minimum age required by applicable law or store content rating in your jurisdiction) to use the Application. The Application is not directed to children under 13. If you are under 18 (or the age of majority in your jurisdiction), you may use the Application only with the consent and supervision of a parent or legal guardian who agrees to these Terms on your behalf.

## License to Use the Application

Subject to your compliance with these Terms, the Service Provider grants you a limited, non-exclusive, non-transferable, revocable license to install and use the Application on a compatible device you own or control for personal or internal business purposes. Except as expressly permitted by applicable law or any open-source license (such as Apache 2.0) that governs specific open-source components, you may not redistribute modified store packages, misuse the Application's trademarks or branding, or reverse engineer or extract proprietary build assets.

## Intellectual Property

The Service Provider retains all intellectual property rights in the Application's branding, design, trademarks, service marks, trade names, logos, and proprietary assets (the "IP"), subject to applicable open-source licenses for open-source components. Nothing in these Terms grants you any right to use the Service Provider's trademarks, logos, or branding without prior written permission. You agree not to remove, alter, or obscure any copyright, trademark, or proprietary notices in the Application.

## Acceptable Use Policy

AI Playground provides on-device generative AI capabilities (including text chat, custom personas/system prompts, system-wide text-selection actions, document processing, and image generation). You agree to use the Application lawfully, responsibly, and in compliance with these Terms and applicable platform policies.

You **MUST NOT** prompt for, generate, process, save, export, or distribute any prohibited or illegal content through any feature of the Application (including chat, image generation, negative prompts, custom personas, or system text-selection actions). Prohibited conduct and content include:

* **Child Sexual Abuse Material (CSAM) or Child Sexual Exploitation and Abuse (CSAE):** Strictly **zero tolerance** for any content that depicts, promotes, solicits, or sexualizes minors (whether real, fictional, illustrated, photorealistic, or AI-generated).
* **Sexually Explicit or Nude Content:** Pornography, sexually explicit text or imagery, depictions of sex acts, nudity, sexually suggestive poses, or content intended to be sexually gratifying.
* **Non-Consensual Intimate Imagery & Harassing Deepfakes:** Non-consensual sexualized imagery or text depicting real individuals, or deepfakes and synthetic likenesses of real people intended to deceive, defame, impersonate, or harass.
* **Graphic Violence and Self-Harm:** Gratuitous or graphic violence, gore, glorification of violence, credible threats, or instructions, encouragement, or depiction of suicide or self-harm.
* **Hate Speech and Harassment:** Content that attacks, demeans, dehumanizes, bullies, harasses, or incites hatred, discrimination, or violence against any individual or protected group.
* **Illegal Activity and Harm:** Instructions or assistance for illegal acts, terrorism, dangerous weapons or substances, fraud, phishing, malware, or infringement of third-party intellectual property, privacy, or publicity rights.
* **Bypassing Safety Filters:** Any attempt to bypass, disable, probe, or circumvent the Application's prompt filters, output filters, safety negative prompts, image safety classifiers, or model catalog/search filters (including via obfuscation, encoding, or adversarial prompting).
* **Misuse of Imported or Downloaded Models:** Importing local model files or downloading third-party models in order to generate prohibited content or circumvent safety rules.

AI Playground runs inference locally on your device and does not publish or host user-generated content to other users. If you export or share generated outputs outside the Application, you are solely responsible for ensuring that your use and sharing comply with these Terms and all applicable laws.

## On-Device AI Safety Safeguards and Limitations

To help prevent prohibited content, the Application applies layered **on-device safety safeguards** without sending your prompts or generated images to external moderation servers:

* **On-Device Prompt & Output Text Filtering:** Prompts, negative prompts (for anti-coverage bypass attempts), custom personas/system prompts, attachments/OCR/RAG chunks, optional web search queries, system text-selection inputs, and streamed/completed chat outputs are screened locally on your device.
* **Hidden Safety Negative Prompts:** For image generation models that support negative prompts, the Application automatically applies an internal, non-editable safety negative prompt in addition to any negative prompt you enter.
* **Fail-Closed Image Safety Classifier:** Every generated image is checked locally by an on-device image safety classifier (evaluating the full frame and center crop) before it can be shown, saved to the gallery, or exported. Unverified intermediate denoising previews are disabled, and any image that triggers the safety check or fails verification is blocked and discarded.
* **SFW-Only Curated Catalog & Source Filtering:** The curated image model catalog includes only SFW-oriented models, and Hugging Face Hub search and direct model download URLs filter out repositories tagged or named with adult, NSFW, or uncensored descriptors.

**No Filter Is Perfect:** Automated prompt filters, negative prompts, and machine-learning safety classifiers are probabilistic tools and **are not 100% accurate**. Safeguards may occasionally miss ambiguous or adversarial content (false negatives) or block benign inputs (false positives). On-device safeguards do not replace your judgment or relieve you of your obligation to follow the Acceptable Use Policy.

## In-App Content Reporting

If the Application ever produces output that you believe is sexually explicit, unsafe, offensive, illegal, or otherwise violates these Terms, you can flag it immediately using the in-app **Report** button available on:

* Generated image results (Image Studio)
* Saved image details (Image Gallery)
* AI chat assistant replies
* The system-wide text-selection (**Process Text**) sheet

When you submit a report:

* **Local Storage & Immediate Action:** Your report (reason category, surface, model identifier/name, local item identifier, optional notes, and timestamp) is stored **on-device only** in local SQLite storage. Reported images are immediately deleted from your device, and reported chat or text-selection outputs are permanently hidden locally.
* **Optional Developer Support Email:** Because the Application has no central content server, reports are not uploaded automatically. You may optionally tap **"Send Copy to Developer Support"** to open your device's email app with a draft to `dhruv.time@gmail.com` containing only the reason, surface, model ID, and any notes you wrote.
* **Direct Reports & Review:** You may also email safety reports directly to `dhruv.time@gmail.com`. The Service Provider reserves the right to review and address submitted reports, update safety rules or curated catalogs, remove non-compliant curated listings, and take appropriate enforcement action.

## User Responsibility for Prompts and Imported Models

* **Your Prompts & Inputs:** You are solely responsible for all prompts, custom personas/system prompts, documents, images, and voice inputs you provide to the Application, and for how you review, export, or use generated outputs.
* **Third-Party & Imported Models:** You may download models from curated listings, search and download community models from third-party hosts (such as Hugging Face Hub), or import local model files (such as `.gguf`, `.litertlm`, or `.task` files) from your device storage. Third-party models are created, hosted, and licensed independently by their authors, not the Service Provider. Your use of third-party models is governed by each model's own license and terms.
* **Uniform Application of Safeguards:** The Service Provider does not endorse, verify, or guarantee the safety, accuracy, or legality of third-party or user-imported models. On-device safety filters and classifiers apply uniformly to all models run in the Application, including community and user-imported models.

## AI Output Disclaimer

AI Playground uses local generative AI models that produce text and images probabilistically. **AI outputs may be inaccurate, fabricated, incomplete, outdated, biased, offensive, or inappropriate.**

* Outputs are provided for general informational, creative, and experimental purposes only and **do not constitute medical, legal, financial, engineering, or safety-critical advice**.
* The Service Provider does not verify, endorse, or assume responsibility for any AI-generated output or for any decisions, actions, or losses resulting from your use of AI outputs. You are responsible for independently verifying any output before relying on or sharing it.

## Enforcement and Termination

The Service Provider reserves the right to enforce these Terms, address safety reports, and protect users and platform compliance. Violations, particularly any attempt to generate CSAM/CSAE, sexually explicit or other prohibited content, or to bypass on-device safety filters, may result in:

* Immediate local blocking, deletion, or hiding of offending outputs within the Application;
* **Immediate suspension or termination of your license to use the Application without prior notice** if you violate applicable law, infringe third-party rights, breach the Acceptable Use Policy, or engage in conduct that could cause harm to others or the Service Provider;
* For other material breaches capable of cure, written notice and 14 days to remedy the breach before termination;
* Cooperation with law enforcement or regulatory authorities where illegal content (such as CSAM) is reported or required to be disclosed by law.

Upon termination, your license and right to use the Application end immediately, and you must stop using and delete all copies of the Application from your devices.

## Third-Party Services

The Application connects to or integrates certain third-party services (each governed by its own terms and privacy policies):

* [Google Play Terms of Service](https://policies.google.com/terms) (including Play Feature Delivery for optional GPU acceleration module downloads, Play In-App Updates, and Play In-App Review)
* [Google Analytics for Firebase](https://www.google.com/analytics/terms/) (only if you opt in via Settings)
* [Firebase Crashlytics & Performance Monitoring](https://firebase.google.com/terms/crashlytics) (only if you opt in via Settings)
* [Hugging Face Terms of Service](https://huggingface.co/terms-of-service) (when searching, signing into, or downloading community models)

If you explicitly enable optional live web search in Settings/chat, search queries are sent to external search providers (DuckDuckGo, Wikipedia, and Google News), which operate independently of the Service Provider.

## Device Security, Connectivity, and Updates

It is your responsibility to maintain the security of your device and access to the Application. The Service Provider advises against jailbreaking or rooting your device, which can expose your device to malware, compromise security, and cause the Application or its safety and hardware features to malfunction.

While core AI inference runs offline, optional features (such as model downloads, Hugging Face search, optional live web search, optional GPU engine downloads, app update checks, and opt-in telemetry) require an active internet connection. You are responsible for any mobile carrier, Wi-Fi, or roaming data charges incurred.

The Service Provider may modify, update, or discontinue the Application or its features at any time and does not guarantee compatibility with all operating system versions or hardware. You should install offered updates to maintain compatibility, security, and safety controls; older versions may stop functioning or lose support. Nothing in these Terms limits non-waivable rights under mandatory consumer protection laws.

## Disclaimer of Warranties and Limitation of Liability

TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, THE APPLICATION IS PROVIDED **"AS IS"** AND **"AS AVAILABLE"** WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, ACCURACY, OR NON-INFRINGEMENT.

To the fullest extent permitted by law, the Service Provider shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including lost profits, data loss, or business interruption, even if advised of the possibility of such damages.

Nothing in these Terms excludes or limits liability for:

* Death or personal injury caused by negligence;
* Fraud or fraudulent misrepresentation;
* Any other liability that cannot be excluded or limited under applicable law.

To the fullest extent permitted by law, the total liability of the Service Provider for any claim arising out of or relating to the Application or these Terms shall not exceed the amount paid by you to the Service Provider for the Application in the 12 months preceding the claim, or the minimum amount permitted under applicable law if the Application is provided free of charge.

## Indemnification

To the fullest extent permitted by law, you agree to indemnify and hold harmless the Service Provider and its affiliates, officers, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or directly related to your breach of these Terms (including the Acceptable Use Policy), your misuse of the Application, or your violation of applicable law or third-party rights. This indemnification does not apply to claims arising from the Service Provider's own negligence, breach of these Terms, or violation of applicable law, and is limited as required by mandatory consumer protection laws.

## Governing Law and Jurisdiction

These Terms are governed by the laws of the jurisdiction in which the Service Provider is established, excluding conflict-of-law rules, except to the extent mandatory consumer protection laws in your country of residence provide otherwise. Any dispute arising out of or relating to these Terms may be brought before a court of competent jurisdiction under applicable law.

## DSA Notice (Digital Services Act)

AI Playground operates primarily as an on-device client application rather than a cloud hosting or public intermediary platform. To the extent any aspect of the Application or related service qualifies as an intermediary service under Regulation (EU) 2022/2065 (the Digital Services Act, "DSA"):

* **Point of Contact:** EU authorities and recipients may contact the Service Provider at `dhruv.time@gmail.com`.
* **Notice and Action & Moderation Reasons:** Notices of allegedly illegal content or safety issues sent to `dhruv.time@gmail.com` will be acknowledged and reviewed promptly, with human review where appropriate, and affected users notified of moderation decisions and redress options in accordance with Articles 16 and 17 of the DSA.
* **Dispute Settlement & Reporting:** Applicable out-of-court dispute settlement rights under Article 21 and transparency reporting requests under Article 24 of the DSA are supported via `dhruv.time@gmail.com`.

## Severability and Entire Agreement

If any provision of these Terms is held invalid, illegal, or unenforceable by a court of competent jurisdiction, that provision will be modified to the minimum extent necessary to make it valid and enforceable, and the remaining provisions will remain in full force and effect. These Terms, together with the [Privacy Policy](/other/ai-playground/privacy-policy-ai-playground-app/), constitute the entire agreement between you and the Service Provider regarding the Application.

## Changes to These Terms

The Service Provider may update these Terms from time to time by posting the revised Terms on this page with an updated effective date. Continued use of the Application after updated Terms take effect constitutes acceptance of the revised Terms where permitted by law. Previous versions are available upon request at `dhruv.time@gmail.com`.

These Terms & Conditions are effective and last updated as of **2026-11-25**.

## Contact Us

If you have any questions, safety reports, or suggestions regarding these Terms and Conditions, please contact the Service Provider:

* **Developer:** Dhruv Patel
* **Email:** [dhruv.time@gmail.com](mailto:dhruv.time@gmail.com)
