console.info('Bleep Bloop 🤖 - hier spricht der ServiceWorker 🛠️')

const cacheVersion = 1
const cacheName = `static-cache-v${cacheVersion}`
const cachedPaths = [
    './',
    './index.html',
    './style.css',
]

self.addEventListener('install', event => {
    console.info('Der ServiceWorker wird installiert 🛠️')

    event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(cachedPaths)))
})

self.addEventListener('activate', event => {
    console.info('Der ServiceWorker wird aktiviert 🚀')

    // Hier werden alte Caches gelöscht, wenn sich die Version des Caches geändert hat.
    // Auch hier muss event.waitUntil() genutzt werden, da das Löschen von Caches asynchron passiert und der ServiceWorker sonst nicht startet.
    // Vorsicht: Wenn man mehrere Caches nutzt, muss sichergestellt werden, dass auch wirklich nur die alten Caches gelöscht werden!
    event.waitUntil(
        caches.keys().then(async cacheNames => {
            const deletionPromises = cacheNames.filter(cache => cache !== cacheName).map(caches.delete)
            await Promise.all(deletionPromises)
        })
    )
})

/**
 * Lädt die Datei aus dem Netzwerk und speichert sie im Cache, falls sie geladen wurde.
 *
 * Der Promise wird nach einem Timeout abgelehnt.
 *
 * @param request
 * @param timeout
 * @return {Promise<Response>}
 */
function tryToLoadFromNetworkAndUpdateCacheIfSuccessful (request, timeout = 10000) {
    console.info(`Versuche Datei ${request.url} aus dem Netzwerk zu laden... 🌐`)
    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(reject, timeout)
        fetch(request).then(response => {
            clearTimeout(timeoutId)

            const shouldBeCached = cachedPaths.includes(request.url)
            if (shouldBeCached) {
                console.log("Updating cache for", request.url);
                updateStaticCache(request, response.clone())
            } else {
                console.log("Not caching", request.url);
            }

            // Antwort der Response als Wert des Promises zurückgeben
            resolve(response)
        }).catch(reject)
    })
}

/**
 * Speichert die Antwort auf eine Anfrage im Cache
 *
 * @param request
 * @param response
 */
function updateStaticCache (request, response) {
    console.log("Updating cache for", request.url)
    return caches.open(cacheName).then(cache => cache.put(request, response))
}

// Wenn eine Anfrage an das Netzwerk gestellt wird, wird zuerst versucht, die Datei aus dem Netzwerk zu laden.
// Wenn das nicht funktioniert, wird versucht, die Datei aus dem Cache zu laden.
self.addEventListener('fetch', event => {
    console.log("Intercepting fetch for", event.request.url)
    event.respondWith(
        tryToLoadFromNetworkAndUpdateCacheIfSuccessful(event.request)
            .catch(() => caches.match(event.request, {ignoreSearch: true}))
            .then(response => response || new Response(null, {status: 404, statusText: 'Not found'}))
    )
})
