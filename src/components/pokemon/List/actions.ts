import { action } from 'typesafe-actions';
import { ApplicationState, AppThunk } from '@/store/types';
import config from '@/config';
import { PokemonActionTypes } from './types';

export const requestItems = () => action(PokemonActionTypes.REQUEST_ITEMS);
export const receiveItems = (data: any) =>
  action(PokemonActionTypes.RECEIVE_ITEMS, data);

type RecieveItemsActionType = ReturnType<typeof receiveItems>;
type RequestItemsActionType = ReturnType<typeof requestItems>;

export type ActionTypes = RequestItemsActionType | RecieveItemsActionType;

function fetchItems(): AppThunk {
  return (dispatch) => {
    dispatch(requestItems());
    const url =
      // process.env.NODE_ENV === 'production'
      // ? [> istanbul ignore next <]
      `${config.pokeapi.url}/pokemon/?limit=151`;
    // '/components/pokemon/List/fixtures/items.json';

    return fetch(url)
      .then((response) => response.json())
      .then((json) => dispatch(receiveItems(json)));
  };
}

function shouldFetchItems(state: ApplicationState) {
  if (!state.pokemon.hasEverLoaded) {
    return true;
  }
  return false;
}

export function fetchItemsIfNeeded(): AppThunk {
  return (dispatch, getState) => {
    if (shouldFetchItems(getState())) {
      return dispatch(fetchItems());
    }
    return false;
  };
}
