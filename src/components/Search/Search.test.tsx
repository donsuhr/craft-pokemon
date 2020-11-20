import * as React from 'react';
import { render, screen, fireEvent, createEvent } from '@testing-library/react';
import Search from './index';

describe('Search', () => {
  it('Renders ', () => {
    render(<Search label="mySearch" />);
    expect(screen.getByText(/mysearch/i)).toBeInTheDocument();
  });

  it('can call a change handler', () => {
    const handleChange = jest.fn();
    render(<Search onChange={handleChange} />);
    const input = screen.getByLabelText('Search');

    fireEvent.change(input, { target: { value: '2020-05-12' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('does not submit', () => {
    render(<Search />);
    const input = screen.getByLabelText('Search');

    fireEvent.change(input, { target: { value: '2020-05-12' } });
    const myEvent = createEvent.submit(input);
    fireEvent(input, myEvent);
    expect(myEvent.defaultPrevented).toBeTruthy();
  });
});
