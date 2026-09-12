import SharedTransport from './components/SharedTransport.jsx';
import {restoreWorkspace,saveWorkspace,guideQueue,guideRestoreQueue} from './lib/workspace.js';
import{transportItems,adjacent,resourceSnapshot}from'./lib/transport.js';
import GuideIndex from './components/GuideIndex.jsx';
import PassageTabs from './components/PassageTabs.jsx';
import visualInputs from '../public/content/visual-narration.json';
import visualManifest from '../public/audio/visual-resources/manifest.json';
import termInputs from '../public/content/term-narration.json';
import termManifest from '../public/audio/terms/manifest.json';
import { AudioController } from './lib/audio.js';
import AudioControls from './components/AudioControls.jsx';
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
  const [boot] = useState(() => restoreWorkspace(browserStorage(), pack));
  const [session, setSession] = useState(boot.session);
  const [view, setView] = useState(boot.view);const [theme,setTheme]=useState(boot.theme);useEffect(()=>{document.documentElement.dataset.theme=theme;},[theme]);
  const [selection, setSelection] = useState(null);const[selectedTerm,setSelectedTerm]=useState(()=>pack.resources.find(r=>r.content_id===boot.resources.selectedId)??null);const[collection,setCollection]=useState({id:boot.resources.selectedId,ids:boot.resources.collectionIds,origin:boot.resources.origin});const ownerCollection=useRef(null),skipReturn=useRef(false),preserveCollection=useRef(false);const [indexOpen,setIndexOpen]=useState(false);
  const [storageError, setStorageError] = useState(boot.storageError);
  const [filter, setFilter] = useState(boot.resources.filter); const [query,setQuery]=useState(boot.resources.query);
  const [offlineState,setOfflineState]=useState({status:'checking',saved:false});const offline=useRef(null);
  useEffect(()=>{const controller=new OfflineController(setOfflineState);offline.current=controller;controller.init();return()=>controller.dispose();},[]);
  const [voices,setVoices]=useState([]),[voiceId,setVoiceId]=useState(''),[speechState,setSpeechState]=useState({status:'idle',error:''});
  const speech=useRef(null);if(!speech.current)speech.current=new SpeechController(window.speechSynthesis,window.SpeechSynthesisUtterance,setSpeechState);
  useEffect(()=>{const refresh=()=>{const available=englishVoices(window.speechSynthesis);setVoices(available);setVoiceId(old=>available.some(v=>v.voiceURI===old)?old:(available.find(v=>v.localService)??available[0])?.voiceURI??'');};refresh();window.speechSynthesis?.addEventListener('voiceschanged',refresh);return()=>{window.speechSynthesis?.removeEventListener('voiceschanged',refresh);speech.current.stop();};},[]);
  const [audioState,setAudioState]=useState({status:'idle',error:''});const audio=useRef(null);if(!audio.current)audio.current=new AudioController(window.Audio,setAudioState);
  const stop=()=>{speech.current.stop();audio.current.stop();};const changeView=value=>{if(['paused','restoring'].includes(audioState.status)&&value!==view)stop();setView(value);};
  const readGuide=(fallback=false)=>{stop();ownerCollection.current={domain:'guide'};const items=guideQueue(pack,session);(fallback?speech.current:audio.current).speak(items,voices.find(v=>v.voiceURI===voiceId),item=>setSession(item.next));};

  useEffect(() => { setStorageError(!persistSession(browserStorage(), session)); }, [session]);
  const bible = pack.scripture.find(x => x.resourceCode === session.version);
  const version = value => {stop();setSession(current => ({ ...current, version: value }));};
  const step = id => { stop();setSession(current => selectStep(current,id,pack.guide,pack.cues)); setView('guide'); };
  const visibleResources=pack.resources.filter(item=>(filter==='all'||item.kind===filter)&&resourceLabel(item).toLowerCase().includes(query.trim().toLowerCase()));
  const capture=(item,ids=visibleResources,origin='catalog')=>{const snapshot=resourceSnapshot(ids,item.content_id,origin);setCollection(snapshot);setSelectedTerm(item);return snapshot;};
  const resource = (item,ids=visibleResources,origin='catalog') => {capture(item,ids,origin);if(available(item.content_id)){if(['paused','restoring'].includes(audioState.status)&&audioState.owner!==`term-${item.content_id}`)stop();setSelectedTerm(item);}setSelection({item});};
  const available=id=>[...termManifest.entries,...visualManifest.entries].some(e=>e.id===`term-${id}`);
  const playTerm=(item,ids=collection.id===item.content_id?collection.ids:visibleResources,origin=collection.origin)=>{const snapshot=capture(item,ids,origin);stop();ownerCollection.current={domain:'resources',...snapshot};const text=[...termInputs,...visualInputs].find(x=>x.id===item.content_id)?.text;audio.current.speak([{id:`term-${item.content_id}`,text,owner:`term-${item.content_id}`,title:resourceLabel(item)}]);};
  const playScripture=()=>{stop();ownerCollection.current={domain:'scripture',id:bible.resourceCode};audio.current.speak([{id:`scripture-${bible.resourceCode}`,text:bible.verses.map(v=>v.text).join(' '),owner:'scripture',title:`Mark 1:1–13 · ${bible.resourceCode==='BereanStandardBible'?'BSB':bible.resourceCode==='unfoldingWordLiteral'?'ULT':'UST'}`}]);};
  const player=(owner,label,onPlay,compact=false)=><AudioControls state={compact?audioState:{status:'idle',owner:audioState.owner,error:audioState.owner===owner?audioState.error:''}} owner={owner} label={label} onPlay={onPlay} onPause={()=>audio.current.pause()} onResume={()=>audio.current.resume()} onRestart={()=>audio.current.restart()} compact={compact} localRestart={!compact&&!!audio.current.audio&&audioState.owner===owner}/>;
  const running=['starting','playing','paused','gap','restoring'].includes(audioState.status);
  const pos=currentPosition(session,pack.guide,pack.cues),shortVersion=session.version==='BereanStandardBible'?'BSB':session.version==='unfoldingWordLiteral'?'ULT':'UST';
  const ready=selection?.item?{owner:`term-${selection.item.content_id}`,title:resourceLabel(selection.item),play:available(selection.item.content_id)?()=>playTerm(selection.item):()=>selection.item.kind==='video'?window.open(selection.item.mediaUrl,'_blank','noopener,noreferrer'):resource(selection.item,collection.ids,collection.origin)}:view==='guide'?{owner:'guide',title:`${pos.step.title} · ${pos.index+1}/${pos.units.length}`,play:()=>readGuide()}:view==='scripture'?{owner:'scripture',title:`Mark 1:1–13 · ${shortVersion}`,play:playScripture}:selectedTerm?{owner:`term-${selectedTerm.content_id}`,title:resourceLabel(selectedTerm),play:available(selectedTerm.content_id)?()=>playTerm(selectedTerm):()=>selectedTerm.kind==='video'?window.open(selectedTerm.mediaUrl,'_blank','noopener,noreferrer'):resource(selectedTerm,collection.ids,collection.origin)}:{owner:null,title:'Choose resource',play:()=>{setView('resources');requestAnimationFrame(()=>document.querySelector('[aria-label="Search resources"]')?.focus());}};
  const context=running?ownerCollection.current??{domain:audioState.owner==='guide'?'guide':'scripture',id:session.version}:selection?.item?{domain:'resources',...collection}:view==='guide'?{domain:'guide'}:view==='scripture'?{domain:'scripture',id:session.version}:{domain:'resources',...collection};
  const currentId=context.domain==='guide'?(running?audioState.sourceId:session.unitId):context.domain==='scripture'?context.id:context.id;
  const items=transportItems(context.domain,pack.guide,pack.cues,context.ids),previous=adjacent(items,currentId,-1),next=adjacent(items,currentId,1);
  const navigate=target=>{if(!target)return;stop();if(context.domain==='guide'||context.domain==='scripture'){skipReturn.current=!!selection;setSelection(null);setView(context.domain);if(context.domain==='guide')setSession(s=>({...selectStep(s,target.stepId,pack.guide,pack.cues),unitId:target.id}));else setSession(s=>({...s,version:target.id}));requestAnimationFrame(()=>document.getElementById('session-main')?.focus());}else{preserveCollection.current=view!=='resources'||running;const item=pack.resources.find(r=>r.content_id===target.id);setCollection({...context,id:target.id});setSelectedTerm(item);setView('resources');if(selection?.item||!available(item.content_id))setSelection({item});}};
  useEffect(()=>{if(preserveCollection.current){preserveCollection.current=false;return;}if(view!=='resources'||running)return;const ids=visibleResources.map(r=>r.content_id);if(!ids.includes(collection.id)){setSelectedTerm(null);setCollection({id:null,ids,origin:'catalog'});}else if(ids.join('|')!==collection.ids.join('|'))setCollection({...collection,ids});},[filter,query,view,running]);
  const domainLabel=context.domain==='guide'?'guide activity':context.domain==='scripture'?'Scripture version':'resource';
  const completedSource=context.domain==='guide'?currentId:context.domain==='scripture'?`scripture-${currentId}`:`term-${currentId}`;
  const nextPrimary=!!next&&audioState.completed&&audioState.sourceId===completedSource&&audioState.owner===(context.domain==='resources'?`term-${currentId}`:context.domain);
  const mini=<SharedTransport><AudioControls compact nextPrimary={nextPrimary} state={running?audioState:{status:'idle',title:ready.title,owner:audioState.owner,error:audioState.owner===ready.owner?audioState.error:''}} owner={running?audioState.owner:ready.owner} label={running?'Now playing':!ready.owner?'Choose resource':ready.play?`${selectedTerm&&context.domain==='resources'&&!available(selectedTerm.content_id)?'Open':'Play'} ${ready.title}`:'Choose resource'} onPlay={ready.play} onPause={()=>audio.current.pause()} onResume={()=>audio.current.resume()} previous={previous} next={next} onPrevious={()=>navigate(previous)} onNext={()=>navigate(next)} domain={domainLabel}/></SharedTransport>;
  const dockRef=useRef(null);useEffect(()=>{const root=dockRef.current,nav=root?.querySelector('.floating-tabs');if(!nav)return;const update=()=>{const shell=root.closest('.app-shell');shell.style.setProperty('--actual-nav-width',`${nav.getBoundingClientRect().width}px`);shell.style.setProperty('--floating-clearance',`${root.getBoundingClientRect().height+40}px`);};const observer=new ResizeObserver(update);observer.observe(nav);observer.observe(root);update();return()=>observer.disconnect();},[view]);
  const workspaceRef=useRef(null);workspaceRef.current={theme,view,guide:session,resources:{query:query.slice(0,200),filter,selectedId:collection.id,collectionIds:collection.ids,origin:collection.origin},sourceRevision:JSON.stringify(pack.manifest.files)};
  const [resumeNotice,setResumeNotice]=useState(boot.audioError??'');
  const writeWorkspace=()=>{const checkpoint=audio.current.checkpoint();const payload={...workspaceRef.current,audio:checkpoint?{...checkpoint,collectionIds:ownerCollection.current?.ids??[]}:null};if(!saveWorkspace(browserStorage(),payload))setStorageError(true);};
  useEffect(()=>{const saved=boot.audio;if(saved&&['unfinished','gap'].includes(saved.phase)){
    let restoredItems=[];
    if(saved.ownerDomain==='guide'){restoredItems=guideRestoreQueue(pack,boot.session,saved.clipId);ownerCollection.current={domain:'guide'};}
    else if(saved.ownerDomain==='scripture'){const b=pack.scripture.find(x=>`scripture-${x.resourceCode}`===saved.clipId);if(b){restoredItems=[{id:saved.clipId,text:b.verses.map(v=>v.text).join(' '),owner:'scripture',title:`Mark 1:1–13 · ${b.resourceCode==='BereanStandardBible'?'BSB':b.resourceCode==='unfoldingWordLiteral'?'ULT':'UST'}`}];ownerCollection.current={domain:'scripture',id:b.resourceCode};}}
    else {const item=pack.resources.find(r=>`term-${r.content_id}`===saved.clipId),input=[...termInputs,...visualInputs].find(x=>x.id===item?.content_id);if(item&&input){restoredItems=[{id:saved.clipId,text:input.text,owner:saved.clipId,title:resourceLabel(item)}];ownerCollection.current={domain:'resources',id:item.content_id,ids:saved.collectionIds.includes(item.content_id)?saved.collectionIds:[item.content_id],origin:'catalog'};}}
    if(restoredItems.length)audio.current.restore(restoredItems,saved,item=>{if(item.next)setSession(item.next);});else setResumeNotice('Saved audio is unavailable; your reading context is retained.');
  }
  const save=()=>writeWorkspace();const hidden=()=>{if(document.visibilityState==='hidden')save();};window.addEventListener('pagehide',save);document.addEventListener('visibilitychange',hidden);const interval=setInterval(()=>{if(['playing','gap','restoring'].includes(audio.current.status))save();},1000);return()=>{save();clearInterval(interval);window.removeEventListener('pagehide',save);document.removeEventListener('visibilitychange',hidden);audio.current.stop();};},[]);
  useEffect(()=>{if(audioState.error&&boot.audio)setResumeNotice(audioState.error);},[audioState.error]);
  useEffect(()=>{writeWorkspace();},[theme,view,session,query,filter,collection,audioState.status]);
  const offlinePanel=<OfflineControls state={offlineState} onSave={()=>offline.current.save()} onCancel={()=>offline.current.cancel()} onCheck={()=>offline.current.check()} onRemove={()=>offline.current.remove()}/>;
  const fallback=<NarrationControls voices={voices} voiceId={voiceId} setVoiceId={id=>{stop();setVoiceId(id);}} state={speechState} onGuide={()=>readGuide(true)} onScripture={()=>{stop();speech.current.speak([{text:bible.verses.map(v=>v.text).join(' ')}],voices.find(v=>v.voiceURI===voiceId));}} onPause={()=>speech.current.pause()} onResume={()=>speech.current.resume()} onStop={stop}/>;
  const dialogSelection=selection?.settings?{title:'Passage settings',children:<>{resumeNotice&&<p role="status">{resumeNotice}</p>}{offlinePanel}<p>English passage PoC · one shared device. {session.visited.length}/6 steps visited; visiting is not an assessment of understanding.</p><p>Synthetic ElevenLabs narration; browser voices are optional. Saved files are verified. Speak and explore together; nothing is recorded. Original attribution is available in each source detail.</p>{fallback}</>}:selection;
  const termPlayer=selection?.item&&available(selection.item.content_id)?player(`term-${selection.item.content_id}`,`Play ${resourceLabel(selection.item)}`,()=>playTerm(selection.item)):null;
  return <AuroraField className="app-aurora" drift={false}><div className={`app-shell has-player ${view==='resources'?'resources-view':''}`}>
    <div className="app-content" aria-hidden={selection||indexOpen?true:undefined} inert={selection||indexOpen?true:undefined}><a className="skip-link" href="#session-main">Skip to passage</a>
    <SessionHeader theme={theme} onThemeChange={setTheme} visited={session.visited.length} offlineState={offlineState} onSettings={()=>setSelection({settings:true})}/>
    <main id="session-main" tabIndex="-1">
      
      {storageError && <p role="status" className="return-note">Your position could not be stored on this device. You can continue this session.</p>}
      {session.finished && <GlassSurface className="completion-note" level={4}><h2>Session finished</h2><p>All six steps were visited. This records your choice to finish, not an assessment of understanding.</p><GlassButton onClick={() => { setSession(current => ({ ...current, finished: false })); changeView('guide'); }}>Return to the guide</GlassButton></GlassSurface>}
      {view === 'guide' && <div role="tabpanel" id="panel-guide" aria-labelledby="tab-guide"><StepFlow onPlayScripture={playScripture} versionLabel={session.version==='BereanStandardBible'?'BSB':session.version==='unfoldingWordLiteral'?'ULT':'UST'} onIndex={()=>setIndexOpen(true)} termAvailable={id=>available(id)} player={player('guide','Play guide',()=>readGuide())} transport={mini} session={session} pack={pack} onMove={direction => {stop();setSession(current => moveUnit(current,direction,pack.guide,pack.cues));}} onStep={step} onResource={(item)=>resource(item,(pack.cues.resourcesAt[session.unitId]??[]).map(id=>pack.resources.find(r=>r.content_id===id)), 'guide')} onTermPlay={playTerm} termPlayer={item=>player(`term-${item.content_id}`,`Play ${resourceLabel(item)}`,()=>playTerm(item,(pack.cues.resourcesAt[session.unitId]??[]).map(id=>pack.resources.find(r=>r.content_id===id)), 'guide'))} onScripture={() => changeView('scripture')} onSource={() => {setSelection({ title:'Complete source guide', children:<GuideSource pack={pack}/> });}} onExamples={() => {setSelection({ title:'Source example — possible responses', children:<GuideSource pack={pack} examplesOnly/> });}} onFinish={() => { if (canFinish(session,pack.guide)) setSession(current=>({...current,finished:true})); }}/></div>}
      {view === 'scripture' && <div role="tabpanel" id="panel-scripture" aria-labelledby="tab-scripture"><ScripturePanel onSource={()=>setSelection({title:`${shortVersion} source and attribution`,children:<SourceDetails item={bible}/>})} transport={mini} bible={bible} onVersion={version} player={<>{player('scripture',`Play Scripture ${session.version==='BereanStandardBible'?'BSB':session.version==='unfoldingWordLiteral'?'ULT':'UST'}`,playScripture)}</>}/></div>}
      {view === 'resources' && <section role="tabpanel" id="panel-resources" aria-labelledby="tab-resources"><GlassSearch aria-label="Search resources" value={query} onChange={e=>{if(['paused','restoring'].includes(audioState.status))stop();setQuery(e.target.value);}} placeholder="Search this passage’s resources"/><FilterChips aria-label="Resource types" className="resource-filters" bleed={false} options={[{value:'all',label:'All'},{value:'map',label:'Maps'},{value:'image',label:'Images'},{value:'term',label:'Key terms'},{value:'video',label:'Video links'}]} value={[filter]} onChange={values=>{if(['paused','restoring'].includes(audioState.status))stop();setFilter(values.at(-1)??'all');}} style={{flexWrap:'wrap',margin:'14px 0 20px',overflow:'visible'}}/><div className="resource-grid">{pack.resources.filter(item=>(filter==='all'||item.kind===filter)&&resourceLabel(item).toLowerCase().includes(query.trim().toLowerCase())).map(item=><ResourceTile key={`${item.resourceCode}/${item.content_id}`} item={item} player={player(`term-${item.content_id}`,`Play ${resourceLabel(item)}`,()=>playTerm(item))} onOpen={resource} onPlay={playTerm} audioAvailable={available(item.content_id)}/>)}{!pack.resources.some(item=>(filter==='all'||item.kind===filter)&&resourceLabel(item).toLowerCase().includes(query.trim().toLowerCase()))&&<p role="status">No resources match this search.</p>}</div></section>}
    </main>
    <div className="floating-dock" ref={dockRef}><PassageTabs value={view} onChange={changeView}/>{view==='resources'&&<div className="playback-dock">{mini}</div>}</div>
    </div>{indexOpen&&<GuideIndex pack={pack} current={session.unitId} transport={mini} onClose={()=>setIndexOpen(false)} onSelect={(stepId,unitId)=>{stop();setSession(s=>({...selectStep(s,stepId,pack.guide,pack.cues),unitId}));setIndexOpen(false);}}/>}{selection && <ResourceDialog skipReturn={skipReturn} selection={dialogSelection} transport={mini} localPlayer={termPlayer} onClose={()=>setSelection(null)}/>}
  </div></AuroraField>;
}
export default function App() {
  const [pack,setPack] = useState(null); const [error,setError] = useState(''); const [attempt,setAttempt] = useState(0);
  useEffect(()=>{ const controller=new AbortController(); setError(''); setPack(null); loadContent(controller.signal).then(setPack).catch(error=>{if(error.name!=='AbortError')setError(error.message);}); return()=>controller.abort(); },[attempt]);
  if(error)return <main className="loading-state"><h1>The passage could not be opened</h1><p role="alert">{error}</p><p>No replacement content has been substituted.</p><GlassButton onClick={()=>setAttempt(x=>x+1)}>Try again</GlassButton></main>;
  if(!pack)return <main className="loading-state"><h1>FIA</h1><p role="status">Opening the verified passage…</p></main>;
  return <Session pack={pack}/>;
}
