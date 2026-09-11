import MediaIcon from './MediaIcon.jsx';
import React from 'react';
import {GlassIconButton} from '../vendor/glass/components/glass/GlassIconButton.jsx';
import {GlassButton} from '../vendor/glass/components/glass/GlassButton.jsx';
import {Icon} from '../vendor/glass/components/icons/Icon.jsx';
const time=n=>`${Math.floor(n/60)}:${String(Math.floor(n%60)).padStart(2,'0')}`;
export default function AudioControls({state,owner,label,onPlay,onPause,onResume,onRestart,compact=false}){
 const mine=state.owner===owner,active=mine&&['starting','playing','paused'].includes(state.status);
 return <div className={`inline-player ${compact?'compact-player':''}`} aria-label={`${label} player`}><div className="inline-player-actions"><GlassIconButton size={44} tone={active?'dark':'light'} label={active?(state.status==='paused'?`Resume ${label}`:`Pause ${label}`):label} disabled={mine&&state.status==='starting'} onClick={active?(state.status==='paused'?onResume:onPause):onPlay}><MediaIcon paused={active&&state.status!=='paused'}/></GlassIconButton><div><strong>{active?state.title:label}</strong>{owner==='guide'&&<small>Stops for discussion</small>}{mine&&(active||state.error)&&<span role="status">{state.error||({starting:'Loading…',playing:'Playing',paused:'Paused',idle:'Ready',error:'Playback unavailable'}[state.status])}</span>}</div>{active&&<GlassButton size="sm" onClick={onRestart} aria-label={`Restart ${label}`}>Restart</GlassButton>}</div>{active&&state.duration>0&&<div className="media-progress"><progress aria-label={`${state.title} recording progress`} max={state.duration} value={state.elapsed}/><span>{time(state.elapsed)} / {time(state.duration)}</span></div>}</div>;
}
