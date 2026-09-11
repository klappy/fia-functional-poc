import { test, expect } from '@playwright/test';
test.use({serviceWorkers:'block'});
test.beforeEach(async({page})=>{await page.goto('/');await expect(page.getByRole('heading',{name:'Mark 1:1–13',level:1})).toBeVisible();});
test('real guide, Scripture selection and exact position survive view changes and reload',async({page})=>{
 await expect(page.getByTestId('current-unit')).toContainText('In this step, hear Mark');
 await page.getByRole('button',{name:'Next guide activity',exact:false}).click();await page.getByRole('button',{name:'Next guide activity',exact:false}).click();
 await expect(page.getByTestId('current-unit')).toContainText('What do you like');await expect(page.locator('.guide-footer')).toContainText('Discuss together');
 await page.getByRole('tab',{name:'Scripture',exact:true}).click();await page.getByRole('radio',{name:'ULT',exact:true}).click();
 await page.getByRole('tab',{name:'Scripture',exact:true}).click();await expect(page.locator('.scripture-text [lang="en"] > span')).toHaveCount(13);
 await expect(page.locator('.scripture-text')).toContainText('The beginning of the gospel');
 await page.getByRole('tab',{name:'Guide',exact:true}).click();await expect(page.getByTestId('current-unit')).toHaveAttribute('data-unit-id','S01-U003');
 await page.reload();await expect(page.getByTestId('current-unit')).toHaveAttribute('data-unit-id','S01-U003');await page.getByRole('tab',{name:'Scripture',exact:true}).click();await expect(page.getByRole('radio',{name:'ULT',exact:true})).toHaveAttribute('aria-checked','true');
});
test('contextual real map opens, renders and returns focus without moving the guide',async({page})=>{
 await page.getByLabel('Guide step').selectOption('S02');
 for(let i=0;i<4;i++)await page.getByRole('button',{name:'Next guide activity',exact:false}).click();
 const opener=page.getByRole('button',{name:'Locations in the Book of Mark'});await opener.click();
 await expect(page.getByRole('dialog')).toBeVisible();const image=page.getByRole('dialog').getByRole('img',{name:'Locations in the Book of Mark',exact:true});await expect(image).toBeVisible();
 await expect.poll(()=>image.evaluate(img=>img.naturalWidth)).toBe(3000);
 await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toHaveCount(0);await expect(opener).toBeFocused();await expect(page.getByTestId('current-unit')).toHaveAttribute('data-unit-id','S02-U005');
});
test('examples require explicit reveal and every resource type is available',async({page})=>{
 await page.getByLabel('Guide step').selectOption('S04');
 await expect(page.getByText('The following is an example of the drama and possible responses.')).toHaveCount(0);
 await page.getByRole('button',{name:'Show source example',exact:true}).click();await expect(page.getByRole('dialog')).toContainText('The following is an example');
 await page.keyboard.press('Escape');await page.getByRole('tab',{name:'Resources',exact:true}).click();await expect(page.locator('.resource-card')).toHaveCount(32);
 await page.getByRole('button',{name:'Key terms',exact:true}).click();await expect(page.locator('.resource-card')).toHaveCount(21);
 await page.getByRole('button',{name:'Open gospel term'}).click();await expect(page.getByRole('dialog')).toContainText('gospel');await page.keyboard.press('Escape');
 await page.getByRole('button',{name:'Video links',exact:true}).click();await expect(page.locator('.resource-card')).toHaveCount(3);await page.locator('button.resource-card').first().click();await expect(page.getByRole('dialog')).toContainText('not downloaded');
});
test('narrow layout, keyboard dialog and large text remain usable',async({page})=>{
 await page.setViewportSize({width:320,height:844});await expect(page.locator('body')).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
 await page.getByRole('button',{name:'Read complete guide and attribution'}).click();await expect(page.getByRole('button',{name:'Close resource'})).toBeFocused();
 await page.keyboard.press('Tab');expect(await page.locator('dialog').evaluate(d=>d.contains(document.activeElement))).toBe(true);await page.keyboard.press('Escape');
 await page.setViewportSize({width:780,height:844});await page.evaluate(()=>document.body.style.zoom='2');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
});
test('failed required source renders a real error with retry, never substitute content',async({page})=>{
 await page.route('**/content/mark-1-1-13/guide.json',route=>route.fulfill({status:503,body:'Unavailable'}));await page.reload();
 await expect(page.getByRole('alert')).toContainText('required passage source');await expect(page.getByTestId('current-unit')).toHaveCount(0);
 await page.unroute('**/content/mark-1-1-13/guide.json');await page.getByRole('button',{name:'Try again'}).click();await expect(page.getByTestId('current-unit')).toBeVisible();
});

test('duplicate source names are distinguished by source meaning and inspected image',async({page})=>{
 await page.getByRole('tab',{name:'Resources',exact:true}).click();
 for(const label of ['Lord — title of authority term','Lord — reference to God term','Sandals — full view image','Sandals — close view image']) await expect(page.getByRole('button',{name:`Open ${label}`,exact:true})).toHaveCount(1);
 await page.getByRole('button',{name:'Open Lord — reference to God term',exact:true}).click();await expect(page.getByRole('dialog')).toContainText('God himself');
});
test('official FIA identity and colors render with readable contrast',async({page})=>{
 await expect(page.getByRole('img',{name:'FIA',exact:true})).toBeVisible();await expect(page.locator('.official-fia-mark svg')).toHaveCount(2);await expect(page.getByRole('heading',{name:'Mark 1:1–13',exact:true})).toBeVisible();
 await expect(page.locator('.app-aurora > div').first()).not.toHaveCSS('background-image','none');await expect(page.locator('.official-fia-mark')).toHaveCSS('color','rgb(59, 96, 134)');await expect(page.getByRole('heading',{level:1})).toHaveCSS('color','rgb(36, 44, 58)');await expect(page.getByRole('tab',{name:'Guide',exact:true})).toHaveCSS('background-color','rgb(51, 83, 116)');
 const luminance=rgb=>rgb.map(x=>{x/=255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4}).reduce((n,x,i)=>n+x*[.2126,.7152,.0722][i],0);
 for(const rgb of [[65,81,104],[51,83,116],[59,96,134]])expect(1.05/(luminance(rgb)+.05)).toBeGreaterThan(4.5);
 await page.setViewportSize({width:320,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
});

test('resources show all eight real previews, source metadata, search and honest online video',async({page})=>{
 const videos=[];page.on('request',req=>{if(/\.(mp4|webm)(\?|$)/i.test(req.url()))videos.push(req.url());});
 await page.getByRole('tab',{name:'Resources',exact:true}).click();const previews=page.locator('.preview-integrity-probe');await expect(previews).toHaveCount(8);
 for(const image of await previews.all()){await expect.poll(()=>image.evaluate(i=>i.complete&&i.naturalWidth>0)).toBe(true);await expect(image).toHaveAttribute('src',/^\/assets\/mark-1-1-13\//);}
 await expect(page.locator('.resource-map .resource-card > div').first()).toHaveCSS('background-size',/^cover/);await expect(page.locator('.resource-image .resource-card > div').first()).toHaveCSS('background-size',/^cover/);
 await expect(page.locator('.resource-card')).toHaveCount(32);await expect(page.locator('.resource-map .resource-card').first()).toContainText('CC');
 await expect(page.locator('.video-affordance')).toHaveCount(3);await expect(page.locator('.resource-video img')).toHaveCount(0);expect(videos).toEqual([]);
 await page.getByLabel('Search resources').fill('sandals');await expect(page.locator('.resource-card')).toHaveCount(3);await page.getByLabel('Search resources').fill('no-such-resource');await expect(page.getByText('No resources match this search.',{exact:true})).toBeVisible();await page.getByLabel('Search resources').fill('');
 await page.setViewportSize({width:320,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
});
test('finished-session return from another view really restores the guide',async({page})=>{
 await page.evaluate(()=>localStorage.setItem('fia.session.mark-1-1-13.v1',JSON.stringify({schemaVersion:1,passage:'mark-1-1-13',stepId:'S06',unitId:'S06-U001',version:'BereanStandardBible',visited:['S01','S02','S03','S04','S05','S06'],finished:true})));
 await page.reload();await page.getByRole('tab',{name:'Resources',exact:true}).click();await page.getByRole('button',{name:'Return to the guide',exact:true}).click();await expect(page.getByTestId('current-unit')).toBeVisible();await expect(page.getByRole('heading',{name:'Session finished',exact:true})).toHaveCount(0);
});
