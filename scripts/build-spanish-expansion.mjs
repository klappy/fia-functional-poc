import fs from 'node:fs/promises';
import {hash} from './project-spanish.mjs';
import {expandSpanish} from './expand-spanish.mjs';
const read=async p=>JSON.parse(await fs.readFile(p,'utf8'));
const dir='sources/spanish/expansion/';
const original=await read('content-packs/spa/mark-1-1-13/pack.json');
// Always rebuild from the exact preserved original source pack.
if(original.id!=='spa-mrk-1-1-13-source-v1')throw Error('Expected original projection; run project-spanish first');
const resources=await fs.readFile(dir+'RESOURCES.json','utf8'),scripture=await fs.readFile(dir+'SCRIPTURE.json','utf8'),corrections=await fs.readFile(dir+'CORRECTIONS.json','utf8');
const expected=await read('sources/expected-assets.json'),assetWitnesses={};
const assetFiles=[];
for(const id of ['a203','c201','c168']){
 const witness=expected.find(a=>a.id===id),extension=witness.mime==='image/png'?'png':'jpg',assetPath=`assets/${id}.${extension}`,bytes=await fs.readFile(`public/assets/mark-1-1-13/${id}.${extension}`);
 if(hash(bytes)!==witness.sha256||bytes.length!==witness.bytes)throw Error('Original image witness mismatch');
 assetWitnesses[id]={assetPath,assetSha256:witness.sha256,assetBytes:witness.bytes,optional:false};assetFiles.push({assetPath,bytes});
}
const pack=expandSpanish(original,{resourceRaw:resources,resourceReceipt:await read(dir+'RESOURCES-ACCEPTANCE.json'),scriptureRaw:scripture,scriptureReceipt:await read(dir+'SCRIPTURE-ACCEPTANCE.json'),correctionsRaw:corrections,correctionsReceipt:await read(dir+'CORRECTIONS-ACCEPTANCE.json'),resourceMap:await read(dir+'RESOURCE-MAP.json'),assetWitnesses});
const english=await read('public/content/mark-1-1-13/resources.json');
for(const r of [...pack.terms,...pack.media].filter(r=>r.origin))r.englishSourceAssociations=english.find(e=>`ai-spa-from-${e.content_id}`===r.id)?.associations??{};
const text=JSON.stringify(pack,null,2)+'\n';
const existing=await read('content-packs/spa/mark-1-1-13/manifest.json');
const manifest={...existing,packId:pack.id,files:[{path:'pack.json',sha256:hash(text),bytes:Buffer.byteLength(text)},...existing.files.filter(f=>f.path!=='pack.json'),...Object.values(assetWitnesses).map(a=>({path:a.assetPath,sha256:a.assetSha256,bytes:a.assetBytes,optional:false}))]};
for(const base of ['content-packs/spa/mark-1-1-13','public/content/spa/mark-1-1-13']){
 for(const a of assetFiles)await fs.writeFile(`${base}/${a.assetPath}`,a.bytes);
 await fs.writeFile(`${base}/pack.json`,text);await fs.writeFile(`${base}/manifest.json`,JSON.stringify(manifest,null,2)+'\n');
}
console.log('Expanded Spanish projection:34 resources,5 editions,10 supplements; no audio; original source objects retained');
