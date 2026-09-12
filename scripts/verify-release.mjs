import fs from 'node:fs';
import crypto from 'node:crypto';
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const shell=JSON.parse(fs.readFileSync('dist/offline-shell.json'));
const pinned=JSON.parse(fs.readFileSync('evidence/release/APPROVED-PUBLIC-PATHS.json'));
const generated=fs.readdirSync('dist/assets').filter(p=>/^index-[A-Za-z0-9_-]+\.(js|css)$/.test(p)).map(p=>'assets/'+p);
const allowed=new Set([...pinned,...generated,'index.html','offline-shell.json']);
if(shell.entries.length!==195||allowed.size!==197||generated.length!==2)throw Error('Release inventory count changed');
const walk=(dir,prefix='')=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(`${dir}/${e.name}`,`${prefix}${e.name}/`):[`${prefix}${e.name}`]);
const files=walk('dist');
if(files.length!==allowed.size||files.some(p=>!allowed.has(p)))throw Error('Unapproved release file');
const originals=['mark-1-1-13','terms'].map(g=>JSON.parse(fs.readFileSync(`evidence/release/private-originals/${g}-manifest.json`)));
const forbidden=[...originals.map(m=>m.voiceId).filter(Boolean),'zfqwbkgtsqkcnrguevha','podcast-tts-chunk','BEGIN PRIVATE KEY','EXACT-NARRATION-PACKET','raw-pages.json'];
for(const p of files){const body=fs.readFileSync(`dist/${p}`);if(/\.(json|js|css|html)$/.test(p)&&forbidden.some(s=>body.includes(s)))throw Error(`Private release content: ${p}`);}
for(const e of shell.entries){const b=fs.readFileSync(`dist${e.path}`);if(b.length!==e.bytes||hash(b)!==e.sha256)throw Error(`Release hash mismatch: ${e.path}`);}
const packet=JSON.parse(fs.readFileSync('evidence/release/EXACT-NARRATION-PACKET.json'));
if(packet.records.length!==172||files.filter(p=>p.endsWith('.mp3')).length!==172)throw Error('Narration inventory changed');
for(const r of packet.records)if(hash(fs.readFileSync(`dist${r.path}`))!==r.audioSha256)throw Error('Approved narration bytes changed');
const config=JSON.parse(fs.readFileSync('wrangler.jsonc'));
if(config.assets.directory!=='./dist'||config.main||config.workers_dev!==false||config.preview_urls!==false||config.routes.length!==1||config.routes[0].pattern!=='fia.klappy.dev'||config.routes[0].custom_domain!==true)throw Error('Publication boundary changed');
const inventory=files.sort().map(path=>{const b=fs.readFileSync(`dist/${path}`);return {path,bytes:b.length,sha256:hash(b)}});
fs.writeFileSync('evidence/release/DEPLOYABLE-INVENTORY.json',JSON.stringify({classification:'Private build receipt; never deployed',files:inventory,packFiles:shell.entries.length,packBytes:shell.entries.reduce((n,e)=>n+e.bytes,0),distBytes:inventory.reduce((n,e)=>n+e.bytes,0)},null,2)+'\n');
console.log(`Release audit PASS: ${files.length} allowlisted files; 172 unchanged MP3s; no private voice identifiers/provider route; dist only.`);
