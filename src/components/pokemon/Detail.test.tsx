import renderer from 'react-test-renderer';
import * as React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import Detail from './Detail';
import { Item } from './types';

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
    const item: Item = {
      id: '2',
      name: 'title',
      url: 'body',
    };
    const sut = renderer.create(
      <Detail id={item.id} name={item.name} url={item.url} />,
    );
    expect(sut.toJSON()).toMatchSnapshot();
  });
});
