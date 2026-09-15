// Choose the source recording before choosing its raw/compressed representation.
// Non-audio content and source manifests remain available in every policy.
export function selectOfflineRecordings(entries, recordings, narration, language){
 if(!['ai-only','aquifer-only','aquifer-fallback'].includes(narration))throw Error('Unknown narration preference');
 const candidates=recordings.filter(e=>e.language===language);
 const byPath=new Map();
 for(const e of candidates){if(!e.generatedPath||byPath.has(e.generatedPath))throw Error('Ambiguous Aquifer recording');byPath.set(e.generatedPath,e);}
 return entries.flatMap(entry=>{
  if(!entry.mime?.startsWith('audio/'))return [entry];
  if(narration==='ai-only')return [entry];
  const source=byPath.get(entry.path);
  if(source)return [{...source,group:'pack'}];
  return narration==='aquifer-only'?[]:[entry];
 });
}
