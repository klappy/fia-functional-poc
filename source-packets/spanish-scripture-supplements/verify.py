import json,hashlib,pathlib
p=json.loads(pathlib.Path(__file__).with_name('SUPPLEMENTS.json').read_text());h=lambda x:hashlib.sha256(x.encode()).hexdigest()
assert len(p['supplements'])==3
assert [e['id'] for e in p['preserveExistingSpanishEditions']]==['ReinaValera1909','AquiferSpanishBibleReferenceText']
for e in p['supplements']:
 assert [v['verse'] for v in e['verses']]==list(range(1,14))
 for v in e['verses']:
  assert h(v['source']['text'])==v['sourceTextSha256']
  assert h(v['source']['content'])==v['sourceHtmlSha256']==v['source']['contentSha256']
  assert h(v['text'])==v['outputTextSha256']
  for char in '{}':assert v['text'].count(char)==v['source']['text'].count(char)
 assert h('\n'.join(v['text'] for v in e['verses']))==e['outputTextSha256']
 assert not e['officialSpanishEdition'] and not e['audioAvailable']
print('PASS: 3 supplements, 39 source/output verse hashes, retained braces, 2 original-edition references; semantic review remains pending.')
