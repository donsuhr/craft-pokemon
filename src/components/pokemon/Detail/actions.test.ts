import configureStore, {
  MockStoreCreator,
  MockStoreEnhanced,
} from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { AnyAction, Middleware } from 'redux';
import { fetchIfNeeded } from './actions';
import { requestDetails, receiveDetails } from './actions-sync';
import { PokemonDetailsActionTypes } from './types';
import { ApplicationState } from '../../../redux/types';
import { PokemonDetailState } from './reducers';

const middlewares: Array<Middleware> = [thunk];
type DispatchExts = ThunkDispatch<ApplicationState, undefined, AnyAction>;
const mockStoreCreator: MockStoreCreator<
  ApplicationState,
  DispatchExts
> = configureStore<ApplicationState, DispatchExts>(middlewares);
type MockStoreType = MockStoreEnhanced<ApplicationState, DispatchExts>;

const pokemonDetail: PokemonDetailState = {
  byId: {
    1: {
      details: {
        id: '2',
        weight: 200,
        height: 200,
        baseExperience: 20,
        img: 'img',
        types: ['one', 'two'],
        abilities: ['one', 'two'],
        name: 'title target',
      },
      hasEverLoaded: true,
      isFetching: false,
    },
  },
};

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
    const store: MockStoreType = mockStoreCreator({
      pokemon: { byId: {}, isFetching: false, hasEverLoaded: true },
      pokemonBag: [],
      pokemonDetail,
    });
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
      ...pokemonDetail,
      byId: {
        ...pokemonDetail.byId,
        1: {
          ...pokemonDetail.byId['1'],
          details: {
            ...pokemonDetail.byId['1'].details,
          },
          hasEverLoaded: false,
        },
      },
    };

    const store: MockStoreType = mockStoreCreator({
      pokemon: { byId: {}, isFetching: false, hasEverLoaded: true },
      pokemonBag: [],
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
