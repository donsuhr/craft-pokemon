export enum PokemonActionTypes {
  REQUEST_ITEMS = '@@pokemon/REQUEST_ITEMS',
  RECEIVE_ITEMS = '@@pokemon/RECEIVE_ITEMS',
  ERROR = '@@pokemon/ERROR',
  OFFLINE = '@@pokemon/OFFLINE',
}

export interface ResponseItem {
  url: string;
  name: string;
}

export interface Item {
  id: string;
  name: string;
  url: string;
}

export type Items = { [key: string]: Item };
