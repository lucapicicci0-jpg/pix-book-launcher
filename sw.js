const CACHE='pix-book-launcher-v2-stabile-2026-07-03';
self.addEventListener('install', event => { self.skipWaiting(); });
self.addEventListener('activate', event => { event.waitUntil((async()=>{ const keys=await caches.keys(); await Promise.all(keys.filter(k=>k.startsWith('pix-book-launcher-') && k!==CACHE).map(k=>caches.delete(k))); await self.clients.claim(); })()); });
self.addEventListener('fetch', event => {
 const req=event.request;
 if(req.mode==='navigate' || (req.headers.get('accept')||'').includes('text/html')){ event.respondWith(fetch(req,{cache:'no-store'}).catch(()=>caches.match('./index.html'))); return; }
 event.respondWith(caches.open(CACHE).then(cache=>fetch(req).then(res=>{cache.put(req,res.clone());return res;}).catch(()=>cache.match(req))));
});
