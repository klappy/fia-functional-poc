import pathlib,json,hashlib,subprocess,urllib.request,urllib.error,time,threading,concurrent.futures,os,email.utils,random
ROOT=pathlib.Path('/tmp/fia-alignment-main-0c21899/public'); OUT=pathlib.Path('/tmp/fia-derivative-preparation'); BASE=os.environ.get('MEDIA_PROXY_BASE','https://transcode.klappy.dev').rstrip('/'); CAP=min(8,max(1,int(os.environ.get('MEDIA_CONCURRENCY','8'))))
lock=threading.Lock(); cooldown=0; stopped=False; active=0; peak=0; entries=[]; rows=[]
def sha(b):return hashlib.sha256(b).hexdigest()
def probe(p):return json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(p)]))
def save(row):
 with lock:
  rows.append(row)
  if row['status']=='verified':entries.append(row['descriptor'])
  with (OUT/'ledger.jsonl').open('a') as f:f.write(json.dumps(row)+'\n');f.flush();os.fsync(f.fileno())
  tmp=OUT/'descriptors.tmp';tmp.write_text(json.dumps({'version':1,'sourceCommit':'0c21899f25bba5255a566ac9860dafc32130fb29','acceptance':'byte/decode verified; native/visual acceptance pending','entries':entries},indent=2));tmp.replace(OUT/'descriptors.json')
  (OUT/'status.json').write_text(json.dumps({'pid':os.getpid(),'completed':len(rows),'verified':len(entries),'active':active,'peak':peak,'cap':CAP,'stopped':stopped}))
def run(job):
 global cooldown,stopped,active,peak
 p,kind,recipe,pr=job; raw=p.read_bytes(); rel='/'+str(p.relative_to(ROOT)); key=sha((sha(raw)+recipe).encode()); dst=OUT/(key+'.bin'); start=time.monotonic(); row={'sourcePath':rel,'recipe':recipe}
 try:
  for attempt in range(3):
   while True:
    with lock:
     if stopped:raise RuntimeError('shared stop after authorization/quota failure')
     now=time.monotonic()
     if now>=cooldown and (cooldown==0 or active==0):active+=1;peak=max(peak,active);break
    time.sleep(.1)
   try:
    req=urllib.request.Request(BASE+'/'+kind+'/'+recipe+'/https://fia.klappy.dev'+rel)
    with urllib.request.urlopen(req,timeout=90) as res:body=res.read();mime=res.headers.get_content_type();headers=dict(res.headers)
    break
   except urllib.error.HTTPError as e:
    if e.code in (401,403,402):
     with lock:stopped=True
    if e.code not in (429,503) or attempt==2:raise
    ra=e.headers.get('Retry-After',''); delay=2**attempt+random.random()
    try:delay=max(0,float(ra))
    except ValueError:
     try:delay=max(0,email.utils.parsedate_to_datetime(ra).timestamp()-time.time())
     except Exception:pass
    with lock:cooldown=max(cooldown,time.monotonic()+delay)
   finally:
    with lock:active-=1
  dst.write_bytes(body); outprobe=probe(dst); stream=outprobe['streams'][0]
  if len(body)>=len(raw):raise ValueError('not smaller than original')
  if kind=='audio':
   if stream.get('codec_name')!='opus' or mime not in ('audio/ogg','audio/opus','application/ogg'):raise ValueError('unexpected audio MIME/codec '+mime)
   subprocess.run(['ffmpeg','-v','error','-i',str(dst),'-f','null','-'],check=True,capture_output=True)
   extra={'durationSeconds':float(outprobe['format']['duration'])}
  else:
   if stream.get('codec_name')!='webp' or mime!='image/webp':raise ValueError('unexpected image MIME/codec '+mime)
   if stream['width']>pr['width'] or stream['height']>pr['height']:raise ValueError('upscaled output')
   extra={'width':stream['width'],'height':stream['height']}
  row.update(status='verified',elapsedSeconds=time.monotonic()-start,descriptor={'sourcePath':rel,'sourceSha256':sha(raw),'sourceBytes':len(raw),'kind':kind,'recipe':recipe,'proxyPath':'/'+kind+'/'+recipe+'/https://fia.klappy.dev'+rel,'mime':mime,'bytes':len(body),'sha256':sha(body),**extra})
 except Exception as e:row.update(status='rejected',error=str(e),elapsedSeconds=time.monotonic()-start)
 save(row)
jobs=[]; seen=set(); excluded=[]
for p in sorted(ROOT.rglob('*')):
 if p.suffix.lower() not in ('.mp3','.png','.jpg','.jpeg','.webp') or not (str(p.relative_to(ROOT)).startswith(('audio/','assets/'))):continue
 if p.name in ('scripture-BereanStandardBible.mp3','scripture-unfoldingWordLiteral.mp3','scripture-unfoldingWordSimplified.mp3'):excluded.append(str(p.relative_to(ROOT)));continue
 kind='audio' if p.suffix=='.mp3' else 'image'; pr={}
 if kind=='image':
  pr=probe(p)['streams'][0]; recipes=['w='+str(w)+',q=medium,f=webp' for w in (320,640) if w*1.5<=pr['width']]
 else:recipes=['preset=voice,q=medium,f=opus']
 for recipe in recipes:
  key=(sha(p.read_bytes()),recipe)
  if key not in seen:seen.add(key);jobs.append((p,kind,recipe,pr))
(OUT/'inventory.json').write_text(json.dumps({'jobs':len(jobs),'excludedAlignedOriginals':excluded,'cap':CAP,'sourceCommit':'0c21899f25bba5255a566ac9860dafc32130fb29'},indent=2))
print(json.dumps({'pid':os.getpid(),'jobs':len(jobs),'cap':CAP}),flush=True)
with concurrent.futures.ThreadPoolExecutor(max_workers=CAP) as pool:list(pool.map(run,jobs))
(OUT/'DONE.json').write_text(json.dumps({'completed':len(rows),'verified':len(entries),'peak':peak,'stopped':stopped}))
