# FIA functional PoC — source foundation

B1 prepares the real English Mark 1:1–13 source pack for a bounded six-step FIA experience. The current screen is a build entry only: guided session interaction, narration and offline saving are **not implemented yet**.

## Run the foundation

Node 22.16.0 was used (Node >=22.12 required).

```sh
npm ci
npm test
npm run verify:content
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

Open http://127.0.0.1:4173. This command starts a local preview; it is not a deployed or continuously monitored service. `npm run test:e2e` is reserved for subsequent browser acceptance tests, not a passing B1 result.

The generated pack is in `public/content/mark-1-1-13/`; eight original images are in `public/assets/mark-1-1-13/`. The manifest records actual hashes, dimensions and bytes. It is content provenance, **not proof that the browser saved the passage offline**.

## Reproduce the source pack

```sh
npm run prepare:content
npm run verify:content
npm test
npm run build
```

Preparation needs a network connection. It fetches only the pinned canonical source files, selected English metadata and eight image assets. The 32 one-hop associations include 21 terms, four images, four maps and three **online-only video links**; video bytes and thumbnails are never fetched. Three Scripture versions each contain all 13 verses. Guide segmentation preserves 130 source units, 39 pauses and a hidden example region for the later session UI. Failed source/digest validation prevents publication from staging. Preparation replaces only this passage's generated directories and updates its exact source notices.

Read [NOTICE.md](NOTICE.md) and [UPSTREAM.md](UPSTREAM.md). Map metadata names different holders in its supplied license and adaptation fields; both are retained, and the discrepancy is unresolved. Actual asset inspection found no visible conflicting notice; this is not comprehensive legal or geographic certification. No theological correctness, audience validation or complete FIA-corpus claim is made.

## Remaining acceptance

Primary later runtime target: headed Chrome 152.0.7977.83 on macOS 26.2 build 25C5048a, reobserved at B3; 320/390px responsive checks. Playwright Chromium is separate automation. Physical phones remain untested. Actual audible narration and offline data/audio require later independent observation; tool/API availability is not proof.

Source tests and evidence are in [evidence/source-foundation.md](evidence/source-foundation.md). The [accepted cookbook plan](https://github.com/klappy/fia-app-cookbook/blob/2d90436c80b0c5aa2f18bc7594347b1d6244e704/poc/PLAN.md) and kitchen gates govern the next dishes. No private conversations, translation recording, AI backend, credentials or paid service are included.
