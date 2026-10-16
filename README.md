# AmFire. Surprise, surprise.

Public presentation, responsive marketing page, installable PWA shell and a phone-style interactive sample. Built independently for TensorVerseAI.

## Run

Node.js 20 or newer. No runtime dependencies.

```sh
npm start
npm run check
npm test
```

Open http://localhost:4173. Start requests fullscreen on the application shell, keeping the options menu visible over the video. Skip intro goes directly to the presentation stage. Tapping the large presentation video pauses/mutes it, moves the same video into a replay thumbnail, and slides the explanation page into view. The persistent side tab and Explore AmFire open/close the guest chat over that page. Leaving fullscreen does the same. Unsupported browsers receive a full-window player. Replay is manual; there is no idle replay timer.

## Media

`public/media.json` selects the separate six-second opening, owner-supplied main presentation with voiceover, and sample media. The original MP4s are served unchanged from static assets. Start or Skip requests main playback with sound; browser rejection presents an explicit play control. Main presentation loops; minimizing or opening chat pauses and mutes the same video. `scene.svg` is original synthetic artwork, not a captured Fire TV frame or a real product photo.

## Integration boundaries

The sample is scripted, uses synthetic data and sends no messages to a model. It links to a real Amazon product-category search, not a fabricated ASIN or live price. It never purchases anything. Fire Stick is the intended viewing source; no other-app screen capture is implemented. Device model, OS, player participation, media identity and authorized image access must be verified before integration claims.

`integrations/alexa-shopping.mjs` constructs a documented custom-skill directive only. It is not exposed as a shopping endpoint and makes no requests. An eligible verified ASIN, explicit consent, enabled Shopping Kit, certified skill and verified ASK request handler are required. The chosen product must satisfy Amazon's eligibility rules; customizable/size-dependent products are not assumed eligible. Alexa handles its retail confirmation/payment/address flow. An HTTP/status 200 return is never represented as an order receipt. No Alexa+ retail checkout bridge is claimed.

## Authentication

Public pages, sample and installation require no login. `/app` shows a private-app sign-in gate. `/api/me` requires a server-side session regardless of browser display mode. Optional Login with Amazon uses authorization code + PKCE S256, cookie-bound one-use state, server token exchange, audience/expiry verification and a short-lived HttpOnly session. Provider tokens are discarded; only user ID/name/email are retained in memory for one hour. Restarting the server signs users out. No MFA attestation is inferred.

Set `PUBLIC_ORIGIN`, `AMAZON_CLIENT_ID` and `AMAZON_CLIENT_SECRET` only through approved server configuration. Register the exact HTTPS callback on the approved private backend origin; static Pages cannot handle it. Do not create credentials or grants merely to run the demo. Missing config fails closed. Public static hosting runs only the public demo: server authentication requires a separately approved Node host. No API or auth response is service-worker cached.

## Release and review

See `docs/endpoints.md`, `docs/review-plan.md`, and `docs/deployment.md`. Tests use synthetic OAuth responses and make no provider calls. This repository contains no provider credentials or live inference calls.

Code: MIT. Brand/video ownership exceptions: BRANDING.md. Google Fonts are served remotely (DM Sans and Manrope, SIL Open Font License); system fonts are fallbacks. No analytics SDK or private project code is included.

## Competition and repository ownership

Official project: https://github.com/TensorVerseAI/AmFire. See [competition information](docs/competition.md) and [public/private boundaries](docs/repository-boundaries.md).



## Connected proof-of-concept sample

The guest sample shows a family gift suggestion, Yes, a clearly simulated doorstep clip, and a large success check. No real purchase or delivery occurs. Advanced test-wallet and attachment controls are hidden from this simplified sample. The installed app shows honest service status and only reports Amazon connected after a server-confirmed session. See [connection setup and blockers](docs/connected-poc.md). Run focused browser checks with `node tests/poc-browser-check.mjs` and `node tests/cinema-browser-check.mjs`; neither invokes a real provider.


Browser checks require Playwright and Microsoft Edge installed locally; the application itself has no runtime package dependencies.

