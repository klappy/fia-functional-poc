# English alignment runtime

Base is verified release 62d28f5; remote main divergence is reserved for coordinator reconciliation. Version 0.1.10 adds three source/audio-bound sidecars and optional shared Scripture word/verse rendering. Existing 204 Spanish recordings and all English audio bytes remain unchanged. No additional provider calls.

All three editions and 39 verse starts were exercised through native audio currentTime while paused; numeric 40 was checked in ULT and UST. Five native cases passed: edition positions, separator gaps, unrelated owner, missing-sidecar fallback, paused reload without autoplay, explicit Resume and actual end. All 68 existing/new unit cases passed. Initial native attempt used a button locator for the actual version radio and was stopped; original log preserved. Corrected semantic radio locator passed. These tests demonstrate media-time selection, not listening verification of every boundary or a word-accuracy guarantee.

Review corrections: neutral AlignedVerse shared component; runtime rejects uncovered non-whitespace between ranges and at the final tail, in addition to identity/hash/range/overlap checks. Source projection proves length-preserving quote/dash normalization for these inputs, including unchanged numeric 40. Unsupported expansions fail closed.

Offline build includes each sidecar in English required entries. Browser offline cold-launch timing remains a separate explicit check; no completed claim from inventory alone. Spanish source/clip unit invariants pass; no new Spanish native listening claim. Full raw responses remain private evidence; public sidecars contain source/range bindings only.

Follow-up native verification: all 39 verses checked immediately before start, at start, and at end through actual paused media seeks; each edition also advanced its real playing clock through at least two visible word changes. Five affected cases passed (12.6 s). A separate real-service-worker save and offline cold-page test passed (4.8 s): sidecars loaded and BSB native word highlighting played offline. These are DOM/media checks, not hearing judgments. The initial 39 midpoint checks are not described as boundary listening.
