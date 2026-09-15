import {ENGLISH_SCRIPTURE_CUES} from './guide-presentation.js';
import {approvedAudioManifest} from './audio.js';
import {spanishQueue} from './spanish-audio.js';
import {selectNarration} from './narration.js';
import {activeUnits} from './flow.js';
export const partKey=entry=>`${entry.id}:${entry.sourceSha256}`;
export function pageParts(pack,language,sectionId,version,{playable=true}={}){
 const manifest=language==='eng'?approvedAudioManifest:pack.preparedAudio;
 let ids=[];
 if(language==='eng'){
  const unit=pack.guide.steps.flatMap(s=>activeUnits(s,pack.cues)).find(u=>u.id===sectionId);if(!unit)return [];
  ids=[unit.id,...(pack.cues.resourcesAt[unit.id]??[]).map(id=>`term-${id}`)];
  if(ENGLISH_SCRIPTURE_CUES.has(unit.id))ids.push(`scripture-${version}`);
 }else{
  const group=pack.guide.groups.find(g=>g.id===sectionId&&g.ordinaryQueue);if(!group)return [];
  const selections=[{domain:'guide',id:group.id}];
  const resources=pack.derivedAssociations.filter(a=>a.scope==='activity'&&group.blockIds.some(id=>+id.match(/u(\d+)$/)[1]===a.cueNumber)).flatMap(a=>a.resourceIds);
  selections.push(...resources.map(id=>({domain:'resources',id})));
  if(group.blockIds.some(id=>pack.guide.blocks.find(b=>b.id===id)?.action==='manual-source-read; audio-blocked'))selections.push({domain:'scripture',id:version});
  ids=selections.flatMap(s=>spanishQueue(pack,s,manifest).filter(i=>!i.notice).map(i=>i.id));
 }
 return [...new Set(ids)].map(id=>manifest?.entries.find(e=>e.id===id)).filter(e=>e&&(!playable||selectNarration(e))).map(partKey);
}
export function completionContext(pack,language,sectionId,version){return sectionId?{sectionId,requiredParts:pageParts(pack,language,sectionId,version)}:null;}
