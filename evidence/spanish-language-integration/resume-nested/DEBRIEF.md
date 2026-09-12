# Languages Resume and accepted nested integration

Languages retains its saved destination and exposes the existing owner transport only while an actual active/paused/restoring owner exists. Reload never autoplays. Remote Autofix be44db5 is retained in history and reverted because redirecting Languages to its audio owner would discard valid navigation state.

Merged accepted nested main 5eb1fecd58d61431cd8001ca064c0edc3ef689d7, retaining direct nested play/restart anchors and PWA behavior. Import conflict resolved by retaining both language and nested imports; release inventory regenerated from the merged build.

Strict release audit: 210 files, 200 English offline entries, 172 unchanged MP3s. Seven affected workspace/nested unit tests pass. Three native browser checks pass on dedicated port 4813: direct nested play/pause/end, instruction-to-nested ready without autoplay, and Scripture playing → Languages → reload → explicit Resume at >=4.9 seconds with zero autoplay and exactly one explicit play.

The first combined run used an existing 4173 preview and failed all three expectations against stale behavior. Its original log is retained; the isolated preview config guarantees this worktree's build. This does not change historical physical-device, heard-quality, or whole finite-matrix limits. No source/audio/provider changes.

Current correction author allocation consumed conservatively <=4 minutes (original 2 plus explicit integration 2), preserving prior aggregate budgets. Root affected review and exact remote gates remain coordinator-owned.
