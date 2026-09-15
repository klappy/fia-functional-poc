import React from 'react';
export function ResourceCard({type,title,meta,image,onOpen,actions,layout,style,...rest}){
  if(layout==='video')return <div {...rest} style={{position:'relative',borderRadius:'var(--r-lg)',overflow:'hidden',background:'var(--glass-fill-3)',border:'var(--border-glass)',boxShadow:'var(--shadow-card), var(--inner-top)',color:'inherit',...style}}>
    <button className="resource-surface-open" onClick={onOpen} aria-label={rest['aria-label']||`Open ${title}`}>
      <span className="resource-video-type">{type}</span>
      <span className="resource-video-title">{title}</span>
      {meta&&<span className="resource-video-meta">{meta}</span>}
    </button>
    {actions&&<div className="resource-card-actions">{actions}</div>}
  </div>;
  if(actions)return <div {...rest} style={{position:'relative',borderRadius:'var(--r-lg)',overflow:'hidden',background:'var(--glass-fill-3)',border:'var(--border-glass)',boxShadow:'var(--shadow-card), var(--inner-top)',color:'inherit',...style}}><button className="resource-surface-open" onClick={onOpen} aria-label={rest['aria-label']||`Open ${title}`} style={{position:'absolute',zIndex:1,inset:0,width:'100%',height:'100%',border:0,padding:0,background:'transparent',cursor:'pointer',borderRadius:'inherit'}}/>{image&&<div className="resource-media-open" style={{display:'block',width:'100%',border:0,padding:0,position:'relative',height:90,background:`url(${image}) center/cover, var(--glass-fill-2)`,cursor:'pointer'}}><span style={{position:'absolute',left:8,top:8,padding:'4px 8px',borderRadius:'var(--r-pill)',background:'var(--material-floating)',font:'var(--type-overline)',letterSpacing:'var(--ls-overline)',textTransform:'uppercase',color:'var(--text-title)'}}>{type}</span></div>}<div style={{padding:'12px',display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:8}}><div style={{border:0,background:'transparent',textAlign:'left',color:'var(--text-title)',padding:0,minWidth:0,font:'var(--type-label)',cursor:'pointer'}}>{!image&&<small style={{display:'block',font:'var(--type-overline)',color:'var(--text-muted)',marginBottom:6}}>{type}</small>}{title}</div><div className="resource-card-actions" style={{position:'relative',zIndex:2}}>{actions}</div></div></div>;
  return React.createElement('button',{onClick:onOpen,style:{display:'block',textAlign:'start',padding:0,cursor:onOpen?'pointer':'default',borderRadius:'var(--r-lg)',overflow:'hidden',background:'var(--glass-fill-3)',border:'var(--border-glass)',boxShadow:'var(--shadow-card), var(--inner-top)',color:'inherit',...style},...rest},
    React.createElement('div',{style:{position:'relative',height:90,background:image?`url(${image}) center/cover, var(--glass-fill-2)`:'var(--glass-fill-2)'}},
      type?React.createElement('span',{style:{position:'absolute',left:8,top:8,padding:'4px 8px',borderRadius:'var(--r-pill)',background:'rgba(255,255,255,.85)',font:'var(--type-overline)',letterSpacing:'var(--ls-overline)',textTransform:'uppercase',color:'var(--ink-900)'}},type):null),
    React.createElement('div',{style:{padding:'10px 12px 12px'}},
      React.createElement('div',{style:{font:'var(--fw-semibold) 13px/1.2 var(--font-core)',color:'var(--text-title)'}},title),
      meta?React.createElement('div',{style:{marginTop:3,font:'var(--type-caption)',color:'var(--text-muted)'}},meta):null));
}
