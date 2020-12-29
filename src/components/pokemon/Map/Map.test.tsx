import * as React from 'react';
import { render, screen } from '@/test-utils';
import { getStateFixture, mockStoreCreator } from '@/store/mock-store-creator';
import { AsyncStatus } from '@/store/types';
import Map from './Map';
import { PokemonMapActionTypes } from './types';

jest.mock('./GoogleMapContainer.tsx', () => () => <div>target</div>);

describe('Map', () => {
  afterEach(() => jest.restoreAllMocks());

  test('it renders', () => {
    const state = getStateFixture();
    render(<Map id="1" />, {
      store: mockStoreCreator(state),
    });
    expect(
      screen.getAllByText(/current locations:[\w\r\n]*\s*\d/i).length,
    ).toBeGreaterThan(0);
  });

  test('it requests load', () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => {},
      }),
    );

    const state = getStateFixture();
    state.pokemonMap.byId[1].status = AsyncStatus.initial;
    const store = mockStoreCreator(state);

    render(<Map id="1" />, { store });
    const expectedActions = [{ type: PokemonMapActionTypes.REQUEST }];
    expect(store.getActions()[0]).toMatchObject(expectedActions[0]);
  });

  test('it shows loadimg', () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => {},
      }),
    );

    const state = getStateFixture();
    state.pokemonMap.byId[1].status = AsyncStatus.loading;
    const store = mockStoreCreator(state);

    render(<Map id="1" />, { store });
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('it shows error', () => {
    const state = getStateFixture();
    state.pokemonMap.byId[1].status = AsyncStatus.failed;
    const store = mockStoreCreator(state);

    render(<Map id="1" />, { store });
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  test('it shows offline', () => {
    const state = getStateFixture();
    state.pokemonMap.byId[1].status = AsyncStatus.offline;
    const store = mockStoreCreator(state);

    render(<Map id="1" />, { store });
    expect(screen.getByText(/offline/i)).toBeInTheDocument();
  });
});
