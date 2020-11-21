import * as React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { fireEvent, render, screen } from '@testing-library/react';
import ListViewToggle, { QUERY_VAL_BAG } from './ListViewToggle';

describe('ListViewToggle', () => {
  test('it checks all', () => {
    const history = createMemoryHistory();
    const route = '/?view=anything';
    history.push(route);
    render(
      <Router history={history}>
        <ListViewToggle />
      </Router>,
    );
    expect(screen.getByLabelText(/all/i)).toBeChecked();
  });

  test('it checks bag', () => {
    const history = createMemoryHistory();
    const route = `/?view=${QUERY_VAL_BAG}`;
    history.push(route);
    render(
      <Router history={history}>
        <ListViewToggle />
      </Router>,
    );
    expect(screen.getByLabelText(/in bag/i)).toBeChecked();
  });

  test('it pushes a new state to the history', () => {
    const history = createMemoryHistory();
    history.push = jest.fn();

    render(
      <Router history={history}>
        <ListViewToggle />
      </Router>,
    );

    const radio = screen.getByLabelText('In Bag');
    fireEvent.click(radio, {});

    expect(history.push).toHaveBeenCalledWith(
      expect.stringMatching(/view=bag/),
    );
  });
});
