import { Icon } from '../vendor/glass/icons/Icon.jsx';
import ResourceTile from './ResourceTile.jsx';
import { resourceLabel } from '../lib/resource-label.js';
import React from 'react';
import { GlassSurface } from '../vendor/glass/components/GlassSurface.jsx';
import { GlassButton } from '../vendor/glass/components/GlassButton.jsx';
import { GlassChip } from '../vendor/glass/components/GlassChip.jsx';
import { SafeHtml } from './SourceDetails.jsx';
import { currentPosition, canFinish } from '../lib/flow.js';
export default function StepFlow({ session, pack, onMove, onStep, onResource, onScripture, onSource, onExamples, onFinish }) {
  const { step, units, unit, index, isStop } = currentPosition(session, pack.guide, pack.cues);
  const attached = (pack.cues.resourcesAt[unit.id] ?? []).map(id => pack.resources.find(r => r.content_id === id));
  const atEnd = step.id === 'S06' && index === units.length - 1;
  return <>
    <nav className="step-nav" aria-label="FIA steps">{pack.guide.steps.map((s,i) => <button key={s.id} onClick={() => onStep(s.id)} aria-label={`Step ${i+1}: ${s.title}`} aria-current={s.id === step.id ? 'step' : undefined}><span>{i+1}</span><span className="step-nav-name">{s.title}</span></button>)}</nav>
    <GlassSurface as="section" level={4} className="reading-card guide-card" aria-labelledby="step-title">
      <div className="card-topline"><p className="eyebrow">Step {pack.guide.steps.indexOf(step)+1} of 6</p><GlassChip style={{ fontSize: 13 }}>{isStop ? 'Pause together' : 'Guide'}</GlassChip></div>
      <h2 id="step-title">{step.title}</h2><p className="unit-count">Guide section {index+1} of {units.length}</p>
      <div className="current-unit" data-testid="current-unit" data-unit-id={unit.id}><SafeHtml html={unit.html}/></div>
      {isStop && <div className="discussion-state" role="status"><strong>Take your time.</strong> Pause for the source's discussion, reading or activity. Continue when you are ready.</div>}
      {unit.text.startsWith('Listen to an audio') && <p className="reading-note">Narration is not available in this build. <button className="text-button" onClick={onScripture}>Read the selected Scripture</button> together.</p>}
      {attached.length > 0 && <div className="context-resources"><h3>Explore at this point</h3>{attached.map(item => <ResourceTile key={item.content_id} item={item} contextual onOpen={onResource}/>)}</div>}
      {step.id === 'S04' && <p className="example-note">The source includes possible drama responses. Keep them hidden while the group responds. <button className="text-button" onClick={onExamples}>Show source example</button></p>}
      <div className="guide-actions"><GlassButton onClick={() => onMove(-1)} disabled={step.id === 'S01' && index === 0}>Back</GlassButton>{atEnd ? <GlassButton variant="dark" onClick={onFinish} disabled={!canFinish(session, pack.guide)}>Finish session</GlassButton> : <GlassButton variant="dark" onClick={() => onMove(1)}>Continue <Icon name="chevronRight" size={18} aria-hidden="true"/></GlassButton>}</div>
      {atEnd && !canFinish(session,pack.guide) && <p>Visit all six steps before finishing this session.</p>}
      <button className="text-button source-link" onClick={onSource}>Read complete guide and attribution</button>
    </GlassSurface>
  </>;
}
