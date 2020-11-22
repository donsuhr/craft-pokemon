import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Pager.module.scss';

interface Props {
  disabled?: boolean;
  total: number;
  page: number;
  perPage: number;
}

type LinkAttributes = {
  id: string;
  text: string;
  to: {
    pathnName: string;
    search: string;
  };
  className: string;
};

export const QUERY_KEY_PAGE = 'page';

export default function Pager({
  page,
  total,
  perPage,
  disabled = false,
}: Props) {
  const location = useLocation();
  const [pages, updatePages] = React.useState<LinkAttributes[]>([]);

  function calculatePages() {
    const result: LinkAttributes[] = [];
    const search = new URLSearchParams(location.search);
    for (let i = 1; i <= Math.ceil(total / perPage); i += 1) {
      search.set(QUERY_KEY_PAGE, i.toString());
      const className = classNames({
        [styles.link]: true,
        [styles.current]: i === page,
        current: i === page,
      });
      result.push({
        id: i.toString(),
        text: i.toString(),
        to: { pathnName: '/', search: search.toString() },
        className,
      });
    }
    return result;
  }

  React.useEffect(() => {
    updatePages(calculatePages());
  }, [location, total, page, perPage, disabled]);

  return (
    <ol
      className={classNames({
        [styles.pager]: true,
        [styles.disabled]: disabled,
        pager: true,
        disabled,
      })}
    >
      {pages.map((x) => (
        <li key={x.id} className={styles.item}>
          {disabled ? (
            <span className={`${x.className} pager__link`}>{x.text}</span>
          ) : (
            <Link to={x.to} className={`${x.className} pager__link`}>
              {x.text}
            </Link>
          )}
        </li>
      ))}
    </ol>
  );
}
