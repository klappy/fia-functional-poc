import fs from 'node:fs';import crypto from 'node:crypto';
const hash=b=>crypto.createHash('sha256').update(b).digest('hex'),base='evidence/spanish-alignment';
const reviewed=fs.readFileSync(base+'/VALIDATION.json');if(hash(reviewed)!=='54276d58b176f3ad5074478dc23ee909681fc77863df50d9a44e6fe0797d9e80')throw Error('Reviewed input changed');
const packet=JSON.parse(reviewed),pack=JSON.parse(fs.readFileSync('public/content/spa/mark-1-1-13/pack.json')),index=[];
if(packet.validated.length!==3||packet.packetSha256!=='6546f55060ef60beeac536ed4bea78f09c5287998217355c7038214d10aa860a')throw Error('Unapproved partial packet');
for(const r of packet.validated){
 const audio=fs.readFileSync('public'+r.audioPath),raw=fs.readFileSync(`${base}/${r.id}.response.json`),response=JSON.parse(raw),verse=pack.scripture.find(b=>b.id==='ReinaValera1909').verses[r.verse-1];
 if(hash(audio)!==r.audioSha256||audio.length!==r.bytes||hash(raw)!==r.responseSha256||hash(verse.originalHtml)!==r.sourceHtmlSha256||hash(r.displayText)!==r.sourceSha256||response.characters.map(c=>c.text).join('')!==r.displayText||response.words.map(w=>w.text).join('')!==r.displayText)throw Error('Input identity mismatch');
 let offset=0,last=0;const words=[];for(const w of response.words){const from=offset;offset+=w.text.length;if(!Number.isFinite(w.start)||!Number.isFinite(w.end)||w.start<last||w.end<w.start||w.end>r.durationSeconds)throw Error('Invalid timing');last=w.end;if(w.text.trim()){if(w.end===w.start)throw Error('Zero word interval');words.push({from,to:offset,start:w.start,end:w.end});}}
 if(JSON.stringify(words)!==JSON.stringify(r.words.map(({from,to,start,end})=>({from,to,start,end}))))throw Error('Reviewed offsets changed');
 const data={schemaVersion:1,id:r.id,audioSha256:r.audioSha256,sourceSha256:r.sourceSha256,responseSha256:r.responseSha256,duration:r.durationSeconds,verses:[{sourceId:r.ownerId,text:r.displayText,sourceHtmlSha256:r.sourceHtmlSha256,start:words[0].start,end:words.at(-1).end,words}]};
 const bytes=Buffer.from(JSON.stringify(data)),path=`/alignment/${r.id}.json`;fs.writeFileSync('public'+path,bytes);index.push({id:r.id,ownerId:r.ownerId,edition:r.edition,verse:r.verse,path,bytes:bytes.length,sha256:hash(bytes),audioPath:r.audioPath,audioBytes:r.bytes,audioSha256:r.audioSha256,sourceSha256:r.sourceSha256,sourceHtmlSha256:r.sourceHtmlSha256});
}
fs.writeFileSync('src/data/spanish-alignment.json',JSON.stringify(index,null,2)+'\n');console.log('Bound only3 original RV1909 recordings to48 reviewed word spans.');
