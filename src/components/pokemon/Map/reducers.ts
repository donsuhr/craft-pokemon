import { combineReducers } from 'redux';
import { AsyncItem, AsyncStatus } from '@/store/types';
import { PokemonMapActionTypes } from './types';
import { ActionTypes } from './actions.sync';

type ItemStateType = AsyncItem & {
  locations: string[];
};

const itemState: ItemStateType = {
  status: AsyncStatus.initial,
  error: null,
  locations: [],
};

const item = (state = itemState, action: ActionTypes) => {
  switch (action.type) {
    case PokemonMapActionTypes.RECEIVE:
      return {
        ...state,
        locations: action.payload.data.locations,
        status: AsyncStatus.succeeded,
      };
    case PokemonMapActionTypes.REQUEST:
      return {
        ...state,
        status: AsyncStatus.loading,
      };
    case PokemonMapActionTypes.ERROR:
      return {
        ...state,
        status: AsyncStatus.failed,
        error: action.payload.error.message,
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
    case PokemonMapActionTypes.ERROR:
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
