# Automatic guide breathing space and intrinsic dock

Actual automatic transitions wait750ms in explicit queued-gap state. Visible completeditem/owner remains until next starts. Pause cancels timer and holdsnext; Resume is explicitmanualintent and startsheldnext once. Stop/newsource cancel pendingtimer; Restart cancels it and replays currentcompletedclip. Manual firstPlay and terminaldiscussion/finalstop have no timer.0.95/pitchtrue retained; no source/audio changes.

Dock now measures actual canonical navwidth viaResizeObserver, uses intrinsicwidth/padding6 and caps at actualmenu width. Long source labels ellipsize while44pxRestart stays visible; no sharedCSS modification.319/726 actualrect test passed.

33unit sweep passed before adding the exactclock case; finalfocused10audio tests passed including fake749msnoadvance/750msadvanceonce, heldgapPause/Resume,Restart/Stopghostsuppression. Initialbrowser polling consumed the750ms window before it could clickPause; retained as timing-observation failure, not suppressed. Final nativeAudioended test schedules a real DOMPause click immediately afterended, observesheldgap through800ms, then PlaywrightResume createsnext exactlyonce and checks0.95. Browser1PASS; captures showactual319/726width. This is a nativeevent fixture, not human latency proof or audioquality audition.

Upcoming primaryPrevious/Play/Next composition is only separately requested planning, not implemented. Author active upper3.5min including testtiming correction/evidence, vs3allocation; coordinator notified foraggregate accounting under8. Final review/CI pending.185files91,959,155bytes;164audiofiles unchanged.
