import React from 'react';
import { GlassSelect } from '../vendor/glass/components/forms/GlassSelect.jsx';
import { ScripturePassage } from '../vendor/glass/components/scripture/ScripturePassage.jsx';
import SourceDetails from './SourceDetails.jsx';
export const VERSION_LABELS={BereanStandardBible:'Berean Standard Bible (BSB)',unfoldingWordLiteral:'unfoldingWord Literal Text (ULT)',unfoldingWordSimplified:'unfoldingWord Simplified Text (UST)'};
export function VersionPicker({value,onChange}){return <GlassSelect label="Scripture version" aria-label="Scripture version" value={value} onChange={onChange} options={Object.entries(VERSION_LABELS).map(([value,label])=>({value,label}))} style={{marginBottom:18}}/>;}
export default function ScripturePanel({bible,onVersion}){return <section aria-label="Reference Scripture"><VersionPicker value={bible.resourceCode} onChange={onVersion}/><ScripturePassage className="scripture-text" reference="Mark 1:1–13" version={bible.resourceCode==='BereanStandardBible'?'BSB':bible.resourceCode==='unfoldingWordLiteral'?'ULT':'UST'} source={bible.resourceCode} script="latin" lang="en" verses={bible.verses.map(v=>({n:v.verse,text:v.text}))}/><SourceDetails item={bible}/></section>;}
