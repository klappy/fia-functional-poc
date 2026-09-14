# Release binding

Follow kitchen HYGIENE lines 3, 10a and 19. Every promotion bumps package.json, synchronizes lockfile metadata and adds a CHANGELOG entry. Vite stamps the manifest version and Git revision in index.html meta[name=fia-release]. Run tests, content checks and strict build; inspect the generated stamp and distribution inventory. Coordinator owns independent review, exact CI and deployment/readback. Rebuild after the final commit so the stamp binds that revision.
