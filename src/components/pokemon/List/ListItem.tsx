import * as React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailState } from '@/store/selectors';
import { ApplicationState, AsyncStatus } from '@/store/types';
import { getItemById } from '../Detail/reducers';
import { fetchIfNeeded } from '../Detail/actions';
import Loading from '../../Loading';
import styles from './ListItem.module.scss';
import { Requestor } from '../Detail/types';

interface Props {
  id: string;
  name: string;
}

const ListItem = ({ id, name }: Props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIfNeeded(id, Requestor.ListItem));
  }, []);

  const {
    status,
    details: { img },
  } = useSelector((state: ApplicationState) =>
    getItemById(getDetailState(state), id),
  );

  return (
    <li className={styles.listItem}>
      {status === AsyncStatus.loading && <Loading />}
      <Link to={`/detail/${id}`} className={styles.link}>
        <img src={img} alt={name} className={styles.img} />
        <span className={styles.name}>{name}</span>
      </Link>
    </li>
  );
};

export default ListItem;
