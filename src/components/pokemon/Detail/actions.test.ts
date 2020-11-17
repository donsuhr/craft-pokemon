import {
  getStateFixture,
  mockStoreCreator,
} from '@/store/mock-store-creator';
import { AsyncStatus } from '@/store/types';
import { fetchIfNeeded } from './actions';
import {
  requestDetails,
  receiveDetails,
  receiveError,
  receiveOffline,
} from './actions-sync';
import { PokemonDetailsActionTypes } from './types';

describe('pokemon detail actions', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Request Items', () => {
    const expectedAction = {
      type: PokemonDetailsActionTypes.REQUEST_DETAILS,
    };
    expect(requestDetails('1')).toMatchObject(expectedAction);
  });

  it('Recieve Items', () => {
    const expectedAction = {
      type: PokemonDetailsActionTypes.RECEIVE_DETAILS,
      payload: {},
    };
    expect(receiveDetails([], '1')).toMatchObject(expectedAction);
  });

  it('Handles error', () => {
    const expectedAction = {
      type: PokemonDetailsActionTypes.ERROR,
      payload: { id: '1', error: { message: 'hello world' } },
    };
    const error = new Error('hello world');
    expect(receiveError(error, '1')).toMatchObject(expectedAction);
  });

  it('Handles offline', () => {
    const expectedAction = {
      type: PokemonDetailsActionTypes.OFFLINE,
      payload: { id: '1' },
    };
    expect(receiveOffline('1')).toMatchObject(expectedAction);
  });

  it('should fetchItemsIfNeeded false', () => {
    const state = getStateFixture();
    const store = mockStoreCreator(state);
    const result = store.dispatch(fetchIfNeeded('1'));
    expect(result).toEqual(false);
  });

  it('should fetchItemsIfNeeded true', async () => {
    const data = { foo: 'bar' };
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => data,
        status: 200,
      }),
    );

    const state = getStateFixture();
    state.pokemonDetail.byId['1'].status = AsyncStatus.initial;

    const store = mockStoreCreator(state);
    store.dispatch(fetchIfNeeded('1'));
    const expectedActions = [
      { type: PokemonDetailsActionTypes.REQUEST_DETAILS },
      {
        type: PokemonDetailsActionTypes.RECEIVE_DETAILS,
        payload: { data, id: '1' },
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
    state.pokemonDetail.byId['1'].status = AsyncStatus.initial;

    const store = mockStoreCreator(state);
    store.dispatch(fetchIfNeeded('1'));
    const expectedActions = [
      { type: PokemonDetailsActionTypes.REQUEST_DETAILS },
      {
        type: PokemonDetailsActionTypes.OFFLINE,
        payload: { id: '1' },
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
    state.pokemonDetail.byId['1'].status = AsyncStatus.initial;

    const store = mockStoreCreator(state);
    store.dispatch(fetchIfNeeded('1'));
    const expectedActions = [
      { type: PokemonDetailsActionTypes.REQUEST_DETAILS },
      {
        type: PokemonDetailsActionTypes.ERROR,
        payload: { id: '1' },
      },
    ];
    await new Promise(setImmediate);

    expect(store.getActions()[0]).toMatchObject(expectedActions[0]);
    expect(store.getActions()[1]).toMatchObject(expectedActions[1]);
  });
});
