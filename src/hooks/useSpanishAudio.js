import {createDisclosureStore} from '../lib/disclosures.js';
import {useEffect,useRef,useState,useCallback} from 'react';
import {AudioController} from '../lib/audio.js';
import {browserStorage} from '../lib/session.js';
import {spanishQueue,spanishIntroduction,restoreSpanishAudio,saveSpanishAudio,spanishAudioCheckpointKey} from '../lib/spanish-audio.js';
const empty={entries:[]};
export default function useSpanishAudio(pack){
 const disclosure=useRef(null);if(!disclosure.current)disclosure.current=createDisclosureStore(browserStorage());
 const manifest=pack.preparedAudio??empty;
 const [state,setState]=useState({status:'idle'}),[selection,setSelection]=useState(null),[completed,setCompleted]=useState(false),[storageWarning,setStorageWarning]=useState('');
 const engine=useRef(null),selected=useRef(null),queue=useRef([]),alive=useRef(false),introduction=useRef(null);
 const end=useCallback(item=>{if(item.notice){const saved=introduction.current;if(saved){introduction.current=null;selected.current=saved.selection;queue.current=saved.queue;setSelection(saved.selection);if(saved.checkpoint)engine.current.restore(saved.queue,saved.checkpoint,end);}return;}if(item===queue.current.at(-1))setCompleted(true);},[]);
 useEffect(()=>{alive.current=true;const c=new AudioController(window.Audio,s=>{if(!alive.current)return;if(s.status==='playing'&&c.item?.notice)disclosure.current.presented(c.item.sourceOwnerId);setState(s);if(!introduction.current&&!saveSpanishAudio(browserStorage(),selected.current,c))setStorageWarning('Spanish audio progress cannot be stored on this device.');},{manifest});engine.current=c;
 const saved=restoreSpanishAudio(browserStorage(),pack,manifest,disclosure.current.noticeOwners());if(saved?.warning)setStorageWarning(saved.warning);else if(saved){selected.current=saved.selection;queue.current=saved.queue;setSelection(saved.selection);c.restore(saved.queue,saved.checkpoint,end);}
 const persist=()=>{if(!introduction.current&&!saveSpanishAudio(browserStorage(),selected.current,c))setStorageWarning('Spanish audio progress cannot be stored on this device.');};window.addEventListener('pagehide',persist);
 return()=>{persist();alive.current=false;window.removeEventListener('pagehide',persist);c.stop();};},[pack,manifest,end]);
 const available=selection=>spanishQueue(pack,selection,manifest,new Set(),disclosure.current.noticeOwners()).length>0;
 const start=selection=>{introduction.current=null;const items=spanishQueue(pack,selection,manifest,new Set(),disclosure.current.noticeOwners());if(!items.length)return false;setCompleted(false);selected.current=selection;queue.current=items;setSelection(selection);engine.current.speak(items,null,end);return true;};
 const stop=()=>{introduction.current=null;setCompleted(false);selected.current=null;queue.current=[];setSelection(null);engine.current?.stop();try{browserStorage()?.removeItem(spanishAudioCheckpointKey);}catch{setStorageWarning('Spanish audio progress cannot be stored on this device.');}};
 const restart=()=>{setCompleted(false);if(!introduction.current&&engine.current?.item?.notice&&selected.current)start(selected.current);else engine.current?.restart();};
 const replayIntroduction=()=>{const items=spanishIntroduction(manifest);if(!items.length)return;if(!introduction.current&&selected.current){const checkpoint=engine.current.checkpoint();if(checkpoint){saveSpanishAudio(browserStorage(),selected.current,engine.current);introduction.current={selection:selected.current,queue:engine.current.items.slice(engine.current.itemIndex),checkpoint};}}if(!introduction.current)introduction.current={selection:null,queue:[],checkpoint:null};setCompleted(false);engine.current.speak(items,null,end);};
 const suspend=()=>{if(introduction.current){const saved=introduction.current;introduction.current=null;if(saved.checkpoint)engine.current.restore(saved.queue,saved.checkpoint,end);else engine.current.stop();}engine.current?.suspend();if(!saveSpanishAudio(browserStorage(),selected.current,engine.current))setStorageWarning('Spanish audio progress cannot be stored on this device.');};
 return {disclosureWarning:disclosure.current.warning,replayIntroduction,storageWarning,state:{...state,completed},selection,completed,available,start,stop,restart,suspend,pause:()=>engine.current?.pause(),resume:()=>engine.current?.resume(),hasRecordings:manifest.entries.length>0};
}
