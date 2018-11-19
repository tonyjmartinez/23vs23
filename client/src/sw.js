workbox.skipWaiting();
workbox.clientsClaim();

workbox.routing.registerRoute(
  new RegExp("https://fonts.(?:googleapis|gstatic).com/(.*)"),
  workbox.strategies.cacheFirst({
    cacheName: "google-fonts",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30
      }),
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  })
);

workbox.routing.registerRoute(
  new RegExp("https://23vs23.com/app2/.*"),
  workbox.strategies.staleWhileRevalidate()
);

workbox.precaching.precacheAndRoute(self.__precacheManifest);
