import * as React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Pager.module.scss';

interface Props {
  disabled?: boolean;
  total: number;
  page: number;
  perPage: number;
}

export default function Pager({
  page,
  total,
  perPage,
  disabled = false,
}: Props) {
  const pages = [];
  for (let i = 1; i <= Math.ceil(total / perPage); i += 1) {
    const className = classNames({
      [styles.link]: true,
      [styles.current]: i === page,
    });
    pages.push({
      id: i,
      text: i,
      to: { pathnName: '/', search: `?page=${i}` },
      className,
    });
  }

  return (
    <ol
      className={classNames({
        [styles.pager]: true,
        [styles.disabled]: disabled,
      })}
    >
      {pages.map((x) => (
        <li key={x.id} className={styles.item}>
          {disabled ? (
            <span className={x.className}>{x.text}</span>
          ) : (
            <Link to={x.to} className={x.className}>
              {x.text}
            </Link>
          )}
        </li>
      ))}
    </ol>
  );
}
