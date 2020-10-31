import * as React from 'react';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { fetchItemsIfNeeded } from './actions';
import { getItemById } from './reducers';
import Detail from './Detail';
import { ApplicationState } from '../../reducers';
import { Item } from './types';

interface DetailsContainerProps {
  item: Item;
  isFetching: boolean;
}

interface OwnPropsType {
  id: string;
}

const DetailsContainer = ({
  item: { id, name, url },
  isFetching,
}: DetailsContainerProps) => {
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

      <Detail id={id} name={name} url={url} />
    </div>
  );
};

function mapStateToProps(state: ApplicationState, ownProps: OwnPropsType) {
  return {
    item: getItemById(state.pokemon, ownProps.id),
    isFetching: state.pokemon.isFetching,
  };
}

const DetailsConnected = connect(mapStateToProps)(DetailsContainer);

export default DetailsConnected;
