import * as React from 'react';
import classNames from 'classnames';
import styles from './Header.module.scss';

interface Props {
  title?: string;
}

const DEFAULT_TITLE = 'Pokémon';

export default function Header({ title = DEFAULT_TITLE }: Props) {
  const subtitlePrefix = title === DEFAULT_TITLE ? '' : `${DEFAULT_TITLE} - `;
  const endsDecender = /[gjpqy]/.test(title.substr(-6));
  const cn = classNames({
    [styles.logo]: true,
    [styles.logoEndsDecenders]: endsDecender,
  });

  return (
    <header className={styles.header}>
      <h1 className={cn}>
        <span className={styles.logoPokemon}>{title}</span>
        <span className={styles.logoRest}>
          {`${subtitlePrefix}San Diego Designs`}
        </span>
      </h1>
    </header>
  );
}
