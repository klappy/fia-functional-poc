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
export default function StepFlow({ session, pack, onMove, onStep, onResource, onScripture, onSource, onExamples, onFinish, player,transport,onTermPlay,termAvailable,onIndex,termPlayer,onPlayScripture,versionLabel }) {
  const { step, units, unit, index, isStop } = currentPosition(session, pack.guide, pack.cues);
  const body=useRef(null);useEffect(()=>{if(body.current)body.current.scrollTop=0;},[unit.id]);
  const attached = (pack.cues.resourcesAt[unit.id] ?? []).map(id => pack.resources.find(r => r.content_id === id));
  const atEnd = step.id === 'S06' && index === units.length - 1;
  return <>
    <div className="secondary-band guide-chooser"><GlassSelect label="Guide step" aria-label="Guide step" value={step.id} onChange={onStep} options={pack.guide.steps.map((s,i)=>({value:s.id,label:`${i+1}/6 · ${s.title}`}))}/><GlassButton aria-label={`Section ${index+1} of ${units.length} · Browse`} onClick={onIndex}>Section {index+1}/{units.length}</GlassButton></div>
    <GlassSurface as="section" level={4} className="reading-card guide-card" aria-label="Source guide">
      <div className="content-heading"><span className="eyebrow">{isStop?'Pause together':'Guide'}{session.metadataPosition&&<small style={{display:'block'}} title="The original unlinked source media request is available in Info.">Source media request restored · Info</small>}</span><div className="card-players"><GlassIconButton size={44} label="Read complete guide and attribution" onClick={onSource}><SourceIcon size={18}/></GlassIconButton>{player}</div></div>
      <div className="source-scroll" ref={body}>
      <div className="current-unit" data-testid="current-unit" data-unit-id={unit.id}><SafeHtml html={unit.html}/></div>

      {unit.text.startsWith('Listen to an audio') && <div className="scripture-prompt"><GlassButton variant="dark" onClick={onPlayScripture}>Play Scripture {versionLabel}</GlassButton><button className="text-button" onClick={onScripture}>Read the selected Scripture</button></div>}
      {attached.length > 0 && <div className="context-resources"><h3>Explore at this point</h3>{attached.map(item => <ResourceTile key={item.content_id} item={item} player={termPlayer(item)} contextual onOpen={onResource} onPlay={onTermPlay} audioAvailable={termAvailable(item.content_id)}/>)}</div>}
      {step.id === 'S04' && <p className="example-note">The source includes possible drama responses. Keep them hidden while the group responds. <button className="text-button" onClick={onExamples}>Show source example</button></p>}

      <div className="guide-completion">{isStop&&<p role="status">Discuss together, then continue.</p>}{atEnd&&<GlassButton variant="dark" onClick={onFinish} disabled={!canFinish(session,pack.guide)}>Finish session</GlassButton>}
      {atEnd && !canFinish(session,pack.guide) && <p>Visit all six steps before finishing this session.</p>}
      </div></div><div className="guide-footer card-transport-footer">{transport}</div>
    </GlassSurface>
  </>;
}
