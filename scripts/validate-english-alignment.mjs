import crypto from'node:crypto';
const hash=x=>crypto.createHash('sha256').update(x).digest('hex');
export function validateAlignment(request,response){
 const fail=message=>{throw Error(message);};
 if(!Number.isFinite(response.loss)||response.loss<0)fail('Missing or invalid overall loss');
 const validate=(rows,name)=>{if(!Array.isArray(rows)||!rows.length)fail(`Missing ${name}`);let start=0,end=0;for(const r of rows){if(typeof r.text!=='string'||!r.text.length||!Number.isFinite(r.start)||!Number.isFinite(r.end)||r.start<start||r.end<end||r.start<0||r.end<r.start||r.end>request.durationSeconds)fail(`Invalid ${name} intervals`);if(name==='words'&&(!Number.isFinite(r.loss)||r.loss<0))fail('Missing word loss');start=r.start;end=r.end;}return rows;};
 const chars=validate(response.characters,'characters'),words=validate(response.words,'words');
 if(chars.map(x=>x.text).join('')!==request.spokenText)fail('Character coverage mismatch');
 const normalize=s=>s.replace(/\s+/gu,'');if(normalize(words.map(x=>x.text).join(''))!==normalize(request.spokenText))fail('Word coverage mismatch');
 let offset=0;const positioned=chars.map(c=>{const start=offset;offset+=c.text.length;return{...c,from:start,to:offset};});
 const verses=request.verses.map(v=>{const hits=positioned.filter(c=>c.to>v.startCharacter&&c.from<v.endCharacter&&c.text.trim());if(!hits.length||hits[0].from<v.startCharacter||hits.at(-1).to>v.endCharacter)fail('Ambiguous verse boundary');return{sourceId:v.sourceId,verse:v.verse,start:hits[0].start,end:hits.at(-1).end};});
 if(verses.length!==13||new Set(verses.map(v=>v.sourceId)).size!==13)fail('Verse coverage mismatch');
 return{version:1,audioSha256:request.audioSha256,sourceSha256:request.sourceSha256,spokenSha256:request.spokenSha256,responseSha256:hash(JSON.stringify(response)),intervals:verses,reviewRequired:true,loss:response.loss,wordLoss:words.map(w=>w.loss)};
}
