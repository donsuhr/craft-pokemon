import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDetailState } from '@/store/selectors';
import { ApplicationState, AsyncStatus } from '@/store/types';
import styles from './Detail.module.scss';
import Map from '../Map/Map';
import InBagCheckbox from '../Bag/InBagCheckbox';
import { getItemById } from './reducers';
import { fetchIfNeeded } from './actions';
import Loading from '../../Loading';
import { Requestor } from './types';

interface Props {
  id: string;
  retry?: boolean;
}

const renders = 0;
const PokemonDetail = ({ id, retry=true }: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIfNeeded({ id, retry, requestor: Requestor.Details }));
  }, []);

  const { status, details } = useSelector((state: ApplicationState) =>
    getItemById(getDetailState(state), id),
  );

  const {
    img,
    height,
    weight,
    types,
    name,
    baseExperience,
    abilities,
  } = details;

  if (status === AsyncStatus.failed) {
    return (
      <>
        <p className="error">There was an error loading the details...</p>
        <Link to="/">Back</Link>
      </>
    );
  }

  if (status === AsyncStatus.offline) {
    return (
      <>
        <p className="error">Error loading details. Check connection...</p>
        <Link to="/">Back</Link>
      </>
    );
  }

  if (status === AsyncStatus.loading || details?.name === '') {
    return <Loading withBg>Loading...</Loading>;
  }

  return (
    <>
      <h1>
        Pokemon San Diego Designs - 
        {' '}
        {name} 
        {' '}
        {renders}
      </h1>
      <div className={styles.container}>
        <div className={styles.details}>
          <img src={img} alt={name} className={styles.img} />
          <p className={styles.name}>{name}</p>
          <dl className={styles.statList}>
            <dt>Height</dt>
            <dd>{height}</dd>
            <dt>Weight</dt>
            <dd>{weight}</dd>
            <dt>Base Experience</dt>
            <dd>{baseExperience}</dd>
          </dl>
          <InBagCheckbox id={id} />
          <ul className={styles.typesList}>
            {types.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <ul className={styles.typesList}>
            {abilities.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>

        <div className={styles.mapWrapper}>
          <Map id={id} />
        </div>
      </div>
      <Link to="/">Back</Link>
    </>
  );
};

export default PokemonDetail;
