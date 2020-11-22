import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './index';

describe('Header', () => {
  it('Renders ', () => {
    render(<Header />);
    expect(screen.getByText('Pokémon')).toBeInTheDocument();
  });

  it('adds a classname to names with decenders', () => {
    const { container } = render(<Header title="gianty" />);
    expect(container.querySelector('h1')?.classList.length).toBe(2);
  });
});
