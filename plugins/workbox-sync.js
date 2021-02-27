const bgSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin('formQueue', {
    maxRetentionTime: 24 * 60
});

workbox.routing.registerRoute ( 
  new RegExp('https://postman-echo.com/put'), 
  new workbox.strategies.NetworkOnly ({ 
    plugins: [bgSyncPlugin] 
  }), 
  'PUT' 
);