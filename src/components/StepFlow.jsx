import GuideScreen from './GuideScreen.jsx';
import {ENGLISH_SCRIPTURE_CUES} from '../lib/guide-presentation.js';
import SourceIcon from './SourceIcon.jsx';
import{GlassIconButton}from'../vendor/glass/components/glass/GlassIconButton.jsx';
import {GlassSelect} from '../vendor/glass/components/forms/GlassSelect.jsx';
import { Icon } from '../vendor/glass/components/icons/Icon.jsx';
import ResourceTile from './ResourceTile.jsx';
import { resourceLabel } from '../lib/resource-label.js';
import React, {useEffect,useRef} from 'react';
import { GlassSurface } from '../vendor/glass/components/glass/GlassSurface.jsx';
import { GlassButton } from '../vendor/glass/components/glass/GlassButton.jsx';
import { GlassChip } from '../vendor/glass/components/glass/GlassChip.jsx';
import { SafeHtml } from './SourceDetails.jsx';
import { currentPosition, canFinish } from '../lib/flow.js';
export default function StepFlow({ session, pack, onMove, onStep, onResource, onScripture, onSource, onExamples, onFinish, player,transport,onTermPlay,termAvailable,onIndex,termPlayer,onPlayScripture,versionLabel,playback }) {
  const { step, units, unit, index, isStop } = currentPosition(session, pack.guide, pack.cues);
  const body=useRef(null);useEffect(()=>{if(body.current)body.current.scrollTop=0;},[unit.id]);
  const attached = (pack.cues.resourcesAt[unit.id] ?? []).map(id => pack.resources.find(r => r.content_id === id));
  const atEnd = step.id === 'S06' && index === units.length - 1;
  return <GuideScreen playback={playback} model={{stepId:step.id,steps:pack.guide.steps.map((s,i)=>({value:s.id,label:`${i+1}/6 · ${s.title}`})),index,total:units.length,unitId:unit.id,body:<SafeHtml html={unit.html}/>,interactionKind:isStop?'discussion':'reading',atEnd,canFinish:canFinish(session,pack.guide),metadataNotice:session.metadataPosition?'Source media request restored · Info':null,finished:session.finished}} onStep={onStep} onIndex={onIndex} onFinish={onFinish} transport={transport} actions={<><GlassIconButton size={44} label="Read complete guide and attribution" onClick={onSource}><SourceIcon size={18}/></GlassIconButton>{player}</>}>
      {ENGLISH_SCRIPTURE_CUES.has(unit.id) && <div className="scripture-prompt"><GlassButton variant="dark" onClick={onPlayScripture}>Play Scripture {versionLabel}</GlassButton><button className="text-button" onClick={onScripture}>Read the selected Scripture</button></div>}
      {attached.length > 0 && <div className="context-resources"><h3>Explore at this point</h3>{attached.map(item => <ResourceTile key={item.content_id} item={item} player={termPlayer(item)} contextual onOpen={onResource} onPlay={onTermPlay} audioAvailable={termAvailable(item.content_id)}/>)}</div>}
      {step.id === 'S04' && <p className="example-note">The source includes possible drama responses. Keep them hidden while the group responds. <button className="text-button" onClick={onExamples}>Show source example</button></p>}

  </GuideScreen>;
}
