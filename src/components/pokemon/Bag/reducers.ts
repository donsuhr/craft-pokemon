import { PokemonBagActionTypes } from './types';

export const bag = (state = [], action) => {
  switch (action.type) {
    case PokemonBagActionTypes.ADD:
      return [...state, action.payload];
    case PokemonBagActionTypes.REMOVE:
      const index = state.indexOf(action.payload);
      if (index >= 0) {
        return [...state.slice(0, index), ...state.slice(index + 1)];
      }
    default:
      return state;
  }
};

export type PokemonBagState = ReturnType<typeof bag>;

export function getInBag(state: PokemonBagState, id) {
  return state.includes(id);
}
