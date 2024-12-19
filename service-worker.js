const cacheName = 'quote-pwa-v1';
const cacheAssets = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/script.js',
  '/images/icon-192x192.png'
];

// Install the service worker and cache assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(cacheAssets);
      })
  );
});

// Activate the service worker and remove outdated caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Intercept fetch requests and serve cached assets
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});
