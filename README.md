# FIA functional PoC

A runnable English Mark 1:1–13 guided passage experience using the current Generative Glass components, FIA identity and attributed Aquifer resources. This is a preliminary six-step PoC, not the complete FIA product or a translation recording/checking system.

Run with Node 22.16.0: `npm ci`, `npm run build`, then `npm run preview -- --host 127.0.0.1`. Run `npm test`, `npm run verify:content`, `npm run verify:audio` and `npm run test:e2e` for the applicable checks.

## Working experience

Guide, Scripture and Resources use the shared floating navigation and contextual Previous / Play-Pause-Resume / Next transport. Guide has 111 visible activity groups preserving all 130 source units, hidden examples and 39 source stop coordinates. Scripture offers BSB, ULT and UST. Resources include 21 terms, four maps, four images and three external videos. Image/map previews remain visible alongside narration; complete detail and attribution are available separately.

The app contains 172 captured synthetic narration clips, including retained superseded originals. Playback runs at 0.95 with pitch preservation. Automatic guide transitions wait 750 ms; discussion stops wait for explicit navigation. Exploring resources preserves the current audio owner. Light/dark themes use the full shared design-system CSS. Guide position and Scripture selection persist locally; theme, broader workspace state and audio offset persistence are planned separately and are not implemented here.

Save offline verifies the complete 195-file required pack before replacing a prior valid pack. Offline playback uses verified full audio bodies and Blob URLs; Range requests receive the full body (200), not partial-range 206 service. External video and optional web fonts are excluded; local font fallback remains available. Exact current pack and deployment bytes are recorded in `evidence/release/DEPLOYABLE-INVENTORY.json` after each build.

## Release boundary

Cloudflare Workers Builds is configured for `fia.klappy.dev`, serving only `dist`. Reviewed main pushes are the deployment mechanism; local deployment commands and manual build triggers are not part of this workflow. Wrangler is pinned to 4.131.0. The build fails on unapproved files, changed approved audio bytes, private voice identifiers or the private provider route. Private narration/source-review evidence is retained in this private repository and must never be deployed. Configuration and local build success are not proof of publication.

## Verified limits

Browser tests verify playback events, timing, source binding, navigation, failure/retry, themes and cold offline behavior. They do not establish that every narration was heard or its quality accepted. Human audition was limited; complete spoken-content/quality review, physical-phone testing and field validation remain untested. The provider voice's human identity is not independently established. No runtime generation, speech recognition, microphone capture, translation recording, checking, synchronized multi-user state or offline video is implemented.

See `NOTICE.md` for per-source rights and adaptation notices, `UPSTREAM.md` for exact design-system reuse, `DELIVERY.md` for historical delivery records, and `evidence/release/REVIEW-INDEX.json` for selected independent receipts and their original dispositions. Historical screenshots are evidence of the stated capture, not blanket proof of every pixel or state. Authoritative scope and subsequent dishes remain in the FIA cookbook and kitchen linked by `AGENTS.md`.
