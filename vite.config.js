import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
const {version}=JSON.parse(fs.readFileSync(new URL('./package.json',import.meta.url)));
const stamp=`${version}+${execFileSync('git',['rev-parse','--short=7','HEAD'],{encoding:'utf8'}).trim()}`;
export default defineConfig({ plugins: [react(),{name:'release-stamp',transformIndexHtml(html){return html.replace('</head>',`<meta name="fia-release" content="${stamp}"></head>`);}}] });
