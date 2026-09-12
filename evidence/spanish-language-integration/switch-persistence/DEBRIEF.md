# Language checkpoint and theme correction

Remote inspected at dd93ba6; no Autofix changes present. English language selection pauses its native owner, freezes the checkpoint during asynchronous selection, and retains paused live state if target validation fails. Ordinary Stop remains unchanged. Unmount saves the preserved checkpoint before disposing audio. Spanish theme uses the existing English workspace theme contract, preserving all other stored fields.

Strict build passes: 210 release files, 200 English offline entries, 172 unchanged recordings. Existing workspace unit tests pass. Native roundtrip proves playing English at 5 seconds → Spanish → dark theme → reload → English retains dark theme and paused >=4.9-second checkpoint; explicit Resume advances beyond 5 seconds, exactly one play after reload and zero autoplay. Corrupt target check also passes. Initial test instrumentation accessed Audio before creation; original failure retained, poll now waits for actual construction.

Author charge <=2 minutes; prior aggregate 54 retained, continuation total 58. Local candidate only pending independent affected review; no push yet. No new audio/source/provider or physical validation claims.
