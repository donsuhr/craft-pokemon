import * as React from 'react';
import { useState, useRef, useEffect } from 'react';

import styles from './Search.module.scss';

interface Props {
  label?: string;
  value?: string;
  name?: string;
  idSuffix?: string;
  onChange?: (x: any) => any;
}

export const QUERY_KEY_SEARCH = 's';

export default function Search({
  value = '',
  idSuffix = 'search',
  name = 'search',
  label = 'Search',
  onChange,
}: Props) {
  const [val, updateVal] = useState(value);
  const textInput = useRef(null);

  useEffect(() => {
    updateVal(value);
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    <form
      className={`${styles.form} search-form`}
      onSubmit={handleSubmit}
      role="search"
    >
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
