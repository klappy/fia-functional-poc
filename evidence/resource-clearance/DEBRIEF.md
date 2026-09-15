# Shared resource clearance correction

Production source01ef691, based on225a67e. Both shells now use FloatingDock to measure the actual navigation/player stack. Spanish Resources receives the same resource-specific bottom padding as English. CSS adds actual height +16px dock offset +24px breathing room +safe-area once. No color, design-token or playback behavior change. Build454allowlisted files PASS at source01ef691;98unit tests PASS; content verification PASS.

Native Chromium8/8 PASS8.4seconds at466x987 and320x987, English/Spanish, player visible and absent. Absent is explicitly a DOM layout fixture hiding the idle player; navigation remains real. Verified local original images and fonts settle before maxscroll measurement. Every last tile and Play button clears the dock and receives the native center hit; no horizontal overflow. Spanish466: Espíritu tile bottom823, Play bottom812, dock top851; scroll1155+viewport987=document2142. Corresponding JSON/screenshots retained. Visually inspected Spanish466 and320 final screenshots: entire final row visible above both bars.

Initial timing-only geometry passed before delayed image layout completed; screenshot review caught the mismatch. A first attempted stability query did not target hidden integrity probes and returned two English hit-test failures; first-stability-return.log retained. Corrected harness waits actual image probes and local verified originals. Production CSS was unchanged during harness correction. This gate demonstrates settled rendered layout, not image-loading performance or safe-area device hardware. Safe-area composition is source-reviewed; simulated Chromium inset is zero.

Budget: original7 (author4/root2/coord1) retained; root accepted additive author2 for stabilized native evidence, total9, separately tracked by coordinator. No reset. Tests and receipt updates do not expand the correction.

Learning: language-specific layout wiring can defeat a shared visual component. Measure the complete floating stack in one shared component; validate the rendered final row after async media settles, rather than trusting an early geometry snapshot.
