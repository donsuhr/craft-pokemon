import { action } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import config from '../../../config';
import { PokemonActionTypes } from './types';
import { ApplicationState } from '../../../reducers';

export const requestItems = () => action(PokemonActionTypes.REQUEST_ITEMS);
export const receiveItems = (data: any) =>
  action(PokemonActionTypes.RECEIVE_ITEMS, data);

function fetchItems(): ThunkAction<
  void,
  ApplicationState,
  unknown,
  Action<string>
> {
  return (dispatch) => {
    dispatch(requestItems());
    const url =
      // process.env.NODE_ENV === 'production'
      // ? [> istanbul ignore next <]
      `${config.api.url}/pokemon/?limit=151`;
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

export function fetchItemsIfNeeded(): ThunkAction<
  void,
  ApplicationState,
  unknown,
  Action<string>
> {
  return (dispatch, getState) => {
    if (shouldFetchItems(getState())) {
      return dispatch(fetchItems());
    }
    return false;
  };
}
