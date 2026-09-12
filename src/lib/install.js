// Installation is browser evidence, independent of verified passage storage.
export class InstallController {
 constructor(host){this.host=host;this.listeners=new Set();this.promptEvent=null;this.media=host.matchMedia?.('(display-mode: standalone)');this.state={available:false,pending:false,accepted:false,standalone:!!(this.media?.matches||host.navigator?.standalone)};
  this.offer=e=>{e.preventDefault();this.promptEvent=e;this.emit({available:true,accepted:false});};
  this.installed=()=>{this.promptEvent=null;this.emit({available:false,pending:false,accepted:true});};
  this.mode=()=>this.emit({standalone:!!(this.media?.matches||host.navigator?.standalone)});
  host.addEventListener('beforeinstallprompt',this.offer);host.addEventListener('appinstalled',this.installed);this.media?.addEventListener('change',this.mode);
 }
 emit(value){this.state={...this.state,...value};for(const fn of this.listeners)fn();}
 subscribe=fn=>{this.listeners.add(fn);return()=>this.listeners.delete(fn);};
 snapshot=()=>this.state;
 async install(){const event=this.promptEvent;if(!event||this.state.pending)return;this.promptEvent=null;this.emit({available:false,pending:true,error:''});try{await event.prompt();const result=await event.userChoice;this.emit({pending:false,accepted:result.outcome==='accepted'});}catch{this.emit({pending:false,error:'The browser could not open installation. Use its menu if installation is available.'});}}
 dispose(){this.host.removeEventListener('beforeinstallprompt',this.offer);this.host.removeEventListener('appinstalled',this.installed);this.media?.removeEventListener('change',this.mode);this.listeners.clear();}
}
// Capture install events from initial module load, not only after settings opens.
export const appInstall=typeof window==='undefined'?null:new InstallController(window);
