import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { initialSession, currentPosition, moveUnit, selectStep, afterNarration, hiddenUnit, validateSession, canFinish } from '../src/lib/flow.js';
import { restoreSession, persistSession } from '../src/lib/session.js';
const guide=JSON.parse(await readFile(new URL('../public/content/mark-1-1-13/guide.json',import.meta.url)));
const cues=JSON.parse(await readFile(new URL('../public/content/mark-1-1-13/cues.json',import.meta.url)));
test('complete source-guided traversal visits all39stops and never enters hidden examples',()=>{
 let session=initialSession(guide);const stops=new Set();const seen=new Set();
 for(let n=0;n<150;n++){
  const p=currentPosition(session,guide,cues);assert(!hiddenUnit(p.unit.id,cues));seen.add(p.unit.id);
  if(p.isStop){stops.add(p.unit.id);assert.equal(afterNarration(session,guide,cues),session);}
  const next=moveUnit(session,1,guide,cues);if(next===session)break;session=next;
 }
 assert.equal(seen.size,117);assert.equal(stops.size,39);assert.deepEqual([...stops],[...cues.pause_after.map(x=>x.id)]);assert(canFinish(session,guide));
});
test('step selection and reverse navigation preserve Scripture but cannot enter examples',()=>{
 let s={...initialSession(guide),version:'unfoldingWordLiteral'};s=selectStep(s,'S05',guide,cues);s=moveUnit(s,-1,guide,cues);
 assert.equal(s.unitId,'S04-U016');assert.equal(s.version,'unfoldingWordLiteral');assert(!canFinish(s,guide));
});
test('storage validates exact source position and discards invalid or hidden units',()=>{
 const s={...initialSession(guide),stepId:'S04',unitId:'S04-U019'};assert.equal(validateSession(s,guide,cues).stepId,'S01');
 const valid=selectStep(initialSession(guide),'S03',guide,cues);const storage={getItem:()=>JSON.stringify(valid),setItem:()=>{throw new Error('quota');}};
 assert.equal(restoreSession(storage,guide,cues).session.stepId,'S03');assert.equal(persistSession(storage,valid),false);
 assert.equal(restoreSession({getItem:()=>'{broken'},guide,cues).storageError,true);
});
