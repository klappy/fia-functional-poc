import{test,expect}from'@playwright/test';
test('corrupt optional sidecars preserve readable Scripture and verified original playback',async({page})=>{
 await page.addInitScript(()=>{const Native=Audio;window.Audio=class extends Native{constructor(...args){super(...args);window.__timedAudio=this;}};});
 await page.route('**/alignment/spa-*.json',route=>route.fulfill({status:200,contentType:'application/json',body:'{}'}));
 await page.goto('/');await page.getByRole('tab',{name:'Languages',exact:true}).click();await page.getByRole('button',{name:/^Español/}).click();await expect(page.locator('[data-content-language=spa]')).toBeVisible();await page.getByRole('tab',{name:'Scripture',exact:true}).click();await expect(page.locator('#panel-scripture')).toBeVisible();
 const response=page.waitForResponse(r=>new URL(r.url()).pathname==='/audio/spa/spa-d6df2d9a83d1954f789c.mp3'&&r.ok());await page.locator('#panel-scripture .owner-toggle').click();await(await response).finished();await expect.poll(()=>page.evaluate(()=>window.__timedAudio?.currentTime??0)).toBeGreaterThan(.1);await expect(page.locator('[data-alignment-word]')).toHaveCount(0);await expect(page.locator('#panel-scripture')).toContainText('PRINCIPIO del evangelio');
});
