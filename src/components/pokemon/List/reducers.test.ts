import { stateFixture } from '@/store/mock-store-creator';
import {
  hasEverLoaded,
  isFetching,
  byId,
  getItemById,
  PokemonListState,
} from './reducers';
import { PokemonActionTypes, Items } from './types';

describe('pokemon reducer', () => {
  describe('hasEverLoaded', () => {
    it('should return the initial state', () => {
      expect(hasEverLoaded(undefined, { type: 'foo' })).toBe(false);
    });
    it('should switch to true', () => {
      expect(
        hasEverLoaded(undefined, { type: PokemonActionTypes.RECEIVE_ITEMS }),
      ).toBe(true);
    });
  });

  describe('isFetching', () => {
    it('should return the initial state', () => {
      expect(isFetching(undefined, { type: 'foo' })).toBe(false);
    });
    it('should switch to true', () => {
      expect(
        isFetching(undefined, { type: PokemonActionTypes.REQUEST_ITEMS }),
      ).toBe(true);
    });
    it('should switch to false', () => {
      expect(
        isFetching(undefined, { type: PokemonActionTypes.RECEIVE_ITEMS }),
      ).toBe(false);
    });
  });

  describe('byId', () => {
    it('should return the initial state', () => {
      expect(byId(undefined, { type: 'foo' })).toEqual({});
    });

    it('should have one item', () => {
      const expectedObject: Items = {
        1: {
          name: 'name',
          id: '1',
          url: 'http://foo/v2/x/1/',
        },
      };

      const payload = {
        results: [{ name: expectedObject[1].name, url: expectedObject[1].url }],
      };

      expect(
        byId(undefined, {
          type: PokemonActionTypes.RECEIVE_ITEMS,
          payload,
        }),
      ).toEqual(expectedObject);
    });

    it('works with no trailing slash', () => {
      const expectedObject: Items = {
        1: {
          name: 'name',
          id: '1',
          url: 'http://foo/v2/x/1',
        },
      };

      const payload = {
        results: [{ name: expectedObject[1].name, url: expectedObject[1].url }],
      };

      expect(
        byId(undefined, {
          type: PokemonActionTypes.RECEIVE_ITEMS,
          payload,
        }),
      ).toEqual(expectedObject);
    });
  });

  describe('selectors', () => {
    it('getItemById', () => {
      const state: PokemonListState = stateFixture.pokemon;
      expect(getItemById(state, '1').name).toBe('one');
    });
  });
});
