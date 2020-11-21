import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getListState, getUiState } from '@/store/selectors';
import { ApplicationState, AsyncStatus } from '@/store/types';
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

  const { status } = useSelector((state: ApplicationState) =>
    getListState(state),
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
    const updateQuery = () => {
      const query = new URLSearchParams(location.search);
      query.set(QUERY_KEY, text);
      query.delete('page');
      history.push(`${location.pathname}?${query}`);
    };
    if (text === '') {
      updateQuery();
    } else {
      const timeoutId = window.setTimeout(updateQuery, 1500);
      updateTimeout(timeoutId);
    }
  };

  if (status === AsyncStatus.failed) {
    return (
      <>
        <p className="error">There was an error loading the items...</p>
      </>
    );
  }

  if (status === AsyncStatus.offline) {
    return (
      <>
        <p className="error">Error loading items. Check connection...</p>
      </>
    );
  }

  if (status === AsyncStatus.initial || status === AsyncStatus.loading) {
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
