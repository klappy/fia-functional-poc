import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';
const hash=b=>crypto.createHash('sha256').update(b).digest('hex'),read=p=>JSON.parse(fs.readFileSync(p));
const stageRoot=process.argv[2],candidatePath=process.argv[3];if(!stageRoot||!candidatePath)throw Error('Provide verified staging directory and accepted candidate file');
const packetBytes=fs.readFileSync(path.join(stageRoot,'REQUEST-PACKET.json')),candidateBytes=fs.readFileSync(candidatePath);
if(hash(packetBytes)!=='e3c54e3cae01bd5dbf7455a5a9e46ebf14665711d6c99bd3a6fdf070f7edafc7'||hash(candidateBytes)!=='4037298d29c0ee7fd41f1a29ea58082d79aef797cda144c896f9332e83ec111b')throw Error('Accepted visual inputs changed');
const packet=JSON.parse(packetBytes),candidates=JSON.parse(candidateBytes).entries,stage=read(path.join(stageRoot,'staged-manifest.json')),catalog=read('src/data/spanish-audio-catalog.json'),manifest=read('public/audio/spa/manifest.json');
if(packet.requests.length!==8||stage.entries.length!==8||new Set(stage.entries.map(e=>e.id)).size!==8||catalog.requests.length!==204||manifest.entries.length!==204)throw Error('Unexpected visual binding baseline/count');
const ownerIds=new Set(packet.requests.map(r=>r.ownerId)),oldRequests=catalog.requests.filter(r=>r.owners.some(o=>ownerIds.has(o.ownerId))),oldIds=new Set(oldRequests.map(r=>r.id));
if(oldIds.size!==7||oldRequests.some(r=>r.owners.some(o=>!ownerIds.has(o.ownerId))))throw Error('Historical title-only ownership changed');
const checked=packet.requests.map(r=>{
 const candidate=candidates.find(c=>c.id===r.id),entry=stage.entries.find(e=>e.id===r.id),old=oldRequests.find(e=>e.owners.some(o=>o.ownerId===r.ownerId));
 if(!candidate||!entry||entry.path!==`/audio/spa/${r.id}.mp3`||entry.mime!=='audio/mpeg'||entry.sourceSha256!==r.rawTextSha256||entry.spokenInputSha256!==r.spokenInputSha256||entry.processedTextSha256!==r.processedTextSha256||hash(r.rawText)!==r.rawTextSha256||hash(r.spokenInput)!==r.spokenInputSha256||hash(r.processedText)!==r.processedTextSha256||candidate.replacesTitleOnlyAudio.id!==old.id)throw Error('Visual request/output binding mismatch');
 const original=manifest.entries.find(e=>e.id===old.id);if(original.sha256!==candidate.replacesTitleOnlyAudio.sha256||hash(fs.readFileSync('public'+original.path))!==original.sha256)throw Error('Historical title-only bytes changed');
 const bytes=fs.readFileSync(path.join(stageRoot,'staged',r.id+'.mp3'));if(bytes.length!==entry.bytes||hash(bytes)!==entry.sha256||!(Number(entry.duration??entry.durationSeconds)>0)||hash(fs.readFileSync('public'+r.image.path))!==r.image.sha256)throw Error('Visual output/image integrity mismatch');
 return {r,candidate,entry,bytes};
});
catalog.historicalRequests=[...(catalog.historicalRequests??[]),...oldRequests];catalog.requests=catalog.requests.filter(r=>!oldIds.has(r.id));
manifest.historicalEntries=[...(manifest.historicalEntries??[]),...manifest.entries.filter(e=>oldIds.has(e.id))];manifest.entries=manifest.entries.filter(e=>!oldIds.has(e.id));
for(const {r,entry,bytes}of checked){
 const owners=[{ownerId:r.ownerId,classification:'required-on-demand',playbackGroupId:r.ownerId,spokenNoticeOwnerIds:[]}];
 catalog.requests.push({id:r.id,text:r.rawText,sourceSha256:r.rawTextSha256,spokenInputSha256:r.spokenInputSha256,processedTextSha256:r.processedTextSha256,owners,derivation:r.derivation,image:r.image});
 manifest.entries.push({...entry,owners,recordingSource:'ai',derivation:r.derivation,image:r.image});fs.writeFileSync('public'+entry.path,bytes);
}
manifest.expectedEntries=205;manifest.complete=true;const audioBody=JSON.stringify(manifest,null,2)+'\n';fs.writeFileSync('public/audio/spa/manifest.json',audioBody);fs.writeFileSync('src/data/spanish-audio-catalog.json',JSON.stringify(catalog,null,2)+'\n');
for(const base of ['content-packs/spa/mark-1-1-13','public/content/spa/mark-1-1-13']){
 const pack=read(base+'/pack.json');for(const {r,candidate}of checked){const item=pack.media.find(m=>m.id===r.resourceId);if(!item||item.assetSha256!==r.image.sha256)throw Error('Visual resource owner changed');item.visualNarration={id:r.id,text:r.rawText,label:candidate.label,sourceSha256:r.rawTextSha256,spokenInputSha256:r.spokenInputSha256,processedTextSha256:r.processedTextSha256,derivation:r.derivation,image:r.image,rights:candidate.rights,source:candidate.source};}
 const body=JSON.stringify(pack,null,2)+'\n';fs.writeFileSync(base+'/pack.json',body);const m=read(base+'/manifest.json'),file=m.files.find(e=>e.path==='pack.json');Object.assign(file,{bytes:Buffer.byteLength(body),sha256:hash(body)});Object.assign(m.preparedAudio,{entries:205,bytes:Buffer.byteLength(audioBody),sha256:hash(audioBody),complete:true});fs.writeFileSync(base+'/manifest.json',JSON.stringify(m,null,2)+'\n');
}
fs.mkdirSync('evidence/spanish-visual-audio',{recursive:true});fs.writeFileSync('evidence/spanish-visual-audio/BINDING.json',JSON.stringify({packetSha256:hash(packetBytes),candidatesSha256:hash(candidateBytes),activeEntries:205,historicalEntries:7,publicSpanishMp3:212,sourceOwners:checked.map(({r,entry})=>({id:r.id,ownerId:r.ownerId,resourceId:r.resourceId,path:entry.path,sha256:entry.sha256,sourceSha256:entry.sourceSha256})),historicalFiles:manifest.historicalEntries.map(({id,path,sha256,bytes})=>({id,path,sha256,bytes}))},null,2)+'\n');
console.log('Bound8 visual owners;205 active recordings;7 historical recordings retained.');
