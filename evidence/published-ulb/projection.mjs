export const projectionVersion='scripture-reference-v1';
export function projectReference(raw,language){
 if(!['spa','eng'].includes(language))throw Error('Unsupported speech language');
 const book=language==='spa'?'Marcos':'Mark';
 const expansion=language==='spa'?'Marcos, capítulo uno, versículos uno al trece':'Mark chapter one, verses one through thirteen';
 const projected=raw.replace(new RegExp(`\\b${book} 1:1[–—-]13\\b`,'g'),expansion);
 if(/\b\d+\s*:\s*\d+/.test(projected))throw Error('Unreviewed reference syntax');
 return projected.replace(new RegExp(`(${expansion})(?=\\s+[^.,;:!?\\s])`,'g'),'$1,');
}
