import { action } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import qrate from 'qrate';
import config from '../../../config';
import { PokemonDetailsActionTypes } from './types';
import { ApplicationState } from '../../../reducers';

import { getItemById } from './reducers';

export const requestDetails = (id) =>
  action(PokemonDetailsActionTypes.REQUEST_DETAILS, {id});
export const receiveDetails = (data: any, id) =>
  action(PokemonDetailsActionTypes.RECEIVE_DETAILS, {data, id});

const fetcher = ({ id, dispatch }, done) => {
  const url =
    // process.env.NODE_ENV === 'production'
    // ? [> istanbul ignore next <]
    // `${config.api.url}/pokemon/${id}`;
    '/components/pokemon/Detail/fixtures/1.json';
  fetch(url)
    .then((response) => response.json())
    .then((json) => dispatch(receiveDetails(json, id)))
    .finally(done);
};

const q = qrate(fetcher, 1, 0.5);

function fetchItem(
  id,
): ThunkAction<void, ApplicationState, unknown, Action<string>> {
  return (dispatch) => {
  dispatch(requestDetails(id));
    q.push({ id, dispatch });
  };
}

function shouldFetch(state: ApplicationState, id) {
  const item = getItemById(state.pokemonDetail, id);
  if (!item?.hasEverLoaded && parseInt(id, 10) < 3) {
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
