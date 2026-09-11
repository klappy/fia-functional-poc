import React from 'react';
import { GlassSurface } from '../vendor/glass/components/glass/GlassSurface.jsx';
import { GlassButton } from '../vendor/glass/components/glass/GlassButton.jsx';
import { GlassSelect } from '../vendor/glass/components/forms/GlassSelect.jsx';
export default function NarrationControls({voices,voiceId,setVoiceId,state,onGuide,onScripture,onPause,onResume,onStop}){
 const active=['starting','speaking','paused'].includes(state.status);
 return <GlassSurface as="details" level={2} shadow="rest" className="narration-controls" style={{padding:'10px 14px',marginBottom:12}}>
  <summary>Optional browser voice fallback</summary><GlassSelect label="English voice" aria-label="English voice" value={voiceId} options={voices.length?voices.map(v=>({value:v.voiceURI,label:`${v.name}${v.localService?' · device voice':' · network voice'}`})):[{value:'',label:'No English voice available'}]} onChange={setVoiceId}/>
  <div className="narration-actions"><GlassButton onClick={onGuide} disabled={!voices.length}>Read guide</GlassButton><GlassButton onClick={onScripture} disabled={!voices.length}>Read Scripture</GlassButton>{active&&<><GlassButton onClick={state.status==='paused'?onResume:onPause} disabled={state.status==='starting'}>{state.status==='paused'?'Resume narration':'Pause narration'}</GlassButton><GlassButton onClick={onStop}>Stop narration</GlassButton></>}</div>
  <p role="status" className="narration-status">{state.error||({idle:'Ready. Guide narration stops for discussion.',starting:'Starting narration…',speaking:'Narrating selected source…',paused:'Narration paused.',unavailable:'No English voice available.'}[state.status])}</p>
  <p className="reading-note">Computer-generated browser fallback. Device voice availability and offline operation depend on this browser.</p>
 </GlassSurface>;
}
