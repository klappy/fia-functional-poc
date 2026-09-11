import FiaBrand from './FiaBrand.jsx';
import React from 'react';
import { GlassButton } from '../vendor/glass/components/GlassButton.jsx';
export default function SessionHeader({ view, setView, visited }) {
  return <header className="session-header">
    <div className="identity"><FiaBrand/><div><p className="eyebrow">Familiarize · Internalize · Articulate</p><h1>Mark 1:1–13</h1><p className="subtitle">A passage to explore together</p></div></div>
    <div className="header-meta"><span>English · one shared device</span><span>{visited} of 6 steps visited</span></div>
    <nav className="primary-nav" aria-label="Passage views">{[['guide','Guide'],['scripture','Scripture'],['resources','Resources']].map(([id,label]) => <GlassButton key={id} variant={view === id ? 'dark' : 'glass'} aria-current={view === id ? 'page' : undefined} onClick={() => setView(id)}>{label}</GlassButton>)}</nav>
  </header>;
}
