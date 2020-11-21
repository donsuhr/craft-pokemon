import { getStateFixture, mockStoreCreator } from '@/store/mock-store-creator';
import { add, addAndCache, remove } from './actions';
import { PokemonBagActionTypes } from './types';

describe('pokemon Bag actions', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('ADD Item', () => {
    const expectedAction = {
      type: PokemonBagActionTypes.ADD,
      payload: '1',
    };
    expect(add('1')).toMatchObject(expectedAction);
  });

  it('Remove Item', () => {
    const expectedAction = {
      type: PokemonBagActionTypes.REMOVE,
      payload: '1',
    };
    expect(remove('1')).toMatchObject(expectedAction);
  });

  it('will call out to service if requested', () => {
    jest.useFakeTimers();
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => ({
          foo: true,
        }),
        status: 200,
      }),
    );
    const state = getStateFixture();
    const store = mockStoreCreator(state);
    store.dispatch(addAndCache('1'));
    const expectedActions = [{ type: PokemonBagActionTypes.ADD }];
    expect(store.getActions()[0]).toMatchObject(expectedActions[0]);
    jest.runAllTimers();
    expect(global.fetch).toHaveBeenCalled();
  });
});
