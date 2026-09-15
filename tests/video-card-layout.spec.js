import {test,expect} from '@playwright/test';
test.use({viewport:{width:466,height:987},serviceWorkers:'block'});
for(const language of ['English','Español'])for(const theme of ['light','dark'])test(`video title and independent actions ${language} ${theme}`,async({page})=>{
 await page.addInitScript(()=>{const A=window.Audio;window.Audio=class extends A{constructor(...args){super(...args);window.__audio=this;}};});
 await page.goto('/');
 if(language==='Español'){await page.getByRole('tab',{name:'Languages',exact:true}).click();await page.getByRole('button',{name:/Español/}).click();}
 const toggle=page.getByRole('button',{name:`Switch to ${theme} theme`});if(await toggle.count())await toggle.click();
 await page.getByRole('tab',{name:'Resources',exact:true}).click();
 const cards=page.locator('.resource-video');expect(await cards.count()).toBeGreaterThan(0);
 const card=cards.filter({hasText:language==='Español'?'Desierto o lugar deshabitado':'Wilderness'}).first();
 await expect(card).toContainText('Connection required · not downloaded');await expect(card).toBeVisible();await card.scrollIntoViewIfNeeded();
 const open=card.locator('.resource-surface-open'),title=card.locator('.resource-video-title');
 await expect(card.locator('.resource-kind-marker')).toHaveCount(0);
 const boxes=await card.evaluate(e=>{const r=s=>{const x=e.querySelector(s).getBoundingClientRect();return{x:x.x,y:x.y,right:x.right,bottom:x.bottom}};return{card:r('.resource-card'),type:r('.resource-video-type'),title:r('.resource-video-title'),meta:r('.resource-video-meta'),actions:e.querySelector('.resource-card-actions')?r('.resource-card-actions'):null}});
 expect(boxes.title.y).toBeGreaterThanOrEqual(boxes.type.bottom);expect(boxes.meta.y).toBeGreaterThanOrEqual(boxes.title.bottom);expect(boxes.title.right).toBeLessThanOrEqual(boxes.card.right);if(boxes.actions)expect(boxes.actions.y).toBeGreaterThanOrEqual(boxes.meta.bottom);
 await page.screenshot({path:`evidence/video-card-layout/${language}-${theme}.png`});
 await open.focus();await page.keyboard.press('Enter');await expect(page.getByRole('dialog')).toBeVisible();await expect(page.getByRole('dialog').locator('a[target="_blank"]').first()).toHaveAttribute('href',/^https:/);await page.keyboard.press('Escape');await expect(open).toBeFocused();
 const play=card.locator('.resource-card-actions button').first();if(await play.count()){await page.keyboard.press('Tab');await expect(play).toBeFocused();await page.keyboard.press('Enter');await expect(page.getByRole('dialog')).toHaveCount(0);await expect.poll(()=>page.evaluate(()=>window.__audio?.currentTime||0)).toBeGreaterThan(0);}
 await expect(page.locator('button button')).toHaveCount(0);
 await page.evaluate(()=>localStorage.setItem('fia.narration.v1','aquifer-only'));await page.reload();await page.getByRole('tab',{name:'Resources',exact:true}).click();await expect(card.locator('.resource-card-actions')).toHaveCount(0);await expect(title).toBeVisible();await open.click();await expect(page.getByRole('dialog')).toBeVisible();
});
