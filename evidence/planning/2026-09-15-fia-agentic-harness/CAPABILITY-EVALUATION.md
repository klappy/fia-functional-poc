# FIA harness capability and borrowing evaluation

Observed September 15, 2026. Planning evidence, not activation. Repository API reports klappy/fia-functional-poc private; credentials and account identifiers are omitted.

## Capability ladder

| Surface | Observed | Limit / required activation evidence |
|---|---|---|
| GitHub source and writes | This task reads/writes reviewed Git records and draft PR36. Current main tree8121c11 complete; .github/workflows contains onlyci.yml, no .cursor path. | File absence does not prove external GitHub App installation absent. Selected roster, native installation, allowed repo scope and spend authority remain unverified. |
| Cursor native issue trigger | Parent independently read [Cloud Agent](https://cursor.com/docs/cloud-agent): issue/PR mentions supported, setup by administrator, initiating caller repo read/write privileges. | Documentation is not a live FIA activation receipt. Repo read/write is broader than selectedfew policy. Direct native mention bypass must be denied before rollout. |
| Cursor permissions and cost | Parent read [security](https://cursor.com/docs/cloud-agent/security) and [GitHub integration](https://cursor.com/docs/integrations/github): protected scopes, selected repos, per-user Git permissions. Paid plan/API-priced runs with spend limits documented. | No dedicated callable Cursor tool discovered. No run, roster, plan subscription or approved spend cap proven. No paid action authorized by planning. |
| Native agent output | Branch/artifacts/remote desktop documented. | Not proof of reporter-accessible deployed preview or approval enforcement. |
| Current FIA hosting | [wrangler.jsonc](https://github.com/klappy/fia-functional-poc/blob/8121c11e16c65d06ae29163e452c8ea661d8e921/wrangler.jsonc), blobed4e35a6ed40a53bbac222f01e8d5b4bd7196e2a: Worker staticdist; workers_dev:false, preview_urls:false, production customdomain. README describes Workers Builds main-push release. | Not Cloudflare Pages. README broader totals are historical; reconcile current scope rather than infer unauthorized releases. |
| Live preview state | Read-only Cloudflare Worker subdomain API returned200, enabled:false, previews_enabled:false. | Preview service is currently disabled. No activation/access policy tested. |
| Workers preview feasibility | [Preview URLs](https://developers.cloudflare.com/workers/versions-and-deployments/preview-urls/) and [build branches](https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/) document version URLs and branch builds. [Configuration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/) distinguishes preview upload from production deployment. | Version URL must bind exact commit; alias moves. Preview URLs public unless Access protection; workers.dev only, not arbitrary customdomain. Parent verified preview logging limits; preserve test/client artifacts for diagnosis. |
| Source harvest | FIA procedure/J-05 already define proposed evidence, deduplication, review, retest. Parent Bee changes endpoint returned200/cursor. | Cursor feed proves retrieval only, not complete transcript capture or durable scheduler. No new schedule established. |
| Existing tests | Unit/content/build/Chromium E2E in CI; specific main E2E failure in AUDIT. | Reconcile active service's diagnosis; do not reproduce a second repair queue. Physical devices, heard quality and participant outcomes remain distinct. |

## 6B decisions before implementation selection

| Component | Borrow | Bend | Break | Beget | Build | Bide | Proposed verdict and falsifier |
|---|---|---|---|---|---|---|---|
| Evidence extraction | Existing FIA harvest procedure | Add typed result and revision checkpoint adapter | Do not replace provenance model | No new product-knowledge home | Thin adapter only if existing runner cannot supply it | Wait for authorized source bindings | Borrow+Bend; reject automation if source revisions cannot be reliably reconciled. |
| Execution engine | Cursor existing branch agent | Authorized dispatcher envelope | Do not remove upstream permission controls | No fork | Only admission/reconciliation adapter if required | Manual coordinator uses same issue interface | Conditional Borrow; if native mentions bypass selected roster, disable native path and use gated/manual adapter. |
| Work authority | Existing kitchen ticket/gates | Issue projection and atomic mapping | Do not make a competing queue | No new governance | Narrow adapter only | Manual processing until receipts prove consistency | Borrow+Bend; kitchen is execution authority, GitHub is operator interface. |
| Persona tests | Existing test suite and source-bound fixtures | Coverage matrix and outcomes | Do not delete regression baseline to inflate success | No parallel test framework | Missing meaningful scenarios only | Human evidence for comprehension | Borrow+Bend; additions must detect meaningful prior failure and preserve existing behavior. |
| Preview | Existing Workers versions/Builds | Version/commit stamp, scoped branches and Access | Never route previews to production customdomain | Separate isolated worker only if shared worker can't isolate safety | No bespoke hosting service | Manual reviewed artifact preview if access cannot be proven | Conditional Borrow; enable only after access/isolation tests and explicit activation order. |
| Event durability | Existing Git records and bounded dispatch | Stable IDs, compare-and-swap transitions/outbox | No blind last-write-wins | No new state service by default | Thin receipts/state reducer if proven needed | Manual serialized coordinator | Borrow+Bend; loss/duplicate tests must demonstrate one external action per authorized transition. |

No provider/SDK/hosting changes made. A feature choice may be fully specified while activation stays blocked on named real-world bindings. These are explicit gate inputs, not permission to create placeholder claimable builds.

## Additional house prior art observed

- BT Servant V3 cookbook README blob45e4d5e59d825d125f6a6c2736cc87e8c89f6b99 describes provenance atoms, tensions, dated decisions and per-pass review. It is a proposal/method source, not proof of an installed FIA runner. [Source](https://github.com/klappy/bt-servant-v3-cookbook/blob/main/README.md).
- Agent Role Service README blob022cadf23e0d0c04cfe0f51b4765f809df0dced5 documents leases, conflict/expiry, durable log and projection parity, retaining Git as durable record and manual recovery. [Source](https://github.com/klappy/agent-role-service/blob/main/README.md). These patterns are relevant to duplicate-work and resume design. This task has not exercised ARS live, so it remains optional reuse subject to Otto's capability proof, not a new required service or claimed operational dependency.

BT harvest/PROCEDURE blob399df34042d006365172105dc40ed7db59c7ed7a was also read: bounded pass/cursors/dedup/proposed atoms/tension issue and review. Borrow those mechanics. Deliberate divergence: its shorthand treating a closed issue as a de-facto decision is not adopted for FIA; closure alone does not establish authorized ruling. FIA preserves original-source access, explicit ruling identity and independent exact projection review.
