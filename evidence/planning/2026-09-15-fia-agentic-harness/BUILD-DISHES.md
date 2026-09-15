# FIA harness bounded build specifications

Status: proposed implementation specifications derived from the full plan. These are reviewable dishes, not fired tickets. Each requires an accepted parent plan, real coordinator/worker assignment, promise, exact input revisions, independent checks and its own current kitchen fire gate. No implementation is authorized by this file. Reconcile existing work before issuing any dish.

## Shared activation contract

B01 produces a versioned activation manifest with real values: repository/visibility; issue integration and installation IDs; authorized caller/team IDs and operation grants (including any standing scoped bug-fix authority); product decision owner and coordinator; source provider/access; canonical order and evidence homes; executor capability matrix and cancellation route; preview provider/access/expiry; secret/network policy; time/attempt/concurrency/spend limits; trial size/end date/reader; independent validators. Unresolved values block dependent implementation/activation rather than defaulting to permissive behavior. No new paid service or public voice/disclosure without applicable approval.

Each dish returns code/patch SHA, order and request mapping, checks and independent review, limitations and next permitted action to Auggie. No worker self-release. If scope exceeds the dish or a required binding is absent, stop with a proposed split; never enlarge it silently. Coordinator supplies a bounded promise at actual dispatch.

### B01 — Bind existing capabilities and the manual operating path

Owner role: responsible coordinator with infrastructure delegate; real assignees required before fire. Inputs: accepted plan/audit, current rail, app release instructions, CAPABILITY-EVALUATION.md with current official Cursor/Workers evidence, installed integration inspection. Dependencies: none after plan acceptance.

Implement the project-owned activation manifest and documented manual issue-to-order-to-worker-to-reporter procedure using existing approved tools. Verify available native mention triggers, team restriction, authentication, idempotency, cancellation and preview behavior; record supported/unsupported/unknown with evidence. Do not install services or enable native triggers as a side effect. Select manual mode where gates cannot be enforced. Inventory current workflows/tests and reconcile the known failed baseline with existing repair work.

Acceptance: independent reviewer can trace one synthetic selected-team request through a non-executing gate decision; unauthorized request denies; every binding has a real value or named blocking dependency; native mode is disqualified if G06 cannot be proven. Return manifest, capability receipts and exact test inventory. Excludes live execution, harvesting and preview publication.

### B02 — Implement identity, canonical transitions and durable outbox

Owner role: infrastructure worker through coordinator. Inputs: B01 manifest, HARNESS-PLAN identity/state contract, synthetic fixtures. Dependencies: B01.

Implement stable candidate/order/run mapping and immutable request revisions; atomic canonical authorization update plus outbound event; idempotent projection delivery and reconciler. Use the initial manual Git-backed strategy in HARNESS-PLAN: one kitchen commit for ticket/claim/outbox, serialized coordinator and non-force compare-and-swap push/readback; no new storage service. Project mirror and issue projection are eventual, never cross-repository atomic. Include uncertain-dispatch/manual state and supersession/revocation relationships. Avoid a second source of order authority.

Acceptance: I01–I04 pass under injected crashes and acknowledgement loss; state snapshots show one logical dispatch and preserved provenance. No external executor calls in this dish. Return schema/migration or repository layout, reconciliation runbook and independent test receipts. Rollback: disable adapter, retain canonical records and replayable outbox.

### B03 — Add selected-team issue gate and bounded executor adapter

Owner role: integration worker through coordinator. Inputs: B01 capability/membership bindings, B02 state interface, operation policy and synthetic acceptance fixtures. Dependencies: B01–B02.

Implement authenticated event intake, current caller/team verification, exact request digest/base/order checks, allowed operation/path enforcement, revocation checks, budgets and execution correlation. Bind only qualified executor mode; manual dispatch is valid. Deny source-text instructions and unsupported custom actions. Publish minimal issue status projection. Initially use fake executor, then one separately authorized sandbox operation. Standing scoped bug-fix grants must work without per-fix permission prompts; unknown roster denies all. The issue is the sole operator entry surface and kitchen records are generated behind it.

Acceptance: G01–G06, I01/I03 and B01 pass; independent reviewer verifies no native bypass. Demonstrate actual cancellation receipt or block modes that lack sufficient containment. Return policy revision, tests, run IDs and kill-switch procedure. Excludes production execution, merges, release and unconstrained feature work.

### B04 — Add bounded original-source harvest and reconciliation

Owner role: harvest worker through Auggie. Inputs: B01 approved original source access, B02 ledger, existing harvest procedure and disclosure rules. Dependencies: B01–B02; automatic worker dispatch additionally depends on B03.

Implement manual-trigger bounded retrieval with revision witnesses and restart-safe cursor; derive minimal separately labeled interpretations, retain ambiguity/contrary feedback and reconcile existing candidates/issues. Raw text remains at original authorized home. Generated prompts/next steps remain proposals until independently authorized. No schedule is installed.

Acceptance: H01–H05 pass; independent exact-content review confirms no raw transcript/verbatim feedback or prohibited metadata in Git/public projections. Then process one separately authorized real source slice and compare against a human review for misses and false commitments. Return access/coverage limits and correction workflow. Excludes automatic commitments, calendar changes and unsolicited external messages.

### B05 — Extend persona regression coverage from observed gaps

Owner role: app testing worker through project coordinator. Inputs: B01 exact test inventory/current baseline, PERSONA-COVERAGE.tsv, stakeholder source receipt and project test contracts. Dependencies: B01; no harness automation needed to begin this bounded dish.

Select one highest-priority uncovered scenario with coordinator approval; reconcile existing repair before adding work. Specify its observable oracle, implement only meaningful missing assertions/fixtures, label simulation separately, and attach physical-device/participant obligations. Preserve stable regression baseline and assess flake/time cost. Return a follow-on bounded scenario proposal rather than implementing all persona scenarios in one dish.

Acceptance: original failure demonstrated when available, changed checks detect the intended behavior, appropriate app checks pass at exact SHA, T01/T02 distinction preserved. If no meaningful automated oracle exists, return a documented human exercise instead of synthetic test volume. Excludes unsupported synchronization, product scope changes and claims of participant success.

### B06 — Provide exact-commit restricted preview and reporter return

Owner role: infrastructure/app worker through coordinator. Inputs: B01 bound provider/security/retention policy, B03 authority gate, existing app release contract. Dependencies: B01–B03; actual candidate requires its own approved fix order.

Keep existing Workers previews disabled until access/security acceptance passes under a separate activation order. Build immutable candidate artifact, prove SHA-to-Worker-version mapping (never a mutable branch alias), expose commit identity, enforce tester access and expiry/revocation, use sanitized test data and scoped credentials. Add reporter response capture bound to scenario and SHA. A branch moving must not change an issued preview's identity. Preserve independent validation and release gates.

Acceptance: P01–P05 and R01 pass, independent security review inspects bundle/log/URL disclosure and access; reporter can identify build and report still-failing evidence. Return exact preview/artifact receipt and teardown verification. Excludes public/production deployment, auto-merge and interpreting silence as acceptance.

### B07 — Run a bounded supervised trial and learning review

Owner role: Auggie / responsible coordinator with independent validator and reporter. Inputs: accepted receipts B01–B06 for included operations, bound trial count/end date/budgets/reader and measured manual baseline. Dependencies: each enabled feature's upstream dish; omit unqualified features explicitly.

Run sequential selected-team requests with manual supervision, including one persona path and one authorized meeting slice if source available. Measure operational effort, missed/duplicate actions, false starts, costs, useful findings and participant outcome. Exercise stop/recovery. Produce triple-loop debrief of mistake, producing process and learning mechanism; propose reviewed cookbook lessons without raw source disclosure.

Acceptance: validation closure bundle meets every gate invariant and agreed benefit thresholds, or explicitly recommends manual-only/limited operation. Return actual observed trial evidence, unresolved human obligations and bounded next decision. No schedule or wider rollout without separately authorized activation and operating receipt. Rollback: disable triggers, cancel/reconcile runs, revoke previews, retain evidence and return to manual workflow.

## Dependency and release rule

B01 → B02 → B03; B04 uses B01/B02 and B03 only for execution; B05 follows B01 independently; B06 follows B03; B07 includes only independently validated predecessors. No empty placeholder tickets should be placed on the claimable rail. Generate each real ticket with its exact inputs, assignees, promise, acceptance evidence and applicable fresh gates when dependencies are satisfied.

## Proposed repository paths and bounded artifact contracts

All paths below are proposed future files, not claims of existing code. `app:` means private `klappy/fia-functional-poc`; `kitchen:` means canonical `klappy/kitchen`. These paths bind implementation scope while content/identity-bearing instances use actual IDs at execution. Existing app tests remain in place; no new test framework dependency is required. Initial mode is manually invoked Node scripts plus serialized coordinator Git operations; unattended webhooks or schedules are excluded and need subsequent explicit dishes.

| Dish | Proposed files / existing files allowed | Artifact and verification contract |
|---|---|---|
| B01 | app:`harness/activation.json`, `harness/schemas/activation.schema.json`, `harness/MANUAL-RUNBOOK.md`, `evidence/harness/capabilities/README.md`, `evidence/harness/test-inventory.tsv` | Strict manifest denies unknown roster; secret values never stored; inventory pins SHA and distinction between assertion and execution |
| B02 | app:`harness/schemas/record.schema.json`, `scripts/harness/claim.mjs`, `scripts/harness/reconcile.mjs`, `tests/harness/claims.test.mjs`, `tests/harness/outbox.test.mjs`; kitchen:`rail/harness-state/claims/<key>.json`, `rail/harness-state/outbox/<event-id>.json`, existing actual ticket; app:`evidence/harness/ledger/<candidate-id>.json` | Claim script prepares single kitchen commit and checks readback; dispatch occurs after CAS success; I01–I06 and two-writer contention must pass; no cross-repo atomicity claim |
| B03 | app:`scripts/harness/admit.mjs`, `scripts/harness/dispatch-manual.mjs`, `scripts/harness/render-issue.mjs`, `harness/policy.json`, `tests/harness/admission.test.mjs`, `tests/harness/rendering.test.mjs`, `tests/harness/fixtures/` | CLI consumes authenticated fetched request plus manifest; outputs normalized deny/allow receipt; renderer emits reviewed escaped issue text; fake executor tests then bounded real sandbox receipt; G07/S01/S02 included |
| B04 | app:`scripts/harness/harvest.mjs`, `scripts/harness/match-candidate.mjs`, `harness/schemas/source-witness.schema.json`, `tests/harness/harvest.test.mjs`, `evidence/harness/harvest/<run-id>.json` | Manual bounded source selection; minimal interpretation/witness only; no raw transcript persists; H01–H05 |
| B05 | app existing `tests/guided-session.spec.js`, `tests/speech-offline.spec.js`, `tests/primary.spec.js`, `tests/spanish-visual-audio.spec.js`; app:`evidence/harness/persona/<scenario-id>/<run-id>.json` | Amend only selected meaningful gap in appropriate existing test; additional case file needs scoped justification; retain exact baseline and human-obligation receipt |
| B06 | app:`scripts/harness/preview-receipt.mjs`, `harness/schemas/preview.schema.json`, `tests/harness/preview.test.mjs`, `evidence/harness/previews/<run-id>.json`; existing `wrangler.jsonc` only under separate activation scope | Receipt maps commit to version URL/access/expiry and reporter scenario; never store access tokens; provider configuration change requires gate and rollback; P01–P03/R01 |
| B07 | app:`evidence/harness/trials/<trial-id>/BINDING.json`, `RESULTS.tsv`, `DEBRIEF.md`, `REVIEW.md` within that trial directory | Real trial limits/reader and measured receipts; exact-content public projection review separate; no automation scheduling file |

Schema checks reject missing fields and unknown operation enums. Initial scripts are local/manual tools, not network services. Tests use synthetic fixtures under `tests/harness/fixtures/`; bot actor, duplicate concurrent delivery, injection, audience change and revoked membership fixtures are required. Bot/status feedback never enters the candidate/request pipeline. Any later service adapter is a new bounded dish and must repeat affected independent checks.
