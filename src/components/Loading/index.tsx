import * as React from 'react';
import { useCallback, ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './Loading.module.scss';

const cx = classNames.bind(styles as any);

interface Props {
  // eslint-disable-next-line react/require-default-props
  children?: ReactNode;
  // eslint-disable-next-line react/require-default-props
  withBg?: boolean;
}

export default function Loading({ children, withBg = false }: Props) {
  const measuredRef = useCallback((node) => {
    if (node !== null) {
      const { parentNode } = node;
      const x = parentNode.offsetWidth / 2 - node.offsetWidth / 2;
      const y = Math.max(
        0,
        parentNode.offsetHeight / 2 - node.offsetHeight / 2,
      );
      node.style.left = `${x}px`; // eslint-disable-line no-param-reassign
      node.style.top = `${y}px`; // eslint-disable-line no-param-reassign
    }
  }, []);

  const className = cx({
    loading: true,
    'loading--with-background': withBg,
  });
  return (
    <div className={className} ref={measuredRef}>
      {children}
    </div>
  );
}
