# Teja ManiKumar · Portfolio

A space-themed, responsive portfolio featuring direct links to five published Android apps and games, and the developer's public source repositories.

The orbital canvas is a visual illustration—not a scientific orbital simulator. The ten-second Tap Speed browser challenge is a separate miniature demonstration, not a port of the Android game. The solar demo reproduces an actual early HTML example from the developer's public `saikumar1982/Level-Up` repository.

## Run

This is a static website. Open `index.html` or serve the repository root with any static file server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Project/link policy

- Google Play app cards link to the precise package IDs supplied by the developer; no source button is shown for private/unverified code.
- Public repository cards link only to the verified repository for that project, not a generic profile.
- App and repository visuals are clearly labelled **illustrative**. Official app screenshots are accessed on each Google Play listing; none are fabricated or scraped.
- Research projects are described as *in progress*, with no unsupported claims about physical validation.
- `media/another space img.jpg` is the existing space background from the original portfolio; the site's CSS and canvas continue to work without it.
- A legacy music file remains in the repo for history, but is intentionally not embedded in the revised website because redistribution rights were not verified.

## Checks

Run `node --test tests/portfolio.test.mjs` to check names, links, card inventory and classifications without network access. For browser interactions, see `tests/browser-check.mjs` (uses Playwright if installed).
## Live example

`demos/solar-system.html` is copied from [`saikumar1982/Level-Up/solarsystem.html`](https://github.com/saikumar1982/Level-Up/blob/main/solarsystem.html), as a standalone example that visitors can launch without leaving the portfolio. This animated scene is not a scientific simulator.
