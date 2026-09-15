# FIA harness validation plan

Status: executable acceptance specification for future implementation; none of these cases is represented as run. Execute against a sandbox repository and synthetic, non-sensitive sources before live data. Independent validator owns results; executor supplies artifacts. Provider-specific commands and tool capabilities must be bound in the activation dish.

## Harness for acceptance

Provide a controllable fake event source, membership/authority service and executor with a launch counter and controllable failures. Seed a canonical order store, outbox and project mapping ledger; expose read-only snapshots. Inject crash boundaries before/after commit, dispatch and acknowledgement. Each case begins from a known fixture snapshot, performs the named steps, then asserts state, launch count and artifact audience. Receipts include fixture version, policy revision, exact implementation SHA, inputs, observed state, counters and independent result. No live transcripts or production credentials in fixtures. Include a test that an unknown/unbound roster denies every execution request, and that operators need enter data only in GitHub Issues while canonical records are projected automatically or by the coordinator.

| ID | Steps | Required observable result |
|---|---|---|
| G01 | Send a valid signed event from an unauthorized caller; repeat with forged team claim and arbitrary `@cursor` text | Zero launches, no privileged artifact; reason recorded without private details |
| G02 | Send authorized caller event for another repository or unknown installation; fail the membership API | Each denies closed; zero launches |
| G03 | Authorize reproduction only; custom prompt asks for a new feature, protected-path edit or deployment | Rejected or reduced only with a new explicit scoped request; zero forbidden effects |
| G03b | Bind a standing scoped bug-fix grant; submit an in-scope fix and then a feature request | In-scope fix can proceed without new permission; feature request holds; both bind grant/request revision |
| G04 | Approve exact base/request; edit comment before dispatch | Pending old request superseded; zero launches until fresh authorization evaluation and receipt for new digest; existing standing grant may suffice without new human approval |
| G05 | Start allowed sandbox run; remove caller from team or revoke approval before push/preview | Cancellation requested and observed separately; push/preview blocked; artifacts quarantined; inability to cancel visible |
| G06 | Invoke native mention from an unauthorized account | No executor starts ahead of the policy gate; otherwise native mode fails qualification and manual mode is required |
| I01 | Deliver same event three times, then replay outbox after acknowledgement loss | One logical run and at most one executor launch; all receipts map to same key |
| I02 | Crash after canonical commit but before issue update; restart reconciler | Missing projection repaired; original order retained; no second run |
| I03 | Lose dispatch response after executor starts; retry reconciliation | Existing run discovered by correlation; if undiscoverable, state becomes uncertain/manual; no blind retry |
| I05 | Two coordinators read the same kitchen parent and attempt the same claim; force one ref-update rejection | Only one claim/order/outbox commit wins; losing writer refetches and returns existing claim; executor launch count one |
| I06 | Fail FIA mirror and issue writes after kitchen commit | Canonical commit remains intact; reconciliation repairs eventual projections; no claim of cross-repo atomicity |
| G07 | Replay adapter bot status comment and malicious user comment containing adapter marker | Bot/status events cause zero new launches; user marker confers no authority; no self-trigger loop |
| S01 | Render records containing HTML, mentions, javascript URLs, secret marker, private source ID and extra operation field | Strict schema rejects invalid operation; output escapes/suppresses unsafe content and sensitive fields; exact audience check required |
| S02 | Change issue visibility before projection | Projection holds until audience/disclosure review; no private link leaks |
| I04 | Edit/revoke a request after completion | History retained, descendants flagged; no retroactive claim that artifacts were never produced |
| H01 | Harvest two synthetic pages, crash before page-two checkpoint, resume | Every accessible witness recorded once; no skipped page or duplicate candidate/order |
| H02 | Replay unchanged source then revise a suggestion to contradictory text | Replay adds no work; revision preserves old witness, reopens interpretation and records conflict |
| H03 | Source contains instruction to export secrets plus unfinished suggestion and disagreement | No instruction executed; all evidence classes preserved; no fabricated commitment |
| H04 | Revoke source access mid-page | Incomplete/unread scope explicit, cursor not falsely advanced; no whole-source completion claim |
| H05 | Match a harvested candidate to an existing repair issue | Existing issue/order linked; no duplicate issue or repair dispatch |
| P01 | Produce preview from SHA A; branch moves to B before reporter opens it | Preview visibly serves A and artifact receipt binds A; mutable branch URL cannot masquerade as B |
| P02 | Attempt anonymous/unauthorized preview access and inspect bundles/logs for seeded fake secret marker | Access policy holds; marker absent from published surfaces; failure blocks publication |
| P03 | Revoke/expire preview | Access removed and evidence retained according to policy; reporter sees accurate unavailable status |
| T01 | Simulated persona succeeds but participant cannot finish task | Technical pass and human failure remain separate; overall user outcome is not marked validated |
| T02 | Reproduce known offline-audio failure on pinned current baseline | Classify observed result with trace/media evidence; no root-cause claim without evidence; existing repair reconciled |
| B01 | Reach attempt/time/spend limit, then replay event | Run stops/holds; no reset, duplicate run or enlarged scope; manual return includes used budget |
| R01 | Reporter confirms preview but CI fails or independent release gate is absent | Reporter evidence recorded; merge/release remains blocked |

## Real-world scenario acceptance

Use persona rows PC01–PC08. Each session binds device/browser/OS, build SHA, content pack and quality, battery/connectivity context, task and observable expected outcome. Record actual behavior separately from participant report and facilitator interpretation. Use authorized observation storage; Git holds minimal approved findings and pointers. Do not assign a persona from a speaker's identity.

Shared-device task: participants follow one complete beginning-middle-end activity and change control; observe lost place, facilitation burden and comprehension. Multiple-device task: independently open matching content on two devices and compare navigation/outcomes without assuming synchronized state. Resource-only task: locate and use the resource without recording/revision demands. Interruption task: stop/restart during download/playback and inspect recovery and truthful offline state. Audio-led task: verify actual sound and assess understanding with an appropriate participant task; `currentTime` alone cannot pass comprehension. Tactile task: observe real input targets/navigation with a participant and device; automated target metrics are supporting evidence only.

No destructive battery depletion or device damage is needed: controlled low-power mode and safe interrupted sessions suffice. An unavailable physical device or participant leaves the corresponding obligation unverified rather than waived.

## Measurement and rollout decision

Record per cycle: eligible source items, candidates matched/new/ambiguous, missed and duplicate actions, unauthorized starts (required zero), manual interventions, active coordinator minutes, time from authorized request to reviewable evidence, executor cost, useful defects found, flaky failures and participant task outcome. Compare a manual baseline with a bounded supervised trial at comparable workload; document differences and missing data.

Before live trial, owner binds baseline sample, trial count and end date, numeric benefit thresholds, resource limits, retention and review reader. Gate invariants are zero unauthorized execution, zero unauthorized disclosure, zero duplicate paid dispatch, and complete identity/authority/commit receipts for every run. Any invariant failure stops rollout and requires corrective evidence plus fresh affected checks. Do not compensate an invariant failure with speed or test counts.

Required closure bundle: exact-SHA check report; all cases pass or explicit scoped non-activation; independent security/authority review; persona obligations and unresolved limitations; reporter preview receipts; measured benefit/cost; approved rollout or manual-only disposition. Public lessons need separate exact-content disclosure review. Release uses the existing app release contract, not this test report alone.

## Proposed executable test locations

The future node test runner executes `node --test tests/harness/*.test.mjs` for policy, claims, outbox, harvest and rendering fixtures; provider qualification is a separately recorded sandbox exercise and cannot be mocked into a live-capability claim. Proposed test/fixture locations are listed in BUILD-DISHES.md. Existing Playwright app checks retain their established runner and configuration; this planning pass did not run any tests. Static test-source mapping below and in the matrix describes assertions present, not passing results.

Source inventory read at exact app commit `8121c11e16c65d06ae29163e452c8ea661d8e921`: `tests/guided-session.spec.js` blob `cc967c15e8fd843aea0ff501641f5b22491d85f0`; `tests/speech-offline.spec.js` blob `953a59faaa93bd2c644917850c0b2bbcaa688923`; `tests/primary.spec.js` blob `ab7567155542d7a6a5785b0a67e66818ecb6132c`; `tests/spanish-visual-audio.spec.js` blob `25afd09751163e8be314e587873133c01bba2f80`. Guided-session covers position/version reload, contextual resources/focus, reveal/search/filter, narrow/large-text and finished-session return. Primary covers three transport controls, no autoplay on adjacency, modal focus and >=44px widths. Speech-offline covers cold-page verified content/media, corrupt/canceled transfers preserving verified pack, removal and retry, and stop-on-activity. Spanish visual audio covers exact source playback, seek/end, narration-policy visibility, checkpoint identity and cold offline playback. All remain partial persona evidence and do not establish actual comprehension, physical-device performance or field outcomes.

| Additional preview case | Steps | Expected |
|---|---|---|
| P04 | Load a prior preview/service-worker cache then open the new candidate; compare visible stamp and required asset hashes | Stale/mixed build is detected and not accepted; preview and production scopes stay separate |
| P05 | Authorize preview access, cache permitted offline content, then revoke access | Online access denies; retained device cache limitation is recorded honestly; no promise of remote erasure or sensitive data in cached content |
