const CACHE_NAME = "aligned-surveyors-v3";

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            // We add the manifest here so the browser sees it as part of the PWA "identity"
            return cache.addAll([
                "/manifest.json",
                "/images/apple-touch-icon.png",
                "/images/favicon-32x32.png",
                "/images/android-chrome-192x192.png",
                "/images/android-chrome-512x512.png",
            ]);
        }),
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys
                    .filter((k) => k !== CACHE_NAME)
                    .map((k) => caches.delete(k)),
            );
        }),
    );
});

self.addEventListener("fetch", (event) => {
    // Service workers should never intercept non-GET requests (POST/PUT/PATCH/DELETE).
    // Re-fetching event.request for a request with a body (e.g. a login form POST)
    // throws "Failed to fetch" because the body stream is already consumed by the
    // time it reaches here. Let the browser handle all non-GET traffic natively.
    if (event.request.method !== "GET") {
        return;
    }

    const url = new URL(event.request.url);

    // 1. CHATBOT SAFETY: Always Network-First for API
    if (url.pathname.includes("/api/")) {
        return event.respondWith(fetch(event.request));
    }

    // 2. MANIFEST & NAVIGATION SAFETY: Always Network-First to ensure updates are fetched
    if (
        url.pathname === "/manifest.json" ||
        event.request.mode === "navigate"
    ) {
        return event.respondWith(
            fetch(event.request)
                .then((response) => {
                    // Optionally update the cache with the new version
                    const copy = response.clone();
                    caches
                        .open(CACHE_NAME)
                        .then((cache) => cache.put(event.request, copy));
                    return response;
                })
                .catch(() => caches.match(event.request)), // Fallback to cache if offline
        );
    }

    // 3. ASSET CACHING: Standard Cache-First for static images
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        }),
    );
});