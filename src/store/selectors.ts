import Fuse from 'fuse.js';
import { Item } from '@/components/pokemon/List/types';
import { getInBag } from '../components/pokemon/Bag/reducers';
import { ApplicationState } from './types';

let currentFilter = '';

export const getDetailState = (state: ApplicationState) => state.pokemonDetail;
export const getBagState = (state: ApplicationState) => state.pokemonBag;
export const getUiState = (state: ApplicationState) => state.ui;
export const getListState = (state: ApplicationState) => state.pokemon;

export function getFilteredItems(state: ApplicationState) {
  const bagState = getBagState(state);
  const uiState = getUiState(state);
  const listState = getListState(state);
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
