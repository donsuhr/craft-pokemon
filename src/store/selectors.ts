import Fuse from 'fuse.js';
import { Item } from '@/components/pokemon/List/types';
import {
  QUERY_KEY_VIEW,
  QUERY_VAL_BAG,
} from '@/components/pokemon/List/ListViewToggle';
import { QUERY_KEY_PAGE } from '@/components/Pager';
import { getInBag } from '../components/pokemon/Bag/reducers';
import { ApplicationState, LocationState } from './types';

let currentFilter = '';

const FILTERED_LIMIT = 20;
export const UNFILTERED_PAGE_LIMIT = 16;

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
  const page = parseInt(query.get(QUERY_KEY_PAGE) || '1', 10);

  let items: Item[] = Object.values(listState.byId);
  const showAll = query.get(QUERY_KEY_VIEW)?.toLowerCase() !== QUERY_VAL_BAG;
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
    return fuse
      .search(filterText)
      .map((x) => x.item)
      .slice(0, FILTERED_LIMIT);
  }

  const start = (page - 1) * UNFILTERED_PAGE_LIMIT;
  const end = start + UNFILTERED_PAGE_LIMIT;
  return items.slice(start, end);
}
