import {schedule} from './ulb-audio-scheduler.mjs';
import fs from 'node:fs';import crypto from 'node:crypto';import{execFileSync}from'node:child_process';
const hash=x=>crypto.createHash('sha256').update(x).digest('hex');
const input=fs.readFileSync('evidence/published-ulb/REQUEST-PACKET.json'),pin='f1854fea60d4dee715197b4e8e21ef456900cc3db00ef671ef09398e90606c6d';
if(hash(input)!==pin)throw Error('Input ledger changed');const packet=JSON.parse(input);
if(packet.requests.length!==13||packet.processedC!==1394)throw Error('Input bounds changed');
// Read established private mechanism without exposing its voice or endpoint in output.
const mechanism=fs.readFileSync(process.env.FIA_BINDING_SOURCE,'utf8');const endpoint=mechanism.match(/fetch\('(https:[^']+)'/)?.[1],voiceId=mechanism.match(/voiceId:'([^']+)'/)?.[1];if(!endpoint||!voiceId)throw Error('Private binding unavailable');
const dir='evidence/published-ulb',ledgerPath=dir+'/attempts.json',manifestPath=dir+'/staged-manifest.json';fs.mkdirSync(dir+'/staged',{recursive:true});
function durable(path,value){const temp=path+'.tmp';const fd=fs.openSync(temp,'w');try{fs.writeFileSync(fd,JSON.stringify(value,null,2)+'\n');fs.fsyncSync(fd);}finally{fs.closeSync(fd);}fs.renameSync(temp,path);const d=fs.openSync(path.slice(0,path.lastIndexOf('/')),'r');try{fs.fsyncSync(d);}finally{fs.closeSync(d);}}
const ledger=fs.existsSync(ledgerPath)?JSON.parse(fs.readFileSync(ledgerPath)):{inputSha256:pin,priorChargedCharacters:85960,attempts:[]};if(ledger.inputSha256!==pin||ledger.priorChargedCharacters!==85960)throw Error('Attempt ledger mismatch');
const lockPath='/tmp/fia-spanish-audio-generation/evidence/spanish-audio/generation.lock';const lock=fs.openSync(lockPath,'wx');fs.writeFileSync(lock,String(process.pid));process.on('exit',()=>{fs.closeSync(lock);fs.unlinkSync(lockPath);});
const manifest=fs.existsSync(manifestPath)?JSON.parse(fs.readFileSync(manifestPath)):{schemaVersion:1,language:'spa',synthetic:true,inputLedgerSha256:pin,entries:[]};
manifest.inputLedgerSha256=pin;
const mapping=packet.requests.map(r=>({requestId:r.requestId,path:'/audio/spa/'+r.requestId+'.mp3',sourceSha256:r.rawTextSha256,processedTextSha256:r.processedTextSha256,owners:r.owners.map(o=>({ownerId:o.ownerId,classification:o.classification,playbackGroupId:o.playbackGroupId,spokenNoticeOwnerIds:o.spokenNoticeOwnerIds}))}));durable(dir+'/OWNER-MAPPING.json',mapping);
const pending=[];
for(const r of packet.requests){
 if(hash(r.rawText)!==r.rawTextSha256||hash(r.spokenInput)!==r.spokenInputSha256||hash(r.processedText)!==r.processedTextSha256)throw Error('Request hash mismatch');
 const old=manifest.entries.find(e=>e.id===r.requestId);if(old){if(old.sourceSha256!==r.rawTextSha256||old.processedTextSha256!==r.processedTextSha256||hash(fs.readFileSync(dir+'/staged/'+r.requestId+'.mp3'))!==old.sha256)throw Error('Existing output mismatch');continue;}
 pending.push(r);
}
async function execute(r){
 if(ledger.attempts.some(a=>a.id===r.requestId))throw Error('Prior attempt: no automatic retry');
 const spent=ledger.attempts.reduce((n,a)=>n+a.characters,0);if(ledger.attempts.length>=13||spent+r.processedCodepoints>1394||ledger.priorChargedCharacters+spent+r.processedCodepoints>87354)throw Error('ULB generation cap');
 if(fs.existsSync(dir+'/STOP'))throw Error('Stop boundary reached');
 const attempt={id:r.requestId,characters:r.processedCodepoints,sourceSha256:r.rawTextSha256,processedTextSha256:r.processedTextSha256,startedAt:new Date().toISOString(),outcome:'uncertain'};ledger.attempts.push(attempt);durable(ledgerPath,ledger);
 try{
 const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text:r.spokenInput,voiceId}),signal:AbortSignal.timeout(120000)});
 attempt.httpStatus=response.status;if(!response.ok||!response.headers.get('content-type')?.includes('audio/mpeg'))throw Error('HTTP or MIME rejected');
 const bytes=Buffer.from(await response.arrayBuffer());if(bytes.length<100)throw Error('Short output');const path='/audio/spa/'+r.requestId+'.mp3';const outputFile=dir+'/staged/'+r.requestId+'.mp3';fs.writeFileSync(outputFile,bytes);
 execFileSync('ffmpeg',['-v','error','-i',outputFile,'-f','null','-'],{stdio:'pipe'});
 const probe=JSON.parse(execFileSync('ffprobe',['-v','error','-show_entries','format=duration:stream=codec_name,sample_rate,channels','-of','json',outputFile]));const duration=Number(probe.format.duration);if(!(duration>0)||probe.streams[0]?.codec_name!=='mp3'||probe.streams[0]?.sample_rate!=='44100')throw Error('Decode/format rejected');
 const entry={id:r.requestId,path,bytes:bytes.length,sha256:hash(bytes),mime:'audio/mpeg',duration,sourceSha256:r.rawTextSha256,processedTextSha256:r.processedTextSha256,spokenInputSha256:r.spokenInputSha256,receivedAt:new Date().toISOString(),owners:mapping.find(x=>x.requestId===r.requestId).owners};manifest.entries.push(entry);durable(manifestPath,manifest);Object.assign(attempt,{outcome:'validated',outputSha256:entry.sha256,bytes:entry.bytes,duration});durable(ledgerPath,ledger);console.log(JSON.stringify({completed:manifest.entries.length,total:13,...entry,owners:undefined}));
 }catch(error){attempt.failure='Generation stopped; response uncertain or invalid; coordinator review required';durable(ledgerPath,ledger);console.error(JSON.stringify({id:r.requestId,status:attempt.httpStatus??null,stopped:true}));throw Error('Generation failure; new launches stopped');}
}
await schedule(process.argv.includes('--sample')?pending.slice(0,1):pending,{execute,shouldStop:()=>fs.existsSync(dir+'/STOP'),spacingMs:3100,concurrency:2,lastStartedAt:Date.parse(ledger.attempts.at(-1)?.startedAt??'1970-01-01')});
