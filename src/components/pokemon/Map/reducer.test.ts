import { getStateFixture } from '@/store/mock-store-creator';
import { AsyncStatus } from '@/store/types';
import { byId, getItemById } from './reducers';
import { PokemonMapActionTypes } from './types';

describe('pokemon map reducer', () => {
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
        status: AsyncStatus.succeeded,
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
      '3': { status: AsyncStatus.loading },
    });
  });

  it('will set an offline', () => {
    expect(
      byId(undefined, {
        type: PokemonMapActionTypes.OFFLINE,
        payload: { id: '3' },
      }),
    ).toMatchObject({
      '3': { status: AsyncStatus.offline },
    });
  });

  it('will set an error', () => {
    const someError = new Error('hello world');
    expect(
      byId(undefined, {
        type: PokemonMapActionTypes.ERROR,
        payload: { id: '3', error: someError },
      }),
    ).toMatchObject({
      '3': {
        status: AsyncStatus.failed,
        error: 'hello world',
      },
    });
  });

  describe('selectors', () => {
    it('returns an item by id', () => {
      const { pokemonMap } = getStateFixture();
      expect(getItemById(pokemonMap, '1')).toMatchObject(pokemonMap.byId['1']);
    });

    it('returns a default item for not found', () => {
      const { pokemonMap } = getStateFixture();
      expect(getItemById(pokemonMap, '4')).toMatchObject({
        status: AsyncStatus.initial,
        locations: [],
      });
    });
  });
});
