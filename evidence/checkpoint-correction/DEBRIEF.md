# Pending restore checkpoint correction

Baseline d042701f3cd74a7d78e5f3a91ceec817087b6e4a returned by the independent gate. Reproduction at that baseline: the saved offset was 4 seconds; after verified audio allocation but before metadata, checkpoint serialization returned 0 seconds. The actual App pagehide, hidden-document and periodic save paths all call this checkpoint method.

The correction gives the pending offset priority only while restoring and only when clip ID, source hash and output hash match the current manifest entry. Pending state is cleared only after the existing source/token-bound metadata and seek completion checks. After readiness, live currentTime becomes authoritative. Stop, Restart, superseding restore and new playback retain their existing cancellation semantics.

A deterministic controller regression reproduces delayed metadata and transient zero time during delayed seeking, checks preserved identity and offset, then checks the live offset after readiness, no autoplay and Stop clearing the checkpoint. This is a controller test exercising the pagehide serialization boundary, not a claimed native browser pagehide observation. The existing asynchronous cancellation regressions remain intact.

40 unit tests passed; build and strict release audit passed. Public source and all 172 audio bytes remain unchanged; 197 dist files and 195 offline entries. No App navigation policy changes: playing exploration survives; ordinary paused/restoring intentional view or selected-source changes still retarget. No blanket preserve-all-paused rule was introduced.

Cursor Bugbot Autofix was observed running at the unchanged remote d042701 head. This isolated correction has not been pushed over that work. Its eventual patch must be inspected and deliberately integrated before final PR-head acceptance. Root owns independent review; this author does not self-approve the implementation.
