import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@/test-utils';
import { getStateFixture, mockStoreCreator } from '@/store/mock-store-creator';
import List from './index';

describe('List', () => {
  afterEach(() => jest.restoreAllMocks());

  test('it renders', async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => {},
      }),
    );
    const state = getStateFixture();
    state.pokemon.byId['4'] = {
      id: '4',
      name: 'test target',
      url: 'http://',
    };
    render(
      <Router>
        <List />
      </Router>,
      {
        store: mockStoreCreator(state),
      },
    );
    await new Promise(setImmediate);
    expect(screen.getAllByText(/test target/i).length).toBeGreaterThan(0);
  });
});
