import { action } from 'typesafe-actions';
import { PokemonDetailsActionTypes } from './types';

export const requestDetails = (id: string) =>
  action(PokemonDetailsActionTypes.REQUEST_DETAILS, { id });
export const receiveDetails = (data: any, id: string) =>
  action(PokemonDetailsActionTypes.RECEIVE_DETAILS, { data, id });

type RecieveDetailsActionType = ReturnType<typeof receiveDetails>;
type RequestDetailsActionType = ReturnType<typeof requestDetails>;

export type ActionTypes = RecieveDetailsActionType | RequestDetailsActionType;
