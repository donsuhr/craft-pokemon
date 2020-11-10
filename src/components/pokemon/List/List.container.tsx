import * as React from 'react';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { fetchItemsIfNeeded } from './actions';
import { setViewAll, setTextFilter } from '../../../redux/ui/actions';
import { ApplicationState, filterItems } from '../../../redux/reducers';
import { Items } from './types';
import Loading from '../../Loading';
import List from './List';
import ListViewToggle from './ListViewToggle';
import Search from '../../Search';

interface ListContainerProps {
  items: Items;
  isFetching: boolean;
}

const ListContainer = ({
  items,
  isFetching,
  isViewAll,
  filterText,
}: ListContainerProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchItemsIfNeeded());
  }, []);

  const handleToggleChange = (view) => {
    dispatch(setViewAll(view === 'all'));
  };
  const handleSearchChange = (text) => {
    dispatch(setTextFilter(text));
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
      <Search onChange={handleSearchChange} initialVal={filterText} />
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
    filterText: state.ui.filterText,
  };
}

const ListConnected = connect(mapStateToProps)(ListContainer);

export default ListConnected;
