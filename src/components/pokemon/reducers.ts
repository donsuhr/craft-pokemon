import { Reducer, combineReducers } from 'redux';
import { PokemonActionTypes, Item, Items } from './types';

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
      return action.payload.results.reduce((acc: Items, x: Item) => {
        const id = x.url.replace(/\/$/, '').split('/').pop();
        acc[id!] = { id, ...x };
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

export type RootState = ReturnType<typeof pokemonReducer>;

export function getItemById(state: RootState, id: string) {
  return state.byId[id];
}
