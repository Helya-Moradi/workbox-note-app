importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

console.log('src sw')

const sheetCacheName = 'google-fonts-stylesheets';
const fontCacheName = 'google-fonts-webfonts';
const maxAgeSeconds = 60 * 60 * 24 * 365;
const maxEntries = 30;

self.addEventListener('message', event => {
    if (event.data && event.data.type === 'skip_waiting') {
        self.skipwaiting();
    }
});

workbox.core.clientsClaim();

workbox.routing.registerRoute(
    ({url}) => url.origin === 'https://fonts.googleapis.com',
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: sheetCacheName,
    })
);

workbox.routing.registerRoute(
    ({url}) => url.origin === 'https://fonts.gstatic.com',
    new workbox.strategies.CacheFirst({
        cacheName: fontCacheName,
        plugins: [
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds,
                maxEntries,
            }),
        ],
    })
);

workbox.precaching.precacheAndRoute([{"revision":"2b5fd8328e6c4bf9c1d8cf49d09eca66","url":"css/style.css"},{"revision":"03fab9928087ec39a0ce801da8021e4d","url":"icons/Icon-108@2x.png"},{"revision":"e780bdf346c502e0fddecaeadd683e54","url":"icons/Icon-40@2x.png"},{"revision":"35d9c9f44774d3146ec0541941e53ffa","url":"index.html"},{"revision":"3a84347977346a71c413b86b74ccc368","url":"js/app.js"},{"revision":"fe7c1b5a73f6b473309b16889182e00f","url":"workbox-6ef0d057.js"},{"revision":"880fea78bae6a3b60ee394972995a880","url":"workbox-config.js"}]);