import { action } from 'typesafe-actions';
import { PokemonBagActionTypes } from './types';

export const add = (id: string) => action(PokemonBagActionTypes.ADD, id);
export const remove = (id: string) => action(PokemonBagActionTypes.REMOVE, id);
