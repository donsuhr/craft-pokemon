// copied from https://codepen.io/JiveDig/pen/jbdJXR/
import * as React from 'react';
import { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './StyledRadio.module.scss';

type Item = {
  value: string;
  label: string;
};

interface Props {
  items: Item[];
  value: string;
  name?: string;
  onChange?: (x: string) => void;
  className?: string;
}

const StyledRadio = ({
  items,
  value,
  name = 'toggle-switch',
  onChange,
  className,
}: Props) => {
  const [val, updateVal] = useState(value);

  useEffect(() => {
    updateVal(value);
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    updateVal(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  const cn = classNames(styles.toggle, className);

  return (
    <ul className={cn}>
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
