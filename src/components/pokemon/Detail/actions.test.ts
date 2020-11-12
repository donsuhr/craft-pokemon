import { mockStoreCreator, stateFixture } from '@/store/mock-store-creator';
import { fetchIfNeeded } from './actions';
import { requestDetails, receiveDetails } from './actions-sync';
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

  it('should fetchItemsIfNeeded false', () => {
    const store = mockStoreCreator(stateFixture);
    const result = store.dispatch(fetchIfNeeded('1'));
    expect(result).toEqual(false);
  });

  it('should fetchItemsIfNeeded true', async () => {
    const data = { foo: 'bar' };
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => data,
      }),
    );

    const detail = {
      ...stateFixture.pokemonDetail,
      byId: {
        ...stateFixture.pokemonDetail.byId,
        1: {
          ...stateFixture.pokemonDetail.byId['1'],
          details: {
            ...stateFixture.pokemonDetail.byId['1'].details,
          },
          hasEverLoaded: false,
        },
      },
    };

    const store = mockStoreCreator( {
      ...stateFixture,
      pokemonDetail: detail,
    });
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
});
