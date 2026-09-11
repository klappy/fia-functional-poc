const BASE = '/content/mark-1-1-13/';
const EXPECTED_FILES = ['guide.json', 'scripture.json', 'resources.json', 'cues.json'];
export async function loadContent(signal) {
  const manifestResponse = await fetch(BASE + 'manifest.json', { signal });
  if (!manifestResponse.ok) throw new Error('The passage manifest could not be loaded.');
  const manifest = await manifestResponse.json();
  if (manifest.id !== 'mark-1-1-13' || !Array.isArray(manifest.files) || manifest.files.length !== 4) throw new Error('The passage manifest is not the expected source pack.');
  const result = { manifest };
  await Promise.all(EXPECTED_FILES.map(async name => {
    const path = BASE + name;
    const expected = manifest.files.find(x => x.path === path);
    if (!expected) throw new Error(`The source pack is missing ${name}.`);
    const response = await fetch(path, { signal });
    if (!response.ok) throw new Error('A required passage source could not be loaded.');
    const bytes = await response.arrayBuffer();
    const digest = [...new Uint8Array(await crypto.subtle.digest('SHA-256', bytes))].map(x => x.toString(16).padStart(2, '0')).join('');
    if (bytes.byteLength !== expected.bytes || digest !== expected.sha256) throw new Error('A passage source failed its integrity check.');
    result[name.replace('.json','')] = JSON.parse(new TextDecoder().decode(bytes));
  }));
  if (result.guide.steps?.length !== 6 || result.resources.length !== 32 || result.scripture.length !== 3 || result.cues.pause_after?.length !== 39) throw new Error('The selected passage is incomplete.');
  return result;
}
