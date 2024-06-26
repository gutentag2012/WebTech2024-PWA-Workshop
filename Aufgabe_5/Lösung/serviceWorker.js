console.info('Bleep Bloop 🤖 - hier spricht der ServiceWorker 🛠️')

// Wenn diese Version des ServiceWorkers geändert wird, werden alte Caches gelöscht und die neuen Dateien gecached.
const cacheVersion = 1
const staticCache = 'static-cache-v' + cacheVersion

// Hier werden die Dateien definiert, die gecacht werden sollen.
// Achtung: Es müssen valide URLs sein, relativ zur start_url oder absolute URLs.
const staticFilesToCache = [
    './',               // Wichtig: Unsere start_url ist "./", also müssen wir diese auch cachen, obwohl index.html schon in der Liste ist.
    './index.html',     // Dieser Eintrag ist eigentlich redundant, da die start_url, also "./" bereits auf index.html zeigt.
    './style.css',
]

self.addEventListener('install', event => {
    console.info('Der ServiceWorker wird installiert 🛠️')

    // Statische Dateien in den statischen Cache cachen.
    // Das passiert asynchron, deshalb wird event.waitUntil() genutzt.
    // Hinweis: Es können mehrere caches genutzt werden, z.B. einer für statische Dateien, ein anderer für Assets oder JS Dateien. Dadurch können verschiedene Resourcen-Kategorien getrennt voneinander gecached und bei Bedarf aus dem Cache geworfen werden.
    event.waitUntil(
        caches.open(staticCache).then(cache => {
            return cache.addAll(staticFilesToCache)
        })
    )
})

self.addEventListener('activate', event => {
    console.info('Der ServiceWorker wird aktiviert 🚀')

    // Hier werden alte Caches gelöscht, wenn sich die Version des Caches geändert hat.
    // Vorsicht: Wenn man mehrere Caches nutzt, muss sichergestellt werden, dass auch wirklich nur die alten Caches gelöscht werden!
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== staticCache) {
                        return caches.delete(cacheName)
                    }
                })
            )
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
function tryToLoadFromNetwork (request, timeout = 10000) {
    console.info(`Versuche Datei ${request.url} aus dem Netzwerk zu laden... 🌐`)
    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(reject, timeout)
        fetch(request).then(response => {
            clearTimeout(timeoutId)

            // Wenn die Datei eine ist, die wir cachen wollen, updaten wir den cache mit einem Klon der Antwort
            if (staticFilesToCache.includes(request.url)) {
                updateStaticCache(request, response.clone())
            }

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
    caches.open(staticCache)
        .then(cache => {
            cache.put(request, response)
        })
}

// Wenn eine Anfrage an das Netzwerk gestellt wird, wird zuerst versucht, die Datei aus dem Netzwerk zu laden.
// Wenn das nicht funktioniert, wird versucht, die Datei aus dem Cache zu laden.
self.addEventListener('fetch', event => {
    event.respondWith(
        tryToLoadFromNetwork(event.request, 10000).catch(() => {
            console.info('Fehler beim Laden aus dem Netzwerk, versuche aus dem Cache zu laden... 🗄️')
            return caches.open(staticCache).then(cache => {
                return cache.match(event.request, {ignoreSearch: true}).then(response => {
                    return response || new Response(null, {status: 404, statusText: 'Not found'})
                })
            })
        })
    )
})
