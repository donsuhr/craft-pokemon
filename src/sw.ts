/* global serviceWorkerVersion, serviceWorkerOption, process */
/* eslint-env serviceworker */
/* chrome://serviceworker-internals/ */

import {
  skipWaiting,
  clientsClaim,
  setCacheNameDetails,
  RouteHandlerCallbackOptions,
} from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { Url } from 'url';

declare const self: ServiceWorkerGlobalScope;

const VERSION: string = serviceWorkerVersion;
const APP_NAME: string = 'pokemon';

console.log('sw2', APP_NAME, VERSION);

const assets = self.__WB_MANIFEST;
self.__WB_DISABLE_DEV_LOGS = true;

setCacheNameDetails({
  prefix: APP_NAME,
  suffix: VERSION,
});

let bagItems = [];

const offlineImage = `<svg role="img" aria-labelledby="offline-title"
                        viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                        <title id="offline-title">Offline</title>
                        <g fill="none" fill-rule="evenodd"><path fill="#D8D8D8" d="M0 0h400v300H0z"/>
                        <text fill="#9B9B9B" font-family="Times New Roman,Times,serif" font-size="72" font-weight="bold">
                        <tspan x="93" y="172">offline</tspan></text></g>
                    </svg>`;

self.addEventListener('message', (event) => {
  if (event.data.type === 'bagUpdated') {
    bagItems = event.data.payload;
  }
});

if (
  process.env.NODE_ENV === 'production' ||
  process.env.DEV_USE_SW_FOR_RUNTIME === 'true'
) {
  precacheAndRoute(assets || []);
}

function getEndpointLastPart(url: Url) {
  return url.pathname.replace(/\/$/, '').split('/').pop();
}

function isPokeapiListPath(url: Url) {
  return (
    url.hostname === 'pokeapi.co' && getEndpointLastPart(url) === 'pokemon'
  );
}

function isPokeapiDetailPath(url: Url, inBag = false) {
  const lastPart = getEndpointLastPart(url);
  const is = url.hostname === 'pokeapi.co' && /\d+/g.test(lastPart);
  if (is && inBag) {
    return is && bagItems.includes(lastPart);
  }
  return is;
}

function bagCacheMatch(url: Url, request: Request) {
  return isPokeapiDetailPath(url, true) || isBagImage(url, request);
}

function apiCacheMatch(url: Url, request: Request) {
  return url.hostname === 'pokeapi.co' && !bagCacheMatch(url, request);
}

function isBagImage(url: Url, request: Request) {
  if (request.destination !== 'image') {
    return false;
  }
  const img = getEndpointLastPart(url);
  return bagItems.includes(img.split('.').slice(-2, -1)[0]);
}

/* cache the bag */
const bagCacheFirst = new CacheFirst({
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

registerRoute(
  ({ url, request }) => bagCacheMatch(url, request),
  async (args: RouteHandlerCallbackOptions) => {
    return await bagCacheFirst.handle(args);
  },
);

/* cache the api calls */
const apiCacheFirst = new CacheFirst({
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

registerRoute(
  ({ url, request }) => apiCacheMatch(url, request),
  async (args: RouteHandlerCallbackOptions) => {
    try {
      return await apiCacheFirst.handle(args);
    } catch (e) {
      const data = { offline: true };
      const blob = new Blob([JSON.stringify(data)], {
        type: 'application/json',
      });

      return new Response(blob, {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
        statusText: 'SuperSmashingGreat!',
      });
    }
  },
);

const imgCacheFirst = new CacheFirst({
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

registerRoute(
  new RegExp('.*raw.githubusercontent.com.*.png$'),
  async (args) => {
    try {
      return await imgCacheFirst.handle(args);
    } catch (e) {
      return new Response(offlineImage, {
        headers: { 'Content-Type': 'image/svg+xml' },
      });
    }
  },
);

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheKeys) =>
        Promise.all(
          cacheKeys
            .filter((key) => !key.includes(VERSION))
            .map((oldKey) => caches.delete(oldKey)),
        ),
      ),
  );
});

skipWaiting();
clientsClaim();
