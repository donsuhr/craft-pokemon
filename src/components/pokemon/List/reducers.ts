import { AsyncStatus } from '@/store/types';
import { Reducer, combineReducers } from 'redux';
import { ActionTypes } from './actions-sync';
import { PokemonActionTypes, Items, ResponseItem } from './types';

export const error: Reducer<string | null> = (
  state = null,
  action: ActionTypes,
) => {
  switch (action.type) {
    case PokemonActionTypes.ERROR:
      return action.payload.error.message;
    case PokemonActionTypes.RECEIVE_ITEMS:
    case PokemonActionTypes.REQUEST_ITEMS:
    case PokemonActionTypes.OFFLINE:
      return null;
    default:
      return state;
  }
};

export const status: Reducer<AsyncStatus> = (
  state = AsyncStatus.initial,
  action: ActionTypes,
) => {
  switch (action.type) {
    case PokemonActionTypes.REQUEST_ITEMS:
      return AsyncStatus.loading;
    case PokemonActionTypes.RECEIVE_ITEMS:
      return AsyncStatus.succeeded;
    case PokemonActionTypes.ERROR:
      return AsyncStatus.failed;
    case PokemonActionTypes.OFFLINE:
      return AsyncStatus.offline;
    default:
      return state;
  }
};

export const byId: Reducer<Items> = (state = {}, action: ActionTypes) => {
  switch (action.type) {
    case PokemonActionTypes.RECEIVE_ITEMS:
      return action.payload.results.reduce((acc: Items, x: ResponseItem) => {
        const id = x.url.replace(/\/$/, '').split('/').pop()!;
        acc[id] = { id, ...x };
        return acc;
      }, {});

    default:
      return state;
  }
};

export const pokemonReducer = combineReducers({
  byId,
  status,
  error,
});

export type PokemonListState = ReturnType<typeof pokemonReducer>;

export function shouldFetchItems(state: PokemonListState) {
  if (state.status !== AsyncStatus.succeeded) {
    return true;
  }
  return false;
}

export function getItemById(state: PokemonListState, id: string) {
  return state.byId[id];
}

export function getLength(state: PokemonListState) {
  return Object.keys(state.byId).length;
}
