import {validAlignment,alignmentPosition} from './english-alignment.js';
export function validSpanishAlignment(data,descriptor,verse,text){
 return validAlignment(data,descriptor,{verses:[{content_id:descriptor.ownerId,text,contentSha256:verse.bodySha256}]})&&data.verses[0].sourceHtmlSha256===descriptor.sourceHtmlSha256;
}
export function spanishAlignmentPosition(data,descriptor,state){
 if(state?.sourceId!==descriptor.id||state?.sourceOwnerId!==descriptor.ownerId||state?.outputSha256!==descriptor.audioSha256)return null;
 return alignmentPosition({...data,id:descriptor.ownerId},state);
}
