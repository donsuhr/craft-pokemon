import * as React from 'react';
import { useState, useRef } from 'react';

import styles from './Search.module.scss';

const component = ({
  initialVal = '',
  idSuffix = 'search',
  name = 'search',
  label = 'Search',
  onChange,
}) => {
  const [val, updateVal] = useState(initialVal);
  const textInput = useRef(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    updateVal(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const id = `Search{i}${idSuffix}`;
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Search..."
        incremental="true"
        id={id}
        ref={textInput}
        name={name}
        value={val}
        onChange={handleChange}
      />
      <label htmlFor={id}>{label}</label>
    </form>
  );
};

export default component as ListViewToggle;
