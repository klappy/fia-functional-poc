import json,pathlib,hashlib
G=pathlib.Path('/tmp/fia-spanish-audio-generation');H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(pathlib.Path(p).read_text());W=lambda p,x:pathlib.Path(p).write_text(json.dumps(x,ensure_ascii=False,indent=2)+'\n')
raw=(G/'public/audio/spa/manifest.json').read_bytes();receipt=J(G/'evidence/spanish-audio/FINAL-RECEIPT.json');assert H(raw)==receipt['manifestSha256'];m=json.loads(raw);cat=J('src/data/spanish-audio-catalog.json');index={r['id']:r for r in cat['requests']};assert len(m['entries'])==len(index)==191
for e in m['entries']:
 r=index[e['id']];assert e['sourceSha256']==r['sourceSha256'] and e['processedTextSha256']==r['processedTextSha256'];b=(G/('public'+e['path'])).read_bytes();assert len(b)==e['bytes'] and H(b)==e['sha256'];pathlib.Path('public'+e['path']).write_bytes(b)
refraw=(G/'evidence/spanish-audio/reference-stage/manifest.json').read_bytes();assert H(refraw)==receipt['referenceManifestSha256'];refs=json.loads(refraw);patches=[];english=J('public/audio/mark-1-1-13/manifest.json')
for r in refs['entries']:
 b=(G/r['stagedPath']).read_bytes();assert len(b)==r['bytes'] and H(b)==r['sha256']
 for t in r['targets']:
  entries=m['entries'] if t['language']=='spa' else english['entries'];e=next(e for e in entries if e['id']==t['id']);assert e['sourceSha256']==t['sourceSha256'] and e['sha256']==t['previousOutputSha256'];assert H(t['spokenInput'].encode())==r['spokenInputSha256'] and H(t['providerProcessedText'].encode())==r['processedTextSha256'];pathlib.Path('public'+e['path']).write_bytes(b);patches.append({'id':e['id'],'path':e['path'],'oldSha256':e['sha256'],'sha256':r['sha256'],'sourceSha256':e['sourceSha256'],'spokenInputSha256':r['spokenInputSha256'],'processedTextSha256':r['processedTextSha256']});e.update(bytes=r['bytes'],sha256=r['sha256'],duration=r['duration'],projectionVersion=t['projectionVersion'],spokenInputSha256=r['spokenInputSha256'],processedTextSha256=r['processedTextSha256'])
  if t['language']=='spa':index[t['id']].update(spokenInputSha256=r['spokenInputSha256'],processedTextSha256=r['processedTextSha256'])
m.update(complete=True,expectedEntries=191,partialWrittenNotices=False);W('public/audio/spa/manifest.json',m);W('public/audio/mark-1-1-13/manifest.json',english);W('src/data/spanish-audio-catalog.json',cat);W('evidence/complete-spanish-audio/REFERENCE-PATCHES.json',patches);W('evidence/complete-spanish-audio/GENERATION-RECEIPT.json',receipt)
b=pathlib.Path('public/audio/spa/manifest.json').read_bytes()
for p in ['content-packs/spa/mark-1-1-13/manifest.json','public/content/spa/mark-1-1-13/manifest.json']:
 x=J(p);x['preparedAudio'].update(bytes=len(b),sha256=H(b),complete=True,entries=191);W(p,x)
for p in ['package.json','package-lock.json']:
 x=J(p);x['version']='0.1.4'
 if 'packages'in x:x['packages']['']['version']='0.1.4'
 W(p,x)
print('191 bound +9 verified target replacements')
