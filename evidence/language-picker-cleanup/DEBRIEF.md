# Build checkpoint — not release-ready

Implemented approved full-picker options, existing language icon, remembered destination/verified-success exit, same-language no-fetch exit, separate theme-aware native options and manifest-derived release stamp. Version0.1.1, changelog and release binding included. Original shared hashes retained alongside honest local modification hashes.

Strict build/content checks pass: 210 files, 172 unchanged recordings. Full Spanish14 native regressions pass, including real offline upgrade; old duplicated-English selector changed to actual deduplicated label. Two new picker tests pass (search/selection/destination, busy/failure). Initial unit52/53 failed new GlassSelect hash; updated explicit adaptation manifest and affected vendor test passes. New release stamp test requires final execution after final commit/build.

UNRESOLVED: native keyboard option selection in headless test leaves S01 unchanged despite focus/Space/ArrowDown/Enter; original failure and repeated evidence retained. Only initial English-light after screenshot captured before this assertion. Actual English/Spanish open-dropdown visual verification and full both-theme captures remain pending, not passed. Before screenshots captured from released4794. No claim of whole visual acceptance or release.

Author conservative <=7 minutes consumed under picker15 allocation (plan2 earlier retained). Root review/remaining native diagnosis and final gates required; no PR or push yet. No source/media/audio generation or cache semantics change.

## Bounded follow-up

All8 picker views captured at320/466, English/Spanish, light/dark; four native-control capture attempts and native-option-diagnostic.json retained. Actual select remained focused but ArrowDown/Enter did not change its value in headless Chromium; OS popup was not included in screenshots. This is not native popup or OS keyboard acceptance. Computed option tokens are dark white on rgb27/30/35 and light rgb14/20/32 on white, with matching color-scheme. Test now explicitly checks programmatic selection response and tokens, not falsely labels that as physical popup evidence. Original failures preserved. Root authorized bounded native-option fix with this precise limitation.

Fresh c80e9a6 build/stamp test passes; stamp0.1.1+c80e9a6. Final source-equivalent commit requires coordinator final build stamp refresh before promotion. Additional author <=2 minutes under picker18 total, preserving15. No PR until root final review.
