import catalog from '../data/spanish-audio-catalog.json' with {type:'json'};
export const spanishAudioCatalog=catalog;
export const spanishAudioCheckpointKey='fia-audio-checkpoint/spa/v1';
const ownerIndex=new Map(catalog.requests.flatMap(r=>r.owners.map(o=>[o.ownerId,{...o,request:r}])));
export function spanishOwnerIds(pack,selection){
 if(selection.domain==='guide'||selection.domain==='example'){
  const group=pack.guide.groups.find(g=>g.id===selection.id);
  if(!group||selection.domain==='guide'&&!group.ordinaryQueue||selection.domain==='example'&&group.visibility!=='opt-in-example')return [];
  return group.blockIds.map(id=>`spa-${id}`).filter(id=>ownerIndex.has(id));
 }
 if(selection.domain==='scripture'){
  const edition=pack.scripture.find(e=>e.id===selection.id);if(!edition)return [];
  return edition.verses.map((v,i)=>edition.origin?`${edition.id}:${i+1}`:`spa-${edition.id}-${v.id}`);
 }
 if(selection.domain==='supplement'){
  const s=pack.supplements.find(s=>s.id===selection.id);return s?[ownerIndex.has(s.id)?s.id:`spa-${s.id}`]:[];
 }
 const r=[...pack.terms,...pack.media].find(r=>r.id===selection.id);if(!r)return [];
 const main=r.origin?r.id:r.kind==='term'?`spa-${r.id}`:`spa-media-${r.id}`;
 const supplemental=pack.supplements.filter(s=>s.targetId===r.id&&r.kind==='term').map(s=>ownerIndex.has(s.id)?s.id:`spa-${s.id}`).filter(id=>ownerIndex.get(id)?.classification!=='optional-resource');
 return [main,...supplemental];
}
export function spanishQueue(pack,selection,manifest,introduced=new Set()){
 const ids=spanishOwnerIds(pack,selection);if(!ids.length)return [];
 const entries=new Map((manifest?.entries??[]).map(e=>[e.id,e]));const result=[];const groups=new Set(introduced);
 const add=(o,notice=false,forGroup=null)=>{if(!o)return false;const r=o.request,e=entries.get(r.id);if(!e||e.sourceSha256!==r.sourceSha256||e.processedTextSha256&&e.processedTextSha256!==r.processedTextSha256||!e.sha256||!e.bytes)return false;result.push({id:r.id,text:r.text,owner:selection.domain==='guide'?'guide':selection.domain==='scripture'?'scripture':'resources',title:notice?r.text:selection.title,fullTitle:selection.title,sourceOwnerId:o.ownerId,playbackGroupId:forGroup??o.playbackGroupId,notice,stop:false});return true;};
 for(const id of ids){const o=ownerIndex.get(id);if(!o)return [];if(!groups.has(o.playbackGroupId)){for(const n of o.spokenNoticeOwnerIds??[])if(!add(ownerIndex.get(n),true,o.playbackGroupId))return [];groups.add(o.playbackGroupId);}if(!add(o))return [];}
 if(result.length)result[result.length-1].stop=selection.domain==='guide'||selection.domain==='example';
 return result;
}
export function restoreSpanishAudio(storage,pack,manifest){
 const invalid=()=>({warning:'Saved Spanish audio position could not be restored. Play the selected source to continue.'});
 try{const saved=JSON.parse(storage?.getItem(spanishAudioCheckpointKey)??'null');if(!saved)return null;
 const selection=saved.selection;if(!selection||!['guide','scripture','resources','supplement','example'].includes(selection.domain)||selection.domain==='example')return invalid();
 if(selection.anchor&&!pack.guide.ordinaryGroupIds.includes(selection.anchor))return invalid();
 const queue=spanishQueue(pack,selection,manifest),index=queue.findIndex(x=>x.sourceOwnerId===saved.sourceOwnerId&&x.id===saved.checkpoint?.clipId);if(index<0)return invalid();
 const entry=manifest.entries.find(e=>e.id===saved.checkpoint.clipId),c=saved.checkpoint;
 if(c.sourceSha256!==entry.sourceSha256||c.outputSha256!==entry.sha256||!Number.isFinite(c.offsetSeconds)||c.offsetSeconds<0||!['unfinished','gap','discussion-ended','terminal-ended'].includes(c.phase))return invalid();
 if(c.phase==='gap'&&queue[index+1]?.id!==c.nextClipId)return invalid();
 return {selection,queue:queue.slice(index),checkpoint:c};
 }catch{return invalid();}
}
export function saveSpanishAudio(storage,selection,controller){try{const checkpoint=controller.checkpoint();if(!checkpoint||!selection){storage?.removeItem(spanishAudioCheckpointKey);return !!storage;}storage?.setItem(spanishAudioCheckpointKey,JSON.stringify({selection,sourceOwnerId:controller.item.sourceOwnerId,checkpoint}));return !!storage;}catch{return false;}}
