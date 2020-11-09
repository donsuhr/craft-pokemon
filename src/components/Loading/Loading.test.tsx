import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from './index';

describe('Loading', () => {
  const originalOffsetHeight = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'offsetHeight',
  );
  const originalOffsetWidth = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'offsetWidth',
  );
  const originalOffsetTop = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'offsetTop',
  );
  const originalOffsetLeft = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'offsetLeft',
  );

  beforeAll(() => {
    Object.defineProperties(window.HTMLElement.prototype, {
      offsetLeft: {
        get() {
          return parseFloat(window.getComputedStyle(this).marginLeft) || 0;
        },
      },
      offsetTop: {
        get() {
          return parseFloat(window.getComputedStyle(this).marginTop) || 0;
        },
      },
      offsetHeight: {
        get() {
          return parseFloat(window.getComputedStyle(this).height) || 0;
        },
      },
      offsetWidth: {
        get() {
          return parseFloat(window.getComputedStyle(this).width) || 0;
        },
      },
    });
  });

  afterAll(() => {
    Object.defineProperty(
      HTMLElement.prototype,
      'offsetHeight',
      originalOffsetHeight as PropertyDescriptor,
    );
    Object.defineProperty(
      HTMLElement.prototype,
      'offsetWidth',
      originalOffsetWidth as PropertyDescriptor,
    );
    Object.defineProperty(
      HTMLElement.prototype,
      'offsetTop',
      originalOffsetTop as PropertyDescriptor,
    );
    Object.defineProperty(
      HTMLElement.prototype,
      'offsetLeft',
      originalOffsetLeft as PropertyDescriptor,
    );
  });

  it('Renders ', () => {
    const testText = 'Loading...';
    render(<Loading>{testText}</Loading>);

    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  it('sets x and y', () => {
    render(
      <div style={{ width: 400, height: 300 }}>
        <Loading>loading...</Loading>
      </div>,
    );

    const el = screen.getByText(/loading/);
    expect(el.style.left).toBe('200px');
   expect(el.style.top).toBe('150px');
  });
});
