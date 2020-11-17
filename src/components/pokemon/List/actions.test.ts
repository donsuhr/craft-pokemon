import { mockStoreCreator, getStateFixture } from '@/store/mock-store-creator';
import { requestItems, receiveItems, fetchItemsIfNeeded } from './actions';
import { PokemonActionTypes } from './types';

describe('pokemon actions', () => {
  afterEach(() => {
    jest.restoreAllMocks();
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
    const state = getStateFixture();
    state.pokemon.hasEverLoaded = true;
    const store = mockStoreCreator(state);
    const result = store.dispatch(fetchItemsIfNeeded());
    expect(result).toEqual(false);
  });

  it('should fetchItemsIfNeeded true', async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => ({ results: [{ name: 'name', url: 'url' }] }),
      }),
    );
    const state = getStateFixture();
    state.pokemon.hasEverLoaded = false;
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
});
