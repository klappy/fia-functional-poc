/** One queue for selected online media and explicit offline jobs. No speculative downloads. */
export class MediaQueue{
 constructor({concurrency=8,now=()=>Date.now(),random=Math.random}={}){this.limit=Math.max(1,Math.min(8,concurrency));this.now=now;this.random=random;this.jobs=[];this.pending=new Map();this.active=0;this.cooldown=0;this.recovery=false;this.recoveryLimit=1;this.retryTail=Promise.resolve();this.stopped=false;}
 run(key,task,{priority=1,signal,local=false}={}){
  if(signal?.aborted)return Promise.reject(new DOMException('Cancelled','AbortError'));
  let job=this.pending.get(key);
  if(!job){job={key,task,priority,local,controller:new AbortController(),clients:0};job.promise=new Promise((resolve,reject)=>{job.resolve=resolve;job.reject=reject;});this.pending.set(key,job);this.jobs.push(job);}
  job.priority=Math.min(job.priority,priority);job.clients++;this.drain();return new Promise((resolve,reject)=>{let done=false;const finish=(fn,value)=>{if(done)return;done=true;signal?.removeEventListener('abort',abort);job.clients--;fn(value);};const abort=()=>{finish(reject,new DOMException('Cancelled','AbortError'));if(!job.clients)job.controller.abort();};signal?.addEventListener('abort',abort,{once:true});job.promise.then(v=>finish(resolve,v),e=>finish(reject,e));});
 }
 drain(){clearTimeout(this.timer);if(this.stopped){const blocked=this.jobs.filter(j=>!j.local);this.jobs=this.jobs.filter(j=>j.local);for(const j of blocked){this.pending.delete(j.key);j.reject(Error('Media service unavailable.'));}}if(this.now()<this.cooldown){this.timer=setTimeout(()=>this.drain(),this.cooldown-this.now());return;}this.jobs.sort((a,b)=>a.priority-b.priority);while(this.active<(this.recovery?this.recoveryLimit:this.limit)&&this.jobs.length){const j=this.jobs.shift();if(j.controller.signal.aborted){this.pending.delete(j.key);j.reject(new DOMException('Cancelled','AbortError'));continue;}this.active++;this.execute(j).then(j.resolve,j.reject).finally(()=>{this.active--;this.pending.delete(j.key);this.drain();});}}
 async execute(j){for(let attempt=0;attempt<3;attempt++){
  j.controller.signal.throwIfAborted();let release;if(attempt>0){const previous=this.retryTail;this.retryTail=new Promise(r=>{release=r;});await previous;await new Promise(r=>setTimeout(r,Math.max(0,this.cooldown-this.now())));}let result;try{j.controller.signal.throwIfAborted();result=await j.task(j.controller.signal);}finally{release?.();}
  if([401,402,403].includes(result.status)){if(!j.local)this.stopped=true;throw Error('Media service authorization or quota unavailable.');}
  if(![429,503].includes(result.status)){if(this.recovery){this.recoveryLimit=Math.min(this.limit,this.recoveryLimit*2);if(this.recoveryLimit===this.limit)this.recovery=false;}return result;}
  await result.body?.cancel?.();if(attempt===2)throw Error('Media service is busy.');this.recovery=true;this.recoveryLimit=1;
  const header=result.headers.get('retry-after');const numeric=typeof header==='string'&&header.trim()!==''?Number(header):NaN;const date=Date.parse(header);const delay=Number.isFinite(numeric)?numeric*1000:Number.isFinite(date)?date-this.now():1000*2**attempt+this.random()*250;
  this.cooldown=Math.max(this.cooldown,this.now()+Math.max(0,delay));await new Promise((resolve,reject)=>{const timer=setTimeout(()=>{j.controller.signal.removeEventListener('abort',abort);resolve();},Math.max(0,this.cooldown-this.now()));const abort=()=>{clearTimeout(timer);reject(new DOMException('Cancelled','AbortError'));};j.controller.signal.addEventListener('abort',abort,{once:true});});
 }}
}
export const mediaQueue=new MediaQueue();
export const digestMedia=async bytes=>[...new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))].map(x=>x.toString(16).padStart(2,'0')).join('');
export async function fetchVerifiedMedia(resolved,{fetcher=fetch,signal,priority=0,queue=mediaQueue}={}){
 const d=resolved.expectedDescriptor;
 // Sharing immutable bytes rather than a consumable Response allows duplicate consumers.
 return queue.run(`${resolved.url}|${d.sha256}`,async sharedSignal=>{
  const response=await fetcher(resolved.url,{signal:sharedSignal});
  if([401,402,403,429,503].includes(response.status))return response;
  const mime=response.headers.get('content-type')?.split(';')[0];if(!response.ok||mime!==d.mime&&!(d.mime==='text/javascript'&&mime==='application/javascript'))throw Error('Media unavailable or wrong file type.');
  const bytes=await response.arrayBuffer();if(bytes.byteLength!==d.bytes||await digestMedia(bytes)!==d.sha256)throw Error('Media integrity check failed.');return{bytes,mime:d.mime};
 },{signal,priority,local:resolved.url.startsWith('/')});
}
