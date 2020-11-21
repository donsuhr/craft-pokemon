import { AppThunk } from '@/store/types';
import config from '@/config';
import { checkFetchResponse, parseJSON } from '@/service/util';
import { getListState } from '@/store/selectors';
import { shouldFetchItems } from './reducers';
import {
  receiveSuccess,
  request,
  receiveError,
  receiveOffline,
} from './actions-sync';

function fetchItems(): AppThunk {
  return (dispatch) => {
    dispatch(request());
    const url =
      process.env.DEV_USE_FIXTURE_FOR_API === 'true'
        ? /* istanbul ignore next */
          '/components/pokemon/List/fixtures/items.json'
        : `${config.pokeapi.url}/pokemon/?limit=2000`;
    // can query param limit and offset: https://pokeapi.co/docs/v2
    return fetch(url)
      .then(checkFetchResponse)
      .then(parseJSON)
      .then((json) => {
        if (json.offline) {
          dispatch(receiveOffline());
        } else {
          dispatch(receiveSuccess(json));
        }
      })
      .catch((e) => {
        dispatch(receiveError(e));
      });
  };
}

export function fetchItemsIfNeeded(): AppThunk {
  return (dispatch, getState) => {
    const pokemonState = getListState(getState());
    if (shouldFetchItems(pokemonState)) {
      return dispatch(fetchItems());
    }
    return false;
  };
}
