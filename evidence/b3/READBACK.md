# B3 candidate — prepared narration and verified offline passage

Base appmain9445bbd2be341fa4d1b6059cc32c256bffa90b87. The initial browser-only candidate1f6160e was superseded by the user-selected ElevenLabs experience under kitchen8aef7a02. This is still subject to independent runtime/quality review, not meal completion.

## Source and generation receipts

One actual short probe and one uninterrupted119-request batch exited0, returning120 MP3s /24,593,498 bytes for117 active guide units and three complete Scripture passages.120 successful client requests used27,325 source characters, within120/30,000 hard caps and4.1-second minimum starts. No client retry/error was observed. Actual HTTP200 audio/mpeg receipts and file hashes are in the audio manifest. The durable attempt ledger is explicitly retrospective recovery of successful responses, not invented request-start instrumentation. Quota and provider-internal billing/retries remain unknown.

Source words, original data/image pins,13 hidden examples and39 discussion boundaries are unchanged. Expected spoken-projection hashes predict the inspected server's punctuation/whitespace normalization; they do not attest a provider transcript or deployed model/settings. Existing voice/provider labels are source/request-based. No LLM rewrite, persona, new service, runtime key or runtime synthesis dependency is used. All source-specific NOTICE obligations remain.

## Runtime design and verification

Selected narration verifies source text, response MIME/length/output SHA against the compiled recording manifest before creating a playable Blob. Native HTMLAudio supplies playing/pause/ended/error events; guide progression occurs only after ended and stops at the next configured discussion boundary. Resource/view/position/version changes cancel both engines; stale callbacks and resume rejection are generation-guarded. Only selected audio is fetched online. Blob playback does not depend on origin-server Range handling; no seek UI is claimed. Primary listening is compact; browser fallback and offline maintenance are disclosed using actual shared Glass components.

Build passes and emits137 required files /48,290,467 bytes: actual app HTML/JS/fullCSS, all source bodies, eight originals, audio manifest and120 recordings. Missing/duplicate/wrong-ID/source-mismatched/corrupt narration fails build. Offline saving verifies every transfer and staged readback before active-pointer commit. Failed/canceled staging preserves the previous pack. Status/fetch reverify cache bytes. Corrupt saved data can be removed; selected removal preserves the shell. Optional network fonts and video are excluded.

25 source/unit tests pass, including pure negative quota/audio/cap fixtures and actual build-gate rejection cases. These simulations are not audio evidence. All120 exact source/audio identities and MP3 stream/duration probes pass. Five final real browser cases pass:137-file cold offline readback, failed/canceled staging retention, corruption/removal, actual audio playing/pause/resume/ended and cold offline replay, and ordinary reload from the exact saved1f6160e shell to the new version with position and old pack retained until explicit save. These playback events are not agent audibility.

Earlier actual offline baseline independently passed all16 original required files, eight image renders,13 Scripture verses and readable fallback fonts after a fresh page with network disabled. Missing/corrupt/delayed transfer tests preserved the prior pack; removal and actual cache corruption were exercised. A quota fixture simulated Cache.put failure; real disk exhaustion was not induced. The expanded137-file audio pack passed these real browser checks, including actual offline playback.

## Limits

The agent has no audio-perception tool and has not heard the generated voice. User audition/quality acceptance is pending. Physical phones, native browser zoom, full browser/OS restart and exhaustive pronunciation/transcription quality remain untested. Fresh-page offline tests are not a full browser-profile restart. Browser fallback's installed Chrome152 voice/start/end probe is real but is not the selected voice-quality acceptance. No microphone/system audio capture, routing or permission change was used.

Transcode was actually tested on largest mapc168: same3000x4000 WebP585,486 bytes versus original7,735,008, with labels/legends visually readable. It is not adopted; original source/image pins remain unchanged. No audio or private material was sent to Transcode.

The stale-shell upgrade defect and native-fetch receiver defect were observed and repaired before final freeze. Online navigation now fetches current HTML first; verified offline shell remains fallback. A live revision mismatch says Update available instead of claiming the newer pack is saved. The prior verified pack remains until a full new commit. Concurrent Cursor00c4762 fixes were inspected and merged without force. See ELEVENLABS-DESIGN and the real legacy-upgrade test.

Final full browser regression:14 tests PASS in1.2minutes on the frozen code, including all prior guide/resource/branding/accessibility cases plus complete audio/offline/legacy-upgrade cases. These ran in isolated contexts, not the user's profile. The exact source/head is800c7cfd325c875f01802767d96ba1a77f05287a; subsequent changes are evidence only. This does not turn playback events into an agent-heard or user-accepted quality claim.
