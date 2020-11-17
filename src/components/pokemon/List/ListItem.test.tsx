import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@/test-utils';
import { getStateFixture, mockStoreCreator } from '@/store/mock-store-creator';
import { AsyncStatus } from '@/store/types';
import ListItem from './ListItem';

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
      <Router>
        <ListItem name="test target" id="4" />
      </Router>,
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
    const { container } = render(
      <Router>
        <ListItem name="test target" id="1" />
      </Router>,
      {
        store: mockStoreCreator(state),
      },
    );
    expect(container.querySelectorAll('.loading').length).toBe(1);
  });
});
