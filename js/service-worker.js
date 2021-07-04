if ('serviceWorker' in navigator) 
{
	window.addEventListener('load', function() 
	{
		navigator.serviceWorker.register('./js/service-worker.js', { scope: '/' }).then(function(registration) 
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
			//console.log('Deleting cache: ' + key)
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
				const urlsToCache = [
				'/',
				'/css/styles.css',
				'/css/fonts.css',
				'/css/mdesign.css',
				'/css/styles_history.css',
				
				
				'/fonts/ProductSans-Regular/ProductSans-Regular.woff',
				'/fonts/MaterialIcons-Regular/MaterialIcons-Regular.woff2',
				
				'/resource/images/utinkaLogo.png',
				
				'/js/jquery.js',
				'/js/index.js',
				'/js/pages.js',
				
				'/pages/history.html',
				'/pages/csharp.html',
				'/pages/html.html',
				'/pages/css.html',
				'/pages/javascript.html',
				'/pages/php.html',
				'/pages/help.html',
				];
				cache.addAll(urlsToCache)
				//console.log('cached');
			})
		}));
	}
});


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

