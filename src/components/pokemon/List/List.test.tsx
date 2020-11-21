import * as React from 'react';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@/test-utils';
import { getStateFixture, mockStoreCreator } from '@/store/mock-store-creator';
import List from './index';
import { QUERY_KEY_VIEW, QUERY_VAL_BAG } from './ListViewToggle';

describe('List', () => {
  afterEach(() => jest.restoreAllMocks());

  test('it renders', async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => {},
      }),
    );
    const state = getStateFixture();
    state.pokemon.byId['4'] = {
      id: '4',
      name: 'test target',
      url: 'http://',
    };
    const { container } = render(
      <BrowserRouter>
        <List />
      </BrowserRouter>,
      {
        store: mockStoreCreator(state),
      },
    );
    await new Promise(setImmediate);
    expect(screen.getAllByText(/test target/i).length).toBeGreaterThan(0);
    expect(container.querySelectorAll('.listItem').length).toBe(4);
  });

  test('shows only items in bag', async () => {
    const state = getStateFixture();
    const history = createMemoryHistory();
    const route = `/?${QUERY_KEY_VIEW}=${QUERY_VAL_BAG}`;
    history.push(route);
    const { container } = render(
      <Router history={history}>
        <List />
      </Router>,
      {
        store: mockStoreCreator(state),
      },
    );
    await new Promise(setImmediate);
    expect(container.querySelectorAll('.listItem').length).toBe(2);
  });
});
