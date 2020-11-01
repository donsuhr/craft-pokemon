import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '../../../test-utils';
import DetailsContainer from './Detail.container';
import { RootState } from '../List/reducers';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../Map/Map.container', () => () => <div>target</div>);

const pokemonDetail: RootState = {
  byId: {
    1: {
      id: '1',
      details: {
        img: 'img',
        types: ['one', 'two'],
        name: 'title target',
      },
      hasEverLoaded: true,
      isFetching: false,
    },
  },
};

const pokemonBag = [1];

describe('Details Container', () => {
  it('Renders ', () => {
    render(
      <Router>
        <DetailsContainer id="1" />
      </Router>,
      {
        store: mockStore({ pokemonDetail, pokemonBag }),
      },
    );

    expect(screen.getAllByText(/title target/i).length).toBeGreaterThan(0);
  });

  it('will show loading ', () => {
    const pokemonLocal: RootState = JSON.parse(JSON.stringify(pokemonDetail));
    pokemonLocal.byId['1'].isFetching = true;

    render(<DetailsContainer id="1" />, {
      store: mockStore({ pokemonDetail: pokemonLocal }),
    });

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});
