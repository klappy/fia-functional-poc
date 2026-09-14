import SourceIcon from './SourceIcon.jsx';
import {GlassIconButton}from'../vendor/glass/components/glass/GlassIconButton.jsx';
import VersionSegments from './VersionSegments.jsx';
import React from 'react';
import { GlassSelect } from '../vendor/glass/components/forms/GlassSelect.jsx';
import { ScripturePassage } from '../vendor/glass/components/scripture/ScripturePassage.jsx';
import SourceDetails from './SourceDetails.jsx';
export const VERSION_LABELS={BereanStandardBible:'Berean Standard Bible (BSB)',unfoldingWordLiteral:'unfoldingWord Literal Text (ULT)',unfoldingWordSimplified:'unfoldingWord Simplified Text (UST)'};
export function VersionPicker({value,onChange}){return <GlassSelect label="Scripture version" aria-label="Scripture version" value={value} onChange={onChange} options={Object.entries(VERSION_LABELS).map(([value,label])=>({value,label}))} style={{marginBottom:18}}/>;}
export default function ScripturePanel({bible,onVersion,player,transport,onSource,versions,reference="Mark 1:1–13",lang="en",verseAdapter,sourceContent}){return <section aria-label="Reference Scripture"><VersionSegments value={bible.resourceCode} onChange={onVersion} options={versions}/><ScripturePassage key={bible.resourceCode} footer={transport} headerAction={<div className="card-players"><GlassIconButton size={44} label="Scripture source and attribution" onClick={onSource}><SourceIcon size={18}/></GlassIconButton>{player}</div>} className="scripture-text" reference={reference} version={versions?.find(v=>v.value===bible.resourceCode)?.label??(bible.resourceCode==='BereanStandardBible'?'BSB':bible.resourceCode==='unfoldingWordLiteral'?'ULT':'UST')} source={sourceContent??<SourceDetails item={bible}/>} script="latin" lang={lang} verses={verseAdapter?verseAdapter(bible.verses):bible.verses.map(v=>({n:v.verse,text:v.text}))}/></section>;}
