import {expect} from '@playwright/test';
export async function expectSpanishMediumSaved(page,startSave){
 const pending=new Map();const failed=[];const started=r=>pending.set(r,{url:r.url(),at:Date.now()});const finished=r=>pending.delete(r);const failure=r=>{failed.push({url:r.url(),error:r.failure()?.errorText});pending.delete(r);};
 page.on('request',started);page.on('requestfinished',finished);page.on('requestfailed',failure);
 try{
  await startSave();
  await expect(page.locator('.offline-status')).toHaveText('Medium saved on this device · files verified',{timeout:60000});
  await expect.poll(()=>page.evaluate(async()=>{const value=await(await caches.open('fia-meta-v1')).match('/__fia_spa__');if(!value)return null;const active=await value.json();return active.quality==='medium'&&active.entries.length>0?active.cache:null;}),{timeout:60000}).toBeTruthy();
 }catch(error){
  const state=await page.evaluate(async()=>{const value=await(await caches.open('fia-meta-v1')).match('/__fia_spa__');return {status:document.querySelector('.offline-status')?.textContent,alerts:[...document.querySelectorAll('[role=alert]')].map(e=>e.textContent),meta:value?await value.json():null,cacheNames:await caches.keys()};}).catch(e=>({diagnosticError:e.message}));
  console.error('OFFLINE_SAVE_FAILURE',JSON.stringify({pending:[...pending.values()].map(r=>({...r,elapsedMs:Date.now()-r.at})),failed,state}));throw error;
 }finally{page.off('request',started);page.off('requestfinished',finished);page.off('requestfailed',failure);}
}
