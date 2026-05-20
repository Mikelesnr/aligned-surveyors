self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("verdisol-cache").then((cache) => {
            return cache.addAll([
                "/",
                "/images/apple-touch-icon.png",
                "/images/favicon-32x32.png",
                "/images/favicon-16x16.png",
                "/images/site.webmanifest",
            ]);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
