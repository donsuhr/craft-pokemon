import config from '@/config';
import { AppThunk } from '@/store/types';
import { getMapState } from '@/store/selectors';
import { getItemById, PokemonMapState } from './reducers';
import { request, receive } from './actions.sync';

function fetchItem(id: string): AppThunk {
  return (dispatch) => {
    dispatch(request(id));
    const url =
      process.env.DEV_USE_FIXTURE_FOR_API === 'true'
        ? /* istanbul ignore next */
          '/components/pokemon/Map/fixtures/1.json'
        : `${config['craft-demo'].url}/${id}`;
    fetch(url, {
      headers: {
        'x-api-key': config['craft-demo'].key,
      },
    })
      .then((response) => response.json())
      .then((json) => dispatch(receive(json, id)));
  };
}

function shouldFetch(state: PokemonMapState, id: string) {
  const item = getItemById(state, id);
  if (!item?.hasEverLoaded) {
    return true;
  }
  return false;
}

export function fetchIfNeeded(id: string): AppThunk {
  return (dispatch, getState) => {
    if (shouldFetch(getMapState(getState()), id)) {
      return dispatch(fetchItem(id));
    }
    return false;
  };
}
