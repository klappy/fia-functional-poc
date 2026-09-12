import base from './playwright.config.js';
export default {...base,use:{...base.use,baseURL:'http://127.0.0.1:4797'},webServer:[{command:'npm run preview -- --host 127.0.0.1 --port 4797 --strictPort',url:'http://127.0.0.1:4797',reuseExistingServer:false},...base.webServer.filter(s=>!s.url.endsWith(':4173'))]};
