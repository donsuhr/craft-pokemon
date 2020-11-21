import { action } from 'typesafe-actions';
import { PokemonActionTypes } from './types';

export const request = () => action(PokemonActionTypes.REQUEST_ITEMS);
export const receiveSuccess = (data: any) =>
  action(PokemonActionTypes.RECEIVE_ITEMS, data);
export const receiveError = (error: any) =>
  action(PokemonActionTypes.ERROR, { error });
export const receiveOffline = () => action(PokemonActionTypes.OFFLINE);

type RequestActionType = ReturnType<typeof request>;
type ReceiveSuccessActionType = ReturnType<typeof receiveSuccess>;
type ReceiveOfflineActionType = ReturnType<typeof receiveOffline>;
type ReceiveErrorActionType = ReturnType<typeof receiveError>;

export type ActionTypes =
  | RequestActionType
  | ReceiveSuccessActionType
  | ReceiveOfflineActionType
  | ReceiveErrorActionType;
