import { combineReducers } from 'redux';
import { PokemonMapActionTypes } from './types';
import { ActionTypes } from './actions.sync';

type ItemStateType = {
  isFetching: boolean;
  hasEverLoaded: boolean;
  locations: string[];
};

const itemState: ItemStateType = {
  isFetching: false,
  hasEverLoaded: false,
  locations: [],
};

const item = (state = itemState, action: ActionTypes) => {
  switch (action.type) {
    case PokemonMapActionTypes.RECEIVE:
      return {
        ...state,
        locations: action.payload.data.locations,
        isFetching: false,
      };
    case PokemonMapActionTypes.REQUEST:
      return {
        ...state,
        isFetching: true,
        hasEverLoaded: true,
      };
    /* istanbul ignore next */
    default:
      return state;
  }
};

type ByIdType = { [x: string]: ItemStateType };

export const byId: (
  state: ByIdType | undefined,
  action: ActionTypes,
) => ByIdType = (state = {}, action) => {
  switch (action.type) {
    case PokemonMapActionTypes.RECEIVE:
    case PokemonMapActionTypes.REQUEST:
      /* eslint-disable-next-line no-case-declarations */
      const { id } = action.payload;
      return {
        ...state,
        [id]: item(state[id], action),
      };
    default:
      /* istanbul ignore next */
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
