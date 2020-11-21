import { mockStoreCreator, getStateFixture } from '@/store/mock-store-creator';
import { AsyncStatus } from '@/store/types';
import { fetchItemsIfNeeded } from './actions';
import { PokemonActionTypes } from './types';
import {
  request,
  receiveSuccess,
  receiveError,
  receiveOffline,
} from './actions-sync';

describe('pokemon actions', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Request Items', () => {
    const expectedAction = {
      type: PokemonActionTypes.REQUEST_ITEMS,
    };
    expect(request()).toEqual(expectedAction);
  });

  it('Receive Items', () => {
    const expectedAction = {
      type: PokemonActionTypes.RECEIVE_ITEMS,
      payload: [],
    };
    expect(receiveSuccess([])).toEqual(expectedAction);
  });

  it('Handles error', () => {
    const error = new Error('hello world');
    const expectedAction = {
      type: PokemonActionTypes.ERROR,
      payload: { error },
    };
    expect(receiveError(error)).toMatchObject(expectedAction);
  });

  it('Handles offline', () => {
    const expectedAction = {
      type: PokemonActionTypes.OFFLINE,
    };
    expect(receiveOffline()).toMatchObject(expectedAction);
  });

  it('should fetchItemsIfNeeded false', () => {
    const state = getStateFixture();
    const store = mockStoreCreator(state);
    const result = store.dispatch(fetchItemsIfNeeded());
    expect(result).toEqual(false);
  });

  it('should fetchItemsIfNeeded true', async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => ({ results: [{ name: 'name', url: 'url' }] }),
        status: 200,
      }),
    );
    const state = getStateFixture();
    state.pokemon.status = AsyncStatus.initial;
    const store = mockStoreCreator(state);

    store.dispatch(fetchItemsIfNeeded());
    const expectedActions = [
      { type: PokemonActionTypes.REQUEST_ITEMS },
      {
        type: PokemonActionTypes.RECEIVE_ITEMS,
        payload: { results: [{ name: 'name', url: 'url' }] },
      },
    ];
    await new Promise(setImmediate);
    expect(store.getActions()[0]).toMatchObject(expectedActions[0]);
    expect(store.getActions()[1]).toMatchObject(expectedActions[1]);
  });

  it('dispatch offline with some  offline json', async () => {
    const data = { offline: true };
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => data,
        status: 200,
      }),
    );

    const state = getStateFixture();
    state.pokemon.status = AsyncStatus.initial;

    const store = mockStoreCreator(state);
    store.dispatch(fetchItemsIfNeeded());
    const expectedActions = [
      { type: PokemonActionTypes.REQUEST_ITEMS },
      {
        type: PokemonActionTypes.OFFLINE,
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
          foo: true,
        }),
        status: 404,
      }),
    );

    const state = getStateFixture();
    state.pokemon.status = AsyncStatus.initial;

    const store = mockStoreCreator(state);
    store.dispatch(fetchItemsIfNeeded());
    const expectedActions = [
      { type: PokemonActionTypes.REQUEST_ITEMS },
      {
        type: PokemonActionTypes.ERROR,
      },
    ];
    await new Promise(setImmediate);

    expect(store.getActions()[0]).toMatchObject(expectedActions[0]);
    expect(store.getActions()[1]).toMatchObject(expectedActions[1]);
  });
});
