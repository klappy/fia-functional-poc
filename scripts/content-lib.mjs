import { createHash } from 'node:crypto';
export const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
export function assert(ok, message) { if (!ok) throw new Error(message); }
export function plainText(html) {
  const entities = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
  return html.replace(/<[^>]*>/g, '').replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (_, entity) => {
    if (entity.startsWith('#x')) return String.fromCodePoint(parseInt(entity.slice(2), 16));
    if (entity.startsWith('#')) return String.fromCodePoint(Number(entity.slice(1)));
    assert(entity in entities, `Unknown HTML entity: ${entity}`);
    return entities[entity];
  }).replace(/\s+/gu, ' ').trim();
}
export function guideSteps(html) {
  assert(!/<li>\s*<p/i.test(html), 'Nested paragraph/list structure requires reviewed parser change');
  const sections = [...html.matchAll(/<h2>(.*?)<\/h2>([\s\S]*?)(?=<h2>|$)/g)];
  return sections.map((section, index) => {
    const id = `S${String(index + 1).padStart(2, '0')}`;
    const units = [...section[2].matchAll(/<(p|li)\b[^>]*>([\s\S]*?)<\/\1>/g)].map((match, i) => {
      const text = plainText(match[2]);
      return { id: `${id}-U${String(i + 1).padStart(3, '0')}`, tag: match[1], html: match[2], text, sha256: sha256(text) };
    });
    return { id, title: plainText(section[1]), units };
  });
}
export function imageInfo(bytes) {
  if (bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) {
    return { mime: 'image/png', width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
  }
  if (bytes[0] === 0xff && bytes[1] === 0xd8) {
    let p = 2;
    while (p < bytes.length - 9) {
      assert(bytes[p] === 0xff, 'Invalid JPEG marker');
      while (bytes[p] === 0xff) p++;
      const marker = bytes[p++];
      if (marker === 0xd9 || marker === 0xda) break;
      if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue;
      const length = bytes.readUInt16BE(p);
      if ([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf].includes(marker)) {
        return { mime: 'image/jpeg', height: bytes.readUInt16BE(p + 3), width: bytes.readUInt16BE(p + 5) };
      }
      assert(length >= 2, 'Invalid JPEG segment length'); p += length;
    }
  }
  throw new Error('Unsupported or corrupt image bytes');
}
