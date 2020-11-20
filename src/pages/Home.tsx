import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getListState, getUiState } from '@/store/selectors';
import { ApplicationState } from '@/store/types';
import { setTextFilter } from '@/store/ui/actions';
import { fetchItemsIfNeeded } from '@/components/pokemon/List/actions';
import List from '../components/pokemon/List';
import Loading from '../components/Loading';
import Search from '../components/Search';
import ListViewToggle from '../components/pokemon/List/ListViewToggle';

export const QUERY_KEY = 's';

const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const [timeout, updateTimeout] = useState<number | undefined>();

  const uiFilterText = useSelector(
    (state: ApplicationState) => getUiState(state).filterText,
  );

  const isLoading = useSelector(
    (state: ApplicationState) => getListState(state).isFetching,
  );

  useEffect(() => {
    dispatch(fetchItemsIfNeeded());
  }, []);

  useEffect(() => {
    const initialQuery = new URLSearchParams(location.search);
    const searchText = initialQuery.get(QUERY_KEY) || '';
    if (searchText !== uiFilterText) {
      dispatch(setTextFilter(searchText));
    }
  }, [location]);

  const handleSearchChange = (text: string) => {
    dispatch(setTextFilter(text));
    if (timeout) {
      clearTimeout(timeout);
    }
    const timeoutId = window.setTimeout(() => {
      const query = new URLSearchParams(location.search);
      query.set(QUERY_KEY, text);
      history.push(`${location.pathname}?${query}`);
    }, 1500);

    updateTimeout(timeoutId);
  };

  if (isLoading) {
    return <Loading withBg>Loading...</Loading>;
  }

  return (
    <section className="container">
      <h1>Pokemon San Diego Designs</h1>
      <ListViewToggle />
      <Search onChange={handleSearchChange} value={uiFilterText} />
      <List />
    </section>
  );
};

export default Home;
