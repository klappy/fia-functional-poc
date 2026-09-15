import {storedNarrationPreference} from '../lib/narration.js';
import NarrationPreference from './NarrationPreference.jsx';
import {storedMediaQuality} from '../lib/media-variants.js';
import React,{useState,useEffect} from 'react';
import { GlassSurface } from '../vendor/glass/components/glass/GlassSurface.jsx';
import { GlassButton } from '../vendor/glass/components/glass/GlassButton.jsx';
import MediaQuality from './MediaQuality.jsx';
import InstallControls from './InstallControls.jsx';
export default function OfflineControls({state,onSave,onCancel,onRemove,onCheck,language="eng",audioComplete=false,pendingEditionTitles=[],information,warning}){const [narration,setNarration]=useState(()=>storedNarrationPreference());useEffect(()=>{const changed=()=>{setNarration(storedNarrationPreference());onCheck?.();};window.addEventListener('fia-narration',changed);return()=>window.removeEventListener('fia-narration',changed);},[onCheck]);const [quality,setQuality]=useState(()=>storedMediaQuality());useEffect(()=>{const changed=()=>setQuality(storedMediaQuality());window.addEventListener('fia-media-quality',changed);return()=>window.removeEventListener('fia-media-quality',changed);},[]);const spanish=language==='spa';const pending=pendingEditionTitles.length>0;const [confirm,setConfirm]=useState(false);const[totals,setTotals]=useState(null);useEffect(()=>{let active=true;setTotals(null);const base=spanish?'/offline-spa':'/offline-shell';Promise.all(['','-medium'].map(suffix=>fetch(base+suffix+(narration==='ai-only'?'':'-'+narration)+'.json').then(r=>{if(!r.ok)throw Error();return r.json();}).then(m=>[...new Map(m.entries.map(e=>[e.path,e])).values()].reduce((n,e)=>n+e.bytes,0)))).then(([original,medium])=>{if(active)setTotals({original,medium});}).catch(()=>{});return()=>{active=false;};},[language,narration]);return <><NarrationPreference showHelp={false}/><MediaQuality showHelp={false}/>{totals&&<p className="reading-note">Medium {(totals.medium/1_000_000).toFixed(1)} MB · Original {(totals.original/1_000_000).toFixed(1)} MB · saves {((totals.original-totals.medium)/1_000_000).toFixed(1)} MB.</p>}
 <GlassSurface level={2} shadow="rest" style={{padding:'10px 14px',marginBottom:12}}>
 <p role="status" className="offline-status">{state.status==='checking'?'Checking saved files…':state.status==='saving'?`Verified ${(state.bytes/1_000_000).toFixed(1)}${state.total?` of ${(state.total/1_000_000).toFixed(1)}`:''} MB…`:state.updateAvailable?'Update available for your current settings.':state.saved?`${state.quality==='medium'?'Medium':'Original'} saved on this device · files verified`:'Not saved on this device'}</p>
 {warning&&<p role="status">{warning}</p>}{state.error&&<p role="alert">{state.error}{(state.saved||state.previousSaved)?' The previous verified pack is still available.':''}</p>}
 <div className="offline-actions">{state.status==='saving'?<GlassButton onClick={onCancel}>Cancel save</GlassButton>:<GlassButton onClick={onSave} disabled={state.status==='checking'}>{state.updateAvailable?'Update saved passage':state.saved?'Verify and save again':'Save for offline'}</GlassButton>}</div>
 {(state.saved||state.previousSaved||state.corrupt)&&state.status!=='saving'&&<details className="reading-note"><summary>Manage saved files</summary><div className="offline-actions"><GlassButton onClick={onCheck}>Check saved files</GlassButton><GlassButton onClick={()=>setConfirm(true)}>Remove saved passage</GlassButton>{confirm&&<><span>Remove this passage’s saved content?</span><GlassButton onClick={()=>{setConfirm(false);onRemove();}}>Confirm removal</GlassButton><GlassButton onClick={()=>setConfirm(false)}>Keep saved passage</GlassButton></>}</div></details>}
 </GlassSurface>
 <details className="offline-help"><summary>More about offline saving</summary>
 <p className="reading-note">Narration applies to the next recording. Aquifer recordings are available for 21 English and 2 Spanish key terms. Aquifer only leaves unmatched recordings unavailable; AI fallback and AI only use generated recordings.</p>
 <p>Media quality applies to the next recording or image. Saved offline files remain unchanged until you save again.</p>
 {pending&&<p>Audio pending: {pendingEditionTitles.join(', ')}.</p>}
 <p>Saves the app, {spanish?'Spanish':'English'} text, images and recordings selected by your narration preference. Other recording alternatives, online videos and optional network fonts are not downloaded.</p>
 {information}
 </details><InstallControls language={language} compact/>
 </>;}
