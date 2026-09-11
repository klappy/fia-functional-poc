# B3 core code preliminary independent review

Observed 2026-09-11 21:56–21:58 UTC;2 active reviewer minutes, B3 cumulative10,10remaining. Seven-file freeze /tmp/fia-b3-audio-code-freeze.sha256 verified against source before reading. No API calls, no app edits. Final completed pack/runtime remains pending.

Reviewed AudioController, actual shared-component AudioControls, App callback wiring, generator/guards, SW and shell generator. Independently copied frozen audio controller/guards/tests to /tmp/fia-b3-core-review and ran3tests PASS. These use simulated HTMLAudio events; they do not establish actual audibility.

Working source design: stop increments generation before pausing/removing previous media; stale normal callbacks after stop are suppressed. Resource opening, source/example opening, view, guide position/step, Bible version and fallback changes stop both engines. Only one controller's playback is selected. Guide queue derives accepted currentPosition/isStop/moveUnit and stops at actual discussion cue; advancement occurs only after ended. Full Bible recording is selected by version ID. Controls use actual GlassSurface/GlassButton with synthetic disclosure.

Generator correction accepted in source: approved source/spoken digest required, existing changed/missing/corrupt files hold instead of regenerating, duplicate manifest IDs rejected, attempted IDs including uncertain outcomes hold; cumulative attempt and character caps checked and attempt persisted before request. This amended source does not retroactively instrument the already-running process; batch and reconstructed receipt provenance must remain explicit.

Blocking/affected findings sent to coordinator:

1. Online playback directly constructs MP3 URLs without manifest/source/output verification. Existing SW only verifies when a saved pack intercepts. Require online audio verification before claiming verified recordings.
2. Shell builder silently omits mandatory audio when its manifest is absent and only checks length120 when present. Require absent/duplicate/wrong-ID audio pack failure with source binding.
3. resume().play().catch has no generation guard and can emit stale error after navigation/stop. Guard it consistently with startup.

Frozen identities: audio.js e051733ddb6cd4301112a85f42ced528bb0eddbdf1ab0f4109527c02721338f2; AudioControls.jsx a7792b3a129cd867957a0c8bb338cf035c322ba54385c094dada40580554623e; App.jsx6fc8c23bbe242ece7cda5bc9dafd5a2cbb187abc929ae415940b7b7c50f95562; prepare-audio.mjs75607f94d05231e957fd1c3a86c29bc82ebc5b953180db4dd33bd813544ad262; audio-guards.mjsf2eac27c6dbfba5f5584c7d1ee767e8869f092fbadea2efa54b7552ea0bef6ff; sw.js2e8a3969e14dde999639c8b3add2100a7b287807f022b7fdd9d7da2284ee3581; build-offline-shell.mjs9e83c43c49d201dae896063cc06ff6802235df7cfdbafd2d04dde51865b7adcc.
