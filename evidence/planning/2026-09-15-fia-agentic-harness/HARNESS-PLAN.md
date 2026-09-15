# FIA iterative improvement harness — full planning design

Status: proposed design, 2026-09-15. Implementation and activation remain gated. This document specifies behavior; it is not evidence that any loop or integration runs. Companion audit retains source revisions and limitations. Product knowledge lives in the FIA project; kitchen holds authoritative orders and neutral pointers.

## Outcome and selected operator surface

GitHub Issues is the operator surface. Selected, currently authorized team members request `@cursor` validation, reproduction, a proposed fix, an approved scoped fix, or an exact-commit preview. The reporter then validates the preview against the original task. A mention is an interface event, never sufficient authority. Selected operators may hold standing scoped bug-fix authority: once that grant is bound, each conforming small fix proceeds without a fresh permission question. Unknown roster means deny all execution until bound. Ordinary reporters may supply evidence and feedback; they do not acquire unrestricted feature, bug-fix, deployment or spending authority.

Two loops share identity and evidence: (1) persona scenario → bounded test → failure → authorized change → regression and participant retest; (2) original meeting source → later interpretation → existing-work reconciliation → authorized order → evidence → reporter feedback. Raw feedback is a complete meeting outcome. Do not manufacture decisions or next steps to fill fields.

## Architecture and ownership

| Component | Responsibility | Authority boundary |
|---|---|---|
| Original authorized meeting home | Recordings, transcripts and verbatim feedback | Never mirrored into Git or previews |
| FIA private planning/evidence home | Minimal interpretations, access-controlled source pointers, persona matrix, validation receipts | No raw transcript or verbatim feedback; independent disclosure review for public projections |
| GitHub Issue adapter | Operator request, status summary and evidence links | Cannot grant scope or release authority |
| Auggie / responsible coordinator | Reconcile existing work, bind authority, issue kitchen orders, dispatch, stop and return | Promises belong to coordinator; implementation remains delegated |
| Execution adapter | Run precisely approved operation against pinned revision | Cursor capability is subject to verification; manual dispatch is the initial fallback |
| Independent validator | Inspect checks, preview and evidence against order | Author cannot self-release or substitute CI for user outcomes |
| Reporter / participant | Validate original task on identified build | Feedback is evidence; release remains separately authorized |
| Release coordinator | Existing release gates and exact deployment readback | No automatic merge or production deployment from mention |

Activation bindings must identify repository and visibility, GitHub App or authenticated dispatcher, immutable permitted organization/team IDs, decision owner, allowed operations and paths, protected paths, private source provider and access scope, execution and preview provider, secret policy, retention policy, cancellation route, budget values and responsible readers. An absent binding denies the dependent action. Team names, issue author claims, labels and comments are not trusted identity assertions.

## GitHub issue interaction contract

One issue per reconciled problem/candidate. The request records operation (`validate`, `reproduce`, `propose-fix`, `apply-approved-fix`, `preview`), task and expected outcome, persona/context when known, exact base SHA, bounded scope, acceptance checks and approved order identity when required. Free text/custom prompts are allowed only inside the operation's authority and resource limits; they cannot override the policy. The adapter resolves the request to an immutable revision of the comment and displays normalized scope before dispatch.

Validation/reproduction may read and run approved tests in an isolated environment. Proposed fixes may create a review branch or patch only when the selected role has that permission. An approved scoped fix requires a receipt binding either a current standing bug-fix grant or a one-off approval to the order, request digest, base SHA, permitted paths/behavior and limits. The adapter checks each request against the grant; a standing grant never covers unrelated features or broader effects. New features, expanded fixes, new providers, publication, merges and production deployment require their own applicable authority. Preview is a separately authorized deployment of the exact reviewed candidate SHA.

Operators enter requests and receive results only in the issue; the adapter/coordinator creates and reconciles kitchen records without asking operators to duplicate entry. The issue status summary shows candidate/order/run IDs, exact source and app revisions, requested operation, current state, authority receipt, budget usage, last verified evidence, next permitted action and blocker. Reporter feedback references preview SHA and scenario and records `confirmed`, `still-fails`, `changed-expectation` or `unable-to-test`; absence of response is not acceptance.

### Concrete operator example

An authorized tester writes: “@cursor reproduce: after downloading the selected Spanish pack, go offline and play the introduction; playback stays at zero. Base SHA: [exact revision].” The adapter validates the caller and a reproduction grant, reconciles the existing offline-audio issue, and reports that run's trace. If the same operator holds a current scoped bug-fix grant covering this behavior, the adapter can issue the bounded repair order without another permission question. It returns the candidate SHA, checks and restricted preview in the same issue. The reporter replies that the original task now works, or supplies the remaining failure. That report does not approve release. Requests to add synchronized group state, buy a service or ship production leave the standing bug-fix scope and follow their separate authority.

## Verified platform constraints

[CAPABILITY-EVALUATION.md](CAPABILITY-EVALUATION.md) records actual source receipts and the 6B choice. Cursor documents issue/PR mentions and repo read/write caller permissions; that is broader than the desired selected roster. No callable Cursor executor, subscription/spend approval or live FIA installation is proven. Branch artifacts and remote desktop are not a deployed reporter preview.

Current FIA Workers configuration and live readback have workers.dev and previews disabled. Keep them disabled until the preview dish passes its own activation gate. Cloudflare version preview URLs can supply immutable version targets; persistent branch aliases are mutable and unsuitable as acceptance identity. Preview URLs need Access protection and use workers.dev, not the production custom domain. Preview logging limitations require explicit retained test/client diagnostics. The proposed adapter must prove commit-to-version mapping; provider documentation alone does not establish FIA activation.

## Fail-closed dispatch protocol

0. Ignore bot/service-account authored requests, adapter-owned status comments, and unsupported event types before interpretation. Persist adapter comment IDs and a projection marker, but do not trust a user-supplied marker as authority. Bot output cannot generate a new request or authorize itself.
1. Authenticate event origin using the integration's supported signature mechanism, or read the comment directly through an authenticated API in manual mode. Reject unknown installations/repositories/events and oversized input before processing.
2. Fetch current comment revision, issue access, caller immutable ID and current organization/team membership from trusted APIs. Recheck immediately before dispatch and every privileged boundary. Lookup errors deny execution; cached membership is not sufficient to authorize.
3. Resolve current policy revision, operation, base SHA, order and scope. Treat comments, transcript text, issue attachments, repository content and custom prompts as untrusted input; none may change policy or disclose secrets.
4. Reconcile candidate and existing issue/order. Check explicit approval where needed, expiry/revocation, permitted paths, current budgets and protected release boundary. Reject an unknown operation or ambiguous scope with a non-sensitive reason.
5. Claim the dispatch key durably before starting. Record authorization digest, exact request/source revisions and selected executor. Dispatch only after authoritative kitchen order and its outbound event are committed.
6. Recheck authority before branch push, preview publication or other privileged action. A revoked/edited approval or team removal cancels pending work and requests cancellation of running work. Quarantine any already-produced artifact; record actual cancellation receipt or inability to cancel. Never claim termination from a request alone.
7. Record executor receipt, result SHA, evidence and used resources. Independent validation precedes reporter preview acceptance and release review.

Native `@cursor` activation is permitted only after proving that unauthorized mentions cannot start execution ahead of these gates. If native behavior bypasses the gate, disable native automatic triggering where supported; use authenticated manual coordinator dispatch to Cursor or another already authorized worker. If it cannot be disabled or isolated, do not activate that repository integration. Native mentions are then human-readable requests, and the coordinator records the same gate receipts before any worker launch. An installed integration is not proof of any enforcement capability.

## One identity, durable state and reconciliation

Candidate ID is stable across source revisions and linked issue/order/run records. A source witness carries provider object ID, source revision (or observed retrieval version when immutable revision is unavailable), access-controlled pointer, observation time, evidence class and uncertainty. Never pretend a timestamp is a content checksum. Maintain mappings of source witness → candidate → GitHub issue → kitchen order → dispatch attempts → immutable artifacts.

Kitchen order is canonical for authorization and work state. GitHub status is a projection. The project ledger stores evidence and mapping, not competing authority. State sequence: recorded → interpreted → reviewed → authorized → dispatched → running → evidence-ready → independently-validated → reporter-validated → release-reviewed → released. Denied, stopped, superseded and needs-human-input preserve prior state and reason. A state advances only on its named receipt; execution success cannot imply release. This is a vocabulary of operation-specific transitions, not a mandatory universal chain: read-only harvest may finish at reviewed evidence; reproduction at independently-validated result; a proposed patch at reviewed proposal. A fix requiring user outcome evidence remains reporter-awaiting or reporter-unable-to-test until observed; inability to test is not failure of a read-only harvest or implicit acceptance. Release states apply only to separately authorized release work.

Dispatch key = repository ID + issue ID + comment ID + comment revision digest + operation + approved order revision + base SHA. Redelivery of the same key returns the existing run. An edited request creates a new revision and supersedes pending older requests; it never silently expands a running grant. A new digest requires a fresh authorization evaluation/receipt, but the same standing scoped grant can authorize it without a new human permission question if its bounds still fit. A changed source reopens affected interpretations and checks for existing work before a new order. Deleting or revoking an approval stops its pending descendants and flags completed descendants for review without deleting history.

Initial implementation choice: a manual, serialized coordinator using Git-backed JSON records; no database, daemon, webhook activation or scheduler. Kitchen keeps `rail/harness-state/claims/<dispatch-key>.json` and `rail/harness-state/outbox/<event-id>.json`; the existing actual ticket path and these records are changed in one kitchen commit. Only the coordinator holding the serialized queue slot may dispatch. It fetches current main, checks for an existing key, creates the claim/order/outbox commit, and pushes with expected-parent compare-and-swap semantics (ordinary non-force fast-forward push). A rejected push requires refetch, recheck and recomputation; no executor call precedes successful push and readback. Two writers starting at the same parent cannot both claim the same key. Do not use sequential Contents API writes to imply atomicity across files.

The private FIA project mirror at `evidence/harness/ledger/<candidate-id>.json` and issue status are eventual projections. There is no cross-repository transaction; repair missing projections from kitchen receipt IDs. Initial manual dispatch uses the proven available worker interface, records the observed run ID, and holds on uncertain outcome. Future unattended adapters are optional subsequent dishes, not the initial architecture; they must preserve the same Git compare-and-swap contract and qualify all automatic-trigger gates.

Use a durable outbox adjacent to the canonical order update. Each outbound event has a stable ID and destination; delivery acknowledgement is separate from executor start. A reconciler reads order, outbox, issue projection and executor receipts and repairs missing projections. On uncertain dispatch, query executor by idempotency/run correlation before retry; if no lookup or idempotent creation exists, stop for manual reconciliation rather than risk a second run. No claim of exactly-once network delivery is required. Manual mode retains the same IDs and records each observed transition.

## Meeting harvest

A bounded authorized source selection defines provider, meeting slice, accessible revision and permitted processing. Fetch incrementally with a persisted cursor; commit the checkpoint only after all corresponding witnesses/candidates are durable. Replaying a page is safe through stable identity. Permission loss or unread pages produce an incomplete receipt, never an assertion that the whole meeting was harvested.

Keep raw speech at the original source. Later interpretations distinguish observed flaw, report, desired expectation, suggestion, question, decision with separately verified authority, tension and unfinished statement. Preserve contrary evidence and ambiguity. Any generated journal, prompt or proposed next step is an attributed interpretation, not the speaker's words or an order. Match existing work before proposing a new issue. Public or cross-audience projections require independent exact-content review; source identifiers themselves may be sensitive.

## Persona coverage and improvement loop

Use PERSONA-COVERAGE.tsv as a seed, not validated research. Source is the coordinator's two-page observation receipt of stakeholder document V1; no checksum or independent byte inspection is claimed. Existing cookbook role hypotheses remain separately labeled. Inventory current exact-SHA tests and other workflows before filling an existing-test cell. Do not assume live synchronization for multiple-device use.

For each cycle choose a bounded scenario/risk, record baseline and oracle, run automated checks and agent simulation separately, and preserve physical-device/participant obligations. A meaningful escaped failure can propose a regression test; a passing simulation cannot establish comprehension or usability. Compare added test cost and signal, including flakes and false positives. Retire redundant cases only with rationale and preserved coverage. Revisit affected scenarios after changes; return verified lessons to the project cookbook through review.

## Security, limits and failure operation

Run code in an isolated ephemeral environment with least-privilege credentials, no raw source mounts and no production secrets. Treat logs, test fixtures and preview artifacts as disclosure surfaces. Secret scan and access check precede publication. Preview access must be restricted to intended testers, use test data and pinned artifacts, expose SHA visibly, expire according to the bound retention policy and provide revocation. Do not expose secrets in client bundles, URLs, comments or tool arguments. Security review must establish provider-specific controls before preview activation.

Before any run bind maximum active time, attempts, concurrency, tokens/provider spend where applicable and permitted network destinations. Never interpret missing values as unlimited. Initial trial is sequential and manually dispatched. Stop on scope expansion, failed authority checks, unread critical source, unexpected data exposure, unavailable cancellation control, exhausted bound or unresolved duplicate dispatch. Preserve evidence and hand back the next permitted action. A coordinator may run the manual workflow with identical gates; automation failure never broadens permission or resets budget.

## Rollout and acceptance

Phase 0: manual source triage and current CI baseline; measure actual coordination effort and failure rate. Phase 1: synthetic fixtures prove the gates, replay, reconciliation and preview boundaries. Phase 2: selected-team, one-operation-at-a-time supervised trial with bound stop date, run limits and reader. Phase 3: automate only the operations whose enforcement and benefit are independently demonstrated. Harvest scheduling requires a separate explicit schedule and operating receipt; this plan creates none.

Retain manual workflow if automation increases missed actions, false starts, review effort or cost. Zero unauthorized execution, zero unauthorized disclosure and zero duplicate paid dispatch are required safety invariants, not baseline-derived targets. Throughput and savings thresholds must be set from measured baseline by the responsible owner before trial; no invented benefit claim. VALIDATION-PLAN.md defines evidence and BUILD-DISHES.md contains bounded, dependent orders requiring their own gates.

## Record schema and rendering assumptions

Proposed schema file `harness/schemas/record.schema.json` validates strict JSON objects with `schemaVersion`, `kind`, stable IDs, repository ID, request comment ID/revision digest, operation enum, exact base SHA, policy/grant/order revisions, actor ID, timestamps from observed systems, state, evidence links and next permitted action. Variant-specific fields include outbox delivery/attempt receipt, source witness revision/access class, run/artifact SHA and budget used/limit/unit. Unknown privileged operations or missing authorization fields fail closed. Version migrations preserve original records and require independent review; no arbitrary code or template expressions execute from a record.

The proposed `scripts/harness/render-issue.mjs` is a deterministic allowlist renderer of minimal summaries, not a raw-source renderer. Escape Markdown/HTML, suppress mention expansion and untrusted URL schemes, enforce length limits, and validate repository/audience permission before including any link. Do not expose private source IDs, participant details, raw excerpts, tokens or provider account IDs. Rendering success is not disclosure approval; public or broader-audience outputs require independent exact-content review. Original meeting sources remain outside Git. An issue visibility change blocks projection until audience revalidation. The initial coordinator manually reviews the exact rendered output and publishes it; automatic publication requires its own qualified gate.

## Driver-seat refinement: trustworthy preview identity

The reporter should never need to infer which build is running. The preview issue card includes immutable commit, provider version, scenario, verification time and a visible in-app commit badge. Before replay, validate actual served stamp and required asset hashes against that candidate; a stale service worker or cached pack must produce a visible mismatch/refresh instruction, not a false accepted result. Keep preview origin and service-worker cache scope distinct from production. Do not place a preview under the production app's service-worker scope. An Access-protected preview's offline behavior must be tested explicitly: cached content may remain on an already-authorized device after access revocation, so use sanitized assets only, document that limitation, and never claim remote erasure. Reporter acceptance binds the verified actual build, not merely the link sent.

The same issue card provides one next allowed action and a reason for any denial. A revoked/unknown actor may still contribute ordinary feedback within issue access but cannot cause execution. Avoid asking an operator to find a kitchen file, provider dashboard or internal artifact ID to complete normal feedback.

Proposed kitchen runtime-record paths require kitchen schema/owner acceptance before B02 implementation. They are not existing kitchen law. If that approval is absent, retain the current manual ticket/receipt format and serialize coordination; do not create the proposed state directory by assumption.
