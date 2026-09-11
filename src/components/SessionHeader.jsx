import {Icon} from '../vendor/glass/components/icons/Icon.jsx';
import FiaBrand from './FiaBrand.jsx';
import React from 'react';
import { GlassButton } from '../vendor/glass/components/glass/GlassButton.jsx';
export default function SessionHeader({ visited,offlineState,onSettings }) {
  return <header className="session-header">
    <div className="passage-heading"><div className="identity"><FiaBrand/><div><p className="eyebrow">Familiarize · Internalize · Articulate</p><h1>Mark 1:1–13</h1><p className="subtitle">A passage to explore together</p></div></div>
    <GlassButton leading={<Icon name={offlineState.saved?'check':'cloudOff'} size={18}/>} className="passage-settings" onClick={onSettings} aria-label="Offline passage and settings">{offlineState.status==='saving'?'Saving…':offlineState.saved?'Saved offline':offlineState.updateAvailable?'Update offline passage':'Save offline'}</GlassButton></div>
    <div className="header-meta"><span>English · one shared device</span><span>{visited} of 6 steps visited</span></div>
  </header>;
}
