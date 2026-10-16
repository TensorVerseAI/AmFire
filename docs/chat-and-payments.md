# Chat, speech and purchase boundaries

The guest sample and authenticated app share an independently written dark chat UI. Text responses are scripted, not an Alexa conversation. Images and videos expand in a viewer; local attachments stay in the tab, are not uploaded, and are released on reset or page exit. Playing one video pauses and mutes other media. No microphone opens when the Alexa availability sheet is selected.

The installed app starts at `/app/`. A server session is required for `/api/me`, `/api/chat/context` and every private test-purchase route. Static Pages shows the unconfigured sign-in gate and never grants a private session. Production hosting and identity configuration remain pending.

## Speech

`public/speech-provider.js` is a provider interface returning an explicit unavailable/account-required state. No browser TTS is labeled Alexa. General third-party PWA Alexa speech embedding has not been verified. Alexa+ rich media works in Alexa's host with appropriate access; a certified skill Quick Link is a launch mechanism, not an embedded speech SDK.

- https://developer.amazon.com/en-GB/alexa/alexa-voice-service
- https://developer.amazon.com/docs/alexaplus/add-ons/home.html
- https://developer.amazon.com/en-US/docs/alexa/custom-skills/create-a-quick-link-for-your-skill.html

## Wallet and US$0.99 fee

The wallet is explicitly disconnected and test-only. Example retail subtotal is US$49.00, AmFire service fee is US$0.99, and unknown tax/shipping are excluded from the displayed known amount. There is no balance, saved payment method, actual charge or retail order. Amazon's retail amount must never be charged again by AmFire.

No supported production fee-collection path is configured or approved. Shopping Kit does not collect the AmFire fee. A separately authorized payment processor for an eligible service is only a proposed architecture, subject to commercial eligibility and user approval. Legacy Alexa-skill Amazon Pay is deprecated; website Amazon Pay is separate. No existing BotBoozle wallet route was verified in the scoped local metadata inspection, and no private code or credentials were copied.

`public/test-wallet.js` defines synthetic state. `integrations/test-purchases.mjs` provides single-process serialized atomic file snapshots. Each attempt retains an ID, marketplace, nullable ASIN (unverified in the synthetic catalog), fee disclosure/consent, test handoff token and stable processor idempotency key. A repeated event cannot capture twice. Retail confirmation and fee capture are distinct; cancellation, failure and unknown/timeout outcomes do not capture. A fee failure after retail success never retries retail. Fee refund has its own pending/confirmed states. These simulated events are not evidence of real purchase or settlement.

For local authenticated test use only, set `TEST_PURCHASES=true` and `AMFIRE_TEST_STORE` to a private writable test-data file outside the public directory. These routes require the session, matching Origin and an action header. Without explicit configuration they return unavailable. Production money movement has no implementation. Atomic snapshots are not a distributed payment ledger; multiple processes require a transactional store before use.

No Alexa simulator purchase confirmation was invoked: those confirmations can charge a real account. Shopping Kit's callback does not supply a complete order/settlement/refund lifecycle, and HTTP 200 is not purchase proof.

- https://developer.amazon.com/en-US/docs/alexa/alexa-shopping/alexa-shopping-actions-for-alexa-skills-api-reference.html
- https://developer.amazon.com/en-US/docs/alexa/ask-overviews/deprecated-features.html
- https://www.developer.amazon.com/docs/alexaplus/add-ons/payments
- https://www.developer.amazon.com/en-US/docs/alexa/alexa-shopping/test-shopping-actions.html
