import * as React from 'react';
import { useParams } from 'react-router-dom';
import { LoadScript } from '@react-google-maps/api';
import Detail from '../components/pokemon/Detail/Detail.container';
import config from '../config';

interface ParamTypes {
  id: string;
}
const DetailsPage = () => {
  const { id } = useParams<ParamTypes>();
  return (
    <section className="container">
      <LoadScript googleMapsApiKey={config.google.maps}>
        <Detail id={id} />
      </LoadScript>
    </section>
  );
};

export default DetailsPage;
