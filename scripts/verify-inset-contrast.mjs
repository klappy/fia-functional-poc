import{chromium}from'playwright';import fs from'node:fs';
const b=await chromium.launch(),p=await b.newPage({serviceWorkers:'block'}),rows=[];
for(const width of[319,466])for(const theme of['light','dark']){
await p.setViewportSize({width,height:987});await p.goto('http://127.0.0.1:4761');await p.evaluate(()=>localStorage.clear());await p.reload();if(theme==='dark')await p.getByRole('button',{name:'Switch to dark theme'}).click();
await p.getByRole('tab',{name:'Scripture',exact:true}).click();
for(const version of['BSB','ULT','UST']){
await p.getByRole('radio',{name:version,exact:true}).click();await p.locator('.scripture-scroll').evaluate(e=>e.scrollTop=(e.scrollHeight-e.clientHeight)*.25);
const side=p.locator('.inset-glass .compact-transport>button');const buttons=await side.evaluateAll(es=>es.map(e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect();return{label:e.getAttribute('aria-label'),disabled:e.disabled,width:r.width,height:r.height,background:s.backgroundColor,color:s.color,opacity:s.opacity}}));if(buttons.some(x=>x.width<44||x.height<44))throw Error('44px');for(const x of[buttons[0],buttons[2]])if(x.background!=='rgb(255, 255, 255)'||x.color!=='rgb(14, 20, 32)')throw Error(JSON.stringify(x));
await side.nth(buttons[0].disabled?2:0).focus();await p.keyboard.press('Tab');await p.keyboard.press('Shift+Tab');if(!await side.nth(buttons[0].disabled?2:0).evaluate(e=>e===document.activeElement&&getComputedStyle(e).outlineStyle!=='none'))throw Error('focus');
await p.screenshot({path:`evidence/inset-glass/contrast/${width}-${theme}-${version}.png`});rows.push({width,theme,version,buttons});}
await p.getByRole('tab',{name:'Guide',exact:true}).click();await p.getByLabel('Guide step').selectOption('S05');await p.getByRole('button',{name:/Browse/}).click();await p.locator('[data-unit-id="S05-U029"]').click();await p.locator('.source-scroll').evaluate(e=>e.scrollTop=(e.scrollHeight-e.clientHeight)*.25);await p.screenshot({path:`evidence/inset-glass/contrast/${width}-${theme}-long-guide.png`});}
fs.writeFileSync('evidence/inset-glass/contrast/geometry.json',JSON.stringify(rows,null,2));console.log('PASS12Scripturestates solidtokens/44px/focus;4longGuidecaptures. Visual contrast requires independent screenshot review.');await b.close();
