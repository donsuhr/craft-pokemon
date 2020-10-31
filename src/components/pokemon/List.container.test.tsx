import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '../../test-utils';
import ListContainer from './List.container';
import { RootState } from './reducers';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const pokemon: RootState = {
  byId: {
    1: { id: '1', name: 'title target', url: 'url' },
  },
  hasEverLoaded: true,
  isFetching: false,
};
describe('List Container', () => {
  it('Renders ', () => {
    render(
      <Router>
        <ListContainer />
      </Router>,
      {
        store: mockStore({ pokemon }),
      },
    );

    expect(screen.getByText(/title target/i)).toBeInTheDocument();
  });

  it('will show loading ', () => {
    const pokemonLocal: RootState = {
      ...pokemon,
      isFetching: true,
    };
    render(
      <Router>
        <ListContainer />
      </Router>,
      {
        store: mockStore({ pokemon: pokemonLocal }),
      },
    );

    expect(screen.getByText(/true/i)).toBeInTheDocument();
  });
});
