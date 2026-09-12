# Legacy guide and independent warnings

Remote inspected at 3b324b8 with no Autofix landed. When v2 has no guide field, restoreWorkspace now uses the validated legacy session while retaining v2 theme. Existing v2 fields/audio/resources retain their validation. This establishes legacy guide position only, not legacy audio/view fields absent from v1.

Spanish source-position notice, theme-write failure and progress-write failure now have independent state and status text, so a storage error cannot conceal source recovery. Successful storage retries clear their own errors only.

Strict release build passes: 210 files, 172 unchanged recordings. Six existing workspace tests pass. Three native tests pass (5.5 seconds): English S01-U002 legacy position survives Spanish theme write without v2 guide; invalid Spanish position and theme-only quota error both remain visible; existing 5-second audio/theme roundtrip remains passing.

Author <=2 minutes under explicit cumulative 69 extension, prior 65 retained. Local candidate awaiting root review before push. No new source/audio/provider or physical acceptance claims.
