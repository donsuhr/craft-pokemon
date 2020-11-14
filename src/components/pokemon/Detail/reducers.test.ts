import { byId, shouldFetch, getItemById, PokemonDetailState } from './reducers';
import { PokemonDetailsActionTypes } from './types';

const pokemonDetail: PokemonDetailState = {
  byId: {
    1: {
      details: {
        id: '2',
        weight: 200,
        height: 200,
        baseExperience: 20,
        img: 'img',
        types: ['one', 'two'],
        abilities: ['one', 'two'],
        name: 'title target',
      },
      hasEverLoaded: true,
      isFetching: false,
    },
  },
};

describe('pokemon details reducer', () => {
  it('should return the initial state', () => {
    expect(
      byId(undefined, {
        type: PokemonDetailsActionTypes.REQUEST_DETAILS,
        payload: { id: '3' },
      }),
    ).toMatchObject({
      '3': {
        hasEverLoaded: true,
        isFetching: true,
        details: { name: '' },
      },
    });
  });

  it('adds an item', () => {
    const id = '2';
    const data = {
      types: [{ type: { name: 'one' } }],
      abilities: [{ ability: { name: 'two' } }],
      name: 'Steve',
    };

    expect(
      byId(undefined, {
        type: PokemonDetailsActionTypes.RECEIVE_DETAILS,
        payload: { id, data },
      }),
    ).toMatchObject({
      '2': {
        hasEverLoaded: false,
        isFetching: false,
        details: { name: 'Steve', types: ['one'], abilities: ['two'] },
      },
    });
  });

  it('sets loading on request', () => {
    expect(
      byId(undefined, {
        type: PokemonDetailsActionTypes.REQUEST_DETAILS,
        payload: { id: '3' },
      }),
    ).toMatchObject({
      '3': { hasEverLoaded: true, isFetching: true },
    });
  });

  describe('selectors', () => {
    it('shouldFetch', () => {
      const detail = {
        ...pokemonDetail,
        byId: {
          ...pokemonDetail.byId,
          1: {
            ...pokemonDetail.byId['1'],
            hasEverLoaded: false,
          },
        },
      };
      expect(shouldFetch(detail, '1')).toBeTruthy();
    });
    it('should not Fetch', () => {
      expect(shouldFetch(pokemonDetail, '1')).toBeFalsy();
    });

    it('returns an item by id', () => {
      expect(getItemById(pokemonDetail, '1')).toMatchObject(
        pokemonDetail.byId['1'],
      );
    });

    it('returns a default item for not found', () => {
      expect(getItemById(pokemonDetail, '2')).toMatchObject({
        hasEverLoaded: false,
        isFetching: false,
        details: {
          name: '',
        },
      });
    });

    it('should not fetch if id > process var ', () => {
      const current = process.env.DEV_LIMIT_DETAIL_LOAD;
      process.env.DEV_LIMIT_DETAIL_LOAD = '4';

      expect(shouldFetch(pokemonDetail, '10')).toBeFalsy();

      if (current) {
        process.env.DEV_LIMIT_DETAIL_LOAD = current;
      } else {
        delete process.env.DEV_LIMIT_DETAIL_LOAD;
      }
    });
  });
});
