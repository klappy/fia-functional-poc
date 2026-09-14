# Picker readability correction proposal

Bound base02b2370. Actual shared LanguagePicker uses material-floating even within the app panel and glass-fill-3 for selected row, producing white-on-white stacking in light mode. Actual GlassTabBar uses surface-inverse/text-on-inverse for selected state. Borrow that exact semantic pair through opt-in selectedTreatment=inverse; explicitly inherit its foreground for nested names/code/status. Add opt-in inline surface using material-card/shadow-card, leaving popover/sheet defaults unchanged. No palette additions. Preserve the full picker/search/selection semantics.

Status must read prepared manifest entries: verified Spanish pack.preparedAudio where provided, otherwise the bundled static Spanish manifest (English gateway). Report partial prepared narration if any entries exist; do not promise all scopes/audio-first completeness. No new network/provider or source changes. Actual 319/466 light/dark captures and keyboard/selection checks required after implementation. This is a separate PR from critical cache correction.

Source: src/vendor/glass/components/language/LanguagePicker.jsx; components/navigation/GlassTabBar.jsx; tokens/glass.css,colors.css,theme-dark.css,elevation.css. The component change is an application adaptation of those actual DS patterns, not an upstream feature claim.
