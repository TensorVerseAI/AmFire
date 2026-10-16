# Interactive mockup release

The shared experience runs at `/app/` and in the website's Try AmFire drawer. Run `npm start`, then open http://localhost:4173/app/. No credentials or SDK setup are needed.

Flow: fictional Amazon account → conversational onboarding → simulated Bee connection → fictional Fire TV movie/wish → expandable illustrated catalog match → explicit recipient/size/price review → simulated confirmation → Ring-style notification and video → completion → family wish list → another gift. The chat supports price/size questions and contextual browse/review actions; it is deterministic, not an LLM.

Browser voice is optional, initiated by the microphone button with an explicit consent message and browser permission. Transcripts are reviewed before sending. Browser speech may use a remote browser service; this is not Alexa. Denial/unsupported browsers retain text input.

`public/demo-core.js` is the shared transition model. Invalid transitions and repeat confirmation are ignored. `public/demo.js` renders the interface. All state stays in memory; reload/restart resets. The service worker caches the application shell. No retail order, payment, push notification, account connection or model call occurs.

## Supplied demo media (v15)

The first wish is a red evening dress, size M, with a $49.99 illustrative price drawn from the supplied cart artwork. The recognition clip, cart artwork and doorstep story are user-authorized public demonstration media. They do not establish an exact product match, live price, payment method, shipping address, Ring recording or an actual purchase.

- /assets/demo-dress.mp4: five seconds, 1280×720; no decoded audio observed. The baked-in 98% match is a graphic, not measured inference.
- /assets/demo-cart.png: original supplied AmFire checkout illustration. Its shipping/payment details are static artwork. The form below controls the simulated recipient and size.
- /assets/demo-doorstep.mp4: 22.5 seconds, 1280×720, audio track observed; supplied family doorstep story. Replaces the original placeholder in the shared app.

Both clips have playback, replay and expansion controls. The cart image expands. These assets are cached for offline use with video byte-range responses. The main 143.915-second site presentation and six-second intro are unchanged by v15.

## Verification

Run `npm test` and `node tests/full-demo-browser.mjs`. Browser checks cover mobile/desktop/drawer, expandable images, changed recipient, video-ended completion, repeat purchase, text discussion and Settings preserving chat. The browser test is not evidence of native installation or Fire TV execution.

The existing cinema retains Start/fullscreen, Escape/minimize, the persistent Explore tab and the original media. No unwanted top Close has been restored.

## SDK/runtime inventory and remaining gaps

- Login with Amazon: optional browser adapter and mocked contract tests exist; configuration disabled. No developer client/profile verified. The interactive demo has no dependency on it.
- Alexa: actual `ask-sdk-core@2.14.0` installed in the separate private workspace; three synthetic SDK invocation tests passed. No skill deployment or shopping call. This does not prove Alexa+ integration.
- NVIDIA: no new model calls. Catalog matching is simulated.
- Bee/Ring: no live connection; synthetic wishes and supplied recorded demo media.
- Android SDK/ADB and cached Gradle are available. Connected Amazon device reports `tablet`, Android 11; other connected devices are phone/generic Android/Wear emulators. No verified Fire TV/Vega runtime.
- Vega SDK is not installed; its documented macOS/Ubuntu environment has not been established on this Windows host.

Competition Fire TV proof remains separate: the rules require execution on Fire OS/Vega hardware or the named Fire TV/Vega simulator and demonstration in the submission video. A desktop PWA or generic Android emulator does not satisfy that evidence requirement. No runtime eligibility claim is made.

No paid service, credentials, new grants, real purchases or shared Docker/security changes were used for this mockup.
