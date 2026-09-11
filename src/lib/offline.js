export class OfflineController{
 constructor(onState){this.onState=onState;this.state={status:'checking',saved:false};}
 emit(value){this.state={...this.state,...value};this.onState(this.state);}
 async init(){try{if(!('serviceWorker'in navigator))throw Error('Offline saving is unavailable in this browser.');await navigator.serviceWorker.register('/sw.js');const reg=await navigator.serviceWorker.ready;this.worker=reg.active;navigator.serviceWorker.addEventListener('message',this.listener=e=>{if(e.data?.type==='CACHE_ERROR')this.emit({status:'error',saved:false,error:e.data.error});});await this.check();}catch(e){this.emit({status:'error',error:e.message});}}
 dispose(){if(this.listener)navigator.serviceWorker?.removeEventListener('message',this.listener);}
 request(type,id){return new Promise((resolve,reject)=>{if(!this.worker)return reject(Error('Offline saving is not ready.'));const channel=new MessageChannel();channel.port1.onmessage=e=>{if(e.data.progress){this.emit({status:'saving',...e.data});return;}if(e.data.done){channel.port1.close();resolve(e.data);}};this.worker.postMessage({type,id},[channel.port2]);});}
 async check(){const value=await this.request('STATUS');this.emit({...value,status:value.error?'error':'ready'});return value;}
 async save(){this.id=crypto.randomUUID();this.emit({status:'saving',error:'',bytes:0,total:0});try{const value=await this.request('SAVE',this.id);this.emit({...value,status:value.error?'error':'ready'});}catch(e){this.emit({status:'error',error:e.message});}}
 cancel(){this.worker?.postMessage({type:'CANCEL',id:this.id});}
 async remove(){const value=await this.request('DELETE');this.emit({...value,status:value.error?'error':'ready',error:value.error??''});}
}
