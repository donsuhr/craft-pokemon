import * as React from 'react';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { fetchIfNeeded } from './actions';
import { getItemById } from './reducers';
import PokemonMap from './Map';
import { ApplicationState } from '../../../reducers';
import { Item } from '../List/types';
import Loading from '../../Loading';

interface ContainerProps {
  id: Item;
  isFetching: boolean;
  locations: Array;
}

interface OwnPropsType {
  id: string;
}

const Container = ({
  id,
  locations,
  isFetching,
}: ContainerProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIfNeeded(id));
  }, []);

  if (isFetching) {
    return <Loading withBg>Loading...</Loading>;
  }
  return <PokemonMap id={id} locations={locations} />;
  
};

function mapStateToProps(state: ApplicationState, ownProps: OwnPropsType) {
  const item = getItemById(state.pokemonMap, ownProps.id);
  return {
    id: ownProps.id,
    isFetching: item.isFetching,
    locations: item.locations  
  };
}

const Connected = connect(mapStateToProps)(Container);

export default Connected as MapContainer;
