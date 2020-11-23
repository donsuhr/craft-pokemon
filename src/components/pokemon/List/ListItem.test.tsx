import * as React from 'react';
import { Router, BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@/test-utils';
import { getStateFixture, mockStoreCreator } from '@/store/mock-store-creator';
import { AsyncStatus } from '@/store/types';
import { QUERY_KEY_SEARCH } from '@/components/Search';
import ListItem from './ListItem';
import { PokemonDetailsActionTypes } from '../Detail/types';

describe('ListItem', () => {
  afterEach(() => jest.restoreAllMocks());

  test('it renders', async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => {},
      }),
    );
    const state = getStateFixture();
    render(
      <BrowserRouter>
        <ListItem name="test target" id="4" />
      </BrowserRouter>,
      {
        store: mockStoreCreator(state),
      },
    );
    await new Promise(setImmediate);
    expect(screen.getAllByText(/test target/i).length).toBeGreaterThan(0);
  });

  test('it shows loading', () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => {},
      }),
    );
    const state = getStateFixture();
    state.pokemonDetail.byId['1'].status = AsyncStatus.loading;
    const store = mockStoreCreator(state);
    const history = createMemoryHistory();
    const route = `/`;
    history.push(route);
    const { container } = render(
      <Router history={history}>
        <ListItem name="test target" id="1" />
      </Router>,
      {
        store,
      },
    );
    expect(container.querySelectorAll('.loading').length).toBe(1);
  });

  test('it delays loading items from search', () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => {},
        sttus: 200,
      }),
    );
    jest.useFakeTimers();
    const state = getStateFixture();
    const store = mockStoreCreator(state);
    const history = createMemoryHistory();
    const route = `/?${QUERY_KEY_SEARCH}=things`;
    history.push(route);
    render(
      <Router history={history}>
        <ListItem name="test target" id="4" />
      </Router>,
      {
        store,
      },
    );
    const expectedAction = [
      {
        type: PokemonDetailsActionTypes.REQUEST_DETAILS,
        payload: { id: '4' },
      },
    ];
    // await new Promise(setImmediate);
    expect(store.getActions()).toHaveLength(0);
    jest.runAllTimers();
    // await new Promise(setImmediate);
    expect(store.getActions()).toHaveLength(1);
    expect(store.getActions()[0]).toMatchObject(expectedAction[0]);
  });
});
