import fs from 'node:fs';import crypto from 'node:crypto';
const hash=b=>crypto.createHash('sha256').update(b).digest('hex'),read=p=>JSON.parse(fs.readFileSync(p));
const packet=read('evidence/published-ulb/REQUEST-PACKET.json'),stage=read('evidence/published-ulb/staged-manifest.json'),file='public/audio/spa/manifest.json',manifest=read(file),catalog=read('src/data/spanish-audio-catalog.json');
if(stage.entries.length!==13||packet.requests.length!==13||catalog.requests.length!==204)throw Error('ULB count mismatch');
for(const entry of stage.entries){const request=packet.requests.find(r=>r.requestId===entry.id),bytes=fs.readFileSync(`evidence/published-ulb/staged/${entry.id}.mp3`);if(!request||entry.sourceSha256!==request.rawTextSha256||entry.spokenInputSha256!==request.spokenInputSha256||entry.processedTextSha256!==request.processedTextSha256||bytes.length!==entry.bytes||hash(bytes)!==entry.sha256)throw Error('ULB binding mismatch');}
manifest.entries=manifest.entries.filter(e=>!stage.entries.some(s=>s.id===e.id));if(manifest.entries.length!==191)throw Error('Existing191 changed');
for(const entry of stage.entries)fs.copyFileSync(`evidence/published-ulb/staged/${entry.id}.mp3`,'public'+entry.path);
manifest.entries.push(...stage.entries);manifest.expectedEntries=204;manifest.complete=true;manifest.partialWrittenNotices=false;
const body=JSON.stringify(manifest,null,2)+'\n';fs.writeFileSync(file+'.tmp',body);fs.renameSync(file+'.tmp',file);
await import('./bind-published-ulb.mjs');
for(const base of['content-packs/spa/mark-1-1-13','public/content/spa/mark-1-1-13']){const path=base+'/manifest.json',m=read(path);Object.assign(m.preparedAudio,{sha256:hash(body),bytes:Buffer.byteLength(body),entries:204,complete:true});fs.writeFileSync(path,JSON.stringify(m,null,2)+'\n');}
fs.writeFileSync('evidence/published-ulb/BINDING-RECEIPT.json',JSON.stringify({entries:204,added:13,characters:1394,priorCharged:85960,cumulativeCharged:87354,manifestSha256:hash(body),original191EntriesPreserved:true},null,2)+'\n');
