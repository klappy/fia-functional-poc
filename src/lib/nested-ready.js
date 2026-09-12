import {approvedAudioManifest} from './audio.js';
const recorded=new Set(approvedAudioManifest.entries.map(e=>e.id));
export function nestedTarget(pack,unit,version,selectedId){
 const ids=(pack.cues.resourcesAt?.[unit.id]??[]).filter(id=>recorded.has(`term-${id}`)&&pack.resources.some(r=>r.content_id===id));
 const explicit=ids.includes(selectedId)?selectedId:null;
 if(!explicit&&unit.text.startsWith('Listen to an audio')&&recorded.has(`scripture-${version}`))return{domain:'scripture',id:version,clipId:`scripture-${version}`,owner:'scripture'};
 const id=explicit??ids[0];return id?{domain:'resources',id,ids,clipId:`term-${id}`,owner:`term-${id}`}:null;
}
