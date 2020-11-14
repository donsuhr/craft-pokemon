import * as React from 'react';
import { render, screen } from '@/test-utils';
import { mockStoreCreator, stateFixture } from '@/store/mock-store-creator';
import { ApplicationState } from '@/store/types';
import Map from './Map';
import { PokemonMapActionTypes } from './types';

jest.mock('./GoogleMapContainer.tsx', () => () => <div>target</div>);

describe('Map', () => {
  afterEach(() => jest.restoreAllMocks());

  test('it renders', () => {
    render(<Map id="1" />, {
      store: mockStoreCreator(stateFixture),
    });
    expect(
      screen.getAllByText(/current locations:[\w\r\n]*\s*\d/i).length,
    ).toBeGreaterThan(0);
  });

  test('it requests load', () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => {},
      }),
    );

    const state: ApplicationState = JSON.parse(JSON.stringify(stateFixture));
    state.pokemonMap.byId[1].hasEverLoaded = false;
    const store = mockStoreCreator(state);

    render(<Map id="1" />, { store });
    const expectedActions = [{ type: PokemonMapActionTypes.REQUEST }];
    expect(store.getActions()[0]).toMatchObject(expectedActions[0]);
  });

  test('it shows loadimg', () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => {},
      }),
    );

    const state: ApplicationState = JSON.parse(JSON.stringify(stateFixture));
    state.pokemonMap.byId[1].hasEverLoaded = true;
    state.pokemonMap.byId[1].isFetching = true;
    const store = mockStoreCreator(state);

    render(<Map id="1" />, { store });
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
