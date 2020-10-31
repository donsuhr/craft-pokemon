export enum PokemonActionTypes {
  REQUEST_ITEMS = '@@pokemon/REQUEST_ITEMS',
  RECEIVE_ITEMS = '@@pokemon/RECEIVE_ITEMS',
}

export interface Item {
  id?: string;
  name: string;
  url: string;
}

export type Items = { [key: string]: Item };
