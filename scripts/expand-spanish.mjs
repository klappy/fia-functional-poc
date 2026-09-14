import {hash} from './project-spanish.mjs';
const requireValue=(value,message)=>{if(!value)throw Error(message);};
const escape=text=>text.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
export function acceptedPacket(raw,receipt){
 requireValue(receipt?.status==='accepted'&&receipt?.reviewer&&receipt.sha256===hash(raw),'Packet lacks exact independent acceptance');
 return JSON.parse(raw);
}
// Pure projection: never writes public assets or changes original source objects.
export function expandSpanish(original,{resourceRaw,resourceReceipt,scriptureRaw,scriptureReceipt,resourceMap,assetWitnesses={},correctionsRaw,correctionsReceipt}){
 const resources=acceptedPacket(resourceRaw,resourceReceipt),scripture=acceptedPacket(scriptureRaw,scriptureReceipt).supplements;
 requireValue(original.terms.length===17&&original.media.length===5&&original.scripture.length===2&&original.supplements.length===8,'Unexpected original pack membership');
 const expected=resourceMap.filter(r=>!r.spanishId).map(r=>r.englishId);
 requireValue(resources.length===12&&expected.length===12&&new Set(resources.map(r=>r.englishId)).size===12&&resources.every(r=>expected.includes(r.englishId)),'Wrong derived resource membership');
 const projected=resources.map(r=>{
  const p=r.provenance,witness=resourceMap.find(x=>x.englishId===r.englishId);
  requireValue(r.id===`ai-spa-from-${r.englishId}`&&r.language==='spa'&&r.label&&r.notice,'Derived resource identity/notice missing');
  requireValue(hash(p.sourceHtml)===p.sourceHtmlSha256&&p.sourceHtmlSha256===witness.englishBodySha256&&hash(r.body)===p.translatedBodySha256&&hash(r.title)===p.translatedTitleSha256&&p.rights,'Derived resource hash/rights mismatch');
  const asset=assetWitnesses[r.englishId];
  requireValue(!['image','map'].includes(r.kind)||asset?.assetPath&&asset.assetSha256&&asset.assetBytes,'Derived image asset witness missing');
  return {id:r.id,kind:r.kind,language:'spa',lang:'es',title:r.title,originalHtml:r.body,origin:'AI translated from English',notice:r.notice,meta:r.label,changedFields:['title','body'],source:p.source,rights:p.rights,provenance:p,...asset,supplementIds:[],audio:{available:false},...(r.kind==='video'?{onlineOnly:true}:{}),...(r.kind==='map'?{pixelsLanguage:'eng'}:{})};
 });
 const editionIds=['BereanStandardBible','unfoldingWordLiteral','unfoldingWordSimplified'];
 requireValue(scripture.length===3&&new Set(scripture.map(s=>s.englishEdition)).size===3&&scripture.every(s=>editionIds.includes(s.englishEdition)),'Wrong derived edition membership');
 const editions=scripture.map(s=>{
  requireValue(s.id===`ai-spa-from-${s.englishEdition}-mark-1-1-13`&&s.label&&s.changeNotice&&s.sourceRights&&s.outputLicense&&s.officialSpanishEdition===false,'Derived Scripture attribution missing');
  requireValue(s.verses.length===13&&new Set(s.verses.map(v=>v.verse)).size===13&&s.verses.every(v=>v.verse>=1&&v.verse<=13),'Wrong verse membership');
  return {id:s.id,title:s.label,language:'spa',lang:'es',origin:'AI translated from English',notice:s.changeNotice,attribution:s.attribution,rights:{...s.sourceRights,outputLicense:s.outputLicense},source:s.source,audio:{available:false},verses:s.verses.map(v=>{
   requireValue(hash(v.text)===v.outputTextSha256&&hash(v.source.content)===v.sourceHtmlSha256&&hash(v.source.text)===v.sourceTextSha256,'Derived verse hash mismatch');
   const originalHtml=`<p><sup>${v.verse}</sup> ${escape(v.text)}</p>`;
   return {id:`${s.id}-v${v.verse}`,reference:`Mark 1:${v.verse}`,originalHtml,bodySha256:hash(originalHtml),provenance:v};
  })};
 });
 const corrections=correctionsRaw?acceptedPacket(correctionsRaw,correctionsReceipt):[];
 requireValue(corrections.length===0||corrections.length===2,'Wrong corrective supplement membership');
 for(const c of corrections){
  const target=original.terms.find(t=>t.id===c.targetId);
  requireValue(['term-109-repentance-enactment','term-104-posture-correction'].includes(c.id)&&target&&hash(target.originalHtml)===c.provenance.originalSpanishBodySha256,'Correction target changed');
  const witness=resourceMap.find(r=>r.englishId===c.source.sourceId);
  requireValue(witness&&witness.englishBodySha256===c.source.sourceBodySha256&&hash(c.source.sourceHtml)===c.source.sourceSpanSha256&&hash(c.content)===c.sha256&&c.rights.priorNoticesRetained,'Correction source/output mismatch');
 }
 requireValue(new Set(corrections.map(c=>c.id)).size===corrections.length,'Duplicate corrective supplement');
 const terms=[...original.terms,...projected.filter(r=>r.kind==='term')],media=[...original.media,...projected.filter(r=>r.kind!=='term')];
 const sourceOrder=resourceMap.map(r=>r.spanishId??`ai-spa-from-${r.englishId}`);
 const ids=[...terms,...media].map(r=>r.id);
 requireValue(ids.length===34&&new Set(ids).size===34&&sourceOrder.every(id=>ids.includes(id)),'Expanded identity union invalid');
 const resourceOrder=[...sourceOrder,...ids.filter(id=>!sourceOrder.includes(id))];
 return {...original,supplements:corrections.length?[...original.supplements,...corrections]:original.supplements,id:'spa-mrk-1-1-13-expanded-v2',terms,media,scripture:[...original.scripture,...editions],resourceOrder,audioFirstComplete:false,readiness:{...original.readiness,terms:'23 Spanish term bodies; original bodies and eight existing supplements retained',scriptureText:'two original Spanish editions and three AI-derived Spanish supplements',media:'verified image assets; three original online videos with translated metadata',audio:'unavailable; no Spanish recordings bound'},expansion:{resourceReceipt,scriptureReceipt,correctionsReceipt,resourceCount:34,scriptureEditionCount:5}};
}
