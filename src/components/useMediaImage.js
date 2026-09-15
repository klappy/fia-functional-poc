import{useEffect,useRef,useState}from'react';
import originals from'../data/image-originals.json';
import{resolveMedia,storedMediaQuality}from'../lib/media-variants.js';
import{fetchVerifiedMedia}from'../lib/media-queue.js';
export default function useMediaImage(path){const ref=useRef(null);const[width,setWidth]=useState(0);const[quality,setQuality]=useState(()=>storedMediaQuality());const[src,setSrc]=useState(undefined);const[failed,setFailed]=useState(false);
 useEffect(()=>{const handler=()=>setQuality(storedMediaQuality());window.addEventListener('fia-media-quality',handler);return()=>window.removeEventListener('fia-media-quality',handler);},[]);
 useEffect(()=>{const node=ref.current;if(!node)return;const observer=new ResizeObserver(entries=>setWidth(entries[0].contentRect.width));observer.observe(node);return()=>observer.disconnect();},[path]);
 const original=originals.find(e=>e.path===path);const selected=original&&width?resolveMedia(original,quality,{cssWidth:width,dpr:window.devicePixelRatio}):null;
 useEffect(()=>{if(!original||!selected){setSrc(undefined);return;}const abort=new AbortController();let objectUrl;let published=false;setFailed(false);setSrc(undefined);
 (async()=>{let result;try{result=await fetchVerifiedMedia(selected,{signal:abort.signal});}catch(e){if(abort.signal.aborted||selected.variant==='original')throw e;result=await fetchVerifiedMedia({url:original.path,expectedDescriptor:original},{signal:abort.signal});}if(abort.signal.aborted)return;objectUrl=URL.createObjectURL(new Blob([result.bytes],{type:result.mime}));if(abort.signal.aborted){URL.revokeObjectURL(objectUrl);return;}published=true;setSrc(objectUrl);})().catch(()=>{if(!abort.signal.aborted)setFailed(true);});return()=>{abort.abort();if(objectUrl&&!published)URL.revokeObjectURL(objectUrl);};},[path,selected?.url,selected?.expectedDescriptor.sha256]);
 useEffect(()=>()=>{if(src)URL.revokeObjectURL(src);},[src]);return{ref,src,failed};}
