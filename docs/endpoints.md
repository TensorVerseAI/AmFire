# AmFire integration map — non-secret

Reviewed 2026-10-15. Documented endpoints are not proof of configured credentials, account grants, device access or successful integration. No secret values belong here.

| Integration | Official route | Current state |
|---|---|---|
| Login with Amazon | `https://www.amazon.com/ap/oa`; `https://api.amazon.com/auth/o2/token`; `https://api.amazon.com/auth/o2/tokeninfo`; `https://api.amazon.com/user/profile` | Server adapter implemented; client ID, secret reference and registered redirect unverified/unset. Profile scope only. |
| Bee | `https://api.developer.bee.amazon.dev/v1/me`; `/v1/stream` | Production-data API; stream is SSE, optionally filtered by `types=new-utterance,todo-created`. Real Bee/Apple Watch data and grant required. No calls made. |
| Ring | `https://api.amazonvision.com/v1/devices`; `/v1/devices/{device_id}/media/streaming/whep/sessions`; `/media/video/download`; `/media/image/download`; token `https://oauth.ring.com/oauth/token` | Separate server-side linking required. Device IDs and returned media URLs must come from API responses. Download requests retrieve recorded media; they do not force recording. |
| Ring simulator | `https://developer.amazon.com/ring/console/playground` | Official console workflow; use issued temporary tokens, never invented URLs. No simulator run yet. |
| Fire Stick / Vega | Local SDK `@amazon-devices/kepler-media-controls`, participating endpoint discovery, session state and metadata | No universal HTTP capture endpoint. ID/title/position optional. Actual device/OS/player and authorized frame source unverified. No other-app capture. |
| NVIDIA | `https://integrate.api.nvidia.com/v1/chat/completions` | Model `nvidia/nemotron-3-nano-omni-30b-a3b-reasoning`; authorized server-side input required. No invocation from this public app. |
| Alexa retail shopping | `connection://AMAZON.BuyShoppingProducts/1` via `Connections.StartConnection` inside a custom skill | Pure contract adapter only. One eligible verified ASIN, consent, skill configuration/certification and real verified skill session required. No browser REST checkout. |
| Alexa+ MCP | Our approved HTTPS Streamable HTTP server URI | Not deployed; no universal Amazon endpoint or verified retail-checkout bridge. |
| Creators catalog | `https://creatorsapi.amazon/catalog/v1/searchItems`, `/catalog/v1/getItems`; separate client-credentials token grant | Requires qualified access and marketplace/partnerTag/issued credential-version configuration. Unset. Catalog access does not authorize checkout. Demo uses Amazon search links. |

LWA redirect must use the approved private backend HTTPS origin and `/auth/callback` path. It must match an existing approved security profile exactly. Session storage is in-memory and single-process. Use a suitable approved server host before enabling private app routes; static Pages cannot execute them.

Alexa response handling checks both `cause.status` and `cause.result` and correlates the opaque session token. Do not set `shouldEndSession` in the handoff response when expecting session resumption. A 200 status may contain an error; no callback here produces a fabricated order receipt. Customizable/size-dependent items are not assumed eligible. Alexa controls seller, final confirmation, payment and delivery address.

## Official references

- https://developer.amazon.com/docs/login-with-amazon/authorization-code-grant.html
- https://developer.amazon.com/docs/login-with-amazon/obtain-customer-profile.html
- https://docs.bee.computer/docs/api
- https://docs.bee.computer/docs/realtime
- https://developer.amazon.com/docs/ring/api-documentation.html
- https://developer.amazon.com/docs/ring/release-notes.html
- https://developer.amazon.com/docs/vega/0.24/media-controls-get-started
- https://developer.amazon.com/en-US/docs/alexa/alexa-shopping/implement-shopping-actions.html
- https://developer.amazon.com/en-US/docs/alexa/alexa-shopping/alexa-shopping-actions-for-alexa-skills-api-reference.html
- https://developer.amazon.com/en-US/docs/alexa/alexa-shopping/about-alexa-shopping-actions-for-alexa-skills.html
- https://www.developer.amazon.com/docs/alexaplus/add-ons/mcp-toolkit-quickstart
- https://affiliate-program.amazon.com/creatorsapi/docs/en-us/get-started/using-curl

No credentials, bearer URLs, private repository source or private customer data are included.

