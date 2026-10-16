# Connected proof of concept

Goal: real Amazon authentication, real Fire TV media context, authorized NVIDIA image identification, and a supported Alexa/product handoff. These are not currently connected in the public demo. No production payment system is needed for this proof of concept.

| Connection | Available implementation/evidence | Smallest missing setup |
| --- | --- | --- |
| Amazon sign-in | Optional server authorization-code flow; mocked authentication checks | Existing approved LWA security profile and exact allowed origin/callback, plus an approved Node backend location. Static GitHub Pages cannot execute the callback. No client configuration is installed in this workspace. |
| Fire TV | Official Vega media-client API research; generic Android platform tools | Actual Fire TV model/OS/build or official simulator, authorized developer connection, and a participating media endpoint. No compatible execution has been verified. |
| NVIDIA | Prior synthetic label and empty-scene responses; lookalike test unresolved | An authorized real input paired with actual Fire TV context and explicit approval for another bounded provider call. Credential presence alone is not a live connection. |
| Alexa/product | Pure Shopping Kit directive builder, no requests | Existing eligible custom skill/skill ID, enabled Shopping Kit and verified ASK handler, eligible ASIN and supported user handoff. Browser speech is not Alexa. No actual skill configuration or execution is verified. |
| Bee / Ring | Demo story only | Separate account/device access and consent; Amazon login grants neither. |

Local metadata inspection on October 16 found no workspace Amazon client configuration and no `.ask` or `.vega` user configuration directory. Android platform tools exist. Browser discovery failed before any tabs were available, so developer-console account state is unknown. No secrets were read or copied, credentials created, persistent access expanded, provider calls made, or paid hosting provisioned by this update.

The owner/parent should identify the existing LWA security profile and approved backend target first, then the Fire TV model and existing Alexa skill. If none exist, request specific authorization for the necessary registration or deployment before acting. Do not repurpose unrelated project hosts or credentials.

The public phone sample is intentionally small: illustrative family gift suggestion, Yes, an original synthetic doorstep animation, and a success check. It always states that no real order or delivery occurred. Settings lists each service separately and only labels Amazon connected after the server confirms an authenticated session; installing the PWA confers no connection.

Official references: [Vega media clients](https://developer.amazon.com/docs/vega/0.24/media-controls-get-started), [Alexa Shopping Actions](https://developer.amazon.com/en-US/docs/alexa/alexa-shopping/implement-shopping-actions.html). Optional media metadata does not guarantee title/position from every player. A Shopping Kit transport return does not prove an order. Do not confirm a real simulator purchase or bypass capture restrictions for a demo.
