import React from 'react';
import {GlassSurface} from '../vendor/glass/components/glass/GlassSurface.jsx';
import {GlassButton} from '../vendor/glass/components/glass/GlassButton.jsx';
export default function AudioControls({state,view,onGuide,onScripture,onPause,onResume,onStop}){
 const active=['starting','playing','paused'].includes(state.status);
 return <GlassSurface level={2} shadow="rest" className="audio-controls" style={{padding:'12px 16px',marginBottom:14}}><div className="narration-actions"><GlassButton variant="dark" onClick={view==='scripture'?onScripture:onGuide}>Listen {view==='scripture'?'to Scripture':'to this step'}</GlassButton>{active&&<><GlassButton disabled={state.status==='starting'} onClick={state.status==='paused'?onResume:onPause}>{state.status==='paused'?'Resume':'Pause'}</GlassButton><GlassButton onClick={onStop}>Stop</GlassButton></>}<span className="reading-note">ElevenLabs · synthetic voice</span></div><p className="narration-status" role="status">{state.error||({idle:'Ready · stops for discussion.',starting:'Loading recording…',playing:'Listening…',paused:'Paused.'}[state.status])}</p></GlassSurface>;
}
