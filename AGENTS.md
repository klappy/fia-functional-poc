# FIA functional PoC

Authority: the accepted [FIA cookbook plan](https://github.com/klappy/fia-app-cookbook/blob/2d90436c80b0c5aa2f18bc7594347b1d6244e704/poc/PLAN.md) and the current dish in [klappy/kitchen](https://github.com/klappy/kitchen/tree/main/rail) govern this app. The meal is `2026-09-11-fia-functional-poc`; source foundation is `2026-09-11-fia-poc-source-foundation`. Read the assigned ticket, accepted source/cue manifests, CAPABILITIES and VALIDATION before edits. Follow actual branch/review/check gates; app authors do not merge their own work without coordinator release.

Keep scope to the accepted English Mark 1:1–13 six-step preliminary PoC. Source foundation does not implement session UI, audio or offline caching. Preserve source text and per-item rights/notices. No raw private conversations, personal audio, secrets, translation capture, AI backend, new paid service or unrelated framework. Source IDs are public content identifiers, not private evidence.

Use exact dependency versions and lockfile. Verify generated content with `npm test` and `npm run verify:content`; build with `npm run build`. Distinguish actual observations from fixtures, unsupported and untested behavior. Keep product rationale in the cookbook, code/evidence here and neutral operational receipts in kitchen.
