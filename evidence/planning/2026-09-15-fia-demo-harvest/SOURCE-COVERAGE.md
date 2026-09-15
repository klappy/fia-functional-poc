# Source coverage — FIA demo harvest

## Identity, authority and retrieval limits

- **Private source pointer:** production Bee `/v1/conversations/10515454`; conversation `10515454`, transcription `15609581`. Title: AI Bible App Usability Review. Use the authorized Bee connector; no public transcript URL was returned.
- **Selection evidence:** listed metadata describes the FIA ugly-baby walkthrough; full content explicitly opens the ugly-baby demo and traverses the FIA Mark 1 flow, then closes with the recording handoff. This matches the requested September 15 16–17 Eastern meeting, which overran its scheduled end. No competing candidate is substituted.
- **Metadata window:** 2026-09-15T20:00:46.360Z to 2026-09-15T21:15:19.695Z (16:00:46.360–17:15:19.695 America/New_York, September 15). Created 2026-09-15T20:00:46.626Z; revision `updated_at=1789506963228` (2026-09-15T21:16:03.228Z). State **COMPLETED** in every retrieved page and end recheck.
- **End freshness observation:** 2026-09-15T21:20:59.063Z / 17:20:59 Eastern; production GET recheck with chunk=1 returned status200, truncated=false, identical source/revision, COMPLETED and denominator655. This is a point-in-time read, not monitoring or assurance of no later edits.
- **Denominator:** listing reported **1310** utterances; conversation relay consistently reported **655**, and all nine pages yielded **655 unique utterance IDs**, no repeated IDs, first `3403084560`, last `3403085702`. The listing discrepancy is unresolved; do not call 1310 utterances reviewed or silently assume duplicated storage. Completeness claim is bounded to all 655 utterances exposed by this conversation read surface.
- **Raw handling:** transcript text remained in Bee/tool memory. No raw transcript was written locally or to Git. These files contain derived paraphrases, IDs and coverage receipts only. No recording/audio/screens were inspected; source summary was not used as a substitute for utterance review.
- **Attribution limit:** many speakers are Unknown and some turns labeled Chris visibly include another person's question or answer. No individual commitment/decision authority is inferred solely from that label. Exact speaker-dependent assignments remain unverified; proposals and verbal reports remain labeled.
- **Capture limit:** relative transcript ranges are source-provided seconds (17–4312), not fabricated wall-clock alignment. First returned spoken_at=2026-09-15T20:00:43.000Z, last=2026-09-15T21:12:17.000Z; metadata end is later. Missing audio, transcription omissions, visual targets and the physical screen state cannot be ruled out. Opening and closing text are present. Obtain authorized original recording for these gaps (#38).
- **Processing limit:** Bee says COMPLETED; no unprocessed page remains on this surface. This does not prove perfect transcription or settle the count anomaly.

## Pagination receipt

All reads returned status200 and truncated=false. Chunk=100 was a soft request; the relay size cap returned fewer. Pagination is exclusive after the prior utterance ID. Terminal next_cursor was null.

| Page | Input since | Output next_cursor | Returned / total |
|---|---|---|---|
| 1 | null | 3403084731 | 79 / 655 |
| 2 | 3403084731 | 3403084831 | 76 / 655 |
| 3 | 3403084831 | 3403084918 | 72 / 655 |
| 4 | 3403084918 | 3403085042 | 71 / 655 |
| 5 | 3403085042 | 3403085191 | 74 / 655 |
| 6 | 3403085191 | 3403085486 | 74 / 655 |
| 7 | 3403085486 | 3403085567 | 74 / 655 |
| 8 | 3403085567 | 3403085641 | 74 / 655 |
| 9 | 3403085641 | null | 61 / 655 |

## Exhaustive returned-span disposition

Ordinal numbers are 1-based over the concatenated returned utterances; ID ranges name the first and last actual returned IDs, not every possible integer. Every one of the 655 returned utterances belongs to exactly one row below. A row can point to several checklist items where the discussion joins them; this preserves duplicate witnesses rather than creating duplicate work. Small acknowledgments, playback demonstrations and filler within a product range are contextual to that range, not additional authorizations. Explicit social/non-product ranges are retained without private narrative. Checklist witness fields retain every mapped range.

| Returned ordinal | Utterance ID endpoints | Source relative span | Count | Checklist disposition | Span meaning / contextual disposition |
|---|---|---|---|---|---|
| 1–74 | 3403084560–3403084725 | 17–360s | 74 | Context / no FIA work | Non-product: opening, social conversation and unrelated scheduling; no FIA action inferred. |
| 75–104 | 3403084726–3403084759 | 360–520s | 30 | #1 | Demo access, temporary hosting and first-use/recording setup. |
| 105–109 | 3403084760–3403084764 | 520–564s | 5 | #2, #30 | Source-match difficulty and placeholder voice/AI indicator. |
| 110–124 | 3403084765–3403084795 | 564–640s | 15 | #3 | Guided isolation and deliberate discussion pauses. |
| 125–137 | 3403084796–3403084810 | 640–704s | 13 | #4 | Next action unclear; color/prominence and theme comparison. |
| 138–141 | 3403084811–3403084814 | 704–745s | 4 | #4, #5 | Competing overall/action navigation and prototype consistency. |
| 142–150 | 3403084815–3403084825 | 745–800s | 9 | #3, #24 | Consolidated versus one-at-a-time views. |
| 151–157 | 3403084826–3403084833 | 800–852s | 7 | #6 | Ambiguous step labels and nested progress. |
| 158–166 | 3403084834–3403084844 | 853–882s | 9 | #3, #6 | Many substeps and overload. |
| 167–173 | 3403084845–3403084852 | 882–926s | 7 | #6 | Bars, levels, percentages, beads and dots alternatives. |
| 174–181 | 3403084853–3403084860 | 926–998s | 8 | #5, #7 | Secondary navigation and oral-user menu uncertainty. |
| 182–183 | 3403084861–3403084862 | 998–1024s | 2 | #29 | Spanish demonstration / language switching. |
| 184–187 | 3403084863–3403084867 | 1024–1072s | 4 | #7 | Visual/word-light reference app. |
| 188–191 | 3403084869–3403084875 | 1072–1117s | 4 | #8 | Passage/language selection beyond narrow PoC. |
| 192–202 | 3403084877–3403084889 | 1118–1216s | 11 | #9 | Generated visual narration and length concern. |
| 203–208 | 3403084890–3403084895 | 1216–1248s | 6 | #11 | Image-open versus playback confusion. |
| 209–222 | 3403084896–3403084911 | 1249–1335s | 14 | #9, #10 | Map selection, contextual relevance and narration examples. |
| 223–230 | 3403084912–3403084921 | 1335–1386s | 8 | #10 | Occurrence-specific clips versus reusable maps. |
| 231–236 | 3403084922–3403084932 | 1386–1427s | 6 | #11 | New-tab trapping and direct pinch zoom. |
| 237–239 | 3403084933–3403084935 | 1427–1446s | 3 | Context / no FIA work | Context: incidental image observations; no distinct product request. |
| 240–242 | 3403084936–3403084938 | 1447–1501s | 3 | #12 | Key-term resource playback/provenance. |
| 243–246 | 3403084939–3403084947 | 1502–1518s | 4 | #13 | Long key-term audio and absent draggable seeking. |
| 247–252 | 3403084948–3403084953 | 1519–1581s | 6 | #14 | Scripture alignment/highlighting and click-to-seek direction. |
| 253–253 | 3403084954–3403084954 | 1581–1589s | 1 | #15 | Unexpected playback during exploration. |
| 254–257 | 3403084955–3403084959 | 1589–1633s | 4 | #5, #16 | Clutter and supporting information controls. |
| 258–263 | 3403084960–3403084966 | 1633–1658s | 6 | #17 | Narration settings and source-first fallback preference. |
| 264–277 | 3403084967–3403084999 | 1658–1739s | 14 | #18 | Quality/size differences, checksums, saving and removal. |
| 278–286 | 3403085001–3403085018 | 1739–1825s | 9 | #19 | Passage size, download planning and proposed cleanup. |
| 287–294 | 3403085019–3403085035 | 1829–1857s | 8 | #4, #5 | Primary attraction and duplicated controls. |
| 295–298 | 3403085038–3403085042 | 1858–1911s | 4 | #20 | Checkbox/completion demonstration. |
| 299–306 | 3403085043–3403085054 | 1911–1985s | 8 | #4, #6, #20 | Visible progress and distraction reduction. |
| 307–316 | 3403085055–3403085064 | 1985–2042s | 10 | #6, #20 | Replace check circle, avoid rigid checking, retain resume. |
| 317–329 | 3403085066–3403085087 | 2042–2116s | 13 | #21 | Many play actions, automatic continuation and actual stops. |
| 330–343 | 3403085094–3403085118 | 2116–2222s | 14 | #22 | Text inflation and large-font example. |
| 344–347 | 3403085119–3403085122 | 2223–2239s | 4 | Context / no FIA work | Non-product: arrival and meeting catch-up. |
| 348–348 | 3403085123–3403085123 | 2239–2258s | 1 | #1 | Usability review context. |
| 349–354 | 3403085124–3403085134 | 2258–2278s | 6 | #39 | Official logo question and verbal answer. |
| 355–360 | 3403085140–3403085155 | 2278–2317s | 6 | #1 | Request for next-version feedback; compliments carry no acceptance. |
| 361–366 | 3403085156–3403085171 | 2317–2356s | 6 | #7 | Reference link and mixed opinions about its UX. |
| 367–371 | 3403085172–3403085177 | 2357–2408s | 5 | #7, #23 | Visual preference qualified against actual user familiarity/orality. |
| 372–373 | 3403085191–3403085192 | 2408–2443s | 2 | #6, #23 | Guided progress and physical-use constraints. |
| 374–383 | 3403085193–3403085217 | 2443–2528s | 10 | #4, #23 | Large obvious control; subtle elegance insufficient. |
| 384–388 | 3403085226–3403085232 | 2528–2546s | 5 | #1 | Feedback permission and review context. |
| 389–394 | 3403085233–3403085249 | 2547–2582s | 6 | #5, #6 | Navigation/progress confusion restated. |
| 395–397 | 3403085250–3403085255 | 2582–2605s | 3 | #3, #21 | One-at-a-time endorsement conditional on autoplay clarification. |
| 398–398 | 3403085256–3403085256 | 2612–2618s | 1 | #3 | Process volume context. |
| 399–404 | 3403085257–3403085264 | 2619–2642s | 6 | #3, #11 | Inline images positively received; preserve them. |
| 405–408 | 3403085266–3403085271 | 2642–2664s | 4 | #3, #27 | Large number of chunks remains challenging. |
| 409–417 | 3403085295–3403085344 | 2665–2728s | 9 | #24 | Information access, full view and shortcut concern. |
| 418–419 | 3403085345–3403085346 | 2730–2740s | 2 | #24 | Contextual analogy supporting shortcut concern; no unrelated task. |
| 420–422 | 3403085348–3403085368 | 2740–2763s | 3 | #24 | Guided default, toggle and timing of mode choice. |
| 423–426 | 3403085369–3403085372 | 2764–2808s | 4 | #8, #24 | Passage entry, overview and seeing modes before choice. |
| 427–438 | 3403085373–3403085472 | 2808–2872s | 12 | #25 | Stable action position plus secondary forward/back; open alternative. |
| 439–445 | 3403085474–3403085483 | 2872–2890s | 7 | #4, #25 | Primary control proposal positively received but not initially intuitive. |
| 446–453 | 3403085486–3403085493 | 2890–2956s | 8 | #4, #26 | Contrasting color and completed-state ideas. |
| 454–462 | 3403085494–3403085504 | 2956–3004s | 9 | #26 | Transient highlight too subtle. |
| 463–483 | 3403085505–3403085530 | 3004–3078s | 21 | #27 | Chunking review, dramatization setup/list over-fragmentation. |
| 484–490 | 3403085531–3403085537 | 3078–3148s | 7 | #28 | Text and audio backfill distinguished; generated descriptions. |
| 491–496 | 3403085538–3403085543 | 3148–3187s | 6 | #29 | Tooling and language-priority questions/assumptions. |
| 497–500 | 3403085544–3403085547 | 3188–3222s | 4 | #30 | External-user AI disclosure requirement. |
| 501–504 | 3403085548–3403085551 | 3224–3255s | 4 | Context / no FIA work | Non-product: voice-related joking; no product/voice authorization. |
| 505–507 | 3403085552–3403085554 | 3255–3278s | 3 | #1 | Help request and iterative-improvement framing; no proof of readiness. |
| 508–515 | 3403085555–3403085562 | 3279–3329s | 8 | #8, #31 | Visual passage mapping and candidate story illustrations. |
| 516–520 | 3403085563–3403085567 | 3329–3367s | 5 | #31 | Translation-term imagery versus story/navigation illustrations. |
| 521–527 | 3403085568–3403085574 | 3367–3429s | 7 | #31 | Icon proposal and consultant/exegetical review boundary. |
| 528–543 | 3403085575–3403085590 | 3430–3498s | 16 | #31 | Other candidate image sets; sources/licensing uncertain. |
| 544–549 | 3403085591–3403085596 | 3499–3542s | 6 | #32 | Pictures alone are not intuitive; icon-plus-text alternative. |
| 550–557 | 3403085597–3403085604 | 3545–3603s | 8 | #33 | Field demand, essentiality and facilitator-contact question. |
| 558–571 | 3403085605–3403085618 | 3604–3673s | 14 | #34 | Date recall, alpha/beta/feedback conflict and field-readiness expectation. |
| 572–572 | 3403085619–3403085619 | 3674–3710s | 1 | #18, #33, #34 | Second-delivery scope, pivot room and mandatory offline. |
| 573–575 | 3403085620–3403085622 | 3711–3740s | 3 | #35 | Store-install access question and uncertain schedule. |
| 576–592 | 3403085623–3403085639 | 3741–3878s | 17 | #35 | Parallel owner needed; account unready and mixed business/developer duties. |
| 593–600 | 3403085640–3403085647 | 3881–3920s | 8 | #35 | Setup help, lack of expertise and optimistic turnaround caution. |
| 601–603 | 3403085648–3403085650 | 3921–3943s | 3 | #36, #37 | Other ways to get onto phones if store not ready. |
| 604–608 | 3403085651–3403085655 | 3944–4002s | 5 | #40 | PWA/wrapper/native longer-term alternatives. |
| 609–618 | 3403085656–3403085665 | 4002–4062s | 10 | #37 | Obtainium/GitHub APK suggestion and policy concerns, unverified. |
| 619–623 | 3403085666–3403085670 | 4062–4116s | 5 | #33, #36 | Immediate field need and guided PWA install fallback. |
| 624–629 | 3403085671–3403085676 | 4116–4148s | 6 | #36, #40 | Fallback endorsement, initial hand-holding and hopeful summit store path. |
| 630–633 | 3403085677–3403085680 | 4148–4181s | 4 | #33, #36 | Facilitator-assisted short-term setup. |
| 634–639 | 3403085681–3403085686 | 4181–4226s | 6 | #4, #5, #6, #22 | Closing priorities: uncluttered controls, progress, large text. |
| 640–640 | 3403085687–3403085687 | 4226–4258s | 1 | #1, #38 | Recording needed to enumerate small issues; design iteration context. |
| 641–641 | 3403085688–3403085688 | 4258–4282s | 1 | #4, #6 | Design emphasis on progress and primary-action prominence. |
| 642–650 | 3403085689–3403085697 | 4283–4297s | 9 | Context / no FIA work | Non-actionable closing encouragement and thanks; not acceptance evidence. |
| 651–655 | 3403085698–3403085702 | 4297–4312s | 5 | #38 | Closing recording handoff promise and farewell. |

## Review state

Mechanical accounting: 655 returned, 655 unique, 655 mapped; 84 non-overlapping contiguous ordinal ranges; no unmapped returned utterance. Semantic completeness and exact-artifact/source fidelity require independent review; this worker does not self-certify that gate. No implementation, schedule, release or external message was performed.

