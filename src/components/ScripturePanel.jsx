import React from 'react';
import { GlassSurface } from '../vendor/glass/components/GlassSurface.jsx';
import SourceDetails from './SourceDetails.jsx';
export const VERSION_LABELS = { BereanStandardBible: 'Berean Standard Bible (BSB)', unfoldingWordLiteral: 'unfoldingWord Literal Text (ULT)', unfoldingWordSimplified: 'unfoldingWord Simplified Text (UST)' };
export function VersionPicker({ value, onChange }) {
  return <label htmlFor="scripture-version" className="version-picker">Scripture version<select id="scripture-version" aria-label="Scripture version" value={value} onChange={e => onChange(e.target.value)}>{Object.entries(VERSION_LABELS).map(([id,label]) => <option key={id} value={id}>{label}</option>)}</select></label>;
}
export default function ScripturePanel({ bible, onVersion }) {
  return <GlassSurface as="section" level={4} className="reading-card" aria-labelledby="scripture-title">
    <p className="eyebrow">Reference Scripture</p><h2 id="scripture-title">Mark 1:1–13</h2><VersionPicker value={bible.resourceCode} onChange={onVersion}/>
    <div className="scripture-text">{bible.verses.map(verse => <p key={verse.verse}><sup aria-label={`Verse ${verse.verse}`}>{verse.verse}</sup> {verse.text}</p>)}</div>
    <SourceDetails item={bible}/>
  </GlassSurface>;
}
