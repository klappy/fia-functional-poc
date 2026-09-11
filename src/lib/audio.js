import nextActions from '../../public/audio/next-actions/manifest.json' with {type:'json'};
import transitions from '../../public/audio/activity-transitions/manifest.json' with {type:'json'};
import termManifest from '../../public/audio/terms/manifest.json' with {type:'json'};
import recordingManifest from '../../public/audio/mark-1-1-13/manifest.json' with {type:'json'};
const sha=async bytes=>[...new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))].map(x=>x.toString(16).padStart(2,'0')).join('');
/** Verify only the selected source recording before playback; no runtime provider calls. */
export class AudioController {
 constructor(AudioType,onState,{manifest={entries:[...nextActions.entries,...transitions.entries,...recordingManifest.entries,...termManifest.entries]},fetcher=(...args)=>fetch(...args),urlApi=URL}={}){this.AudioType=AudioType;this.onState=onState;this.manifest=manifest;this.fetcher=fetcher;this.urlApi=urlApi;this.generation=0;this.events=[];}
 emit(status,error=''){this.status=status;this.onState({status,error,sourceId:this.item?.id,title:this.item?.title??'',fullTitle:this.item?.fullTitle??this.item?.title??'',owner:this.item?.owner,elapsed:Number.isFinite(this.audio?.currentTime)?this.audio.currentTime:0,duration:Number.isFinite(this.audio?.duration)?this.audio.duration:0,queued:!!this.queued,events:this.events.slice(-30)});}
 release(){if(this.objectUrl){this.urlApi.revokeObjectURL(this.objectUrl);this.objectUrl=null;}}
 clearGap(){clearTimeout(this.gapTimer);this.gapTimer=null;this.queued=null;}
 stop(){this.clearGap();this.generation++;this.abort?.abort();if(this.audio){this.audio.pause();this.audio.removeAttribute?.('src');this.audio.load?.();this.audio=null;}this.release();this.item=null;this.emit('idle');}
 rate(){if(this.audio){this.audio.playbackRate=.95;this.audio.preservesPitch=true;}}
 restart(){this.clearGap();const token=this.generation;if(this.audio){this.audio.currentTime=0;this.rate();this.audio.play().catch(e=>{if(token===this.generation)this.emit('error',e.message);});}}
 pause(){if(this.queued){clearTimeout(this.gapTimer);this.gapTimer=null;this.emit('paused');return;}this.audio?.pause();}
 resume(){if(this.queued){const run=this.queued;this.clearGap();run();return;}const token=this.generation;this.rate();this.audio?.play().catch(e=>{if(token===this.generation)this.emit('error',`Playback could not resume: ${e.message}`);});}
 speak(items,_voice,onItemEnd=()=>{}){this.stop();const token=this.generation;let index=0;this.abort=new AbortController();const next=async()=>{if(token!==this.generation)return;this.release();if(index>=items.length){this.emit('idle');return;}const item=items[index++];this.item=item;this.audio=null;this.emit('starting');try{
 const entry=this.manifest.entries.find(e=>e.id===item.id);if(!entry||await sha(new TextEncoder().encode(item.text))!==entry.sourceSha256)throw Error('Recording does not match the selected source.');
 const response=await this.fetcher(entry.path,{signal:this.abort.signal});if(!response.ok||response.headers.get('content-type')?.split(';')[0]!=='audio/mpeg')throw Error('Recording unavailable or wrong file type.');const bytes=await response.arrayBuffer();if(bytes.byteLength!==entry.bytes||await sha(bytes)!==entry.sha256)throw Error('Recording integrity check failed.');if(token!==this.generation)return;
 this.objectUrl=this.urlApi.createObjectURL(new Blob([bytes],{type:'audio/mpeg'}));const audio=new this.AudioType(this.objectUrl);this.audio=audio;this.rate();
 const event=(type,status)=>{if(token!==this.generation)return;this.events.push({type,id:item.id,time:audio.currentTime});this.emit(status);};audio.onloadedmetadata=audio.ontimeupdate=()=>{if(token===this.generation&&this.audio===audio)this.emit(this.status);};audio.onplaying=()=>event('playing','playing');audio.onpause=()=>event('pause','paused');audio.onended=()=>{if(token!==this.generation)return;if(this.queued)return;event('ended','idle');if(index<items.length){this.queued=()=>{if(token!==this.generation)return;onItemEnd(item);void next();};this.emit('gap');this.gapTimer=setTimeout(()=>{const run=this.queued;if(!run||token!==this.generation)return;this.clearGap();run();},750);}else{onItemEnd(item);this.emit('idle');}};audio.onerror=()=>{if(token!==this.generation)return;this.generation++;this.release();this.emit('error','This verified recording could not decode or play.');};await audio.play();
 }catch(e){if(token===this.generation){this.generation++;this.release();this.emit('error',`Playback could not start: ${e.message}`);}}};void next();}
}
