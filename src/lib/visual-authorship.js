import originals from '../../public/content/mark-1-1-13/resources.json' with {type:'json'};
import descriptions from '../../public/content/visual-narration.json' with {type:'json'};
export function visualAuthorship(record){const id=record.content_id??record.id;const original=originals.find(item=>item.content_id===id);if(!original)return null;if(!record.content_id&&(record.source?.commit!==original.source?.commit||record.source?.bodySha256!==original.source?.contentSha256))return null;return descriptions.find(item=>item.id===original.content_id)??null;}
