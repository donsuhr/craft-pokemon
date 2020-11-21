import { getStateFixture } from '@/store/mock-store-creator';
import { AsyncStatus } from '@/store/types';
import {
  byId,
  getItemById,
  status,
  error,
  getLength,
  shouldFetchItems,
} from './reducers';
import { PokemonActionTypes, Items } from './types';

describe('pokemon reducer', () => {
  describe('status', () => {
    it('should return the initial state', () => {
      expect(status(undefined, { type: 'foo' })).toBe(AsyncStatus.initial);
    });

    it('should switch to success', () => {
      expect(
        status(undefined, { type: PokemonActionTypes.RECEIVE_ITEMS }),
      ).toBe(AsyncStatus.succeeded);
    });
    it('should switch to error', () => {
      expect(status(undefined, { type: PokemonActionTypes.ERROR })).toBe(
        AsyncStatus.failed,
      );
    });

    it('will set an offline', () => {
      expect(
        status(undefined, {
          type: PokemonActionTypes.OFFLINE,
        }),
      ).toBe(AsyncStatus.offline);
    });

    it('will set an offline', () => {
      expect(
        status(undefined, {
          type: PokemonActionTypes.REQUEST_ITEMS,
        }),
      ).toBe(AsyncStatus.loading);
    });
  });

  describe('error', () => {
    it('starts null', () => {
      expect(error(undefined, { type: 'foo' })).toBeNull();
    });

    it('should switch to error', () => {
      const err = new Error('message');
      expect(
        error(undefined, {
          type: PokemonActionTypes.ERROR,
          payload: { error: err },
        }),
      ).toBe('message');
    });

    it('resets to null for loading', () => {
      expect(
        error(undefined, { type: PokemonActionTypes.RECEIVE_ITEMS }),
      ).toBeNull();
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
      const { pokemon } = getStateFixture();
      expect(getItemById(pokemon, '1').name).toBe('one');
    });

    it('get length', () => {
      const { pokemon } = getStateFixture();
      expect(getLength(pokemon)).toBe(3);
    });

    it('should fetch false', () => {
      const { pokemon } = getStateFixture();
      expect(shouldFetchItems(pokemon)).toBeFalsy();
    });

    it('should fetch true', () => {
      const { pokemon } = getStateFixture();
      pokemon.status = AsyncStatus.initial;
      expect(shouldFetchItems(pokemon)).toBeTruthy();
    });
  });
});
