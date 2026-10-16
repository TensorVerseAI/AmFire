# Interactive mockup release

The shared experience runs at `/app/` and in the website's Try AmFire drawer. Run `npm start`, then open http://localhost:4173/app/. No credentials or SDK setup are needed.

Flow: fictional Amazon account → conversational onboarding → simulated Bee connection → fictional Fire TV movie/wish → expandable illustrated catalog match → explicit recipient/size/price review → simulated confirmation → Ring-style notification and video → completion → family wish list → another gift. The chat supports price/size questions and contextual browse/review actions; it is deterministic, not an LLM.

Browser voice is optional, initiated by the microphone button with an explicit consent message and browser permission. Transcripts are reviewed before sending. Browser speech may use a remote browser service; this is not Alexa. Denial/unsupported browsers retain text input.

`public/demo-core.js` is the shared transition model. Invalid transitions and repeat confirmation are ignored. `public/demo.js` renders the interface. All state stays in memory; reload/restart resets. The service worker caches the application shell. No retail order, payment, push notification, account connection or model call occurs.

## Replaceable delivery media

Replace `/assets/demo-delivery.webm` with Johnny's approved clip (or update its source in `public/demo.js` and the service-worker cache list). Keep the placeholder disclosure until replaced, and label a supplied recording as a recorded demo clip unless an actual Ring integration is independently verified. Increment the cache version on release. Do not imply the app caused camera recording.

## Verification

Run `npm test` and `node tests/full-demo-browser.mjs`. Browser checks cover mobile/desktop/drawer, expandable images, changed recipient, video-ended completion, repeat purchase, text discussion and Settings preserving chat. The browser test is not evidence of native installation or Fire TV execution.

The existing cinema retains Start/fullscreen, Escape/minimize, the persistent Explore tab and the original media. No unwanted top Close has been restored.

## SDK/runtime inventory and remaining gaps

- Login with Amazon: optional browser adapter and mocked contract tests exist; configuration disabled. No developer client/profile verified. The interactive demo has no dependency on it.
- Alexa: actual `ask-sdk-core@2.14.0` installed in the separate private workspace; three synthetic SDK invocation tests passed. No skill deployment or shopping call. This does not prove Alexa+ integration.
- NVIDIA: no new model calls. Catalog matching is simulated.
- Bee/Ring: no live connection; synthetic wishes and original delivery animation.
- Android SDK/ADB and cached Gradle are available. Connected Amazon device reports `tablet`, Android 11; other connected devices are phone/generic Android/Wear emulators. No verified Fire TV/Vega runtime.
- Vega SDK is not installed; its documented macOS/Ubuntu environment has not been established on this Windows host.

Competition Fire TV proof remains separate: the rules require execution on Fire OS/Vega hardware or the named Fire TV/Vega simulator and demonstration in the submission video. A desktop PWA or generic Android emulator does not satisfy that evidence requirement. No runtime eligibility claim is made.

No paid service, credentials, new grants, real purchases or shared Docker/security changes were used for this mockup.
