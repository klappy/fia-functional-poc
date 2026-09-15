# Shared resource bottom clearance

Proposed allocation: author4, independent root review2, coordinator1 (7 total), new bounded correction; no earlier budget reset.

Observed source at225a67e: English App measures floating nav/player and applies resources-view padding. SpanishSession renders the same fixed bars but does not measure their combined height or apply resources-view, leaving94px shell padding. On mobile bars stack and may wrap, so the final resource row can remain behind them at maximum document scroll.

Extract the existing layout measurement into a shared FloatingDock component used by both shells. ResizeObserver measures the whole dock and navigation width; calculate resource clearance from actual dock height + bottom offset + breathing room, with safe-area inset supplied by CSS once. Mark Spanish resources view identically to English. Preserve all playback behavior, source choices, colors and card styling.

Driver check: after scrolling as far as possible, the last tile including its Play button must lie above the floating dock, and the button must receive the hit at its center. Test English/Spanish at466x987 and320x987 with player present and absent (absent layout fixture hides only player). Verify no horizontal overflow and shared computed clearance. Reject fixed device-specific padding and Spanish-only visual duplication.

Native browser geometry/hit tests plus screenshots for8cases; build and targeted checks. No CI assertion files owned by other worker touched.
