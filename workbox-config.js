// workbox-config.js

module.exports = {
    globDirectory: 'build/',
    globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,gif,svg,json}'],
    swDest: 'build/service-worker.js',
    clientsClaim: true,
    skipWaiting: true,
    runtimeCaching: [
      {
        urlPattern: new RegExp('^https://api.example.com'),
        handler: 'CacheFirst',
      },
    ],
  };
  