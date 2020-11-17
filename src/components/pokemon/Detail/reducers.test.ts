import { getStateFixture } from '@/store/mock-store-creator';
import { AsyncStatus } from '@/store/types';
import { byId, shouldFetch, getItemById } from './reducers';
import { PokemonDetailsActionTypes, Requestor } from './types';

describe('pokemon details reducer', () => {
  it('should return the initial state', () => {
    expect(
      byId(undefined, {
        type: PokemonDetailsActionTypes.REQUEST_DETAILS,
        payload: { id: '3' },
      }),
    ).toMatchObject({
      '3': {
        details: { name: '' },
        status: AsyncStatus.loading,
        error: null,
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
        details: { name: 'Steve', types: ['one'], abilities: ['two'] },
        status: AsyncStatus.succeeded,
        error: null,
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
      '3': {
        status: AsyncStatus.loading,
        error: null,
      },
    });
  });

  it('will set an error', () => {
    const someError = new Error('hello world');
    expect(
      byId(undefined, {
        type: PokemonDetailsActionTypes.ERROR,
        payload: { id: '3', error: someError },
      }),
    ).toMatchObject({
      '3': {
        status: AsyncStatus.failed,
        error: 'hello world',
      },
    });
  });

  it('will set an offline', () => {
    expect(
      byId(undefined, {
        type: PokemonDetailsActionTypes.OFFLINE,
        payload: { id: '3' },
      }),
    ).toMatchObject({
      '3': {
        status: AsyncStatus.offline,
      },
    });
  });

  describe('selectors', () => {
    it('shouldFetch', () => {
      const detail = getStateFixture().pokemonDetail;
      detail.byId['1'].status = AsyncStatus.initial;
      expect(shouldFetch(detail, { id: '1' })).toBeTruthy();
    });

    it('should not Fetch', () => {
      const detail = getStateFixture().pokemonDetail;
      detail.byId['1'].status = AsyncStatus.loading;
      expect(shouldFetch(detail, { id: '1' })).toBeFalsy();
    });

    it('returns an item by id', () => {
      const detail = getStateFixture().pokemonDetail;
      expect(getItemById(detail, '1')).toMatchObject(detail.byId['1']);
    });

    it('returns a default item for not found', () => {
      const detail = getStateFixture().pokemonDetail;
      expect(getItemById(detail, '2')).toMatchObject({
        error: null,
        status: AsyncStatus.initial,
        details: {
          name: '',
        },
      });
    });

    it('should not fetch if id > process var ', () => {
      const state = getStateFixture().pokemonDetail;
      const current = process.env.DEV_LIMIT_DETAIL_LOAD;
      process.env.DEV_LIMIT_DETAIL_LOAD = '4';

      expect(
        shouldFetch(state, { id: '10', requestor: Requestor.ListItem }),
      ).toBeFalsy();

      if (current) {
        process.env.DEV_LIMIT_DETAIL_LOAD = current;
      } else {
        delete process.env.DEV_LIMIT_DETAIL_LOAD;
      }
    });
  });
});
