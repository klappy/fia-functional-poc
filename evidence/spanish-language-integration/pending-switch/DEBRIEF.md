# Pending-start correction

Language suspension now snapshots the available checkpoint and fences pending starting/restoring generations by reusing verified restore with autoplay disabled. Active playback/gaps retain ordinary pause; legitimate Stop is unchanged. Shared theme writes include the passage contract even when English storage is absent, preserving existing audio/resource fields.

Strict build PASS (210 files, 172 unchanged recordings); six workspace tests PASS including empty-store theme and preserved fields. Three native cases PASS: delayed first English audio fetch while Spanish loading remains blocked produces zero plays and a Resume affordance; 5-second language roundtrip retains checkpoint/theme; corrupt target retains English without added plays. The isolated request-delay harness disables service workers so page routing actually holds the audio fetch; the initial service-worker-intercepted test failure is retained. These targeted checks do not claim offline validation.

Current author <=2 minutes, cumulative continuation 61 preserving prior 58. Local only pending root review. Historical raw log whitespace retained as evidence.
