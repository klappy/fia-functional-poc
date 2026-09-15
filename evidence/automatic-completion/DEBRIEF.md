# Automatic page completion

Accepted planning4 remains separate. Build12(author7/root3/coord2) plus accepted additive4(author3/root1) = build16. Prior budgets preserved. This is convenient playback progress, not listening verification.

Shared GuideScreen now places a compact check icon beside Info/Play. It toggles explicit true/false manual override and removes the bottom verbose Completed/Undo control. Existing discussion, warnings, navigation and Finish remain. Ordinary audio ended records source-bound page parts; seek-to-end counts normally. Guide alone cannot complete a page requiring nested resources or Scripture. Only the selected edition is required. No global catalog backfill, played-range monitoring or attention claim.

Schema2 migrates valid v1 marks as manual true. Explicit false survives future ended receipts and reload. Completed part identities persist; changed part hashes invalidate their old evidence. The shared event path rejects stale/cancel/error callbacks and does not emit a new receipt from restored-gap advancement. A dedicated controller test proves the restored-gap boundary. Source recording alternatives satisfy the same text part; preference changes alone do not create completion.

Root source review returned two defects: English inventory used a wording heuristic instead of the exact rendered cue set, and resource dialog playback lost its guide origin. e1623c5 uses ENGLISH_SCRIPTURE_CUES and captures page origin at dialog open in both languages. Catalog-origin dialogs carry no page. No playback/navigation behavior was changed to solve completion attribution.

Native evidence comprises20 distinct cases:8 heading width/theme/language cases preserving paused offset and focus;6 empty/partial/full marks with unchanged visit-based Finish;4 guide+resource/Scripture all-part cases across languages;2 resource-dialog origin cases. Initial18-test run had17 passes and one fixture failure: a live Play-button locator shrank when the first tile changed to Restart, skipping the second resource. Stable tile iteration corrected that one case, which passed separately. Two modal cases passed after root returns. Screenshots and initial/correction logs retained. Native playback deliberately uses normal seek-to-end behavior; it is not a listening claim.

The Spanish pure inventory test initially omitted the real prepared manifest; attaching the same manifest used by the app resolved that test fixture. An intermediate build stamp check caught a commit made while build was running; final build is performed after final commit. Those failures were not production fixes.

Learning: completion inventories must derive from the exact rendered source cue contract. Dialogs need captured origin rather than current-view inference. Playback completion events and navigation callbacks have different authority: a restored gap may advance without constituting newly completed playback.

Root independently reviews source and screenshots; exact CI/Bugbot and public readback remain coordinator gates. Main411e normal merge retains released settings and Medium source work.

## Second source return and final checks

Root caught an accidental ambient origin reference in English dialog navigation.852868b now preserves the captured page only when the next resource belongs to that page's current source-part inventory. Native dialog Next→Play completes both referenced resources. A separate catalog playback case verifies the guide's playedParts remain exactly unchanged; its initial fixture used the contextual button label instead of the catalog's Open label, then corrected the locator without production changes. Final native coverage is21 distinct cases (the prior20 plus catalog non-backfill); the English modal case is strengthened with Next navigation, not counted twice. Final full unit run116/116 and explicit13-test audio suite pass, including restored-gap nonreceipt.

## Bugbot entrypoint correction and quiet-button supersession

Accepted corrective4 raises build16 to20; accepted styling2 raises build20 to22. Planning4 remains separate. No work was presumed during the usage interruption. Published bot14fc2d2 was fetched and inspected before local edits. English cue anchoring now uses the exact cue set in both direct playback and the existing nested helper. Actual English guide+Scripture native passes.

Bot Spanish footer origin patch alone did not pass the real footer test: previous guide playback or a previously selected resource still overrode the open dialog's resource. Scoped resource-dialog precedence now chooses its actual resource, while matching active playback retains pause/resume/restart behavior. Final Spanish footer case plays both referenced dialog resources and completes the page, then respects manual unset/reload. Initial failed bot and prior-selection receipts are retained; final case passes6.4s.

Both completion states now use the normal existing glass IconButton, with text-title versus text-muted and aria-pressed distinguishing state. No primary/inverse fill. Four390px theme/language cases verify identical computed background before/after toggle and preserve focus/paused offset; actual screenshots show final treatment. Existing restart preserves item completionContext; restoration rebinds captured page/source through completionContext; restored-gap nonreceipt test remains applicable. No global navigation rewrite.
