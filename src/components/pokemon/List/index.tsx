import * as React from 'react';
import { useSelector } from 'react-redux';
import { getFilteredItems } from '@/store/selectors';
import { ApplicationState } from '@/store/types';
import ListItem from './ListItem';
import { Item } from './types';
import styles from './List.module.scss';

// eslint-disable-next-line react/require-default-props
const PokemonList = () => {
  const items: Item[] = useSelector((state: ApplicationState) =>
    getFilteredItems(state),
  );
  return (
    <>
      <ul className={styles.list}>
        {items.map((x) => (
          <ListItem key={x.id} id={x.id} name={x.name} />
        ))}
      </ul>
    </>
  );
};

export default PokemonList;
