const CACHE_NAME = "meeting-count-v1";

const FILES_TO_CACHE = [
    "index.html",
    "style.css",
    "app.js",
    "manifest.json",
    "logo-meeting-count.png",
    "icon-512.png"
];

// Installation
self.addEventListener("install", function (event) {

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(FILES_TO_CACHE);
            })
    );

});

// Activation
self.addEventListener("activate", function (event) {

    event.waitUntil(
        caches.keys().then(function (cacheNames) {

            return Promise.all(
                cacheNames
                    .filter(function (cacheName) {
                        return cacheName !== CACHE_NAME;
                    })
                    .map(function (cacheName) {
                        return caches.delete(cacheName);
                    })
            );

        })
    );

});

// Fonctionnement hors connexion
self.addEventListener("fetch", function (event) {

    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                return response || fetch(event.request);
            })
    );

});