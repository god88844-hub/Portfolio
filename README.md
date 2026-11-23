# Teja ManiKumar · Cosmic Portfolio

This is a **theme-faithful restoration**, not a visual redesign. The original user-supplied HTML portfolio is the styling and layout foundation.

## Visual identity intentionally preserved

- The **entire first CSS stylesheet** is byte-for-byte identical to the original uploaded portfolio source.
- The original deep-space photo reference: `media/another space img.jpg`, already retained in the repository.
- Original palette: cyan `#00f2ff`, purple `#bd93f9`, gold `#ffcc00`, and pink `#ff79c6`.
- Original orbiting solar-system hero, twinkling star canvas, translucent project cards, typography, stat bar, educational section, and visual rhythm.
- Additional functional elements are scoped to a **second stylesheet** using the original color variables.

## Functional improvements

- Corrected owner name: **Teja ManiKumar**, including metadata and page title.
- 5 direct Google Play releases, 8 actual public source repositories across both GitHub accounts.
- 13 searchable/filterable cosmic project cards and project details dialog.
- 10-second tapping mini-game (a browser example, not a copy of the full Android game).
- Launchable original solar-system HTML demo at `demos/solar-system.html`.
- Responsive mobile navigation and accurate project descriptions.
- No links to unrelated TejaAlla repositories or invented contact information.

Card visuals are decorative **not actual app screenshots**; official product imagery is available on Google Play. Research software is not represented as physically validated.

## Run and verify

This is a static HTML site. Open `index.html` or serve it using a static web server. Run:

```bash
npm test
```

The GitHub workflow runs these checks on PRs and pushes to `main`.


## Original soundtrack restored

The original **Deep Space Sound Stream** player uses the existing `media/audio khaleja.mp3` with native play/pause/volume controls, looping, and its original download link. Audio does not autoplay. Verify that you have distribution rights for this recording before publicly hosting or offering it for download.

## Original solar animation retained

The animated 2D solar-system canvas is kept exactly as it was before the Three.js enhancement, with the original background, palette, layout, and source JavaScript untouched. No Three.js runtime or 3D controls are loaded.
