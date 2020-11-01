import * as React from 'react';
import { Link } from 'react-router-dom';
import styles from './listItem.module.scss';

interface Props {
  id: string;
  name: string;
  img: string;
}

const ListItem = ({ id, name, img }: Props) => {
  return (
    <Link to={`/detail/${id}`} className={styles.link}>
      <img src={img} alt={name} className={styles.img} />
      <span className={styles.name}>{name}</span>
    </Link>
  );
};

export default ListItem;
