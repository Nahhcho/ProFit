// src/service-worker.js

// Workbox service worker registration
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';

precacheAndRoute(self.__WB_MANIFEST);

// Cache external resources using CacheFirst strategy
registerRoute(
  /^https:\/\/api.example.com/,
  new CacheFirst()
);
