import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@/test-utils';
import { mockStoreCreator, stateFixture } from '@/store/mock-store-creator';
import ListItem from './ListItem';

describe('ListItem', () => {
  afterEach(() => jest.restoreAllMocks());

  test('it renders', async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => {},
      }),
    );
    const state = {
      ...stateFixture,
    };
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
        ok: true,
        json: () => {},
      }),
    );
    const state = JSON.parse(JSON.stringify(stateFixture));
    state.pokemonDetail.byId[4] = {
      ...stateFixture.pokemonDetail.byId[1],
      isFetching: true,
    };
    const { container } = render(
      <Router>
        <ListItem name="test target" id="4" />
      </Router>,
      {
        store: mockStoreCreator(state),
      },
    );
    expect(container.querySelectorAll('.loading').length).toBe(1);
  });
});
