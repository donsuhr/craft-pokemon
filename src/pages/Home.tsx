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
import StyledRadio from '../components/StyledRadio';

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
  const isViewAll = useSelector(
    (state: ApplicationState) => getUiState(state).viewAll,
  );

  const handleToggleChange = (view:string) => {
    dispatch(setViewAll(view === 'all'));
  };
  const handleSearchChange = (text:string) => {
    dispatch(setTextFilter(text));
  };

  if (isLoading) {
    return <Loading withBg>Loading...</Loading>;
  }
  const toggleItems = [
    { label: 'All', value: 'all' },
    { label: 'In Bag', value: 'inbag' },
  ];
  const viewAllToggleValue = isViewAll ? 'all' : 'inbag';

  return (
    <section className="container">
      <h1>Pokemon San Diego Designs</h1>
      <StyledRadio
        items={toggleItems}
        onChange={handleToggleChange}
        value={viewAllToggleValue}
      />
      <Search onChange={handleSearchChange} value={filterText} />
      <List />
    </section>
  );
};

export default Home;
