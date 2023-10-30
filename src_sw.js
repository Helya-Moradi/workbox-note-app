importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');
import {registerRoute} from 'workbox-routing';
import {StaleWhileRevalidate} from 'workbox-strategies';
import {CacheFirst} from 'workbox-strategies';
import {CacheableResponsePlugin} from 'workbox-cacheable-response';
import {ExpirationPlugin} from 'workbox-expiration';
import {precacheAndRoute} from 'workbox-precaching';

console.log('src sw')

const sheetCacheName = 'google-fonts-stylesheets';
const fontCacheName = 'google-fonts-webfonts';
const maxAgeSeconds = 60 * 60 * 24 * 365;
const maxEntries = 30;

registerRoute(
    ({url}) => url.origin === 'https://fonts.googleapis.com',
    new StaleWhileRevalidate({
        cacheName: sheetCacheName,
    })
);

registerRoute(
    ({url}) => url.origin === 'https://fonts.gstatic.com',
    new CacheFirst({
        cacheName: fontCacheName,
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxAgeSeconds,
                maxEntries,
            }),
        ],
    })
);

precacheAndRoute(self.__WB_MANIFEST);