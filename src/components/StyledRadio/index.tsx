// copied from https://codepen.io/JiveDig/pen/jbdJXR/
import * as React from 'react';
import { useState } from 'react';

import styles from './StyledRadio.module.scss';

type Item = {
  value: string;
  label: string;
};

interface Props {
  items: Item[];
  value: string;
  name?: string; // eslint-disable-line react/require-default-props
  onChange?: (x: string) => void; // eslint-disable-line react/require-default-props
  className?: string; // eslint-disable-line react/require-default-props
}

const StyledRadio = ({
  items,
  value,
  name = 'toggle-switch',
  onChange,
  className,
}: Props) => {
  const [val, updateVal] = useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    updateVal(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <ul className={`${styles.toggle} ${className}`}>
      {items.map((x, i) => {
        const id = `StyledRadio${i}${name}`;
        return (
          <li key={id}>
            <input
              type="radio"
              id={id}
              name={name}
              value={x.value}
              checked={val === x.value}
              onChange={handleChange}
            />
            <label htmlFor={id}>{x.label}</label>
          </li>
        );
      })}
    </ul>
  );
};

export default StyledRadio;
