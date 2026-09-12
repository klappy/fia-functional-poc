import {Icon} from '../vendor/glass/components/icons/Icon.jsx';
import FiaBrand from './FiaBrand.jsx';
import React,{useState} from 'react';
import {GlassIconButton} from '../vendor/glass/components/glass/GlassIconButton.jsx';
import { GlassButton } from '../vendor/glass/components/glass/GlassButton.jsx';
export default function SessionHeader({ visited,offlineState,onSettings }) {
  const[dark,setDark]=useState(()=>document.documentElement.dataset.theme==='dark');
  const toggle=()=>{const next=!dark;document.documentElement.dataset.theme=next?'dark':'light';setDark(next);};
  return <header className="session-header"><div className="passage-heading"><FiaBrand/><h1>Mark 1:1–13</h1><GlassButton leading={<Icon name={offlineState.saved?'check':'cloudOff'} size={18}/>} className="passage-settings" onClick={onSettings} aria-label="Offline passage and settings">{offlineState.status==='saving'?'Saving…':offlineState.saved?'Saved':offlineState.updateAvailable?'Update':'Save'}</GlassButton><GlassIconButton size={44} label={dark?'Switch to light theme':'Switch to dark theme'} aria-pressed={dark} onClick={toggle}><span aria-hidden="true"><Icon name={dark?'sun':'moon'}/></span></GlassIconButton></div></header>;
}
