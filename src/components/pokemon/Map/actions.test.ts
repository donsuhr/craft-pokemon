import { mockStoreCreator, stateFixture } from '@/store/mock-store-creator';
import { ApplicationState } from '@/store/types';
import { fetchIfNeeded } from './actions';
import { receive, request } from './actions.sync';
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

  it('should fetchItemsIfNeeded false', () => {
    const store = mockStoreCreator(stateFixture);
    const result = store.dispatch(fetchIfNeeded('1'));
    expect(result).toEqual(false);
  });

  it('should fetchItemsIfNeeded true', async () => {
    const data = { foo: 'bar' };
    const state: ApplicationState = JSON.parse(JSON.stringify(stateFixture));
    state.pokemonMap.byId['1'].hasEverLoaded = false;
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => data,
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
});
