import * as React from 'react';
import { useState, useRef } from 'react';

import styles from './Search.module.scss';

interface Props {
  label?: string;
  value?: string;
  name?: string;
  idSuffix?: string;
  onChange?: (x: any) => any;
}

export default function Search({
  value = '',
  idSuffix = 'search',
  name = 'search',
  label = 'Search',
  onChange,
}: Props) {
  const [val, updateVal] = useState(value);
  const textInput = useRef(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    updateVal(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const id = `Search${idSuffix}`;
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Search..."
        // @ts-ignore: non-standard, webkit / blink only
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
}
