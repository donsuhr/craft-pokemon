import * as React from 'react';
import { getStateFixture, mockStoreCreator } from '@/store/mock-store-creator';
import { render, screen, fireEvent } from '@/test-utils';
import InBagCheckbox from './InBagCheckbox';
import { PokemonBagActionTypes } from './types';

describe('InBagCheckbox', () => {
  it('Renders ', () => {
    const state = getStateFixture();
    render(<InBagCheckbox id="4" />, {
      store: mockStoreCreator(state),
    });

    expect(screen.getByText(/in bag/i)).toBeInTheDocument();
  });

  it('it is checked if in bag ', () => {
    const state = getStateFixture();
    render(<InBagCheckbox id="1" />, {
      store: mockStoreCreator(state),
    });
    const input = screen.getByLabelText(/in bag/i) as HTMLInputElement;
    expect(input.checked).toBeTruthy();
  });

  it('dispatchs add', () => {
    const state = getStateFixture();
    const store = mockStoreCreator(state);

    render(<InBagCheckbox id="3" />, {
      store,
    });

    const input = screen.getByLabelText(/in bag/i);
    fireEvent.click(input);
    const expectedAction = { type: PokemonBagActionTypes.ADD, payload: '3' };
    expect(store.getActions()[0]).toMatchObject(expectedAction);
  });

  it('dispatchs remove', () => {
    const state = getStateFixture();
    const store = mockStoreCreator(state);

    render(<InBagCheckbox id="1" />, { store });

    const input = screen.getByLabelText(/in bag/i);
    fireEvent.click(input);
    const expectedAction = { type: PokemonBagActionTypes.REMOVE, payload: '1' };
    expect(store.getActions()[0]).toMatchObject(expectedAction);
  });
});
