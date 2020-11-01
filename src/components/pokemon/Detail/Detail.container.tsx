import * as React from 'react';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { fetchIfNeeded } from './actions';
import { getItemById } from './reducers';
import Detail from './Detail';
import { ApplicationState } from '../../../reducers';
import { Item } from '../List/types';
import Loading from '../../Loading';

interface DetailsContainerProps {
  item: Item;
  isFetching: boolean;
}

interface OwnPropsType {
  id: string;
}

const DetailsContainer = ({
  id,
  details,
  isFetching,
}: DetailsContainerProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIfNeeded(id));
  }, []);

  if (isFetching) {
    return <Loading withBg>Loading...</Loading>;
  }
  return <Detail id={id} details={details} />;
};

function mapStateToProps(state: ApplicationState, ownProps: OwnPropsType) {
  const item = getItemById(state.pokemonDetail, ownProps.id);
  return {
    id: ownProps.id,
    isFetching: item.isFetching,
    details: item.details  
  };
}

const DetailsConnected = connect(mapStateToProps)(DetailsContainer);

export default DetailsConnected;
