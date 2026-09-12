import {readFile, writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
const root=resolve(import.meta.dirname,'..');
export const hash=value=>createHash('sha256').update(value).digest('hex');
const assert=(ok,message)=>{if(!ok)throw new Error(message);};
const unique=values=>new Set(values).size===values.length;
const sourceUrl=(repository,commit,path)=>`https://raw.githubusercontent.com/${repository}/${commit}/${path}`;
const rightsFromPin=p=>({licenseInfo:p.license,adaptationNotice:p.adaptationNotice,metadataUrl:sourceUrl(p.repository,p.commit,p.metadataPath??'spa/metadata.json'),metadataSha256:p.metadataSha256??p.licenseMetadataSha256});
export function projectSpanish(input,pins){
  const g=input.guide;
  assert(g.language==='spa'&&hash(g.content)===pins.guideBodySha256,'Spanish guide body mismatch');
  assert(input.cues.length===136&&unique(input.cues.map(c=>c.cue_id)),'Unknown/duplicate guide IDs');
  const chars=Array.from(g.content);
  const blocks=input.cues.map((c,index)=>{
    assert(c.cue_id===`spa-mrk-p1-v2.1-s${c.section}-u${String(index+1).padStart(3,'0')}`,'Unknown cue ID');
    const html=chars.slice(+c.html_start,+c.html_end).join('');
    assert(hash(html)===c.html_sha256,`Cue body mismatch ${c.cue_id}`);
    const optional=index>=66&&index<=78;
    const metadata=index===123||index===124;
    assert((c.kind==='source-editorial-resource-request')===metadata,'Editorial metadata boundary changed');
    assert((c.visibility==='opt-in-example')===optional,'Optional example boundary changed');
    return {id:c.cue_id,section:+c.section,element:c.element,kind:c.kind,action:metadata?null:c.action,html,text:c.exact_source_text,source:{start:+c.html_start,end:+c.html_end,sha256:c.html_sha256},semanticParent:c.semantic_parent,semanticNote:c.semantic_note,visibility:optional?'opt-in-example':metadata?'source-metadata':'normal',ordinaryQueue:!optional&&!metadata,literalStop:/Pausen|Deténganse|Detén/i.test(c.exact_source_text)};
  });
  assert(new Set(blocks.map(b=>b.section)).size===6,'Wrong sections');
  assert(blocks.filter(b=>b.literalStop).length===29,'Wrong source stop count');
  const groups=[];
  for(const b of blocks){let group=groups.find(x=>x.id===b.semanticParent);if(!group){group={id:b.semanticParent,section:b.section,blockIds:[],ordinaryQueue:b.ordinaryQueue,visibility:b.visibility};groups.push(group);}assert(group.ordinaryQueue===b.ordinaryQueue,'Mixed optional/core group');group.blockIds.push(b.id);}
  const termIds=input.termPins.map(t=>t.id);
  assert(termIds.length===17&&unique(termIds)&&input.terms.length===17,'Wrong term membership');
  const terms=input.termPins.map(pin=>{
    const t=input.terms.find(t=>t.content_id===pin.id);assert(t&&t.language==='spa'&&hash(t.content)===pin.bodySha256,`Term body mismatch ${pin.id}`);
    assert(g.content.includes(t.displayLabel),'Term display label lacks guide witness');
    return {id:t.content_id,kind:'term',language:'spa',lang:'es',title:t.displayLabel,catalogTitle:t.title,originalHtml:t.content,version:t.version,associationOrigin:pin.associationOrigin,source:{repository:'BibleAquifer/FIAKeyTerms',commit:input.termCommit,path:pin.sourcePath,url:sourceUrl('BibleAquifer/FIAKeyTerms',input.termCommit,pin.sourcePath),bodySha256:pin.bodySha256},rights:{licenseInfo:input.termRights.resourceMetadata.license_info,adaptationNotice:input.termRights.resourceMetadata.adaptation_notice,metadataUrl:sourceUrl(input.termRights.repo,input.termRights.commit,input.termRights.path),metadataSha256:input.termRights.sha256},supplementIds:pin.gaps,audio:{available:false,reason:'No accepted Spanish recording is bound to this source pack'}};
  });
  assert(input.terms.every(t=>termIds.includes(t.content_id)),'Unknown term ID');
  const scripture=input.scripture.map(({pin,verses})=>{
    assert(verses.length===13&&pin.verses.length===13&&unique(verses.map(v=>String(v.content_id)))&&verses.every(v=>pin.verses.some(p=>String(p.id)===String(v.content_id))),'Wrong/unknown Scripture membership');
    return {id:pin.repository.split('/')[1],language:'spa',lang:'es',title:pin.license.title,rights:rightsFromPin(pin),source:{repository:pin.repository,commit:pin.commit,path:pin.path,url:sourceUrl(pin.repository,pin.commit,pin.path)},verses:pin.verses.map(expected=>{const v=verses.find(v=>String(v.content_id)===String(expected.id));assert(v&&v.language==='spa'&&hash(v.content)===expected.bodySha256,`Scripture mismatch ${expected.id}`);return {id:String(v.content_id),reference:expected.reference,version:v.version,originalHtml:v.content,bodySha256:expected.bodySha256};}),audio:{available:false}};
  });
  assert(scripture.length===2,'No invented third Scripture edition');
  const supplementIds=['term-23-warnings','term-53-examples','term-53-mime-action','term-92-warnings','term-104-complete-sentence','term-132-summary','map-c202-title','map-c197-title'];
  assert(input.supplements.length===8&&unique(input.supplements.map(s=>s.id)),'Wrong supplements');
  const supplements=input.supplements.map(s=>{
    assert(supplementIds.includes(s.id),'Unknown supplement ID');
    assert(s.output.language==='spa'&&hash(s.output.content)===s.output.sha256,'Supplement output mismatch');
    assert(hash(s.input.sourceHtml??s.input.sourceText)===s.input.sourceSpanSha256,'Supplement source span mismatch');
    assert(s.input.targetSpanishId?termIds.includes(s.input.targetSpanishId):['c197','c202'].includes(s.input.sourceId),'Unknown supplement target');
    assert(s.input.outputLabel==='AI translated from English'&&s.rights.priorNoticesRetained,'Missing derived attribution');
    return {id:s.id,targetId:s.input.targetSpanishId??s.input.sourceId,language:'spa',lang:'es',label:s.input.outputLabel,content:s.output.content,format:s.output.format,sha256:s.output.sha256,source:s.input,provenance:s.provenance,rights:s.rights,presentation:s.presentation,audio:{available:false}};
  });
  const media=input.media.map(m=>{
    assert(['a111','a112','a204','c197','c202'].includes(m.entry.content_id),'Unknown asset ID');
    assert(hash(m.entry.content)===m.sourceBodySha256,'Asset source mismatch');
    const map=m.repo==='FIAMaps',translation=supplements.find(s=>s.targetId===m.entry.content_id),rights=input.mediaRights[m.repo];
    assert(!map||translation,'Map title needs reviewed translation');
    return {id:m.entry.content_id,kind:map?'map':'image',language:map?'eng':'spa',descriptionLanguage:'spa',title:map?translation.content:m.entry.title,originalHtml:m.entry.content,originalTitle:m.entry.title,assetPath:m.assetPath,assetSha256:m.sha256,assetBytes:m.bytes,optional:m.optional,associationOrigin:'reviewed prose-derived visual selection; not original guide resource association',pixelsLanguage:m.pixelsLanguage,notice:map?'English map; description AI translated from English':'Source-authored Spanish title; original image unchanged',changedFields:map?['title']:[],meta:map?`FIAMaps · ${m.entry.content_id} · CC BY-SA 4.0 · AI translated from English · English map labels unchanged`:`FIAImages · ${m.entry.content_id} · CC BY-SA 4.0`,source:{repository:`BibleAquifer/${m.repo}`,commit:m.head,path:m.path,url:sourceUrl(`BibleAquifer/${m.repo}`,m.head,m.path),bodySha256:m.sourceBodySha256,assetUrl:m.url},rights:{licenseInfo:rights.license_info,adaptationNotice:rights.adaptation_notice,metadataSha256:m.metadataSha256,metadataUrl:sourceUrl(`BibleAquifer/${m.repo}`,m.head,map?'eng/metadata.json':'spa/metadata.json'),...(map?{attributionDiscrepancy:translation.rights.attributionDiscrepancy}: {})},audio:{available:false}};
  });
  assert(media.length===5&&unique(media.map(m=>m.id)),'Wrong asset membership');
  const pack={schemaVersion:1,id:'spa-mrk-1-1-13-source-v1',contentLanguage:'spa',lang:'es',direction:'ltr',status:'source-projection-candidate',installed:false,runtimeIntegrated:false,audioFirstComplete:false,readiness:{guideText:'reviewed source',scriptureText:'two reviewed editions',terms:'17 original Spanish bodies plus six separately labeled gap supplements',media:'four required original assets; one optional map',audio:'unavailable; no recordings bound; source sin recording remains unheard and excluded',release:'S3 integration and independent release gates pending'},guide:{id:g.content_id,version:g.version,title:g.title,originalHtml:g.content,source:{...input.guidePin,url:sourceUrl(input.guidePin.repository,input.guidePin.commit,input.guidePin.path)},rights:rightsFromPin(input.guidePin),blocks,groups,ordinaryGroupIds:groups.filter(g=>g.ordinaryQueue).map(g=>g.id),optionalExampleGroupIds:groups.filter(g=>g.visibility==='opt-in-example').map(g=>g.id),metadataGroupIds:groups.filter(g=>g.visibility==='source-metadata').map(g=>g.id),sourceStopIds:blocks.filter(b=>b.literalStop).map(b=>b.id),ordinaryStopIds:blocks.filter(b=>b.literalStop&&b.ordinaryQueue).map(b=>b.id),exampleClosePolicy:'restore prior core position; no completion or autoplay'},terms,scripture,supplements,media,derivedAssociations:[{cueNumber:15,resourceIds:['a112','c197']},{cueNumber:18,resourceIds:['a204']},{cueNumber:31,resourceIds:['c197']},{cueNumber:43,resourceIds:['a112','a111']},{cueNumber:45,resourceIds:['c197'],optionalResourceIds:['c202']},{cueNumber:95,resourceIds:['a111']},{cueNumber:97,resourceIds:['spa-t87-v1']},{cueNumber:123,resourceIds:['spa-t4-v1']},{cueNumber:125,scope:'source-metadata-only',resourceIds:['c197'],optionalResourceIds:['c202']}].map(x=>({scope:'activity',...x,origin:'prose-derived reviewed selection; not original guide association'}))};
  const serialized=JSON.stringify(pack);
  assert(!/\/tmp\/|\/Users\/|file:\/\/|voiceId|apiKey/.test(serialized),'Private runtime path or secret field');
  assert(!serialized.includes('.mp3'),'No audio assets in source-only projection');
  return pack;
}
export async function buildSpanish(){
  const raw=await readFile(resolve(root,'sources/spanish/INPUTS.json'));
  const pins=JSON.parse(await readFile(resolve(root,'sources/spanish/PINS.json')));
  assert(hash(raw)===pins.inputsSha256,'Accepted Spanish inputs changed');
  const pack=projectSpanish(JSON.parse(raw),pins);
  for(const m of pack.media){const bytes=await readFile(resolve(root,'content-packs/spa/mark-1-1-13',m.assetPath));assert(hash(bytes)===m.assetSha256&&bytes.length===m.assetBytes,`Asset bytes mismatch ${m.id}`);}
  const text=JSON.stringify(pack,null,2)+'\n';
  await writeFile(resolve(root,'content-packs/spa/mark-1-1-13/pack.json'),text);
  await writeFile(resolve(root,'content-packs/spa/mark-1-1-13/manifest.json'),JSON.stringify({schemaVersion:1,packId:pack.id,status:pack.status,runtimeIntegrated:false,files:[{path:'pack.json',sha256:hash(text),bytes:Buffer.byteLength(text)},...pack.media.map(m=>({path:m.assetPath,sha256:m.assetSha256,bytes:m.assetBytes,optional:m.optional}))]},null,2)+'\n');
  console.log(`Spanish projection PASS: ${pack.guide.blocks.length} blocks, ${pack.guide.sourceStopIds.length} source stops, ${pack.terms.length} original terms, 26 verses, 8 supplements; no runtime/audio activation`);
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href)await buildSpanish();
