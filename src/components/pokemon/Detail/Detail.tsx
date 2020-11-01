import * as React from 'react';
import { Link } from 'react-router-dom';
import { Item } from '../List/types';
import styles from './detail.module.scss';

const PokemonDetail = ({ id, details }) => {
  const { img, height, weight, types, name, base_experience } = details;
  return (
    <>
      <h1>
        Pokemon San Diego Designs -
        {name}
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
            <dd>{base_experience}</dd>
          </dl>
          <ul className={styles.typesList}>
            {types.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <div className={styles.mapWrapper}>map</div>
      </div>
      <Link to="/">Back</Link>
    </>
  );
};

export default PokemonDetail;
