import React,{useLayoutEffect,useRef} from 'react';

// Both language shells reserve the measured nav + player stack, including
// wrapping labels. The CSS adds the fixed bottom offset and safe-area once.
export default function FloatingDock({children}){
 const ref=useRef(null);
 useLayoutEffect(()=>{
  const dock=ref.current,nav=dock.querySelector('.floating-tabs'),shell=dock.closest('.app-shell');
  const update=()=>{shell.style.setProperty('--actual-nav-width',`${nav.getBoundingClientRect().width}px`);shell.style.setProperty('--floating-height',`${dock.getBoundingClientRect().height}px`);};
  const observer=new ResizeObserver(update);observer.observe(dock);observer.observe(nav);update();
  return()=>observer.disconnect();
 },[]);
 return <div className="floating-dock" ref={ref}>{children}</div>;
}
