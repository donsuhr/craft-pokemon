import { Reducer, combineReducers } from 'redux';
import { PokemonDetailsActionTypes, Details } from './types';

const defaultImg = '/img/default.png';

const detailsState: Details = {
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
};

const getImgFromData = (data: any) => {
  return (
    data?.sprites?.other?.['official-artwork']?.front_default ||
    data?.sprites?.front_default ||
    defaultImg
  );
};

const details = (state = detailsState, data: any) => {
  return {
    ...state,
    id: data.id,
    name: data.name,
    img: getImgFromData(data),
    height: data.height,
    weight: data.weight,
    baseExperience: data.base_experience,
    types: data.types.map(x => x.type.name),
    abilities: data.abilities.map(x => x.ability.name),
  };
};

const item = (state = itemState, action) => {
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
    default:
      return state;
  }
};

export const byId = (state = {}, action) => {
  switch (action.type) {
    case PokemonDetailsActionTypes.RECEIVE_DETAILS:
    case PokemonDetailsActionTypes.REQUEST_DETAILS:
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

export type PokemonDetailState = ReturnType<typeof reducers>;

export function getItemById(state: PokemonDetailState, id: string) {
  return state.byId[id] || itemState;
}
