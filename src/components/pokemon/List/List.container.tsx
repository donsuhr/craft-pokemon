import * as React from 'react';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { fetchItemsIfNeeded } from './actions';
import List from './List';
import { ApplicationState } from '../../../reducers';
import { Items } from './types';

interface ListContainerProps {
  items: Items;
  isFetching: boolean;
}

const ListContainer = ({ items, isFetching }: ListContainerProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchItemsIfNeeded());
  }, []);

  return (
    <div>
      <p>
        isFetching:
        {isFetching ? 'true' : 'false'}
      </p>

      <List items={items} />
    </div>
  );
};

function mapStateToProps(state: ApplicationState) {
  return {
    items: state.pokemon.byId,
    isFetching: state.pokemon.isFetching,
  };
}

const ListConnected = connect(mapStateToProps)(ListContainer);

export default ListConnected;
