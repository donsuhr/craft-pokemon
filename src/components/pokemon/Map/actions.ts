import { action } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import config from '../../../config';
import { PokemonMapActionTypes } from './types';
import { ApplicationState } from '../../../reducers';

import { getItemById } from './reducers';

export const request = (id) => action(PokemonMapActionTypes.REQUEST, { id });
export const receive = (data: any, id) =>
  action(PokemonMapActionTypes.RECEIVE, { data, id });

function fetchItem(
  id,
): ThunkAction<void, ApplicationState, unknown, Action<string>> {
  return (dispatch) => {
    dispatch(request(id));
    const url =
      // process.env.NODE_ENV === 'production'
      // ? [> istanbul ignore next <]
      // `${config['craft-demo'].url}/${id}`;
      '/components/pokemon/Map/fixtures/1.json';
    setTimeout(() => {
      fetch(url, {
        headers: {
          'x-api-key': config['craft-demo'].key,
        },
      })
        .then((response) => response.json())
        .then((json) => dispatch(receive(json, id)));
    }, 4000);
  };
}

function shouldFetch(state: ApplicationState, id) {
  const item = getItemById(state.pokemonMap, id);
  if (!item?.hasEverLoaded) {
    return true;
  }
  return false;
}

export function fetchIfNeeded(
  id,
): ThunkAction<void, ApplicationState, unknown, Action<string>> {
  return (dispatch, getState) => {
    if (shouldFetch(getState(), id)) {
      return dispatch(fetchItem(id));
    }
    return false;
  };
}
