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
  label: string;
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
  label,
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

  const cn = classNames(styles.toggle, className, 'styled-radio');

  return (
    <div className={cn}>
      <div className="sr-only" id={`StyledRadio${name}`}>
        {label}
      </div>
      <ul role="radiogroup" aria-labelledby={`StyledRadio${name}`}>
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
    </div>
  );
};

export default StyledRadio;
