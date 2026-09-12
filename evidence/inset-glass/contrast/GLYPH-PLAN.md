# Narrow glyph comparison proposal — not implemented

Restored production f874206 rebuilt successfully; restored-build.log and current release inventory bind preview output. Rejected sibling-backdrop experiment is not served.

Actual source finding: shared chevrons use pinned Icon size18/defaultstroke1.7 on24-unit viewBox, giving nominal1.275CSSpx stroke. Actual card information SourceIcon and play MediaIcon defaultsize20/stroke2 on24-unit viewBox, giving nominal1.667CSSpx stroke. Thus prior computed button-style equality did not prove glyph equality: side glyphs are10%smaller and approximately23.5%thinner than actual card glyphs. The shared center uses explicit18MediaIcon but stillstroke2. These are observed component inputs, not perceptual contrast measurements.

Pinned GlassIconButton provides light/night/dark only. Light already matches actual secondary card controls. Night uses same dark-theme white.09 rather than .14, so it does not supply evidence of better isolation; dark is primary and violates normal secondary requirement. Earlier solid treatment and material-floating shell were explicitly rejected. No untried approved surface variant can be presented as a verified fix.

Propose only shared-side Icon size20 stroke2, using exact existing card glyph size/stroke and same pinned chevron outline; preserve entire GlassSurface, secondary button materials, padding44px and completed emphasis. This is a precise source-grounded glyph hierarchy correction, not a guaranteed contrast repair. Before accepting, A/B the identical dark ULT scroll position with source text crossing each enabled chevron and compare same-scale crops against actual card info/play. Reject if glyph still disappears; do not infer PASS from larger dimensions. No palette, backdrop or shell change.

This turn authorized rebuild+diagnosis only; no glyph implementation performed. Root affected plan decision needed before implementation. Conservative author charge<=2minutes of authorized3; remaining<=1reserved, total58 preserves53. Native completion/secondary-center behavior unchanged.
