import * as React from 'react';
import { Item } from '../List/types';

const PokemonDetail = ({ id, name, url }: Item) => {
  return (
    <section>
      <p>{id}</p>
      <p>
        :title:
        {name}
      </p>
      <pre> 
        {' '}
        {url}
      </pre>
    </section>
  );
};

export default PokemonDetail;
