import renderer from 'react-test-renderer';
import * as React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Detail from './Detail';
import { Item } from '../List/types';

let container: HTMLElement | null;

describe('Detail', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (container) {
      unmountComponentAtNode(container);
      container?.parentElement?.removeChild(container);
      container = null;
    }
  });

  test('it renders', () => {
    const details = {
      img: 'img',
      types: ['one', 'two'],
      name: 'title target',
    };

    const sut = renderer.create(
      <Router>
        <Detail id="1" details={details} />
      </Router>,
    );
    expect(sut.toJSON()).toMatchSnapshot();
  });
});
