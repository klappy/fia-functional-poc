# Release preparation

Base 871b0f1; product freeze 5d40dad. Author active upper 9 minutes (original 8 plus explicit 1 correction); network/test waits excluded. No UI/source/audio changes and no provider calls or deployment command.

Build, 35 unit tests and content verification passed. The audio verifier checks the original 120 identities; the release audit independently checks all 172 MP3 bytes against the exact private packet. Three real cold-offline/atomic transfer/transition tests passed on the isolated 4185 fault server. Earlier harness attempts selected zero tests, then omitted the required server and failed connection; neither was a product pass. The connection-failure receipt is preserved.

The first allowlist was circular with generated pack entries; review returned it. Final file allowlist comes independently from accepted 871b0f1 public paths, with only two generated hashed JS/CSS files and index/offline metadata. Extra private-file injection failed closed. Counts: 197 deployable files/93,457,498 bytes; 195 required files/93,408,719 bytes. All172 audio hashes unchanged. Private original manifests and exact narration packet remain outside dist. Full JSON Schema validation was not run; installed-schema key membership and explicit static-only invariants were checked without invoking deployment.

Selected independent review receipts retain historical source heads/returns. Historical theme contact-sheet coverage is not blanket individual legibility certification. Complete heard narration quality and physical-device/field verification remain untested, so meal completion remains partial. Cloudflare connection/publication is pending coordinator gates.
