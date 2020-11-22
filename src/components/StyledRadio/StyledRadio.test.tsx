import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StyledRadio from './index';

describe('StyledRadio', () => {
  test('it renders', () => {
    const items = [{ value: 'a', label: 'a' }];

    render(<StyledRadio items={items} value="a" label="View" />);

    const input = screen.getByLabelText('a');
    expect(input).toBeInTheDocument();
  });

  test('it can change', () => {
    const handleit = jest.fn();

    const items = [
      { value: 'a', label: 'a' },
      { value: 'b', label: 'b' },
    ];

    render(
      <StyledRadio onChange={handleit} items={items} value="a" label="View" />,
    );

    const input = screen.getByLabelText('b');
    fireEvent.click(input);
    expect(handleit).toHaveBeenCalledWith('b');
  });

  test('it doesnt blow up if you dont send in onChange', () => {
    const items = [
      { value: 'a', label: 'a' },
      { value: 'b', label: 'b' },
    ];

    render(<StyledRadio items={items} value="a" label="View" />);

    const input = screen.getByLabelText('b');
    fireEvent.click(input);
    expect(input).toBeChecked();
  });

  test('it adds a className', () => {
    const items = [{ value: 'a', label: 'a' }];
    const className = 'testText';
    const { container } = render(
      <StyledRadio
        items={items}
        value="a"
        className={className}
        label="View"
      />,
    );
    const ul = container.querySelector('.styled-radio');

    expect(ul).toHaveClass(className);
  });

  test('it does not add "undefined" to className', () => {
    const items = [{ value: 'a', label: 'a' }];
    const { container } = render(
      <StyledRadio items={items} value="a" label="View" />,
    );
    const ul = container.querySelector('ul');

    expect(ul).not.toHaveClass('undefined');
  });
});
