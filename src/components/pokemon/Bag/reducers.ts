import { Reducer } from 'redux';
import { PokemonBagActionTypes } from './types';

export const bag: Reducer<string[]> = (state = [], action) => {
  switch (action.type) {
    case PokemonBagActionTypes.ADD:
      return [...state, action.payload];
    case PokemonBagActionTypes.REMOVE:
      const index = state.indexOf(action.payload);
      if (index >= 0) {
        return [...state.slice(0, index), ...state.slice(index + 1)];
      }
      return state;
    default:
      return state;
  }
};

export type PokemonBagState = ReturnType<typeof bag>;

export function getInBag(state: PokemonBagState, id: string) {
  return state.includes(id);
}

export function getBagItems(state: PokemonBagState) {
  return state;
}

export function getLength(state: PokemonBagState) {
  return state.length;
}
