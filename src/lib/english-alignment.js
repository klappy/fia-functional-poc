import{sourceHighlight}from'./source-highlight.js';
export function validAlignment(data,descriptor,bible){
 if(!data||data.schemaVersion!==1||data.id!==descriptor.id||data.audioSha256!==descriptor.audioSha256||data.sourceSha256!==descriptor.sourceSha256||!Number.isFinite(data.duration)||data.duration<=0||data.verses?.length!==bible.verses.length)return false;
 let last=0;
 return data.verses.every((v,i)=>{const source=bible.verses[i];if(v.sourceId!==source.content_id||v.text!==source.text||v.sourceHtmlSha256!==source.contentSha256||!Number.isFinite(v.start)||!Number.isFinite(v.end)||v.start<last||v.end<=v.start||v.end>data.duration||!Array.isArray(v.words)||!v.words.length)return false;last=v.end;let char=0,time=v.start;const covered=v.words.every(w=>{const ok=Number.isInteger(w.from)&&Number.isInteger(w.to)&&w.from>=char&&!v.text.slice(char,w.from).trim()&&w.to>w.from&&w.to<=v.text.length&&v.text.slice(w.from,w.to).trim()&&Number.isFinite(w.start)&&Number.isFinite(w.end)&&w.start>=time&&w.end>w.start&&w.end<=v.end;char=w.to;time=w.end;return !!ok;});return covered&&!v.text.slice(char).trim();});
}
export function alignmentPosition(data,state){
 const status=sourceHighlight(state,{domain:'scripture',ids:[data.id]});if(!status||!Number.isFinite(state.elapsed))return null;
 const verse=data.verses.find(v=>v.start<=state.elapsed&&state.elapsed<v.end);if(!verse)return null;
 return{status,verse:verse.sourceId,word:verse.words.findIndex(w=>w.start<=state.elapsed&&state.elapsed<w.end)};
}
