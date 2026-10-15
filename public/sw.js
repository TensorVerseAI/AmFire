const CACHE='amfire-shell-v4-entry';
const SHELL=['/assets/amfire-owner-logo.png','/','/app/','/index.html','/style.css','/app.js','/media.json','/manifest.webmanifest','/assets/icon-192.png','/assets/icon-512.png','/assets/icon.svg','/assets/icon-maskable.svg','/assets/scene.svg','/assets/amfire-opening.mp4'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL.map(url=>new Request(url,{cache:'reload'})))).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('amfire-shell-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()).then(()=>self.clients.matchAll({type:'window'})).then(clients=>Promise.all(clients.map(client=>client.navigate(client.url))))));
self.addEventListener('fetch',e=>{const url=new URL(e.request.url);if(e.request.method!=='GET'||url.origin!==self.location.origin||url.pathname.startsWith('/api/')||url.pathname.startsWith('/auth/')||e.request.headers.has('range'))return;e.respondWith(fetch(e.request,{cache:'no-cache'}).then(r=>{if(r.ok&&SHELL.includes(url.pathname)){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));}return r;}).catch(()=>caches.match(e.request).then(r=>r||(e.request.mode==='navigate'?caches.match('/'):new Response('Offline',{status:503})))));});


