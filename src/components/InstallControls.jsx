import React,{useSyncExternalStore} from 'react';
import {GlassButton} from '../vendor/glass/components/glass/GlassButton.jsx';
import {appInstall} from '../lib/install.js';
export default function InstallControls(){const state=useSyncExternalStore(appInstall.subscribe,appInstall.snapshot);return <section aria-labelledby="install-app-title" className="install-app"><h3 id="install-app-title">FIA on this device</h3><p role="status">{state.standalone?'Opened in app mode':state.accepted?'Installation accepted by this browser':state.pending?'Complete installation in your browser':state.available?'App installation is available':'Open FIA from your browser or Home Screen'}</p>
 {state.available&&!state.standalone&&<GlassButton onClick={()=>appInstall.install()}>Install app</GlassButton>}
 {state.error&&<p role="alert">{state.error}</p>}
 {!state.standalone&&!state.accepted&&<details><summary>How to add FIA to your Home Screen</summary><p>On iPhone or iPad, open FIA in Safari. Open Share (it may be under More), choose Add to Home Screen, turn on Open as Web App, then tap Add.</p><p>In other browsers, use Install app or Add to Home Screen in the browser menu, if available. Your browser controls installation.</p></details>}
 <p className="reading-note">Installing the app does not save its passage. Save the English passage below before going offline. Browser or device storage removal can remove saved files.</p></section>;}
