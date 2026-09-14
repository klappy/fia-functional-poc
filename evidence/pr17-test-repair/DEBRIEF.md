# Accepted behavior fixture repair
Updated Spanish selection assertions to exact partial prepared narration status. Original-edition test now checks two original radio choices,13 verses, retained selected edition after reload, no AI-edition claim and unchanged resource provenance/no-autoplay assertions. Fault injection patterns now include expected-hash query suffixes; corruption/500 assertions remain.

Three native audio fixture tests previously ran in default suite against production4173 rather than their dedicated4799 harness. Default config now starts that fixture server and file scopes its own baseURL/319viewport; no assertions weakened.

Initial local default run accidentally reused unrelated existing4173 preview (/tmp/fia-wholeview-app); stopped it without touching that server. Re-ran targeted23 against actual4794 using temporary config. This is distinct from CI failure causes. Author2 upper allocation, root review1/coord1 separate. No runtime source changes in this repair.
Actual current run21/23PASS. Two offline restores fail after save: preparedAudio manifest is a required loadSpanish dependency but partial offline cache excludes it. Runtime defect reported separately; assertions retained and no runtime repair hidden in test scope. Exact repro log attached. Narrow second run pending while returning bound.
