import * as React from 'react';
import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListState, getUiState } from '@/store/selectors';
import { ApplicationState } from '@/store/types';
import { setViewAll, setTextFilter } from '@/store/ui/actions';
import {fetchItemsIfNeeded} from '@/components/pokemon/List/actions';
import List from '../components/pokemon/List';
import Loading from '../components/Loading';
import Search from '../components/Search';
import ListViewToggle from '../components/pokemon/List/ListViewToggle';

const Home = () => {
  const dispatch = useDispatch();

   useEffect(() => {
    dispatch(fetchItemsIfNeeded());
  }, []);

  const isLoading = useSelector(
    (state: ApplicationState) => getListState(state).isFetching,
  );
  const filterText = useSelector(
    (state: ApplicationState) => getUiState(state).filterText,
  );
  );

    dispatch(setTextFilter(text));
  };

  if (isLoading) {
    return <Loading withBg>Loading...</Loading>;
  }

  return (
    <section className="container">
      <h1>
        Pokemon San Diego Designs
      </h1>
      <ListViewToggle />
      <Search onChange={handleSearchChange} value={uiFilterText} />
      <List />
    </section>
  );
};

export default Home;
