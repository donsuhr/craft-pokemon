import * as React from 'react';
import { useState } from 'react';

import styles from './ListViewToggle.module.scss';
// https://codepen.io/JiveDig/pen/jbdJXR/
const component = ({
  items,
  initialVal,
  idSuffix = 'toggle-switch',
  name = 'toggle-switch',
  onChange,
}) => {
  const [val, updateVal] = useState(initialVal);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    updateVal(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <form className={styles.toggle}>
      <ul>
        {items.map((x, i) => {
          const id = `Toggle${i}${idSuffix}`;
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
    </form>
  );
};

export default component as ListViewToggle;
