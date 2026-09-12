import { restoreSession } from './session.js';
import { validateSession, currentPosition, moveUnit, selectStep, activeUnits } from './flow.js';
import { approvedAudioManifest } from './audio.js';
export const WORKSPACE_KEY='fia.workspace.mark-1-1-13.v2';
export function storedTheme(storage){try{const v=JSON.parse(storage?.getItem(WORKSPACE_KEY));return v?.schemaVersion===2&&v.theme==='dark'?'dark':'light';}catch{return'light';}}
const ids=(values,pack)=>Array.isArray(values)?[...new Set(values.filter(id=>typeof id==='string'&&pack.resources.some(r=>r.content_id===id)))].slice(0,32):[];
export function restoreWorkspace(storage,pack){
 const legacy=restoreSession(storage,pack.guide,pack.cues);let value;try{value=JSON.parse(storage?.getItem(WORKSPACE_KEY));}catch{}
 const fallback={session:legacy.session,theme:'light',view:'guide',resources:{query:'',filter:'all',selectedId:null,collectionIds:[],origin:'catalog'},audio:null,storageError:legacy.storageError};
 if(!value||value.schemaVersion!==2||value.passage!=='mark-1-1-13')return fallback;
 const resources=value.resources??{},validIds=ids(resources.collectionIds,pack),selectedId=pack.resources.some(r=>r.content_id===resources.selectedId)?resources.selectedId:null;
 let audio=null;const a=value.audio,entry=approvedAudioManifest.entries.find(e=>e.id===a?.clipId);
 if(entry&&entry.sourceSha256===a.sourceSha256&&entry.sha256===a.outputSha256&&Number.isFinite(a.offsetSeconds)&&a.offsetSeconds>=0&&a.offsetSeconds<=86400&&['unfinished','gap','discussion-ended','terminal-ended'].includes(a.phase)&&['guide','scripture','resources'].includes(a.ownerDomain)){
 const matches=a.ownerDomain==='guide'?/^S0[1-6]-U\d+$/.test(a.clipId):a.ownerDomain==='scripture'?a.clipId.startsWith('scripture-'):pack.resources.some(r=>`term-${r.content_id}`===a.clipId);
 if(matches)audio={ownerDomain:a.ownerDomain,clipId:a.clipId,sourceSha256:a.sourceSha256,outputSha256:a.outputSha256,offsetSeconds:a.offsetSeconds,phase:a.phase,...(a.phase==='gap'&&typeof a.nextClipId==='string'?{nextClipId:a.nextClipId}:{}),collectionIds:ids(a.collectionIds,pack)};
 }
 return{...fallback,audioError:a&&!audio?'Saved audio no longer matches the available recording; reading context is retained.':'',session:validateSession(value.guide,pack.guide,pack.cues),theme:value.theme==='dark'?'dark':'light',view:['languages','guide','scripture','resources'].includes(value.view)?value.view:'guide',resources:{query:typeof resources.query==='string'?resources.query.slice(0,200):'',filter:['all','map','image','term','video'].includes(resources.filter)?resources.filter:'all',selectedId,collectionIds:validIds.includes(selectedId)?validIds: selectedId?[selectedId]:validIds,origin:resources.origin==='guide'?'guide':'catalog'},audio};
}
export function saveWorkspace(storage,value){try{storage.setItem(WORKSPACE_KEY,JSON.stringify({schemaVersion:2,passage:'mark-1-1-13',...value,savedAt:new Date().toISOString()}));return true;}catch{return false;}}
export function guideQueue(pack,session){const items=[];let cursor=session;for(let i=0;i<130;i++){const pos=currentPosition(cursor,pack.guide,pack.cues),next=pos.isStop?cursor:moveUnit(cursor,1,pack.guide,pack.cues);items.push({id:pos.unit.id,text:pos.unit.text,next,owner:'guide',title:`${pos.step.title} · ${pos.index+1}/${pos.units.length}`,fullTitle:`${pos.step.title}, activity ${pos.index+1} of ${pos.units.length}`,stop:pos.isStop});if(pos.isStop||next===cursor)break;cursor=next;}return items;}
export function guideRestoreQueue(pack,session,id){const step=pack.guide.steps.find(s=>s.units.some(u=>u.id===id));if(!step||!activeUnits(step,pack.cues).some(u=>u.id===id))return[];const state={...selectStep(session,step.id,pack.guide,pack.cues),unitId:id};const items=guideQueue(pack,state);return items[0]?.id===id?items:[];}
