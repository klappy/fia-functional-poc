import recordingManifest from '../../public/audio/mark-1-1-13/manifest.json' with {type:'json'};
const sha=async bytes=>[...new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))].map(x=>x.toString(16).padStart(2,'0')).join('');
/** Verify only the selected source recording before playback; no runtime provider calls. */
export class AudioController {
 constructor(AudioType,onState,{manifest=recordingManifest,fetcher=(...args)=>fetch(...args),urlApi=URL}={}){this.AudioType=AudioType;this.onState=onState;this.manifest=manifest;this.fetcher=fetcher;this.urlApi=urlApi;this.generation=0;this.events=[];}
 emit(status,error=''){this.onState({status,error,events:this.events.slice(-30)});}
 release(){if(this.objectUrl){this.urlApi.revokeObjectURL(this.objectUrl);this.objectUrl=null;}}
 stop(){this.generation++;this.abort?.abort();if(this.audio){this.audio.pause();this.audio.removeAttribute?.('src');this.audio.load?.();this.audio=null;}this.release();this.emit('idle');}
 pause(){this.audio?.pause();}
 resume(){const token=this.generation;this.audio?.play().catch(e=>{if(token===this.generation)this.emit('error',`Playback could not resume: ${e.message}`);});}
 speak(items,_voice,onItemEnd=()=>{}){this.stop();const token=this.generation;let index=0;this.abort=new AbortController();const next=async()=>{if(token!==this.generation)return;this.release();if(index>=items.length){this.emit('idle');return;}const item=items[index++];this.emit('starting');try{
 const entry=this.manifest.entries.find(e=>e.id===item.id);if(!entry||await sha(new TextEncoder().encode(item.text))!==entry.sourceSha256)throw Error('Recording does not match the selected source.');
 const response=await this.fetcher(entry.path,{signal:this.abort.signal});if(!response.ok||response.headers.get('content-type')?.split(';')[0]!=='audio/mpeg')throw Error('Recording unavailable or wrong file type.');const bytes=await response.arrayBuffer();if(bytes.byteLength!==entry.bytes||await sha(bytes)!==entry.sha256)throw Error('Recording integrity check failed.');if(token!==this.generation)return;
 this.objectUrl=this.urlApi.createObjectURL(new Blob([bytes],{type:'audio/mpeg'}));const audio=new this.AudioType(this.objectUrl);this.audio=audio;
 const event=(type,status)=>{if(token!==this.generation)return;this.events.push({type,id:item.id,time:audio.currentTime});this.emit(status);};audio.onplaying=()=>event('playing','playing');audio.onpause=()=>event('pause','paused');audio.onended=()=>{if(token!==this.generation)return;event('ended','idle');onItemEnd(item);void next();};audio.onerror=()=>{if(token!==this.generation)return;this.generation++;this.release();this.emit('error','This verified recording could not decode or play.');};await audio.play();
 }catch(e){if(token===this.generation){this.generation++;this.release();this.emit('error',`Playback could not start: ${e.message}`);}}};void next();}
}
