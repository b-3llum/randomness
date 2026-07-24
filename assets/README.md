# Assets

Swap these for your own brand files — filenames are referenced by the app, so
keep the names the same (or update the references noted below).

## `logo.svg`
The Bellum Security logo shown at the top of the sign-in card and used as the
browser favicon.

- **Referenced in:** `index.html` (`.brand__logo` and the `<link rel="icon">`)
- **Recommended:** an SVG horizontal lockup that reads well at ~24px tall.
- A PNG works too — just point `index.html` at your file
  (e.g. `assets/logo.png`) and, ideally, provide a 2× version for retina.

## `background.jpg`
The full-screen wallpaper behind the card.

- **Referenced in:** `styles.css` → `.backdrop`
- Drop a file named `background.jpg` here and it takes over automatically.
- Until you add one, a brand-neutral gradient renders as the fallback.
- **Recommended:** ~1920×1080 or larger, optimized (< ~400 KB). A darker image
  keeps the footer links and card readable; the CSS already lays a subtle dark
  overlay on top for contrast.

To use a different filename or format (e.g. `background.webp`), edit the
`background-image` line in the `.backdrop` rule in `styles.css`.
