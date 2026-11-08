// オフラインでも起動できるよう、アプリのファイルを最初の読み込みで保存しておく。
// 作品を作り直したときは、変換ツールが VERSION を変えるので、古い保存分は消える。
const VERSION = '7efb405e23cd';
const CACHE = 'sb3-pwa-' + VERSION;
const FILES = [
  './',
  './index.html',
  './player.js',
  './scaffolding-min.js',
  './project.sb3',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('sb3-pwa-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((hit) => hit || fetch(event.request))
  );
});
