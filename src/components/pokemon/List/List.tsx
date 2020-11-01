import * as React from 'react';
import ListItem from './ListItem.container';
import { Item, Items } from './types';
import styles from './list.module.scss';

// eslint-disable-next-line react/require-default-props
const PokemonList = ({ items = {} }: { items?: Items }) => {
  const list: Item[] = Object.values(items);
  return (
    <ul className={styles.list}>
      {list.map((x) => (
        <ListItem key={x.id} id={x.id} name={x.name} />
      ))}
    </ul>
  );
};

// PokemonList.defaultProps = {
// items: {},
// };

export default PokemonList;
