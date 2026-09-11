# FIA functional PoC — guided session

A working English Mark 1:1–13 six-step guide uses the verified source pack: explicit discussion stops, three Scripture versions, contextual maps/images/terms, online video links, optional source examples and device-local position. Prepared ElevenLabs narration and verified offline saving are implemented. Browser voices remain an optional fallback; independent audible-quality acceptance is still separate from playback events. This is one preliminary passage experience, not the complete FIA corpus.

## Run the guided session

Node 22.16.0 was used (Node >=22.12 required).

```sh
npm ci
npm test
npm run verify:content
npm run verify:audio
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

Open http://127.0.0.1:4173. This command starts a local preview; it is not a deployed or continuously monitored service. For isolated browser checks, run `npx playwright install chromium` then `npm run test:e2e`. These use a separate automated browser context and do not alter your preview session.

The generated pack is in `public/content/mark-1-1-13/`; eight original images are in `public/assets/mark-1-1-13/`. The manifest records actual hashes, dimensions and bytes. It is content provenance, **not proof that the browser saved the passage offline**.

## Reproduce the source pack

```sh
npm run prepare:content
npm run verify:content
npm test
npm run build
```

Preparation needs a network connection. It fetches only the pinned canonical source files, selected English metadata and eight image assets. The 32 one-hop associations include 21 terms, four images, four maps and three **online-only video links**; video bytes and thumbnails are never fetched. Three Scripture versions each contain all 13 verses. Guide segmentation preserves 130 source units, 39 pauses and a hidden example region revealed only by an explicit session action. Failed source/digest validation prevents publication from staging. Preparation replaces only this passage's generated directories and updates its exact source notices.

Read [NOTICE.md](NOTICE.md) and [UPSTREAM.md](UPSTREAM.md). Map metadata names different holders in its supplied license and adaptation fields; both are retained, and the discrepancy is unresolved. Actual asset inspection found no visible conflicting notice; this is not comprehensive legal or geographic certification. No theological correctness, audience validation or complete FIA-corpus claim is made.

## Remaining acceptance

Primary later runtime target: headed Chrome 152.0.7977.83 on macOS 26.2 build 25C5048a, reobserved at B3; 320/390px responsive checks. Playwright Chromium is separate automation. Physical phones remain untested. Actual audible quality requires independent observation; successful decoding and playback events do not prove what a listener heard.

Source tests and evidence are in [evidence/source-foundation.md](evidence/source-foundation.md). The [accepted cookbook plan](https://github.com/klappy/fia-app-cookbook/blob/2d90436c80b0c5aa2f18bc7594347b1d6244e704/poc/PLAN.md) and kitchen gates govern the next dishes. No private conversations, translation recording, runtime AI backend or credentials are included. Normal install/build/preview uses committed recordings and makes no paid synthesis calls.

Visual coherence uses the complete pinned Generative Glass CSS and actual shared components within the current guide/navigation structure. [Matched reference evidence](evidence/visual-coherence/READBACK.md) records all four views, source bindings and necessary wrappers. Earlier flat-white visual acceptance was withdrawn; FIA identity did not authorize removing aurora. The full font stylesheet is retained, with external Noto imports and system fallbacks; eight unavailable SF binaries are not included, and their build warnings are documented. Offline Scripture font fallback has been rendered and inspected; unavailable SF files and external Noto availability are not implied by the stylesheet.

B3 partial runtime evidence is in [evidence/b3/READBACK.md](evidence/b3/READBACK.md). `npm run build` emits a finite offline shell manifest. Save is verified by actual cache readback; optional network fonts/video are excluded. The full pack includes120 source-bound MP3 files. Selected recordings are hash-verified before native audio playback; browser voice events and localService flags are not audible-quality proof. Do not rerun synthesis during normal setup: the maintenance generator enforces cumulative request caps and holds uncertain or changed-input regeneration for review.
