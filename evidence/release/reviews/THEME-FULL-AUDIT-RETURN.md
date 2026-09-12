# Independent theme audit — RETURN

Candidate: 14c062007ceb30a5bbd221962472213caae3f5b9 (product c2aa0481b82e5683bd278cadca61148c00d14375). Isolated worktree /tmp/fia-theme-independent, preview port 4601. This is historical candidate evidence, not acceptance of subsequent repairs.

Observed coverage: complete app CSS and shared root/token/component styling path inspected, including inline SVG image color inheritance, typography tiers, floating materials, selected/disabled controls, progress and native inputs. Browser captured 168 viewport states: 21 states × widths 319/390/726/1280 × light/dark. All eight contact sheets were visually inspected. No document horizontal overflow was measured in these captures. Contact sheets support composition inspection, not per-glyph legibility certification. Guide captures named short/long can share persisted positions; those labels do not prove distinct lengths. Some image detail captures contain a transient Loading image label; they do not establish completed image loading. Existing independent media/flow tests remain separate.

Confirmed contrast defects, 726px dark: text was made transparent with unchanged layout/background and the glyph-local center background pixel sampled from the resulting screenshot. WCAG sRGB luminance calculation:

| Text | Foreground | Background | Coordinate | Ratio |
|---|---|---|---|---|
| BSB badge | 167,173,182 | 118,134,142 | 179,227 | 1.67 |
| Verse 1 | 126,133,143 | 73,98,109 | 51,271 | 1.73 |
| Berean Standard Bible credit | 126,133,143 | 90,76,130 | 363,743 | 2.02 |
| Source and attribution | 92,134,242 | 76,78,82 | 363,805 | 2.44 |

These are small text and fail 4.5:1. Use scoped semantic text/link composition corrections, preserving upstream token provenance. The initial broad-container median script is diagnostic only and explicitly rejected as contrast acceptance evidence. Hidden closed-details descendants are excluded. Index selector returned no elements: no numeric index contrast measurement is claimed.

Other independently observed historical concerns agree with parent: dark Info/Restart external SVG currentColor is isolated from host color; floating tab material permits underlying colored media bleed; muted descriptions and links visually weak. Parent separately found the 627px header alignment issue and current card badge regression. Their fixes need exact current-head readback, not inheritance from this historical matrix.

Evidence: /tmp/fia-theme-audit/matrix.json; all screenshot paths listed therein; eight sheet-*.png contact sheets; exact-contrast.json; bg-scripture.png; bg-link.png; measure.py. No public/private transcript content projected. No source/audio changes or provider calls.

Review charge: 11 active minutes total upper bound (original 3 + authorized extension 8), no reset. Final repaired-candidate review is pending separately authorized time. Verdict RETURN; full repaired-theme acceptance remains pending.
