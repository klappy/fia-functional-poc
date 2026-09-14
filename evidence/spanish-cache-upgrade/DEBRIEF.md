# Valid old cache / new language descriptor mismatch
Actual reproduction seeds the exact6177 Spanish pack in a cache with matching old hash and SPA metadata, then opens current bundle. Before: Language file integrity check failed. The worker proved integrity against its old cache entry, not the new bundle's descriptor. Origin bytes were independently verified by root.

Fix: each language fetch supplies the expected SHA query. Worker returns cached bytes only from a matching generation; otherwise requests network. Client still verifies every byte/hash. A single retry after worker update handles old controlling worker; abortion remains honored. Old saved cache is retained. Real corruption still rejects and caller retains prior language. No clearing data or weakening hashes.

Before/after reproduction receipts attached. Author upper3 minutes within corrective6/binding31. Root independent review remains, including broad offline negative gates.
