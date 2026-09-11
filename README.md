# FIA functional PoC

A runnable English Mark 1:1–13 experience: six source-guided steps, intentional discussion stops, three Scripture versions, contextual resources, prepared synthetic narration and verified offline saving. **Delivery is partial:** real playback and offline operation pass; human-heard narration quality has not been verified. This is one passage, not the complete FIA product.

## Run

Requires Node >=22.12 (tested 22.16.0), npm and private repository access. Normal setup uses committed content/audio and makes no paid generation calls or runtime API-key requests.

```sh
git clone https://github.com/klappy/fia-functional-poc.git
cd fia-functional-poc
npm ci
npm test
npm run verify:content
npm run verify:audio
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

Open http://127.0.0.1:4173. Keep that terminal running. If the port is occupied, choose another port explicitly; saved browser data belongs to that origin. This is a local preview, not a hosted or monitored service. No account sign-in is needed inside the app.

For browser verification: `npx playwright install chromium`, then `npm run test:e2e`. The default suite expects ports 4173/4185; stop other test servers or use an isolated test configuration. [Independent delivery evidence](evidence/DELIVERY.md) records the clean checkout, actual versions, launch and full test results.

## Use

Use Play beside the current guide, selected Scripture or available term. Guide narration stops at the next source discussion/activity boundary. Use Continue when ready; resource exploration, tab changes and opening/closing maps keep the current narration playing. An intentional new Play, version, step or section selection replaces or stops it. Possible drama responses appear only after Show source example. Pause/Resume works within a recording; reloading restores the guide unit and version, not an audio timestamp. Finish records an explicit choice after visiting all six steps, not understanding or learning.

Open Offline passage and choose Save for offline before disconnecting. Saved means every required file passed transfer and cached readback checks. The full pack is about 88.7 MB, including141 prepared MP3s (120 guide/Scripture and21 terms) and eight original images. Online video links and optional network fonts are excluded. Reloading online can show Update available; the previous saved pack stays until a complete replacement succeeds. Browser storage eviction remains possible. Check saved files revalidates; Remove saved passage removes its cache, retaining the shell and local position.

## Boundaries and support

- Working: source-backed guide/Scripture/resources,113 visible activities representing117 ordinary source units and39 raw stop records (38 stop-bearing groups),32 resource associations, source/output-verified audio playback and160-file offline pack. See the detailed matrix in [DELIVERY](evidence/DELIVERY.md).
- Unverified: human-perceived online/offline voice quality, exhaustive pronunciation, physical phones, screen readers and full browser/OS restart. Desktop320/390px and keyboard/large-text tests are narrower evidence.
- Unsupported here: microphone commands or recording, translation production/checking/upload, shared sessions, AI answers, original human guide recordings and video playback/download.

Prepared ElevenLabs audio is explicitly synthetic. Browser voices are an optional fallback. No credentials or synthesis service are needed at runtime; do not run the maintenance generation script during setup. Future synthesis is a separately bounded operation, with changed-input/uncertain-attempt holds. Quota and provider-internal billing are unknown.

Read [NOTICE](NOTICE.md), [UPSTREAM](UPSTREAM.md) and the [selected source pack](https://github.com/klappy/fia-app-cookbook/blob/2d90436c80b0c5aa2f18bc7594347b1d6244e704/poc/SOURCE-PACK.md). Source-specific attribution and adaptations remain intact. Conflicting map-holder metadata is preserved, not resolved into blanket legal clearance. Source fidelity is not theological or geographic certification. Generated voice media stays in this private app; it is not published with cookbook findings.

The complete pinned Generative Glass CSS and actual shared components supply the visual system, including aurora, glass surfaces and resource cards. App wrappers supply source, accessibility and event behavior. Optional network Noto fonts and unavailable SF font binaries fall back locally; expected missing-SF build warnings do not mean those fonts shipped. The original image assets remain; no experimental image compression was adopted.

For a failure, retain the visible error, app commit, browser/version and exact reproduction steps in the private repository issue. Source errors fail explicitly; no substitute content is generated. Product findings belong in the [FIA cookbook](https://github.com/klappy/fia-app-cookbook); claims, gates and final verdict remain in the authorized kitchen records. Never attach private conversations or credentials.

Current contextual-playback checkpoint: floating Guide/Scripture/Resources tabs, per-card playback with measured per-clip time, and a focused current-step section index. A subsequent holistic composition checkpoint compacts the header/context, places term controls inside their cards and keeps guide actions stable while source text scrolls. Independent visual acceptance remains pending.

The active source/Pause action and thin real progress now stay in a matching floating glass dock beside navigation (stacked at narrow widths); card-corner Play starts that source. Dialogs expose the same owner while the page is inert. Current pack:141 recordings,160 files,88,711,558bytes. Existing voice remains the default after a limited user comparison; full-passage and offline heard-quality verification remain pending.

Compact transport revision: the dark source-labeled action toggles playback; a thin actual progress track replaces visible time numerals, with accessible timing semantics. Restart is a direct44px icon action. Failed recording errors remain visible at their source.

Four literal pause-only cues attach to their preceding activities. Legacy cue positions restore to that activity with cue state; Continue moves to the next activity. Group counts are8/12/25/16/45/7. All original source and141 recordings remain; natural spoken transition replacements are a separate pending change.
