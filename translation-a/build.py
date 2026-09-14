import json,re,hashlib,html
from pathlib import Path
from translations import translations
H=lambda x:hashlib.sha256(x.encode()).hexdigest()
read=lambda p:json.loads(Path(p).read_text())
inputs=read('audit/TRANSLATION-INPUTS.json')
pack=read('public/content/spa/mark-1-1-13/pack.json')
titles={'a13':'Río Jordán','a184':'Sandalias','a10':'Desierto o lugar deshabitado','a203':'Sandalias','c201':'Vista aérea de Judea y Jerusalén','c168':'Nazaret y Judea'}
rows=[];review=[];coverage=[]
for x in inputs:
 source=x['englishHtml']
 if x['spanishId']:
  coverage.append({'englishId':x['englishId'],'spanishId':x['spanishId'],'status':'existing original plus existing supplements; independent bilingual review pending','existingSupplementIds':x['existingSupplementIds'],'englishBodySha256':H(source),'evidence':'audit/COVERAGE-REVALIDATION.json','newMissingSpanEstablished':False})
  review.append({'englishId':x['englishId'],'englishHtml':source,'spanishHtml':x.get('existingSpanishOriginalHtml'),'existingSupplements':x.get('existingSupplements'),'reviewState':'pending independent full bilingual review'})
  continue
 if x['kind']=='term':
  title,target=translations[x['englishId']]
  if x['englishId']=='eng-t88-v1':title='Señor'
 else:
  title=titles[x['englishId']]
  target=source.replace('Video Content','Contenido de video').replace('Image Content','Contenido de imagen').replace(' seconds',' segundos').replace('>link<','>enlace<').replace("alt='Image'","alt='Imagen'")
 links=lambda s:sorted(re.findall(r'(?:href|src)=[\"\x27]([^\"\x27]+)',s))
 assert links(source)==links(target),x['englishId']
 assert len(re.findall('<p(?: |>)',source))==len(re.findall('<p(?: |>)',target)),x['englishId']
 note='Traducción al español realizada con IA a partir del original inglés; no es una edición oficial del proveedor.'
 if x['kind']=='video':note+=' Se tradujeron solo el título y los metadatos disponibles; el video original no está doblado al español.'
 if x['kind']=='map':note+=' Los rótulos de la imagen original permanecen en inglés; se tradujeron el título y los metadatos.'
 row={'id':'ai-spa-from-'+x['englishId'],'englishId':x['englishId'],'kind':x['kind'],'language':'spa','title':title,'body':target,'label':'Traducción con IA','notice':note,'provenance':{'method':'AI translation by OpenAI Codex assistant; independent bilingual review pending','sourceTitle':x['englishTitle'],'sourceTitleSha256':H(x['englishTitle']),'sourceHtml':source,'sourceSpan':{'start':0,'end':len(source),'unit':'Unicode code points'},'sourceHtmlSha256':H(source),'source':x['englishSource'],'rights':x['rights'],'translatedTitleSha256':H(title),'translatedBodySha256':H(target)},'reviewState':'proposed — independent bilingual review required'}
 rows.append(row)
 review.append({'englishId':x['englishId'],'englishTitle':x['englishTitle'],'spanishTitle':title,'paragraphs':[{'englishHtml':a,'spanishHtml':b} for a,b in zip(re.findall(r'<p\b[^>]*>.*?</p>',source,re.S),re.findall(r'<p\b[^>]*>.*?</p>',target,re.S))],'englishHtml':source,'spanishHtml':target,'reviewState':'pending independent full bilingual review'})
 coverage.append({'englishId':x['englishId'],'derivedId':row['id'],'status':'full supplied term body translated' if x['kind']=='term' else 'supplied title and metadata translated; original media preserved','sourceHtmlSha256':H(source),'targetHtmlSha256':H(target),'limitations':['No transcript available; no video dialogue translation or dubbing'] if x['kind']=='video' else ['Original map pixels remain English'] if x['kind']=='map' else []})
assert len(rows)==12 and len(coverage)==32
out=Path('translation-a')
for name,data in [('TRANSLATIONS',rows),('BILINGUAL-REVIEW',review),('COVERAGE',{'englishIdentities':32,'originalSpanishIdentities':22,'derivedIdentities':12,'unionIdentities':34,'rows':coverage,'unchangedOriginalPackSha256':H(Path('public/content/spa/mark-1-1-13/pack.json').read_text()),'originalTermsSha256':H(json.dumps(pack['terms'],ensure_ascii=False,sort_keys=True)),'originalMediaSha256':H(json.dumps(pack['media'],ensure_ascii=False,sort_keys=True)),'existingEightSupplementsSha256':H(json.dumps(pack['supplements'],ensure_ascii=False,sort_keys=True)),'newGapSupplements':[],'remainingGate':'Independent full bilingual review; inherited unchanged-body audit is not new semantic validation'})]:
 (out/(name+'.json')).write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'translations':len(rows),'coverage':len(coverage),'originalSupplements':len(pack['supplements']),'translatedPlaintextCharacters':sum(len(html.unescape(re.sub('<[^>]+>',' ',r['body'])))+len(r['title']) for r in rows),'linksAndParagraphCounts':'PASS'},indent=2))
