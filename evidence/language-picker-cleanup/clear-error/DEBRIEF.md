# Same-language confirmation error cleanup

App passes an explicit clear-language-error callback to both sessions. Only deliberate same-language confirmation clears the prior failed-switch error before returning to content; failed target behavior still retains picker/error. No refetch, remount or audio action introduced.

Actual native regression passes both English and Spanish cases: fail other-language request, confirm current language, reopen picker, no alert/no added request/no play. Strict210-file build and mandatory exact stamp check pass. Remote inspected at64f5cc5; no Autofix incorporated yet. Author <=1.5 minutes under picker23 continuation, prior20 retained. Independent root review before push.
