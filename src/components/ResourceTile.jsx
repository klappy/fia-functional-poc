import React, { useState } from 'react';
import { resourceLabel } from '../lib/resource-label.js';
// Adapted from the pinned shared components/resources/ResourceCard.jsx.
// Retains media band/type/title/provenance structure; semantic images add load/error evidence.
export default function ResourceTile({ item, onOpen, contextual = false }) {
  const [loaded,setLoaded]=useState(false);const [failed,setFailed]=useState(false);
  const visual=['map','image'].includes(item.kind),label=resourceLabel(item);
  const licenses=item.rights.licenseInfo.licenses.map(x=>x.eng.name).join(' · ');
  const type=item.kind==='video'?'Online video':item.kind==='term'?'Key term':item.kind==='map'?'Map':'Image';
  return <button className={`resource-card resource-tile resource-${item.kind}`} onClick={()=>onOpen(item)} aria-label={contextual ? label : `Open ${label} ${item.kind}`}>
    <span className="resource-media">
      {visual && !failed && <img src={item.assetPath} alt={`${label} preview`} onLoad={()=>setLoaded(true)} onError={()=>setFailed(true)}/>}
      {visual && !loaded && !failed && <span className="media-status" role="status">Loading preview…</span>}
      {failed && <span className="media-status">Preview unavailable · open resource to retry</span>}
      {item.kind==='video' && <span className="video-affordance"><span aria-hidden="true">↗</span><span>Open online video</span></span>}
      {item.kind==='term' && <span className="term-affordance" aria-hidden="true">Aa</span>}
      <span className="resource-type">{type}</span>
    </span>
    <span className="resource-copy"><span className="resource-title">{label}</span><span className="resource-provenance">{item.resourceCode} · {item.content_id} · {licenses}</span>{item.kind==='video' && <span className="resource-availability">Connection required · not downloaded</span>}{item.resourceCode==='FIAMaps'&&<span className="resource-availability">Supplied holder notices differ; see attribution.</span>}</span>
  </button>;
}
