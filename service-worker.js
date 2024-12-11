const CACHE_NAME = 'ahmed-portfolio-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/new_skills.css',
  '/skills.css',
  '/script.js',
  '/new_skills.js',
  '/images/me.JPEG',
  // Add other assets you want to cache
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
