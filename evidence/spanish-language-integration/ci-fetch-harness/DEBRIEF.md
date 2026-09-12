# CI request-delay harness correction

Actual run 34697960648 failed at held=false: the default suite permits service workers, while the standalone config had blocked them. The deferred online-fetch test now owns a describe-scoped serviceWorkers:block option. Removed that global override from the standalone config, proving the test controls its required routing under a default service-worker-enabled configuration. All delayed-fetch, Resume and zero-play assertions remain intact. Dedicated real service-worker/offline tests retain their configuration.

Affected native test passes (2.8 seconds total). No production or release inventory changes. Original CI log preserved. Author <=1 minute under cumulative 65 continuation, prior 63 retained. Local candidate pending root review before push.
