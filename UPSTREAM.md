# Upstream bindings

Accepted product/source plan: klappy/fia-app-cookbook at `2d90436c80b0c5aa2f18bc7594347b1d6244e704`, `poc/PLAN.md`, `SOURCE-PACK.md`, `CUE-MANIFEST.json`, `RESOURCE-PATHS.json`.

Generative Glass inspected binding: `klappy/bt-design-system-generative-glass@8d6b48dd93b6efa43305724a0cf320a85feabe5b`. B2 copies GlassSurface.jsx, GlassButton.jsx and GlassChip.jsx from `components/glass/`, and colors.css, typography.css, spacing.css, radius.css, elevation.css, glass.css and motion.css from `tokens/`, verbatim under `src/vendor/glass/`. The inspected upstream has no root LICENSE file; no MIT or other license grant is asserted. This private same-owner reuse follows the accepted kit binding; public redistribution clearance is unverified. No illustrative app behavior is copied. App CSS supplies accessibility/focus, responsive sizing and system-font overrides. Use system fonts; no unverified font binaries or runtime font CDN.

Public content sources are pinned in `sources/revisions.json`. `sources/expected-resources.json` records canonical paths, original blob/body hashes and prior API-wrapper body-comparison evidence. `sources/expected-cues.json` binds every source unit and stop. `sources/expected-scripture.json` binds three pinned Mark source blobs and each selected verse. Generated content preserves source metadata/notices and transforms only display paths/segmentation. See `NOTICE.md` for supplied terms.

No legacy app backend, framework, conversation code or private source material imported. Sites portable profile reported configured=false; explicit delegated Git/local-only workflow retained, with no Site registration or hosting.

`sources/expected-assets.json` binds the eight actually fetched and inspected original image bytes/dimensions/URLs. Regeneration fails if an unversioned upstream URL changes its bytes; updating those pins requires a new reviewed asset inspection.
