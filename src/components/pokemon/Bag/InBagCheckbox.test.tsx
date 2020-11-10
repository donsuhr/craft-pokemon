import configureMockStore from 'redux-mock-store';
import * as React from 'react';
import { render, screen, fireEvent } from '../../../test-utils';
import InBagCheckbox from './InBagCheckbox';
import { PokemonBagActionTypes } from './types';

const mockStore = configureMockStore();
const pokemonBag = ['1'];

describe('InBagCheckbox', () => {
  it('Renders ', () => {
    render(<InBagCheckbox id="4" />, { store: mockStore({ pokemonBag }) });

    expect(screen.getByText(/in bag/i)).toBeInTheDocument();
  });

  it('it is checked if in bag ', () => {
    render(<InBagCheckbox id="1" />, { store: mockStore({ pokemonBag }) });
    const input = screen.getByLabelText(/in bag/i) as HTMLInputElement;
    expect(input.checked).toBeTruthy();
  });

  it('dispatchs add', () => {
    const store = mockStore({ pokemonBag });

    render(<InBagCheckbox id="2" />, { store });

    const input = screen.getByLabelText(/in bag/i);
    fireEvent.click(input);
    const expectedAction = { type: PokemonBagActionTypes.ADD, payload: '2' };
    expect(store.getActions()[0]).toMatchObject(expectedAction);
  });
  it('dispatchs remove', () => {
    const store = mockStore({ pokemonBag });

    render(<InBagCheckbox id="1" />, { store });

    const input = screen.getByLabelText(/in bag/i);
    fireEvent.click(input);
    const expectedAction = { type: PokemonBagActionTypes.REMOVE, payload: '1' };
    expect(store.getActions()[0]).toMatchObject(expectedAction);
  });
});
