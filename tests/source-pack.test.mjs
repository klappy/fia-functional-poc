import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, cp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { verifyPack } from '../scripts/verify-content.mjs';
import { sha256, imageInfo } from '../scripts/content-lib.mjs';
const original = resolve(import.meta.dirname, '../public');
async function withCorruption(name, mutate, expected) {
  const root = await mkdtemp(resolve(tmpdir(), 'fia-source-test-'));
  try {
    await cp(original, root, { recursive: true });
    const path = resolve(root, `content/mark-1-1-13/${name}.json`);
    const data = JSON.parse(await readFile(path, 'utf8'));
    mutate(data);
    const bytes = Buffer.from(JSON.stringify(data, null, 2) + '\n');
    await writeFile(path, bytes);
    // Update outer integrity so the semantic validator, not just transport hashing, is exercised.
    const manifestPath = resolve(root, 'content/mark-1-1-13/manifest.json');
    const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
    const file = manifest.files.find(x => x.path.endsWith(`/${name}.json`));
    const priorBytes = file.bytes; file.bytes = bytes.length; file.sha256 = sha256(bytes);
    manifest.totalBytes += bytes.length-priorBytes;
    await writeFile(manifestPath, JSON.stringify(manifest));
    await assert.rejects(verifyPack(root), expected);
  } finally { await rm(root, { recursive: true, force: true }); }
}
test('complete selected source pack verifies from actual files', async () => {
  const result = await verifyPack();
  assert.equal(result.resources, 32); assert.equal(result.units,130); assert.equal(result.assets,8);
});
test('a missing or duplicated verse fails even with a valid transport digest', async () => {
  await withCorruption('scripture', data => data[0].verses.pop(), /verse missing\/duplicate/);
  await withCorruption('scripture', data => data[0].verses[1] = data[0].verses[0], /verse missing\/duplicate/);
});
test('altered Scripture or emitted guide text fails canonical comparison', async () => {
  await withCorruption('scripture', data => data[0].verses[0].content += ' altered', /verse content changed/);
  await withCorruption('guide', data => data.steps[0].units[0].text += ' altered', /Emitted unit differs/);
});
test('a missing resource and guessed map alias fail', async () => {
  await withCorruption('resources', data => data.pop(), /Resource missing\/duplicate/);
  await withCorruption('cues', data => data.aliases['eng-c197-v1']='c999', /Map aliases changed/);
});
test('discussion stops and example boundaries cannot silently change', async () => {
  await withCorruption('cues', data => data.pause_after.pop(), /Pause set changed/);
  await withCorruption('cues', data => data.hidden_example_region.auto_narrate=true, /Hidden example boundary changed/);
});
test('missing rights and flattened map notice fail', async () => {
  await withCorruption('resources', data => delete data[0].rights, /Missing\/wrong rights/);
  await withCorruption('resources', data => data.find(x=>x.kind==='map').rights.adaptationNotice='', /Map attribution discrepancy erased/);
});
test('video bytes are not an accepted offline resource', async () => {
  await withCorruption('resources', data => data.find(x=>x.kind==='video').assetPath='/fake.mp4', /Video must be link-only/);
});
test('corrupt or missing actual media fails integrity verification', async () => {
  const root = await mkdtemp(resolve(tmpdir(),'fia-media-test-'));
  try {
    await cp(original,root,{recursive:true});
    await writeFile(resolve(root,'assets/mark-1-1-13/a112.jpg'),'not an image');
    await assert.rejects(verifyPack(root), /File integrity mismatch/);
    await rm(resolve(root,'assets/mark-1-1-13/a112.jpg'));
    await assert.rejects(verifyPack(root), /ENOENT/);
  } finally { await rm(root,{recursive:true,force:true}); }
  assert.throws(()=>imageInfo(Buffer.from('not an image')), /Unsupported or corrupt/);
});
