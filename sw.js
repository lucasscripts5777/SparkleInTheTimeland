const V='timeland-v1',THREE='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
const CORE=['./','index.html','lines.js','manifest.json','icons/icon-192.png','icons/icon-512.png','the_missing_time.mp3'];
self.addEventListener('install',e=>{e.waitUntil((async()=>{const c=await caches.open(V);await c.addAll(CORE);try{await c.add(new Request(THREE,{mode:'cors'}))}catch(_){}
for(let i=1;i<=145;i++){try{await c.add('dub/'+String(i).padStart(3,'0')+'.mp3')}catch(_){}}})());self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))));self.clients.claim()});
async function rng(req,res){const b=await res.arrayBuffer(),m=/bytes=(\d+)-(\d*)/.exec(req.headers.get('range')),s=+m[1],e=m[2]?+m[2]:b.byteLength-1;
return new Response(b.slice(s,e+1),{status:206,headers:{'Content-Type':'audio/mpeg','Content-Range':`bytes ${s}-${e}/${b.byteLength}`,'Content-Length':e-s+1}})}
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;e.respondWith((async()=>{const c=await caches.open(V);let h=await c.match(r.url);
if(!h){try{h=await fetch(r.headers.get('range')?r.url:r);if(h.ok&&!r.headers.get('range'))c.put(r,h.clone())}catch(_){return h||Response.error()}}
return r.headers.get('range')&&h.status===200?rng(r,h):h})())});
