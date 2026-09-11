export function englishVoices(synth){return synth?.getVoices().filter(v=>/^en(?:-|_)/i.test(v.lang))??[];}
export function speechChunks(text){return text.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.flatMap(sentence=>{const words=sentence.trim().split(/\s+/),out=[];let chunk='';for(const word of words){if(chunk.length+word.length>220&&chunk){out.push(chunk);chunk='';}chunk+=(chunk?' ':'')+word;}if(chunk)out.push(chunk);return out;})??[];}
export class SpeechController{
 constructor(synth,Utterance,onState=()=>{}){this.synth=synth;this.Utterance=Utterance;this.onState=onState;this.generation=0;this.state={status:'idle',events:[],error:''};}
 emit(status,extra={}){this.state={...this.state,status,...extra};this.onState(this.state);}
 stop(){this.generation++;if(this.timer)clearTimeout(this.timer);this.synth?.cancel();this.emit('idle');}
 pause(){if(this.state.status==='speaking')this.synth.pause();}
 resume(){if(this.state.status==='paused')this.synth.resume();}
 speak(items,voice,onItemEnd=()=>{}){
  this.stop();const token=this.generation;
  if(!this.synth||!voice){this.emit('unavailable',{error:'No English voice is available. You can read the source text.'});return;}
  const queue=items.flatMap((item,index)=>speechChunks(item.text).map((text,i,chunks)=>({text,index,last:i===chunks.length-1})));
  if(!queue.length){this.emit('error',{error:'This source has no text to narrate.'});return;}
  let cursor=0;this.emit('starting',{error:'',events:[]});
  const next=()=>{if(token!==this.generation)return;if(cursor===queue.length){this.emit('idle');return;}const chunk=queue[cursor++],u=new this.Utterance(chunk.text);u.voice=voice;u.lang=voice.lang;this.utterance=u;
   const event=(type,e)=>{if(token!==this.generation)return false;this.state.events=[...this.state.events.slice(-29),{type,elapsed:e.elapsedTime??null}];return true;};
   u.onstart=e=>{if(event('start',e))this.emit('speaking');};u.onpause=e=>{if(event('pause',e))this.emit('paused');};u.onresume=e=>{if(event('resume',e))this.emit('speaking');};
   u.onerror=e=>{if(!event('error',e))return;this.generation++;this.emit('error',{error:`Narration stopped: ${e.error??'voice error'}.`});};
   u.onend=e=>{if(!event('end',e))return;if(chunk.last)onItemEnd(items[chunk.index]);if(token===this.generation)next();};this.synth.speak(u);
  };this.timer=setTimeout(next,0);
 }
}
