import * as React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '../../../test-utils';
import Detail from './index';
import { PokemonDetailsActionTypes } from './types';
import { PokemonDetailState } from './reducers';

jest.mock('../Map/Map.container', () => () => <div>target</div>);
jest.mock('../Bag/InBagCheckbox', () => () => <div>target</div>);

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

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

describe('Detail', () => {
  afterEach(() => jest.restoreAllMocks());

  test('it renders', () => {
    render(
      <Router>
        <Detail id="1" />
      </Router>,
      {
        store: mockStore({ pokemonDetail }),
      },
    );

    expect(screen.getAllByText(/title target/i).length).toBeGreaterThan(0);
  });

  test('triggers call to fetch', async () => {
    const data = {};

    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => data,
      }),
    );
    const store = mockStore({
      pokemonDetail: {
        ...pokemonDetail,
        byId: {
          ...pokemonDetail.byId,
          1: {
            ...pokemonDetail.byId[1],
            hasEverLoaded: false,
          },
        },
      },
    });

    render(
      <Router>
        <Detail id="1" />
      </Router>,
      {
        store,
      },
    );

    const expectedAction = [
      {
        type: PokemonDetailsActionTypes.REQUEST_DETAILS,
        payload: { id: '1' },
      },
      {
        type: PokemonDetailsActionTypes.RECEIVE_DETAILS,
        payload: { id: '1' },
      },
    ];
    await new Promise(setImmediate);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(window.fetch).toHaveBeenCalled();
    expect(store.getActions()[0]).toMatchObject(expectedAction[0]);
    expect(store.getActions()[1]).toMatchObject(expectedAction[1]);
  });
});
