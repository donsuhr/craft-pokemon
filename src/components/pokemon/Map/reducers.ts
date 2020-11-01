import {  combineReducers } from 'redux';
import { PokemonMapActionTypes  } from './types';

const itemState = {
  isFetching: false,
  hasEverLoaded: false,
  locations: []
}


const item = (state = itemState, action) => {
  switch (action.type) {
    case PokemonMapActionTypes.RECEIVE:
      return {
        ...state,
        locations:  action.payload.data.locations,
        isFetching: false,
      };
    case PokemonMapActionTypes.REQUEST:
      return {
        ...state,
        isFetching: true,
        hasEverLoaded: true,
      };
    default:
      return state;
  }
};

export const byId = (state = {}, action) => {
  switch (action.type) {
    case PokemonMapActionTypes.RECEIVE:
    case PokemonMapActionTypes.REQUEST:
      const { id } = action.payload;
      return {
        ...state,
        [id]: item(state[id], action),
      };
    default:
      return state;
  }
};

export const reducers = combineReducers({
  byId,
});

export type PokemonMapState = ReturnType<typeof reducers>;

export function getItemById(state: PokemonMapState, id: string) {
  return state.byId[id] || itemState;
}
