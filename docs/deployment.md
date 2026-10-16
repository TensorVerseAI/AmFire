# Deployment

Public repository: `TensorVerseAI/AmFire`. Public site: https://amfires.com/ on GitHub Pages.

Public hosting candidate: GitHub Pages for the public synthetic demo only, on a branch containing `public/`. This avoids introducing paid infrastructure or modifying another project's host. Private server routes remain unavailable until an approved Node host and LWA configuration exist. Do not treat display-mode or a static app page as authentication.

GoDaddy authoritative nameservers: ns37.domaincontrol.com / ns38.domaincontrol.com. Initial apex A was Parked; www CNAME was @. Preserve NS, _domainconnect CNAME and _dmarc TXT, and re-read the complete zone before/after any scoped change. For Pages, configure repository custom domain first, then only apex A and www CNAME. Require valid HTTPS for service-worker installation and private auth. Do not claim propagation or TLS from an API acceptance alone.

No existing AmFire-specific S3, Amplify or CloudFront host was found in inspected account inventory. No unrelated host was repurposed and no paid infrastructure was created.

Production Node hosting should bind an explicitly chosen interface behind HTTPS, set PUBLIC_ORIGIN exactly, and keep client secrets out of the repository. The local server intentionally binds loopback. Before scaling beyond one process, use approved shared session storage and ingress rate limits. No session data survives restart.

