import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMapState } from '@/store/selectors';
import { ApplicationState, AsyncStatus } from '@/store/types';
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
    dispatch(fetchIfNeeded(id, true));
  }, []);
  const { status, locations } = useSelector((state: ApplicationState) =>
    getItemById(getMapState(state), id),
  );

  if (status === AsyncStatus.initial || status === AsyncStatus.loading) {
    return <Loading withBg>Loading...</Loading>;
  }

  if (status === AsyncStatus.offline) {
    return <p>Offline...</p>;
  }

  const count =
    status === AsyncStatus.succeeded
      ? locations.length
      : 'Error loading locations';

  return (
    <>
      <GoogleMap locations={locations} />
      <p>
        Current Locations:
        {count}
      </p>
    </>
  );
};

export default Map;
