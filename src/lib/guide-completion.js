import {activeUnits,stopRecords} from './flow.js';
export const completionKey=(language,passageId='mark-1-1-13')=>`fia.guide-completion.v1.${language}.${passageId}`;
export function completionSources(pack,language){
 if(language==='eng')return pack.guide.steps.flatMap(step=>activeUnits(step,pack.cues).map(unit=>({id:unit.id,stepId:step.id,source:{body:unit.sourceIds.map(id=>step.units.find(u=>u.id===id)),stops:stopRecords(unit,pack.cues),resources:pack.cues.resourcesAt[unit.id]??[]}})));
 return pack.guide.groups.filter(g=>g.ordinaryQueue).map(g=>({id:g.id,stepId:String(g.section),source:{group:g,body:g.blockIds.map(id=>pack.guide.blocks.find(b=>b.id===id))}}));
}
export async function completionCatalog(sources,language,passageId='mark-1-1-13'){
 const sections=await Promise.all(sources.map(async({id,stepId,source})=>({id,stepId,sourceDigest:[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(source))))].map(x=>x.toString(16).padStart(2,'0')).join('')})));
 if(new Set(sections.map(s=>s.id)).size!==sections.length)throw Error('Ambiguous guide section');
 return {language,passageId,sections};
}
export function validateCompletion(value,catalog){
 const empty={schemaVersion:2,language:catalog.language,passageId:catalog.passageId,records:[]};
 if(![1,2].includes(value?.schemaVersion)||value.language!==catalog.language||value.passageId!==catalog.passageId||!Array.isArray(value.records))return empty;
 const counts=new Map();for(const r of value.records)if(r&&typeof r.sectionId==='string')counts.set(r.sectionId,(counts.get(r.sectionId)??0)+1);
 return {...empty,records:value.records.filter(r=>r&&counts.get(r.sectionId)===1&&catalog.sections.some(s=>s.id===r.sectionId&&s.sourceDigest===r.sourceDigest)).map(r=>({sectionId:r.sectionId,sourceDigest:r.sourceDigest,manualOverride:value.schemaVersion===1?true:typeof r.manualOverride==='boolean'?r.manualOverride:null,autoComplete:value.schemaVersion===2&&r.autoComplete===true&&(!catalog.sections.find(s=>s.id===r.sectionId).allowedParts||r.playedParts?.every(p=>catalog.sections.find(s=>s.id===r.sectionId).allowedParts.includes(p))),playedParts:value.schemaVersion===2&&Array.isArray(r.playedParts)?[...new Set(r.playedParts.filter(p=>typeof p==='string'&&p.length<250&&(!catalog.sections.find(s=>s.id===r.sectionId).allowedParts||catalog.sections.find(s=>s.id===r.sectionId).allowedParts.includes(p))))].slice(0,200):[]}))};
}
export function reduceCompletion(value,action,catalog){
 const current=validateCompletion(value,catalog),section=catalog.sections.find(s=>s.id===action.sectionId);
 if(!section||!['mark','undo','ended'].includes(action.type))return current;
 const old=current.records.find(r=>r.sectionId===section.id)??{sectionId:section.id,sourceDigest:section.sourceDigest,manualOverride:null,autoComplete:false,playedParts:[]};
 let record={...old};
 if(action.type==='ended'){
  if(section.allowedParts&&(!section.allowedParts.includes(action.part)||action.requiredParts?.some(p=>!section.allowedParts.includes(p))))return current;
  if(!Array.isArray(action.requiredParts)||!action.requiredParts.length||!action.requiredParts.includes(action.part))return current;
  record.playedParts=[...new Set([...old.playedParts,action.part])].slice(-200);
  record.autoComplete=old.autoComplete||action.requiredParts.every(p=>record.playedParts.includes(p));
 }else record.manualOverride=action.type==='mark';
 return {...current,records:[...current.records.filter(r=>r.sectionId!==section.id),record]};
}
export const sectionComplete=(value,id)=>{const r=value?.records.find(r=>r.sectionId===id);return r?typeof r.manualOverride==='boolean'?r.manualOverride:r.autoComplete===true:false;};
export function stepComplete(value,stepId,catalog){const sections=catalog?.sections.filter(s=>s.stepId===String(stepId))??[];return sections.length>0&&sections.every(s=>sectionComplete(value,s.id));}
export function readCompletion(storage,catalog){try{const raw=storage.getItem(completionKey(catalog.language,catalog.passageId));if(raw?.length>100000)throw Error('Oversized progress');return {value:validateCompletion(raw?JSON.parse(raw):null,catalog),warning:''};}catch{return {value:validateCompletion(null,catalog),warning:'Completion marks could not be read on this device.'};}}
export function writeCompletion(storage,value){try{storage.setItem(completionKey(value.language,value.passageId),JSON.stringify(value));return '';}catch{return 'Completion mark changed for this session but was not saved on this device.';}}
