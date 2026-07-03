const CACHE_NAME = 'tempmailx-v1';
const urlsToCache = [
  './index.html',
  './manifest.json'
];

// Instalação do Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepta as requisições de rede
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna o cache se houver, se não, faz a requisição na rede
        return response || fetch(event.request);
      })
  );
});