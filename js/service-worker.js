if ('serviceWorker' in navigator) 
{
	window.addEventListener('load', function() 
	{
		navigator.serviceWorker.register('/system/js/service-worker.js').then(function(registration) 
		{
			//console.log('ServiceWorker registration successful with scope: ', registration.scope);
		}, 
		function(err) 
		{
			//console.log('ServiceWorker registration failed: ', err);
		}).catch(function(err) 
		{
			console.log(err)
		});
	});
} 

var doCache = true;
var CACHE_NAME = 'UTINKA_PWA';


self.addEventListener('activate', event => 
{
   const cacheWhitelist = [CACHE_NAME];
   event.waitUntil(caches.keys().then(keyList => Promise.all(keyList.map(key => 
   {
		if(!cacheWhitelist.includes(key))
		{
			console.log('Deleting cache: ' + key)
			return caches.delete(key);
		}
	}))));
});
 
self.addEventListener('install', function(event) 
{
	if(doCache) 
	{
		event.waitUntil(caches.open(CACHE_NAME).then(function(cache)
		{
			fetch('/manifest.json').then(response =>
			{
				response.json()
			}).then(assets => 
			{
				// Открываем и кэшируем нужные страницы и файлы
				const urlsToCache = ['/']
				cache.addAll(urlsToCache)
				console.log('cached');
			})
		}));
	}
});

// Когда приложение запущено, сервис-воркер перехватывает запросы и отвечает на них данными из кэша, если они есть
self.addEventListener('fetch', function(event)
{
	if(doCache)
	{
		event.respondWith(caches.match(event.request).then(function(response) 
		{
			return response || fetch(event.request);
		}));
	}
});