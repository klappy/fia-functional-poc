import {test,expect} from '@playwright/test';
for(const width of [320,466])for(const language of ['eng','spa'])test(`Save decisions precede collapsed help ${width} ${language}`,async({page})=>{
 await page.setViewportSize({width,height:987});await page.goto('/');
 if(language==='spa'){await page.getByRole('tab',{name:'Languages',exact:true}).click();await page.getByRole('button',{name:/^Español/}).click();await expect(page.locator('[data-content-language=spa]')).toBeVisible();}
 await page.getByRole('button',{name:'Offline passage and settings'}).click();const dialog=page.getByRole('dialog');await expect(dialog.getByRole('heading',{name:'Offline passage',exact:true})).toBeVisible();
 for(const name of ['Narration','Media quality'])await expect(dialog.getByRole('combobox',{name,exact:true})).toBeVisible();
 const save=dialog.getByRole('button',{name:'Save for offline',exact:true});await expect(save).toBeVisible();await expect(save).toBeEnabled();expect(await save.evaluate(el=>{const b=el.getBoundingClientRect();return b.top>=0&&b.bottom<=innerHeight&&el.contains(document.elementFromPoint(b.x+b.width/2,b.y+b.height/2));})).toBe(true);
 await expect(dialog.locator('.offline-status')).toContainText('Not saved');await expect(dialog.getByText(/Medium .* MB · Original/)).toBeVisible();
 await expect(dialog.getByText(/AI narration uses a synthetic voice/)).not.toBeVisible();await expect(dialog.getByRole('heading',{name:'FIA on this device'})).not.toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)).toBe(false);await page.screenshot({path:`evidence/save-disclosure/${width}-${language}-initial.png`});
 await dialog.getByText('More about offline saving',{exact:true}).click();await expect(dialog.getByText(/AI narration uses a synthetic voice/)).toBeVisible();await dialog.getByText('More about offline saving',{exact:true}).click();
 await dialog.getByText('Install on this device',{exact:true}).click();await expect(dialog.getByRole('heading',{name:'FIA on this device'})).toBeVisible();await dialog.getByText('Install on this device',{exact:true}).click();
 // Real UI persistence failure, with reference sections still closed.
 await page.evaluate(()=>{const original=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k==='fia.narration.v1')throw Error('test storage unavailable');return original.call(this,k,v);};});
 await dialog.getByRole('combobox',{name:'Narration',exact:true}).selectOption('ai-only');await expect(dialog.getByText('Narration preference could not be saved on this device.')).toBeVisible();await expect(dialog.getByText(/AI narration uses a synthetic voice/)).not.toBeVisible();
});
