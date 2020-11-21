import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import {
  getBagState,
  getFilteredItems,
  getListState,
  UNFILTERED_PAGE_LIMIT,
} from '@/store/selectors';
import { ApplicationState } from '@/store/types';
import Pager from '@/components/Pager';
import ListItem from './ListItem';
import { Item } from './types';
import styles from './List.module.scss';
import { getLength } from './reducers';
import { getLength as getBagStageLength } from '../Bag/reducers';
import { QUERY_VAL_BAG } from './ListViewToggle';

const PokemonList = () => {
  const location = useLocation();
  const [page, updatePage] = React.useState(0);
  const [total, updateTotal] = React.useState(0);
  const [pagerDisabled, updatePagerDisabled] = React.useState(false);

  const totalTotal = useSelector((state: ApplicationState) =>
    getLength(getListState(state)),
  );

  const inBagTotal = useSelector((state: ApplicationState) =>
    getBagStageLength(getBagState(state)),
  );

  const items: Item[] = useSelector(
    (state: ApplicationState) => getFilteredItems(state, location),
    shallowEqual,
  );

  React.useEffect(() => {
    const query = new URLSearchParams(location.search);
    const locPage = parseInt(query.get('page') || '1', 10);
    updatePage(locPage);
    const isSearch = (query.get('s') || '').trim() !== '';
    const isBagView = query.get('view') === QUERY_VAL_BAG;

    updateTotal(isBagView ? inBagTotal : totalTotal);
    updatePagerDisabled(isSearch);
  }, [location]);

  return (
    <>
      <Pager
        page={page}
        total={total}
        perPage={UNFILTERED_PAGE_LIMIT}
        disabled={pagerDisabled}
      />
      <ul className={styles.list}>
        {items.map((x) => (
          <ListItem key={x.id} id={x.id} name={x.name} />
        ))}
      </ul>
    </>
  );
};

export default PokemonList;
