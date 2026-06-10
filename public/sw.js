const CACHE_NAME = "aligned-surveyors-v2";

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                "/images/apple-touch-icon.png",
                "/images/favicon-32x32.png",
                "/images/favicon-16x16.png",
                "/images/android-chrome-192x192.png",
                "/images/android-chrome-512x512.png",
            ]);
        }),
    );
});

self.addEventListener("activate", (event) => {
    // This clears the old cache whenever you update the CACHE_NAME
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys
                    .filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key)),
            );
        }),
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Serve from cache if available, otherwise fetch from network
            return response || fetch(event.request);
        }),
    );
});
