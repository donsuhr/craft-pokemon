import config from '@/config';

export function getEndpointLastPart(url: URL) {
  return url.pathname.replace(/\/$/, '').split('/').pop();
}

export function isPokeapiDetailPath({
  url,
  bagItems,
  inBag = false,
}: {
  url: URL;
  bagItems: string[];
  inBag: boolean;
}) {
  const lastPart = getEndpointLastPart(url);
  const is = url.hostname === 'pokeapi.co' && /\d+/g.test(lastPart!);
  if (is && inBag) {
    return is && bagItems.includes(lastPart!);
  }
  return is;
}

export function isBagImage({
  url,
  bagItems,
  request,
}: {
  url: URL;
  bagItems: string[];
  request: Request;
}) {
  if (request.destination !== 'image') {
    return false;
  }
  const img = getEndpointLastPart(url);
  return bagItems.includes(img!.split('.').slice(-2, -1)[0]);
}

export function bagCacheMatch({
  url,
  bagItems,
  request,
}: {
  url: URL;
  bagItems: string[];
  request: Request;
}) {
  return (
    isPokeapiDetailPath({ url, bagItems, inBag: true }) ||
    isBagImage({ url, bagItems, request })
  );
}

export function apiCacheMatch({
  url,
  bagItems,
  request,
}: {
  url: URL;
  bagItems: string[];
  request: Request;
}) {
  return (
    url.hostname === 'pokeapi.co' && !bagCacheMatch({ url, bagItems, request })
  );
}

export function locationApiMatch({ url }: { url: URL; request: Request }) {
  return url.href.startsWith(config['craft-demo'].url);
}
