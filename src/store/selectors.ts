import Fuse from 'fuse.js';
import { Item } from '@/components/pokemon/List/types';
import { Search } from 'history';

import {
  QUERY_KEY,
  QUERY_VAL_BAG,
} from '@/components/pokemon/List/ListViewToggle';
import { getInBag } from '../components/pokemon/Bag/reducers';
import { ApplicationState } from './types';

let currentFilter = '';

type LocationState = {
  search: Search;
};

export const getDetailState = (state: ApplicationState) => state.pokemonDetail;
export const getBagState = (state: ApplicationState) => state.pokemonBag;
export const getUiState = (state: ApplicationState) => state.ui;
export const getListState = (state: ApplicationState) => state.pokemon;
export const getMapState = (state: ApplicationState) => state.pokemonMap;

export function getFilteredItems(
  state: ApplicationState,
  location: LocationState,
) {
  const bagState = getBagState(state);
  const uiState = getUiState(state);
  const listState = getListState(state);
  const query = new URLSearchParams(location.search);

  let items: Item[] = Object.values(listState.byId);
  const showAll = query.get(QUERY_KEY)?.toLowerCase() !== QUERY_VAL_BAG;
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
