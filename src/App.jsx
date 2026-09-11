import OfflineControls from './components/OfflineControls.jsx';
import { OfflineController } from './lib/offline.js';
import NarrationControls from './components/NarrationControls.jsx';
import { SpeechController, englishVoices } from './lib/speech.js';
import { AuroraField } from './vendor/glass/components/glass/AuroraField.jsx';
import { GlassSearch } from './vendor/glass/components/forms/GlassSearch.jsx';
import { FilterChips } from './vendor/glass/components/forms/FilterChips.jsx';
import ResourceTile from './components/ResourceTile.jsx';
import { resourceLabel } from './lib/resource-label.js';
import React, { useEffect, useState, useRef } from 'react';
import { GlassSurface } from './vendor/glass/components/glass/GlassSurface.jsx';
import { GlassButton } from './vendor/glass/components/glass/GlassButton.jsx';
import SessionHeader from './components/SessionHeader.jsx';
import StepFlow from './components/StepFlow.jsx';
import ScripturePanel, { VersionPicker } from './components/ScripturePanel.jsx';
import ResourceDialog from './components/ResourceDialog.jsx';
import SourceDetails, { SafeHtml } from './components/SourceDetails.jsx';
import { loadContent } from './lib/content.js';
import { restoreSession, persistSession, browserStorage } from './lib/session.js';
import { moveUnit, selectStep, hiddenUnit, canFinish, currentPosition } from './lib/flow.js';
function GuideSource({ pack, examplesOnly = false }) {
  const [showExamples, setShowExamples] = useState(examplesOnly);
  return <>{!examplesOnly && <SourceDetails item={pack.guide}/>}<p>Original guide text. Formatting is adapted; possible drama responses are hidden until requested.</p>
    {!showExamples && <GlassButton onClick={() => setShowExamples(true)}>Show source example</GlassButton>}
    {pack.guide.steps.filter(step => !examplesOnly || step.id === 'S04').map(step => <section className="complete-source-section" key={step.id}><h3>{step.title}</h3>{step.units.filter(unit => examplesOnly ? hiddenUnit(unit.id, pack.cues) : showExamples || !hiddenUnit(unit.id, pack.cues)).map(unit => <SafeHtml key={unit.id} html={unit.html}/>)}</section>)}
  </>;
}
function Session({ pack }) {
  const [boot] = useState(() => restoreSession(browserStorage(), pack.guide, pack.cues));
  const [session, setSession] = useState(boot.session);
  const [view, setView] = useState('guide');
  const [selection, setSelection] = useState(null);
  const [storageError, setStorageError] = useState(boot.storageError);
  const [filter, setFilter] = useState('all'); const [query,setQuery]=useState('');
  const [offlineState,setOfflineState]=useState({status:'checking',saved:false});const offline=useRef(null);
  useEffect(()=>{const controller=new OfflineController(setOfflineState);offline.current=controller;controller.init();return()=>controller.dispose();},[]);
  const [voices,setVoices]=useState([]),[voiceId,setVoiceId]=useState(''),[speechState,setSpeechState]=useState({status:'idle',error:''});
  const speech=useRef(null);if(!speech.current)speech.current=new SpeechController(window.speechSynthesis,window.SpeechSynthesisUtterance,setSpeechState);
  useEffect(()=>{const refresh=()=>{const available=englishVoices(window.speechSynthesis);setVoices(available);setVoiceId(old=>available.some(v=>v.voiceURI===old)?old:(available.find(v=>v.localService)??available[0])?.voiceURI??'');};refresh();window.speechSynthesis?.addEventListener('voiceschanged',refresh);return()=>{window.speechSynthesis?.removeEventListener('voiceschanged',refresh);speech.current.stop();};},[]);
  const stop=()=>speech.current.stop();const changeView=value=>{stop();setView(value);};
  const readGuide=()=>{const items=[];let cursor=session;for(let i=0;i<130;i++){const pos=currentPosition(cursor,pack.guide,pack.cues),next=pos.isStop?cursor:moveUnit(cursor,1,pack.guide,pack.cues);items.push({id:pos.unit.id,text:pos.unit.text,next});if(pos.isStop||next===cursor)break;cursor=next;}speech.current.speak(items,voices.find(v=>v.voiceURI===voiceId),item=>setSession(item.next));};

  useEffect(() => { setStorageError(!persistSession(browserStorage(), session)); }, [session]);
  const bible = pack.scripture.find(x => x.resourceCode === session.version);
  const version = value => {stop();setSession(current => ({ ...current, version: value }));};
  const step = id => { stop();setSession(current => selectStep(current,id,pack.guide,pack.cues)); setView('guide'); };
  const resource = item => {stop();setSelection({ item });};
  return <AuroraField className="app-aurora" drift={false}><div className="app-shell">
    <a className="skip-link" href="#session-main">Skip to passage</a>
    <SessionHeader view={view} setView={changeView} visited={session.visited.length}/>
    <main id="session-main" tabIndex="-1">
      <OfflineControls state={offlineState} onSave={()=>offline.current.save()} onCancel={()=>offline.current.cancel()} onCheck={()=>offline.current.check()} onRemove={()=>offline.current.remove()}/>
      <NarrationControls voices={voices} voiceId={voiceId} setVoiceId={id=>{stop();setVoiceId(id);}} state={speechState} onGuide={readGuide} onScripture={()=>speech.current.speak([{text:bible.verses.map(v=>v.text).join(' ')}],voices.find(v=>v.voiceURI===voiceId))} onPause={()=>speech.current.pause()} onResume={()=>speech.current.resume()} onStop={stop}/>

      {boot.restored && <p className="return-note">Your position on this device was restored. Reading restarts at the current guide section.</p>}
      {storageError && <p role="status" className="return-note">Your position could not be stored on this device. You can continue this session.</p>}
      {session.finished && <GlassSurface className="completion-note" level={4}><h2>Session finished</h2><p>All six steps were visited. This records your choice to finish, not an assessment of understanding.</p><GlassButton onClick={() => { setSession(current => ({ ...current, finished: false })); changeView('guide'); }}>Return to the guide</GlassButton></GlassSurface>}
      {view === 'guide' && <><VersionPicker value={session.version} onChange={version}/><StepFlow session={session} pack={pack} onMove={direction => {stop();setSession(current => moveUnit(current,direction,pack.guide,pack.cues));}} onStep={step} onResource={resource} onScripture={() => changeView('scripture')} onSource={() => {stop();setSelection({ title:'Complete source guide', children:<GuideSource pack={pack}/> });}} onExamples={() => {stop();setSelection({ title:'Source example — possible responses', children:<GuideSource pack={pack} examplesOnly/> });}} onFinish={() => { if (canFinish(session,pack.guide)) setSession(current=>({...current,finished:true})); }}/></>}
      {view === 'scripture' && <ScripturePanel bible={bible} onVersion={version}/>}
      {view === 'resources' && <section aria-labelledby="resources-title"><div className="resource-heading"><div><p className="eyebrow">For this passage</p><h2 id="resources-title">Explore the resources</h2></div></div><p className="resource-count">21 key terms · 4 maps · 4 images · 3 online video links</p><GlassSearch aria-label="Search resources" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search this passage’s resources"/><FilterChips aria-label="Resource types" className="resource-filters" bleed={false} options={[{value:'all',label:'All'},{value:'map',label:'Maps'},{value:'image',label:'Images'},{value:'term',label:'Key terms'},{value:'video',label:'Video links'}]} value={[filter]} onChange={values=>setFilter(values.at(-1)??'all')} style={{flexWrap:'wrap',margin:'14px 0 20px',overflow:'visible'}}/><div className="resource-grid">{pack.resources.filter(item=>(filter==='all'||item.kind===filter)&&resourceLabel(item).toLowerCase().includes(query.trim().toLowerCase())).map(item=><ResourceTile key={`${item.resourceCode}/${item.content_id}`} item={item} onOpen={resource}/>)}{!pack.resources.some(item=>(filter==='all'||item.kind===filter)&&resourceLabel(item).toLowerCase().includes(query.trim().toLowerCase()))&&<p role="status">No resources match this search.</p>}</div></section>}
    </main>
    <footer className="app-footer"><p>FIA · English passage PoC</p><p>Synthetic narration uses browser voices. Saved files are verified before offline availability is shown.</p><p>Speak and explore together; nothing is recorded.</p></footer>
    {selection && <ResourceDialog key={selection.item?.content_id ?? selection.title} selection={selection} onClose={()=>setSelection(null)}/>}
  </div></AuroraField>;
}
export default function App() {
  const [pack,setPack] = useState(null); const [error,setError] = useState(''); const [attempt,setAttempt] = useState(0);
  useEffect(()=>{ const controller=new AbortController(); setError(''); setPack(null); loadContent(controller.signal).then(setPack).catch(error=>{if(error.name!=='AbortError')setError(error.message);}); return()=>controller.abort(); },[attempt]);
  if(error)return <main className="loading-state"><h1>The passage could not be opened</h1><p role="alert">{error}</p><p>No replacement content has been substituted.</p><GlassButton onClick={()=>setAttempt(x=>x+1)}>Try again</GlassButton></main>;
  if(!pack)return <main className="loading-state"><h1>FIA</h1><p role="status">Opening the verified passage…</p></main>;
  return <Session pack={pack}/>;
}
