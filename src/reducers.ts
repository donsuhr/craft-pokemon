import { combineReducers } from 'redux';
import {
  RootState as PokemonState,
  pokemonReducer,
} from './components/pokemon/reducers';

export interface ApplicationState {
  pokemon: PokemonState;
}
export const rootReducer = combineReducers<ApplicationState>({
  pokemon: pokemonReducer,
});
