import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMapState } from '@/store/selectors';
import { ApplicationState } from '@/store/types';
import { fetchIfNeeded } from './actions';
import { getItemById } from './reducers';
import GoogleMap from './GoogleMapContainer';
import Loading from '../../Loading';

interface Props {
  id: string;
}

const Map = ({ id }: Props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIfNeeded(id));
  }, []);
  const { isFetching, locations } = useSelector((state: ApplicationState) =>
    getItemById(getMapState(state), id),
  );

  if (isFetching) {
    return <Loading withBg>Loading...</Loading>;
  }
  return (
    <>
      <GoogleMap locations={locations} />
      <p>
        Current Locations:
        {' '}
        {locations.length}
      </p>
    </>
  );
};

export default Map;
