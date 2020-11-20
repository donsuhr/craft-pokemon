import { combineReducers } from 'redux';
import { ApplicationState } from './types';
import { pokemonReducer } from '../components/pokemon/List/reducers';

import { reducers as pokemonDetailReducer } from '../components/pokemon/Detail/reducers';
import { reducers as pokemonMapReducer } from '../components/pokemon/Map/reducers';
import { bag as pokemonBagReducer } from '../components/pokemon/Bag/reducers';
import { ui as uiReducer } from './ui/reducers';

export const rootReducer = combineReducers<ApplicationState>({
  pokemon: pokemonReducer,
  pokemonDetail: pokemonDetailReducer,
  pokemonMap: pokemonMapReducer,
  pokemonBag: pokemonBagReducer,
  ui: uiReducer,
});
