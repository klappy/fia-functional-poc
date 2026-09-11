# Source-foundation verification

Observed 2026-09-11. Initial code/data freeze: `0cb4acbf8b921fe518ed616d3f3776dc6737a155`; subsequent bounded correction pins the eight observed image bytes against future same-URL changes. Actual asset/content bytes are unchanged. Initial private repository identity/default-main readback was observed at `a56bda9394555deba29126e96b370b5cb2486923`. Repository creation and source foundation do not establish a functional guided PoC.

## Actual results

- `npm ci`: passed on Node 22.16.0; zero vulnerabilities reported by that install audit.
- `npm test`: 9 tests passed, zero failures. Negative cases change semantic data and recompute transport hashes, so failures exercise source identity as well as file integrity.
- `npm run verify:content`: passed: 130 source units, 39 pauses, 32 resources, eight actual assets, 23,246,971 delivered content/asset bytes (manifest itself not included in that total).
- `npm run build`: Vite 8.3.0 build passed. The entry explicitly says session/narration/offline are not implemented.
- All 32 resource canonical blobs/body hashes match accepted pins. Prior served-API body comparison is preserved: 29 exact bodies, three documented relative-thumbnail expansions. Video descriptions remain links; no video or thumbnail bytes fetched.
- Three pinned Scripture blobs match their expected SHA; all 39 selected verse plain texts independently occur in the previously captured served API response. See scripture-api-comparison.json. The exact canonical HTML and review/version fields remain in the pack.
- All 130 guide text-unit hashes, all 39 pause hashes and the S04-U017–U029 hidden-example boundary match the independently reviewed source contract. These are data constraints, not implemented UI stops yet.
- Latest observed Glass main remained `8d6b48dd93b6efa43305724a0cf320a85feabe5b`. B1 copies no Glass UI code or fonts.

## Actual image inspection

Each image was fetched over HTTPS from its source article URL, verified by magic bytes/dimensions/SHA, and displayed through the image inspection tool. Original image bytes are in public/assets/mark-1-1-13 and their complete digests are in the content manifest. This was native image rendering, not a browser/physical-phone/offline test.

| Asset | Dimensions | Observed display and selected purpose |
|---|---|---|
| a112.jpg | 1000×699 | River scene with vegetation and a person beside the water; article identifies Jordan River. Provides the selected river photograph without independently certifying location. |
| a111.jpg | 1000×563 | Arid, sparsely vegetated hills; appropriate to the source's wilderness/desert picture request. |
| a203.jpg | 1000×563 | Full-length figure visibly wearing sandals; source-associated general context image. |
| a204.jpg | 1000×563 | Close view of strapped sandals; relevant details visible. |
| c201.png | 3000×4000 | Aerial-style region map with readable Judea, Jerusalem, Jordan River and Galilee labels; source-requested regional context visible. |
| c202.png | 4000×3000 | Jerusalem city/landmark diagram, with readable Jerusalem, Temple and surrounding labels. |
| c197.png | 3000×4000 | Regional map visibly labels Jordan River, Galilee, Nazareth, Judea and Jerusalem. Supports the river/region cue. |
| c168.png | 3000×4000 | Regional map visibly labels Nazareth, Galilee, Jordan River, Judea and Jerusalem. A travel-route layer is part of the original asset, not added by the app. |

No conflicting restriction was visible on the displayed images. PNG text metadata contained only a Ghostscript generation comment. JPEG APP/comment rights-keyword inspection returned no matches; this is not exhaustive legal metadata analysis. See asset-metadata-inspection.json. Original bytes and supplied notices remain preserved. No geographic expertise or comprehensive rights-clearance claim is made. Detailed labels will require usable zoom in B2; full-image inspection does not prove readability at a phone's fit-to-width scale.

Map license_info names Biblica while adaptation_notice names Word Collective. Both original fields are retained verbatim in NOTICE.md, sources/metadata.json and each relevant pack item. That holder discrepancy is unresolved; no new conflicting asset-specific permission was observed.

## Boundaries and next gates

Source data and build foundation are working in this checkout. Guided interaction, audible narration, saved browser content, offline narration, accessibility/phone behavior and end-user outcomes are unimplemented or untested, assigned to later dishes. Mock/simulated negative data corruptions are explicitly tests, not evidence of real runtime errors. No microphone/audio experiment, source rewriting, AI backend or translation capture was added.

Actual PR checks and independent review/merge belong to the coordinator's later receipts; this document does not claim they have passed. The app author did not merge.

Regeneration correction: `sources/expected-assets.json` binds the eight actual inspected images; prepare and verify now reject upstream byte/dimension/URL drift. A ninth test changes an image and recomputes its manifest hash, then observes rejection against the independent source pin.

Final reproduction: ran `npm run prepare:content` again through the observed image pins, followed by all nine tests, verify and build. All passed. Only retrieval timestamps and their enclosing delivered-file digests changed; all eight original image bytes and canonical source bodies remained identical. The reproduced transfer report is prepare-output.json.txt.
