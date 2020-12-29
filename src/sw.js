/* global __webpack_public_path__ */
/* eslint-env serviceworker */
/* check for lingering sw: chrome://serviceworker-internals/ */
import { skipWaiting, clientsClaim, setCacheNameDetails } from 'workbox-core';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import {
  apiCacheRouteHandler,
  imgCacheRouteHandler,
  bagCacheRouteHandler,
  locationApiRouteHandler,
} from './sw/route-handlers';
import { VERSION, APP_NAME } from './sw/constants';
import {
  apiCacheMatch,
  bagCacheMatch,
  locationApiMatch,
} from './sw/route-matchers';

/* eslint-disable-next-line no-underscore-dangle,no-restricted-globals */
const assets = self.__WB_MANIFEST;
/* eslint-disable-next-line no-underscore-dangle,no-restricted-globals */
self.__WB_DISABLE_DEV_LOGS = true;

setCacheNameDetails({
  prefix: APP_NAME,
  suffix: VERSION,
});

let bagItems = [];

/* eslint-disable-next-line no-restricted-globals */
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
  precacheAndRoute(['https://pokeapi.co/api/v2/pokemon/?limit=2000']);
  const handler = createHandlerBoundToURL(
    `${__webpack_public_path__}index.html`,
  );
  const navigationRoute = new NavigationRoute(handler);
  registerRoute(navigationRoute);
}

registerRoute(
  ({ url, request }) => bagCacheMatch({ url, bagItems, request }),
  (args) => bagCacheRouteHandler(args, bagItems),
);

registerRoute(
  ({ url, request }) => apiCacheMatch({ url, bagItems, request }),
  apiCacheRouteHandler,
);

registerRoute(
  new RegExp('.*raw.githubusercontent.com.*.png$'),
  imgCacheRouteHandler,
);

registerRoute(
  ({ url, request }) => locationApiMatch({ url, request }),
  locationApiRouteHandler,
);

/* eslint-disable-next-line no-restricted-globals */
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
