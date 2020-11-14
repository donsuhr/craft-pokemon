import { stateFixture } from '@/store/mock-store-creator';
import { byId, getItemById } from './reducers';
import { PokemonMapActionTypes } from './types';

describe('pokemon map reducer', () => {
  it('should return the initial state', () => {
    expect(
      byId(undefined, {
        type: PokemonMapActionTypes.REQUEST,
        payload: { id: '3' },
      }),
    ).toMatchObject({
      '3': {
        hasEverLoaded: true,
        isFetching: true,
        locations: [],
      },
    });
  });

  it('adds an item', () => {
    const id = '2';
    const data = {
      locations: ['1', '2'],
    };

    expect(
      byId(undefined, {
        type: PokemonMapActionTypes.RECEIVE,
        payload: { id, data },
      }),
    ).toMatchObject({
      '2': {
        hasEverLoaded: false,
        isFetching: false,
        locations: data.locations,
      },
    });
  });

  it('sets loading on request', () => {
    expect(
      byId(undefined, {
        type: PokemonMapActionTypes.REQUEST,
        payload: { id: '3' },
      }),
    ).toMatchObject({
      '3': { hasEverLoaded: true, isFetching: true },
    });
  });

  describe('selectors', () => {
    it('returns an item by id', () => {
      expect(getItemById(stateFixture.pokemonMap, '1')).toMatchObject(
        stateFixture.pokemonMap.byId['1'],
      );
    });

    it('returns a default item for not found', () => {
      expect(getItemById(stateFixture.pokemonMap, '4')).toMatchObject({
        hasEverLoaded: false,
        isFetching: false,
        locations: [],
      });
    });
  });
});
