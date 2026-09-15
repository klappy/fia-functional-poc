import fs from 'node:fs';
import crypto from 'node:crypto';
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const shell=JSON.parse(fs.readFileSync('dist/offline-shell.json'));
const pinned=JSON.parse(fs.readFileSync('evidence/release/APPROVED-PUBLIC-PATHS.json'));
const generated=fs.readdirSync('dist/assets').filter(p=>/^index-[A-Za-z0-9_-]+\.(js|css)$/.test(p)).map(p=>'assets/'+p);
const spa=JSON.parse(fs.readFileSync('dist/content/spa/mark-1-1-13/manifest.json'));const spaAudio=spa.preparedAudio?JSON.parse(fs.readFileSync('dist'+spa.preparedAudio.path)):null;const spaPaths=spaAudio?['audio/spa/manifest.json',...spaAudio.entries.map(e=>e.path.slice(1))]:[];
const alignmentPaths=JSON.parse(fs.readFileSync('src/data/english-alignment.json')).map(e=>e.path.slice(1));
const allowed=new Set([...alignmentPaths,...pinned,...generated,...spaPaths,'index.html','offline-shell.json','offline-spa.json']);
if(shell.entries.length!==203||allowed.size!==216+spaPaths.length||generated.length!==2)throw Error('Release inventory count changed');
const walk=(dir,prefix='')=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(`${dir}/${e.name}`,`${prefix}${e.name}/`):[`${prefix}${e.name}`]);
const files=walk('dist');
if(files.length!==allowed.size||files.some(p=>!allowed.has(p)))throw Error('Unapproved release file');
const originals=['mark-1-1-13','terms'].map(g=>JSON.parse(fs.readFileSync(`evidence/release/private-originals/${g}-manifest.json`)));
const forbidden=[...originals.map(m=>m.voiceId).filter(Boolean),'zfqwbkgtsqkcnrguevha','podcast-tts-chunk','BEGIN PRIVATE KEY','EXACT-NARRATION-PACKET','raw-pages.json'];
for(const p of files){const body=fs.readFileSync(`dist/${p}`);if(/\.(json|js|css|html)$/.test(p)&&forbidden.some(s=>body.includes(s)))throw Error(`Private release content: ${p}`);}
for(const e of shell.entries){const b=fs.readFileSync(`dist${e.path}`);if(b.length!==e.bytes||hash(b)!==e.sha256)throw Error(`Release hash mismatch: ${e.path}`);}
const packet=JSON.parse(fs.readFileSync('evidence/release/EXACT-NARRATION-PACKET.json'));
if(packet.records.length!==172||files.filter(p=>p.endsWith('.mp3')).length!==172+(spaAudio?.entries.length??0))throw Error('Narration inventory changed');
const replacements=JSON.parse(fs.readFileSync('evidence/complete-spanish-audio/REFERENCE-PATCHES.json')).filter(r=>!r.path.startsWith('/audio/spa/'));if(replacements.length!==6)throw Error('Reference replacement scope');for(const r of packet.records){const replacement=replacements.find(x=>x.path===r.path);if(replacement&&replacement.oldSha256!==r.audioSha256)throw Error('Reference prior output mismatch');if(hash(fs.readFileSync(`dist${r.path}`))!==(replacement?.sha256??r.audioSha256))throw Error('Approved narration bytes changed');}
const config=JSON.parse(fs.readFileSync('wrangler.jsonc'));
if(config.assets.directory!=='./dist'||config.main||config.workers_dev!==false||config.preview_urls!==false||config.routes.length!==1||config.routes[0].pattern!=='fia.klappy.dev'||config.routes[0].custom_domain!==true)throw Error('Publication boundary changed');
const inventory=files.sort().map(path=>{const b=fs.readFileSync(`dist/${path}`);return {path,bytes:b.length,sha256:hash(b)}});
fs.writeFileSync('evidence/release/DEPLOYABLE-INVENTORY.json',JSON.stringify({classification:'Private build receipt; never deployed',files:inventory,packFiles:shell.entries.length,packBytes:shell.entries.reduce((n,e)=>n+e.bytes,0),distBytes:inventory.reduce((n,e)=>n+e.bytes,0)},null,2)+'\n');
console.log(`Release audit PASS: ${files.length} allowlisted files; 166 unchanged English MP3s; six approved reference replacements; no private voice identifiers/provider route; dist only.`);
