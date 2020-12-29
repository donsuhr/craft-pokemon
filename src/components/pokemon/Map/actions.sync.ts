import { action } from 'typesafe-actions';
import { PokemonMapActionTypes } from './types';

export const request = (id: string) =>
  action(PokemonMapActionTypes.REQUEST, { id });
export const receiveSuccess = (data: any, id: string) =>
  action(PokemonMapActionTypes.RECEIVE, { data, id });
export const receiveError = (error: any, id: string) =>
  action(PokemonMapActionTypes.ERROR, { error, id });
export const receiveOffline = (id: string) =>
  action(PokemonMapActionTypes.OFFLINE, { id });

type RequestActionType = ReturnType<typeof receiveSuccess>;
type ReceiveSuccessActionType = ReturnType<typeof request>;
type ErrorActionType = ReturnType<typeof receiveError>;
type OfflineActionType = ReturnType<typeof receiveOffline>;

export type ActionTypes =
  | RequestActionType
  | ReceiveSuccessActionType
  | ErrorActionType
  | OfflineActionType;
