import {test,expect} from '@playwright/test';
import fs from 'node:fs';
for(const width of [466,320])for(const language of ['eng','spa'])for(const player of [true,false]){
 test(`last resource clears dock ${width} ${language} player=${player}`,async({page})=>{
  await page.setViewportSize({width,height:987});await page.addInitScript(()=>localStorage.setItem('fia.media-quality.v1','original'));await page.goto('/');
  if(language==='spa'){await page.getByRole('tab',{name:'Languages',exact:true}).click();await page.getByRole('button',{name:/^Español/}).click();await expect(page.locator('[data-content-language=spa]')).toBeVisible();}
  await page.getByRole('tab',{name:'Resources',exact:true}).click();
  await expect(page.locator('.playback-dock')).toBeVisible();
  // Explicit absent-player layout fixture; production Resources keeps idle controls.
  if(!player)await page.locator('.playback-dock').evaluate(el=>el.style.display='none');
  await expect.poll(()=>page.locator('.app-shell').evaluate(el=>parseFloat(getComputedStyle(el).getPropertyValue('--floating-height')))).toBeGreaterThan(0);
  await page.evaluate(()=>document.fonts.ready);
  await expect.poll(()=>page.locator('#panel-resources .resource-map,#panel-resources .resource-image').evaluateAll(tiles=>tiles.length>0&&tiles.every(tile=>{const i=tile.querySelector('.preview-integrity-probe');return i?.complete&&i.naturalWidth>0;})),{timeout:20000}).toBe(true);
  const last=page.locator('#panel-resources .resource-tile').last();await expect(last).toBeVisible();
  await page.evaluate(()=>window.scrollTo(0,document.documentElement.scrollHeight));
  await expect.poll(()=>last.evaluate(el=>el.getBoundingClientRect().bottom<=document.querySelector('.floating-dock').getBoundingClientRect().top-20)).toBe(true);
  const geometry=await last.evaluate(el=>{const r=el.getBoundingClientRect(),dock=document.querySelector('.floating-dock').getBoundingClientRect(),button=el.querySelector('button[aria-label^="Play"]')??el.querySelector('button'),b=button.getBoundingClientRect();return{last:{top:r.top,bottom:r.bottom},dock:{top:dock.top,height:dock.height},button:{label:button.getAttribute('aria-label'),top:b.top,bottom:b.bottom,hit:button.contains(document.elementFromPoint(b.x+b.width/2,b.y+b.height/2))},scrollY,scrollHeight:document.documentElement.scrollHeight,viewport:innerHeight,horizontalOverflow:document.documentElement.scrollWidth>innerWidth};});
  expect(geometry.button.hit).toBe(true);expect(geometry.button.bottom).toBeLessThan(geometry.dock.top);expect(geometry.horizontalOverflow).toBe(false);expect(Math.abs(geometry.scrollY+geometry.viewport-geometry.scrollHeight)).toBeLessThanOrEqual(1);
  fs.mkdirSync('evidence/resource-clearance',{recursive:true});fs.writeFileSync(`evidence/resource-clearance/${width}-${language}-${player?'player':'nav'}.json`,JSON.stringify(geometry,null,2));await page.screenshot({animations:'disabled',path:`evidence/resource-clearance/${width}-${language}-${player?'player':'nav'}.png`});
 });
}
