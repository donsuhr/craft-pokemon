import * as React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import StyledRadio from '@/components/StyledRadio';

export const QUERY_KEY = 'view';
export const QUERY_VAL_BAG = 'bag';

export default function ListViewToggle() {
  const location = useLocation();
  const history = useHistory();

  const handleToggleChange = (view: string) => {
    const query = new URLSearchParams(location.search);
    query.set(QUERY_KEY, view);
    query.delete('page');
    history.push(`${location.pathname}?${query}`);
  };

  const toggleItems = [
    { label: 'All', value: 'all' },
    { label: 'In Bag', value: QUERY_VAL_BAG },
  ];

  const initialQuery = new URLSearchParams(location.search);
  const isViewAll = initialQuery.get(QUERY_KEY) !== QUERY_VAL_BAG;
  const viewAllToggleValue = isViewAll ? 'all' : QUERY_VAL_BAG;

  return (
    <StyledRadio
      items={toggleItems}
      onChange={handleToggleChange}
      value={viewAllToggleValue}
    />
  );
}
