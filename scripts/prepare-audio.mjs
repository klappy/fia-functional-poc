import {guardAttempt} from './audio-guards.mjs';
import fs from 'node:fs';import crypto from 'node:crypto';
const hash=x=>crypto.createHash('sha256').update(x).digest('hex');
const dir='public/audio/mark-1-1-13';fs.mkdirSync(dir,{recursive:true});
const guide=JSON.parse(fs.readFileSync('public/content/mark-1-1-13/guide.json')),scripture=JSON.parse(fs.readFileSync('public/content/mark-1-1-13/scripture.json'));
const project=text=>text.replace(/[\u201c\u201d]/g,'"').replace(/[\u2018\u2019]/g,"'").replace(/\u2013/g,'—').replace(/\n\s*\n/g,' <break time="0.6s"/> ').replace(/\n/g,' ').replace(/\s{2,}/g,' ').trim();
const units=[...guide.steps.flatMap(s=>s.units).filter(u=>!/^S04-U0(1[7-9]|2[0-9])$/.test(u.id)).map(u=>({id:u.id,text:u.text})),...scripture.map(b=>({id:`scripture-${b.resourceCode}`,text:b.verses.map(v=>v.text).join(' ')}))];
const lex=s=>s.replace(/<break[^>]*\/>/g,' ').match(/[\p{L}\p{N}]+/gu)?.join(' ');
const records=units.map(u=>{const spoken=project(u.text);if(lex(u.text)!==lex(spoken))throw Error('Lexical change');return {...u,sourceSha256:hash(u.text),spokenSha256:hash(spoken),spokenCharacters:spoken.length};});
const forecast={requests:records.length,sourceCharacters:records.reduce((n,x)=>n+x.text.length,0),projectedCharacters:records.reduce((n,x)=>n+x.spokenCharacters,0),maxRequestCharacters:Math.max(...records.map(x=>x.text.length)),hardRequestCap:120,hardSourceCharacterCap:30000,rateLimitPerMinute:15,quota:'unknown; no available preflight endpoint',voiceId:'mTGIhA08MuOorUYSmCst',inspectedServerRevision:'ab5db936629f167380d5ee64060d425bc7fd1dd3',runtimeSettingsVerified:false};
if(records.length>120||forecast.sourceCharacters>30000)throw Error('Hard cap exceeded');
const approvedInputDigest=hash(JSON.stringify(records.map(({id,sourceSha256,spokenSha256})=>({id,sourceSha256,expectedSpokenProjectionSha256:spokenSha256}))));
fs.writeFileSync('evidence/b3/audio-forecast.json',JSON.stringify(forecast,null,2));console.log(forecast);
if(!process.argv.includes('--probe')&&!process.argv.includes('--batch'))process.exit();
const ledgerPath='evidence/b3/audio-attempts.json';
if(!fs.existsSync(ledgerPath))throw Error('Missing durable approved attempt ledger; coordinator review required before paid invocation');
const ledger=JSON.parse(fs.readFileSync(ledgerPath));if(ledger.approvedInputDigest!==approvedInputDigest)throw Error('Approved source input changed; hold synthesis');
let manifest=fs.existsSync(`${dir}/manifest.json`)?JSON.parse(fs.readFileSync(`${dir}/manifest.json`)):{schemaVersion:1,voiceId:forecast.voiceId,synthetic:true,projection:'Server orality punctuation/whitespace only; no lexical rewrite',entries:[]};
if(new Set(manifest.entries.map(e=>e.id)).size!==manifest.entries.length)throw Error('Duplicate audio IDs; hold synthesis');
const target=process.argv.includes('--probe')?records.slice(0,1):records;
for(const r of target){const existing=manifest.entries.find(e=>e.id===r.id);if(existing){if(existing.sourceSha256!==r.sourceSha256||!fs.existsSync(`public${existing.path}`)||hash(fs.readFileSync(`public${existing.path}`))!==existing.sha256)throw Error('Existing audio changed or missing; hold regeneration');continue;}
 guardAttempt(ledger,approvedInputDigest,r);
 const attempt={id:r.id,characters:r.text.length,sourceSha256:r.sourceSha256,startedAt:new Date().toISOString(),outcome:'uncertain'};ledger.attempts.push(attempt);fs.writeFileSync(ledgerPath,JSON.stringify(ledger,null,2));
 const started=Date.now();const response=await fetch('https://zfqwbkgtsqkcnrguevha.supabase.co/functions/v1/podcast-tts-chunk',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text:r.text,voiceId:forecast.voiceId}),signal:AbortSignal.timeout(120000)});
 if(!response.ok||!response.headers.get('content-type')?.includes('audio/mpeg'))throw Error(`Provider stopped: HTTP ${response.status} ${response.headers.get('content-type')}`);
 const bytes=Buffer.from(await response.arrayBuffer());if(bytes.length<100)throw Error('Invalid short audio');const path=`/audio/mark-1-1-13/${r.id}.mp3`;fs.writeFileSync(`public${path}`,bytes);
 manifest.entries.push({id:r.id,path,bytes:bytes.length,sha256:hash(bytes),mime:'audio/mpeg',sourceSha256:r.sourceSha256,expectedSpokenProjectionSha256:r.spokenSha256,sourceCharacters:r.text.length,spokenCharacters:r.spokenCharacters,receivedAt:new Date().toISOString(),httpStatus:response.status});fs.writeFileSync(`${dir}/manifest.json`,JSON.stringify(manifest,null,2));attempt.outcome='received';attempt.audioSha256=hash(bytes);fs.writeFileSync(ledgerPath,JSON.stringify(ledger,null,2));console.log(`${r.id}: ${bytes.length} audio/mpeg bytes`);
 await new Promise(resolve=>setTimeout(resolve,Math.max(0,4100-(Date.now()-started))));
}
