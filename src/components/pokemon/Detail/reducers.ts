import { combineReducers } from 'redux';
import { PokemonDetailsActionTypes, IDetails, IAbility, IType } from './types';
import { ActionTypes } from './actions-sync';

const defaultImg = '/img/default.png';

const detailsState: IDetails = {
  name: '',
  id: '0',
  img: defaultImg,
  height: 0,
  weight: 0,
  types: [],
  baseExperience: 0,
  abilities: [],
};

const itemState = {
  hasEverLoaded: false,
  isFetching: false,
  details: detailsState,
  // TODO:
  // status: 'idle' | 'loading' | 'succeeded' | 'failed',
  // error: string | null
};

const getImgFromData = (data: any) => {
  return (
    data?.sprites?.other?.['official-artwork']?.front_default ||
    data?.sprites?.front_default ||
    defaultImg
  );
};

const details = (state: IDetails, data: any) => {
  return {
    ...state,
    id: data.id,
    name: data.name,
    img: getImgFromData(data),
    height: data.height,
    weight: data.weight,
    baseExperience: data.base_experience,
    types: data.types.map((x: IType) => x.type.name),
    abilities: data.abilities.map((x: IAbility) => x.ability.name),
  };
};

const processItem = (state = itemState, action: ActionTypes) => {
  switch (action.type) {
    case PokemonDetailsActionTypes.RECEIVE_DETAILS:
      return {
        ...state,
        details: details(state.details, action.payload.data),
        isFetching: false,
      };
    case PokemonDetailsActionTypes.REQUEST_DETAILS:
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

type ByIdType = { [x: string]: typeof itemState };

export const byId: (
  state: ByIdType | undefined,
  action: ActionTypes,
) => ByIdType = (state = {}, action) => {
  switch (action.type) {
    case PokemonDetailsActionTypes.RECEIVE_DETAILS:
    case PokemonDetailsActionTypes.REQUEST_DETAILS:
      const { id } = action.payload;
      return {
        ...state,
        [id]: processItem(state[id], action),
      };
    default:
      return state;
  }
};

export const reducers = combineReducers({
  byId,
});

export type PokemonDetailState = ReturnType<typeof reducers>;

export function getItemById(state: PokemonDetailState, id: string) {
  return state.byId[id] || itemState;
}

export function shouldFetch(state: PokemonDetailState, id: string) {
  const item = getItemById(state, id);
  const underLimit = process.env.DEV_LIMIT_DETAIL_LOAD
    ? parseInt(id, 10) < parseInt(process.env.DEV_LIMIT_DETAIL_LOAD, 10)
    : true;
  if (!item?.hasEverLoaded && underLimit) {
    return true;
  }
  return false;
}
