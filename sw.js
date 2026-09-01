/**
 * VEFA Platform (v2.4.0) Service Worker
 * Offline-first caching for civic and fraternal community portals.
 * © 2027 VEFA: Fraternal & Civic Community Engine. Contact: admin@vefa.club
 */

const CACHE_NAME = 'vefa-cache-v2.4.0';
const ASSETS_TO_CACHE = [
  './',
  'index.html',
  'setup.html',
  'styles.css',
  'config.js',
  'app.js',
  'manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => res || fetch(event.request))
  );
});
