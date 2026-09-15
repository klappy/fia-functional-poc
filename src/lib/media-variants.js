import spanishTimings from '../data/spanish-alignment.json' with {type:'json'};
import catalog from '../data/media-derivatives.json' with {type:'json'};
export const MEDIA_QUALITY_KEY='fia.media-quality.v1';
export const mediaProxyBase=import.meta.env?.VITE_MEDIA_PROXY_BASE??'https://transcode.klappy.dev';
export function storedMediaQuality(storage){try{storage??=globalThis.localStorage;return storage?.getItem(MEDIA_QUALITY_KEY)==='original'?'original':'medium';}catch{return'medium';}}
export function variantMatchesCheckpoint(entry,checkpoint,index=catalog){return checkpoint.outputSha256===entry.sha256||checkpoint.originalOutputSha256===entry.sha256&&index.entries.some(d=>d.eligible===true&&d.sourceSha256===entry.sha256&&d.sourcePath===entry.path&&d.sha256===checkpoint.outputSha256);}
export function resolveMedia(source,preference='medium',display={},index=catalog,proxyBase=mediaProxyBase){
 const original={url:source.path,expectedDescriptor:source,originalDescriptor:source,variant:'original'};
 if(requiresOriginalTiming(source)&&!display.outputSha256&&!(display.offline&&display.availableSha256&&!display.availableSha256.includes(source.sha256)))return original;
 if(preference==='original'&&!display.outputSha256&&!(display.offline&&display.availableSha256&&!display.availableSha256.includes(source.sha256))||display.outputSha256===source.sha256)return original;
 let entries=index.entries.filter(d=>d.eligible===true&&(d.sourcePath===source.path||source.mime?.startsWith('image/'))&&d.sourceSha256===source.sha256&&d.sourceBytes===source.bytes&&d.bytes>0&&d.bytes<source.bytes&&/^[a-f0-9]{64}$/.test(d.sha256));
 if(display.availableSha256)entries=entries.filter(d=>display.availableSha256.includes(d.sha256));
 if(display.outputSha256)entries=entries.filter(d=>d.sha256===display.outputSha256);
 if(source.mime?.startsWith('image/')){
  const target=Math.min(source.width??Infinity,Math.ceil((display.cssWidth??320)*Math.min(2,Math.max(1,display.dpr??1))));
  entries=entries.filter(d=>d.mime==='image/webp'&&d.width<=source.width&&d.height<=source.height);const sufficient=entries.filter(d=>d.width>=target).sort((a,b)=>a.bytes-b.bytes);entries=sufficient.length?sufficient:display.offline&&display.availableSha256?entries.sort((a,b)=>b.width-a.width):[];
 }else entries=entries.filter(d=>['audio/ogg','audio/opus','application/ogg'].includes(d.mime)&&d.recipe==='preset=voice,q=medium,f=opus');
 const d=entries[0];if(!d)return original;
 const expectedPath=`/${d.kind}/${d.recipe}/${index.sourceBase??'https://fia.klappy.dev'}${d.sourcePath}`;
 if(d.proxyPath!==expectedPath||d.kind==='image'&&!/^w=\d+,q=medium,f=webp$/.test(d.recipe))return original;
 let base;try{base=new URL(proxyBase);if(base.protocol!=='https:'||base.username||base.password||base.search||base.hash)return original;}catch{return original;}
 return{url:base.href.replace(/\/$/,'')+d.proxyPath,expectedDescriptor:{...d,path:d.proxyPath},originalDescriptor:source,variant:'medium'};
}
export const mediaCatalog=catalog;
export function variantCachePath(d){return `/__fia_variants__/${d.sourceSha256}/${encodeURIComponent(d.recipe)}/${d.sha256}.${d.kind==='image'?'webp':'ogg'}`;}

export async function savedMediaHashes(source){const worker=globalThis.navigator?.serviceWorker?.controller;if(!worker)return[];return new Promise(resolve=>{const channel=new MessageChannel();const timer=setTimeout(()=>{channel.port1.close();resolve([]);},3000);channel.port1.onmessage=e=>{clearTimeout(timer);channel.port1.close();resolve(e.data?.sha256??[]);};worker.postMessage({type:'MEDIA_VARIANTS',originalSha256:source.sha256},[channel.port2]);});}

export function requiresOriginalTiming(source){return spanishTimings.some(d=>d.audioPath===source.path&&d.audioSha256===source.sha256&&d.audioBytes===source.bytes);}
