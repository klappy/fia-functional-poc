import useMediaImage from './useMediaImage.js';
import MediaIcon from './MediaIcon.jsx';
import {GlassButton} from '../vendor/glass/components/glass/GlassButton.jsx';
import React, { useState, useRef } from 'react';
import { ResourceCard } from '../vendor/glass/components/resources/ResourceCard.jsx';
import { Icon } from '../vendor/glass/components/icons/Icon.jsx';
import { resourceLabel } from '../lib/resource-label.js';
export default function ResourceTile({item,onOpen,contextual=false,onPlay,audioAvailable=false,player}){
 const image=useMediaImage(item.assetPath);const [failedSrc,setFailedSrc]=useState(null);const activeSrc=useRef();activeSrc.current=image.src;const failed=!!image.src&&failedSrc===image.src;const label=resourceLabel(item),visual=['map','image'].includes(item.kind);
 const type=item.kind==='video'?<span className="video-affordance"><Icon name="arrowUpRight" size={13} aria-hidden="true"/> Online video</span>:item.kind==='term'?'Key term':item.kind==='map'?'Map':'Image';
 const meta=item.displayMeta??`${item.kind==='video'?'Connection required · not downloaded':''}${failed||image.failed?' · Preview unavailable; open to retry':''}`;
 return <div ref={image.ref} className={`resource-tile resource-${item.kind}`}>
  <ResourceCard className="resource-card" type={type} title={label} meta={meta} image={visual&&!failed?image.src:undefined} onOpen={()=>onOpen(item)} actions={audioAvailable?player:undefined} style={{width:'100%',height:'100%'}} aria-label={contextual?label:`Open ${label} ${item.kind}`}/>

  {item.kind==='video'&&<span className="resource-kind-marker" aria-hidden="true"><Icon name={item.kind==='video'?'arrowUpRight':'book'} size={25}/>{item.kind==='video'&&<span>Online only</span>}</span>}
  {visual&&image.src&&<img key={image.src} className="preview-integrity-probe" hidden src={image.src} alt="" onLoad={()=>{if(activeSrc.current===image.src)setFailedSrc(null);}} onError={()=>{if(activeSrc.current===image.src)setFailedSrc(image.src);}}/>}
 </div>;
}
