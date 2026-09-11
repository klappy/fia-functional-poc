# B2 guided session evidence

Code freeze: ff80659, built from accepted B1 main dd65fc505d603d38f9cb70da4cd2498a6ddc2e18. Observed 2026-09-11. No B1 source, asset or pin bytes changed.

Working: six source steps, 117 active guide units with 39 intentional pause cues, 13 possible-response units excluded from ordinary flow, explicit example reveal, three complete 13-verse Scripture versions, all32 selected resources with original provenance, contextual resource opening, native dialog Escape/focus return, unit/version/visited persistence and explicit finish after visiting all six steps. Video links are online only. No translation is recorded.

`unit-tests.txt`:12/12 pass, including complete traversal, hidden-region exclusion, all39 stops and invalid persisted-state rejection, plus unchanged B1 integrity/failure tests. `browser-tests.txt`:6/6 pass in isolated Playwright Chromium153.0.8010.12 contexts. Covers actual source/verse rendering, exact unit/version restoration, actual map natural dimensions, resource types, explicit examples, duplicate-name distinctions, native keyboard dialog, source503/retry,320px layout and CSS zoom2 at780px. The CSS zoom check is layout emulation, not native browser zoom or physical-phone evidence. `build.txt`: Vite build passes. Browser installation initially raced first test launch; two startup errors and one implicit-label locator failure were corrected by completed installation and explicit labels before this final passing run.

Four screenshots here are actual isolated browser captures at390/320 widths, not generated designs. Root independently inspected the in-app Chromium preview and reported navigation, UST selection, map display, Escape/focus restoration, hidden examples and reload restoration. Exact root receipt/final independent verdict belongs the coordinator; this author report does not grant that verdict.

Runtime remains http://127.0.0.1:4173 while the local preview process is alive. `npm run build && npm run preview -- --host 127.0.0.1 --port 4173` restarts it. No deployment/monitor is implied. User preview profile and state were not touched by automated contexts.

Not implemented: narration, audio observation, offline save/cache/removal. Untested: primary headed Chrome152, native200% browser zoom, physicalphones, assistive screen-reader output, actual external video playback and audience learning outcomes. These are not simulated successes. The full meal remains partial until later mandatory gates pass.
