import * as React from 'react';
import { Link } from 'react-router-dom';
import { Item, Items } from './types';

// eslint-disable-next-line react/require-default-props
const PokemonList = ({ items = {} }: { items?: Items }) => {
  const list: Item[] = Object.values(items);
  return (
    <>
      <p>
        {' '}
        count x:
        {list.length}
      </p>
      <ul>
        {list.map((x) => (
          <li key={x.id}>
            <Link to={`/detail/${x.id}`}>{x.name}</Link>
            {' '}
          </li>
        ))}
      </ul>
    </>
  );
};

// PokemonList.defaultProps = {
// items: {},
// };

export default PokemonList;
