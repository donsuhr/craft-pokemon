import * as React from 'react';
import { useParams } from 'react-router-dom';
import Detail from '../components/pokemon/Detail/Detail.container';

interface ParamTypes {
  id: string;
}
const DetailsPage = () => {
  const { id } = useParams<ParamTypes>();
  return (
    <section>
      <h1>Details</h1>
      <Detail id={id} />
    </section>
  );
};

export default DetailsPage;
