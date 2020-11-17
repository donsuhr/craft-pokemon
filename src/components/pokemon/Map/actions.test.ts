import {
  getStateFixture,
  mockStoreCreator,
} from '@/store/mock-store-creator';
import { AsyncStatus } from '@/store/types';
import { fetchIfNeeded } from './actions';
import { receive, request, receiveError } from './actions.sync';
import { PokemonMapActionTypes } from './types';

describe('pokemon map actions', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Request Items', () => {
    const expectedAction = {
      type: PokemonMapActionTypes.REQUEST,
    };
    expect(request('1')).toMatchObject(expectedAction);
  });

  it('Recieve Items', () => {
    const expectedAction = {
      type: PokemonMapActionTypes.RECEIVE,
      payload: {},
    };
    expect(receive([], '1')).toMatchObject(expectedAction);
  });

  it('Error Items', () => {
    const error = new Error('hello world');
    const expectedAction = {
      type: PokemonMapActionTypes.ERROR,
      payload: { id: '1', error: { message: 'hello world' } },
    };
    expect(receiveError(error, '1')).toMatchObject(expectedAction);
  });

  it('should fetchItemsIfNeeded false', () => {
    const state = getStateFixture();
    const store = mockStoreCreator(state);
    const result = store.dispatch(fetchIfNeeded('1'));
    expect(result).toEqual(false);
  });

  it('should fetchItemsIfNeeded true', async () => {
    const data = { foo: 'bar' };
    const state = getStateFixture();
    state.pokemonMap.byId['1'].status = AsyncStatus.initial;
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => data,
        status: 200,
      }),
    );
    const store = mockStoreCreator(state);
    store.dispatch(fetchIfNeeded('1'));
    const expectedActions = [
      { type: PokemonMapActionTypes.REQUEST },
      {
        type: PokemonMapActionTypes.RECEIVE,
        payload: { data, id: '1' },
      },
    ];
    await new Promise(setImmediate);

    expect(store.getActions()[0]).toMatchObject(expectedActions[0]);
    expect(store.getActions()[1]).toMatchObject(expectedActions[1]);
  });

  it('dispatch an error', async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => ({
          foo: true
        }),
        status: 404,
      }),
    );

    const state = getStateFixture();
    state.pokemonMap.byId['1'].status = AsyncStatus.initial;

    const store = mockStoreCreator(state);
    store.dispatch(fetchIfNeeded('1'));
    const expectedActions = [
      { type: PokemonMapActionTypes.REQUEST },
      {
        type: PokemonMapActionTypes.ERROR,
        payload: { id: '1' },
      },
    ];
    await new Promise(setImmediate);

    expect(store.getActions()[0]).toMatchObject(expectedActions[0]);
    expect(store.getActions()[1]).toMatchObject(expectedActions[1]);
  });
});
