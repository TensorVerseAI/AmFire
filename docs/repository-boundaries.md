# Public and private implementation boundaries

`TensorVerseAI/AmFire` is the public repository. GitHub branch visibility follows repository visibility: a branch in this repository cannot be private.

## Audit of current source

The current tree contains the public frontend, owner-provided branding and opening, synthetic artwork, public endpoint documentation, a generic Node server with optional Login with Amazon handling, a pure Alexa shopping directive builder, and mocked tests. No production Bee/Ring/VLM orchestration, real catalog matcher, credentials or customer dataset is implemented here. The tracked environment example contains placeholders. This is a source review, not a guarantee that all possible secret formats have been detected.

## Separate private repository

The separate private [TensorVerseAI/AmFire-Private](https://github.com/TensorVerseAI/AmFire-Private) repository is established for future production orchestration: consent and account linking, Bee ingestion and retention, Fire TV media synchronization, authorized visual analysis, proprietary catalog ranking, recipient preferences, Ring event handling, production sessions and deployment configuration. Secret values belong in approved private runtime configuration, not either Git repository. GitHub visibility was verified as PRIVATE. Its initial commit `8a4c24c97fec537aee105ade7f05661b08590fc3` contains documentation and ignore rules only; no proprietary backend implementation exists yet and no backend is deployed.

Keep the public frontend runnable with synthetic API contracts/mocks, setup instructions, contest description and reproducible tests. Publish only the API schemas and example data needed to integrate. The existing generic `server.mjs` and `integrations/alexa-shopping.mjs` can remain open reference implementations; production replacements should be authored privately. Moving their present contents later does not make their already-published history confidential or revoke the existing MIT grant. No history rewrite is proposed or performed.

Before a private implementation becomes part of the contest submission, provide judges the access required by the official rules and test the complete setup. Do not expose customer data or credentials to provide that access. The separate private repository was created with explicit owner authorization. No collaborator invitations, credentials, backend provisioning or paid services were created.
