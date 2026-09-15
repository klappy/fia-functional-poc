// One event loop owns launch order; execute must reserve synchronously before its first await.
export async function schedule(rows,{execute,shouldStop,spacingMs=3100,concurrency=2,lastStartedAt=0,sleep=ms=>new Promise(r=>setTimeout(r,ms)),now=()=>Date.now()}){
 const pending=new Set();let failure=null,last=lastStartedAt,started=0;
 for(const row of rows){
  if(pending.size>=concurrency)await Promise.race(pending);
  if(failure||shouldStop())break;
  while(now()-last<spacingMs)await sleep(spacingMs-(now()-last));
  if(failure||shouldStop())break;
  started++;
  const task=(async()=>execute(row))();last=now();
  const job=task.catch(e=>{failure??=e;}).finally(()=>pending.delete(job));pending.add(job);
 }
 await Promise.all(pending);if(failure)throw failure;return {started,stopped:shouldStop()};
}
