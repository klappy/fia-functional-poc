# Disclosure and highlighting integration

Base baa30a0 retains shared Guide, Scripture, Resources and picker with complete prepared Spanish audio. Cherry-picked accepted disclosure 301a82f and closure 0c75c65. The only content conflict was SpanishSession: keep both SourceHighlight and AudioDisclosureInfo imports, retain ResourceDialog playback state and add Info alongside offline controls. AudioController owner/generation fields and source highlighting are unchanged.

Version 0.1.7. Four disclosure unit tests pass. Native closure proves canceled notice fetch does not latch or play, and a remembered notice checkpoint resumes the correct resource only explicitly. Native verse lifecycle proves paused restore/no autoplay, active verse progression, gap/error clearing and focus preservation. Both languages' resource bodies highlight actual content and paused position; the remaining unseen AI notice is not highlighted. Test expectations now skip the synthetic introduction per accepted operator policy.

No source or audio bytes changed. Exact release build and inventory are generated after this frozen commit. Preview 4830 is isolated; coordinator owns switching 4794. Author charge: at most two active minutes, additive allocation retained.
