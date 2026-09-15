# Aquifer narration selector validation

23 exact source files, 41,186,963 bytes, were bound from verified input MANIFEST (FIAKeyTerms de6c69e6). Exact IDs, displayed source SHA, output SHA/bytes, source URLs and collection CC BY-SA 4.0 attribution persist in src/data/aquifer-audio.json. Source binding is not a transcript, human-narrator or word-timing claim.

Global default Aquifer + AI fallback, Aquifer only, AI only. Media quality remains independent. Fresh Aquifer network/integrity/decode failure may fall back once to AI only under fallback policy; the shared player reports AI fallback. Restored checkpoints never substitute recordings or reuse offsets across sources. Existing playback may finish after a policy change; deliberate restart loads the current policy. Browser TTS cannot bypass Aquifer only.

Native Chromium: English Lord87/Lord88/heaven exact requests, native clock, pause/resume/seek/end, single playing owner; heaven 5-second paused reload restored without autoplay. Spanish exact Señor requests Aquifer and native pause/seek/end, no synthetic introduction and no word timing. Global preference persists; fresh corrupt Aquifer falls back with actual AI label; Aquifer only remains unavailable. Evidence screenshots in this directory. Native tests use blocked service workers for deterministic fault interception; selected-only offline worker supplies independent real-worker cold-launch receipts in evidence/publisher-offline.

97 unit tests passed before the additional decoder-race test; focused six source/failure tests passed including late decoder rejection after replacement. Final build gates and PR checks remain separate; local native evidence does not imply deployment.
