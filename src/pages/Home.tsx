import * as React from 'react';
import Search from '../components/Search';
import List from '../components/pokemon/List/List.container';

const Home = () => {
  return (
    <section>
      <h1>Home</h1>
      Search:
      <Search />
      <List />
    </section>
  );
};

export default Home;
