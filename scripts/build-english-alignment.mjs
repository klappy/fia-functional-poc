import fs from 'node:fs';import crypto from 'node:crypto';import{stripTypeScriptTypes}from'node:module';import{validateAlignment}from'./validate-english-alignment.mjs';
const hash=x=>crypto.createHash('sha256').update(x).digest('hex'),base='evidence/english-alignment',packet=JSON.parse(fs.readFileSync(`${base}/PACKET.json`)),ts=fs.readFileSync(`${base}/orality-ab5db936.ts`,'utf8');
if(hash(ts)!==packet.processorSha256)throw Error('Processor mismatch');
const{prepareForSpeech}=await import('data:text/javascript;base64,'+Buffer.from(stripTypeScriptTypes(ts)).toString('base64'));
const bibles=JSON.parse(fs.readFileSync('public/content/mark-1-1-13/scripture.json')),audio=JSON.parse(fs.readFileSync('public/audio/mark-1-1-13/manifest.json')),index=[];
for(const r of packet.requests){
 const b=bibles.find(b=>`scripture-${b.resourceCode}`===r.id),a=audio.entries.find(a=>a.id===r.id),body=fs.readFileSync(`${base}/execution/${r.id}.response.json`),response=JSON.parse(body);
 if(hash(fs.readFileSync('public'+a.path))!==r.audioSha256||a.sha256!==r.audioSha256||hash(b.verses.map(v=>v.text).join(' '))!==r.sourceSha256)throw Error('Source/audio mismatch');
 const validated=validateAlignment(r,response);if(response.words.map(w=>w.text).join('')!==r.spokenText)throw Error('Word character coverage mismatch');
 let offset=0;const rows=response.words.map(w=>{const from=offset;offset+=w.text.length;return{...w,from,to:offset};});
 const verses=r.verses.map((v,i)=>{
  if(b.verses[i].text!==v.rawText||b.verses[i].contentSha256!==v.sourceHtmlSha256||prepareForSpeech(v.rawText,packet.options)!==v.spokenText)throw Error('Verse binding mismatch');
  // These three accepted recordings contain only length-preserving quote/dash normalization.
  // Prove each display character maps one-to-one; fail closed for any future expansion.
  const projection=Array.from({length:v.rawText.length},(_,n)=>v.rawText[n].replace(/[“”]/g,'"').replace(/[‘’]/g,"'").replace(/–/g,'—')).join('');
  if(projection!==v.spokenText)throw Error('Unsupported non-bijective source projection');
  const words=rows.filter(w=>w.text.trim()&&w.from>=v.startCharacter&&w.to<=v.endCharacter).map(w=>({from:w.from-v.startCharacter,to:w.to-v.startCharacter,start:w.start,end:w.end}));
  if(words.map(w=>projection.slice(w.from,w.to)).join('').replace(/\s/g,'')!==v.spokenText.replace(/\s/g,''))throw Error('Display word coverage mismatch');
  return{...validated.intervals[i],text:v.rawText,sourceHtmlSha256:v.sourceHtmlSha256,words};
 });
 const sidecar={schemaVersion:1,id:r.id,audioSha256:r.audioSha256,sourceSha256:r.sourceSha256,spokenSha256:r.spokenSha256,responseSha256:hash(body),duration:r.durationSeconds,verses};
 const path=`/alignment/${r.id}.json`,bytes=Buffer.from(JSON.stringify(sidecar));fs.writeFileSync('public'+path,bytes);index.push({id:r.id,path,sha256:hash(bytes),bytes:bytes.length,audioSha256:r.audioSha256,sourceSha256:r.sourceSha256});
}
fs.writeFileSync('src/data/english-alignment.json',JSON.stringify(index,null,2)+'\n');console.log('Bound 3 unchanged recordings, 39 verses and exact display character ranges.');
