# FIA functional PoC

Authority: the accepted [FIA cookbook plan](https://github.com/klappy/fia-app-cookbook/blob/2d90436c80b0c5aa2f18bc7594347b1d6244e704/poc/PLAN.md) and the current dish in [klappy/kitchen](https://github.com/klappy/kitchen/tree/main/rail) govern this app. The meal is `2026-09-11-fia-functional-poc`; the speech/offline dish is `2026-09-11-fia-poc-speech-offline`. Read the assigned ticket, accepted source/cue manifests, CAPABILITIES and VALIDATION before edits. Follow actual branch/review/check gates; app authors do not merge their own work without coordinator release.

Keep scope to the accepted English Mark 1:1–13 six-step preliminary PoC. The guided-session dish implements session UI and local position. The separately fired B3 dish owns narration and verified offline caching. The user requested ElevenLabs as the preferred voice; browser speech remains a fallback until that integration is authorized and verified. Preserve source text and per-item rights/notices. No raw private conversations, personal audio, secrets, translation capture, AI backend, new paid service or unrelated framework. Source IDs are public content identifiers, not private evidence.

Use exact dependency versions and lockfile. Verify generated content with `npm test` and `npm run verify:content`; build with `npm run build`. Distinguish actual observations from fixtures, unsupported and untested behavior. Keep product rationale in the cookbook, code/evidence here and neutral operational receipts in kitchen.

Release binding: kitchen HYGIENE lines 3, 10a and 19 apply; follow [RELEASE.md](RELEASE.md) for version, exact build and deployment gates.
