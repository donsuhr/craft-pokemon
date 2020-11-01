import renderer from 'react-test-renderer';
import * as React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import List from './List';
import { Items } from './types';

let container: HTMLElement | null;
jest.mock('./ListItem.container', () => () => <div>target</div>);

describe('List', () => {
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
    const items: Items = {
      2: {
        id: '2',
        name: 'name',
        url: 'http://',
      },
    };
    const sut = renderer.create(
      <Router>
        <List items={items} />
      </Router>,
    );
    expect(sut.toJSON()).toMatchSnapshot();
  });

  test('it renders empty', () => {
    const sut = renderer.create(<List />);
    expect(sut.toJSON()).toMatchSnapshot();
  });
});
