import * as React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { getFilteredItems } from '@/store/selectors';
import { ApplicationState } from '@/store/types';
import { useLocation } from 'react-router-dom';
import ListItem from './ListItem';
import { Item } from './types';
import styles from './List.module.scss';

const PokemonList = () => {
  const location = useLocation();
  const items: Item[] = useSelector(
    (state: ApplicationState) => getFilteredItems(state, location),
    shallowEqual,
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
