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


## Original soundtrack and Three.js hero (2026)

- Restores the existing original `media/audio khaleja.mp3` soundtrack and its original audio controls/download action. Audio starts only when the visitor presses play, and loops by user choice.
- Adds a real 3D Three.js scene over the original solar-system hero: orbiting sphere meshes, lit planet surfaces, Saturn rings, procedural stars and an asteroid belt, with drag and zoom.
- Preserves **the complete original CSS stylesheet byte-for-byte** and only adds scoped style declarations to the existing second stylesheet. Original page background, colors, layout, fonts and project showcase remain unchanged.
- The original animated 2D canvas runs if Three.js is unavailable or WebGL fails; the new module is a progressive enhancement.
- The 3D import is version-pinned and loaded via jsDelivr. Rendering is throttled offscreen and when the tab is hidden, limits pixel ratio, and respects reduced-motion preferences.

The audio recording was already part of the repository; verify you have the necessary rights to distribute it, including through the download link.
