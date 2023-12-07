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


self.addEventListener('push', (event) => {
    const options = {
      body: event.data.text(),
    };
  
    event.waitUntil(
      self.registration.showNotification('Timer Alert', options)
    );
  });

  // public/service-worker.js

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
  
    // Add your custom logic to handle the notification click
    // For example, open a specific page or focus the app
    // self.clients.openWindow('/path-to-your-page');
  });
  
