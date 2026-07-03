const CACHE='pix-v2-0-promo-stable-4';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const req=e.request;if(req.mode==='navigate'||req.destination==='document'){e.respondWith(fetch(req,{cache:'no-store'}));return;}e.respondWith(fetch(req).catch(()=>caches.match(req)));});
