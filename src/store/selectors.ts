import Fuse from 'fuse.js';
import { Item } from '@/components/pokemon/List/types';
import { PokemonListState } from '../components/pokemon/List/reducers';
import { PokemonBagState, getInBag } from '../components/pokemon/Bag/reducers';
import { UiState } from './ui/reducers';
import { ApplicationState } from './types';

let currentFilter = '';

export function filterItems({
  bagState,
  uiState,
  listState,
}: {
  bagState: PokemonBagState;
  uiState: UiState;
  listState: PokemonListState;
}) {
  // const inBag = state.pokemonBag.map(id => state.pokemon.byId[id]);
  let items: Item[] = Object.values(listState.byId);
  const showAll = uiState.viewAll;
  if (!showAll) {
    items = items.filter((x: Item) => x.id && getInBag(bagState, x.id));
  }
  const filterText = uiState.filterText.trim();
  if (filterText !== currentFilter || filterText !== '') {
    currentFilter = filterText;
    if (filterText === '') {
      return items;
    }
    const options = {
      keys: ['name'],
    };
    const fuse = new Fuse(items, options);
    return fuse.search(filterText).map((x) => x.item);
  }
  return items;
}

export const getDetailState = (state: ApplicationState) => state.pokemonDetail;
export const getBagState = (state: ApplicationState) => state.pokemonBag;
export const getUiState = (state: ApplicationState) => state.ui;
export const getListState = (state: ApplicationState) => state.pokemon;
