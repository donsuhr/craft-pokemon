import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { Search } from 'history';
import { PokemonListState } from '../components/pokemon/List/reducers';
import { PokemonDetailState } from '../components/pokemon/Detail/reducers';
import { PokemonBagState } from '../components/pokemon/Bag/reducers';
import { UiState } from './ui/reducers';
import { PokemonMapState } from '../components/pokemon/Map/reducers';

export enum RootActionTypes {
  INIT = '@@root/INIT',
}

export interface ApplicationState {
  pokemon: PokemonListState;
  pokemonDetail: PokemonDetailState;
  pokemonBag: PokemonBagState;
  ui: UiState;
  pokemonMap: PokemonMapState;
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  ApplicationState,
  unknown,
  Action<string>
>;

export enum AsyncStatus {
  offline = 'Offline',
  initial = 'Initial',
  loading = 'Loading',
  succeeded = 'Succeeded',
  failed = 'Failed',
}

export type AsyncItem = {
  status: AsyncStatus;
  error: string | null;
};

export type LocationState = {
  search: Search;
};
