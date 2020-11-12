export enum PokemonDetailsActionTypes {
  REQUEST_DETAILS = '@@pokemonDetails/REQUEST_DETAILS',
  RECEIVE_DETAILS = '@@pokemonDetails/RECEIVE_DETAILS',
}

export interface IType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
  name: string;
}

export interface IAbility {
  ability: {
    name: string;
    url: string;
  };
  slot: number;
}

export interface IDetails {
  name: string;
  id: string;
  img: string;
  height: number;
  weight: number;
  types: string[];
  baseExperience: number;
  abilities: string[];
}
