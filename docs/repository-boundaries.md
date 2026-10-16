# Public and private implementation boundaries

`TensorVerseAI/AmFire` is the public repository. GitHub branch visibility follows repository visibility: a branch in this repository cannot be private.

## Audit of current source

The current tree contains the public frontend, owner-provided branding and opening, synthetic artwork, public endpoint documentation, a generic Node server with optional Login with Amazon handling, a pure Alexa shopping directive builder, and mocked tests. No production Bee/Ring/VLM orchestration, real catalog matcher, credentials or customer dataset is implemented here. The tracked environment example contains placeholders. This is a source review, not a guarantee that all possible secret formats have been detected.

## Proposed isolated private repository

Use a separate private `TensorVerseAI/AmFire-Private` repository for future production orchestration: consent and account linking, Bee ingestion and retention, Fire TV media synchronization, authorized visual analysis, proprietary catalog ranking, recipient preferences, Ring event handling, production sessions and deployment configuration. Secret values belong in approved private runtime configuration, not either Git repository. This proposed repository/backend has not been created or deployed.

Keep the public frontend runnable with synthetic API contracts/mocks, setup instructions, contest description and reproducible tests. Publish only the API schemas and example data needed to integrate. The existing generic `server.mjs` and `integrations/alexa-shopping.mjs` can remain open reference implementations; production replacements should be authored privately. Moving their present contents later does not make their already-published history confidential or revoke the existing MIT grant. No history rewrite is proposed or performed.

Before a private implementation becomes part of the contest submission, provide judges the access required by the official rules and test the complete setup. Do not expose customer data or credentials to provide that access. Repository creation, collaborator invitations and backend provisioning are separate actions; none occurred during this UX correction.
