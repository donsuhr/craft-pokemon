import { CacheFirst, NetworkOnly } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { VERSION, APP_NAME } from './constants';

const apiCacheFirstStrategy = new CacheFirst({
  cacheName: `${APP_NAME}-api-${VERSION}`,
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 60 * 60 * 24 * 1,
      maxEntries: 151,
    }),
  ],
});

const imgCacheFirstStrategy = new CacheFirst({
  cacheName: `${APP_NAME}-images-${VERSION}`,
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 60 * 60 * 24 * 365,
      maxEntries: 50,
    }),
  ],
});

const bagCacheFirstStrategy = new CacheFirst({
  cacheName: `${APP_NAME}-bag-${VERSION}`,
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 60 * 60 * 24 * 1,
      maxEntries: 151,
    }),
  ],
});

const locationNetworkOnlyStrategy = new NetworkOnly({
  cacheName: `${APP_NAME}-loc-api-${VERSION}`,
});

export {
  apiCacheFirstStrategy,
  imgCacheFirstStrategy,
  bagCacheFirstStrategy,
  locationNetworkOnlyStrategy,
};
