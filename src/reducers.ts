import { combineReducers } from 'redux';
import {
  RootState as PokemonState,
  pokemonReducer,
} from './components/pokemon/List/reducers';

import { reducers as pokemonDetailReducer } from './components/pokemon/Detail/reducers';
import { reducers as pokemonMapReducer } from './components/pokemon/Map/reducers';
import { bag as pokemonBagReducer } from './components/pokemon/Bag/reducers';
import { ui as uiReducer } from './components/ui/reducers';

export interface ApplicationState {
  pokemon: PokemonState;
}
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
  return items;
}
