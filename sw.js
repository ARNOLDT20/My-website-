/* Retire the old third-party worker that imported an external advertising script. */
self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  event.waitUntil(self.registration.unregister());
});
