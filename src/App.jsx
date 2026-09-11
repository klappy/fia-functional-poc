import { resourceLabel } from './lib/resource-label.js';
import React, { useEffect, useState } from 'react';
import { GlassSurface } from './vendor/glass/components/GlassSurface.jsx';
import { GlassButton } from './vendor/glass/components/GlassButton.jsx';
import SessionHeader from './components/SessionHeader.jsx';
import StepFlow from './components/StepFlow.jsx';
import ScripturePanel, { VersionPicker } from './components/ScripturePanel.jsx';
import ResourceDialog from './components/ResourceDialog.jsx';
import SourceDetails, { SafeHtml } from './components/SourceDetails.jsx';
import { loadContent } from './lib/content.js';
import { restoreSession, persistSession, browserStorage } from './lib/session.js';
import { moveUnit, selectStep, hiddenUnit, canFinish } from './lib/flow.js';
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
  const [filter, setFilter] = useState('all');
  useEffect(() => { setStorageError(!persistSession(browserStorage(), session)); }, [session]);
  const bible = pack.scripture.find(x => x.resourceCode === session.version);
  const version = value => setSession(current => ({ ...current, version: value }));
  const step = id => { setSession(current => selectStep(current,id,pack.guide,pack.cues)); setView('guide'); };
  const resource = item => setSelection({ item });
  return <div className="app-shell">
    <a className="skip-link" href="#session-main">Skip to passage</a>
    <SessionHeader view={view} setView={setView} visited={session.visited.length}/>
    <main id="session-main" tabIndex="-1">
      {boot.restored && <p className="return-note">Your position on this device was restored. Reading restarts at the current guide section.</p>}
      {storageError && <p role="status" className="return-note">Your position could not be stored on this device. You can continue this session.</p>}
      {session.finished && <GlassSurface className="completion-note" level={4}><h2>Session finished</h2><p>All six steps were visited. This records your choice to finish, not an assessment of understanding.</p><GlassButton onClick={() => setSession(current => ({ ...current, finished: false }))}>Return to the guide</GlassButton></GlassSurface>}
      {view === 'guide' && <><VersionPicker value={session.version} onChange={version}/><StepFlow session={session} pack={pack} onMove={direction => setSession(current => moveUnit(current,direction,pack.guide,pack.cues))} onStep={step} onResource={resource} onScripture={() => setView('scripture')} onSource={() => setSelection({ title:'Complete source guide', children:<GuideSource pack={pack}/> })} onExamples={() => setSelection({ title:'Source example — possible responses', children:<GuideSource pack={pack} examplesOnly/> })} onFinish={() => { if (canFinish(session,pack.guide)) setSession(current=>({...current,finished:true})); }}/></>}
      {view === 'scripture' && <ScripturePanel bible={bible} onVersion={version}/>}
      {view === 'resources' && <section aria-labelledby="resources-title"><div className="resource-heading"><div><p className="eyebrow">For this passage</p><h2 id="resources-title">Explore the resources</h2></div><label htmlFor="resource-type">Show<select id="resource-type" aria-label="Show resources" value={filter} onChange={e=>setFilter(e.target.value)}>{[['all','All resources'],['map','Maps'],['image','Images'],['term','Key terms'],['video','Video links']].map(([id,label])=><option key={id} value={id}>{label}</option>)}</select></label></div><p className="resource-count">21 key terms · 4 maps · 4 images · 3 online video links</p><div className="resource-grid">{pack.resources.filter(item=>filter==='all'||item.kind===filter).map(item=><GlassSurface key={`${item.resourceCode}/${item.content_id}`} level={3} className="resource-card"><span className="eyebrow">{item.kind === 'video' ? 'Online video' : item.kind}</span><h3>{resourceLabel(item)}</h3><p>{item.kind === 'video' ? 'Connection required. Not downloaded.' : 'Source resource for Mark 1:1–13'}</p><GlassButton onClick={()=>resource(item)} aria-label={`Open ${resourceLabel(item)} ${item.kind}`}>Open resource</GlassButton></GlassSurface>)}</div></section>}
    </main>
    <footer className="app-footer"><p>FIA · English passage PoC</p><p>Guide navigation is available. Narration and offline saving are not available in this build.</p><p>Speak and explore together; nothing is recorded.</p></footer>
    {selection && <ResourceDialog key={selection.item?.content_id ?? selection.title} selection={selection} onClose={()=>setSelection(null)}/>}
  </div>;
}
export default function App() {
  const [pack,setPack] = useState(null); const [error,setError] = useState(''); const [attempt,setAttempt] = useState(0);
  useEffect(()=>{ const controller=new AbortController(); setError(''); setPack(null); loadContent(controller.signal).then(setPack).catch(error=>{if(error.name!=='AbortError')setError(error.message);}); return()=>controller.abort(); },[attempt]);
  if(error)return <main className="loading-state"><h1>The passage could not be opened</h1><p role="alert">{error}</p><p>No replacement content has been substituted.</p><GlassButton onClick={()=>setAttempt(x=>x+1)}>Try again</GlassButton></main>;
  if(!pack)return <main className="loading-state"><h1>FIA</h1><p role="status">Opening the verified passage…</p></main>;
  return <Session pack={pack}/>;
}
