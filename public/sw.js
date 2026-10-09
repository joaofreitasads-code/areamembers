// Ultra-Fast Persistent Image & Media Cache Service Worker
const CACHE_NAME = 'universo3d-media-v3';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Match image assets from Google CDN, Google Drive, Imgur, and local static folders
  const isImageRequest =
    event.request.destination === 'image' ||
    url.hostname.includes('googleusercontent.com') ||
    url.hostname.includes('drive.google.com') ||
    url.hostname.includes('imgur.com') ||
    url.pathname.match(/\.(webp|png|jpg|jpeg|svg|gif|avif)$/i);

  if (isImageRequest) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        // Cache-First with Network Fallback
        const cachedResponse = await cache.match(event.request, { ignoreSearch: false });
        if (cachedResponse) {
          return cachedResponse;
        }

        try {
          const networkResponse = await fetch(event.request);
          // Only cache valid standard responses or opaque cross-origin image streams
          if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
            cache.put(event.request, networkResponse.clone()).catch(() => {});
          }
          return networkResponse;
        } catch (fetchErr) {
          // If offline or network failed, try matching with ignoreSearch
          const fallback = await cache.match(event.request, { ignoreSearch: true });
          if (fallback) return fallback;
          throw fetchErr;
        }
      })
    );
  }
});
