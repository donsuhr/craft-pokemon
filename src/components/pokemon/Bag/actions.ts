import { action } from 'typesafe-actions';
import { PokemonBagActionTypes } from './types';

export const add = (id) => action(PokemonBagActionTypes.ADD, id);
export const remove = (id:any) =>
  action(PokemonBagActionTypes.REMOVE, id);
