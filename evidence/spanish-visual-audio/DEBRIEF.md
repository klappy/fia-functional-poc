# Spanish visual audio integration

Accepted allocation: original 12 (author 7/root 3/coordinator 2), additive 4 (author 3/root 1), total 16. No scope or prior budget reset. Generation was separately owned: eight calls, 2,281 processed characters, no retries. This worker made no generation calls.

Eight frozen outputs are bound to exact Spanish text and original image hashes. TECHNICAL.json pins staged manifest 32bdb91b947b78f268921ad03687264645c44ed20ea676a0e978e53091ae166b and records all eight output hashes, MIME/decode results. Active requests are 205; seven historical entries and their unchanged files remain, giving 212 public Spanish MP3s. Historical entries are excluded from selected offline manifests. Sandal descriptions have distinct source and output identities.

Native initial run passed the selected offline save/hash/history-exclusion/cold-play test. The other tests exposed an availability defect and a stale-checkpoint fixture race. Shared Spanish availability and start now use existing selectNarration for all queued owners. The stale fixture is seeded on document initialization so pagehide cannot replace it. No production checkpoint restoration change was needed. The two affected cases then passed: all eight actual MP3s advance the native clock; map and both sandals pause, seek and end; Aquifer-only hides unavailable playback; new checkpoints restore paused and historical title-only checkpoints visibly reject. Retained initial and correction logs document both outcomes.

Screenshots show the written translated-description label and text, source access and English-map notice. The map screenshot still shows image loading; it is text-layout evidence, not a completed-image render claim. Direct listening/transcription remains unverified. Native clock/decode checks do not establish heard accuracy.

Verified original MP3s ship first. Medium honestly falls back to Original for these eight until the existing public-origin proxy pipeline can qualify derivatives after release. No alternate host or local transcoding was introduced. No repeated spoken disclosures or word timing claims were added.

Learning: source policy must govern availability through the shared selector, not just playback resolution. Native tests caught that distinction. Persistence fixtures must seed after lifecycle writes; changing production restoration to accommodate a fixture would obscure the real boundary.

Independent review, exact CI/Bugbot and promotion remain coordinator gates.
