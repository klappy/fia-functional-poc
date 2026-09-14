import test from'node:test';import assert from'node:assert/strict';import fs from'node:fs';
test('built release stamp uses manifest version and a source revision',()=>{const{version}=JSON.parse(fs.readFileSync('package.json'));const html=fs.readFileSync('dist/index.html','utf8');assert.match(html,new RegExp(`name="fia-release" content="${version.replaceAll('.','\\.')}\\+[0-9a-f]{7}"`));});
