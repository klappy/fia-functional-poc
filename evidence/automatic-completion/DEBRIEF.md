# Automatic page completion

Accepted planning4 remains separate. Build12(author7/root3/coord2) plus accepted additive4(author3/root1) = build16. Prior budgets preserved. This is convenient playback progress, not listening verification.

Shared GuideScreen now places a compact check icon beside Info/Play. It toggles explicit true/false manual override and removes the bottom verbose Completed/Undo control. Existing discussion, warnings, navigation and Finish remain. Ordinary audio ended records source-bound page parts; seek-to-end counts normally. Guide alone cannot complete a page requiring nested resources or Scripture. Only the selected edition is required. No global catalog backfill, played-range monitoring or attention claim.

Schema2 migrates valid v1 marks as manual true. Explicit false survives future ended receipts and reload. Completed part identities persist; changed part hashes invalidate their old evidence. The shared event path rejects stale/cancel/error callbacks and does not emit a new receipt from restored-gap advancement. A dedicated controller test proves the restored-gap boundary. Source recording alternatives satisfy the same text part; preference changes alone do not create completion.

Root source review returned two defects: English inventory used a wording heuristic instead of the exact rendered cue set, and resource dialog playback lost its guide origin. e1623c5 uses ENGLISH_SCRIPTURE_CUES and captures page origin at dialog open in both languages. Catalog-origin dialogs carry no page. No playback/navigation behavior was changed to solve completion attribution.

Native evidence comprises20 distinct cases:8 heading width/theme/language cases preserving paused offset and focus;6 empty/partial/full marks with unchanged visit-based Finish;4 guide+resource/Scripture all-part cases across languages;2 resource-dialog origin cases. Initial18-test run had17 passes and one fixture failure: a live Play-button locator shrank when the first tile changed to Restart, skipping the second resource. Stable tile iteration corrected that one case, which passed separately. Two modal cases passed after root returns. Screenshots and initial/correction logs retained. Native playback deliberately uses normal seek-to-end behavior; it is not a listening claim.

The Spanish pure inventory test initially omitted the real prepared manifest; attaching the same manifest used by the app resolved that test fixture. An intermediate build stamp check caught a commit made while build was running; final build is performed after final commit. Those failures were not production fixes.

Learning: completion inventories must derive from the exact rendered source cue contract. Dialogs need captured origin rather than current-view inference. Playback completion events and navigation callbacks have different authority: a restored gap may advance without constituting newly completed playback.

Root independently reviews source and screenshots; exact CI/Bugbot and public readback remain coordinator gates. Main411e normal merge retains released settings and Medium source work.
