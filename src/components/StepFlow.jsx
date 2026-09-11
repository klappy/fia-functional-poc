import {GlassSelect} from '../vendor/glass/components/forms/GlassSelect.jsx';
import { Icon } from '../vendor/glass/components/icons/Icon.jsx';
import ResourceTile from './ResourceTile.jsx';
import { resourceLabel } from '../lib/resource-label.js';
import React from 'react';
import { GlassSurface } from '../vendor/glass/components/glass/GlassSurface.jsx';
import { GlassButton } from '../vendor/glass/components/glass/GlassButton.jsx';
import { GlassChip } from '../vendor/glass/components/glass/GlassChip.jsx';
import { SafeHtml } from './SourceDetails.jsx';
import { currentPosition, canFinish } from '../lib/flow.js';
export default function StepFlow({ session, pack, onMove, onStep, onResource, onScripture, onSource, onExamples, onFinish, player,transport,onTermPlay,termAvailable,onIndex }) {
  const { step, units, unit, index, isStop } = currentPosition(session, pack.guide, pack.cues);
  const attached = (pack.cues.resourcesAt[unit.id] ?? []).map(id => pack.resources.find(r => r.content_id === id));
  const atEnd = step.id === 'S06' && index === units.length - 1;
  return <>
    <div className="secondary-band guide-chooser"><GlassSelect label="Guide step" aria-label="Guide step" value={step.id} onChange={onStep} options={pack.guide.steps.map((s,i)=>({value:s.id,label:`${i+1} of 6 · ${s.title}`}))}/><GlassButton onClick={onIndex}>Section {index+1} of {units.length} · Browse</GlassButton></div>
    <GlassSurface as="section" level={4} className="reading-card guide-card" aria-labelledby="step-title">
      <div className="card-topline"><p className="eyebrow">Step {pack.guide.steps.indexOf(step)+1} of 6</p><GlassChip style={{ fontSize: 13 }}>{isStop ? 'Pause together' : 'Guide'}</GlassChip></div>
      {transport}<div className="content-heading"><div><h2 id="step-title">{step.title}</h2><p className="unit-count">Guide section {index+1} of {units.length}</p></div>{player}</div>
      <div className="current-unit" data-testid="current-unit" data-unit-id={unit.id}><SafeHtml html={unit.html}/></div>
      {isStop && <GlassSurface level={2} shadow="rest" className="discussion-state" role="status"><strong>Take your time.</strong> Pause for the source's discussion, reading or activity. Continue when you are ready.</GlassSurface>}
      {unit.text.startsWith('Listen to an audio') && <p className="reading-note">Open Scripture to listen, or <button className="text-button" onClick={onScripture}>Read the selected Scripture</button> together.</p>}
      {attached.length > 0 && <div className="context-resources"><h3>Explore at this point</h3>{attached.map(item => <ResourceTile key={item.content_id} item={item} contextual onOpen={onResource} onPlay={onTermPlay} audioAvailable={termAvailable(item.content_id)}/>)}</div>}
      {step.id === 'S04' && <p className="example-note">The source includes possible drama responses. Keep them hidden while the group responds. <button className="text-button" onClick={onExamples}>Show source example</button></p>}
      <div className="guide-actions"><GlassButton onClick={() => onMove(-1)} disabled={step.id === 'S01' && index === 0}>Back</GlassButton>{atEnd ? <GlassButton variant="dark" onClick={onFinish} disabled={!canFinish(session, pack.guide)}>Finish session</GlassButton> : <GlassButton variant="dark" onClick={() => onMove(1)}>Continue <Icon name="chevronRight" size={18} aria-hidden="true"/></GlassButton>}</div>
      {atEnd && !canFinish(session,pack.guide) && <p>Visit all six steps before finishing this session.</p>}
      <button className="text-button source-link" onClick={onSource}>Read complete guide and attribution</button>
    </GlassSurface>
  </>;
}
