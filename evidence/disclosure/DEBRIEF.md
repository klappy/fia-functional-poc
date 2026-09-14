# Disclosure delivery

This candidate retains the current user's explicit synthetic-voice acknowledgement in normal Info state. AI translation, English-map and original-video distinctions are separate types and are remembered only when the native controller reports actual playing for their notice. Notice types persist across resource and mode selection; denied storage retains session memory and reports the limitation only inside Info. Existing prepared source/audio files are unchanged.

Queue construction omits introduced types. Explicit Info replay can play the synthetic introduction again. English Info states the existing acknowledgement; it does not invent an English notice recording. No provider requests were made.

Validation: three focused unit tests pass (type separation, persistence/denied-storage behavior, source availability). The native browser receipt proves initial synthetic suppression, an AI notice reaching actual playing, no repetition after mode/replay/reload, and explicit Info replay reaching actual playing. The first native failure used a document-audio query although the controller owns detached native Audio objects; the corrected receipt observes real playing events. The failed receipt is preserved.

Limits: canceled-start native coverage and a saved checkpoint inside an already acknowledged notice have not been independently exercised. The existing restore path remains unchanged. This is a review candidate, not a claim that those edge cases passed. Full-pack listening and physical device validation remain outside this receipt.

The change addresses repetition in shared queue/state behavior instead of editing prepared media or adding language-specific banners. Independent review remains required before release. Active author charge: conservative upper bound 6 of the allocated 6 minutes; urgent shared-integration corrections were charged separately by the coordinator.

## Closure correction

The operator's product policy disables automatic synthetic introductions globally; this is not evidence that each future user acknowledged them. Info now states this policy directly. The restore path validates the original saved clip/hash first, then omits introduced notices, preserving content offsets and owner identity. A skipped notice creates a paused zero-offset checkpoint at the next applicable clip.

Four focused unit tests pass. The additional native receipt proves a held AI-notice fetch canceled by switching language produces neither playback nor acknowledgement. It also restores an introduced notice to the resource content without autoplay, then plays only after explicit Resume. Earlier fixture failures (incorrect notice lookup and ambiguous English selector) are retained. The completed native test uses the actual English shell absence of the Spanish marker. Closure author charge: allocated additional two minutes, original six retained.
