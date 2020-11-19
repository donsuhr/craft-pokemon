import { action } from 'typesafe-actions';
import { PokemonDetailsActionTypes } from './types';

export const request = (id: string) =>
  action(PokemonDetailsActionTypes.REQUEST_DETAILS, { id });
export const receiveSuccess = (data: any, id: string) =>
  action(PokemonDetailsActionTypes.RECEIVE_DETAILS, { data, id });
export const receiveError = (error: any, id: string) =>
  action(PokemonDetailsActionTypes.ERROR, { error, id });
export const receiveOffline = (id: string) =>
  action(PokemonDetailsActionTypes.OFFLINE, { id });

type RequestActionType = ReturnType<typeof request>;
type ReceiveSuccessActionType = ReturnType<typeof receiveSuccess>;
type ErrorActionType = ReturnType<typeof receiveError>;
type OfflineActionType = ReturnType<typeof receiveOffline>;

export type ActionTypes =
  | ReceiveSuccessActionType
  | RequestActionType
  | ErrorActionType
  | OfflineActionType;
