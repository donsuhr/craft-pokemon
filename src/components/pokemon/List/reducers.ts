import { Reducer, combineReducers } from 'redux';
import { PokemonActionTypes, Items, ResponseItem } from './types';

export const hasEverLoaded: Reducer<boolean> = (state = false, action) => {
  switch (action.type) {
    case PokemonActionTypes.RECEIVE_ITEMS:
      return true;
    default:
      return state;
  }
};

export const isFetching: Reducer<boolean> = (state = false, action) => {
  switch (action.type) {
    case PokemonActionTypes.REQUEST_ITEMS:
      return true;
    case PokemonActionTypes.RECEIVE_ITEMS:
      return false;
    default:
      return state;
  }
};

export const byId: Reducer<Items> = (state = {}, action) => {
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
  isFetching,
  hasEverLoaded,
});

export type PokemonListState = ReturnType<typeof pokemonReducer>;

export function getItemById(state: PokemonListState, id: string) {
  return state.byId[id];
}
