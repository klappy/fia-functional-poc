# CI selector correction

CI run34666708712 returned36/37: the guided-session assertion still searched .guide-footer for Discuss together after the accepted collision correction moved that unchanged hint into .source-scroll. Updated only the selector to .source-scroll .guide-completion [role="status"], retained the same Discuss together text assertion, and added explicit visibility. No production UI, source, audio or release inventory changes.

Targeted existing real guide/Scripture selection/position persistence/reload test passed1/1 (2.1seconds) against the rebuilt inset preview at127.0.0.1:4761 using a temporary local Playwright config. Exact result in selector-correction.log. Full new-head CI and independent review remain pending.

Learning: when intentionally moving user-visible status, carry its existing integration assertion into the newly accepted source container; preserve text and add visibility rather than broadening to the page. Earlier targeted long/Finish coverage did not expose this stale locator. Conservative author charge upper bound1active minute of the additional author1 allowance, no reset.
