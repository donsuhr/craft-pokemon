import * as React from 'react';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { fetchItemsIfNeeded } from './actions';
import { setViewAll } from '../../ui/actions';
import { ApplicationState, filterItems } from '../../../reducers';
import { Items } from './types';
import Loading from '../../Loading';
import List from './List';
import ListViewToggle from './ListViewToggle';

interface ListContainerProps {
  items: Items;
  isFetching: boolean;
}

const ListContainer = ({
  items,
  isFetching,
  isViewAll,
}: ListContainerProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchItemsIfNeeded());
  }, []);

  const handleToggleChange = (view) => {
    dispatch(setViewAll(view === 'all'));
  };

  const toggleItems = [
    { label: 'All', value: 'all' },
    { label: 'In Bag', value: 'inbag' },
  ];
  const initalVal = isViewAll ? 'all' : 'inbag';

  if (isFetching) {
    return <Loading withBg>Loading...</Loading>;
  }
  return (
    <>
      <ListViewToggle
        items={toggleItems}
        onChange={handleToggleChange}
        initialVal={initalVal}
      />
      <List items={items} />
    </>
  );
};

function mapStateToProps(state: ApplicationState, ownProps) {
  const items = filterItems(state);
  return {
    items,
    isFetching: state.pokemon.isFetching,
    isViewAll: state.ui.viewAll,
  };
}

const ListConnected = connect(mapStateToProps)(ListContainer);

export default ListConnected;
