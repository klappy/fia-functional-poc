import{activeUnits,VERSIONS}from'./flow.js';
export function transportItems(domain,guide,cues,resourceIds=[]){return domain==='guide'?guide.steps.flatMap(s=>activeUnits(s,cues).map(u=>({id:u.id,stepId:s.id}))):domain==='scripture'?VERSIONS.map(id=>({id})):resourceIds.map(id=>({id}));}
export function adjacent(items,id,direction){const index=items.findIndex(x=>x.id===id);return index<0?null:items[index+direction]??null;}
export function resourceSnapshot(visible,id,origin='catalog'){const ids=visible.map(x=>typeof x==='string'?x:x.content_id);return{id:ids.includes(id)?id:null,ids,origin};}
