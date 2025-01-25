const addResourcesToCache = async (resources) => {
    const cache = await caches.open('v1');
    await cache.addAll(resources);
};


// Install and activate: populating your cache
self.addEventListener('install', (event) => {
    event.waitUntil(
        addResourcesToCache([
            '/Service Worker API/demo.html',
            '/Service Worker API/style.css',
            '/Service Worker API/script.js',
            '/Service Worker API/image.png',
        ])
    );
});
