import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as React from 'react';
import { render, screen } from '../../test-utils';
import DetailsContainer from './Detail.container';
import { RootState } from './reducers';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const pokemon: RootState = {
  byId: {
    1: { id: '1', name: 'title target', url: 'body' },
  },
  hasEverLoaded: true,
  isFetching: false,
};
describe('Details Container', () => {
  it('Renders ', () => {
    render(<DetailsContainer id="1" />, {
      store: mockStore({ pokemon }),
    });

    expect(screen.getByText(/title target/i)).toBeInTheDocument();
  });
  it('will show loading ', () => {
    const pokemonLocal: RootState = {
      ...pokemon,
      isFetching: true,
    };
    render(<DetailsContainer id="1" />, {
      store: mockStore({ pokemon: pokemonLocal }),
    });

    expect(screen.getByText(/true/i)).toBeInTheDocument();
  });
});
