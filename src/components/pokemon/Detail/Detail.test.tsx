import * as React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import { getStateFixture } from '@/store/mock-store-creator';
import { AsyncStatus } from '@/store/types';
import { render, screen } from '../../../test-utils';
import Detail from './index';
import { PokemonDetailsActionTypes } from './types';

jest.mock('../Map/Map', () => () => <div>target</div>);
jest.mock('../Bag/InBagCheckbox', () => () => <div>target</div>);

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Detail', () => {
  afterEach(() => jest.restoreAllMocks());

  test('it renders', () => {
    const { pokemonDetail } = getStateFixture();
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
        json: () => data,
        status: 200,
      }),
    );
    const { pokemonDetail } = getStateFixture();
    pokemonDetail.byId['1'].status = AsyncStatus.initial;
    const store = mockStore({
      pokemonDetail,
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
    expect(window.fetch).toHaveBeenCalled();
    expect(store.getActions()[0]).toMatchObject(expectedAction[0]);
    expect(store.getActions()[1]).toMatchObject(expectedAction[1]);
  });

  test('it shows loading', () => {
    const { pokemonDetail } = getStateFixture();
    pokemonDetail.byId['1'].status = AsyncStatus.loading;
    const store = mockStore({
      pokemonDetail,
    });

    render(
      <Router>
        <Detail id="1" />
      </Router>,
      {
        store,
      },
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('it shows an error', () => {
    const { pokemonDetail } = getStateFixture();
    pokemonDetail.byId['1'].status = AsyncStatus.failed;
    const store = mockStore({
      pokemonDetail,
    });

    render(
      <Router>
        <Detail id="1" retry={false} />
      </Router>,
      {
        store,
      },
    );
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  test('it shows an offline', () => {
    const { pokemonDetail } = getStateFixture();
    pokemonDetail.byId['1'].status = AsyncStatus.offline;
    const store = mockStore({
      pokemonDetail,
    });

    render(
      <Router>
        <Detail id="1" retry={false} />
      </Router>,
      {
        store,
      },
    );
    expect(screen.getByText(/check connection/i)).toBeInTheDocument();
  });
});
