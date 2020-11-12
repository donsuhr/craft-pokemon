import { PokemonBagState } from '@/components/pokemon/Bag/reducers';
import { PokemonListState } from '@/components/pokemon/List/reducers';
import { filterItems } from './selectors';
import { UiState } from './ui/reducers';

const uiState: UiState = {
  viewAll: true,
  filterText: '',
};

const bagState: PokemonBagState = ['1', '2'];

const listState: PokemonListState = {
  byId: {
    1: {
      id: '1',
      name: 'one',
      url: 'url',
    },
    2: {
      id: '2',
      name: 'two',
      url: 'url',
    },
    3: {
      id: '3',
      name: 'three',
      url: 'url',
    },
  },
  hasEverLoaded: true,
  isFetching: false,
};

describe('Root Selectors', () => {
  it('should set viewAll', () => {
    expect(filterItems({ uiState, bagState, listState }).length).toBe(3);
  });

  it('should set viewAll', () => {
    const uiStateLocal = {
      ...uiState,
      filterText: 'three',
    };
    const result = filterItems({ uiState: uiStateLocal, bagState, listState });
    expect(result.length).toBe(1);
    expect(result[0]).toMatchObject(listState.byId['3']);
  });

  it('can limit its search to the bag', () => {
    const uiStateLocalAllItems: UiState = {
      viewAll: true,
      filterText: 'three',
    };
    expect(
      filterItems({ uiState: uiStateLocalAllItems, bagState, listState })
        .length,
    ).toBe(1);
    const uiStateLocalBagItems: UiState = {
      viewAll: false,
      filterText: 'three',
    };
    expect(
      filterItems({ uiState: uiStateLocalBagItems, bagState, listState })
        .length,
    ).toBe(0);
  });

  it('reset returns all items', () => {
    const first: UiState = {
      viewAll: true,
      filterText: 'three',
    };
    expect(filterItems({ uiState: first, bagState, listState }).length).toBe(1);
    const second: UiState = {
      viewAll: true,
      filterText: '',
    };
    expect(filterItems({ uiState: second, bagState, listState }).length).toBe(
      3,
    );
  });
});
