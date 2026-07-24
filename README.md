# Bellum Security — Sign-in Portal

A clean, self-contained sign-in front-end for **Bellum Security**. It uses the
familiar enterprise SSO layout — a centered card over a full-screen wallpaper
with a two-step **identifier → password** flow — built entirely with original
markup and styling and your own branding.

## What's here

```
index.html        Sign-in page (two-step flow, accessible markup)
styles.css        All styling (brand color + card/wallpaper layout)
script.js         Step navigation + validation. One integration point.
assets/
  logo.svg        Placeholder Bellum Security logo — replace with yours
  background.jpg  (add your own) full-screen wallpaper; gradient fallback until then
  README.md       How to swap the assets
```

## Run it

It's static — no build step. Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Make it yours

1. **Logo** — replace `assets/logo.svg` with your file (see `assets/README.md`).
2. **Wallpaper** — drop your image at `assets/background.jpg`.
3. **Brand color** — change `--brand` (and `--brand-hover`) at the top of
   `styles.css`.

## Connecting real authentication

This repo is the **front-end only**. It intentionally does not authenticate
anyone, and it does not store, log, or transmit credentials anywhere. All the
form does on its own is validate input and move between the two steps.

To make sign-in actually work, wire up **one function**: `submitCredentials()`
in `script.js`. Point it at your identity provider and let the provider do the
real work. Recommended options:

- **Microsoft Entra ID (Azure AD)** via [MSAL.js](https://learn.microsoft.com/entra/identity-platform/msal-overview) — redirect/popup OIDC; you typically hand off to Microsoft's hosted page rather than collecting passwords yourself.
- **OpenID Connect / OAuth 2.0** against your own IdP (Keycloak, Okta, Auth0, etc.).
- **Your own backend** — POST to an HTTPS endpoint on your server that verifies
  credentials and sets a session cookie.

### Security notes

- Always serve over **HTTPS** and post credentials only to **your own** origin.
- Prefer a redirect-based OIDC flow (or **passkeys**) so raw passwords never
  pass through client JavaScript at all.
- Add server-side rate limiting, lockout, and MFA at the identity provider.
- The `console.info`/demo stubs in `script.js` are placeholders — replace them
  before going live.
