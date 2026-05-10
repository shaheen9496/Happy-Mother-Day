const cacheName = 'moms-v9';

self.addEventListener('install', event => {
	self.skipWaiting();

	event.waitUntil(
		caches.open(cacheName).then(cache => {
			return cache.addAll([
				'./',
				'index.html',
				'css/common.css',
				'css/message.css', // Remove index.css if you aren't using it in this file
				'fonts/Montserrat-Regular.ttf',
				'images/bg.png',
				'images/bg-mobile.png',
				'images/down-arrow.png',
				'js/message.js',
				// ... other external links
			]);
		})
	);
});

self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys().then(keys => Promise.all(
			keys.map(key => key !== cacheName ? caches.delete(key) : Promise.resolve())
		))
	);
});

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request).then(response => response || fetch(event.request))
	);
});
