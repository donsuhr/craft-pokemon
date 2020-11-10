import { combineReducers, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import Fuse from 'fuse.js';
import {
  RootState as PokemonState,
  pokemonReducer,
  getItemById,
} from '../components/pokemon/List/reducers';

import {
  reducers as pokemonDetailReducer,
  PokemonDetailState,
  getItemById as itemDetailById,
} from '../components/pokemon/Detail/reducers';
import { reducers as pokemonMapReducer } from '../components/pokemon/Map/reducers';
import { bag as pokemonBagReducer } from '../components/pokemon/Bag/reducers';
import { ui as uiReducer } from './ui/reducers';

export interface ApplicationState {
  pokemon: PokemonState;
  pokemonDetail: PokemonDetailState;
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  ApplicationState,
  unknown,
  Action<string>
>;

let currentFilter = '';

export const rootReducer = combineReducers<ApplicationState>({
  pokemon: pokemonReducer,
  pokemonDetail: pokemonDetailReducer,
  pokemonMap: pokemonMapReducer,
  pokemonBag: pokemonBagReducer,
  ui: uiReducer,
});

export function filterItems(state: ApplicationState) {
  // const inBag = state.pokemonBag.map(id => state.pokemon.byId[id]);
  let items = Object.values(state.pokemon.byId);
  const showAll = state.ui.viewAll;
  if (!showAll) {
    items = items.filter((x) => state.pokemonBag.includes(x.id));
  }
  const filterText = state.ui.filterText.trim();
  if (filterText !== currentFilter || filterText !== '') {
    currentFilter = filterText;
    if (filterText === '') {
      return items;
    }
    const options = {
      keys: ['name'],
    };
    const fuse = new Fuse(items, options);
    return fuse.search(filterText).map((x) => x.item);
  }
  return items;
}

const getDetailState = (state: ApplicationState) => state.pokemonDetail;
export const getBagState = (state: ApplicationState) => {
  return state.pokemonBag;
};

export function getItemDetailById(state: ApplicationState, id: string) {
  return itemDetailById(getDetailState(state), id);
}
