import * as React from 'react';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { fetchItemsIfNeeded } from './actions';
import List from './List';
import { ApplicationState } from '../../../reducers';
import { Items } from './types';
import Loading from '../../Loading';

interface ListContainerProps {
  items: Items;
  isFetching: boolean;
}

const ListContainer = ({ items, isFetching }: ListContainerProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchItemsIfNeeded());
  }, []);

  if (isFetching) {
    return <Loading>Loading...</Loading>;
  } 
    return <List items={items} />;
  
};

function mapStateToProps(state: ApplicationState) {
  return {
    items: state.pokemon.byId,
    isFetching: state.pokemon.isFetching,
  };
}

const ListConnected = connect(mapStateToProps)(ListContainer);

export default ListConnected;
