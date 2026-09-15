from pathlib import Path
import json,hashlib,datetime
from zoneinfo import ZoneInfo
r=Path(__file__).resolve().parent
states=list({x['file']:x for x in json.loads((r/'capture-states.json').read_text())}.values());states.sort(key=lambda x:x['file']);(r/'capture-states.json').write_text(json.dumps(states,indent=2))
for x in states:
 if x['file'].startswith('screenshots/17-'):x['note']='TRANSITIONAL map modal while image loading; not evidence of failed map rendering. Loaded-map follow-up did not meet image-complete condition within10seconds; no defect cause inferred.'
 if x['file'].startswith('screenshots/15-'):x['note']='FAILED NAVIGATION: unsaved browser context switched offline and reload failed; blank browser error page, not an app screenshot or evidence of broken saved-offline capability.'
(r/'capture-states.json').write_text(json.dumps(states,indent=2))
normal=[x for x in states if not x['file'].startswith(('screenshots/14-','screenshots/15-','screenshots/16-','screenshots/17-'))]
manifest='''# FIA demo baseline — preserved current-origin capture

**Release 0.1.17+8121c11.** This is a post-meeting visual baseline from the live product, captured in an isolated browser. It is not a recording of the meeting participant’s screen or cache.

![Initial mobile guide](screenshots/01-initial-light.png)

[Browse all captures and the 40-case mapping](SCREENSHOT-MAP.md). The 40 harvested observations are acceptance cases for systemic UX assessment, not an instruction to implement 40 separate patches.

## Version and historical certainty

- Independently fetched `https://fia.klappy.dev/` before screenshots: `fia-release=0.1.17+8121c11`, JS `index-D-yTwoPA.js`, CSS `index-BjTcFI7j.css`.
- Exact source commit, **attributed to root/coordinator deployment verification**, is `8121c11e16c65d06ae29163e452c8ea661d8e921`. Root-reported Cloudflare deployment `84c83aed-18ff-4203-ba31-4425b3c42aeb`, created 2026-09-15T18:46:17.387029Z, served 100% version `c745c1e1-f599-474b-b5ab-9924247e5e0a`. Build `c6cd04d5-9d98-4779-9e54-640cb2f42a09` succeeded with that source/release. Receipt: kitchen `rail/2-cooking/2026-09-15-fia-demo-baseline-snapshot/BASELINE-INPUT-RECEIPT.md`, recorded at commit `8f5f4015`.
- Root reports no intervening deployment during the meeting or through approximately21:28Z. This worker independently checked live assets, not Cloudflare history. Origin continuity supports the deployed version; the meeting browser’s service-worker/cache state remains unproven. No exact historical screen claim.
- Offline shell revision `253e4ee29dc406661f724f5411769fdb553bcf868037c6bd5bef92a3b39da2ff`; complete returned shell manifest and every declared hash are preserved at `served/offline-shell.json`. English source revisions are in `served/content/mark-1-1-13/manifest.json`; Spanish prepared content is also embedded in the preserved JS and audio provenance is in `served/audio/spa/manifest.json`.
- The last independent HTML/shell byte comparison is recorded in `end-recheck.json`; both were unchanged. Runtime screenshots expose the same stamp where the page contains app HTML. Original-image tab and failed navigation naturally have no release metadata.

## Capture conditions

- Chromium153.0.8010.12, Playwright1.63.0, Node22.16.0, macOS host, headless desktop browser. Mobile-sized viewport390×844, device scale1; desktop23 is1440×1000. This is viewport emulation, not physical phone proof.
- September15,2026. Individual UTC timestamps and complete selected workspace state are in `capture-states.json`; subtract4hours for America/New_York. Screenshots are viewport-only, not full scrolling documents.
- Initial language English, theme light, default narration `Aquifer + AI fallback`, quality `Smaller downloads (Medium)`. #02 selects dark. #21/#22/#24 select Spanish; interface chrome stays English. No narrator setting changed and no pack downloaded. Unit, resource selection, theme and available local state are recorded per capture; initial guide S01-U001, dramatization S04 start/next.
- Fresh isolated browser contexts used existing installed Playwright. Some captures share local navigation state within one script; no user browser profile, credentials, raw meeting transcript or private conversation is captured. App assets were read only. No new dependency, service, deployment or implementation.
- Audio20 and19 are visual states after play activation only. No audio recording, direct listening verdict, seeking/alignment validation, or full playback-completion test was performed.

## Artifacts and integrity

`served/` preserves exact returned HTML, JS, CSS, service worker, icons, content JSON, audio/visual/alignment manifests and the offline-shell inventory. `served/capture-inventory.json` records their URLs, byte counts, hashes and matching declared hashes. All downloaded files with declared shell hashes matched. `SHA256SUMS` binds screenshot and supporting artifact bytes, excluding itself and independently supplied REVIEW.md.

Large audio/image packs were not copied wholesale. The preserved manifests retain paths and hashes for covered assets, but this is **not a standalone offline replay bundle**. External/proxied media, online videos and any unmanifested response may be mutable or unavailable later. A screenshot preserves observed pixels, not every underlying media byte. Full original image18 used the live same-origin `/assets/mark-1-1-13/c168.png`.

Capture scripts are included as a reproducible interaction recipe: `capture.cjs`, `capture-extra.cjs`, `capture-final.cjs`, `capture-settled.cjs`. Set `PLAYWRIGHT_MODULE` to an existing compatible installation; scripts default to the observed library path and navigate live production. Running them later is a **new current-live capture**, not replaying pinned bytes. Reproduce a pinned application separately from source commit and served archive in an isolated environment; no such reconstruction was run here. Never use the unrelated old `/tmp/fia-auto-completion/dist`.

## Qualifications and untested scope

-14 is a local200% root-font override that did not materially inflate fixed-size text;16 doubles element computed fonts and shows truncation/overlap. Both are synthetic diagnostic modifications in the isolated page, **not actual OS text scaling or untouched product screens**.
-15 is failed unsaved offline navigation, excluded from normal app-gallery counts. No saved-pack or installed-PWA offline judgment follows.
-17 preserves a loading state. A follow-up waited10seconds for a complete image with naturalWidth>0 and did not meet that condition; no25 capture exists and the cause is unverified.18 does preserve the full-size original in a separate tab. No physical pinch gesture was exercised.
- Earlier draft21 caught an English-to-Spanish transition and was corrected during capture before final freeze;20–23 were recaptured. Review must use final hashes, not earlier observations. Locator-development timeouts were tooling issues, not app defects.
- No complete coverage of all40 topics: organizational account setup, field readiness, human comprehension, licensing/authority, source-matching quality, language expansion, historical schedule and recorded speaker identity cannot be proven by screenshots. SCREENSHOT-MAP explicitly accounts for unrepresented cases.

## Review and persistence

Worker inspected representative product images, synthetic inflation and localized output. Independent full visual/hash/disclosure review and Git readback belong to the coordinator. Local capture is not Git persistence. All files remain subject to exact-artifact review; final frozen hashes are the comparison basis.
'''
manifest+=f'\nFinal inventory at generation: {len(states)} image files; {len(normal)} normal app/original-image captures, plus explicit loading, diagnostic and failed-navigation states. Capture interval {min(x["capturedAt"] for x in states)} to {max(x["capturedAt"] for x in states)}.\n'
start_et=datetime.datetime.fromisoformat(min(x['capturedAt'] for x in states).replace('Z','+00:00')).astimezone(ZoneInfo('America/New_York'));end_et=datetime.datetime.fromisoformat(max(x['capturedAt'] for x in states).replace('Z','+00:00')).astimezone(ZoneInfo('America/New_York'));manifest+=f'\nAmerica/New_York capture interval: {start_et.isoformat()} through {end_et.isoformat()} (EDT).\n';(r/'BASELINE.md').write_text(manifest)
rows=[]
for x in states:
 sha=hashlib.sha256((r/x['file']).read_bytes()).hexdigest()
 rows.append(f'| [{Path(x["file"]).stem}]({x["file"]}) | {x["capturedAt"]} | '+', '.join('#'+str(i) for i in x['checklistIds'])+f' | {x["note"]} | `{sha}` |')
coverage=[]
for i in range(1,41):
 matches=[f'[{Path(x["file"]).stem}]({x["file"]})' for x in states if i in x['checklistIds']]
 coverage.append(f'| #{i} | '+('; '.join(matches) if matches else 'Not visually demonstrated by this bounded capture; retain checklist evidence and required later validation.')+' |')
(r/'SCREENSHOT-MAP.md').write_text('# Screenshot map and case coverage\n\nAll images are post-meeting current-live captures. IDs point to the40-item delivery checklist in the adjacent harvest evidence. A mapped image shows relevant UI; it does not certify acceptance. See BASELINE.md for cache, language, narration and historical limits.\n\n![Desktop initial guide](screenshots/23-desktop-initial.png)\n\n![Settled Spanish guide](screenshots/24-spanish-guide-settled.png)\n\n## Capture index\n\n| Image | UTC capture time | Checklist IDs | State / qualification | SHA256 |\n|---|---|---|---|---|\n'+'\n'.join(rows)+'\n\n## All40 acceptance topics\n\n| Checklist item | Relevant images or explicit uncovered scope |\n|---|---|\n'+'\n'.join(coverage)+'\n')
files=sorted(p for p in r.rglob('*') if p.is_file() and p.name not in ['SHA256SUMS','REVIEW.md'])
(r/'SHA256SUMS').write_text(''.join(hashlib.sha256(p.read_bytes()).hexdigest()+'  '+str(p.relative_to(r))+'\n' for p in files))
print('manifest ready',len(states),'images',len(files),'bound files')
