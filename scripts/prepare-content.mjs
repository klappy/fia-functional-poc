import { readFile, writeFile, mkdir, rm, rename } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { sha256, assert, guideSteps, plainText, imageInfo } from './content-lib.mjs';
import { verifyPack } from './verify-content.mjs';
const root = resolve(import.meta.dirname, '..');
const json = async path => JSON.parse(await readFile(resolve(root, path), 'utf8'));
const revisions = await json('sources/revisions.json');
const expectedResources = await json('sources/expected-resources.json');
const expectedCues = await json('sources/expected-cues.json');
const expectedScripture = await json('sources/expected-scripture.json');
const expectedAssets = await json('sources/expected-assets.json');
const observedAt = new Date().toISOString();
const cache = new Map();
async function fetchBytes(url) {
  if (!cache.has(url)) cache.set(url, (async () => {
    const response = await fetch(url, { signal: AbortSignal.timeout(60000) });
    assert(response.ok, `HTTP ${response.status}: ${url}`);
    return Buffer.from(await response.arrayBuffer());
  })());
  return cache.get(url);
}
async function source(repo, path) {
  const url = `https://raw.githubusercontent.com/BibleAquifer/${repo}/${revisions[repo]}/${path}`;
  const bytes = await fetchBytes(url);
  return { repo, commit: revisions[repo], path, url, retrievedAt: observedAt, fileSha256: sha256(bytes), data: JSON.parse(bytes) };
}
const metadata = Object.fromEntries(await Promise.all(Object.keys(revisions).map(async repo => {
  const raw = await source(repo, 'eng/metadata.json');
  const m = raw.data.resource_metadata;
  assert(m.license_info?.licenses?.length && m.license_info?.copyright, `Missing rights: ${repo}`);
  const { data, ...provenance } = raw;
  return [repo, { ...provenance, resourceTitle: m.title, metadataVersion: m.version, licenseInfo: m.license_info, adaptationNotice: m.adaptation_notice ?? '' }];
})));
const guideRaw = await source('FIATranslationGuide', 'eng/json/41.content.json');
const article = guideRaw.data.find(x => x.content_id === 'eng-mrk-p1-v2.1');
assert(article && article.version === '1.0.4', 'Selected guide missing or changed');
assert(sha256(article.content) === expectedCues.article_content_sha256, 'Guide content hash mismatch');
const { data: ignoredGuide, ...guideSource } = guideRaw;
const guide = { ...article, originalHtml: article.content, steps: guideSteps(article.content), source: { ...guideSource, contentSha256: sha256(article.content) }, rights: metadata.FIATranslationGuide };
delete guide.content;
const aliases = Object.fromEntries(['c201','c202','c197','c168'].map(id => [`eng-${id}-v1`, id]));
const resources = await Promise.all(expectedResources.map(async expected => {
  assert(expected.sha === revisions[expected.repo], 'Unbound source revision');
  const raw = await source(expected.repo, expected.path);
  assert(raw.fileSha256 === expected.full_file_sha256, `Canonical file mismatch: ${expected.repo}/${expected.path}`);
  const item = raw.data.find(x => x.content_id === expected.content_id);
  assert(item && item.version === expected.version && sha256(item.content) === expected.content_sha256, `Canonical body mismatch: ${expected.content_id}`);
  const { data, ...provenance } = raw;
  const isVideo = expected.repo === 'VideoBibleDictionary';
  const mediaUrl = item.content.match(/(?:src|href)='(https:\/\/s3\.amazonaws\.com\/cbbt-er\.public\/[^']+)'/)?.[1];
  return { ...item, resourceCode: expected.repo, source: { ...provenance, contentSha256: sha256(item.content), apiCaptureSha256: expected.api_capture_sha256, apiBodyComparison: expected.exact_content_present_in_api_wrapper ? 'exact body in wrapper' : expected.documented_api_transform }, rights: metadata[expected.repo], kind: isVideo ? 'video' : expected.repo === 'FIAImages' ? 'image' : expected.repo === 'FIAMaps' ? 'map' : 'term', mediaUrl: mediaUrl ?? null, onlineOnly: isVideo };
}));
const scripture = await Promise.all(['BereanStandardBible','unfoldingWordLiteral','unfoldingWordSimplified'].map(async repo => {
  const raw = await source(repo, 'eng/json/41.content.json');
  assert(raw.fileSha256 === expectedScripture.find(x => x.repo === repo).fileSha256, `Scripture canonical file changed: ${repo}`);
  const verses = raw.data.filter(x => Number(x.index_reference) >= 41001001 && Number(x.index_reference) <= 41001013).map(x => ({ ...x, verse: Number(x.index_reference) - 41001000, text: plainText(x.content.replace(/<sup>.*?<\/sup>/g, '')), contentSha256: sha256(x.content) }));
  const { data, ...provenance } = raw;
  return { resourceCode: repo, passage: 'MRK 1:1-13', language: 'eng', verses, source: provenance, rights: metadata[repo] };
}));
const staging = resolve(root, '.content-staging');
await rm(staging, { recursive: true, force: true });
const contentDir = resolve(staging, 'content/mark-1-1-13');
const assetsDir = resolve(staging, 'assets/mark-1-1-13');
await mkdir(contentDir, { recursive: true }); await mkdir(assetsDir, { recursive: true });
const assets = await Promise.all(resources.filter(x => ['image','map'].includes(x.kind)).map(async resource => {
  assert(resource.mediaUrl, `No media URL: ${resource.content_id}`);
  const bytes = await fetchBytes(resource.mediaUrl);
  const info = imageInfo(bytes);
  const pin = expectedAssets.find(x => x.id === resource.content_id);
  assert(pin && pin.sourceUrl === resource.mediaUrl && pin.sha256 === sha256(bytes) && pin.bytes === bytes.length && pin.mime === info.mime && pin.width === info.width && pin.height === info.height, `Observed image pin mismatch: ${resource.content_id}`);
  assert(info.width > 100 && info.height > 100, 'Image dimensions unexpectedly small');
  const ext = info.mime === 'image/png' ? 'png' : 'jpg';
  const path = `/assets/mark-1-1-13/${resource.content_id}.${ext}`;
  await writeFile(resolve(staging, path.slice(1)), bytes);
  resource.originalContent = resource.content;
  resource.content = resource.content.split(resource.mediaUrl).join(path);
  resource.assetPath = path;
  return { id: resource.content_id, resourceCode: resource.resourceCode, title: resource.title, path, sourceUrl: resource.mediaUrl, retrievedAt: observedAt, bytes: bytes.length, sha256: sha256(bytes), ...info, rights: resource.rights };
}));
for (const resource of resources.filter(x => x.kind === 'video')) {
  resource.originalContent = resource.content;
  resource.content = resource.content.replace(/<img\b[^>]*>/gi, '');
}
const cues = { ...expectedCues, aliases, resourcesAt: {
  'S02-U005':['a112','c197'], 'S02-U008':['a203','a204'], 'S03-U007':['c168'], 'S03-U019':['a112','a111'], 'S03-U021':['c201','c202'],
  'S05-U004':['eng-t60-v1'], 'S05-U006':['eng-t92-v1','eng-t23-v1'], 'S05-U008':['eng-t129-v1'], 'S05-U013':['eng-t104-v1'], 'S05-U015':['a111','eng-t38-v1','eng-t145-v1'], 'S05-U017':['eng-t87-v1','eng-t88-v1'], 'S05-U019':['eng-t9-v1','eng-t109-v1'], 'S05-U031':['eng-t125-v1'], 'S05-U035':['eng-t68-v1'], 'S05-U038':['eng-t63-v1'], 'S05-U041':['eng-t118-v1'], 'S05-U043':['eng-t4-v1']
}, adaptation: 'App-authored segmentation/cues, not original audio timecodes. Examples require explicit reveal. Original source text retained.' };
const files = [];
for (const [name, value] of Object.entries({ guide, scripture, resources, cues })) {
  const bytes = Buffer.from(JSON.stringify(value, null, 2) + '\n');
  await writeFile(resolve(contentDir, `${name}.json`), bytes);
  files.push({ path: `/content/mark-1-1-13/${name}.json`, bytes: bytes.length, sha256: sha256(bytes), mime: 'application/json' });
}
const manifest = { schemaVersion: 1, id: 'mark-1-1-13', language: 'eng', passage: 'MRK 1:1-13', preparedAt: observedAt, sourceRevisions: revisions, files, assets, totalBytes: [...files, ...assets].reduce((n, x) => n + x.bytes, 0), counts: { steps: 6, units: 130, pauses: 39, resources: 32, terms: 21, images: 4, maps: 4, videoLinks: 3, scriptureVersions: 3, versesPerVersion: 13 }, capability: 'source foundation only; not saved offline, narrated or session-tested', rightsLimit: 'FIAMaps license_info names Biblica, adaptation_notice names Word Collective. Both preserved; holder discrepancy unresolved. Inspect asset-specific notices before use.' };
await writeFile(resolve(contentDir, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
await verifyPack(staging);
// Publish only a fully verified staging tree; build must be rerun after preparation.
await mkdir(resolve(root, 'public'), { recursive: true });
for (const category of ['content', 'assets']) {
  const destination = resolve(root, 'public', category, 'mark-1-1-13');
  await mkdir(dirname(destination), { recursive: true });
  await rm(destination, { recursive: true, force: true });
  await rename(resolve(staging, category, 'mark-1-1-13'), destination);
}
await rm(staging, { recursive: true, force: true });
await writeFile(resolve(root, 'sources/metadata.json'), JSON.stringify(metadata, null, 2) + '\n');
let notice = '# Content attribution and adaptation notices\n\nSelected source content remains under its supplied terms. This private app does not relicense content. Formatting/segmentation, local media paths and cue metadata are app adaptations; applicable CC BY-SA terms remain. No theological correctness certification.\n\nFIAMaps holder discrepancy remains unresolved: license_info names Biblica; adaptation_notice names Word Collective. Both supplied fields are preserved verbatim below. Matching license strings do not constitute comprehensive legal clearance.\n';
for (const [repo, m] of Object.entries(metadata)) notice += `\n## ${repo}\n\nSource: ${m.url}\n\nSupplied license_info (verbatim JSON values):\n\n\`\`\`json\n${JSON.stringify(m.licenseInfo, null, 2)}\n\`\`\`\n\nSupplied adaptation_notice (verbatim):\n\n${m.adaptationNotice || '(No adaptation notice supplied.)'}\n`;
await writeFile(resolve(root, 'NOTICE.md'), notice);
console.log(JSON.stringify({ verified: true, counts: manifest.counts, bytes: manifest.totalBytes, assets: assets.map(({ id, width, height, bytes, sha256 }) => ({ id, width, height, bytes, sha256 })) }, null, 2));
