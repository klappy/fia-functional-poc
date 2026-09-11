import {test,expect} from '@playwright/test';
test.use({baseURL:'http://127.0.0.1:4185',serviceWorkers:'allow'});
test('ordinary reload upgrades a saved previous shell without deleting progress or its verified pack',async({page,request,context})=>{
 await request.post('/__test__/mode',{data:'legacy'});
 await page.addInitScript(()=>{window.__controllerChanged=false;navigator.serviceWorker.addEventListener('controllerchange',()=>window.__controllerChanged=true);});
 await page.goto('/');await page.getByRole('button',{name:'Continue',exact:true}).click();await expect(page.getByTestId('current-unit')).toHaveAttribute('data-unit-id','S01-U002');
 await page.getByRole('button',{name:'Save for offline',exact:true}).click();await expect(page.locator('.offline-status')).toContainText('Saved on this device',{timeout:30000});
 const oldScripts=await page.locator('script[src]').evaluateAll(s=>s.map(x=>x.src));const old=await page.evaluate(async()=>{const c=await caches.open('fia-meta-v1');return(await c.match('/__fia_active__')).json();});
 await request.post('/__test__/mode',{data:'normal'});await page.reload();await page.waitForFunction(()=>window.__controllerChanged,{timeout:20000});await page.reload();
 await expect(page.getByRole('button',{name:'Listen to this step',exact:true})).toBeVisible();expect(await page.locator('script[src]').evaluateAll(s=>s.map(x=>x.src))).not.toEqual(oldScripts);await expect(page.getByTestId('current-unit')).toHaveAttribute('data-unit-id','S01-U002');
 await expect(page.getByText('Offline passage · Update available',{exact:true})).toBeVisible();const retained=await page.evaluate(async()=>{const c=await caches.open('fia-meta-v1');return(await c.match('/__fia_active__')).json();});expect(retained.cache).toBe(old.cache);
 await page.getByText('Offline passage · Update available',{exact:true}).click();await page.getByRole('button',{name:'Save for offline',exact:true}).click();await expect(page.locator('.offline-status')).toContainText('Saved on this device',{timeout:30000});await context.setOffline(true);await page.reload();await expect(page.getByTestId('current-unit')).toHaveAttribute('data-unit-id','S01-U002');await page.getByRole('button',{name:'Listen to this step',exact:true}).click();await expect(page.locator('.audio-controls [role="status"]')).toHaveText('Listening…');
});
