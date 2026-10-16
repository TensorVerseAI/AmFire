# AmFire. Surprise, surprise.

Public presentation, responsive marketing page, installable PWA shell and a phone-style interactive sample. Built independently for TensorVerseAI.

## Run

Node.js 20 or newer. No runtime dependencies.

```sh
npm start
npm run check
npm test
```

Open http://localhost:4173. Start requests fullscreen on the application shell, keeping the options menu visible over the video. Skip intro goes directly to the presentation stage. The visible side tab and navigation open the explanation page, pause/mute the video, and show a replay thumbnail. Leaving fullscreen does the same. Unsupported browsers receive a full-window player. Replay is manual; there is no idle replay timer.

## Media

`public/media.json` selects opening, presentation and sample media. `presentation.src` is null until the commercial is supplied. Start or Skip requests playback with sound when configured; browser rejection presents an explicit play control. The included owner-supplied `amfire-opening.mp4` is the six-second opening, not the final commercial. Replace the manifest source/title/description and preview status when the final presentation arrives. `scene.svg` is original synthetic artwork, not a captured Fire TV frame or a photo of a real product.

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


