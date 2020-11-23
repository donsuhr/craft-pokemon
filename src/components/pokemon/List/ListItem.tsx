import * as React from 'react';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailState } from '@/store/selectors';
import { ApplicationState, AsyncStatus, LocationState } from '@/store/types';
import { QUERY_KEY_SEARCH } from '@/components/Search';
import { getItemById } from '../Detail/reducers';
import { fetchIfNeeded } from '../Detail/actions';
import Loading from '../../Loading';
import styles from './ListItem.module.scss';
import { Requestor } from '../Detail/types';

interface Props {
  id: string;
  name: string;
}

function checkLocationForSearchTerm(location: LocationState) {
  const query = new URLSearchParams(location.search);
  return !!query.get(QUERY_KEY_SEARCH);
}

const ListItem = ({ id, name }: Props) => {
  const dispatch = useDispatch();
  const location = useLocation();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (checkLocationForSearchTerm(location)) {
      const timeout = setTimeout(() => {
        dispatch(fetchIfNeeded({ id, requestor: Requestor.ListItem }));
      }, 1500);
      return () => {
        clearTimeout(timeout);
      };
    }
    dispatch(fetchIfNeeded({ id, requestor: Requestor.ListItem }));
  }, [location]);

  const {
    status,
    details: { img },
  } = useSelector((state: ApplicationState) =>
    getItemById(getDetailState(state), id),
  );

  return (
    <li className={styles.item}>
      {status === AsyncStatus.loading && <Loading />}
      <Link
        to={{ pathname: `/detail/${id}`, search: location.search }}
        className={styles.link}
      >
        <img src={img} alt={name} className={styles.img} />
        <span className={styles.name}>{name}</span>
      </Link>
    </li>
  );
};

export default ListItem;
