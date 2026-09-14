# PR20 exact CI repair

Reviewed all ten failures at5bcd976. Nine were stale assertions following accepted shared screens: resource accessible names now include kind, Section accessible names preserve natural 'of' while visible counters use slash, Scripture uses thirteen shared verse spans, attribution includes full rights around the pinned edition ID, and migrated state includes completion defaults. Tests retain exact source identity/verse count/state values and native no-autoplay, owner, offline Save and integrity checks.

The tenth was a real missing authored visual-audio context. Reused independently accepted7a82 ResourceAttribution fix plus video source HTML; did not import disclosure-hook changes. No source text/audio mutation.

Initial local run reused4173 served by /tmp/fia-wholeview-app and was stopped; explicitly INVALID, retained log. Corrected run isolates4820 from /tmp/fia-shared-integration; fixtures4799/4795/4185 started fresh. Twenty-seven affected cases include the requested Spanish/resource cases plus all directly failing fixture/inset/visual cases. Final result below. Historical failed assertions preserved in original CI log.

Budget original author3 plus additive author3 upper bound retained; root review required before push. No4794 or other worker edits.

Final local affected result:27/27 PASS in51.2seconds, including eight real visual clips cold-offline and exact migrated state. Current source/context and test updates reviewable together; release audit405PASS. No unchanged whole-suite repeat.
