import { combineReducers } from 'redux';
import {
  RootState as PokemonState,
  pokemonReducer,
} from './components/pokemon/List/reducers';

import { reducers as pokemonDetailReducer } from './components/pokemon/Detail/reducers';
import { reducers as pokemonMapReducer } from './components/pokemon/Map/reducers';

export interface ApplicationState {
  pokemon: PokemonState;
}
export const rootReducer = combineReducers<ApplicationState>({
  pokemon: pokemonReducer,
  pokemonDetail: pokemonDetailReducer,
  pokemonMap: pokemonMapReducer,
});
