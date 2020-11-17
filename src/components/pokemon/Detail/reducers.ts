import { combineReducers } from 'redux';
import { AsyncItem, AsyncStatus } from '@/store/types';
import {
  PokemonDetailsActionTypes,
  IDetails,
  IAbility,
  IType,
  Requestor,
} from './types';
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

type AsyncDetailsType = AsyncItem & {
  details: IDetails;
};

const itemState: AsyncDetailsType = {
  details: detailsState,
  status: AsyncStatus.initial,
  error: null,
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
        status: AsyncStatus.succeeded,
      };
    case PokemonDetailsActionTypes.REQUEST_DETAILS:
      return {
        ...state,
        status: AsyncStatus.loading,
      };

    case PokemonDetailsActionTypes.OFFLINE:
      return {
        ...state,
        status: AsyncStatus.offline,
      };
    case PokemonDetailsActionTypes.ERROR:
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

type ByIdType = { [x: string]: AsyncDetailsType };

export const byId: (
  state: ByIdType | undefined,
  action: ActionTypes,
) => ByIdType = (state = {}, action) => {
  switch (action.type) {
    case PokemonDetailsActionTypes.RECEIVE_DETAILS:
    case PokemonDetailsActionTypes.REQUEST_DETAILS:
    case PokemonDetailsActionTypes.ERROR:
    case PokemonDetailsActionTypes.OFFLINE:
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

export function shouldFetch(
  state: PokemonDetailState,
  {
    id,
    retry,
    requestor,
  }: { id: string; retry?: boolean; requestor?: Requestor },
) {
  const item = getItemById(state, id);
  const shouldRetry =
    retry &&
    (item.status === AsyncStatus.failed || item.status === AsyncStatus.offline);
  const useLimit =
    requestor &&
    requestor === Requestor.ListItem &&
    process.env.DEV_LIMIT_DETAIL_LOAD;
  const underLimit = useLimit
    ? parseInt(id, 10) < parseInt(process.env.DEV_LIMIT_DETAIL_LOAD!, 10)
    : true;
  if ((shouldRetry || item.status === AsyncStatus.initial) && underLimit) {
    return true;
  }
  return false;
}
