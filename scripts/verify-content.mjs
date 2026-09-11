import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { assert, sha256, guideSteps, plainText, imageInfo } from './content-lib.mjs';
const repoRoot = resolve(import.meta.dirname, '..');
const readJson = async path => JSON.parse(await readFile(path, 'utf8'));
export async function verifyPack(publicRoot = resolve(repoRoot, 'public')) {
  const dir = resolve(publicRoot, 'content/mark-1-1-13');
  const [manifest, guide, scripture, resources, cues, expectedCues, expectedResources, expectedScripture, revisions] = await Promise.all([
    ...['manifest','guide','scripture','resources','cues'].map(name => readJson(resolve(dir, `${name}.json`))),
    ...['expected-cues','expected-resources','expected-scripture','revisions'].map(name => readJson(resolve(repoRoot, `sources/${name}.json`)))
  ]);
  assert(JSON.stringify(manifest.sourceRevisions) === JSON.stringify(revisions), 'Manifest source revision mismatch');
  assert(manifest.files.length === 4 && manifest.assets.length === 8, 'Required file/asset count mismatch');
  const paths = [...manifest.files, ...manifest.assets].map(x => x.path);
  assert(new Set(paths).size === paths.length, 'Duplicate pack path');
  for (const item of [...manifest.files, ...manifest.assets]) {
    assert(/^\/(content|assets)\/mark-1-1-13\/[\w.-]+$/.test(item.path), 'Unsafe pack path');
    const bytes = await readFile(resolve(publicRoot, item.path.slice(1)));
    assert(bytes.length === item.bytes && sha256(bytes) === item.sha256, `File integrity mismatch: ${item.path}`);
    if (item.path.startsWith('/assets/')) {
      const info = imageInfo(bytes);
      assert(info.mime === item.mime && info.width === item.width && info.height === item.height, 'Image type/dimensions mismatch');
    }
  }
  assert(manifest.totalBytes === [...manifest.files, ...manifest.assets].reduce((n,x) => n+x.bytes, 0), 'Pack byte total mismatch');
  assert(sha256(guide.originalHtml) === expectedCues.article_content_sha256, 'Guide source content changed');
  assert(guide.source.commit === revisions.FIATranslationGuide && guide.version === '1.0.4' && guide.review_level === 'None', 'Guide identity mismatch');
  const actualUnits = guideSteps(guide.originalHtml).flatMap(x => x.units);
  const emittedUnits = guide.steps.flatMap(x => x.units);
  assert(guide.steps.length === 6 && actualUnits.length === 130 && emittedUnits.length === 130, 'Guide section/unit count mismatch');
  for (let i=0; i<actualUnits.length; i++) {
    const actual = actualUnits[i], emitted = emittedUnits[i], expected = expectedCues.units[i];
    assert(actual.id === expected.id && actual.sha256 === expected.sha256 && actual.tag === expected.tag, 'Guide cue/source hash mismatch');
    assert(JSON.stringify(actual) === JSON.stringify(emitted), `Emitted unit differs: ${actual.id}`);
  }
  assert(JSON.stringify(cues.pause_after) === JSON.stringify(expectedCues.pause_after) && cues.pause_after.length === 39, 'Pause set changed');
  assert(JSON.stringify(cues.hidden_example_region) === JSON.stringify(expectedCues.hidden_example_region), 'Hidden example boundary changed');
  assert(cues.hidden_example_region.auto_narrate === false, 'Example narration must remain disabled');
  assert(resources.length === 32 && new Set(resources.map(x => `${x.resourceCode}/${x.content_id}`)).size === 32, 'Resource missing/duplicate');
  assert(resources.filter(x => x.kind === 'term').length === 21, 'Term count mismatch');
  for (const expected of expectedResources) {
    const item = resources.find(x => x.resourceCode === expected.repo && x.content_id === expected.content_id);
    assert(item && item.version === expected.version && item.source.commit === expected.sha, `Resource identity mismatch: ${expected.content_id}`);
    assert(sha256(item.originalContent ?? item.content) === expected.content_sha256, `Resource source body mismatch: ${expected.content_id}`);
    assert(item.source.fileSha256 === expected.full_file_sha256, 'Resource source-file mismatch');
    if (item.kind === 'video') assert(item.onlineOnly && !item.assetPath && !/<img\b/i.test(item.content), 'Video must be link-only');
    if (['map','image'].includes(item.kind)) {
      const asset = manifest.assets.find(x => x.id === item.content_id);
      assert(asset && item.assetPath === asset.path && item.content === item.originalContent.split(item.mediaUrl).join(asset.path), 'Image local-path mapping mismatch');
    }
  }
  const expectedAliases = Object.fromEntries(['c201','c202','c197','c168'].map(id => [`eng-${id}-v1`,id]));
  assert(JSON.stringify(cues.aliases) === JSON.stringify(expectedAliases), 'Map aliases changed');
  assert(guide.associations.resource.length === 32, 'Guide association count mismatch');
  for (const association of guide.associations.resource) {
    const id = cues.aliases[association.content_id] ?? association.content_id;
    assert(resources.some(x => x.content_id === id && x.resourceCode === association.resource_code), 'Unresolved guide association');
  }
  for (const [unit, ids] of Object.entries(cues.resourcesAt)) {
    assert(cues.pause_after.some(x => x.id === unit), 'Resource cue must be a pause');
    assert(ids.every(id => resources.some(x => x.content_id === id)), 'Resource cue target missing');
  }
  assert(scripture.length === 3 && new Set(scripture.map(x => x.resourceCode)).size === 3, 'Scripture version missing/duplicate');
  for (const expected of expectedScripture) {
    const bible = scripture.find(x => x.resourceCode === expected.repo);
    assert(bible && bible.source.commit === revisions[expected.repo] && bible.source.fileSha256 === expected.fileSha256, 'Scripture provenance mismatch');
    assert(bible.verses.length === 13 && new Set(bible.verses.map(x => x.verse)).size === 13, 'Scripture verse missing/duplicate');
    for (let i=0;i<13;i++) {
      const verse = bible.verses[i], original = expected.verses[i];
      assert(verse.verse === i+1 && verse.content_id === original.content_id && verse.index_reference === original.index_reference && verse.version === original.version, 'Scripture verse identity mismatch');
      assert(sha256(verse.content) === original.contentSha256 && verse.contentSha256 === original.contentSha256, 'Scripture verse content changed');
      assert(verse.text === plainText(verse.content.replace(/<sup>.*?<\/sup>/g, '')), 'Scripture plain text differs');
    }
  }
  for (const item of [guide, ...resources, ...scripture]) {
    const rights = item.rights;
    assert(rights?.licenseInfo?.licenses?.length && rights?.licenseInfo?.copyright && rights.commit === item.source.commit, 'Missing/wrong rights provenance');
    if (item.resourceCode === 'FIAMaps') {
      assert(rights.licenseInfo.copyright.holder.name === 'Biblica' && rights.adaptationNotice.includes('Word Collective'), 'Map attribution discrepancy erased');
    }
  }
  return { pass: true, units: actualUnits.length, pauses: cues.pause_after.length, resources: resources.length, assets: manifest.assets.length, bytes: manifest.totalBytes };
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log(JSON.stringify(await verifyPack(), null, 2));
}
