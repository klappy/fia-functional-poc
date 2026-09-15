# FIA harness — bounded gap audit

Status: proposed local planning evidence, 2026-09-15. No app test was executed by this audit. File SHAs below are Git blobs returned from main, not repository commit IDs. Current release evidence is documentary, not a new deployment verification.

## Current baseline is not fully green

Parent directly observed GitHub Actions run [35009407049](https://github.com/klappy/fia-functional-poc/actions/runs/35009407049) on exact main 8121c11 failed. Unit/content/build passed; E2E returned 133 passed, 1 failed: tests/spanish-visual-audio.spec.js selected offline pack excludes historical audio and cold-plays new raw fallback description. Expected currentTime > 0.1, received 0 after 5000ms. Root cause unknown: product, test or environment; this audit did not reproduce. Prior head 42b260ed CI passed per parent receipt. Reconcile through the existing active service before creating duplicate repair. Documentary release/integrity evidence does not erase this current failure.

## Findings

| Area | Observed foundation | Planning gap |
|---|---|---|
| Release | Cookbook STATE and current narration status identify 0.1.17, app commit 8121c11e16c65d06ae29163e452c8ea661d8e921 and documented 462-file integrity readback. | Direct auditory review remains unverified. Playback completion is not listening or comprehension. |
| Tests | CI runs unit tests, content verification, build and Chromium E2E. package.json separately defines audio and PWA checks. | Inventory other workflows before concluding audio/PWA lack coverage. Map tests to scenarios and risks, not only totals. |
| Devices | Playwright config sets headless 390×844 local browser and fixture/offline servers. | Physical devices, screen readers and field usability remain unverified by these sources. |
| Personas | Six cookbook roles explicitly remain unvalidated hypotheses. Parent coordinator reports observing both pages of the completed stakeholder persona/test-plan document through Monday native preview. | The document is a more specific planning input than generic role hypotheses; reconcile rather than substitute. It proposes field groups, not completed field validation. This auditor received the parent's observation receipt and did not independently inspect the attachment. |
| Learning | Journey J-05 describes focused exercises, synthesis, authorized decisions and participant retest. | Actual exercises and current owners/thresholds are not filled. Separate agent simulation from human outcomes. |
| Harvest | PROCEDURE already specifies revisions, deduplication, original access, proposed claims, independent projection review and supersession. | It explicitly establishes no automatic harvest or monitoring. Trigger, cursor, restart, authorization, work reconciliation and receipts need design. |
| Release authority | RELEASE requires coordinator review, exact CI and deployment/readback; app instructions prohibit author self-release. | Meeting interpretation needs explicit mapping to authorized actions; utterances do not automatically authorize scope or releases. |
| Source boundaries | Cookbook is public; no raw transcripts, quotations, meeting titles or source identifiers; independent exact-text projection review. | Resolve authorized private evidence home before durable rich ingestion. Neutral coordination must not duplicate product knowledge. |

## Drift and preserved obligations

VALIDATION calls its September 14 section current; STATE and NARRATION-MEDIA-STATUS supersede it with September 15 release evidence. Route a governed correction. Preserve immutable original acceptance obligations and historical receipts; do not revive old numerical totals or narration-unavailable claims as current.

## Source ledger

| Repository/path (main read) | Observed blob SHA |
|---|---|
| [cookbook STATE](https://github.com/klappy/fia-app-cookbook/blob/main/STATE.md) | 1dfcfe1b8e19a54deafd9bf0c0de46315543aa8d |
| [current release status](https://github.com/klappy/fia-app-cookbook/blob/main/poc/NARRATION-MEDIA-STATUS.md) | d5e59ae3033b2ef72dda683d5216c5ff1d04bdba |
| [personas](https://github.com/klappy/fia-app-cookbook/blob/main/product/PERSONAS.md) | 1f3bec336e2a587d05079d1ff6f70019c18766f6 |
| [journeys](https://github.com/klappy/fia-app-cookbook/blob/main/product/JOURNEYS.md) | ecd69df03a62ff3f7c0ed1a50eb9b11fef830dad |
| [validation](https://github.com/klappy/fia-app-cookbook/blob/main/poc/VALIDATION.md) | 7d45a4aec2f029adda162bfeabf41c4225366a13 |
| [harvest procedure](https://github.com/klappy/fia-app-cookbook/blob/main/harvest/PROCEDURE.md) | d4fd64f89c66a17bb55151dd5101c1e89cb8d3ea |
| [cookbook contribution rules](https://github.com/klappy/fia-app-cookbook/blob/main/AGENTS.md) | 14ec54e51f076708bafc401c0da4a9d64b91340d |
| [app instructions](https://github.com/klappy/fia-functional-poc/blob/main/AGENTS.md) | 9ec20f0a20f2218f2c3ef2679dd9c1a5e31b2d63 |
| [package scripts](https://github.com/klappy/fia-functional-poc/blob/main/package.json) | 9fc9129459e686f8429de493fcfb77daee8b2c66 |
| [CI](https://github.com/klappy/fia-functional-poc/blob/main/.github/workflows/ci.yml) | 45d1e40086b40c49a07786511789311a909ec21b |
| [Playwright](https://github.com/klappy/fia-functional-poc/blob/main/playwright.config.js) | 8b63c386ce3dcd2d17fa384acc7d6fd1207f8c5e |
| [release binding](https://github.com/klappy/fia-functional-poc/blob/main/RELEASE.md) | 6f879f6161810f91ced273761d7d54276341968b |

## Stakeholder document receipt (private)

Parent coordinator observed both pages of asset 3249891675 V1 on completed board item 12913410992, board 18428475335. [Authorized original](https://etenlab.monday.com/boards/18428475335/pulses/12913410992?asset_id=3249891675). Filename FIA-App-Persona-and-Testing-Plan copy.docx; title FIA-Only App: Design Persona and Testing Plan. No file checksum available; observation relayed to this audit, not independently repeated. Do not copy this metadata or semantic extract into public coordination.

Planning implications from that receipt: shared-device group and multiple-device co-use (without inferring live synchronization); audio/visual and tactile engagement; active beginning-middle-end guidance; resource-only engagement without recording/revision distractions; low-power and interrupted connectivity; audio-led comprehension. The document proposes two field groups; their participation and outcomes are unverified. Identifying participant/context details are excluded here.

Read-only audit limits: no exhaustive repository/code/test inventory, house prior-art search, current rail deduplication, independently repeated stakeholder attachment inspection, fresh audio observation or participant research. Absence in this bounded source set is not proof of absence everywhere.
