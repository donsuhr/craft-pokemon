import { action } from 'typesafe-actions';
import { getDetails } from '@/service/details';
import { AppThunk } from '@/store/types';
import { PokemonBagActionTypes } from './types';

export const add = (id: string) => action(PokemonBagActionTypes.ADD, id);
export const remove = (id: string) => action(PokemonBagActionTypes.REMOVE, id);

/* re requests the details to move it to bag cache from api cache */
export const addAndCache = (id: string): AppThunk => (dispatch) => {
  dispatch(add(id));
  setTimeout(() => {
    getDetails(id);
  }, 1000);
};
