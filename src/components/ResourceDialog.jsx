import { resourceLabel } from '../lib/resource-label.js';
import React, { useEffect, useRef, useState } from 'react';
import { GlassButton } from '../vendor/glass/components/GlassButton.jsx';
import SourceDetails, { SafeHtml } from './SourceDetails.jsx';
export default function ResourceDialog({ selection, onClose }) {
  const dialog = useRef(null); const [imageError, setImageError] = useState(false); const [imageLoaded, setImageLoaded] = useState(false);
  useEffect(() => { const opener = document.activeElement; const element = dialog.current; element.showModal(); return () => { element.close(); if (opener?.isConnected) opener.focus(); }; }, []);
  const item = selection.item;
  return <dialog ref={dialog} className="resource-dialog" aria-labelledby="dialog-title" onCancel={e => { e.preventDefault(); onClose(); }}>
    <div className="dialog-header"><h2 id="dialog-title">{selection.title ?? (item && resourceLabel(item))}</h2><GlassButton autoFocus variant="quiet" onClick={onClose} aria-label="Close resource">Close</GlassButton></div>
    <div className="dialog-body">
      {selection.children}
      {item && <>
        {['map','image'].includes(item.kind) && <>{!imageLoaded && !imageError && <p role="status">Loading image…</p>}{imageError ? <p role="alert">This image could not be displayed. Close and try again.</p> : <a href={item.assetPath} target="_blank" rel="noreferrer" className="image-open"><img src={item.assetPath} alt={resourceLabel(item)} onLoad={() => setImageLoaded(true)} onError={() => setImageError(true)}/><span>Open full-size image to inspect labels</span></a>}</>}
        {item.kind === 'video' ? <><p>This video opens online. It is not downloaded with the passage.</p><a className="external-video" href={item.mediaUrl} target="_blank" rel="noreferrer">Open {item.title} video (connection required)</a></> : item.kind === 'term' ? <><SafeHtml html={item.content}/><p className="reading-note">Cross-reference text is preserved. Open available terms from this passage’s Resources.</p></> : null}
        <SourceDetails item={item}/>
      </>}
    </div>
  </dialog>;
}
