import { action } from 'typesafe-actions';
import { PokemonDetailsActionTypes } from './types';

export const requestDetails = (id: string) =>
  action(PokemonDetailsActionTypes.REQUEST_DETAILS, { id });
export const receiveDetails = (data: any, id: string) =>
  action(PokemonDetailsActionTypes.RECEIVE_DETAILS, { data, id });
export const receiveError = (error: any, id: string) =>
  action(PokemonDetailsActionTypes.ERROR, { error, id });
export const receiveOffline = (id: string) =>
  action(PokemonDetailsActionTypes.OFFLINE, { id });

type RecieveDetailsActionType = ReturnType<typeof receiveDetails>;
type RequestDetailsActionType = ReturnType<typeof requestDetails>;
type ErrorType = ReturnType<typeof receiveError>;
type OfflineType = ReturnType<typeof receiveOffline>;

export type ActionTypes =
  | RecieveDetailsActionType
  | RequestDetailsActionType
  | ErrorType
  | OfflineType;
