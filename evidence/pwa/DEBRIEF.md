# PWA packaging review cargo

Implemented the accepted PWA plan at `/tmp/fia-pwa-planning` under the existing packaging ticket (fire 86318677). The app now has a manifest, four raster sizes of the pinned official FIA symbol, and install guidance using the existing GlassButton/settings surface. Installation and passage saving are separate states; only the existing English Mark 1:1–13 pack is claimed available.

## Validation

- Production build and privacy/release verification passed: 200 required files, 93,619,239 bytes; 202 allowlisted public files; all 172 narration MP3 hashes unchanged.
- Unit tests: 44/44 passed. Offline integration/upgrade tests: 4/4 passed.
- Actual persistent Chromium profile saved the pack, reopened its page, restarted the browser profile offline, retained theme/edition/progress, played offline audio, and did not autoplay. Removing the pack preserved workspace progress and did not claim a saved pack.
- Install event UI test used an explicitly simulated beforeinstallprompt event; dismissal consumed the prompt once. This is not OS installation evidence. Fresh unsaved offline navigation failed rather than inventing available content.
- All four icons decoded at their prescribed dimensions with opaque pixels. Official source hashes and maskable safe-area measurements are in ICON-SOURCES.json; visual review includes icon-review.png and settings screenshots. CSS zoom screenshot is a CSS fixture, not physical browser zoom.
- Physical iPhone/Android installation remains unverified. No physical device, public browser bypass, paid generation, or Spanish-runtime availability is claimed.

## Narrow correction and integration

A failing regression demonstrated that metadata commit failure could replace the shell pointer while preserving the old active pack. The existing service worker now restores the prior shell pointer before reporting failure. The before/after regression logs document this repair; no second caching engine was introduced.

App.jsx has only two intentional changes: save stops pending playback/fallback and checkpoints progress; failed passage loading explains that an open shell does not imply a saved passage. Preserve the independently reviewed player/shared-design changes when integrating.

## Driver-seat check and learning

A returning offline user needs both their saved passage and their place in it; installation alone is insufficient. The actual profile restart test exercises that path. A dismissed installation prompt must not become a false installed badge. Source metadata alone was insufficient to prove icon usability, so actual decoded pixels and small/masked renderings were inspected. The metadata failure test exposed a consistency boundary that the original happy-path save test missed; retain that regression.

## Accounting

Prior interrupted author work is conservatively charged 6 minutes, retained without reset. Resumed at 2026-09-12 12:52:04 UTC. Final charge will be reported with the PR handoff within the existing author20/root7/coord3 allowance. Independent root review is separate; root reports icon review PASS using 1 of 7 review minutes. This cargo is ready for the remaining independent review, not a deployment receipt.
