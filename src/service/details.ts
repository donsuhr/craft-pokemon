import config from '@/config';
import { checkFetchResponse, parseJSON } from '@/service/util';

export async function getDetails(id: string) {
  const url =
    process.env.DEV_USE_FIXTURE_FOR_API === 'true'
      ? /* istanbul ignore next */
        '/components/pokemon/Detail/fixtures/1.json'
      : `${config.pokeapi.url}/pokemon/${id}`;
  const response = await fetch(url).then(checkFetchResponse);
  return parseJSON(response);
}
