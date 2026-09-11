import React from 'react';
import DOMPurify from 'dompurify';
export function SafeHtml({ html, className = '' }) {
  const safe = DOMPurify.sanitize(html ?? '', { ALLOWED_TAGS: ['p','li','ul','ol','h2','h3','h4','b','strong','em','i','sup','br','blockquote','cite','a'], ALLOWED_ATTR: ['href','title'], ALLOW_DATA_ATTR: false });
  const fragment = document.createElement('template'); fragment.innerHTML = safe;
  // Source glossary fragment identifiers do not exist in this bounded UI. Preserve their text without a broken link.
  fragment.content.querySelectorAll('a[href^="#"]').forEach(link => link.replaceWith(...link.childNodes));
  return <div className={`source-html ${className}`} dangerouslySetInnerHTML={{ __html: fragment.innerHTML }} />;
}
export default function SourceDetails({ item }) {
  const rights = item.rights;
  return <details className="source-details"><summary>Source and attribution</summary>
    <p>{item.title ?? item.resourceCode} · {item.language ?? 'eng'} · version {item.version ?? item.verses?.[0]?.version} · review {item.review_level ?? item.verses?.[0]?.review_level}</p>
    <p><a href={item.source.url} target="_blank" rel="noreferrer">View pinned source (online)</a></p>
    <p>© {rights.licenseInfo.copyright.dates} {rights.licenseInfo.copyright.holder.name}</p>
    {rights.licenseInfo.licenses.map((license, i) => <p key={i}><a href={license.eng.url} target="_blank" rel="noreferrer">{license.eng.name}</a></p>)}
    {rights.adaptationNotice && <SafeHtml html={rights.adaptationNotice} />}
    {item.resourceCode === 'FIAMaps' && <p>Supplied notices name different holders. Both are preserved; the discrepancy is unresolved.</p>}
    <p>Formatting and source segmentation adapted for this PoC. Source meaning retained; no independent correctness certification.</p>
  </details>;
}
