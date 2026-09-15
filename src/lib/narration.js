import catalog from '../data/aquifer-audio.json' with {type:'json'};
import {variantMatchesCheckpoint} from './media-variants.js';
export const NARRATION_KEY='fia.narration.v1';
export const narrationModes=['aquifer-fallback','aquifer-only','ai-only'];
export function storedNarrationPreference(storage){try{storage??=globalThis.localStorage;const value=storage?.getItem(NARRATION_KEY);return narrationModes.includes(value)?value:'aquifer-fallback';}catch{return'aquifer-fallback';}}
export function selectNarration(entry,preference=storedNarrationPreference()) {if(!entry)return null;const source=catalog.entries.find(e=>e.id===entry.id&&e.sourceSha256===entry.sourceSha256);return preference==='ai-only'?entry:source??(preference==='aquifer-only'?null:entry);}
export function checkpointRecording(entry,checkpoint){return checkpoint?.recordingSource==='aquifer'?catalog.entries.find(e=>e.id===entry.id&&e.sourceSha256===entry.sourceSha256):entry;}
export function narrationMatchesCheckpoint(entry,checkpoint){const recording=checkpointRecording(entry,checkpoint);return !!recording&&variantMatchesCheckpoint(recording,checkpoint);}
export const aquiferAudioCatalog=catalog;
