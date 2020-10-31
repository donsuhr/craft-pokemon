import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { requestItems, receiveItems, fetchItemsIfNeeded } from './actions';
import { PokemonActionTypes } from './types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe('pokemon actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('Request Items', () => {
    const expectedAction = {
      type: PokemonActionTypes.REQUEST_ITEMS,
    };
    expect(requestItems()).toEqual(expectedAction);
  });

  it('Recieve Items', () => {
    const expectedAction = {
      type: PokemonActionTypes.RECEIVE_ITEMS,
      payload: [],
    };
    expect(receiveItems([])).toEqual(expectedAction);
  });

  it('should fetchItemsIfNeeded false', () => {
    const store = mockStore({ pokemon: { hasEverLoaded: true } });
    const result = store.dispatch<any>(fetchItemsIfNeeded());
    expect(result).toEqual(false);
  });

  it('should fetchItemsIfNeeded true', () => {
    fetchMock.mock('*', {
      body: { todos: ['do something'] },
      headers: { 'content-type': 'application/json' },
    });
    const store = mockStore({ pokemon: { hasEverLoaded: false } });
    const result = store.dispatch<any>(fetchItemsIfNeeded());
    const expectedActions = [
      { type: PokemonActionTypes.REQUEST_ITEMS },
      {
        type: PokemonActionTypes.RECEIVE_ITEMS,
        payload: { todos: ['do something'] },
      },
    ];
    return result.then(() => {
      expect(store.getActions()[0]).toMatchObject(expectedActions[0]);
      expect(store.getActions()[1]).toMatchObject(expectedActions[1]);
    });
  });
});
