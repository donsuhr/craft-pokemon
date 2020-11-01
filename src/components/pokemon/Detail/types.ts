export enum PokemonDetailsActionTypes {
  REQUEST_DETAILS = '@@pokemonDetails/REQUEST_DETAILS',
  RECEIVE_DETAILS = '@@pokemonDetails/RECEIVE_DETAILS',
}

export interface Details {
  name: string;
  id: string;
  img: string;
}
