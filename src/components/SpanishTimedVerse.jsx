import React from 'react';
import index from '../data/spanish-alignment.json';
import {validSpanishAlignment,spanishAlignmentPosition} from '../lib/spanish-alignment.js';
import AlignedVerse from './AlignedVerse.jsx';
import SourceHighlight from './SourceHighlight.jsx';
export default function SpanishTimedVerse({bible,verse,text,number,playback}){
 const ownerId=`spa-${bible.id}-${verse.id}`,descriptor=index.find(d=>d.ownerId===ownerId);
 const [loaded,setLoaded]=React.useState(null);
 React.useEffect(()=>{setLoaded(null);if(!descriptor)return;const abort=new AbortController();(async()=>{try{const response=await fetch(descriptor.path,{signal:abort.signal});if(!response.ok)return;const bytes=await response.arrayBuffer();const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),b=>b.toString(16).padStart(2,'0')).join('');if(bytes.byteLength!==descriptor.bytes||digest!==descriptor.sha256)return;const data=JSON.parse(new TextDecoder().decode(bytes));const htmlHash=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(verse.originalHtml))),b=>b.toString(16).padStart(2,'0')).join('');if(htmlHash===descriptor.sourceHtmlSha256&&validSpanishAlignment(data,descriptor,verse,text)&&!abort.signal.aborted)setLoaded(data);}catch{/* Timing is optional; retain the verified audio and readable verse. */}})();return()=>abort.abort();},[descriptor,verse.originalHtml,text]);
 const data=descriptor&&loaded?.id===descriptor.id&&validSpanishAlignment(loaded,descriptor,verse,text)?loaded:null;
 const position=data?spanishAlignmentPosition(data,descriptor,playback):null;
 return position?<AlignedVerse verse={data.verses[0]} position={position}/>:<SourceHighlight state={playback} domain="scripture" sourceIds={[ownerId]} label={`Verse ${number}`}>{text}</SourceHighlight>;
}
