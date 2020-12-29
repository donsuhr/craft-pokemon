import {
  apiCacheFirstStrategy,
  imgCacheFirstStrategy,
  bagCacheFirstStrategy,
  locationNetworkOnlyStrategy,
  // @ts-ignore
} from './cache-strategies';

import { isBagImage } from './route-matchers';

// copied from workbox/src/types becuase reasons
interface ExtendableEvent extends Event {
  waitUntil(fn: Promise<any>): void;
}

interface RouteHandlerCallbackOptions {
  request: Request | string;
  url?: URL;
  event?: ExtendableEvent;
  params?: string[] | { [paramName: string]: string };
}

const offlineImage = `<svg role="img" aria-labelledby="offline-title"
                        viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                        <title id="offline-title">Offline</title>
                        <g fill="none" fill-rule="evenodd"><path fill="#D8D8D8" d="M0 0h400v300H0z"/>
                        <text fill="#9B9B9B" font-family="Times New Roman,Times,serif" font-size="72" font-weight="bold">
                        <tspan x="93" y="172">offline</tspan></text></g>
                    </svg>`;

const getOfflineJsonResponse = () => {
  const data = { offline: true };
  const blob = new Blob([JSON.stringify(data)], {
    type: 'application/json',
  });

  return new Response(blob, {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  });
};

const apiCacheRouteHandler = async (args: RouteHandlerCallbackOptions) => {
  try {
    return await apiCacheFirstStrategy.handle(args);
  } catch (e) {
    return getOfflineJsonResponse();
  }
};

const imgCacheRouteHandler = async (args: RouteHandlerCallbackOptions) => {
  try {
    return await imgCacheFirstStrategy.handle(args);
  } catch (e) {
    return new Response(offlineImage, {
      headers: { 'Content-Type': 'image/svg+xml' },
    });
  }
};

const bagCacheRouteHandler = async (
  args: RouteHandlerCallbackOptions,
  bagItems: string[],
) => {
  try {
    return await bagCacheFirstStrategy.handle(args);
  } catch (e) {
    const url = args.url as URL;
    const request = args.request as Request;
    if (isBagImage({ url, request, bagItems })) {
      return imgCacheFirstStrategy.handle(args);
    }
    return apiCacheFirstStrategy.handle(args);
  }
};

const locationApiRouteHandler = async (args: RouteHandlerCallbackOptions) => {
  try {
    return await locationNetworkOnlyStrategy.handle(args);
  } catch (e) {
    return getOfflineJsonResponse();
  }
};

export {
  apiCacheRouteHandler,
  imgCacheRouteHandler,
  bagCacheRouteHandler,
  locationApiRouteHandler,
};
