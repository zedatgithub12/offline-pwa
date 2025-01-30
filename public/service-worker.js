const CACHE_NAME = "hajji-offline";

// Caching the static assets during service worker installation
async function cacheCoreAssets() {
  const cache = await caches.open(CACHE_NAME);
  return cache.addAll([
    "/",
    "/offline.html",
    "/logo.svg",
    "/logo.png",
    "/fallback",
    "/_next/static/css/app/layout.css",
    "/_next/static/chunks/main-app.js",
  ]);
}

self.addEventListener("install", (event) => {
  event.waitUntil(cacheCoreAssets());
  self.skipWaiting();
});

// Clear old caches before activating the service worker
async function clearOldCaches() {
  const cacheNames = await caches.keys();
  return Promise.all(
    cacheNames
      .filter((name) => name !== CACHE_NAME)
      .map((name) => caches.delete(name))
  );
}

self.addEventListener("activate", (event) => {
  event.waitUntil(clearOldCaches());
  self.clients.claim();
});

// Handle network requests with caching strategies
async function dynamicCaching(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request);
    const responseClone = response.clone();
    await cache.put(request, responseClone);
    return response;
  } catch (error) {
    // If request is an HTML page and network fails, show offline.html
    if (request.headers.get("Accept").includes("text/html")) {
      return caches.match("/offline.html");
    }
    return caches.match(request);
  }
}

async function cacheFirstStrategy(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    const responseClone = networkResponse.clone();
    await cache.put(request, responseClone);
    return networkResponse;
  } catch (error) {
    return caches.match("/offline.html");
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
    event.respondWith(cacheFirstStrategy(request));
  
});
