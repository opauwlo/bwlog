    const CACHE = "pwabuilder-precache";
    const precacheFiles = [
        '/',
        '/css/bootstrap.min.css',
        '/css/ckedior.css',
        '/css/content-styles.css',
        '/css/custom.css',
        '/css/loading.css',
        '/css/prism.css',
        '/js/bootstrap.min.js',
        '/js/loading.js',
        '/js/prism.js',
        '/js/search.js',
        '/js/slugNumber.js',
        '/ckeditor',
        '/icon',
        '/img'

    ];
    
    self.addEventListener("install", function (event) {
      console.log("[PWA Builder] Install Event processing");
    
      console.log("[PWA Builder] Skip waiting on install");
      self.skipWaiting();
    
      event.waitUntil(
        caches.open(CACHE).then(function (cache) {
          console.log("[PWA Builder] Caching pages during install");
          return cache.addAll(precacheFiles);
        })
      );
    });
    
    self.addEventListener("activate", function (event) {
      console.log("[PWA Builder] Claiming clients for current page");
      event.waitUntil(self.clients.claim());
    });
    
    self.addEventListener("fetch", function (event) {
      if (event.request.method !== "GET") return;
    
      event.respondWith(
        fromCache(event.request).then(
          function (response) {
            event.waitUntil(
              fetch(event.request).then(function (response) {
                return updateCache(event.request, response);
              })
            );
    
            return response;
          },
          function () {
            return fetch(event.request)
              .then(function (response) {
                event.waitUntil(updateCache(event.request, response.clone()));
    
                return response;
              })
              .catch(function (error) {
                console.log(
                  "[PWA Builder] Network request failed and no cache." + error
                );
              });
          }
        )
      );
    });
    
    function fromCache(request) {
      return caches.open(CACHE).then(function (cache) {
        return cache.match(request).then(function (matching) {
          if (!matching || matching.status === 404) {
            return Promise.reject("no-match");
          }
    
          return matching;
        });
      });
    }
    
    function updateCache(request, response) {
      return caches.open(CACHE).then(function (cache) {
        return cache.put(request, response);
      });
    }