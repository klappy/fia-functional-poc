import test from 'node:test';
import assert from 'node:assert/strict';
import {selectOfflineRecordings} from '../scripts/select-offline-recordings.mjs';
const entries=[{path:'/shell.js',mime:'text/javascript'},{path:'/audio/term.mp3',mime:'audio/mpeg'},{path:'/audio/guide.mp3',mime:'audio/mpeg'},{path:'/image.png',mime:'image/png'}];
const recordings=[{language:'eng',generatedPath:'/audio/term.mp3',path:'/audio/aquifer/term.mp3',mime:'audio/mpeg',sha256:'source-a'},{language:'spa',generatedPath:'/audio/term.mp3',path:'/audio/aquifer/spanish.mp3',mime:'audio/mpeg'}];
test('fallback substitutes exact selected recording without also saving AI alternative',()=>{const saved=selectOfflineRecordings(entries,recordings,'aquifer-fallback','eng');assert.deepEqual(saved.map(e=>e.path),['/shell.js','/audio/aquifer/term.mp3','/audio/guide.mp3','/image.png']);assert.equal(saved[1].sha256,'source-a');});
test('Aquifer only excludes unmatched AI audio while preserving text/images/shell',()=>assert.deepEqual(selectOfflineRecordings(entries,recordings,'aquifer-only','eng').map(e=>e.path),['/shell.js','/audio/aquifer/term.mp3','/image.png']));
test('AI only saves no publisher alternatives; locale matching cannot cross languages',()=>{assert.deepEqual(selectOfflineRecordings(entries,recordings,'ai-only','eng'),entries);assert.equal(selectOfflineRecordings(entries,recordings,'aquifer-only','spa')[1].path,'/audio/aquifer/spanish.mp3');});
test('ambiguous exact path and invalid policy fail rather than choosing arbitrary recording',()=>{assert.throws(()=>selectOfflineRecordings(entries,[recordings[0],recordings[0]],'aquifer-only','eng'),/Ambiguous/);assert.throws(()=>selectOfflineRecordings(entries,recordings,'human','eng'),/Unknown/);});
