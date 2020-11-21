import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import Pager from './index';

describe('Pager', () => {
  it('Renders ', () => {
    const { container } = render(
      <Router>
        <Pager total={10} perPage={2} page={2} />
      </Router>,
    );
    expect(container.querySelectorAll('.item').length).toBe(5);
  });

  it('Renders  disabled', () => {
    const { container } = render(
      <Router>
        <Pager total={7} perPage={2} page={2} disabled />
      </Router>,
    );
    expect(container.querySelectorAll('ol.disabled').length).toBe(1);
  });
});
