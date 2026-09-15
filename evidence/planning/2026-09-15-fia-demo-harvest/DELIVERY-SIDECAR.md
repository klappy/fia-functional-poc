# Next-delivery sidecar

## Recommendation — coherent UX design before patches

**Operator correction:** the 40 topics are traceable observations and acceptance cases, not 40 implementation tickets. The earlier piecemeal core-fix framing is superseded. Preserve a fixed visual/runtime baseline, then commission a bounded diagnosis and interaction design by a competent UX designer. A coherent candidate should address shared causes across whole journeys; implementation follows reviewed design in coherent vertical slices.

September 22 is a proposed internal-candidate target, September 29 a fallback, subject to design findings and capacity. Neither is a delivery promise. The meeting separately reported September 25 alpha, October 7 feedback, October 8 beta and first-week October field testing; owner/calendar reconciliation remains necessary. No snapshot or design order changes those dates.

## Root-problem hypotheses and proving cases

These are hypotheses to test, not established root causes or six new implementation tickets.

| Shared system | Feedback cases | Diagnosis/design outcome | How to challenge it |
|---|---|---|---|
| Primary navigation and action hierarchy | 3, 4, 5, 22, 23, 25, 32 | One coherent hierarchy for recommended action, secondary navigation and recovery across the whole journey; accessible layout and cues | Fresh user advances, deliberately skips/returns and reaches resources without coaching, on small/large-text/poor-screen conditions |
| Unified progress and playback state | 6, 15, 20, 21, 26 | Explicit state map for playing, stopped-for-discussion, completed playback, next-ready, backtracked and resumed; stage versus within-stage progress | Look away and return; replay/backtrack; no surprise sound or claim that listening means comprehension |
| Semantic guide structure and overview | 3, 8, 16, 21, 24, 27 | Meaningful activity chunks and list boundaries; guided flow with a considered overview tradeoff, not sentence-by-sentence screens | Run full dramatization and discussion, preserve lists/stops; compare overview usefulness against process-bypass risk |
| Consistent media affordances | 9, 10, 11, 13, 14, 15 | Distinct image-open/audio-play behavior, direct zoom/return and consistent long-audio control, with content-context links | Open/zoom/return on phone; seek long resource, handle partial timing and avoid incidental playback |
| Offline installation and readiness | 18, 19, 22, 23, 33, 36 | Assisted install/download/restart journey with accurate saved/update/storage expectations | Actual designated device cold-starts offline and completes required flow; no silent removal of needed content |
| Content provenance and confidence | 2, 12, 17, 28, 30, 31 | Understandable independent text/audio/description provenance and review status | Unfamiliar user can distinguish source, generated fallback and missing content without knowing a voice or backend label |

Cross-cutting and operational cases remain in the all-topic disposition table below. Multiple cases can test one shared design; one case may challenge several systems without becoming duplicate work.

## Proposed diagnosis/design dish — not yet cooking

After baseline evidence is pinned, a separately ordered and gated UX dish should deliver: current whole-journey/state map; observed failures versus root-cause hypotheses; coherent interaction specification and reviewable prototype; mapping of all 40 IDs to design, acceptance or explicit defer/context; persona-based walkthroughs; and independent competent design review. The coordinator must verify the designer's capability and availability rather than appoint a generic coding worker by title. Preserve contrary views and compare alternatives before converging.

Only an accepted design produces implementation orders. Split by coherent vertical journeys or shared components/state behavior, never mechanically by the 40 symptoms. Existing PR37–39 retain their owners; reconcile their effect with the baseline and design, without silently halting or rewriting them.

## Proposed cutline if capacity is tight

First establish coherent action/progress/media/guide behavior in a reviewable candidate. Actual offline cold-start and large-text regression evidence remain readiness gates for the selected field candidate. Include representative provenance clarity; broader replacement content, extra modes, expansion and architecture remain week-two/deferred work. This sequences diagnosis and design, not one-off patches, and is not proof the scope fits a week. Reduce scope visibly before weakening field-readiness evidence.

## Smallest attention request

One bundled scope/date review only if required to authorize the next build orders: confirm this core/fallback boundary and resolve any conflict with the externally expected alpha/field dates. Chris need not individually approve routine fixes covered by established scoped authority. Named content, field and release owners must accept their own work; their acceptance is not invented here. A final candidate review should show evidence and remaining gaps together. Present unresolved guided/overview and primary-flow alternatives in a reviewable preview, not an abstract questionnaire; do not require the overview choice to block a scoped core fix. No recurring meetings, assumed minutes or new attention budget are proposed.

## Delivery groups and all-topic disposition

Numbers refer to DELIVERY-CHECKLIST.md, which retains source spans, uncertainty, proposed owner, dependency and individual retest. Owners below are proposed roles, not assignments. “Core” below identifies priority acceptance coverage for the shared design, not a standalone fix order. All implementation remains downstream of coherent design review, existing work reconciliation and capacity.

| Group | Items | Proposed disposition and acceptance evidence | Proposed owner / dependencies |
|---|---|---|---|
| Observe first-use and target constraints | 1, 22, 23 | Core: one fresh user drives without coaching; physical small-screen large-text and motor/visual constraints; record task success, hesitation and assistance. Do not infer persona membership from a speaker. | Testing coordinator; persona source, actual device/user access |
| Main action, progress and state | 3, 4, 5, 6, 15, 20, 25, 26 | Core coherent slice: clear next action, stable location, distinct playback/next-ready states, understandable two-level progress, intentional back/skip and no surprise sound. Preserve liked guided flow. Do not automatically adopt flashing, hamburger, three buttons or forced completion checks. Retest after looking away and in both themes. | UX/app owner; source semantics, accessibility observation |
| Activity boundaries and continuation | 21, 27 | Core: inspect dramatization and all guide chunk boundaries, retain lists/setup and genuine discussion stops; test multi-clip continuation on target browsers. Reduce needless tapping without skipping the process. | Content/flow owner; authoritative scripts, browser/device coverage |
| Image and audio handling | 11, 13, 14, 16 | Core #11/#13: direct image opening/pinch/return and long-resource seek; preserve optional supporting information (#16) during navigation changes. #14 reconcile existing partial timing work; wider timing completion may fall to week two. Evidence must cover resource audio, not only Scripture. | UX/audio owner; real media samples; PR39 and timing orders |
| Offline field handoff | 18, 33, 36 | Core proving gate: facilitator installs PWA on target phone, selects required content, disconnects, cold starts and finishes required flow. Obtain field context/contact through authorized coordinator. Installation/offline failure is a visible release blocker for that field use, not hidden behind a successful online demo. | Field/release/testing owners; accepted contact, device/language/passage, active offline diagnosis |
| Content source and disclosure | 2, 12, 17, 28, 30 | Core inventory/disclosure and representative retest: distinguish text/audio/description provenance, approved source versus fallback and missing match. Broad replacement of all placeholder narration is week-two/capacity dependent. Human content approval is not inferred from meeting preference. | Content/audio owner; inventories, source access, existing narration policy |
| Description and reusable-map model | 9, 10 | Week two unless core sample is materially misleading: review description length/relevance; preserve unresolved occurrence-specific versus shared narration tradeoff. No new asset architecture solely from discussion. | Content reviewer; authoritative maps and occurrence inventory |
| Download scale and cleanup | 19 | Core show selected content size/retention expectation in proving exercise; broad storage manager week two. Automatic unused-content deletion is deferred until explicit retention design and field validation, because it can destroy expected offline availability. | Offline/product owner; content size inventory, field feedback |
| Overview and growing content navigation | 8, 24 | Week two design/prototype, not mandatory new mode in core. Preserve guided-default versus shortcut tension; test switching/resume before selecting. Multi-passage navigation depends on actual content growth. | Product/UX owner; inventory, bounded design authority |
| Reference patterns and icon assets | 7, 31, 32 | Week two research/review; retrieve references, verify rights/meaning, test icon-plus-text/audio against icon-only. Do not copy uninspected reference behavior or publish unreviewed generated imagery. | UX/content reviewer; references, licensing and consultant authority |
| Language expansion | 29 | Defer expansion; inventory existing languages/gaps is permitted planning input. No new language, synthesis spend or tool procurement from a meeting mention. | Product/content owner; priorities and approved resources |
| Date and scope reconciliation | 34 | Track as one bundled decision only if dates change actual delivery priorities; preserve conflicting statements. September22/29 internal targets do not supersede reported external dates. | Delivery coordinator; actual owner/calendar evidence |
| Store account setup | 35 | Parallel operational follow-up, not PWA critical path unless delivery owner chooses it. Identify accepting organization/documentation owner; verify current official requirements before execution. No credentials or documents in project Git. | Organization account/release owner; private docs and permissions |
| Alternative/native distribution | 37, 40 | Explicitly deferred options. Keep web access. Research platform claims only if PWA fails or native path is selected; no APK/native rewrite order and no store deadline promise. | Release/product owner; actual PWA results and separate decision |
| Recording and logo context | 38, 39 | Obtain original recording pointer when available for visual/attribution ambiguities; no receipt claimed. Logo is context, not redesign work; only verify provenance if unresolved. | Source/content coordinator; authorized recording/asset access |

## Existing work before new orders

The app issue-list observation returned 39 records, all PRs, with no standalone issue in that result. This does not prove no work exists elsewhere. See EXISTING-WORK.md for exact observation and current kitchen tickets.

- PR37 (video card layout) is adjacent to media/navigation usability, not proof that image viewer, zoom or general navigation is solved.
- PR38 (Spanish current-section header audio) is adjacent to playback actions, not proof all accidental audio/state/continuation concerns are solved.
- PR39 and the active word-alignment/runtime orders directly overlap #14; retain partial/absent timing behavior and avoid duplicate repair orders.
- Current-main offline audio CI failure was routed to existing service earlier; #18 must consume actual diagnosis/retest rather than invent a second fix or assume resolution.
- PR36 contains the full harness plan at pass. This harvest supplies real source-accounted inputs; it does not activate the harness, selected-user Cursor execution, previews or automation.

No topic is marked fixed by adjacency. Before each implementation order, inspect current head, accepted authority, outstanding claim and exact evidence; link the relevant checklist IDs to existing or new bounded work.

## Candidate evidence and release review

For every numbered topic, update disposition to implemented-and-validated, still-open, deferred-with-reason, context-only or awaiting-owner/source. Retain original IDs and source spans. A delivery manifest must bind exact app commit/build, content revision, devices/browser/settings, offline pack/source choices, retest result and any unresolved contradiction. Reporter or field validation is distinct from implementation approval and production release.

Show core failures first, followed by the complete 40-item disposition list. A week-two fallback may reduce scope; it may not silently drop feedback. Delivery acceptance means a reviewable candidate and explicit disposition of every topic, not that every idea shipped. Any unapproved feature/content/release decision remains gated.

## Harvest limitations and next cycle

This is a bounded gather → map → independent challenge → gap-fill → reconcile cycle. It is not a running background monitor. Source completeness is limited to the returned Bee revision: 655 unique utterances over nine pages ending in a null cursor. The upstream listing reports 1310 and the discrepancy remains unresolved. Recording gaps, visual references and uncertain speaker authority remain explicit. If the source updates or the original recording resolves ambiguity, compare revisions, retain old item IDs, add/amend source spans and rerun completeness review before asserting the checklist is current.
