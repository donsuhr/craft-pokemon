import { action } from 'typesafe-actions';
import { PokemonMapActionTypes } from './types';

export const request = (id: string) =>
  action(PokemonMapActionTypes.REQUEST, { id });
export const receive = (data: any, id: string) =>
  action(PokemonMapActionTypes.RECEIVE, { data, id });
export const receiveError = (error: any, id: string) =>
  action(PokemonMapActionTypes.ERROR, { error, id });

type RecieveActionType = ReturnType<typeof request>;
type RequestActionType = ReturnType<typeof receive>;
type ErrorActionType = ReturnType<typeof receiveError>;

export type ActionTypes =
  | RecieveActionType
  | RequestActionType
  | ErrorActionType;
